/** @format */

import { motion } from "framer-motion";
import { ArrowRight, Activity, ShieldCheck, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      id='home'
      className='relative min-h-screen flex items-center pt-16 overflow-hidden bg-slate-900'
    >
      {/* Background Image */}
      <div className='absolute inset-0 z-0'>
        <img
          src='https://picsum.photos/seed/forest_hero/1920/1080'
          alt='Forest Background'
          className='w-full h-full object-cover opacity-40'
        />
        <div className='absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/40'></div>
      </div>

      {/* Animated Particles/Glow */}
      <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-eco-green-500/20 rounded-full blur-[128px] animate-pulse'></div>
      <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] animate-pulse animation-delay-2000'></div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full'>
        <div className='lg:grid lg:grid-cols-2 lg:gap-12 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className='mb-12 lg:mb-0'
          >
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-eco-green-500/10 border border-eco-green-500/20 text-eco-green-400 text-sm font-medium mb-6'>
              <span className='relative flex h-2 w-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-eco-green-400 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-2 w-2 bg-eco-green-500'></span>
              </span>
              AI 遥感监测系统已上线
            </div>

            <h1 className='text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6'>
              连接乡村与企业 <br />
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-eco-green-400 to-blue-400'>
                共筑绿色碳汇未来
              </span>
            </h1>

            <p className='text-lg sm:text-xl text-slate-300 max-w-xl leading-relaxed mb-8'>
              利用 AI 遥感卫星与无人机技术，实现林业碳汇自动化监测与精准交易。
              赋能乡村振兴，助力企业达成碳中和目标。
            </p>

            <div className='flex flex-col sm:flex-row gap-4'>
              <button
                onClick={() => navigate("/platform")}
                className='bg-eco-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-eco-green-500 transition-all flex items-center justify-center shadow-lg shadow-eco-green-900/50 group'
              >
                开始交易
                <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
              </button>
              <button
                onClick={() => navigate("/features")}
                className='bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center group'
              >
                <PlayCircle className='mr-2 h-5 w-5 group-hover:scale-110 transition-transform' />
                了解更多
              </button>
            </div>

            <div className='mt-12 flex items-center gap-8 text-sm font-medium text-slate-400 border-t border-white/10 pt-8'>
              <div className='flex items-center gap-2'>
                <ShieldCheck className='h-5 w-5 text-eco-green-500' />
                <span>权威认证 (VCS/CCER)</span>
              </div>
              <div className='flex items-center gap-2'>
                <Activity className='h-5 w-5 text-blue-500' />
                <span>毫秒级数据监测</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='relative hidden lg:block'
          >
            {/* Abstract 3D-like Visualization Container */}
            <div className='relative z-10'>
              <div className='absolute -inset-1 bg-gradient-to-r from-eco-green-500 to-blue-500 rounded-2xl blur opacity-30 animate-pulse'></div>
              <div className='relative bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl'>
                <img
                  src='https://picsum.photos/seed/satellite_view/800/600'
                  alt='Dashboard Preview'
                  className='w-full h-auto opacity-80 hover:scale-105 transition-transform duration-700'
                />

                {/* Floating UI Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className='absolute top-8 right-8 bg-slate-800/90 backdrop-blur border border-slate-600 p-4 rounded-xl shadow-xl'
                >
                  <div className='flex items-center gap-3 mb-2'>
                    <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                    <span className='text-white font-bold'>碳汇指数</span>
                  </div>
                  <div className='text-2xl font-mono text-eco-green-400'>
                    98.4
                  </div>
                  <div className='text-xs text-slate-400 mt-1'>
                    +2.4% vs 上周
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className='absolute bottom-8 left-8 bg-slate-800/90 backdrop-blur border border-slate-600 p-4 rounded-xl shadow-xl max-w-xs'
                >
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-slate-300 text-sm font-medium'>
                      A-07 林区监测
                    </span>
                    <span className='text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded'>
                      实时
                    </span>
                  </div>
                  <div className='space-y-2'>
                    <div className='w-full bg-slate-700 h-1.5 rounded-full overflow-hidden'>
                      <div className='bg-blue-500 h-full w-[85%]'></div>
                    </div>
                    <div className='flex justify-between text-xs text-slate-500'>
                      <span>覆盖率</span>
                      <span>85%</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
        className='absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 flex flex-col items-center gap-2 cursor-pointer'
        onClick={() =>
          document
            .getElementById("impact-stats")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <span className='text-xs uppercase tracking-widest'>Scroll Down</span>
        <div className='w-px h-8 bg-gradient-to-b from-slate-400 to-transparent'></div>
      </motion.div>
    </section>
  );
}
