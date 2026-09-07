import { useEffect, useRef, useCallback } from "react";
import createGlobe, { type Globe as CobeGlobe } from "cobe";

export interface GlobeMarker {
  location: [number, number];
  id: string;
  flag?: string;
  label?: string;
}

export interface GlobeArc {
  from: [number, number];
  to: [number, number];
  id: string;
}

type RGB = [number, number, number];

interface GlobeProps {
  markers?: GlobeMarker[];
  arcs?: GlobeArc[];
  className?: string;
  markerColor?: RGB;
  baseColor?: RGB;
  arcColor?: RGB;
  glowColor?: RGB;
  dark?: number;
  mapBrightness?: number;
  markerSize?: number;
  markerElevation?: number;
  arcWidth?: number;
  arcHeight?: number;
  speed?: number;
  theta?: number;
  diffuse?: number;
  mapSamples?: number;
}

export default function Globe({
  markers = [],
  arcs = [],
  className = "",
  markerColor = [0.83, 0.69, 0.22],
  baseColor = [1, 1, 1],
  arcColor = [0.83, 0.69, 0.22],
  glowColor = [0.98, 0.97, 0.96],
  dark = 0,
  mapBrightness = 10,
  markerSize = 0.06,
  markerElevation = 0.01,
  arcWidth = 1,
  arcHeight = 0.3,
  speed = 0.003,
  theta = 0.2,
  diffuse = 1.5,
  mapSamples = 16000,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const lastPointer = useRef<{ x: number; y: number; t: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const velocity = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const flagRefs = useRef(new Map<string, HTMLSpanElement>());

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    isPausedRef.current = true;
  }, []);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (pointerInteracting.current === null) return;

    const deltaX = e.clientX - pointerInteracting.current.x;
    const deltaY = e.clientY - pointerInteracting.current.y;

    dragOffset.current = { phi: deltaX / 300, theta: deltaY / 1000 };

    const now = Date.now();
    if (lastPointer.current) {
      const dt = Math.max(now - lastPointer.current.t, 1);
      const maxV = 0.15;
      velocity.current = {
        phi: Math.max(-maxV, Math.min(maxV, ((e.clientX - lastPointer.current.x) / dt) * 0.3)),
        theta: Math.max(-maxV, Math.min(maxV, ((e.clientY - lastPointer.current.y) / dt) * 0.08)),
      };
    }
    lastPointer.current = { x: e.clientX, y: e.clientY, t: now };
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
      lastPointer.current = null;
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPausedRef.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let globe: CobeGlobe | null = null;
    let animationId: number | null = null;
    let phi = 0;
    let displaySize = 0;
    let pixelRatio = 1;
    let resizeObserver: ResizeObserver | null = null;

    function animate() {
      if (!globe) return;

      if (!isPausedRef.current) {
        phi += speed;

        if (Math.abs(velocity.current.phi) > 0.0001 || Math.abs(velocity.current.theta) > 0.0001) {
          phiOffsetRef.current += velocity.current.phi;
          thetaOffsetRef.current += velocity.current.theta;
          velocity.current.phi *= 0.95;
          velocity.current.theta *= 0.95;
        }

        const tMin = -0.4;
        const tMax = 0.4;
        if (thetaOffsetRef.current < tMin) thetaOffsetRef.current += (tMin - thetaOffsetRef.current) * 0.1;
        if (thetaOffsetRef.current > tMax) thetaOffsetRef.current += (tMax - thetaOffsetRef.current) * 0.1;
      }

      const currentPhi = phi + phiOffsetRef.current + dragOffset.current.phi;
      const currentTheta = theta + thetaOffsetRef.current + dragOffset.current.theta;

      globe.update({ phi: currentPhi, theta: currentTheta });

      // Project the country coordinates into the same 2D space used by COBE.
      // This keeps flags working in browsers without CSS Anchor Positioning.
      const cosPhi = Math.cos(currentPhi);
      const sinPhi = Math.sin(currentPhi);
      const cosTheta = Math.cos(currentTheta);
      const sinTheta = Math.sin(currentTheta);
      const radius = 0.8 + markerElevation;

      markers.forEach((marker) => {
        const flag = flagRefs.current.get(marker.id);
        if (!flag) return;

        const latitude = (marker.location[0] * Math.PI) / 180;
        const longitude = (marker.location[1] * Math.PI) / 180 - Math.PI;
        const cosLatitude = Math.cos(latitude);
        const x = -cosLatitude * Math.cos(longitude) * radius;
        const y = Math.sin(latitude) * radius;
        const z = cosLatitude * Math.sin(longitude) * radius;

        const projectedX = cosPhi * x + sinPhi * z;
        const projectedY = sinPhi * sinTheta * x + cosTheta * y - cosPhi * sinTheta * z;
        const projectedZ = -sinPhi * cosTheta * x + sinTheta * y + cosPhi * cosTheta * z;
        const visible = projectedZ > 0.035;

        const rawX = ((projectedX + 1) / 2) * displaySize;
        const rawY = ((-projectedY + 1) / 2) * displaySize;
        const stableX = Math.round(rawX * pixelRatio) / pixelRatio;
        const stableY = Math.round(rawY * pixelRatio) / pixelRatio;

        flag.style.opacity = visible ? "1" : "0";
        flag.style.transform = `translate3d(${stableX}px, ${stableY}px, 0) translate(-50%, -50%)`;
      });

      animationId = requestAnimationFrame(animate);
    }

    function init() {
      if (!canvas) return;
      const width = canvas.offsetWidth;
      if (width === 0 || globe) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      displaySize = width;
      pixelRatio = dpr;

      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: width * dpr,
        height: width * dpr,
        phi: 0,
        theta,
        dark,
        diffuse,
        mapSamples,
        mapBrightness,
        baseColor,
        markerColor,
        glowColor,
        markerElevation,
        markers: markers.map((m) => ({ location: m.location, size: markerSize })),
        arcs: arcs.map((a) => ({ from: a.from, to: a.to })),
        arcColor,
        arcWidth,
        arcHeight,
        opacity: 0.8,
      });

      animate();

      setTimeout(() => {
        if (canvas) canvas.style.opacity = "1";
      });
    }

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      resizeObserver = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          resizeObserver?.disconnect();
          init();
        }
      });
      resizeObserver.observe(canvas);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (resizeObserver) resizeObserver.disconnect();
      if (globe) globe.destroy();
    };
  }, [markers, arcs, markerColor, baseColor, arcColor, glowColor, dark, mapBrightness, markerSize, markerElevation, arcWidth, arcHeight, speed, theta, diffuse, mapSamples]);

  return (
    <div style={{ position: "relative", aspectRatio: "1", userSelect: "none" }} className={className}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1.2s ease",
          borderRadius: "50%",
          touchAction: "none",
        }}
      />
      {markers.map((marker) =>
        marker.flag ? (
          <span
            key={marker.id}
            ref={(element) => {
              if (element) flagRefs.current.set(marker.id, element);
              else flagRefs.current.delete(marker.id);
            }}
            className="globe-flag"
            aria-label={marker.label}
            title={marker.label}
            style={{ left: 0, top: 0, opacity: 0 }}
          >
            {marker.flag}
          </span>
        ) : null,
      )}
    </div>
  );
}
