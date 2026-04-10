import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Loader2, ChevronRight, X, Sparkles, Bot } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  text: string;
}

export const QUICK_QUESTIONS = [
  "O que é a LÉZ.NK Capital?",
  "Quais são os pilares de investimento?",
  "Como posso investir?",
  "Quem é a fundadora da holding?",
  "Quais os objetivos estratégicos?",
  "Em quais setores a holding atua?",
  "Qual a missão e visão da empresa?",
  "Como entrar em contato?",
];

export const WEBHOOK_URL = "https://webhook.saveautomatik.shop/webhook/lezAI";

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  text: "Olá! Sou o assistente inteligente da LÉZ.NK Capital. Estou aqui para esclarecer qualquer dúvida sobre a holding, nossos pilares de investimento, estratégia ou como participar. Escolha uma pergunta ou escreva a sua.",
};

/* ─── Shared chat hook ─────────────────────────────────────── */
function useChat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async (text: string) => {
    const question = text.trim();
    if (!question || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setLoading(true);
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
      });
      const data = await res.json();
      const answer =
        data?.response ||
        "Não consegui obter uma resposta agora. Entre em contato pelo e-mail invest@leznkcapital.com.";
      setMessages((prev) => [...prev, { role: "assistant", text: answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Erro de conexão. Por favor, tente novamente ou entre em contato pelo invest@leznkcapital.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, input, setInput, loading, send };
}

/* ─── Messages renderer ────────────────────────────────────── */
function Messages({
  messages,
  loading,
  send,
  dark = false,
}: {
  messages: Message[];
  loading: boolean;
  send: (t: string) => void;
  dark?: boolean;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const showQuick = messages.length <= 1;

  return (
    <>
      {messages.map((msg, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[85%] px-4 py-3 text-xs font-sans leading-relaxed ${
              msg.role === "user"
                ? "bg-gold text-dark font-medium"
                : dark
                ? "bg-white/10 border border-white/10 text-white/80"
                : "bg-white border border-dark/8 text-dark/80 shadow-sm"
            }`}
          >
            {msg.text}
          </div>
        </motion.div>
      ))}

      {showQuick && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-2 pt-1"
        >
          <p className={`text-[10px] font-mono uppercase tracking-widest pl-1 ${dark ? "text-white/25" : "text-dark/30"}`}>
            Perguntas frequentes
          </p>
          {QUICK_QUESTIONS.map((q, i) => (
            <button
              key={i}
              onClick={() => send(q)}
              disabled={loading}
              className={`w-full text-left px-3 py-2 text-xs font-sans border transition-all flex items-center justify-between group ${
                dark
                  ? "border-white/10 text-white/50 hover:border-gold hover:text-white bg-white/5 hover:bg-gold/10"
                  : "border-dark/10 text-dark/60 hover:border-gold hover:text-dark bg-white hover:bg-gold/5"
              }`}
            >
              <span>{q}</span>
              <ChevronRight size={12} className="text-gold/40 group-hover:text-gold transition-colors flex-shrink-0 ml-2" />
            </button>
          ))}
        </motion.div>
      )}

      {loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
          <div className={`px-4 py-3 flex items-center gap-2 ${dark ? "bg-white/10 border border-white/10" : "bg-white border border-dark/8 shadow-sm"}`}>
            <Loader2 size={12} className="animate-spin text-gold" />
            <span className={`text-[10px] font-mono uppercase tracking-widest ${dark ? "text-white/30" : "text-dark/40"}`}>
              Processando...
            </span>
          </div>
        </motion.div>
      )}

      <div ref={bottomRef} />
    </>
  );
}

/* ─── Input bar ────────────────────────────────────────────── */
function InputBar({
  input,
  setInput,
  loading,
  send,
  dark = false,
  inputRef,
}: {
  input: string;
  setInput: (v: string) => void;
  loading: boolean;
  send: (t: string) => void;
  dark?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
}) {
  return (
    <div className={`px-3 py-3 flex items-center gap-2 border-t ${dark ? "bg-white/5 border-white/10" : "bg-white border-dark/8"}`}>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send(input);
          }
        }}
        placeholder="Digite sua dúvida..."
        disabled={loading}
        className={`flex-1 text-xs font-sans bg-transparent outline-none py-1 ${dark ? "text-white placeholder-white/20" : "text-dark placeholder-dark/30"}`}
      />
      <button
        onClick={() => send(input)}
        disabled={loading || !input.trim()}
        className="w-8 h-8 bg-gold text-dark flex items-center justify-center hover:bg-white hover:text-dark transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
      >
        <Send size={13} />
      </button>
    </div>
  );
}

/* ─── PAGE SECTION (inline, always visible) ────────────────── */
export function ChatSection() {
  const { messages, input, setInput, loading, send } = useChat();

  return (
    <section className="bg-dark text-white py-32 relative overflow-hidden" id="ia">
      {/* Background grid */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="tech-grid w-full h-full" />
      </div>

      {/* Gold glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:w-[42%] flex flex-col gap-8 lg:sticky lg:top-40"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-gold" />
                <span className="text-gold text-[10px] font-mono uppercase tracking-[0.4em] font-bold">
                  Assistente com IA
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-serif font-bold leading-none tracking-tighter mb-6">
                Tire todas as suas<br />
                <span className="gold-gradient">dúvidas agora</span>
              </h2>
              <p className="text-white/50 text-sm font-sans leading-[1.9] text-justify">
                Nossa inteligência artificial conhece cada detalhe da LÉZ.NK Capital — da trajetória da fundadora aos pilares estratégicos, passando por como tornar-se um investidor parceiro. Pergunte o que quiser.
              </p>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2">
              {[
                "Estratégia de investimento",
                "Pilares da holding",
                "Como investir",
                "Setores de atuação",
                "Missão e visão",
                "Contato direto",
              ].map((tag, i) => (
                <motion.button
                  key={i}
                  onClick={() => send(QUICK_QUESTIONS[i] ?? tag)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-3 py-[6px] border border-gold/25 text-gold/60 hover:border-gold hover:text-gold text-[10px] font-mono uppercase tracking-widest transition-all cursor-pointer"
                >
                  {tag}
                </motion.button>
              ))}
            </div>

            {/* Status badge */}
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-50" />
              </div>
              <p className="text-white/30 text-[10px] font-mono uppercase tracking-widest">
                IA online · Resposta imediata
              </p>
            </div>
          </motion.div>

          {/* Right — embedded chat */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="flex-1 flex flex-col border border-white/10 shadow-2xl overflow-hidden"
            style={{ minHeight: "520px" }}
          >
            {/* Chat header */}
            <div className="px-5 py-4 border-b border-white/8 flex items-center gap-3 bg-white/[0.03]">
              <div className="w-8 h-8 bg-gold flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-dark" />
              </div>
              <div>
                <p className="text-white text-xs font-bold uppercase tracking-widest font-mono">
                  LÉZ.NK — Assistente Inteligente
                </p>
                <p className="text-white/25 text-[10px] font-mono">Powered by IA · grupolez.nkcapital.com.br</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3" style={{ maxHeight: "390px" }}>
              <Messages messages={messages} loading={loading} send={send} dark />
            </div>

            {/* Input */}
            <InputBar input={input} setInput={setInput} loading={loading} send={send} dark />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ─── FLOATING BUTTON — scrolls to #ia ────────────────────── */
export default function ChatWidget() {
  const [showBubble, setShowBubble] = useState(false);

  const scrollToIA = () => {
    document.getElementById("ia")?.scrollIntoView({ behavior: "smooth" });
    setShowBubble(false);
  };

  // Show attention bubble after 7s
  useEffect(() => {
    const t = setTimeout(() => setShowBubble(true), 7000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Attention bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-[199] bg-dark text-white px-4 py-3 shadow-2xl border border-gold/20 max-w-[220px]"
          >
            <button
              onClick={() => setShowBubble(false)}
              className="absolute top-2 right-2 text-white/30 hover:text-white transition-colors"
            >
              <X size={10} />
            </button>
            <p className="text-[11px] font-sans leading-snug text-white/80 pr-4">
              Tem dúvidas sobre a LÉZ.NK?
              <span
                onClick={scrollToIA}
                className="block text-gold mt-1 font-semibold cursor-pointer hover:text-white transition-colors"
              >
                Fale com nossa IA →
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
