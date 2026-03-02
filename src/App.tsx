import { useState, useEffect } from 'react';
import Scene3D from './components/Scene3D';
import ChapterContent from './components/ChapterContent';
import ChapterTwo from './components/ChapterTwo';
import TopProgressBar from './components/TopProgressBar';
import FullscreenButton from './components/FullscreenButton';
import BottomProgressRing from './components/BottomProgressRing';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [activeTab, setActiveTab] = useState<'chapter1' | 'chapter2' | 'chapter3'>('chapter1');

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="w-full min-h-screen relative bg-blue-50/50">

      {/* Global Progress Bar */}
      <TopProgressBar />

      {/* Global Fullscreen Toggle */}
      <FullscreenButton />

      {/* Circular Bottom Right Progress Indicator */}
      <BottomProgressRing />

      {/* Floating Tab Navigation */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex gap-4 bg-white/40 backdrop-blur-xl p-2 rounded-full border-2 border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
        <button
          onClick={() => setActiveTab('chapter1')}
          className={`px-6 py-2 rounded-full font-bold text-sm sm:text-base transition-all ${activeTab === 'chapter1' ? 'bg-blue-500 text-white shadow-md' : 'text-blue-900 hover:bg-white/50'}`}
        >
          Ch 1: Motion
        </button>
        <button
          onClick={() => setActiveTab('chapter2')}
          className={`px-6 py-2 rounded-full font-bold text-sm sm:text-base transition-all ${activeTab === 'chapter2' ? 'bg-purple-500 text-white shadow-md' : 'text-purple-900 hover:bg-white/50'}`}
        >
          Ch 2: Distance
        </button>
        <button
          onClick={() => setActiveTab('chapter3')}
          className={`px-6 py-2 rounded-full font-bold text-sm sm:text-base transition-all ${activeTab === 'chapter3' ? 'bg-pink-500 text-white shadow-md' : 'text-pink-900 hover:bg-white/50'}`}
        >
          Ch 3: Speed
        </button>
      </div>

      {/* Full-Screen 3D Background (Persists globally) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Scene3D />
      </div>

      {/* Dynamic Main Content Area */}
      <div className="relative z-10 w-full pt-20">
        <AnimatePresence mode="wait">
          {activeTab === 'chapter1' && (
            <motion.div
              key="chapter1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ChapterContent />
            </motion.div>
          )}
          {activeTab === 'chapter2' && (
            <motion.div
              key="chapter2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ChapterTwo />
            </motion.div>
          )}
          {activeTab === 'chapter3' && (
            <motion.div
              key="chapter3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-screen flex items-center justify-center"
            >
              <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl text-center">
                <h2 className="text-4xl font-bold text-pink-600 mb-4">Chapter 3 Coming Soon!</h2>
                <p className="text-xl text-gray-700">We'll build this in Iteration 6.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
