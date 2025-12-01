import { motion } from 'framer-motion';
import { Quote, ArrowRight } from 'lucide-react';

const stories = [
  {
    id: 1,
    location: "浙江安吉",
    title: "竹林变金山，村民增收新途径",
    quote: "自从加入了碳汇项目，我们村的万亩竹林不仅卖出了竹子，连空气都变成了钱。",
    author: "李村长",
    image: "https://picsum.photos/seed/story1/800/600",
    impact: "增收 230 万元/年"
  },
  {
    id: 2,
    location: "内蒙古塞罕坝",
    title: "荒漠化治理与碳中和的双赢",
    quote: "通过科学的林业管理，我们将沙地变成了绿洲，现在这些树木正在为全球降温。",
    author: "张林场主",
    image: "https://picsum.photos/seed/story2/800/600",
    impact: "固碳 50 万吨/年"
  },
  {
    id: 3,
    location: "云南普洱",
    title: "生物多样性保护的经济价值",
    quote: "碳汇交易让我们有资金去保护这里的珍稀动植物，生态环境越来越好了。",
    author: "王巡护员",
    image: "https://picsum.photos/seed/story3/800/600",
    impact: "保护面积 3 万公顷"
  }
];

export default function SuccessStories() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">成功案例</h2>
          <p className="mt-4 text-lg text-slate-600">见证绿色变革的力量</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
            >
              <div className="absolute inset-0">
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              </div>
              
              <div className="relative p-8 h-96 flex flex-col justify-end">
                <div className="mb-auto">
                   <span className="bg-eco-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                     {story.location}
                   </span>
                </div>
                
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl font-bold text-white mb-3">{story.title}</h3>
                  <div className="mb-4 relative">
                    <Quote className="absolute -top-2 -left-2 h-6 w-6 text-eco-green-500/30 transform -scale-x-100" />
                    <p className="text-slate-300 text-sm italic relative z-10 pl-4">
                      {story.quote}
                    </p>
                    <p className="text-eco-green-400 text-xs font-bold mt-2 text-right">— {story.author}</p>
                  </div>
                  
                  <div className="border-t border-white/20 pt-4 flex justify-between items-center">
                    <div>
                      <div className="text-xs text-slate-400">项目成效</div>
                      <div className="text-white font-bold">{story.impact}</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-eco-green-600 transition-colors">
                      <ArrowRight className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
