import React, { useState, useRef, useEffect } from 'react';
import { Send, X, ShieldAlert, Scale, CheckCircle2, ChevronRight, Minimize2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ChatWidgetProps {
  onClose: () => void;
  onOpenIntake: () => void;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function ChatWidget({ onClose, onOpenIntake }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello. I am the AI Legal Assistant for Harrison & Wright. How can I help you today? If you have specific legal questions, I can provide general information, or I can help you start a case evaluation.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history: messages })
      });
      
      const data = await response.json();
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'model', text: data.text }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: 'I apologize, but I am having trouble connecting to our systems right now. Please try again later or call our office directly.' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'I apologize, but an error occurred. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgb(0,0,0,0.16)] flex flex-col h-[550px] max-h-[80vh] border border-slate-200 overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-slate-900 text-white p-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-1.5 rounded-full">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-medium text-lg leading-tight">Legal Assistant AI</h3>
            <p className="text-xs text-slate-300 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Online
            </p>
          </div>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
          <Minimize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Disclaimers */}
      <div className="bg-blue-50 p-3 shrink-0 flex items-start gap-2 border-b border-blue-100">
        <ShieldAlert className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
        <p className="text-xs text-blue-800 leading-relaxed">
          I provide general information, not binding legal advice. No attorney-client relationship is formed by this chat.
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
              msg.role === 'user' 
                ? 'bg-slate-900 text-white rounded-br-sm' 
                : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-bl-sm'
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-slate-800 shadow-sm border border-slate-100 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Action Prompts */}
      <div className="p-3 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto shrink-0 scrollbar-hide">
        <button 
          onClick={onOpenIntake}
          className="flex-shrink-0 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1"
        >
          <CheckCircle2 className="w-3 h-3" /> Evaluate My Case
        </button>
        <button 
          onClick={() => setInput('Do you handle personal injury?')}
          className="flex-shrink-0 bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-full text-xs transition-colors"
        >
          Do you handle personal injury?
        </button>
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 shrink-0 flex items-center gap-2">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your legal question..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
        <button 
          type="submit"
          disabled={!input.trim() || isLoading}
          className="bg-blue-600 text-white p-2.5 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
