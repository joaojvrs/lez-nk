import { motion } from "motion/react";
import { Globe as GlobeIcon } from "lucide-react";
import Globe from "./components/Globe";
import { useLang } from "./i18n";
import { expansionCountries } from "./countries";
import { brandNames } from "./brands";

const flagFromCode = (code: string) =>
  String.fromCodePoint(...code.toUpperCase().split("").map((letter) => 127397 + letter.charCodeAt(0)));

const markers = expansionCountries.map((country) => ({
  location: [country.lat, country.lng] as [number, number],
  id: country.code.toLowerCase(),
  flag: flagFromCode(country.code),
  label: country.name,
}));

export default function GlobalExpansion() {
  const { t } = useLang();
  const g = t.globalExpansion;

  return (
    <section className="bg-dark text-white py-16 md:py-32 relative overflow-hidden" id="expansao">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="tech-grid w-full h-full" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="w-8 h-[1px] bg-gold mb-5" />
            <span className="text-gold text-[10px] font-mono uppercase tracking-[0.4em] font-bold block mb-4">
              {g.tag}
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold leading-none tracking-tighter mb-6">
              {g.titleL1}
              <br />
              <span className="gold-gradient">{g.titleL2}</span>
            </h2>
            <p className="text-white/60 text-sm font-sans leading-[1.9] mb-10 max-w-xl">
              {g.intro}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="p-6 border border-white/8 bg-white/[0.02]">
                <div className="text-gold font-mono text-[10px] mb-2 uppercase tracking-widest">{g.goalLabel}</div>
                <div className="text-3xl font-serif font-bold">{g.goalValue}</div>
              </div>
              <div className="p-6 border border-white/8 bg-white/[0.02]">
                <div className="text-gold font-mono text-[10px] mb-2 uppercase tracking-widest">{g.storesLabel}</div>
                <div className="text-xl md:text-2xl font-serif font-bold">{g.storesValue}</div>
              </div>
            </div>

            {/* Regions */}
            <div className="space-y-4 mb-10">
              {g.regions.map((region, i) => (
                <div key={i} className="border-t border-white/8 pt-3">
                  <p className="text-[9px] font-mono text-gold/70 uppercase tracking-widest mb-1">{region.label}</p>
                  <p className="text-white/45 text-xs font-sans leading-relaxed">{region.countries}</p>
                </div>
              ))}
            </div>

            {/* Brands */}
            <div>
              <p className="text-[9px] font-mono text-gold/70 uppercase tracking-widest mb-3">{g.brandsLabel}</p>
              <div className="flex flex-wrap gap-2">
                {brandNames.map((name) => (
                  <span
                    key={name}
                    className="px-3 py-1.5 border border-gold/30 text-gold/70 text-[10px] font-mono uppercase tracking-widest"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="flex-1 w-full max-w-md mx-auto"
          >
            <div className="relative">
              <div className="absolute inset-[8%] rounded-full border border-gold/10 pointer-events-none" />
              <Globe
                markers={markers}
                className="w-full"
                markerSize={0}
                markerElevation={0.018}
                mapBrightness={7}
              />
              <div className="absolute right-2 top-8 md:right-0 md:top-12 rounded-full border border-gold/20 bg-dark/80 px-3 py-1.5 backdrop-blur-md">
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-gold/80">
                  {expansionCountries.length} {g.destinationsLabel}
                </span>
              </div>
            </div>

            <p className="flex items-center justify-center gap-2 text-white/25 text-[9px] font-mono uppercase tracking-widest mt-6">
              <GlobeIcon size={12} />
              {g.globeHint}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
