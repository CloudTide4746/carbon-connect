/** @format */

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDownRight,
  MapPin,
  Leaf,
  DollarSign,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
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

interface ProjectModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  selectedProject: Project | null;
}

export default function ProjectModal({
  isModalOpen,
  setIsModalOpen,
  selectedProject,
}: ProjectModalProps) {
  const handleBuy = () => {
    toast.success("订单创建成功！请前往支付。");
    setIsModalOpen(false);
  };

  const handleContact = () => {
    toast.info("已向卖家发送联系请求，请留意消息通知。");
  };

  return (
    <AnimatePresence>
      {isModalOpen && selectedProject && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className='absolute inset-0 bg-black/60 backdrop-blur-sm'
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className='bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl'
          >
            <div className='relative h-64'>
              <img
                src={IMAGES.PROJECTS[selectedProject.id - 1]}
                alt={selectedProject.name}
                className='w-full h-full object-cover'
              />
              <button
                onClick={() => setIsModalOpen(false)}
                className='absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors'
              >
                <ArrowDownRight className='h-6 w-6 transform rotate-45' />
              </button>
              <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6'>
                <h2 className='text-3xl font-bold text-white'>
                  {selectedProject.name}
                </h2>
                <p className='text-slate-200 flex items-center mt-2'>
                  <MapPin className='h-4 w-4 mr-1' /> {selectedProject.location}
                </p>
              </div>
            </div>

            <div className='p-8'>
              <div className='grid grid-cols-2 gap-6 mb-8'>
                <div className='bg-slate-50 p-4 rounded-xl border border-slate-100'>
                  <div className='text-sm text-slate-500 mb-1'>项目类型</div>
                  <div className='text-lg font-semibold text-slate-900 flex items-center gap-2'>
                    <Leaf className='h-5 w-5 text-eco-green-600' />
                    {selectedProject.type}
                  </div>
                </div>
                <div className='bg-slate-50 p-4 rounded-xl border border-slate-100'>
                  <div className='text-sm text-slate-500 mb-1'>当前单价</div>
                  <div className='text-lg font-semibold text-slate-900 flex items-center gap-2'>
                    <DollarSign className='h-5 w-5 text-eco-green-600' />¥
                    {selectedProject.price.toFixed(2)} /吨
                  </div>
                </div>
              </div>

              <div className='space-y-6 mb-8'>
                <div>
                  <h4 className='font-bold text-slate-900 mb-3 flex items-center gap-2'>
                    <Activity className='h-5 w-5 text-blue-500' />
                    监测数据
                  </h4>
                  <div className='bg-slate-50 rounded-xl p-4 border border-slate-100'>
                    <div className='flex justify-between items-center mb-2'>
                      <span className='text-slate-600'>森林覆盖率</span>
                      <span className='font-mono font-bold'>92.5%</span>
                    </div>
                    <div className='w-full bg-slate-200 h-2 rounded-full mb-4'>
                      <div
                        className='bg-eco-green-500 h-2 rounded-full'
                        style={{ width: "92.5%" }}
                      ></div>
                    </div>
                    <div className='flex justify-between items-center mb-2'>
                      <span className='text-slate-600'>近期固碳增速</span>
                      <span className='font-mono font-bold text-eco-green-600'>
                        +5.2%
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className='font-bold text-slate-900 mb-3 flex items-center gap-2'>
                    <CheckCircle2 className='h-5 w-5 text-eco-green-500' />
                    项目认证
                  </h4>
                  <div className='flex flex-wrap gap-3'>
                    {selectedProject.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className='px-3 py-1 bg-eco-green-50 text-eco-green-700 rounded-full text-sm font-medium border border-eco-green-100'
                      >
                        {tag}
                      </span>
                    ))}
                    <span className='px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100'>
                      第三方核查通过
                    </span>
                  </div>
                </div>
              </div>

              <div className='flex gap-4'>
                <button
                  onClick={handleBuy}
                  className='flex-1 bg-eco-green-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-eco-green-700 transition-all shadow-lg shadow-eco-green-200'
                >
                  立即购买
                </button>
                <button
                  onClick={handleContact}
                  className='flex-1 bg-white text-slate-700 border border-slate-200 py-3 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all'
                >
                  联系卖家
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
