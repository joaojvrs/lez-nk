import { motion } from "motion/react";
import {
  MapPin,
  ShoppingBag,
  Palmtree,
  Wheat,
  Building2,
  CreditCard,
  Globe,
  CheckCircle2,
} from "lucide-react";

/* ── helpers ─────────────────────────────────────────────────────────────── */

const LocationBadge = ({ text, dark = false }: { text: string; dark?: boolean }) => (
  <div className="flex items-center gap-1.5 mb-3">
    <MapPin size={10} className="text-gold flex-shrink-0" />
    <span className={`text-[9px] font-mono uppercase tracking-[0.25em] ${dark ? "text-gold/60" : "text-gold/70"}`}>
      {text}
    </span>
  </div>
);

const SectorLabel = ({ number, dark = false }: { number: string; dark?: boolean }) => (
  <div className="flex items-center gap-4 mb-4">
    <span className={`text-[10px] font-mono uppercase tracking-[0.4em] ${dark ? "text-gold/60" : "text-gold/70"}`}>
      Setor {number}
    </span>
    <div className={`w-8 h-[1px] ${dark ? "bg-gold/20" : "bg-gold/30"}`} />
  </div>
);

const BulletList = ({ items, dark = false }: { items: string[]; dark?: boolean }) => (
  <ul className="space-y-2">
    {items.map((item, i) => (
      <li key={i} className={`flex items-start gap-2 text-xs font-sans ${dark ? "text-white/60" : "text-dark/60"}`}>
        <div className="mt-1.5 w-1 h-1 bg-gold flex-shrink-0" />
        {item}
      </li>
    ))}
  </ul>
);

const ProjectCard = ({
  children,
  dark = false,
  delay = 0,
}: {
  children: React.ReactNode;
  dark?: boolean;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.7 }}
    className={`p-6 tech-border ${
      dark
        ? "border border-white/10 bg-white/[0.02]"
        : "glass-card"
    }`}
  >
    {children}
  </motion.div>
);

/* ── main export ─────────────────────────────────────────────────────────── */

export default function Portfolios() {
  return (
    <>
      {/* ── GROUP OVERVIEW — dark ──────────────────────────────────────────── */}
      <section
        id="portfolio"
        className="bg-dark text-white py-16 md:py-32 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="tech-grid w-full h-full" />
        </div>
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Header */}
            <div className="w-8 h-[1px] bg-gold mb-5" />
            <span className="text-gold text-[10px] font-mono uppercase tracking-[0.4em] font-bold block mb-4">
              Portfólio Corporativo
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold leading-none tracking-tighter mb-4">
              GRUPO LÉZ
              <br />
              <span className="gold-gradient">NK CAPITAL</span>
            </h2>
            <p className="text-white/40 text-[11px] font-mono uppercase tracking-[0.25em] mb-10">
              Holding Administrativa Empresarial
            </p>

            {/* Ecosystem tags */}
            <div className="flex flex-wrap gap-2 mb-14">
              {["Moda", "Turismo & Hotelaria", "Agro", "Real Estate", "Fintech"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 border border-gold/30 text-gold/60 text-[9px] font-mono uppercase tracking-widest"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Vision */}
            <div className="border-t border-white/8 pt-10">
              <p className="text-[9px] font-mono text-gold/60 uppercase tracking-[0.35em] mb-6">
                Visão do Grupo
              </p>
              <p className="text-white/60 text-sm font-sans leading-[1.9] mb-8 max-w-2xl">
                Criar um grupo internacional de hospitalidade, lifestyle e investimentos, conectando:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Turismo de Luxo", Icon: Palmtree },
                  { label: "Moda Autoral Brasileira", Icon: ShoppingBag },
                  { label: "Desenvolvimento Imobiliário", Icon: Building2 },
                  { label: "Tecnologia Financeira", Icon: CreditCard },
                ].map(({ label, Icon }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-5 border border-white/8 bg-white/[0.02] flex flex-col gap-3"
                  >
                    <Icon size={16} className="text-gold" />
                    <span className="text-[11px] font-sans text-white/55 leading-snug">{label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTOR 1: MODA — light ─────────────────────────────────────────── */}
      <section className="py-16 md:py-32 border-t border-dark/5">
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 md:mb-14"
          >
            <SectorLabel number="01" />
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 bg-dark flex items-center justify-center flex-shrink-0">
                <ShoppingBag size={18} className="text-gold" />
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold tracking-tighter uppercase">
                Moda
              </h3>
            </div>
            <p className="text-dark/40 text-[9px] font-mono uppercase tracking-[0.3em] ml-14">
              Marcas do grupo
            </p>
          </motion.div>

          {/* Brands */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12 md:mb-16">
            {[
              { name: "LÉZ אתפתח", desc: "Moda masculina, feminina e acessórios" },
              { name: "Maiah Bear Cub", desc: "Moda infantil" },
              { name: "N.K Apex", desc: "Moda fitness" },
            ].map((brand, i) => (
              <ProjectCard key={i} delay={i * 0.1}>
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-serif font-bold text-lg leading-tight">{brand.name}</h4>
                  <span className="text-[8px] font-mono uppercase tracking-widest px-2 py-1 border border-gold/30 text-gold/60 ml-2 flex-shrink-0">
                    Teste
                  </span>
                </div>
                <p className="text-dark/55 text-xs font-sans leading-relaxed">{brand.desc}</p>
              </ProjectCard>
            ))}
          </div>

          {/* Model */}
          <div className="border-t border-dark/8 pt-10">
            <p className="text-[9px] font-mono text-gold/70 uppercase tracking-[0.35em] mb-6">
              Modelo de negócio
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Criação", value: "Brasileira" },
                { label: "Fabricação", value: "Internacional — China" },
                { label: "Vendas", value: "Online + Loja física em São Paulo, SP" },
              ].map(({ label, value }, i) => (
                <div key={i} className="p-4 border border-dark/8 bg-white/40 backdrop-blur-sm">
                  <p className="text-[9px] font-mono text-gold/70 uppercase tracking-widest mb-2">
                    {label}
                  </p>
                  <p className="text-sm font-sans font-medium text-dark">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTOR 2: TURISMO & HOTELARIA — dark ──────────────────────────── */}
      <section className="bg-dark text-white py-16 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="tech-grid w-full h-full" />
        </div>
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 md:mb-14"
          >
            <SectorLabel number="02" dark />
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gold flex items-center justify-center flex-shrink-0">
                <Palmtree size={18} className="text-dark" />
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold tracking-tighter uppercase">
                Turismo & Hotelaria
              </h3>
            </div>
          </motion.div>

          {/* Nacionais */}
          <div className="mb-10 md:mb-12">
            <p className="text-[9px] font-mono text-white/25 uppercase tracking-[0.35em] mb-6">
              Projetos Nacionais
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <ProjectCard dark>
                <LocationBadge text="Goiás – GO" dark />
                <h4 className="font-serif font-bold text-xl mb-3">Casarão dos Pinheiros</h4>
                <span className="inline-block text-[8px] font-mono uppercase tracking-widest px-2 py-1 border border-gold/30 text-gold/60">
                  Em funcionamento · Ampliação
                </span>
              </ProjectCard>

              <ProjectCard dark delay={0.1}>
                <LocationBadge text="Fortaleza – Ceará – CE" dark />
                <h4 className="font-serif font-bold text-xl mb-2">Marina Park Hotel</h4>
                <p className="text-white/45 text-xs font-sans mb-5 leading-relaxed">
                  Hotel consolidado no turismo nacional
                </p>
                <div className="border-t border-white/8 pt-4 space-y-2">
                  <p className="text-[9px] font-mono text-gold/60 uppercase tracking-widest mb-3">
                    Projetos em desenvolvimento
                  </p>
                  <div className="flex items-start gap-2">
                    <div className="mt-1.5 w-1 h-1 bg-gold flex-shrink-0" />
                    <p className="text-xs font-sans text-white/60">
                      Apex Residences Patrícia Lamborghini
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-1.5 w-1 h-1 bg-gold flex-shrink-0" />
                    <p className="text-xs font-sans text-white/60">
                      Ímpar Resort by Liä Éden Z'anelato
                    </p>
                  </div>
                </div>
              </ProjectCard>
            </div>
          </div>

          {/* Internacionais */}
          <div>
            <p className="text-[9px] font-mono text-white/25 uppercase tracking-[0.35em] mb-6">
              Projetos Internacionais e Futuros
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <ProjectCard dark>
                <LocationBadge text="Itália" dark />
                <h4 className="font-serif font-bold text-xl mb-3">Palazzo Aurelia del Lago</h4>
                <p className="text-white/45 text-xs font-sans leading-relaxed">
                  Resort de luxo europeu à beira de lago.
                </p>
              </ProjectCard>

              <ProjectCard dark delay={0.1}>
                <LocationBadge text="Riviera de São Lourenço – São Paulo – SP" dark />
                <h4 className="font-serif font-bold text-xl mb-4">Blue Lagoon Island Riviera</h4>
                <BulletList
                  dark
                  items={[
                    "Bangalôs sobre água",
                    "Turismo premium",
                    "Experiências exclusivas",
                  ]}
                />
                <p className="text-white/25 text-[9px] font-sans mt-4 italic">
                  Inspirado nas Maldivas
                </p>
              </ProjectCard>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTOR 3: AGRO — light ─────────────────────────────────────────── */}
      <section className="py-16 md:py-32 border-t border-dark/5">
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 md:mb-14"
          >
            <SectorLabel number="03" />
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-dark flex items-center justify-center flex-shrink-0">
                <Wheat size={18} className="text-gold" />
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold tracking-tighter uppercase">
                Agro
              </h3>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ProjectCard>
              <p className="text-[9px] font-mono text-gold/70 uppercase tracking-widest mb-1">
                Fazenda Zanelato
              </p>
              <h4 className="font-serif font-bold text-xl mb-3">Domus Shalom Fortunae</h4>
              <LocationBadge text="Goiás – GO" />
              <p className="text-dark/55 text-xs font-sans leading-relaxed">
                Produção agropecuária.
              </p>
            </ProjectCard>

            <ProjectCard delay={0.1}>
              <h4 className="font-serif font-bold text-xl mb-3">Fazenda Liä Auri Fortunae</h4>
              <LocationBadge text="Goiás – GO" />
              <span className="inline-block text-[8px] font-mono uppercase tracking-widest px-2 py-1 border border-gold/30 text-gold/60">
                Projeto em desenvolvimento
              </span>
            </ProjectCard>
          </div>
        </div>
      </section>

      {/* ── SECTOR 4: IMOBILIÁRIO — dark ───────────────────────────────────── */}
      <section className="bg-dark text-white py-16 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="tech-grid w-full h-full" />
        </div>
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 md:mb-14"
          >
            <SectorLabel number="04" dark />
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gold flex items-center justify-center flex-shrink-0">
                <Building2 size={18} className="text-dark" />
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold tracking-tighter uppercase">
                Imobiliário
              </h3>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ProjectCard dark>
              <LocationBadge text="Goiás – GO" dark />
              <h4 className="font-serif font-bold text-xl mb-2">Receita Recorrente</h4>
              <p className="text-white/45 text-xs font-sans leading-relaxed">
                Portfólio de ativos imobiliários gerando retorno contínuo ao grupo.
              </p>
            </ProjectCard>

            <ProjectCard dark delay={0.1}>
              <LocationBadge text="Atibaia – São Paulo – SP" dark />
              <h4 className="font-serif font-bold text-xl mb-4">Loteamento Vitat</h4>
              <div className="flex items-center gap-3">
                <div className="px-4 py-3 border border-gold/20 bg-white/[0.03]">
                  <p className="text-[9px] font-mono text-gold/60 uppercase tracking-widest mb-1">
                    Total de lotes
                  </p>
                  <p className="text-2xl font-bold font-mono tracking-tight">700</p>
                </div>
              </div>
            </ProjectCard>
          </div>
        </div>
      </section>

      {/* ── SECTOR 5: FINTECH — light ──────────────────────────────────────── */}
      <section className="py-16 md:py-32 border-t border-dark/5">
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 md:mb-14"
          >
            <SectorLabel number="05" />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-dark flex items-center justify-center flex-shrink-0">
                <CreditCard size={18} className="text-gold" />
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold tracking-tighter uppercase">
                Fintech
              </h3>
            </div>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-14 items-start">
            {/* Left — brand + objective */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <div className="mb-8">
                <h4 className="text-4xl md:text-5xl font-serif font-bold tracking-tighter gold-gradient mb-4">
                  LEZ PAY
                </h4>
                <p className="text-dark/60 text-sm font-sans leading-[1.9]">
                  Infraestrutura financeira própria do grupo, centralizando pagamentos e criando uma nova fonte de receita.
                </p>
              </div>

              <div className="p-6 glass-card tech-border">
                <p className="text-[9px] font-mono text-gold/70 uppercase tracking-widest mb-4">
                  Centraliza pagamentos de
                </p>
                <BulletList
                  items={[
                    "Hotéis e resorts",
                    "Lojas de moda",
                    "Vendas online",
                    "Empreendimentos imobiliários",
                  ]}
                />
              </div>
            </motion.div>

            {/* Right — benefits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <p className="text-[9px] font-mono text-gold/70 uppercase tracking-widest mb-6">
                Benefícios estratégicos
              </p>
              <div className="space-y-3">
                {[
                  "Redução de taxas bancárias",
                  "Fidelização de clientes",
                  "Cashback e benefícios exclusivos",
                  "Plataforma digital própria",
                  "Nova fonte de receita financeira",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3 p-4 border border-dark/8 bg-white/40 backdrop-blur-sm group hover:border-gold/30 transition-colors"
                  >
                    <span className="text-[9px] font-mono text-gold/50 w-4 flex-shrink-0">
                      0{i + 1}
                    </span>
                    <span className="text-sm font-sans text-dark/70 group-hover:text-dark transition-colors">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── POSICIONAMENTO — dark ──────────────────────────────────────────── */}
      <section className="bg-dark text-white py-16 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="tech-grid w-full h-full" />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-8 h-[1px] bg-gold mx-auto mb-6" />
            <span className="text-gold text-[10px] font-mono uppercase tracking-[0.4em] font-bold block mb-6">
              Posicionamento do Grupo
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight tracking-tighter mb-6">
              Ecossistema Internacional de{" "}
              <span className="gold-gradient">Luxo & Lifestyle</span>
            </h2>
            <p className="text-white/50 text-sm font-sans leading-[1.9] mb-12">
              O Grupo LÉZ – NK Capital se posiciona como um ecossistema internacional de luxo e
              lifestyle, integrando múltiplos setores em uma estrutura coesa e escalável.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: "Turismo", Icon: Palmtree },
                { label: "Moda", Icon: ShoppingBag },
                { label: "Real Estate", Icon: Building2 },
                { label: "Agro", Icon: Wheat },
                { label: "Tecnologia Financeira", Icon: CreditCard },
              ].map(({ label, Icon }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 border border-gold/25 text-gold/70 hover:border-gold hover:text-gold transition-all"
                >
                  <Icon size={12} />
                  <span className="text-[10px] font-mono uppercase tracking-widest">{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
