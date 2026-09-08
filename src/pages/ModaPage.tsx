import { motion } from "motion/react";
import { ArrowDown, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLang } from "../i18n";
import type { Lang } from "../translations";
import { brandNames, brandImages, lezEfataGallery, maiahBearCubGallery, nkApexGalleryPages } from "../brands";
import logoLez from "../logo-lez.png";
import BrandGallery from "../components/BrandGallery";

const languages: { code: Lang; flag: string }[] = [
  { code: "pt", flag: "🇧🇷" },
  { code: "en", flag: "🇺🇸" },
  { code: "it", flag: "🇮🇹" },
];

export default function ModaPage() {
  const { lang, setLang, t } = useLang();
  const p = t.portfolios;
  const [nkApexPage, setNkApexPage] = useState(0);

  useEffect(() => {
    const target = window.location.hash ? document.querySelector(window.location.hash) : null;
    if (target) {
      requestAnimationFrame(() => target.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="relative w-full max-w-[100vw] min-h-screen overflow-x-clip bg-[#f4f1eb] text-dark">
      <nav className="sticky top-0 z-50 flex w-full min-w-0 items-center justify-between border-b border-white/8 bg-dark/95 px-5 py-4 backdrop-blur-xl md:px-12">
        <Link to="/" className="flex items-center gap-4">
          <img src={logoLez} alt="LÉZ.NK Logo" className="h-9 w-auto object-contain md:h-10" />
          <span className="hidden font-serif text-lg font-bold tracking-tighter text-white sm:inline">
            LÉZ.NK CAPITAL
          </span>
        </Link>

        <div className="flex items-center gap-3 md:gap-6">
          <Link
            to="/"
            className="-mx-2 flex items-center gap-2 px-2 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-gold md:text-[10px]"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">{t.modaPage.back}</span>
          </Link>
          <div className="flex items-center rounded-full border border-white/10 bg-white/[0.03] p-1">
            {languages.map(({ code, flag }) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-label={code.toUpperCase()}
                aria-pressed={lang === code}
                className={`grid h-7 w-7 place-items-center rounded-full text-sm transition-all ${
                  lang === code ? "bg-white/10 opacity-100" : "opacity-30 hover:opacity-70"
                }`}
              >
                {flag}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main>
        <section className="relative min-h-[calc(100svh-73px)] bg-dark text-white">
          <div className="absolute inset-0 opacity-[0.035] pointer-events-none">
            <div className="tech-grid h-full w-full" />
          </div>

          <div className="mx-auto grid w-full min-w-0 max-w-[1440px] grid-cols-[minmax(0,1fr)] min-h-[calc(100svh-73px)] lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)]">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85 }}
              className="relative z-10 flex min-w-0 flex-col justify-center px-6 py-16 md:px-12 lg:px-20 lg:py-24"
            >
              <div className="mb-10 flex items-center gap-4">
                <span className="h-px w-10 bg-gold" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.38em] text-gold">
                  {p.overview.subtitle}
                </span>
              </div>

              <h1 className="max-w-4xl font-serif text-[clamp(2.75rem,13vw,7.8rem)] font-bold leading-[0.83] tracking-[-0.06em] lg:text-[clamp(3.5rem,8vw,7.8rem)]">
                <span className="block">{t.fashionPillar.titleL1}</span>
                <span className="block text-white/78">{t.fashionPillar.titleL2}</span>
                <span className="gold-gradient block italic">{t.fashionPillar.titleL3}</span>
              </h1>

              <div className="mt-10 w-full min-w-0 max-w-xl border-l border-gold/50 pl-5 md:mt-12 md:pl-7">
                <p className="mb-4 font-serif text-lg font-bold leading-snug text-white md:text-xl">
                  {t.fashionPillar.bold}
                </p>
                <p className="break-words text-sm leading-[1.85] text-white/48">
                  {t.fashionPillar.p}
                </p>
              </div>

              <a
                href="#marcas"
                className="mt-10 flex w-fit items-center gap-3 border-b border-gold/40 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-gold transition-colors hover:border-gold md:mt-12"
              >
                {p.s01.brandsLabel}
                <ArrowDown size={13} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1 }}
              className="relative min-h-[62svh] min-w-0 overflow-hidden lg:min-h-full"
            >
              <img
                src={brandImages[0][0]}
                alt={brandNames[0]}
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-dark/10 lg:bg-gradient-to-r lg:from-dark/65 lg:via-transparent lg:to-transparent" />
              <div className="absolute bottom-6 right-6 border border-white/20 bg-dark/55 px-4 py-3 backdrop-blur-md md:bottom-10 md:right-10">
                <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-gold">01 / 03</p>
                <p className="mt-1 font-serif text-lg font-bold">{brandNames[0]}</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="marcas" className="px-6 py-20 md:px-12 md:py-28 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-7 border-b border-dark/10 pb-12 md:grid-cols-[0.8fr_1.2fr] md:items-end md:pb-16">
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.38em] text-gold">
                {p.s01.brandsLabel} · 03
              </p>
              <h2 className="font-serif text-4xl font-bold leading-[0.95] tracking-[-0.04em] md:text-6xl">
                {p.overview.subtitle}
              </h2>
            </div>
          </div>
        </section>

        <section>
          {brandNames.map((name, index) => {
            const isDark = index === 2;
            const copyFirst = index % 2 === 0;

            return (
              <article
                key={name}
                id={`marca-${index + 1}`}
                className={`relative px-6 py-20 md:px-12 md:py-28 lg:px-24 lg:py-36 ${
                  isDark ? "bg-dark text-white" : index === 1 ? "bg-[#e9e4da]" : "bg-[#f4f1eb]"
                }`}
              >
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-20">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.22 }}
                    transition={{ duration: 0.75 }}
                    className={copyFirst ? "lg:order-1" : "lg:order-2"}
                  >
                    <div className="mb-8 flex items-center gap-4">
                      <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-gold">
                        0{index + 1}
                      </span>
                      <span className={`h-px flex-1 ${isDark ? "bg-white/10" : "bg-dark/10"}`} />
                    </div>

                    <h3 className="font-serif text-4xl font-bold leading-none tracking-[-0.045em] md:text-6xl">
                      {name}
                    </h3>
                    <p className="mt-5 font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-gold/80">
                      {p.s01.brandDescs[index]}
                    </p>
                    <p className={`mt-8 max-w-xl text-[15px] leading-[1.95] ${isDark ? "text-white/52" : "text-dark/58"}`}>
                      {p.s01.brandLongDescs[index]}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: copyFirst ? 24 : -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.18 }}
                    transition={{ duration: 0.9 }}
                    className={`relative ${copyFirst ? "lg:order-2" : "lg:order-1"}`}
                  >
                    <div className="grid grid-cols-12 gap-2.5 md:gap-4">
                      {(() => {
                        const images = index === 2 ? nkApexGalleryPages[nkApexPage] : brandImages[index];
                        return (
                          <>
                            <div className="col-span-8 row-span-2 aspect-[4/5] overflow-hidden bg-dark/5">
                              <img
                                src={images[0]}
                                alt={`${name} — imagem principal`}
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.025]"
                              />
                            </div>
                            {images.slice(1, 3).map((src, imageIndex) => (
                              <div key={src} className="col-span-4 aspect-[4/5] overflow-hidden bg-dark/5">
                                <img
                                  src={src}
                                  alt={`${name} — detalhe ${imageIndex + 1}`}
                                  loading="lazy"
                                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.035]"
                                />
                              </div>
                            ))}
                          </>
                        );
                      })()}
                    </div>

                    {index === 2 && (
                      <>
                        {nkApexPage === 1 && (
                          <button
                            type="button"
                            onClick={() => setNkApexPage(0)}
                            aria-label="Ver fotos anteriores"
                            className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-dark/55 text-white backdrop-blur-md transition-colors hover:bg-dark/75 md:left-4"
                          >
                            <ChevronLeft size={20} />
                          </button>
                        )}
                        {nkApexPage === 0 && (
                          <button
                            type="button"
                            onClick={() => setNkApexPage(1)}
                            aria-label="Ver outras fotos"
                            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-dark/55 text-white backdrop-blur-md transition-colors hover:bg-dark/75 md:right-4"
                          >
                            <ChevronRight size={20} />
                          </button>
                        )}
                        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 md:bottom-4">
                          {nkApexGalleryPages.map((_, pageIndex) => (
                            <span
                              key={pageIndex}
                              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                                pageIndex === nkApexPage ? "bg-gold" : "bg-white/50"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </motion.div>
                </div>

                {index === 0 && (
                  <div className="mx-auto mt-16 max-w-7xl md:mt-20">
                    <BrandGallery
                      images={lezEfataGallery}
                      name={name}
                      bgColor="#f4f1eb"
                      label={p.s01.galleryLabel}
                    />
                  </div>
                )}

                {index === 1 && (
                  <div className="mx-auto mt-16 max-w-7xl md:mt-20">
                    <BrandGallery
                      images={maiahBearCubGallery}
                      name={name}
                      bgColor="#e9e4da"
                      label={p.s01.galleryLabel}
                    />
                  </div>
                )}
              </article>
            );
          })}
        </section>

        <section className="border-t border-white/8 bg-dark px-6 py-20 text-white md:px-12 md:py-28 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex items-center gap-4 md:mb-14">
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.38em] text-gold">
                {p.s01.modelTitle}
              </p>
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid divide-y divide-white/10 border-y border-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
              {p.s01.modelItems.map(({ label, value }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="px-0 py-8 md:px-8 md:py-10 first:md:pl-0 last:md:pr-0"
                >
                  <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.28em] text-gold/70">
                    {label}
                  </p>
                  <p className="max-w-sm font-serif text-xl font-bold leading-snug md:text-2xl">
                    {value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/8 bg-dark px-6 py-12 text-white md:px-12 lg:px-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-7 text-center md:flex-row md:text-left">
          <img src={logoLez} alt="LÉZ.NK Logo" className="h-10 w-auto object-contain" />
          <Link
            to="/"
            className="flex items-center gap-2 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-white/45 transition-colors hover:text-gold"
          >
            <ArrowLeft size={13} />
            {t.modaPage.back}
          </Link>
          <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/25">
            © 2026 LÉZ.NK Capital LTDA
          </p>
        </div>
      </footer>
    </div>
  );
}
