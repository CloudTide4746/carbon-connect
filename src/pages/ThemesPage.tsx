/** @format */

import { motion } from "framer-motion";
import { IMAGES } from "../constants/images";
import { themes } from "../data/story_success";


export default function ThemesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='pt-20 min-h-screen bg-slate-50'
    >
      <section className='py-20 bg-eco-green-900 text-white relative overflow-hidden'>
        <div
          className='absolute inset-0 opacity-20'
          style={{ backgroundImage: `url('${IMAGES.PATTERNS.DIAGMONDS}')` }}
        ></div>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10'>
          <h1 className='text-4xl md:text-5xl font-bold mb-6'>五大战略领域</h1>
          <p className='text-xl text-eco-green-100 max-w-3xl mx-auto'>
            紧扣国家战略，全方位赋能乡村可持续高质量发展
          </p>
        </div>
      </section>

      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='space-y-12'>
            {themes.map((theme, index) => (
              <div
                key={index}
                className='bg-white p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col md:flex-row items-center gap-8'
              >
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0 ${theme.color}`}
                >
                  <theme.icon className='w-10 h-10' />
                </div>
                <div className='flex-grow text-center md:text-left'>
                  <h3 className='text-2xl font-bold text-slate-800 mb-3'>
                    {theme.title}
                  </h3>
                  <p className='text-lg text-slate-600 mb-4'>{theme.desc}</p>
                  <p className='text-slate-500 text-sm bg-slate-50 p-4 rounded-lg border border-slate-100'>
                    {theme.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
