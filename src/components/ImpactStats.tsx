import { motion } from 'framer-motion';

const stats = [
  { label: '累计碳汇交易量', value: '128,500', unit: '吨', color: 'text-eco-green-600' },
  { label: '覆盖林地面积', value: '56,000', unit: '公顷', color: 'text-blue-600' },
  { label: '合作乡村集体', value: '234', unit: '个', color: 'text-orange-500' },
  { label: '入驻企业', value: '1,200', unit: '家', color: 'text-purple-600' },
];

export default function ImpactStats() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-100"
            >
              <div className={`text-4xl lg:text-5xl font-bold mb-2 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-slate-600 font-medium">
                {stat.label} <span className="text-sm text-slate-400">({stat.unit})</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
