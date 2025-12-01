import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TreePine, RefreshCcw } from 'lucide-react';

export default function CarbonCalculator() {
  const [area, setArea] = useState<number | ''>('');
  const [type, setType] = useState('forest');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    if (!area) return;
    
    // 简易估算系数 (仅供演示)
    // 森林: 15吨/公顷/年
    // 竹林: 25吨/公顷/年
    // 湿地: 10吨/公顷/年
    let factor = 15;
    if (type === 'bamboo') factor = 25;
    if (type === 'wetland') factor = 10;

    setResult(Number(area) * factor);
  };

  const reset = () => {
    setArea('');
    setResult(null);
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 lg:flex">
          <div className="lg:w-1/2 p-10 lg:p-16 bg-gradient-to-br from-eco-green-900 to-slate-900 text-white relative">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
             <div className="relative z-10">
               <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm">
                 <Calculator className="h-8 w-8 text-eco-green-400" />
               </div>
               <h2 className="text-3xl font-bold mb-6">碳汇收益计算器</h2>
               <p className="text-slate-300 text-lg leading-relaxed mb-8">
                 想知道您的林地资源蕴含多少生态价值吗？
                 输入面积，一键预估年度碳汇潜力。
               </p>
               <div className="space-y-4">
                 <div className="flex items-center text-sm text-slate-400">
                   <div className="w-2 h-2 bg-eco-green-500 rounded-full mr-3"></div>
                   基于 IPCC 方法学估算
                 </div>
                 <div className="flex items-center text-sm text-slate-400">
                   <div className="w-2 h-2 bg-eco-green-500 rounded-full mr-3"></div>
                   数据仅供参考，精准核算请咨询专家
                 </div>
               </div>
             </div>
          </div>
          
          <div className="lg:w-1/2 p-10 lg:p-16">
             <div className="space-y-8">
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">林地类型</label>
                 <div className="grid grid-cols-3 gap-4">
                   {[
                     { id: 'forest', label: '普通森林', icon: TreePine },
                     { id: 'bamboo', label: '竹林', icon: TreePine },
                     { id: 'wetland', label: '湿地', icon: TreePine }
                   ].map((item) => (
                     <button
                       key={item.id}
                       onClick={() => setType(item.id)}
                       className={`p-4 rounded-xl border text-center transition-all ${
                         type === item.id 
                           ? 'border-eco-green-500 bg-eco-green-50 text-eco-green-700 ring-2 ring-eco-green-500/20' 
                           : 'border-slate-200 text-slate-600 hover:border-eco-green-300'
                       }`}
                     >
                       <div className="font-medium text-sm">{item.label}</div>
                     </button>
                   ))}
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">面积 (公顷)</label>
                 <input 
                   type="number" 
                   value={area}
                   onChange={(e) => setArea(Number(e.target.value))}
                   placeholder="请输入林地面积..."
                   className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-eco-green-500 focus:ring-2 focus:ring-eco-green-500/20 transition-all"
                 />
               </div>

               {result !== null ? (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="bg-eco-green-50 rounded-xl p-6 text-center border border-eco-green-100"
                 >
                   <div className="text-slate-500 text-sm mb-1">预估年度固碳量</div>
                   <div className="text-4xl font-bold text-eco-green-600 mb-2">
                     {result.toLocaleString()} <span className="text-lg">吨</span>
                   </div>
                   <div className="text-slate-500 text-xs">
                     约合潜在收益 ¥{(result * 60).toLocaleString()} (按 ¥60/吨 估算)
                   </div>
                   <button 
                     onClick={reset}
                     className="mt-4 text-slate-400 hover:text-slate-600 flex items-center justify-center mx-auto text-sm"
                   >
                     <RefreshCcw className="w-3 h-3 mr-1" /> 重新计算
                   </button>
                 </motion.div>
               ) : (
                 <button 
                   onClick={calculate}
                   disabled={!area}
                   className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-eco-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-slate-200"
                 >
                   开始计算
                 </button>
               )}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
