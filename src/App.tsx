import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Scene3D from './components/Scene3D';
import ChapterContent from './components/ChapterContent';
import ChapterTwo from './components/ChapterTwo';
import TopProgressBar from './components/TopProgressBar';
import FullscreenButton from './components/FullscreenButton';
import BottomProgressRing from './components/BottomProgressRing';
import InteractiveMascot from './components/InteractiveMascot';

function App() {
  return (
    <BrowserRouter>
      <div className="w-full min-h-screen relative bg-blue-50/50">

        {/* Global Progress Bar */}
        <TopProgressBar />

        {/* Global Fullscreen Toggle */}
        <FullscreenButton />

        {/* Circular Bottom Right Progress Indicator */}
        <BottomProgressRing />

        {/* Full-Screen 3D Background (Persists globally) */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Scene3D />
        </div>

        {/* Main Content Rendered by Route */}
        <div className="relative z-10 w-full pt-10">
          <Routes>
            <Route path="/" element={<Navigate to="/chapter-1" replace />} />
            <Route path="/chapter-1" element={<ChapterContent />} />
            <Route path="/chapter-2" element={<ChapterTwo />} />
          </Routes>
        </div>

        {/* Global Interactive Mascot */}
        <InteractiveMascot />
      </div>
    </BrowserRouter>
  );
}

export default App;
