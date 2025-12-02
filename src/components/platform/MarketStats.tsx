import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const marketStats = [
  { label: '今日成交量', value: '24,500 吨', change: '+12%', trend: 'up' },
  { label: '平均成交价', value: '¥68.50 /吨', change: '+2.4%', trend: 'up' },
  { label: '总挂牌项目', value: '1,248 个', change: '+5', trend: 'up' },
  { label: '入驻企业', value: '356 家', change: '+8', trend: 'up' },
];

export default function MarketStats() {
  return (
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
  );
}
