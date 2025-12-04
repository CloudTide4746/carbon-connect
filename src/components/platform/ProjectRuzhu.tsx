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
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import useGlobalStore from "../../globalState";
import { toast } from "sonner";
import { useState, useEffect, useRef } from "react";
import { submitDeclaration } from "../../services/declarationService";
import { PROVINCES, TREE_TYPES } from "../../data/locationData";

const STEPS = [
  { id: 1, title: "基础信息" },
  { id: 2, title: "权属证明" },
  { id: 3, title: "联系方式" },
];

export default function ProjectRuzhu() {
  const isRuzhuOpen = useGlobalStore((state) => state.isRuzhuOpen);
  const setIsRuzhuOpen = useGlobalStore((state) => state.setIsRuzhuOpen);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    province: "",
    city: "",
    district: "",
    area: "",
    treeType: "造林碳汇",
    methodology: "CM-001-V01 造林和再造林碳汇项目方法学",
    contact: "",
    phone: "",
    leaderContact: "",
    recordNumber: "",
    certType: "林权证",
    certValidity: "",
    remarks: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [estimatedCarbon, setEstimatedCarbon] = useState<number | null>(null);

  // Auto-calculate estimated carbon
  useEffect(() => {
    if (formData.area && !errors.area) {
      const treeTypeData = TREE_TYPES.find(t => t.label === formData.treeType);
      if (treeTypeData) {
        setEstimatedCarbon(Number((Number(formData.area) * treeTypeData.factor).toFixed(2)));
      }
    } else {
      setEstimatedCarbon(null);
    }
  }, [formData.area, formData.treeType]);

  // Update methodology when tree type changes
  useEffect(() => {
    const treeTypeData = TREE_TYPES.find(t => t.label === formData.treeType);
    if (treeTypeData) {
      setFormData(prev => ({ ...prev, methodology: treeTypeData.method }));
    }
  }, [formData.treeType]);

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "name":
        if (!/^[\u4e00-\u9fa5a-zA-Z0-9-_]+$/.test(value)) {
          error = "仅支持中文、数字、字母及 - _";
        } else if (/^\d+$/.test(value)) {
          error = "不能为纯数字";
        }
        break;
      case "area":
        if (Number(value) <= 0) {
          error = "面积需大于 0 公顷";
        } else if (!/^\d+(\.\d{1})?$/.test(value)) {
          error = "仅支持一位小数";
        }
        break;
      case "phone":
      case "leaderContact":
        if (!/^1[3-9]\d{9}$/.test(value)) {
          error = "请输入有效的手机号";
        }
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return error === "";
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      validateField(name, value);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setUploadError(null);
    
    if (!selectedFile) return;

    // Validate file type
    if (!['application/pdf', 'image/jpeg', 'image/png'].includes(selectedFile.type)) {
      setUploadError("仅支持 PDF/JPG/PNG 格式");
      return;
    }

    // Validate file size (10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setUploadError("文件过大，请压缩至 10MB 以内");
      return;
    }

    setFile(selectedFile);
  };

  const handleNext = () => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.name) newErrors.name = "必填项";
      else if (!validateField("name", formData.name)) isValid = false;
      
      if (!formData.province || !formData.city || !formData.district) newErrors.location = "请完整选择地理位置";
      
      if (!formData.area) newErrors.area = "必填项";
      else if (!validateField("area", formData.area)) isValid = false;
    } else if (currentStep === 2) {
      if (!file) {
        setUploadError("请上传权属证明文件");
        isValid = false;
      }
      if (formData.certType === "其他" && !formData.remarks) {
        newErrors.remarks = "请填写补充说明";
        isValid = false;
      }
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
    if (Object.keys(newErrors).length > 0) isValid = false;

    if (isValid) {
      setCurrentStep(prev => prev + 1);
    } else {
      toast.error("请完善必填信息");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validation
    if (!formData.contact || !formData.phone) {
      setErrors(prev => ({
        ...prev,
        contact: !formData.contact ? "必填项" : "",
        phone: !formData.phone ? "必填项" : ""
      }));
      toast.error("请完善必填信息");
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
        location: `${formData.province}${formData.city}${formData.district}`,
        area: Number(formData.area),
        treeType: formData.treeType,
        contact: formData.phone,
      });

      toast.dismiss(loadingToast);
      
      // Generate Application ID
      const appId = `TH${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      
      toast.success(`申请已提交！编号：${appId}`, {
        description: "审核结果将在 3 个工作日内通过短信/邮件通知。",
        duration: 8000,
      });

      // 重置表单并关闭
      setFormData({
        name: "",
        province: "",
        city: "",
        district: "",
        area: "",
        treeType: "造林碳汇",
        methodology: "CM-001-V01 造林和再造林碳汇项目方法学",
        contact: "",
        phone: "",
        leaderContact: "",
        recordNumber: "",
        certType: "林权证",
        certValidity: "",
        remarks: "",
      });
      setFile(null);
      setCurrentStep(1);
      setIsRuzhuOpen(false);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("提交失败，已为您保留填写内容，请稍后重试");
    } finally {
      setIsLoading(false);
    }
  };

  // Render helpers
  const getCities = () => PROVINCES.find(p => p.name === formData.province)?.cities || [];
  const getDistricts = () => getCities().find(c => c.name === formData.city)?.districts || [];

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
              <div className='flex items-center gap-4 mb-6'>
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

              {/* Progress Bar */}
              <div className="relative flex items-center justify-between text-sm font-medium text-white/80">
                {STEPS.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center gap-2 relative z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                      currentStep >= step.id ? "bg-white text-eco-green-600 border-white" : "bg-transparent border-white/40 text-white/40"
                    }`}>
                      {currentStep > step.id ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                    </div>
                    <span className={currentStep >= step.id ? "text-white" : "text-white/40"}>{step.title}</span>
                  </div>
                ))}
                {/* Progress Line */}
                <div className="absolute top-4 left-0 w-full h-0.5 bg-white/20 -z-0">
                  <div 
                    className="h-full bg-white transition-all duration-500"
                    style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Decorative Circles */}
              <div className='absolute -bottom-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none'></div>
              <div className='absolute top-0 left-1/2 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl pointer-events-none'></div>
            </div>

            {/* Scrollable Form Area */}
            <div className='flex-1 overflow-y-auto custom-scrollbar p-8 bg-slate-50'>
              <form className='space-y-8'>
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                  <motion.section
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className='grid grid-cols-1 gap-6'>
                      <div className='space-y-2'>
                        <label className='text-sm font-medium text-slate-600'>
                          项目名称 <span className="text-red-500">*</span>
                        </label>
                        <input
                          name='name'
                          value={formData.name}
                          onChange={handleInputChange}
                          type='text'
                          placeholder='例如：云南普洱造林碳汇项目'
                          className={`w-full px-4 py-3 rounded-xl border ${errors.name ? "border-red-500 focus:ring-red-200" : "border-slate-200 focus:ring-eco-green-500/20 focus:border-eco-green-500"} bg-white focus:ring-2 transition-all outline-none`}
                        />
                        {errors.name && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
                      </div>

                      <div className='space-y-2'>
                        <label className='text-sm font-medium text-slate-600'>
                          地理位置 <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <select
                            name="province"
                            value={formData.province}
                            onChange={(e) => {
                              setFormData(prev => ({ ...prev, province: e.target.value, city: "", district: "" }));
                              handleInputChange(e);
                            }}
                            className="px-3 py-3 rounded-xl border border-slate-200 bg-white outline-none"
                          >
                            <option value="">选择省份</option>
                            {PROVINCES.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                          </select>
                          <select
                            name="city"
                            value={formData.city}
                            onChange={(e) => {
                              setFormData(prev => ({ ...prev, city: e.target.value, district: "" }));
                              handleInputChange(e);
                            }}
                            disabled={!formData.province}
                            className="px-3 py-3 rounded-xl border border-slate-200 bg-white outline-none disabled:bg-slate-100"
                          >
                            <option value="">选择城市</option>
                            {getCities().map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                          </select>
                          <select
                            name="district"
                            value={formData.district}
                            onChange={handleInputChange}
                            disabled={!formData.city}
                            className="px-3 py-3 rounded-xl border border-slate-200 bg-white outline-none disabled:bg-slate-100"
                          >
                            <option value="">选择区县</option>
                            {getDistricts().map(d => <option key={d} value={d}>{d}</option>)}
                          </select>
                        </div>
                        {errors.location && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.location}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className='space-y-2'>
                          <label className='text-sm font-medium text-slate-600'>
                            林地类型 <span className="text-red-500">*</span>
                          </label>
                          <select
                            name='treeType'
                            value={formData.treeType}
                            onChange={handleInputChange}
                            className='w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-eco-green-500/20 focus:border-eco-green-500 transition-all outline-none text-slate-600'
                          >
                            {TREE_TYPES.map(t => <option key={t.label} value={t.label}>{t.label}</option>)}
                          </select>
                        </div>
                        <div className='space-y-2'>
                          <label className='text-sm font-medium text-slate-600'>
                            预估面积 (公顷) <span className="text-red-500">*</span>
                          </label>
                          <input
                            name='area'
                            value={formData.area}
                            onChange={handleInputChange}
                            type='number'
                            placeholder='0.0'
                            step="0.1"
                            className={`w-full px-4 py-3 rounded-xl border ${errors.area ? "border-red-500 focus:ring-red-200" : "border-slate-200 focus:ring-eco-green-500/20 focus:border-eco-green-500"} bg-white focus:ring-2 transition-all outline-none`}
                          />
                          {errors.area && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.area}</p>}
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <label className='text-sm font-medium text-slate-600'>
                          CCER 方法学版本
                        </label>
                        <input
                          value={formData.methodology}
                          readOnly
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                        />
                      </div>

                      {estimatedCarbon !== null && (
                        <div className="bg-eco-green-50 border border-eco-green-100 rounded-xl p-4 flex items-start gap-3">
                          <div className="p-2 bg-eco-green-100 rounded-full">
                            <TreePine className="w-4 h-4 text-eco-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-eco-green-800">参考初始碳汇量</p>
                            <p className="text-2xl font-bold text-eco-green-700">{estimatedCarbon} <span className="text-sm font-normal opacity-80">吨 CO₂e / 年</span></p>
                            <p className="text-xs text-eco-green-600 mt-1 opacity-80">基于默认系数自动估算，仅供参考</p>
                          </div>
                        </div>
                      )}
                      
                      <div className='space-y-2'>
                        <label className='text-sm font-medium text-slate-600'>
                          项目负责人联系方式
                        </label>
                        <input
                          name='leaderContact'
                          value={formData.leaderContact}
                          onChange={handleInputChange}
                          type='tel'
                          placeholder='请输入手机号'
                          className='w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-eco-green-500/20 focus:border-eco-green-500 transition-all outline-none'
                        />
                      </div>

                      <div className='space-y-2'>
                        <label className='text-sm font-medium text-slate-600'>
                          项目备案编号
                        </label>
                        <input
                          name='recordNumber'
                          value={formData.recordNumber}
                          onChange={handleInputChange}
                          type='text'
                          placeholder='如有，请填写'
                          className='w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-eco-green-500/20 focus:border-eco-green-500 transition-all outline-none'
                        />
                      </div>
                    </div>
                  </motion.section>
                )}

                {/* Step 2: Documentation */}
                {currentStep === 2 && (
                  <motion.section
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-2 gap-6">
                      <div className='space-y-2'>
                        <label className='text-sm font-medium text-slate-600'>
                          证件类型 <span className="text-red-500">*</span>
                        </label>
                        <select
                          name='certType'
                          value={formData.certType}
                          onChange={handleInputChange}
                          className='w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-eco-green-500/20 focus:border-eco-green-500 transition-all outline-none'
                        >
                          <option>林权证</option>
                          <option>土地承包合同</option>
                          <option>其他</option>
                        </select>
                      </div>
                      <div className='space-y-2'>
                        <label className='text-sm font-medium text-slate-600'>
                          证件有效期
                        </label>
                        <input
                          name='certValidity'
                          value={formData.certValidity}
                          onChange={handleInputChange}
                          type='date'
                          className='w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-eco-green-500/20 focus:border-eco-green-500 transition-all outline-none'
                        />
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <label className='text-sm font-medium text-slate-600'>
                        权属证明文件 <span className="text-red-500">*</span>
                      </label>
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed ${uploadError ? "border-red-300 bg-red-50" : "border-slate-300 hover:bg-blue-50/50 hover:border-blue-400"} rounded-2xl p-8 text-center transition-all cursor-pointer group relative`}
                      >
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={handleFileChange} 
                          className="hidden" 
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                        
                        {file ? (
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                              <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <p className="text-slate-800 font-medium">{file.name}</p>
                            <p className="text-slate-500 text-sm mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setFile(null);
                              }}
                              className="mt-4 text-red-500 text-sm hover:underline"
                            >
                              删除并重新上传
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className='w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors'>
                              {uploadError ? <AlertCircle className="w-6 h-6 text-red-500" /> : <UploadCloud className='w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors' />}
                            </div>
                            <p className={`${uploadError ? "text-red-500" : "text-slate-600"} font-medium mb-1`}>
                              {uploadError || "点击上传林权证或土地使用证"}
                            </p>
                            <p className='text-slate-400 text-sm'>
                              支持 PDF, JPG, PNG (最大 10MB)
                            </p>
                            {uploadError && (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  fileInputRef.current?.click();
                                }}
                                className="mt-4 px-4 py-2 bg-white border border-red-200 rounded-lg text-red-500 text-sm flex items-center gap-2 mx-auto hover:bg-red-50 transition-colors"
                              >
                                <RefreshCw className="w-3 h-3" /> 重试上传
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {formData.certType === "其他" && (
                      <div className='space-y-2'>
                        <label className='text-sm font-medium text-slate-600'>
                          补充说明 <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name='remarks'
                          value={formData.remarks}
                          onChange={handleInputChange}
                          placeholder="请说明证件类型及相关情况..."
                          className={`w-full px-4 py-3 rounded-xl border ${errors.remarks ? "border-red-500" : "border-slate-200"} bg-white focus:ring-2 focus:ring-eco-green-500/20 focus:border-eco-green-500 transition-all outline-none h-32 resize-none`}
                        />
                        {errors.remarks && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.remarks}</p>}
                      </div>
                    )}
                  </motion.section>
                )}

                {/* Step 3: Contact */}
                {currentStep === 3 && (
                  <motion.section
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className='grid grid-cols-1 gap-6'>
                      <div className='space-y-2'>
                        <label className='text-sm font-medium text-slate-600'>
                          联系人姓名 <span className="text-red-500">*</span>
                        </label>
                        <input
                          name='contact'
                          value={formData.contact}
                          onChange={handleInputChange}
                          type='text'
                          className={`w-full px-4 py-3 rounded-xl border ${errors.contact ? "border-red-500" : "border-slate-200"} bg-white focus:ring-2 focus:ring-eco-green-500/20 focus:border-eco-green-500 transition-all outline-none`}
                        />
                      </div>
                      <div className='space-y-2'>
                        <label className='text-sm font-medium text-slate-600'>
                          联系电话 <span className="text-red-500">*</span>
                        </label>
                        <input
                          name='phone'
                          value={formData.phone}
                          onChange={handleInputChange}
                          type='tel'
                          className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? "border-red-500" : "border-slate-200"} bg-white focus:ring-2 focus:ring-eco-green-500/20 focus:border-eco-green-500 transition-all outline-none`}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3 text-sm text-blue-700">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <p>
                        提交申请即代表您同意平台对您的林地信息进行核验，并承诺所填信息真实有效。审核结果将通过短信通知。
                      </p>
                    </div>
                  </motion.section>
                )}
              </form>
            </div>

            {/* Footer Actions */}
            <div className='p-6 bg-white border-t border-slate-100 shrink-0 flex justify-between items-center'>
              {currentStep > 1 ? (
                <button
                  type='button'
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  disabled={isLoading}
                  className='px-6 py-3 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-colors disabled:opacity-50'
                >
                  上一步
                </button>
              ) : (
                <button
                  type='button'
                  onClick={() => setIsRuzhuOpen(false)}
                  disabled={isLoading}
                  className='px-6 py-3 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-colors disabled:opacity-50'
                >
                  取消
                </button>
              )}
              
              {currentStep < 3 ? (
                <button
                  onClick={handleNext}
                  className='px-8 py-3 rounded-xl bg-eco-green-600 text-white font-bold hover:bg-eco-green-700 shadow-lg shadow-eco-green-200 hover:shadow-xl hover:shadow-eco-green-300 transition-all transform hover:-translate-y-0.5 flex items-center gap-2'
                >
                  下一步 <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className='px-8 py-3 rounded-xl bg-eco-green-600 text-white font-bold hover:bg-eco-green-700 shadow-lg shadow-eco-green-200 hover:shadow-xl hover:shadow-eco-green-300 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isLoading ? "提交中..." : "提交申请"}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
