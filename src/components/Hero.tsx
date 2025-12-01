import { motion } from 'framer-motion';
import { ArrowRight, Activity, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const Navigation=useNavigate()
  return (
    <section id="home" className="relative pt-24 pb-12 lg:pt-32 lg:pb-24 overflow-hidden bg-gradient-to-b from-eco-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 lg:mb-0"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              连接乡村与企业 <br />
              <span className="text-eco-green-600">共筑绿色碳汇未来</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-lg">
              利用AI遥感卫星与无人机技术，实现林业碳汇自动化监测与精准交易。
              赋能乡村振兴，助力企业达成碳中和目标。
            </p>
            <div className="mt-8 flex gap-4">
              <button className="bg-eco-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-eco-green-700 transition-all flex items-center shadow-lg shadow-eco-green-200" >
                开始交易 <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-all">
                了解更多
              </button>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center">
                <ShieldCheck className="h-5 w-5 text-eco-green-500 mr-2" />
                <span>权威认证</span>
              </div>
              <div className="flex items-center">
                <Activity className="h-5 w-5 text-eco-green-500 mr-2" />
                <span>实时监测</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-white p-2">
               {/* Placeholder for satellite imagery or dashboard UI */}
               <div className="bg-slate-900 rounded-xl aspect-video relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-tr from-eco-green-900/20 to-transparent"></div>
                 {/* Simulated Map UI */}
                 <div className="absolute top-4 right-4 bg-black/50 backdrop-blur p-2 rounded text-xs text-green-400 font-mono">
                   <div>CO2: 420ppm</div>
                   <div>Forest Cover: 85%</div>
                 </div>
                 <div className="absolute bottom-4 left-4">
                   <div className="flex items-center space-x-2">
                     <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                     <span className="text-white text-sm font-medium">实时监测中...</span>
                   </div>
                 </div>
                 {/* Simple SVG Illustration for Map */}
                 <svg className="w-full h-full opacity-30" viewBox="0 0 400 300">
                    <path d="M0,200 Q100,150 200,220 T400,180 V300 H0 Z" fill="#22c55e" />
                    <path d="M0,250 Q150,200 300,260 T400,240 V300 H0 Z" fill="#166534" />
                 </svg>
               </div>
            </div>
            {/* Decor elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-eco-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-carbon-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
