import { Satellite, TreePine, AlertTriangle, TrendingUp, Bot, Server, Database, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

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

const techSpecs = [
  { icon: Server, title: "高性能计算集群", desc: "PFLOPS级算力支持，秒级处理海量遥感数据" },
  { icon: Database, title: "分布式存储", desc: "PB级时空数据存储，确保历史数据永久追溯" },
  { icon: Shield, title: "区块链确权", desc: "每一吨碳汇都有链上唯一凭证，不可篡改" },
];

export default function FeaturesPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pt-20 min-h-screen bg-white"
    >
      {/* Hero Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            核心技术与服务
          </motion.h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            融合空天地一体化监测网络，打造林业碳汇数字化基础设施
          </p>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-xl transition-all group hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-eco-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-eco-green-600 transition-colors">
                  <feature.icon className="h-7 w-7 text-eco-green-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16 text-slate-900">技术架构优势</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {techSpecs.map((spec, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <div className="p-4 bg-blue-50 rounded-full mb-4">
                  <spec.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">{spec.title}</h3>
                <p className="text-slate-500">{spec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
