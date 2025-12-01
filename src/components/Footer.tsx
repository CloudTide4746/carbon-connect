import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold text-white">碳汇云联</span>
            <p className="mt-4 text-slate-400 max-w-xs">
              连接乡村与企业，利用科技力量守护绿水青山，共创零碳未来。
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">平台服务</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-eco-green-400">碳汇交易</a></li>
              <li><a href="#" className="hover:text-eco-green-400">项目开发</a></li>
              <li><a href="#" className="hover:text-eco-green-400">监测报告</a></li>
              <li><a href="#" className="hover:text-eco-green-400">林小汇咨询</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">联系我们</h4>
            <ul className="space-y-2 text-sm">
              <li>北京市海淀区...</li>
              <li>contact@carbonconnect.com</li>
              <li>400-123-4567</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© 2024 CarbonConnect. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">隐私政策</a>
            <a href="#" className="hover:text-white">服务条款</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
