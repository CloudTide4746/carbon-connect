import { motion } from 'framer-motion';
import { RefreshCcw } from 'lucide-react';

interface CalculationProcess {
  baseFactor: number;
  ageFactor: number;
  densityFactor: number;
  formula: string;
}

interface ResultDisplayProps {
  result: number | null;
  calculationProcess: CalculationProcess | null;
  reset: () => void;
  calculate: () => void;
  area: number | '';
  type: string;
  age: string;
  density: string;
}

export default function ResultDisplay({ 
  result, 
  calculationProcess, 
  reset, 
  calculate, 
  area,
  type,
  age,
  density
}: ResultDisplayProps) {
  if (result !== null && calculationProcess) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-eco-green-50 rounded-xl p-6 border border-eco-green-100"
      >
        <div className="text-center mb-4">
          <div className="text-slate-500 text-sm mb-1">预估年度固碳量</div>
          <div className="text-4xl font-bold text-eco-green-600 mb-2">
            {result.toLocaleString()} <span className="text-lg">吨</span>
          </div>
          <div className="text-slate-500 text-xs">
            约合潜在收益 ¥{(result * 60).toLocaleString()} (按 ¥60/吨 估算)
          </div>
        </div>

        {/* 计算过程展示 */}
        <div className="bg-white/60 rounded-lg p-3 text-xs text-slate-500 space-y-1 font-mono">
          <div className="flex justify-between border-b border-slate-200 pb-1 mb-1">
            <span>计算公式</span>
            <span className="font-bold">固碳量 = 面积 × 基数 × 系数</span>
          </div>
          <div className="flex justify-between">
            <span>基础系数 ({type === 'bamboo' ? '竹林' : type === 'wetland' ? '湿地' : '森林'}):</span>
            <span>{calculationProcess.baseFactor} 吨/ha</span>
          </div>
          <div className="flex justify-between">
            <span>树龄修正 ({age === 'young' ? '幼龄' : age === 'old' ? '过熟' : '中龄'}):</span>
            <span>× {calculationProcess.ageFactor}</span>
          </div>
          <div className="flex justify-between">
            <span>密度修正 ({density === 'high' ? '茂密' : density === 'low' ? '稀疏' : '中等'}):</span>
            <span>× {calculationProcess.densityFactor}</span>
          </div>
          <div className="pt-1 mt-1 border-t border-slate-200 text-eco-green-700 font-semibold text-center">
            {calculationProcess.formula} = {result}
          </div>
        </div>

        <button 
          onClick={reset}
          className="mt-4 text-slate-400 hover:text-slate-600 flex items-center justify-center mx-auto text-sm"
        >
          <RefreshCcw className="w-3 h-3 mr-1" /> 重新计算
        </button>
      </motion.div>
    );
  }

  return (
    <button 
      onClick={calculate}
      disabled={!area}
      className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-eco-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-slate-200"
    >
      开始计算
    </button>
  );
}
