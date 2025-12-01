import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function Layout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Navbar />
      
      {/* Global Loading Indicator */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/50 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="flex flex-col items-center">
              <Loader2 className="w-10 h-10 text-eco-green-600 animate-spin mb-2" />
              <span className="text-eco-green-800 font-medium">加载中...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
