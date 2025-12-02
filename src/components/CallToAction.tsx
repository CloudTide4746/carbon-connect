import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { IMAGES } from '../constants/images';

export default function CallToAction() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-eco-green-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: `url('${IMAGES.PATTERNS.CUBES}')` }}
      ></div>
      
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          准备好开启绿色碳汇之旅了吗？
        </h2>
        <p className="text-xl text-eco-green-100 mb-10">
          无论您是拥有林地资源的乡村集体，还是寻求碳中和解决方案的企业，
          <br className="hidden md:block" />
          碳汇云联都将为您提供最专业的技术与服务支持。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate('/platform')}
            className="bg-white text-eco-green-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-eco-green-50 transition-colors flex items-center justify-center"
          >
            前往交易平台 <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button 
            onClick={() => navigate('/digital-human')}
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
          >
            咨询林小汇
          </button>
        </div>
      </div>
    </section>
  );
}
