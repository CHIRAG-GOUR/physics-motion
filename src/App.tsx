import Scene3D from './components/Scene3D';
import ChapterContent from './components/ChapterContent';
import TopProgressBar from './components/TopProgressBar';
import FullscreenButton from './components/FullscreenButton';

function App() {
  return (
    <div className="w-screen h-screen relative overflow-hidden bg-blue-50/50">

      {/* Global Progress Bar */}
      <TopProgressBar />

      {/* Global Fullscreen Toggle */}
      <FullscreenButton />

      {/* Full-Screen 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Scene3D />
      </div>

      {/* Continuously Scrolling Main Content Area */}
      <div className="absolute inset-0 z-10 overflow-x-hidden overflow-y-auto custom-scrollbar" id="scroll-container">
        <ChapterContent />
      </div>
    </div>
  );
}

export default App;
