import React, { useState } from 'react';
import { Menu, X, Leaf, BarChart3, Globe, Sprout, Cpu, Scan, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Leaf className="h-8 w-8 text-eco-green-600" />
            <span className="ml-2 text-xl font-bold text-slate-800">碳汇云联</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="text-slate-600 hover:text-eco-green-600 transition-colors">首页</a>
            <a href="#features" className="text-slate-600 hover:text-eco-green-600 transition-colors">核心功能</a>
            <a href="#themes" className="text-slate-600 hover:text-eco-green-600 transition-colors">五大领域</a>
            <a href="#digital-human" className="text-slate-600 hover:text-eco-green-600 transition-colors">数字人林小汇</a>
            <a href="#platform" className="text-slate-600 hover:text-eco-green-600 transition-colors">交易平台</a>
          </div>

          <div className="hidden md:flex">
            <button className="bg-eco-green-600 text-white px-4 py-2 rounded-lg hover:bg-eco-green-700 transition-colors">
              立即入驻
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2">
          <a href="#home" className="block py-2 text-slate-600">首页</a>
          <a href="#features" className="block py-2 text-slate-600">核心功能</a>
          <a href="#themes" className="block py-2 text-slate-600">五大领域</a>
          <a href="#digital-human" className="block py-2 text-slate-600">数字人林小汇</a>
          <a href="#platform" className="block py-2 text-slate-600">交易平台</a>
        </div>
      )}
    </nav>
  );
}
