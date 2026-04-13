/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useSpring, useInView } from "motion/react";
import {
  Building2,
  Palmtree,
  Cpu,
  ShoppingBag,
  Wheat,
  Target,
  Eye,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Quote,
  Activity,
  Layers,
  Globe,
  Menu,
  X
} from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import logoLez from "./logo-lez.png";
import fotoLia from "./foto-lia.jpeg";
import agronegocio from "./agronegocio.jpeg";
import devimob from "./desenvolvimento imobiliario.jpeg";
import hotelaria from "./hotelaria.jpeg";
import ChatWidget, { ChatSection } from "./ChatWidget";
import Portfolios from "./Portfolios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Section = ({ children, className = "", id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-16 md:py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative ${className}`}>
    {children}
  </section>
);

const TechImage = ({ src, alt, className = "", imgClassName = "" }: { src: string, alt: string, className?: string, imgClassName?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={`relative group overflow-hidden tech-border ${className}`}>
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
        className="w-full h-full"
      >
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${imgClassName}`}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gold/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </div>
  );
};

const PillarCard = ({ icon: Icon, title, percentage, description, index }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.8 }}
    className="p-8 glass-card hover:border-gold/50 transition-all group relative overflow-hidden tech-border"
  >
    <div className="flex justify-between items-start mb-6">
      <div className="p-3 bg-dark text-white group-hover:bg-gold transition-colors shadow-lg">
        <Icon size={20} />
      </div>
      <span className="text-3xl font-mono text-gold/30 group-hover:text-gold transition-colors font-bold">
        {percentage}%
      </span>
    </div>
    <h3 className="text-lg font-serif font-bold mb-3 uppercase tracking-wider">{title}</h3>
    <p className="text-dark/60 text-xs leading-relaxed font-sans">{description}</p>
    <div className="mt-6 h-[1px] w-full bg-dark/5 group-hover:bg-gold/20 transition-colors" />
  </motion.div>
);

const strategyData = [
  { name: 'Moda/Agro', value: 6, color: '#D4AF37' },
  { name: 'Tecnologia', value: 14, color: '#6B6B6B' },
  { name: 'Imobiliário', value: 18, color: '#C0C0C0' },
];

const donutData = [
  { name: 'Imobiliário', value: 70, color: '#000000' },
  { name: 'Hotelaria', value: 25, color: '#1A1A1A' },
  { name: 'Outros', value: 15, color: '#D4AF37' },
];

export default function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div ref={containerRef} className="relative bg-paper">
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gold z-[100] origin-left" style={{ scaleX }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-12 flex justify-between items-center bg-dark/90 backdrop-blur-md border-b border-white/5">
        <div className="font-serif font-bold text-xl tracking-tighter flex items-center gap-4">
          <img src={logoLez} alt="LÉZ.NK Logo" className="h-12 w-auto object-contain" />
          <span className="hidden sm:inline text-white">LÉZ.NK CAPITAL</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-white/60">
          <a href="#bio" className="hover:text-gold transition-colors">Bio</a>
          <a href="#holding" className="hover:text-gold transition-colors">Holding</a>
          <a href="#estrategia" className="hover:text-gold transition-colors">Estratégia</a>
          <a href="#objetivos" className="hover:text-gold transition-colors">Objetivos</a>
          <a href="#portfolio" className="hover:text-gold transition-colors">Portfólio</a>
          <a
            href="#ia"
            className="flex items-center gap-2 bg-gold text-dark px-4 py-2 hover:bg-white transition-all font-bold tracking-widest"
          >
            <span className="relative flex-shrink-0">
              <span className="absolute inset-0 rounded-full bg-dark/30 animate-ping" />
              <span className="w-1.5 h-1.5 rounded-full bg-dark inline-block relative z-10" />
            </span>
            LÉZ AI
          </a>
        </div>
        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-1 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 w-full bg-dark border-t border-white/5 py-6 px-6 flex flex-col gap-5 z-50"
          >
            {[
              { href: "#bio", label: "Bio" },
              { href: "#holding", label: "Holding" },
              { href: "#estrategia", label: "Estratégia" },
              { href: "#objetivos", label: "Objetivos" },
              { href: "#portfolio", label: "Portfólio" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/60 hover:text-gold transition-colors text-xs uppercase tracking-[0.25em] font-bold"
              >
                {label}
              </a>
            ))}
            <a
              href="#ia"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 bg-gold text-dark px-4 py-2 self-start font-bold text-xs uppercase tracking-widest"
            >
              <span className="relative flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-dark inline-block relative z-10" />
              </span>
              LÉZ AI
            </a>
          </motion.div>
        )}

        <div className="hidden md:flex items-center gap-4" />
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-dark">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070"
            alt="Modern Architecture"
            className="w-full h-full object-cover opacity-40 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-transparent to-dark" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="flex justify-center mb-8">
              <img src={logoLez} alt="LÉZ.NK Logo" className="h-20 md:h-32 w-auto object-contain" />
            </div>
            <h1 className="text-white text-5xl md:text-9xl font-serif font-bold mb-8 tracking-tighter leading-none">
              LÉZ.NK <br /> <span className="gold-gradient">CAPITAL</span>
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <p className="text-white/40 text-[10px] font-mono uppercase tracking-[0.3em]">
                grupolez.nkcapital.com.br
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </section>

      {/* Biography Section */}
      <div className="py-16 md:py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative" id="bio">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-stretch">

          {/* Image column */}
          <div className="relative flex-shrink-0 w-full h-72 md:h-auto md:w-[280px] lg:w-[320px]">
            <TechImage
              src={fotoLia}
              alt="Lia Eden Z'anelato"
              className="w-full h-full shadow-2xl"
              imgClassName="object-top"
            />
            <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-gold/20 -z-10" />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-gold/20 -z-10" />
          </div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex flex-col justify-between gap-5 md:gap-0"
          >
            {/* Title block */}
            <div>
              <div className="w-8 h-[1px] bg-gold mb-5" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold leading-tight tracking-tighter uppercase mb-0">
                BIOGRAFIA LÉZ. NK Capital LTDA<br />
                <span className="text-gold">Força, Propósito e Legado</span>
              </h2>
            </div>

            <p className="text-dark/70 font-sans text-sm leading-[1.8] text-justify">
              Fundada pela empresária <span className="text-dark font-semibold">Liä Éden Z'anelato</span>, a LÉZ. NK Capital LTDA nasceu quando, aos 40 anos, ela decidiu transformar sua trajetória e direcionar seus investimentos para uma visão mais ampla, estratégica e conectada a múltiplos conhecimentos.
            </p>

            <p className="text-dark/70 font-sans text-sm leading-[1.8] text-justify">
              Com olhar voltado para diferentes setores e oportunidades, Liä encontrou na diversificação a essência do seu propósito: construir negócios sólidos, sofisticados e capazes de deixar um legado.
            </p>

            <p className="text-dark/70 font-sans text-sm leading-[1.8] text-justify">
              A inspiração para o desenvolvimento da LÉZ. NK surgiu de uma frase que ela considera a grande virada de chave de sua vida:
            </p>

            {/* Quote block */}
            <div className="border-y border-dark/10 py-4 relative">
              <Quote className="text-gold/20 absolute -top-3 left-0" size={36} />
              <p className="text-xl font-serif italic text-dark leading-snug text-center">
                "Um se vira bem falado salva um legado."
              </p>
            </div>

            <p className="text-dark/70 font-sans text-sm leading-[1.8] text-justify">
              A frase foi ouvida em uma conversa marcante, ao conhecer uma pessoa que Liä descreve como um verdadeiro símbolo de força, determinação e superação. Esse encontro foi decisivo para que ela tirasse todos os seus projetos da gaveta e transformasse sonhos, ideias e planos em realidade.
            </p>

            <p className="font-semibold text-dark font-sans text-sm leading-[1.8] text-justify">
              Sua inspiração tem nome, história e propósito — e se tornou a base emocional e estratégica que fortalece a identidade da LÉZ. NK Capital LTDA.
            </p>
          </motion.div>

        </div>
      </div>

      {/* Presentation Section */}
      <section className="bg-dark text-white py-16 md:py-32 relative overflow-hidden" id="holding">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="tech-grid w-full h-full" />
        </div>
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-stretch">

            {/* Left block */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex-1 flex flex-col justify-between gap-6 md:gap-0"
            >
              <div>
                <div className="w-8 h-[1px] bg-gold mb-5" />
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight tracking-tighter">
                  Portfólio Estratégico para<br />
                  <span className="gold-gradient">Captação de Investidores</span>
                </h2>
              </div>

              <p className="text-white/60 font-sans text-sm leading-[1.9] text-justify">
                A LÉZ.NK Capital Holding nasce com o propósito de construir um grupo empresarial sólido, diversificado e escalável, reunindo negócios de alto potencial de valorização em diferentes setores da economia.
              </p>

              <p className="text-white/60 font-sans text-sm leading-[1.9] text-justify">
                A estratégia da holding é concentrar investimentos em segmentos com forte demanda, geração de caixa, patrimônio e possibilidade de expansão nacional e internacional, criando um ecossistema de empresas complementares e resilientes.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 glass-card border border-white/10">
                  <div className="text-gold font-mono text-[10px] mb-2 uppercase tracking-widest">Expansão</div>
                  <div className="text-base md:text-2xl font-bold">Global</div>
                </div>
                <div className="p-6 glass-card border border-white/10">
                  <div className="text-gold font-mono text-[10px] mb-2 uppercase tracking-widest">Classe de Ativo</div>
                  <div className="text-base md:text-2xl font-bold break-words">Multissetorial</div>
                </div>
              </div>
            </motion.div>

            {/* Right block — image */}
            <div className="relative flex-shrink-0 w-full h-64 md:h-auto md:w-[45%]">
              <TechImage
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069"
                alt="Corporate Strategy"
                className="w-full h-full shadow-2xl"
              />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-gold/10 blur-3xl rounded-full -z-10" />
            </div>

          </div>
        </div>
      </section>

      {/* Mission Vision Values Section */}
      <Section className="grid md:grid-cols-3 gap-8 items-stretch" id="mvv">

        {/* Missão */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-10 glass-card tech-border flex flex-col h-full"
        >
          <div className="w-14 h-14 bg-gold flex items-center justify-center text-white shadow-2xl flex-shrink-0">
            <Activity size={28} />
          </div>
          <h3 className="text-3xl font-serif font-bold uppercase tracking-tighter mt-8 mb-8">Missão</h3>
          <div className="flex-grow flex flex-col justify-between text-dark/60 text-sm font-sans text-justify">
            <p className="leading-[2]">
              Desenvolver, estruturar e expandir negócios de alto valor agregado a partir de ativos imobiliários, transformando patrimônio em liquidez, crescimento e diversificação inteligente.
            </p>
            <p className="leading-[2]">
              A holding busca construir um ecossistema empresarial sólido, rentável e sustentável, capaz de gerar patrimônio, impacto e retorno consistente para investidores e parceiros.
            </p>
          </div>
        </motion.div>

        {/* Visão */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="p-10 glass-card tech-border flex flex-col h-full"
        >
          <div className="w-14 h-14 bg-dark flex items-center justify-center text-white shadow-2xl flex-shrink-0">
            <Layers size={28} />
          </div>
          <h3 className="text-3xl font-serif font-bold uppercase tracking-tighter mt-8 mb-8">Visão</h3>
          <div className="flex-grow flex flex-col justify-between text-dark/60 text-sm font-sans text-justify">
            <p className="leading-[2]">
              Ser reconhecida como uma holding moderna e estratégica, referência em desenvolvimento imobiliário, investimentos, moda, negócios de luxo, hospitalidade e parcerias empresariais no Brasil.
            </p>
            <p className="leading-[2] text-dark/40 italic">
              Uma empresa construída sobre propósito, inovação e visão de longo prazo — capaz de transformar capital em legado duradouro para as próximas gerações.
            </p>
          </div>
        </motion.div>

        {/* Valores */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="p-10 glass-card tech-border flex flex-col h-full"
        >
          <div className="w-14 h-14 bg-gold/20 flex items-center justify-center text-gold shadow-2xl flex-shrink-0">
            <Globe size={28} />
          </div>
          <h3 className="text-3xl font-serif font-bold uppercase tracking-tighter mt-8 mb-8">Valores</h3>
          <ul className="flex-grow flex flex-col justify-between text-[10px] uppercase tracking-[0.2em] font-bold text-dark/80">
            {[
              "Visão de longo prazo",
              "Crescimento sustentável",
              "Credibilidade e transparência",
              "Inovação",
              "Diversificação inteligente",
              "Relacionamentos estratégicos",
              "Excelência na execução"
            ].map((valor, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <div className="w-1 h-1 bg-gold flex-shrink-0" /> {valor}
              </li>
            ))}
          </ul>
        </motion.div>

      </Section>

      {/* Objectives Timeline */}
      <Section id="objetivos">
        <div className="flex flex-col lg:flex-row gap-12 md:gap-24">
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-40">
              <span className="text-gold text-[10px] font-mono uppercase tracking-[0.4em] mb-4 block font-bold">2026 — 2036</span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 tracking-tighter leading-none">Objetivos <br /><span className="gold-gradient">Estratégicos</span></h2>
              <div className="p-6 border border-dark/5 bg-white/30 backdrop-blur-sm">
                <p className="text-xs text-dark/40 font-mono leading-relaxed">
                  Nosso planejamento é dividido em fases de execução técnica para garantir a escalabilidade e segurança do patrimônio.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-2/3 space-y-16 md:space-y-32">
            {[
              {
                phase: "Curto Prazo",
                time: "12 Meses",
                title: "Consolidação e Estruturação",
                items: [
                  "Estruturar a holding e consolidar sua identidade institucional.",
                  "Concentrar os primeiros investimentos em imobiliário e hotelaria.",
                  "Transformar ativos imobiliários em liquidez para financiar a expansão.",
                  "Criar rede de parceiros, fornecedores e investidores."
                ],
                color: "gold"
              },
              {
                phase: "Médio Prazo",
                time: "2 a 5 Anos",
                title: "Expansão e Diversificação",
                items: [
                  "Expandir para moda, lifestyle e agronegócio.",
                  "Construir fluxo de caixa recorrente através de ativos próprios.",
                  "Ampliar presença em estados estratégicos.",
                  "Criar marcas próprias e negócios escaláveis.",
                  "Atrair investidores institucionais e internacionais."
                ],
                color: "dark"
              },
              {
                phase: "Longo Prazo",
                time: "5 a 10 Anos",
                title: "Liderança Multissetorial",
                items: [
                  "Tornar-se uma holding multissetorial consolidada.",
                  "Construir patrimônio imobiliário e empresarial relevante.",
                  "Desenvolver operações nacionais e internacionais.",
                  "Criar um grupo empresarial com geração constante de valor."
                ],
                color: "gold"
              }
            ].map((obj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative pl-16 group"
              >
                <div className="absolute left-0 top-0 h-full w-[1px] bg-dark/10">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                    className="w-full bg-gold"
                  />
                </div>
                <div className="absolute -left-[5px] top-0 w-3 h-3 rounded-full bg-dark border-2 border-gold group-hover:scale-150 transition-transform" />

                <div className="flex items-center gap-4 mb-6">
                  <span className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1 ${obj.color === 'gold' ? 'bg-gold text-white' : 'bg-dark text-white'}`}>
                    {obj.phase}
                  </span>
                  <span className="text-[10px] font-mono text-dark/40">{obj.time}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-8 tracking-tight">{obj.title}</h3>
                <ul className="space-y-6">
                  {obj.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-4 text-dark/60 group/item">
                      <div className="mt-1.5 w-1.5 h-1.5 bg-gold rounded-full group-hover/item:scale-150 transition-transform" />
                      <span className="text-sm font-sans group-hover/item:text-dark transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Strategy Charts Section */}
      <section className="bg-dark text-white py-16 md:py-32 relative overflow-hidden" id="estrategia">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="tech-grid w-full h-full" />
        </div>
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative">

          {/* Header row */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-16 gap-8">
            <div>
              <div className="w-8 h-[1px] bg-gold mb-5" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 leading-none tracking-tighter">
                Estratégia de<br />Desenvolvimento
              </h2>
              <p className="text-white/25 text-xs font-sans font-mono uppercase tracking-widest">
                Análise quantitativa dos pilares de investimento e alocação estratégica de capital.
              </p>
            </div>
            <div className="flex gap-3 md:mt-0 mt-2">
              <div className="px-5 py-4 border border-white/8 bg-white/[0.02]">
                <div className="text-[9px] font-mono text-gold mb-1 uppercase tracking-widest">Ativos</div>
                <div className="text-xl font-bold tracking-tight">R$ 1.2B+</div>
              </div>
              <div className="px-5 py-4 border border-white/8 bg-white/[0.02]">
                <div className="text-[9px] font-mono text-gold mb-1 uppercase tracking-widest">Crescimento</div>
                <div className="text-xl font-bold tracking-tight">+24.5%</div>
              </div>
            </div>
          </div>

          {/* Main grid */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-stretch">

            {/* Left — donuts + pillars list */}
            <div className="flex-1 flex flex-col">

              {/* Donut charts */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { val: 70, label: "Imobiliário" },
                  { val: 25, label: "Hotelaria" },
                  { val: 15, label: "Inovação" },
                ].map(({ val, label }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="relative w-16 h-16 md:w-20 md:h-20">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[{ value: val }, { value: 100 - val }]}
                            innerRadius={22}
                            outerRadius={30}
                            paddingAngle={0}
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                            strokeWidth={0}
                          >
                            <Cell fill="#D4AF37" />
                            <Cell fill="rgba(255,255,255,0.06)" />
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex items-center justify-center text-[10px] md:text-xs font-mono font-bold text-gold">
                        {val}%
                      </div>
                    </div>
                    <span className="text-[7px] md:text-[8px] font-mono uppercase text-white/30 text-center tracking-widest">
                      {label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Pillars list */}
              <div className="flex-1 flex flex-col justify-between pt-6 border-t border-white/8">
                {[
                  { label: "Primeiro Pilar", title: "Desenvolvimento Imobiliário", id: "imobiliario" },
                  { label: "Segundo Pilar", title: "Hotelaria, Ecoturismo e Experiências", id: "hotelaria" },
                  { label: "Terceiro Pilar", title: "Tecnologia e Inovação", id: "tecnologia" },
                  { label: "Quarto Pilar", title: "Moda, Marca e Lifestyle", id: "moda" },
                  { label: "Quinto Pilar", title: "Agronegócio e Ativos Reais", id: "agronegocio" },
                ].map((item, i) => (
                  <a key={i} href={`#${item.id}`} className="flex items-center justify-between group cursor-pointer py-2">
                    <div>
                      <div className="text-[8px] font-mono text-gold/70 uppercase mb-1 tracking-widest">{item.label}</div>
                      <div className="text-sm md:text-base font-serif group-hover:translate-x-2 transition-transform duration-300">{item.title}</div>
                    </div>
                    <ArrowRight size={14} className="text-white/15 group-hover:text-gold transition-colors flex-shrink-0 ml-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right — bar chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex-1 min-h-[280px] md:min-h-0"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={strategyData} margin={{ top: 8, right: 0, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="1 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis
                    dataKey="name"
                    stroke="rgba(255,255,255,0.15)"
                    fontSize={9}
                    tickLine={false}
                    axisLine={false}
                    fontFamily="JetBrains Mono"
                    tick={{ fill: 'rgba(255,255,255,0.25)' }}
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.15)"
                    fontSize={9}
                    tickLine={false}
                    axisLine={false}
                    fontFamily="JetBrains Mono"
                    tick={{ fill: 'rgba(255,255,255,0.20)' }}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(212,175,55,0.04)' }}
                    contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(212,175,55,0.15)', fontSize: '10px', fontFamily: 'JetBrains Mono', color: '#fff' }}
                  />
                  <Bar dataKey="value" radius={[2, 2, 0, 0]} maxBarSize={64}>
                    {strategyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Real Estate Detail Section */}
      <section id="imobiliario" className="border-t border-dark/5 py-16 md:py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-14 items-start md:items-stretch">

          {/* Left block */}
          <div className="flex-1 flex flex-col min-w-0">

            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-8 h-[1px] bg-gold flex-shrink-0" />
                <span className="text-gold text-[10px] font-mono uppercase tracking-[0.4em] font-bold whitespace-nowrap">LÉZ.NK Capital</span>
              </div>
              <h2 className="font-serif font-bold tracking-tighter uppercase leading-[1.05]" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.9rem)' }}>
                DESENVOLVIMENTO<br />IMOBILIÁRIO
              </h2>
            </div>

            <div className="mt-6 md:mt-auto mb-6 text-dark/70 text-sm font-sans">
              <p className="font-bold text-dark mb-2 leading-snug">
                Investimento e principal base de crescimento da holding.
              </p>
              <p className="leading-[1.7] text-justify">
                Utilizar bens imobiliários para gerar liquidez, ampliar patrimônio e criar novas oportunidades de investimento. O setor imobiliário será a origem dos recursos e da valorização que sustentará a expansão para os demais negócios da holding.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 items-start">
              <div>
                <h4 className="text-gold font-mono text-[10px] uppercase tracking-widest font-bold mb-3">Estruturação</h4>
                <ul className="space-y-[7px] text-xs text-dark/70 font-sans">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold flex-shrink-0" />Condomínios residenciais de alto padrão</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold flex-shrink-0" />Casas e mansões de luxo</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold flex-shrink-0" />Loteamentos e urbanização</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold flex-shrink-0" />Retrofit e valorização de imóveis</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold flex-shrink-0" />Compra, venda e permuta de terrenos</li>
                </ul>
              </div>
              <div>
                <h4 className="text-gold font-mono text-[10px] uppercase tracking-widest font-bold mb-3">Objetivo</h4>
                <p className="text-xs italic text-dark/70 font-sans leading-[1.7]">
                  Transformar o segmento imobiliário na principal fonte de patrimônio, liquidez e rentabilidade da holding.
                </p>
              </div>
            </div>

          </div>

          {/* Right — image */}
          <div className="flex-shrink-0 w-full h-64 md:h-auto md:w-[38%]" style={{ aspectRatio: undefined }}>
            <div className="w-full h-full md:h-auto" style={{ aspectRatio: '1/1' }}>
              <TechImage
                src={devimob}
                alt="Luxury Real Estate"
                className="w-full h-full shadow-2xl"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Hospitality Detail Section */}
      <section className="bg-dark text-white py-16 md:py-32 relative overflow-hidden" id="hotelaria">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="tech-grid w-full h-full" />
        </div>
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-14 items-start md:items-stretch">

            {/* Image */}
            <div className="flex-shrink-0 w-full h-64 md:h-auto md:w-[42%]">
              <div className="w-full h-full md:h-auto" style={{ aspectRatio: '1/1' }}>
                <TechImage
                  src={hotelaria}
                  alt="Luxury Hospitality"
                  className="w-full h-full shadow-2xl"
                />
              </div>
            </div>

            {/* Text block */}
            <div className="flex-1 flex flex-col min-w-0">

              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-8 h-[1px] bg-gold flex-shrink-0" />
                  <span className="text-gold text-[10px] font-mono uppercase tracking-[0.4em] font-bold whitespace-nowrap">LÉZ.NK Capital</span>
                </div>
                <h2 className="font-serif font-bold tracking-tighter uppercase leading-[1.05]" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.9rem)' }}>
                  HOTELARIA ,<br />
                  ECOTURISMO,<br />
                  EXPERIÊNCIAS
                </h2>
              </div>

              <div className="mt-6 md:mt-auto mb-6 text-white/60 text-sm font-sans">
                <p className="font-bold text-white mb-2 leading-snug">
                  Investimento e principal base de crescimento da holding.
                </p>
                <p className="leading-[1.7] mb-3 text-justify">
                  A hotelaria será o segundo grande movimento estratégico do grupo, utilizando imóveis próprios ou adquiridos pela holding para criar operações com geração de caixa recorrente, valorização patrimonial e fortalecimento da marca.
                </p>
                <p className="leading-[1.7] text-justify">
                  A estratégia é selecionar localizações com alto potencial turístico, natureza preservada e procura crescente por experiências exclusivas, transformando esses ativos em empreendimentos de hospitalidade com posicionamento premium.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 items-start">
                <div>
                  <h4 className="text-gold font-mono text-[10px] uppercase tracking-widest font-bold mb-3">Estratégia</h4>
                  <ul className="space-y-[7px] text-[10px] text-white/60 font-sans">
                    <li className="flex items-start gap-2"><div className="mt-[5px] w-1 h-1 bg-gold shrink-0" />Adquirir ou desenvolver imóveis em regiões com potencial turístico e de valorização.</li>
                    <li className="flex items-start gap-2"><div className="mt-[5px] w-1 h-1 bg-gold shrink-0" />Transformar os ativos em hotéis boutique, pousadas de charme, casas de temporada ou operações de ecoturismo.</li>
                    <li className="flex items-start gap-2"><div className="mt-[5px] w-1 h-1 bg-gold shrink-0" />Integrar hotelaria, experiência, gastronomia e natureza em um único conceito.</li>
                    <li className="flex items-start gap-2"><div className="mt-[5px] w-1 h-1 bg-gold shrink-0" />Criar operações capazes de gerar renda recorrente, valorização do imóvel e fortalecimento da marca do grupo.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-gold font-mono text-[10px] uppercase tracking-widest font-bold mb-3">Possibilidades</h4>
                  <div className="flex flex-wrap gap-[6px]">
                    {["Boutique hotel", "Hotel fazenda", "Pousadas de charme", "Beach club", "Casas de temporada", "Espaços para eventos", "Ecoturismo"].map((p, i) => (
                      <span key={i} className="px-[7px] py-[3px] border border-gold/35 text-gold/65 text-[9px] uppercase tracking-widest font-mono">{p}</span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Technology Detail Section */}
      <section id="tecnologia" className="border-t border-dark/5 py-16 md:py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-14 items-start md:items-stretch">

          {/* LEFT — text block */}
          <div className="flex-1 flex flex-col min-w-0">

            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-8 h-[1px] bg-gold flex-shrink-0" />
                <span className="text-gold text-[10px] font-mono uppercase tracking-[0.4em] font-bold whitespace-nowrap">LÉZ.NK Capital</span>
              </div>
              <h2 className="font-serif font-bold tracking-tighter uppercase leading-[1.05]" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.9rem)' }}>
                TECNOLOGIA ,<br />
                NEGÓCIOS DIGITAIS,<br />
                INOVAÇÃO <br />
              </h2>
            </div>

            <div className="mt-6 md:mt-auto mb-6 text-dark/70 text-sm font-sans">
              <p className="font-bold text-dark mb-2 leading-snug">
                Tecnologia e negócios digitais como forma de criar escalabilidade.
              </p>
              <p className="leading-[1.7]">
                A holding vai aportar investimentos em tecnologia e negócios digitais como forma de criar escalabilidade, presença de marca e novas fontes de receita.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 items-start">
              <div>
                <h4 className="text-gold font-mono text-[10px] uppercase tracking-widest font-bold mb-3">Possibilidades</h4>
                <ul className="space-y-[7px] text-xs text-dark/70 font-sans">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold flex-shrink-0" />Plataformas digitais</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold flex-shrink-0" />Aplicativos e soluções tecnológicas</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold flex-shrink-0" />Marketing e mídia digital</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold flex-shrink-0" />Produção de conteúdo</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold flex-shrink-0" />Cursos, mentorias e networking</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold flex-shrink-0" />Automação e inteligência para os negócios do grupo</li>
                </ul>
              </div>
              <div>
                <h4 className="text-gold font-mono text-[10px] uppercase tracking-widest font-bold mb-3">Objetivo</h4>
                <p className="text-xs italic text-dark/70 font-sans leading-[1.8]">
                  Criar negócios escaláveis, com baixo custo operacional e alto potencial de crescimento, gerando presença de marca, receita recorrente e inteligência aplicada aos demais braços da holding.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT — image */}
          <div className="flex-shrink-0 w-full h-64 md:h-auto md:w-[42%]">
            <div className="w-full h-full md:h-auto" style={{ aspectRatio: '1/1' }}>
              <TechImage
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070"
                alt="Technology and Innovation"
                className="w-full h-full shadow-2xl"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Fashion Detail Section */}
      <section className="bg-dark text-white py-16 md:py-32 relative overflow-hidden" id="moda">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="tech-grid w-full h-full" />
        </div>
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-14 items-start md:items-stretch">

            {/* Image */}
            <div className="flex-shrink-0 w-full h-64 md:h-auto md:w-[42%]">
              <div className="w-full h-full md:h-auto" style={{ aspectRatio: '1/1' }}>
                <TechImage
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2070"
                  alt="Fashion and Lifestyle"
                  className="w-full h-full shadow-2xl"
                />
              </div>
            </div>

            {/* Text block */}
            <div className="flex-1 flex flex-col min-w-0">

              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-8 h-[1px] bg-gold flex-shrink-0" />
                  <span className="text-gold text-[10px] font-mono uppercase tracking-[0.4em] font-bold whitespace-nowrap">LÉZ.NK Capital</span>
                </div>
                <h2 className="font-serif font-bold tracking-tighter uppercase leading-[1.05]" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.9rem)' }}>
                  M O D A,    M A R C A,<br />
                 L I F E S T Y L E <br />
                </h2>
              </div>

              <div className="mt-6 md:mt-auto mb-6 text-white/60 text-sm font-sans">
                <p className="font-bold text-white leading-snug">
                  Desenvolvimento de marca própria focada em posicionamento premium e lifestyle.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 items-start">
                <div>
                  <h4 className="text-gold font-mono text-[10px] uppercase tracking-widest font-bold mb-3">Possibilidades</h4>
                  <ul className="space-y-[7px] text-[10px] text-white/60 font-sans">
                    <li className="flex items-start gap-2"><div className="mt-[5px] w-1 h-1 bg-gold shrink-0" />Marca de roupas e acessórios</li>
                    <li className="flex items-start gap-2"><div className="mt-[5px] w-1 h-1 bg-gold shrink-0" />Linha de produtos exclusivos</li>
                    <li className="flex items-start gap-2"><div className="mt-[5px] w-1 h-1 bg-gold shrink-0" />Parcerias com influenciadores e celebridades</li>
                    <li className="flex items-start gap-2"><div className="mt-[5px] w-1 h-1 bg-gold shrink-0" />Eventos e campanhas de branding</li>
                    <li className="flex items-start gap-2"><div className="mt-[5px] w-1 h-1 bg-gold shrink-0" />Expansão para e-commerce e lojas conceito</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-gold font-mono text-[10px] uppercase tracking-widest font-bold mb-3">Objetivo</h4>
                  <p className="text-xs italic text-white/60 font-sans leading-[1.8]">
                    Criar uma marca forte, com identidade própria, capaz de gerar valor emocional, recorrência de receita e ampliar o reconhecimento do grupo nos segmentos de luxo e lifestyle.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Agribusiness Detail Section */}
      <section id="agronegocio" className="border-t border-dark/5 py-16 md:py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-14 items-start md:items-stretch">

          {/* LEFT — text block */}
          <div className="flex-1 flex flex-col min-w-0">

            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-8 h-[1px] bg-gold flex-shrink-0" />
                <span className="text-gold text-[10px] font-mono uppercase tracking-[0.4em] font-bold whitespace-nowrap">LÉZ.NK Capital</span>
              </div>
              <h2
                className="font-serif font-bold tracking-tighter uppercase leading-[1.05]"
                style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.9rem)' }}
              >
                A G R O N E G Ó C I O <br />
                A T I V O S &nbsp;&nbsp; R U R A I S
              </h2>
            </div>

            <div className="mt-6 md:mt-auto mb-6 text-dark/70 text-sm font-sans">
              <p className="font-bold text-dark leading-snug">
                Investimentos em ativos reais como forma de proteção patrimonial e expansão futura.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 items-start">
              <div>
                <h4 className="text-gold font-mono text-[10px] uppercase tracking-widest font-bold mb-3">Possibilidades</h4>
                <ul className="space-y-[11px] text-xs text-dark/70 font-sans">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold flex-shrink-0" />Terras e fazendas</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold flex-shrink-0" />Produção rural</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold flex-shrink-0" />Projetos de valorização de terras</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold flex-shrink-0" />Parcerias em commodities e logística</li>
                </ul>
              </div>
              <div>
                <h4 className="text-gold font-mono text-[10px] uppercase tracking-widest font-bold mb-3">Objetivo</h4>
                <p className="text-xs italic text-dark/70 font-sans leading-[2]">
                  Criar segurança patrimonial, equilíbrio para o portfólio e uma base sólida de longo prazo, gerando reserva de valor e oportunidades de expansão para os demais negócios da holding.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT — image */}
          <div className="flex-shrink-0 w-full h-64 md:h-auto md:w-[42%]">
            <div className="w-full h-full md:h-auto" style={{ aspectRatio: '1/1' }}>
              <TechImage
                src={agronegocio}
                alt="Agribusiness"
                className="w-full h-full shadow-2xl"
              />
            </div>
          </div>

        </div>
      </section>

      <Portfolios />

      <ChatSection />

      <footer className="bg-dark text-white py-16 md:py-32 relative overflow-hidden">
        <Section className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-20"
          >
            <div className="flex justify-center mb-8 md:mb-12">
              <img src={logoLez} alt="LÉZ.NK Logo" className="h-16 md:h-24 w-auto object-contain" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold mb-6 tracking-tighter">LÉZ.NK <span className="gold-gradient">CAPITAL</span></h2>
            <p className="text-white/40 font-mono uppercase tracking-[0.5em] text-[10px]">grupolez.nkcapital.com.br</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 w-full pt-10 md:pt-20 border-t border-white/5 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
            <div className="space-y-4">
              <p className="text-gold font-bold mb-6">Escritório</p>
              <p className="hover:text-white transition-colors cursor-pointer">São Paulo, Brasil</p>
              <p className="hover:text-white transition-colors cursor-pointer">Av. Faria Lima, 4500</p>
            </div>
            <div className="space-y-4">
              <p className="text-gold font-bold mb-6">Contato</p>
              <p className="hover:text-white transition-colors cursor-pointer">invest@leznkcapital.com</p>
              <p className="hover:text-white transition-colors cursor-pointer">+55 11 9999-9999</p>
            </div>
            <div className="space-y-4">
              <p className="text-gold font-bold mb-6">Legal</p>
              <p>© 2026 LÉZ.NK Capital LTDA</p>
              <p>Todos os direitos reservados</p>
            </div>
          </div>
        </Section>
      </footer>

      <ChatWidget />
    </div>
  );
}
