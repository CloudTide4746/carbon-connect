import { Leaf, Github, Twitter, Linkedin, Mail, ArrowRight, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 text-slate-300 py-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/forest/2070/1000" 
          alt="Forest Background" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/90 to-slate-900/80"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="bg-eco-green-600 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">碳汇云联</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              连接乡村与企业，利用 AI 与区块链技术守护绿水青山，共创零碳未来。
              我们致力于打造最值得信赖的林业碳汇数字化交易平台。
            </p>
            <div className="flex space-x-4">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="bg-slate-800 p-2 rounded-full hover:bg-eco-green-600 hover:text-white transition-colors duration-300">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">平台服务</h4>
            <ul className="space-y-4">
              {['碳汇交易市场', '项目开发指南', 'AI 遥感监测', '数字人咨询', '关于我们'].map((item) => (
                <li key={item}>
                  <a href="#" className="flex items-center hover:text-eco-green-400 transition-colors group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">资源中心</h4>
            <ul className="space-y-4">
              {['行业政策解读', '碳中和白皮书', '成功案例', '合作伙伴', '帮助中心'].map((item) => (
                <li key={item}>
                  <a href="#" className="flex items-center hover:text-eco-green-400 transition-colors group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">订阅动态</h4>
            <p className="text-slate-400 mb-4 text-sm">
              获取最新的碳汇交易资讯与行业报告，每周更新。
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                <input 
                  type="email" 
                  placeholder="您的邮箱地址" 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-eco-green-500 focus:ring-1 focus:ring-eco-green-500 transition-all"
                />
              </div>
              <button className="w-full bg-eco-green-600 hover:bg-eco-green-700 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center">
                立即订阅 <Send className="ml-2 h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© 2025 Carbon Connect. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">隐私政策</a>
            <a href="#" className="hover:text-white transition-colors">服务条款</a>
            <a href="#" className="hover:text-white transition-colors">Cookie 设置</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
