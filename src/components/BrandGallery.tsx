import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";

interface BrandGalleryProps {
  images: string[];
  name: string;
  /** Cor de fundo da seção (hex), usada no degradê das bordas da faixa. */
  bgColor: string;
  /** true quando a seção tem fundo escuro (texto/divisor claros). */
  dark?: boolean;
  label: string;
}

export default function BrandGallery({ images, name, bgColor, dark = false, label }: BrandGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIndex, images.length]);

  const loop = [...images, ...images];

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between gap-4">
        <span className={`h-px flex-1 ${dark ? "bg-white/15" : "bg-dark/10"}`} />
        <button
          type="button"
          onClick={() => setOpenIndex(0)}
          className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-gold/90 transition-colors hover:text-gold"
        >
          <Images size={13} />
          {label}
        </button>
      </div>

      <div className="group relative overflow-hidden">
        <div className="marquee-track flex w-max gap-3 md:gap-4">
          {loop.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setOpenIndex(i % images.length)}
              className={`aspect-[4/5] w-24 flex-shrink-0 overflow-hidden md:w-32 ${dark ? "bg-white/5" : "bg-dark/5"}`}
            >
              <img
                src={src}
                alt={`${name} — foto ${(i % images.length) + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </button>
          ))}
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-10 md:w-16"
          style={{ backgroundImage: `linear-gradient(to right, ${bgColor}, transparent)` }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-10 md:w-16"
          style={{ backgroundImage: `linear-gradient(to left, ${bgColor}, transparent)` }}
        />
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/95 p-4 backdrop-blur-sm"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Fechar"
            className="absolute right-5 top-5 text-white/60 transition-colors hover:text-white"
          >
            <X size={28} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
            }}
            aria-label="Foto anterior"
            className="absolute left-3 text-white/60 transition-colors hover:text-white md:left-8"
          >
            <ChevronLeft size={36} />
          </button>

          <img
            src={images[openIndex]}
            alt={`${name} — foto ${openIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[85vw] object-contain shadow-2xl"
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? i : (i + 1) % images.length));
            }}
            aria-label="Próxima foto"
            className="absolute right-3 text-white/60 transition-colors hover:text-white md:right-8"
          >
            <ChevronRight size={36} />
          </button>

          <p className="absolute bottom-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
            {openIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  );
}
