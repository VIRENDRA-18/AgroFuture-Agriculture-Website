// src/components/CropChatbot.jsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaSeedling, FaPaperPlane, FaTimes } from "react-icons/fa";

const QUICK_QUESTIONS = [
  "What should I grow in sandy soil with low rainfall?",
  "Crops for clay soil and high rainfall?",
  "Best crops for loamy soil (pH 6.5)?",
];

function parseContext(text) {
  const t = text.toLowerCase();

  // soil texture
  const texture =
    /sandy/.test(t) ? "sandy" :
    /clay/.test(t) ? "clay" :
    /(loam|loamy)/.test(t) ? "loam" :
    /(silt|silty)/.test(t) ? "silt" :
    null;

  // rainfall
  const rainfall =
    /(low|less|dry|arid)/.test(t) ? "low" :
    /(moderate|medium|avg|average)/.test(t) ? "moderate" :
    /(high|heavy|monsoon|humid)/.test(t) ? "high" :
    null;

  // pH
  const phMatch = t.match(/ph\s*([0-9]+(\.[0-9]+)?)/);
  const pH = phMatch ? parseFloat(phMatch[1]) : null;

  // region/climate cues
  const climate =
    /(arid|desert)/.test(t) ? "arid" :
    /(tropic|tropical)/.test(t) ? "tropical" :
    /(temperate|mild)/.test(t) ? "temperate" :
    null;

  // special conditions
  const saline = /(saline|salty)/.test(t);
  const waterlogged = /(waterlog|water\-?logged|flood)/.test(t);

  return { texture, rainfall, pH, climate, saline, waterlogged };
}

function recommend({ texture, rainfall, pH, climate, saline, waterlogged }) {
  // base knowledge
  const rules = [
    {
      when: ({ texture, rainfall }) => texture === "sandy" && rainfall === "low",
      crops: ["Pearl millet (Bajra)", "Sorghum (Jowar)", "Groundnut", "Sesame"],
      why: "Drought-tolerant crops with deep roots perform well in sandy, low-moisture soils.",
      tips: [
        "Add organic matter (compost) to improve water holding.",
        "Adopt mulch to reduce evaporation.",
        "Irrigate with drip to save water.",
      ],
    },
    {
      when: ({ texture, rainfall }) => texture === "clay" && rainfall === "high",
      crops: ["Paddy (Rice)", "Jute", "Taro (Arbi)"],
      why: "Clay soils with high rainfall retain water; paddy thrives in such conditions.",
      tips: [
        "Create proper bunds and drainage channels.",
        "Avoid compaction; add gypsum/organic matter to improve structure.",
      ],
    },
    {
      when: ({ texture }) => texture === "loam",
      crops: ["Wheat", "Maize", "Vegetables (Tomato, Okra)", "Pulses (Chickpea)"],
      why: "Loam has balanced texture and fertility—supports diverse crops.",
      tips: [
        "Rotate cereals with legumes for nitrogen balance.",
        "Maintain pH ~6.5–7.0 for nutrient availability.",
      ],
    },
    {
      when: ({ pH }) => pH !== null && pH < 6.0,
      crops: ["Potato", "Tea", "Pineapple", "Sweet potato"],
      why: "These crops tolerate slightly acidic soils.",
      tips: ["Consider liming to raise pH gradually.", "Incorporate well-decomposed compost."],
    },
    {
      when: ({ pH }) => pH !== null && pH > 7.8,
      crops: ["Barley", "Mustard", "Safflower", "Cotton"],
      why: "These crops are relatively tolerant to alkaline conditions.",
      tips: ["Apply gypsum if sodicity is an issue.", "Add organic matter to buffer pH."],
    },
    {
      when: ({ saline }) => saline,
      crops: ["Barley", "Quinoa", "Sugar beet", "Cotton"],
      why: "These have higher salt tolerance than most staples.",
      tips: ["Flush salts with adequate drainage/irrigation.", "Use raised beds and mulches."],
    },
    {
      when: ({ waterlogged }) => waterlogged,
      crops: ["Rice", "Taro", "Water chestnut"],
      why: "Adapted to standing water and saturated soils.",
      tips: ["Install surface drains", "Adopt alternate wetting and drying if growing paddy."],
    },
    {
      when: ({ climate }) => climate === "arid",
      crops: ["Cumin", "Millets", "Dates (orchard)", "Cluster bean"],
      why: "Heat/drought tolerant choices for arid climates.",
      tips: ["Windbreaks + drip irrigation are highly effective."],
    },
    {
      when: ({ climate }) => climate === "tropical",
      crops: ["Rice", "Banana", "Sugarcane", "Cassava"],
      why: "High heat and humidity suits these crops.",
      tips: ["Manage pests proactively; encourage beneficial insects."],
    },
  ];

  // aggregate matches
  let suggestions = [];
  let reasons = [];
  let tips = [];
  rules.forEach(r => {
    if (r.when({ texture, rainfall, pH, climate, saline, waterlogged })) {
      suggestions = suggestions.concat(r.crops);
      reasons.push(r.why);
      tips = tips.concat(r.tips || []);
    }
  });

  // de-duplicate suggestions, keep order
  const uniq = [...new Set(suggestions)];

  if (uniq.length === 0) {
    return {
      crops: ["Wheat", "Maize", "Chickpea", "Mustard"], // safe defaults
      reason:
        "Based on typical conditions, these are generally adaptable crops. Provide soil texture, rainfall and pH for a sharper match.",
      tips: [
        "Test soil pH and organic carbon annually.",
        "Use mulching and timely irrigation scheduling.",
        "Rotate with legumes to improve soil health.",
      ],
    };
  }

  return {
    crops: uniq.slice(0, 8),
    reason: [...new Set(reasons)].join(" "),
    tips: [...new Set(tips)].slice(0, 5),
  };
}

function Message({ role, text }) {
  const isBot = role === "bot";
  return (
    <div className={`flex items-start gap-3 ${isBot ? "" : "justify-end"}`}>
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-green-600 text-white grid place-items-center">🌾</div>
      )}
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow
        ${isBot ? "bg-white border" : "bg-green-600 text-white"}`}
      >
        {text}
      </div>
      {!isBot && (
        <div className="w-8 h-8 rounded-full bg-emerald-100 text-green-700 grid place-items-center">
          <FaSeedling />
        </div>
      )}
    </div>
  );
}

export default function CropChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text:
        "Hi! I’m your Farm Assistant. Tell me your soil texture (sandy/clay/loam), rainfall (low/moderate/high), and pH (e.g., pH 6.5). Example: “What should I grow in sandy soil with low rainfall?”",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const ask = async (q) => {
    const question = (q ?? input).trim();
    if (!question) return;

    setMessages((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setTyping(true);

    // Simulate thinking
    setTimeout(() => {
      const ctx = parseContext(question);
      const rec = recommend(ctx);

      const reply = [
        `Based on your conditions ${ctx.texture ? `(${ctx.texture} soil` : ""}${
          ctx.rainfall ? `${ctx.texture ? ", " : "("}${ctx.rainfall} rainfall` : ""
        }${ctx.pH != null ? `${ctx.texture || ctx.rainfall ? ", " : "("}pH ${ctx.pH}` : ""}${
          ctx.texture || ctx.rainfall || ctx.pH != null ? ") " : ""
        }I suggest:`,
        `• ${rec.crops.join(", ")}`,
        "",
        `Why: ${rec.reason}`,
        "",
        `Tips:\n- ${rec.tips.join("\n- ")}`,
      ].join("\n");

      setMessages((m) => [...m, { role: "bot", text: reply }]);
      setTyping(false);
    }, 600);
  };

  const bubbleVariants = {
    hidden: { y: 16, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // Floating button (closed state)
  const FloatingButton = useMemo(
    () => (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 rounded-full bg-green-600 text-white shadow-2xl p-4 hover:bg-green-700 focus:outline-none"
        aria-label="Open Crop Assistant"
      >
        <FaRobot className="text-xl" />
      </button>
    ),
    []
  );

  return (
    <>
      {!open && FloatingButton}

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            {/* Chat window */}
            <motion.div
              className="fixed bottom-6 right-6 z-50 w-[92vw] max-w-md"
              initial={{ scale: 0.9, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 16 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl border bg-gradient-to-br from-green-50 to-emerald-100">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-green-600 text-white grid place-items-center">🌾</div>
                    <div>
                      <div className="font-semibold text-green-800">Farm Assistant</div>
                      <div className="text-xs text-gray-500">AI Crop Recommendations</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <FaTimes />
                  </button>
                </div>

                {/* Messages */}
                <div className="h-80 overflow-y-auto px-4 py-3 space-y-3 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.75),_transparent_60%)]">
                  {messages.map((m, i) => (
                    <motion.div key={i} variants={bubbleVariants} initial="hidden" animate="visible" transition={{ duration: 0.2 }}>
                      <Message role={m.role === "user" ? "user" : "bot"} text={m.text} />
                    </motion.div>
                  ))}
                  {typing && (
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:.1s]" />
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:.2s]" />
                      <span className="ml-1">Thinking…</span>
                    </div>
                  )}
                  <div ref={endRef} />
                </div>

                {/* Quick questions */}
                <div className="px-4 pt-2 pb-1 flex flex-wrap gap-2">
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => ask(q)}
                      className="text-xs px-3 py-1 rounded-full bg-white border hover:bg-gray-50"
                    >
                      {q}
                    </button>
                  ))}
                </div>

                {/* Input */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    ask();
                  }}
                  className="flex items-center gap-2 p-3 bg-white/80 border-t"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='e.g., "sandy soil, low rainfall, pH 6.5"'
                    className="flex-1 rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-300"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                    disabled={!input.trim()}
                    aria-label="Send message"
                  >
                    <FaPaperPlane />
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
