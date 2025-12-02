/** @format */

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  UploadCloud,
  MapPin,
  TreePine,
  FileText,
  CheckCircle,
} from "lucide-react";
import useGlobalStore from "../../globalState";
import { toast } from "sonner";

export default function ProjectRuzhu() {
  const isRuzhuOpen = useGlobalStore((state) => state.isRuzhuOpen);
  const setIsRuzhuOpen = useGlobalStore((state) => state.setIsRuzhuOpen);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("申请提交成功！我们会尽快审核您的项目。");
    setIsRuzhuOpen(false);
  };

  return (
    <AnimatePresence>
      {isRuzhuOpen && (
        <div className='fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6'>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsRuzhuOpen(false)}
            className='absolute inset-0 bg-slate-900/70 backdrop-blur-sm'
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className='relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]'
          >
            {/* Header with Gradient */}
            <div className='relative bg-gradient-to-r from-eco-green-600 to-teal-600 p-8 text-white shrink-0'>
              <div className='absolute top-4 right-4'>
                <button
                  onClick={() => setIsRuzhuOpen(false)}
                  className='p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white/80 hover:text-white'
                >
                  <X className='w-5 h-5' />
                </button>
              </div>
              <div className='flex items-center gap-4 mb-2'>
                <div className='p-3 bg-white/20 rounded-2xl backdrop-blur-md'>
                  <TreePine className='w-8 h-8 text-white' />
                </div>
                <div>
                  <h2 className='text-2xl font-bold'>项目入驻申请</h2>
                  <p className='text-eco-green-100 text-sm opacity-90'>
                    提交您的林业碳汇项目，加入绿色交易生态
                  </p>
                </div>
              </div>

              {/* Decorative Circles */}
              <div className='absolute -bottom-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none'></div>
              <div className='absolute top-0 left-1/2 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl pointer-events-none'></div>
            </div>

            {/* Scrollable Form Area */}
            <div className='flex-1 overflow-y-auto custom-scrollbar p-8 bg-slate-50'>
              <form onSubmit={handleSubmit} className='space-y-8'>
                {/* Section 1: Basic Info */}
                <section>
                  <h3 className='text-lg font-bold text-slate-800 mb-4 flex items-center gap-2'>
                    <MapPin className='w-5 h-5 text-eco-green-600' />
                    基础信息
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium text-slate-600'>
                        项目名称
                      </label>
                      <input
                        type='text'
                        required
                        placeholder='例如：云南普洱林业碳汇项目'
                        className='w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-eco-green-500/20 focus:border-eco-green-500 transition-all outline-none'
                      />
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium text-slate-600'>
                        地理位置
                      </label>
                      <input
                        type='text'
                        required
                        placeholder='省/市/区县'
                        className='w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-eco-green-500/20 focus:border-eco-green-500 transition-all outline-none'
                      />
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium text-slate-600'>
                        林地类型
                      </label>
                      <select className='w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-eco-green-500/20 focus:border-eco-green-500 transition-all outline-none text-slate-600'>
                        <option>造林碳汇</option>
                        <option>森林经营</option>
                        <option>竹林碳汇</option>
                        <option>草地碳汇</option>
                      </select>
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium text-slate-600'>
                        预估面积 (公顷)
                      </label>
                      <input
                        type='number'
                        required
                        placeholder='0.00'
                        className='w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-eco-green-500/20 focus:border-eco-green-500 transition-all outline-none'
                      />
                    </div>
                  </div>
                </section>

                {/* Section 2: Documentation */}
                <section>
                  <h3 className='text-lg font-bold text-slate-800 mb-4 flex items-center gap-2'>
                    <FileText className='w-5 h-5 text-blue-500' />
                    权属证明
                  </h3>
                  <div className='border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:bg-blue-50/50 hover:border-blue-400 transition-all cursor-pointer group'>
                    <div className='w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors'>
                      <UploadCloud className='w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors' />
                    </div>
                    <p className='text-slate-600 font-medium mb-1'>
                      点击上传林权证或土地使用证
                    </p>
                    <p className='text-slate-400 text-sm'>
                      支持 PDF, JPG, PNG (最大 10MB)
                    </p>
                  </div>
                </section>

                {/* Section 3: Contact */}
                <section>
                  <h3 className='text-lg font-bold text-slate-800 mb-4 flex items-center gap-2'>
                    <CheckCircle className='w-5 h-5 text-teal-500' />
                    联系方式
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium text-slate-600'>
                        联系人姓名
                      </label>
                      <input
                        type='text'
                        required
                        className='w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-eco-green-500/20 focus:border-eco-green-500 transition-all outline-none'
                      />
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium text-slate-600'>
                        联系电话
                      </label>
                      <input
                        type='tel'
                        required
                        className='w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-eco-green-500/20 focus:border-eco-green-500 transition-all outline-none'
                      />
                    </div>
                  </div>
                </section>
              </form>
            </div>

            {/* Footer Actions */}
            <div className='p-6 bg-white border-t border-slate-100 shrink-0 flex justify-end gap-4'>
              <button
                type='button'
                onClick={() => setIsRuzhuOpen(false)}
                className='px-6 py-3 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-colors'
              >
                取消
              </button>
              <button
                onClick={handleSubmit}
                className='px-8 py-3 rounded-xl bg-eco-green-600 text-white font-bold hover:bg-eco-green-700 shadow-lg shadow-eco-green-200 hover:shadow-xl hover:shadow-eco-green-300 transition-all transform hover:-translate-y-0.5'
              >
                提交申请
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
