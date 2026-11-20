"use client";
import { useState } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "ai", content: string }[]>([
    { role: "ai", content: "Hi! I'm your Simba Supermarket assistant. How can I help you find the perfect product today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = { role: "ai" as const, content: "That's a great question! Based on your interest, I recommend checking out our Outdoor category. We have some amazing solar-powered gear that fits your vibe!" };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-2xl border w-80 md:w-96 overflow-hidden flex flex-col mb-4"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between">
               <div className="flex items-center gap-2 text-slate-900">
                  <Sparkles className="h-5 w-5" />
                  <span className="font-bold">Simba AI</span>
               </div>
               <button onClick={() => setIsOpen(false)} className="text-slate-900 hover:opacity-70">
                  <X className="h-5 w-5" />
               </button>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4 bg-slate-50">
               {messages.map((m, i) => (
                 <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === "user" ? "bg-secondary text-white rounded-tr-none" : "bg-white border text-slate-800 rounded-tl-none"}`}>
                       {m.content}
                    </div>
                 </div>
               ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t bg-white flex gap-2">
               <input
                 type="text"
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 placeholder="Type your message..."
                 className="flex-1 text-sm outline-none border rounded-full px-4 py-2 focus:ring-1 focus:ring-primary"
               />
               <button type="submit" className="bg-primary text-slate-900 p-2 rounded-full hover:bg-primary/90 transition-colors">
                  <Send className="h-4 w-4" />
               </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-slate-900 p-4 rounded-full shadow-xl hover:scale-110 transition-transform active:scale-95"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>
    </div>
  );
}
