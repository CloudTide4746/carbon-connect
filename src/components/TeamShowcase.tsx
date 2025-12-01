import { motion } from 'framer-motion';
import { Cloud, Wind, Code2, Sparkles } from 'lucide-react';

export default function TeamShowcase() {
  return (
    <section className="relative py-32 overflow-hidden bg-slate-900 text-white">
      {/* 动态背景效果 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-purple-900/40 mix-blend-overlay"></div>
        <img 
          src="https://images.unsplash.com/photo-1534067783741-51417aa8e079?auto=format&fit=crop&q=80&w=2070" 
          alt="Night Sky Clouds" 
          className="w-full h-full object-cover opacity-30"
        />
        {/* 浮动的光斑装饰 */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3], 
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2], 
          }}
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6"
          >
            <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 shadow-xl">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium tracking-widest uppercase text-blue-100">Creative Studio</span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-purple-200 drop-shadow-lg"
            style={{ fontFamily: '"Microsoft YaHei", sans-serif' }} // 确保中文字体粗重
          >
            晚风拾云
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 text-lg md:text-xl text-blue-100/80 mb-12 font-light"
          >
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5" />
              <span>乘风而行</span>
            </div>
            <div className="hidden md:block w-1.5 h-1.5 bg-blue-400 rounded-full opacity-50"></div>
            <div className="flex items-center gap-2">
              <Cloud className="w-5 h-5" />
              <span>云端筑梦</span>
            </div>
            <div className="hidden md:block w-1.5 h-1.5 bg-blue-400 rounded-full opacity-50"></div>
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              <span>代码重塑未来</span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="max-w-3xl mx-auto text-lg text-slate-300 leading-relaxed border-t border-white/10 pt-12"
          >
            我们是 <span className="text-white font-bold">晚风拾云团队</span>。
            一群执着于将前沿科技与自然生态完美融合的探索者。
            在这个数字时代，我们不只编写代码，更是在编织一个绿色、可持续的梦想。
            每一行代码，都是对大自然的深情致敬。
          </motion.p>
        </div>
      </div>
      
      {/* 装饰性文字背景 */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none opacity-5">
        <div className="text-[12rem] md:text-[20rem] font-bold text-white leading-none whitespace-nowrap animate-marquee">
          WANFENG SHIYUN TEAM
        </div>
      </div>
    </section>
  );
}
