

export default function DigitalHuman() {
  return (
    <section id="digital-human" className="py-20 bg-slate-900 text-white overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:flex items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <div className="relative">
               {/* Conceptual visual for Digital Human */}
               <div className="w-64 h-64 md:w-80 md:h-80 mx-auto bg-gradient-to-b from-eco-green-400 to-carbon-blue-500 rounded-full blur-3xl opacity-30 absolute top-0 left-1/2 transform -translate-x-1/2"></div>
               <div className="relative w-full max-w-md mx-auto bg-slate-800 rounded-2xl border border-slate-700 p-1 shadow-2xl">
                 <div className="bg-slate-900 rounded-xl overflow-hidden aspect-[3/4] relative flex items-end justify-center">
                   {/* Silhouette or Abstract Rep of Lin Xiaohui */}
                   <div className="absolute bottom-0 w-48 h-64 bg-gradient-to-t from-eco-green-500 to-transparent opacity-50 rounded-t-full blur-sm"></div>
                   <div className="relative z-10 text-center pb-10">
                     <div className="w-32 h-32 mx-auto bg-slate-700 rounded-full mb-4 flex items-center justify-center border-2 border-eco-green-400">
                       <span className="text-4xl">👩‍🌾</span>
                     </div>
                     <div className="bg-slate-800/80 backdrop-blur px-6 py-2 rounded-full border border-slate-600 inline-block">
                       <span className="text-eco-green-400 font-mono">Listening...</span>
                     </div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 lg:pl-16">
            <div className="inline-block px-3 py-1 rounded-full bg-eco-green-900/50 border border-eco-green-500/30 text-eco-green-400 text-sm font-medium mb-6">
              智能助手
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              你好，我是 <span className="text-transparent bg-clip-text bg-gradient-to-r from-eco-green-400 to-blue-400">林小汇</span>
            </h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              我是您的专属农业碳汇科普助手。利用AIGC技术生成，我可以为您：
            </p>
            <ul className="space-y-4">
              {[
                '解读最新的乡村振兴与碳汇交易政策',
                '指导农户如何参与林业碳汇项目开发',
                '提供森林防火与病虫害防治的实时建议',
                '协助企业寻找合适的碳抵消项目'
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-eco-green-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-eco-green-400"></div>
                  </div>
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
            
            <button className="mt-10 bg-gradient-to-r from-eco-green-600 to-eco-green-500 hover:from-eco-green-500 hover:to-eco-green-400 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg shadow-eco-green-900/50">
              与我对话
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
