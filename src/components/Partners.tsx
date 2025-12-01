import { motion } from 'framer-motion';

const partners = [
  "中国林业集团", "国家电网", "腾讯云", "阿里云", "北京绿色交易所", "上海环境能源交易所"
];

export default function Partners() {
  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">
          合作伙伴与支持机构
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {partners.map((partner, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-xl md:text-2xl font-bold text-slate-400 hover:text-eco-green-600 cursor-default"
            >
              {partner}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
