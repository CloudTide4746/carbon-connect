/** @format */

import { motion } from "framer-motion";
import { IMAGES } from "../constants/images";
import { themes } from "../data/story_success";

export default function ThemesPage() {
  return (
    <div className='relative min-h-screen bg-slate-900 overflow-hidden font-sans'>
      {/* Background Image with Parallax-like effect */}
      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-slate-900/90 z-10' />
        <img
          src={IMAGES.THEMES.FIVE_FIELDS}
          alt='Background'
          className='w-full h-full object-cover opacity-60'
        />
      </div>

      {/* Main Content */}
      <div className='relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20'>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-20'
        >
          <h1 className='text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-green-200 to-green-400 mb-6 tracking-tight'>
            五大战略领域
          </h1>
          <p className='text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light'>
            紧扣国家战略，全方位赋能乡村可持续高质量发展，构建生态与经济共赢的新格局
          </p>
          <div className='w-24 h-1 bg-green-500 mx-auto mt-8 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.6)]' />
        </motion.div>

        {/* Cards Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {themes.map((theme, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
              }}
              className='group relative bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-green-900/20'
            >
              {/* Decorative Gradient Blob */}
              <div className='absolute -top-10 -right-10 w-32 h-32 bg-green-500/20 rounded-full blur-3xl group-hover:bg-green-400/30 transition-colors duration-500' />

              {/* Icon */}
              <div className='relative mb-6'>
                <div className='w-14 h-14 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                  <theme.icon className='w-7 h-7 text-green-400 group-hover:text-white transition-colors duration-300' />
                </div>
              </div>

              {/* Text Content */}
              <h3 className='text-xl font-bold text-white mb-3 tracking-wide group-hover:text-green-300 transition-colors'>
                {theme.title}
              </h3>
              <p className='text-gray-300 text-sm leading-relaxed mb-6 min-h-[40px]'>
                {theme.desc}
              </p>

              {/* Details Section */}
              <div className='pt-6 border-t border-white/10'>
                <p className='text-xs text-gray-400 leading-relaxed italic'>
                  "{theme.details}"
                </p>
              </div>

              {/* Bottom Highlight Line */}
              <div className='absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-green-400 to-emerald-600 group-hover:w-full transition-all duration-500 ease-out' />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
