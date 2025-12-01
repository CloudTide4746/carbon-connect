import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Leaf, 
  DollarSign, 
  BarChart3, 
  Search, 
  Filter, 
  MapPin, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  CheckCircle2
} from 'lucide-react';

// 模拟数据
const marketStats = [
  { label: '今日成交量', value: '24,500 吨', change: '+12%', trend: 'up' },
  { label: '平均成交价', value: '¥68.50 /吨', change: '+2.4%', trend: 'up' },
  { label: '总挂牌项目', value: '1,248 个', change: '+5', trend: 'up' },
  { label: '入驻企业', value: '356 家', change: '+8', trend: 'up' },
];

const projects = [
  {
    id: 1,
    name: '云南普洱森林碳汇项目',
    location: '云南省普洱市',
    type: '造林碳汇',
    volume: '50,000 吨',
    price: 72.00,
    image: 'https://picsum.photos/seed/carbon1/800/600',
    tags: ['VCS认证', '生物多样性保护']
  },
  {
    id: 2,
    name: '大兴安岭林业固碳示范区',
    location: '黑龙江省大兴安岭',
    type: '森林经营',
    volume: '120,000 吨',
    price: 65.50,
    image: 'https://picsum.photos/seed/carbon2/800/600',
    tags: ['CCER申请中', '国有林场']
  },
  {
    id: 3,
    name: '福建三明竹林碳汇项目',
    location: '福建省三明市',
    type: '竹林碳汇',
    volume: '30,000 吨',
    price: 78.20,
    image: 'https://picsum.photos/seed/carbon3/800/600',
    tags: ['精准扶贫', '高固碳率']
  },
  {
    id: 4,
    name: '贵州黔东南生态修复项目',
    location: '贵州省黔东南州',
    type: '植被恢复',
    volume: '45,000 吨',
    price: 69.80,
    image: 'https://picsum.photos/seed/carbon4/800/600',
    tags: ['乡村振兴', '水土保持']
  },
];

export default function Platform() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const openModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20 min-h-screen bg-slate-50"
    >
      {/* 顶部数据概览 */}
      <div className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-between items-end mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold">碳汇交易市场</h1>
              <p className="text-slate-400 mt-2">实时、透明、高效的绿色资产交易平台</p>
            </div>
            <div className="hidden md:block">
              <span className="text-sm text-slate-400">最后更新: 2025-12-01 14:30:00</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 * index + 0.3 }}
                className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-eco-green-500/50 transition-colors group"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-slate-400 text-sm">{stat.label}</span>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-eco-green-400" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-red-400 transform rotate-180" />
                  )}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    stat.trend === 'up' ? 'bg-eco-green-900/30 text-eco-green-400' : 'bg-red-900/30 text-red-400'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div className="mt-3 h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '70%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-eco-green-600 to-blue-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 交易列表区域 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 筛选工具栏 */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
            {['all', '造林碳汇', '森林经营', '竹林碳汇'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-eco-green-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat === 'all' ? '全部项目' : cat}
              </button>
            ))}
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="搜索项目..." 
                className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-eco-green-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 bg-white">
              <Filter className="h-4 w-4" />
              <span>筛选</span>
            </button>
          </div>
        </div>

        {/* 项目卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-eco-green-700 shadow-sm">
                    {project.type}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{project.name}</h3>
                  <div className="flex items-center text-slate-500 text-sm mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {project.location}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-end pt-4 border-t border-slate-100">
                    <div>
                      <div className="text-xs text-slate-400 mb-1">可交易量</div>
                      <div className="font-semibold text-slate-700">{project.volume}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400 mb-1">当前价格</div>
                      <div className="text-2xl font-bold text-eco-green-600">¥{project.price.toFixed(2)}</div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => openModal(project)}
                    className="w-full mt-6 bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-eco-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>查看详情</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* 交易详情模态框 */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl"
            >
              <div className="relative h-64">
                <img src={selectedProject.image} alt={selectedProject.name} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
                >
                  <ArrowDownRight className="h-6 w-6 transform rotate-45" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h2 className="text-3xl font-bold text-white">{selectedProject.name}</h2>
                  <p className="text-slate-200 flex items-center mt-2">
                    <MapPin className="h-4 w-4 mr-1" /> {selectedProject.location}
                  </p>
                </div>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="text-sm text-slate-500 mb-1">项目类型</div>
                    <div className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-eco-green-600" />
                      {selectedProject.type}
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="text-sm text-slate-500 mb-1">当前单价</div>
                    <div className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-eco-green-600" />
                      ¥{selectedProject.price.toFixed(2)} /吨
                    </div>
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-500" />
                      监测数据
                    </h4>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-600">森林覆盖率</span>
                        <span className="font-mono font-bold">92.5%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full mb-4">
                        <div className="bg-eco-green-500 h-2 rounded-full" style={{ width: '92.5%' }}></div>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-600">近期固碳增速</span>
                        <span className="font-mono font-bold text-eco-green-600">+5.2%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-eco-green-500" />
                      项目认证
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.tags.map((tag: string) => (
                        <span key={tag} className="px-3 py-1 bg-eco-green-50 text-eco-green-700 rounded-full text-sm font-medium border border-eco-green-100">
                          {tag}
                        </span>
                      ))}
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                        第三方核查通过
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-eco-green-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-eco-green-700 transition-all shadow-lg shadow-eco-green-200">
                    立即购买
                  </button>
                  <button className="flex-1 bg-white text-slate-700 border border-slate-200 py-3 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all">
                    联系卖家
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
