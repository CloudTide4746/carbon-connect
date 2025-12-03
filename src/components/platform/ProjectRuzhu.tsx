/** @format */

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  UploadCloud,
  MapPin,
  TreePine,
  FileText,
  CheckCircle,
  Loader2,
} from "lucide-react";
import useGlobalStore from "../../globalState";
import { toast } from "sonner";
import { useState } from "react";
import { submitDeclaration } from "../../services/declarationService";

export default function ProjectRuzhu() {
  const isRuzhuOpen = useGlobalStore((state) => state.isRuzhuOpen);
  const setIsRuzhuOpen = useGlobalStore((state) => state.setIsRuzhuOpen);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    area: "",
    treeType: "造林碳汇",
    contact: "",
    phone: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.location ||
      !formData.area ||
      !formData.contact ||
      !formData.phone
    ) {
      toast.error("请填写所有必填项");
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading("正在上传至云端... AI 核验中...", {
      duration: Infinity,
    });

    try {
      // 调用模拟后端 API
      const result = await submitDeclaration({
        name: formData.contact,
        location: formData.location,
        area: Number(formData.area),
        treeType: formData.treeType,
        contact: formData.phone,
      });

      toast.dismiss(loadingToast);
      toast.success(`核验成功！预估年碳汇量：${result.carbonVolume} 吨`, {
        description: "项目已存入云端数据库，等待最终审核。",
        duration: 5000,
      });

      // 重置表单并关闭
      setFormData({
        name: "",
        location: "",
        area: "",
        treeType: "造林碳汇",
        contact: "",
        phone: "",
      });
      setIsRuzhuOpen(false);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("提交失败，请检查网络连接");
    } finally {
      setIsLoading(false);
    }
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
            onClick={() => !isLoading && setIsRuzhuOpen(false)}
            className='absolute inset-0 bg-slate-900/70 backdrop-blur-sm'
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className='relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]'
          >
            {/* Loading Overlay */}
            {isLoading && (
              <div className='absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center'>
                <Loader2 className='w-12 h-12 text-eco-green-600 animate-spin mb-4' />
                <h3 className='text-xl font-bold text-slate-800'>
                  AI 智能核验中...
                </h3>
                <p className='text-slate-500 mt-2'>
                  正在分析卫星遥感数据与上传凭证
                </p>
              </div>
            )}

            {/* Header with Gradient */}
            <div className='relative bg-gradient-to-r from-eco-green-600 to-teal-600 p-8 text-white shrink-0'>
              <div className='absolute top-4 right-4'>
                <button
                  onClick={() => !isLoading && setIsRuzhuOpen(false)}
                  disabled={isLoading}
                  className='p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white/80 hover:text-white disabled:opacity-50'
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
              <form className='space-y-8'>
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
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
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
                        name='location'
                        value={formData.location}
                        onChange={handleInputChange}
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
                      <select
                        name='treeType'
                        value={formData.treeType}
                        onChange={handleInputChange}
                        className='w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-eco-green-500/20 focus:border-eco-green-500 transition-all outline-none text-slate-600'
                      >
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
                        name='area'
                        value={formData.area}
                        onChange={handleInputChange}
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
                        name='contact'
                        value={formData.contact}
                        onChange={handleInputChange}
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
                        name='phone'
                        value={formData.phone}
                        onChange={handleInputChange}
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
                disabled={isLoading}
                className='px-6 py-3 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-colors disabled:opacity-50'
              >
                取消
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className='px-8 py-3 rounded-xl bg-eco-green-600 text-white font-bold hover:bg-eco-green-700 shadow-lg shadow-eco-green-200 hover:shadow-xl hover:shadow-eco-green-300 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isLoading ? "处理中..." : "提交申请"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
