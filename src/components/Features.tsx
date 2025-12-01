import React from 'react';
import { Satellite, TreePine, AlertTriangle, TrendingUp, Bot } from 'lucide-react';

const features = [
  {
    icon: Satellite,
    title: "AI遥感监测",
    description: "利用高分辨率卫星与无人机影像，结合深度学习算法，自动识别林地边界与植被类型。"
  },
  {
    icon: TreePine,
    title: "碳汇精准核算",
    description: "基于多源数据融合技术，实时计算森林碳储量，为碳汇交易提供可信数据支撑。"
  },
  {
    icon: AlertTriangle,
    title: "智能预警系统",
    description: "全天候监控火灾隐患与非法砍伐行为，异常情况秒级报警，守护绿色资产。"
  },
  {
    icon: TrendingUp,
    title: "数字化交易",
    description: "构建透明、高效的碳汇交易撮合平台，打通乡村卖方与企业买方的信息壁垒。"
  },
  {
    icon: Bot,
    title: "数字人服务",
    description: "专属数字人“林小汇”提供政策解读、科普教育及交易指引服务。"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">核心技术与服务</h2>
          <p className="mt-4 text-lg text-slate-600">融合前沿科技，赋能生态价值转化</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-eco-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-eco-green-600 transition-colors">
                <feature.icon className="h-7 w-7 text-eco-green-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
