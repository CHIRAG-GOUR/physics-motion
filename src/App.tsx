import Scene3D from './components/Scene3D';
import ChapterContent from './components/ChapterContent';
import TopProgressBar from './components/TopProgressBar';
import FullscreenButton from './components/FullscreenButton';

function App() {
  return (
    <div className="w-full min-h-screen relative bg-blue-50/50">

      {/* Global Progress Bar */}
      <TopProgressBar />

      {/* Global Fullscreen Toggle */}
      <FullscreenButton />

      {/* Full-Screen 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Scene3D />
      </div>

      {/* Continuously Scrolling Main Content Area */}
      <div className="relative z-10 w-full">
        <ChapterContent />
      </div>
    </div>
  );
}

export default App;
