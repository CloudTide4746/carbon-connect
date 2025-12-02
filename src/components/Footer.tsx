/** @format */

import {
  Leaf,
  Github,
  Twitter,
  Linkedin,
  Mail,
  ArrowRight,
  Send,
  Globe,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import type { FormEvent } from "react";
import { IMAGES } from "../constants/images";

export default function Footer() {
  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    toast.success("订阅成功！感谢您的关注。");
  };

  return (
    <footer className='relative bg-slate-950 text-slate-300 py-20 overflow-hidden border-t border-slate-800/50'>
      {/* Dynamic Background Gradients */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-eco-green-900/20 rounded-full blur-[120px]'></div>
        <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[120px]'></div>
        {/* Grid Pattern */}
        <div
          className='absolute inset-0 opacity-[0.03]'
          style={{ backgroundImage: `url('${IMAGES.PATTERNS.CUBES}')` }}
        ></div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16'>
          {/* Brand Column (Larger) */}
          <div className='lg:col-span-4 space-y-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='flex items-center space-x-3'
            >
              <div className='bg-gradient-to-br from-eco-green-500 to-teal-600 p-2.5 rounded-2xl shadow-lg shadow-eco-green-900/20'>
                <Leaf className='h-8 w-8 text-white' />
              </div>
              <span className='text-3xl font-bold text-white tracking-tight'>
                碳汇云联
              </span>
            </motion.div>

            <p className='text-slate-400 leading-relaxed text-lg'>
              连接乡村与企业，利用 AI 与区块链技术守护绿水青山，共创零碳未来。
              我们致力于打造最值得信赖的林业碳汇数字化交易平台。
            </p>

            <div className='flex space-x-4'>
              {[
                { icon: Twitter, href: "https://twitter.com" },
                {
                  icon: Github,
                  href: "https://github.com/CloudTide4746/carbon-connect",
                },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className='bg-slate-900 border border-slate-800 p-3 rounded-xl hover:bg-eco-green-600 hover:border-eco-green-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-eco-green-500/30'
                >
                  <social.icon className='h-5 w-5' />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div className='lg:col-span-2 lg:col-start-6'>
            <h4 className='text-white font-bold text-lg mb-8 flex items-center gap-2'>
              <span className='w-1.5 h-1.5 rounded-full bg-eco-green-500'></span>
              平台服务
            </h4>
            <ul className='space-y-4'>
              {[
                "碳汇交易市场",
                "项目开发指南",
                "AI 遥感监测",
                "数字人咨询",
                "关于我们",
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href='#'
                    className='flex items-center text-slate-400 hover:text-eco-green-400 transition-colors group'
                  >
                    <ArrowRight className='h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300' />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className='lg:col-span-2'>
            <h4 className='text-white font-bold text-lg mb-8 flex items-center gap-2'>
              <span className='w-1.5 h-1.5 rounded-full bg-blue-500'></span>
              资源中心
            </h4>
            <ul className='space-y-4'>
              {[
                "行业政策解读",
                "碳中和白皮书",
                "成功案例",
                "合作伙伴",
                "帮助中心",
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href='#'
                    className='flex items-center text-slate-400 hover:text-blue-400 transition-colors group'
                  >
                    <ArrowRight className='h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300' />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className='lg:col-span-3'>
            <h4 className='text-white font-bold text-lg mb-8 flex items-center gap-2'>
              <span className='w-1.5 h-1.5 rounded-full bg-purple-500'></span>
              订阅动态
            </h4>
            <div className='bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors'>
              <p className='text-slate-400 mb-6 text-sm leading-relaxed'>
                获取最新的碳汇交易资讯与行业报告，每周更新。
              </p>
              <form className='space-y-4' onSubmit={handleSubscribe}>
                <div className='relative group'>
                  <Mail className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-eco-green-500 transition-colors' />
                  <input
                    type='email'
                    placeholder='您的邮箱地址'
                    className='w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-eco-green-500 focus:ring-1 focus:ring-eco-green-500/50 transition-all'
                  />
                </div>
                <button className='w-full bg-gradient-to-r from-eco-green-600 to-teal-600 hover:from-eco-green-500 hover:to-teal-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-eco-green-900/20 hover:shadow-eco-green-500/20 flex items-center justify-center group'>
                  立即订阅
                  <Send className='ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className='border-t border-slate-800/60 pt-8 mt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='text-slate-500 text-sm'>
              © 2025 Carbon Connect. All rights reserved.
            </p>
            <div className='flex items-center gap-2 text-sm text-slate-600'>
              <span>Made with</span>
              <Heart className='w-4 h-4 text-red-500 fill-red-500 animate-pulse' />
              <span>by Wanfeng Shiyun Team</span>
            </div>
            <div className='flex space-x-8 text-sm font-medium'>
              <a
                href='#'
                className='text-slate-500 hover:text-white transition-colors'
              >
                隐私政策
              </a>
              <a
                href='#'
                className='text-slate-500 hover:text-white transition-colors'
              >
                服务条款
              </a>
              <a
                href='#'
                className='text-slate-500 hover:text-white transition-colors'
              >
                Cookie 设置
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
