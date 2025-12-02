/** @format */

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Leaf } from "lucide-react";
import { toast } from "sonner";
import useGlobalStore from "../globalState";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 使用 useNavigate 进行页面跳转
  const handleNavigation = (path: string) => {
    setIsOpen(false);
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  const handleJoin = () => {
    useGlobalStore.setState({
      isRuzhuOpen: !useGlobalStore.getState().isRuzhuOpen,
    });
  };

  const navItems = [
    { name: "首页", path: "/" },
    { name: "核心功能", path: "/features" },
    { name: "五大领域", path: "/themes" },
    { name: "数字人林小汇", path: "/digital-human" },
    { name: "交易平台", path: "/platform" },
  ];

  return (
    <nav className='bg-white/80 backdrop-blur-md fixed w-full z-50 border-b border-slate-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16 items-center'>
          <div
            onClick={() => handleNavigation("/")}
            className='flex items-center cursor-pointer'
          >
            <Leaf className='h-8 w-8 text-eco-green-600' />
            <span className='ml-2 text-xl font-bold text-slate-800'>
              碳汇云联
            </span>
          </div>

          {/* Desktop Menu */}
          <div className='hidden md:flex space-x-8'>
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`transition-colors ${
                  location.pathname === item.path
                    ? "text-eco-green-600 font-semibold"
                    : "text-slate-600 hover:text-eco-green-600"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className='hidden md:flex'>
            <button
              onClick={handleJoin}
              className='bg-eco-green-600 text-white px-4 py-2 rounded-lg hover:bg-eco-green-700 transition-colors'
            >
              立即入驻
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='text-slate-600'
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2'>
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`block w-full text-left py-2 ${
                location.pathname === item.path
                  ? "text-eco-green-600 font-semibold"
                  : "text-slate-600"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
