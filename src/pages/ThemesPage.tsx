import { Sprout, Zap, Heart, Palette, Landmark, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const themes = [
  {
    title: '乡村振兴与农业农村现代化',
    icon: Sprout,
    color: 'bg-green-100 text-green-600',
    desc: '推动农业产业升级，增加农民收入，实现农村现代化。',
    details: '通过引入碳汇交易机制，将“叶子”变“票子”，直接增加村集体和农户收入。'
  },
  {
    title: '科技创新和未来产业',
    icon: Zap,
    color: 'bg-blue-100 text-blue-600',
    desc: 'AI遥感、大数据与区块链技术赋能传统林业。',
    details: '构建空天地一体化监测网络，推动传统林业向数字林业转型升级。'
  },
  {
    title: '生态文明建设和绿色低碳发展',
    icon: Heart,
    color: 'bg-emerald-100 text-emerald-600',
    desc: '践行“绿水青山就是金山银山”理念，促进碳中和。',
    details: '建立生态产品价值实现机制，让保护生态的人不吃亏、能受益。'
  },
  {
    title: '文化创意和区域交流合作',
    icon: Palette,
    color: 'bg-purple-100 text-purple-600',
    desc: '挖掘乡村生态文化价值，促进城乡要素双向流动。',
    details: '结合生态旅游与研学教育，传播绿色低碳生活方式。'
  },
  {
    title: '社会治理和公共服务',
    icon: Landmark,
    color: 'bg-orange-100 text-orange-600',
    desc: '提升乡村数字化治理水平，完善公共服务体系。',
    details: '利用数字技术提升乡村治理效能，构建共建共治共享的社会治理格局。'
  }
];

export default function ThemesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 min-h-screen bg-slate-50"
    >
      <section className="py-20 bg-eco-green-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">五大战略领域</h1>
          <p className="text-xl text-eco-green-100 max-w-3xl mx-auto">
            紧扣国家战略，全方位赋能乡村可持续高质量发展
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {themes.map((theme, index) => (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col md:flex-row items-center gap-8"
              >
                <div className={`w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0 ${theme.color}`}>
                  <theme.icon className="w-10 h-10" />
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">{theme.title}</h3>
                  <p className="text-lg text-slate-600 mb-4">{theme.desc}</p>
                  <p className="text-slate-500 text-sm bg-slate-50 p-4 rounded-lg border border-slate-100">
                    {theme.details}
                  </p>
                </div>
                <div className="flex-shrink-0">
                   <button className="flex items-center text-eco-green-600 font-semibold hover:text-eco-green-700">
                     查看案例 <ArrowRight className="ml-2 h-5 w-5" />
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
