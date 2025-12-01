import { Bot, MessageSquare, Mic, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function DigitalHumanPage() {
  const [messages, setMessages] = useState([
    { type: 'bot', text: '你好！我是您的碳汇助手林小汇。请问有什么可以帮您？' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { type: 'user', text: input }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text: '这是一个模拟回复。实际系统将连接大模型API。' }]);
    }, 1000);
    setInput('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 min-h-screen bg-slate-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Avatar Visualization */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <div className="aspect-square rounded-full bg-gradient-to-b from-eco-green-500/20 to-transparent flex items-center justify-center relative overflow-hidden border border-white/10 shadow-2xl shadow-eco-green-900/50">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse"></div>
               <div className="text-[150px]">👩‍🌾</div>
               <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
                 <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                 <span className="text-sm font-mono text-green-400">Online</span>
               </div>
            </div>
          </motion.div>

          {/* Interaction Area */}
          <div>
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">数字人 <span className="text-eco-green-400">林小汇</span></h1>
              <p className="text-slate-400 text-lg">
                基于多模态大模型的农业碳汇科普助手，提供7x24小时智能咨询服务。
              </p>
            </div>

            {/* Chat Interface */}
            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl h-[500px] flex flex-col">
              <div className="p-4 bg-slate-900/50 border-b border-slate-700 flex items-center gap-3">
                <Bot className="w-5 h-5 text-eco-green-400" />
                <span className="font-semibold">智能对话演示</span>
              </div>
              
              <div className="flex-grow p-4 overflow-y-auto space-y-4 custom-scrollbar">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.type === 'user' 
                        ? 'bg-eco-green-600 text-white rounded-tr-sm' 
                        : 'bg-slate-700 text-slate-200 rounded-tl-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-slate-900/50 border-t border-slate-700">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="请输入您的问题..."
                    className="flex-grow bg-slate-950 border border-slate-700 rounded-xl px-4 text-white focus:outline-none focus:border-eco-green-500"
                  />
                  <button className="p-3 rounded-xl bg-slate-700 hover:bg-slate-600 transition-colors text-slate-300">
                    <Mic className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleSend}
                    className="p-3 rounded-xl bg-eco-green-600 hover:bg-eco-green-500 transition-colors text-white"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
