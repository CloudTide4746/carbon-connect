/** @format */

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Leaf, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useGlobalStore from "../globalState";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 监听滚动以改变导航栏样式
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm py-2"
          : "bg-transparent border-b border-transparent py-4"
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center'>
          {/* Logo */}
          <div
            onClick={() => handleNavigation("/")}
            className='flex items-center cursor-pointer group'
          >
            <div className='bg-gradient-to-br from-eco-green-500 to-teal-600 p-2 rounded-xl shadow-lg shadow-eco-green-500/20 group-hover:scale-105 transition-transform duration-300'>
              <Leaf className='h-6 w-6 text-white' />
            </div>
            <span
              className={`ml-3 text-xl font-bold tracking-tight transition-colors duration-300 ${
                scrolled || location.pathname !== "/"
                  ? "text-slate-800"
                  : "text-white"
              }`}
            >
              碳汇云联
            </span>
          </div>

          {/* Desktop Menu */}
          <div className='hidden md:flex items-center space-x-1 bg-white/5 backdrop-blur-sm rounded-full p-1 border border-white/10'>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : scrolled || location.pathname !== "/"
                      ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId='navbar-indicator'
                      className='absolute inset-0 bg-eco-green-600 rounded-full -z-10 shadow-md shadow-eco-green-500/30'
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Action Button */}
          <div className='hidden md:flex'>
            <button
              onClick={handleJoin}
              className={`group flex items-center px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                scrolled || location.pathname !== "/"
                  ? "bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20"
                  : "bg-white text-eco-green-700 hover:bg-eco-green-50 shadow-lg shadow-black/10"
              }`}
            >
              <span>立即入驻</span>
              <ChevronRight className='w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform' />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors ${
                scrolled || location.pathname !== "/"
                  ? "text-slate-800 hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {isOpen ? (
                <X className='w-6 h-6' />
              ) : (
                <Menu className='w-6 h-6' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className='md:hidden bg-white border-t border-slate-100 overflow-hidden'
          >
            <div className='px-4 py-6 space-y-3'>
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`block w-full text-left px-4 py-3 rounded-xl font-medium transition-colors ${
                    location.pathname === item.path
                      ? "bg-eco-green-50 text-eco-green-700"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => {
                  handleJoin();
                  setIsOpen(false);
                }}
                className='block w-full text-center mt-4 px-4 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg shadow-slate-900/20 active:scale-95 transition-transform'
              >
                立即入驻
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
