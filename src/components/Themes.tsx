import { Sprout, Zap, Heart, Palette, Landmark } from 'lucide-react';

const themes = [
  {
    title: '乡村振兴与农业农村现代化',
    icon: Sprout,
    color: 'bg-green-100 text-green-600',
    desc: '推动农业产业升级，增加农民收入，实现农村现代化。'
  },
  {
    title: '科技创新和未来产业',
    icon: Zap,
    color: 'bg-blue-100 text-blue-600',
    desc: 'AI遥感、大数据与区块链技术赋能传统林业。'
  },
  {
    title: '生态文明建设和绿色低碳发展',
    icon: Heart,
    color: 'bg-emerald-100 text-emerald-600',
    desc: '践行“绿水青山就是金山银山”理念，促进碳中和。'
  },
  {
    title: '文化创意和区域交流合作',
    icon: Palette,
    color: 'bg-purple-100 text-purple-600',
    desc: '挖掘乡村生态文化价值，促进城乡要素双向流动。'
  },
  {
    title: '社会治理和公共服务',
    icon: Landmark,
    color: 'bg-orange-100 text-orange-600',
    desc: '提升乡村数字化治理水平，完善公共服务体系。'
  }
];

export default function Themes() {
  return (
    <section id="themes" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">五大战略领域</h2>
          <p className="mt-4 text-slate-600">全方位赋能乡村可持续发展</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {themes.map((theme, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${theme.color}`}>
                <theme.icon className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2 h-12 flex items-center">{theme.title}</h3>
              <p className="text-sm text-slate-500">{theme.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
