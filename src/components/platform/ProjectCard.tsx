/** @format */

import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import { IMAGES } from "../../constants/images";

interface Project {
  id: number;
  name: string;
  location: string;
  type: string;
  volume: string;
  price: number;
  tags: string[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
  openModal: (project: Project) => void;
}

export default function ProjectCard({
  project,
  index,
  openModal,
}: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.1 }}
      className='bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-shadow group'
    >
      <div className='relative h-48 overflow-hidden'>
        <img
          src={IMAGES.PROJECTS[index]}
          alt={project.name}
          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
        />
        <div className='absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-eco-green-700 shadow-sm'>
          {project.type}
        </div>
      </div>

      <div className='p-6'>
        <h3 className='text-xl font-bold text-slate-900 mb-2'>
          {project.name}
        </h3>
        <div className='flex items-center text-slate-500 text-sm mb-4'>
          <MapPin className='h-4 w-4 mr-1' />
          {project.location}
        </div>

        <div className='flex flex-wrap gap-2 mb-6'>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className='px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded'
            >
              {tag}
            </span>
          ))}
        </div>

        <div className='flex justify-between items-end pt-4 border-t border-slate-100'>
          <div>
            <div className='text-xs text-slate-400 mb-1'>可交易量</div>
            <div className='font-semibold text-slate-700'>{project.volume}</div>
          </div>
          <div className='text-right'>
            <div className='text-xs text-slate-400 mb-1'>当前价格</div>
            <div className='text-2xl font-bold text-eco-green-600'>
              ¥{project.price.toFixed(2)}
            </div>
          </div>
        </div>

        <button
          onClick={() => openModal(project)}
          className='w-full mt-6 bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-eco-green-600 transition-colors flex items-center justify-center gap-2'
        >
          <span>查看详情</span>
          <ArrowUpRight className='h-4 w-4' />
        </button>
      </div>
    </motion.div>
  );
}
