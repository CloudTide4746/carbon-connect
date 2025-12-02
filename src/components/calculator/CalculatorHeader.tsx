import { Calculator } from 'lucide-react';
import { IMAGES } from '../../constants/images';

export default function CalculatorHeader() {
  return (
    <div className="lg:w-1/2 p-10 lg:p-16 bg-gradient-to-br from-eco-green-900 to-slate-900 text-white relative">
      <div 
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: `url('${IMAGES.PATTERNS.CARBON_FIBRE}')` }}
      ></div>
      <div className="relative z-10">
        <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm">
          <Calculator className="h-8 w-8 text-eco-green-400" />
        </div>
        <h2 className="text-3xl font-bold mb-6">碳汇收益计算器 (Pro)</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          想知道您的林地资源蕴含多少生态价值吗？
          结合林地类型、树龄结构和植被密度，为您提供更精准的碳汇潜力预估。
        </p>
        <div className="space-y-4">
          <div className="flex items-center text-sm text-slate-400">
            <div className="w-2 h-2 bg-eco-green-500 rounded-full mr-3"></div>
            基于 IPCC 方法学修正估算
          </div>
          <div className="flex items-center text-sm text-slate-400">
            <div className="w-2 h-2 bg-eco-green-500 rounded-full mr-3"></div>
            包含树龄与密度多因子校正
          </div>
        </div>
      </div>
    </div>
  );
}
