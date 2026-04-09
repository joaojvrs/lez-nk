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
  Globe
} from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
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
  <section id={id} className={`py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative ${className}`}>
    {children}
  </section>
);

const TechImage = ({ src, alt, className = "" }: { src: string, alt: string, className?: string }) => {
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
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gold/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
      {/* Tech Overlays */}
      <div className="absolute top-4 right-4 flex gap-2">
        <div className="w-1 h-1 bg-gold rounded-full animate-ping" />
        <div className="text-[8px] font-mono text-gold uppercase tracking-tighter">Live_Feed</div>
      </div>
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
  { name: 'Tecnologia', value: 14, color: '#1A1A1A' },
  { name: 'Imobiliário', value: 18, color: '#000000' },
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

  return (
    <div ref={containerRef} className="relative bg-paper tech-grid">
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gold z-[100] origin-left" style={{ scaleX }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-12 flex justify-between items-center bg-dark/90 backdrop-blur-md border-b border-white/5">
        <div className="font-serif font-bold text-xl tracking-tighter flex items-center gap-4">
          <img src="/LOGO LEZ.png" alt="LÉZ.NK Logo" className="h-12 w-auto object-contain" />
          <span className="hidden sm:inline text-white">LÉZ.NK CAPITAL</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-white/60">
          <a href="#bio" className="hover:text-gold transition-colors">Bio</a>
          <a href="#holding" className="hover:text-gold transition-colors">Holding</a>
          <a href="#estrategia" className="hover:text-gold transition-colors">Estratégia</a>
          <a href="#objetivos" className="hover:text-gold transition-colors">Objetivos</a>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-[8px] font-mono text-white/40 uppercase">System_Status</span>
            <span className="text-[8px] font-mono text-green-500 uppercase">Online_Secure</span>
          </div>
          <button className="bg-gold text-dark px-6 py-2 text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-xl font-bold">
            Investir
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-dark">
        <div className="scanline" />
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
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[1px] w-8 bg-gold/50" />
              <span className="text-gold text-[10px] font-mono uppercase tracking-[0.5em] font-medium">
                ESTRUTURAÇÃO_GRUPO_V2.0
              </span>
              <div className="h-[1px] w-8 bg-gold/50" />
            </div>
            <div className="flex justify-center mb-8">
              <img src="/LOGO LEZ.png" alt="LÉZ.NK Logo" className="h-32 w-auto object-contain" />
            </div>
            <h1 className="text-white text-6xl md:text-9xl font-serif font-bold mb-8 tracking-tighter leading-none">
              LÉZ.NK <br /> <span className="gold-gradient">CAPITAL</span>
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <p className="text-white/40 text-[10px] font-mono uppercase tracking-[0.3em]">
                grupolez.nkcapital.com.br
              </p>
              <div className="hidden md:block w-2 h-2 rounded-full bg-gold animate-pulse" />
              <p className="text-white/40 text-[10px] font-mono uppercase tracking-[0.3em]">
                LAT: -23.5505 | LONG: -46.6333
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
          <span className="text-[8px] font-mono uppercase tracking-widest">System_Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </section>

      {/* Biography Section */}
      <Section className="grid md:grid-cols-2 gap-24 items-center" id="bio">
        <div className="relative">
          <TechImage 
            src="/foto lia.jpeg" 
            alt="Liä Éden Z’anelato" 
            className="aspect-[3/4] shadow-2xl"
          />
          <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-gold/20 -z-10" />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-gold/20 -z-10" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-gold" />
            <span className="text-gold text-[10px] font-mono uppercase tracking-[0.4em] font-bold">Founder_Profile</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight tracking-tighter uppercase">
            BIOGRAFIA LÉZ. NK Capital LTDA <br />
            <span className="text-gold">Força, Propósito e Legado</span>
          </h2>
          <div className="space-y-6 text-dark/70 leading-relaxed font-sans text-sm">
            <p className="border-l-2 border-gold/20 pl-6">
              Fundada pela empresária <span className="text-dark font-bold">Liä Éden Z’anelato</span>, a LÉZ. NK Capital LTDA nasceu quando, aos 40 anos, ela decidiu transformar sua trajetória e direcionar seus investimentos para uma visão mais ampla, estratégica e conectada a múltiplos conhecimentos.
            </p>
            <p>
              Com olhar voltado para diferentes setores e oportunidades, Liä encontrou na diversificação a essência do seu propósito: construir negócios sólidos, sofisticados e capazes de deixar um legado.
            </p>
            <p>
              A inspiração para o desenvolvimento da LÉZ. NK surgiu de uma frase que ela considera a grande virada de chave de sua vida:
            </p>
            <div className="py-6 border-y border-dark/10 relative my-8">
              <Quote className="text-gold/20 absolute -top-4 -left-4" size={48} />
              <p className="text-2xl font-serif italic text-dark leading-snug text-center">
                “Um se vira bem falado salva um legado.”
              </p>
            </div>
            <p>
              A frase foi ouvida em uma conversa marcante, ao conhecer uma pessoa que Liä descreve como um verdadeiro símbolo de força, determinação e superação. Esse encontro foi decisivo para que ela tirasse todos os seus projetos da gaveta e transformasse sonhos, ideias e planos em realidade.
            </p>
            <p className="font-medium text-dark">
              Sua inspiração tem nome, história e propósito — e se tornou a base emocional e estratégica que fortalece a identidade da LÉZ. NK Capital LTDA.
            </p>
          </div>
        </motion.div>
      </Section>

      {/* Presentation Section */}
      <section className="bg-dark text-white py-32 relative overflow-hidden" id="holding">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="tech-grid w-full h-full" />
        </div>
        <Section className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-gold" />
              <span className="text-gold text-[10px] font-mono uppercase tracking-[0.4em] font-bold">Apresentação_Executiva</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8 leading-none tracking-tighter">
              Portfólio Estratégico para <br />
              <span className="gold-gradient">Captação de Investidores</span>
            </h2>
            <div className="space-y-6 text-white/60 font-sans text-sm leading-relaxed">
              <p>
                A LÉZ.NK Capital Holding nasce com o propósito de construir um grupo empresarial sólido, diversificado e escalável, reunindo negócios de alto potencial de valorização em diferentes setores.
              </p>
              <p>
                A estratégia da holding é concentrar investimentos em segmentos com forte demanda, geração de caixa, patrimônio e possibilidade de expansão nacional e internacional.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-4">
              <div className="p-6 glass-card border-white/10">
                <div className="text-gold font-mono text-[10px] mb-2">Expansion_Index</div>
                <div className="text-2xl font-bold">Global_Ready</div>
              </div>
              <div className="p-6 glass-card border-white/10">
                <div className="text-gold font-mono text-[10px] mb-2">Asset_Class</div>
                <div className="text-2xl font-bold">Multi_Sector</div>
              </div>
            </div>
          </motion.div>
          <div className="relative">
            <TechImage 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069" 
              alt="Corporate Strategy" 
              className="aspect-video"
            />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-gold/10 blur-3xl rounded-full -z-10" />
          </div>
        </Section>
      </section>

      {/* Mission Vision Values Section */}
      <Section className="grid md:grid-cols-3 gap-12" id="mvv">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8 p-10 glass-card tech-border flex flex-col h-full"
        >
          <div className="w-14 h-14 bg-gold flex items-center justify-center text-white shadow-2xl">
            <Activity size={28} />
          </div>
          <h3 className="text-3xl font-serif font-bold uppercase tracking-tighter">Missão</h3>
          <div className="space-y-4 text-dark/60 text-sm leading-relaxed font-sans flex-grow">
            <p>
              Desenvolver, estruturar e expandir negócios de alto valor agregado a partir de ativos imobiliários, transformando patrimônio em liquidez, crescimento e diversificação inteligente.
            </p>
            <p>
              A holding busca construir um ecossistema empresarial sólido, rentável e sustentável, capaz de gerar patrimônio, impacto e retorno consistente para investidores e parceiros.
            </p>
          </div>
          <div className="text-[10px] font-mono text-gold/40">CORE_OBJECTIVE_01</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-8 p-10 glass-card tech-border flex flex-col h-full"
        >
          <div className="w-14 h-14 bg-dark flex items-center justify-center text-white shadow-2xl">
            <Layers size={28} />
          </div>
          <h3 className="text-3xl font-serif font-bold uppercase tracking-tighter">Visão</h3>
          <p className="text-dark/60 text-sm leading-relaxed font-sans flex-grow">
            Ser reconhecida como uma holding moderna e estratégica, referência em desenvolvimento imobiliário, investimentos, moda, negócios de luxo, hospitalidade e parcerias empresariais no Brasil.
          </p>
          <div className="text-[10px] font-mono text-dark/20">FUTURE_STATE_2030</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="space-y-8 p-10 glass-card tech-border flex flex-col h-full"
        >
          <div className="w-14 h-14 bg-gold/20 flex items-center justify-center text-gold shadow-2xl">
            <Globe size={28} />
          </div>
          <h3 className="text-3xl font-serif font-bold uppercase tracking-tighter">Valores</h3>
          <ul className="space-y-3 text-[10px] uppercase tracking-[0.2em] font-bold text-dark/80 flex-grow">
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
                <div className="w-1 h-1 bg-gold" /> {valor}
              </li>
            ))}
          </ul>
          <div className="text-[10px] font-mono text-gold/40">ETHICAL_FRAMEWORK</div>
        </motion.div>
      </Section>

      {/* Objectives Timeline */}
      <Section id="objetivos">
        <div className="flex flex-col lg:flex-row gap-24">
          <div className="lg:w-1/3">
            <div className="sticky top-40">
              <span className="text-gold text-[10px] font-mono uppercase tracking-[0.4em] mb-4 block font-bold">Roadmap_2026_2036</span>
              <h2 className="text-6xl font-serif font-bold mb-8 tracking-tighter leading-none">Objetivos <br /><span className="gold-gradient">Estratégicos</span></h2>
              <div className="p-6 border border-dark/5 bg-white/30 backdrop-blur-sm">
                <p className="text-xs text-dark/40 font-mono leading-relaxed">
                  Nosso planejamento é dividido em fases de execução técnica para garantir a escalabilidade e segurança do patrimônio.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-2/3 space-y-32">
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
                <h3 className="text-3xl font-serif font-bold mb-8 tracking-tight">{obj.title}</h3>
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
      <section className="bg-dark text-white py-32 relative overflow-hidden" id="estrategia">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="tech-grid w-full h-full" />
        </div>
        <Section>
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <span className="text-gold text-[10px] font-mono uppercase tracking-[0.4em] mb-4 block font-bold">Data_Visualization</span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-none tracking-tighter">Estratégia de <br />Desenvolvimento</h2>
              <p className="text-white/40 text-sm font-sans">Análise quantitativa dos pilares de investimento e alocação estratégica de capital.</p>
            </div>
            <div className="flex gap-4">
              <div className="p-4 border border-white/10 glass-card">
                <div className="text-[10px] font-mono text-gold mb-1">Total_Assets</div>
                <div className="text-xl font-bold">R$ 1.2B+</div>
              </div>
              <div className="p-4 border border-white/10 glass-card">
                <div className="text-[10px] font-mono text-gold mb-1">Growth_Rate</div>
                <div className="text-xl font-bold">+24.5%</div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Donut Charts Simulation */}
            <div className="space-y-12">
              <div className="grid grid-cols-3 gap-4">
                {[70, 25, 15].map((val, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="relative w-24 h-24">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[{ value: val }, { value: 100 - val }]}
                            innerRadius={35}
                            outerRadius={45}
                            paddingAngle={0}
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                          >
                            <Cell fill={i === 0 ? "#D4AF37" : i === 1 ? "#FFFFFF" : "#444"} />
                            <Cell fill="rgba(255,255,255,0.05)" />
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex items-center justify-center text-sm font-mono font-bold">
                        {val}%
                      </div>
                    </div>
                    <span className="text-[8px] font-mono uppercase text-white/40 text-center">
                      {i === 0 ? "Imobiliário" : i === 1 ? "Hotelaria" : "Inovação"}
                    </span>
                  </motion.div>
                ))}
              </div>
              
              <div className="space-y-6 pt-8 border-t border-white/10">
                {[
                  { label: "Primeiro Pilar", title: "Desenvolvimento Imobiliário", color: "gold", id: "imobiliario" },
                  { label: "Segundo Pilar", title: "Hotelaria, Ecoturismo e Experiências", color: "white", id: "hotelaria" },
                  { label: "Terceiro Pilar", title: "Tecnologia e Inovação", color: "gray", id: "tecnologia" },
                  { label: "Quarto Pilar", title: "Moda, Marca e Lifestyle", color: "gold", id: "moda" },
                  { label: "Quinto Pilar", title: "Agronegócio e Ativos Reais", color: "white", id: "agronegocio" },
                ].map((item, i) => (
                  <a key={i} href={`#${item.id}`} className="flex items-center justify-between group cursor-pointer">
                    <div>
                      <div className="text-[8px] font-mono text-gold uppercase mb-1">{item.label}</div>
                      <div className="text-lg font-serif group-hover:translate-x-2 transition-transform">{item.title}</div>
                    </div>
                    <ArrowRight size={16} className="text-white/20 group-hover:text-gold transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Bar Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="h-[400px] w-full p-8 glass-card border-white/5"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={strategyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="rgba(255,255,255,0.3)" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    fontFamily="JetBrains Mono"
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.3)" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    fontFamily="JetBrains Mono"
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(212,175,55,0.2)', fontSize: '10px', fontFamily: 'JetBrains Mono' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {strategyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 flex justify-between text-[8px] font-mono text-white/20 uppercase">
                <span>Metric_ID: STRAT_001</span>
                <span>Last_Updated: 2026.04.09</span>
              </div>
            </motion.div>
          </div>
        </Section>
      </section>

      {/* Real Estate Detail Section */}
      <Section id="imobiliario" className="border-t border-dark/5">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-gold" />
              <span className="text-gold text-[10px] font-mono uppercase tracking-[0.4em] font-bold">LÉZ.NK Capital</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight tracking-tighter uppercase">
              D E S E N V O L V I M E N T O <br />
              I M O B I L I Á R I O
            </h2>
            <div className="space-y-6 text-dark/70 text-sm leading-relaxed font-sans">
              <p className="font-bold text-dark">Investimento e principal base de crescimento da holding.</p>
              <p>
                Utilizar bens imobiliários para gerar liquidez, ampliar patrimônio e criar novas oportunidades de investimento. O setor imobiliário será a origem dos recursos e da valorização que sustentará a expansão para os demais negócios.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 pt-8">
                <div className="space-y-4">
                  <h4 className="text-gold font-mono text-[10px] uppercase tracking-widest font-bold">Estruturação</h4>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold" /> Condomínios residenciais de alto padrão</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold" /> Casas e mansões de luxo</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold" /> Loteamentos e urbanização</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold" /> Retrofit e valorização de imóveis</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold" /> Compra, venda e permuta de terrenos estratégicos</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-gold font-mono text-[10px] uppercase tracking-widest font-bold">Objetivo</h4>
                  <p className="text-xs italic">
                    Transformar o segmento imobiliário na principal fonte de patrimônio, liquidez e rentabilidade da holding.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <TechImage 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070" 
              alt="Luxury Real Estate" 
              className="aspect-square"
            />
          </div>
        </div>
      </Section>

      {/* Hospitality Detail Section */}
      <section className="bg-dark text-white py-32 relative overflow-hidden" id="hotelaria">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="tech-grid w-full h-full" />
        </div>
        <Section>
          <div className="flex flex-col lg:flex-row-reverse gap-24 items-center">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-[1px] bg-gold" />
                <span className="text-gold text-[10px] font-mono uppercase tracking-[0.4em] font-bold">LÉZ.NK Capital</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight tracking-tighter uppercase">
                H O T E L A R I A , <br />
                E C O T U R I S M O <br />
                E E X P E R I Ê N C I A S
              </h2>
              <div className="space-y-6 text-white/60 text-sm leading-relaxed font-sans">
                <p className="font-bold text-white">Investimento e principal base de crescimento da holding.</p>
                <p>
                  A hotelaria será o segundo grande movimento estratégico do grupo, utilizando imóveis próprios ou adquiridos pela holding para criar operações com geração de caixa recorrente, valorização patrimonial e fortalecimento da marca.
                </p>
                <p>
                  A estratégia é selecionar localizações com alto potencial turístico, natureza preservada e procura crescente por experiências exclusivas, transformando esses ativos em empreendimentos de hospitalidade com posicionamento premium.
                </p>

                <div className="grid md:grid-cols-2 gap-8 pt-8">
                  <div className="space-y-4">
                    <h4 className="text-gold font-mono text-[10px] uppercase tracking-widest font-bold">Estratégia</h4>
                    <ul className="space-y-2 text-[10px]">
                      <li className="flex items-start gap-2"><div className="mt-1 w-1 h-1 bg-gold shrink-0" /> Adquirir ou desenvolver imóveis em regiões com potencial turístico e de valorização.</li>
                      <li className="flex items-start gap-2"><div className="mt-1 w-1 h-1 bg-gold shrink-0" /> Transformar os ativos em hotéis boutique, pousadas de charme, casas de temporada ou operações de ecoturismo.</li>
                      <li className="flex items-start gap-2"><div className="mt-1 w-1 h-1 bg-gold shrink-0" /> Integrar hotelaria, experiência, gastronomia e natureza em um único conceito.</li>
                      <li className="flex items-start gap-2"><div className="mt-1 w-1 h-1 bg-gold shrink-0" /> Criar operações capazes de gerar renda recorrente, valorização do imóvel e fortalecimento da marca do grupo.</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-gold font-mono text-[10px] uppercase tracking-widest font-bold">Possibilidades</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Boutique hotel", "Hotel fazenda", "Pousadas de charme", "Beach club", "Casas de temporada de alto padrão", "Espaços para eventos", "Ecoturismo"].map((p, i) => (
                        <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 text-[9px] uppercase tracking-tighter">{p}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <TechImage 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070" 
                alt="Luxury Hospitality" 
                className="aspect-square"
              />
            </div>
          </div>
        </Section>
      </section>

      {/* Technology Detail Section */}
      <Section id="tecnologia" className="border-t border-dark/5">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-gold" />
              <span className="text-gold text-[10px] font-mono uppercase tracking-[0.4em] font-bold">LÉZ.NK Capital</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight tracking-tighter uppercase">
              T E C N O L O G I A , <br />
              N E G Ó C I O S <br />
              D I G I T A I S <br />
              E I N O V A Ç Ã O
            </h2>
            <div className="space-y-6 text-dark/70 text-sm leading-relaxed font-sans">
              <p className="font-bold text-dark">Tecnologia e negócios digitais como forma de criar escalabilidade.</p>
              <p>
                A holding vai aportar investimentos em tecnologia e negócios digitais como forma de criar escalabilidade, presença de marca e novas fontes de receita.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 pt-8">
                <div className="space-y-4">
                  <h4 className="text-gold font-mono text-[10px] uppercase tracking-widest font-bold">Possibilidades</h4>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold" /> Plataformas digitais</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold" /> Aplicativos e soluções tecnológicas</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold" /> Marketing e mídia digital</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold" /> Produção de conteúdo</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold" /> Cursos, mentorias e networking</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold" /> Automação e inteligência para os negócios do grupo</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-gold font-mono text-[10px] uppercase tracking-widest font-bold">Objetivo</h4>
                  <p className="text-xs italic">
                    Criar negócios escaláveis, com baixo custo operacional e alto potencial de crescimento.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <TechImage 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070" 
              alt="Technology and Innovation" 
              className="aspect-square"
            />
          </div>
        </div>
      </Section>

      {/* Fashion Detail Section */}
      <section className="bg-dark text-white py-32 relative overflow-hidden" id="moda">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="tech-grid w-full h-full" />
        </div>
        <Section>
          <div className="flex flex-col lg:flex-row-reverse gap-24 items-center">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-[1px] bg-gold" />
                <span className="text-gold text-[10px] font-mono uppercase tracking-[0.4em] font-bold">LÉZ.NK Capital</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight tracking-tighter uppercase">
                M O D A , <br />
                M A R C A <br />
                E L I F E S T Y L E
              </h2>
              <div className="space-y-6 text-white/60 text-sm leading-relaxed font-sans">
                <p className="font-bold text-white">Desenvolvimento de marca própria focada em posicionamento premium e lifestyle.</p>
                
                <div className="grid md:grid-cols-2 gap-8 pt-8">
                  <div className="space-y-4">
                    <h4 className="text-gold font-mono text-[10px] uppercase tracking-widest font-bold">Possibilidades</h4>
                    <ul className="space-y-2 text-[10px]">
                      <li className="flex items-start gap-2"><div className="mt-1 w-1 h-1 bg-gold shrink-0" /> Marca de roupas e acessórios</li>
                      <li className="flex items-start gap-2"><div className="mt-1 w-1 h-1 bg-gold shrink-0" /> Linha de produtos exclusivos</li>
                      <li className="flex items-start gap-2"><div className="mt-1 w-1 h-1 bg-gold shrink-0" /> Parcerias com influenciadores e celebridades</li>
                      <li className="flex items-start gap-2"><div className="mt-1 w-1 h-1 bg-gold shrink-0" /> Eventos e campanhas de branding</li>
                      <li className="flex items-start gap-2"><div className="mt-1 w-1 h-1 bg-gold shrink-0" /> Expansão para e-commerce e lojas conceito</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-gold font-mono text-[10px] uppercase tracking-widest font-bold">Objetivo</h4>
                    <p className="text-xs italic">
                      Criar uma marca forte, com identidade própria, capaz de gerar valor emocional e recorrência de receita.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <TechImage 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2070" 
                alt="Fashion and Lifestyle" 
                className="aspect-square"
              />
            </div>
          </div>
        </Section>
      </section>

      {/* Agribusiness Detail Section */}
      <Section id="agronegocio" className="border-t border-dark/5">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-gold" />
              <span className="text-gold text-[10px] font-mono uppercase tracking-[0.4em] font-bold">LÉZ.NK Capital</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight tracking-tighter uppercase">
              A G R O N E G Ó C I O <br />
              E A T I V O S <br />
              R E A I S
            </h2>
            <div className="space-y-6 text-dark/70 text-sm leading-relaxed font-sans">
              <p className="font-bold text-dark">Investimentos em ativos reais como forma de proteção patrimonial e expansão futura.</p>
              
              <div className="grid md:grid-cols-2 gap-8 pt-8">
                <div className="space-y-4">
                  <h4 className="text-gold font-mono text-[10px] uppercase tracking-widest font-bold">Possibilidades</h4>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold" /> Terras e fazendas</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold" /> Produção rural</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold" /> Projetos de valorização de terras</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold" /> Parcerias em commodities e logística</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-gold font-mono text-[10px] uppercase tracking-widest font-bold">Objetivo</h4>
                  <p className="text-xs italic">
                    Criar segurança patrimonial, equilíbrio para o portfólio e uma base sólida de longo prazo.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <TechImage 
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2070" 
              alt="Agribusiness" 
              className="aspect-square"
            />
          </div>
        </div>
      </Section>
      <footer className="bg-dark text-white py-32 relative overflow-hidden">
        <div className="scanline" />
        <Section className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex justify-center mb-12">
              <img src="/LOGO LEZ.png" alt="LÉZ.NK Logo" className="h-24 w-auto object-contain" />
            </div>
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tighter">LÉZ.NK <span className="gold-gradient">CAPITAL</span></h2>
            <p className="text-white/40 font-mono uppercase tracking-[0.5em] text-[10px]">grupolez.nkcapital.com.br</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-16 w-full pt-20 border-t border-white/5 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
            <div className="space-y-4">
              <p className="text-gold font-bold mb-6">Location_Data</p>
              <p className="hover:text-white transition-colors cursor-pointer">São Paulo, BR_HQ</p>
              <p className="hover:text-white transition-colors cursor-pointer">Av. Faria Lima, 4500</p>
            </div>
            <div className="space-y-4">
              <p className="text-gold font-bold mb-6">Comms_Channel</p>
              <p className="hover:text-white transition-colors cursor-pointer">invest@leznkcapital.com</p>
              <p className="hover:text-white transition-colors cursor-pointer">+55 11 9999-9999</p>
            </div>
            <div className="space-y-4">
              <p className="text-gold font-bold mb-6">System_Info</p>
              <p>© 2026 LÉZ.NK_CAPITAL_LTDA</p>
              <p>All_Rights_Reserved_v2.4</p>
            </div>
          </div>
        </Section>
      </footer>
    </div>
  );
}
