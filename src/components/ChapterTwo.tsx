import { motion } from 'framer-motion';
import { Ruler, RefreshCw } from 'lucide-react';
import FluidGlass from './FluidGlass';

// Reusable Video Component
function VideoFrame({ url }: { url: string }) {
    const videoId = url.split('/').pop()?.split('?')[0] || url;

    return (
        <div className="w-[800px] max-w-full aspect-video rounded-[3rem] overflow-hidden bg-white p-4 border-[6px] border-gray-200 shadow-[0_16px_0_0_rgba(229,231,235,1)] my-12 mx-auto transform transition-transform hover:-translate-y-2">
            <div className="w-full h-full rounded-[2.2rem] overflow-hidden relative bg-black shadow-inner">
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0"
                />
            </div>
        </div>
    );
}

// Interactive Mini-game: Distance vs Displacement
function DistanceDisplacementActivity() {
    return (
        <div className="p-12 rounded-[3.5rem] bg-white border-8 border-purple-200 shadow-[0_20px_0_0_rgba(233,213,255,1)] hover:-translate-y-2 transition-transform duration-300 mt-16 w-full">
            <h3 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Activity 1: Distance vs Displacement</h3>
            <p className="text-xl text-gray-600 font-medium text-center max-w-2xl mx-auto mb-10">
                You walk from Home (O) to School (A), and then back to the Park (B). Drag the slider to see how your Distance and Displacement change!
            </p>

            {/* This will be an interactive slider or clickable path in the future. For now, we simulate the UI */}
            <div className="w-full max-w-3xl mx-auto bg-slate-50 p-8 rounded-3xl border-[4px] border-slate-200 relative overflow-hidden">
                <div className="h-4 bg-gray-300 rounded-full w-full relative mb-16">
                    {/* Points */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-[5%] flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-500 border-4 border-white shadow-md z-10" />
                        <span className="mt-4 font-bold text-xl text-gray-700">O (0km)</span>
                        <span className="text-sm text-gray-500 font-medium">Home</span>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 left-[40%] flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-green-500 border-4 border-white shadow-md z-10" />
                        <span className="mt-4 font-bold text-xl text-gray-700">B (35km)</span>
                        <span className="text-sm text-gray-500 font-medium">Park</span>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 left-[95%] flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-red-500 border-4 border-white shadow-md z-10" />
                        <span className="mt-4 font-bold text-xl text-gray-700">A (60km)</span>
                        <span className="text-sm text-gray-500 font-medium">School</span>
                    </div>

                    {/* Path traces */}
                    <motion.div
                        className="absolute top-0 bottom-0 left-[5%] right-[5%] bg-blue-400 rounded-full opacity-50"
                        initial={{ scaleX: 0, transformOrigin: "left" }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
                    />
                </div>

                <div className="grid grid-cols-2 gap-8 mt-12">
                    <div className="bg-white p-6 rounded-2xl border-[4px] border-blue-100 shadow-sm text-center">
                        <h4 className="text-2xl font-bold text-gray-800 mb-2">Total Distance</h4>
                        <p className="text-4xl font-extrabold text-blue-600">85 km</p>
                        <p className="text-sm font-medium text-gray-500 mt-2">OA (60km) + AB (25km)</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border-[4px] border-green-100 shadow-sm text-center">
                        <h4 className="text-2xl font-bold text-gray-800 mb-2">Displacement</h4>
                        <p className="text-4xl font-extrabold text-green-600">35 km</p>
                        <p className="text-sm font-medium text-gray-500 mt-2">Shortest path from O to B</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ChapterTwo() {
    return (
        <div className="max-w-6xl mx-auto px-6 pb-40">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="mb-16 mt-10"
            >
                <FluidGlass className="p-12 rounded-[3.5rem] border-[8px] border-white/60 shadow-[0_30px_60px_rgba(0,0,0,0.1)] relative overflow-hidden group">
                    <motion.div
                        className="absolute -top-32 -left-32 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
                        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
                        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    />

                    <div className="relative z-10">
                        <div className="flex items-center justify-center gap-6 mb-6">
                            <span className="text-6xl text-purple-600 font-extrabold px-6 py-2 bg-purple-100/80 rounded-3xl border-4 border-purple-200 shadow-sm drop-shadow-md">
                                2.
                            </span>
                            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600 drop-shadow-sm leading-tight text-center">
                                Distance and Displacement
                            </h1>
                        </div>
                        <p className="text-2xl md:text-3xl text-gray-700 font-bold text-center mt-6 tracking-wide drop-shadow-sm">
                            <span className="text-pink-600">Distance</span> is the total path. <span className="text-blue-600">Displacement</span> is the shortcut!
                        </p>
                    </div>
                </FluidGlass>
            </motion.div>

            {/* Video Section */}
            <VideoFrame url="https://youtu.be/Xo3KBoEMDEo?list=PLG2_S6yzON5f4T3kSAkkeMlTBMTAtsLrz" />

            {/* Definitions Section */}
            <div className="grid md:grid-cols-2 gap-10 mt-16">
                <motion.div
                    whileHover={{ y: -8 }}
                    className="p-10 rounded-[3rem] bg-white border-8 border-pink-100 shadow-lg relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-bl-full flex items-start justify-end p-6">
                        <Ruler className="text-pink-400" size={48} />
                    </div>
                    <h3 className="text-4xl font-extrabold text-gray-800 mb-6 relative z-10">What is Distance?</h3>
                    <p className="text-2xl text-gray-700 font-medium leading-relaxed relative z-10">
                        Distance is defined as the <span className="font-extrabold text-pink-500 bg-pink-50 px-2 rounded-lg">total path length</span> covered by an object during its motion.
                    </p>
                    <ul className="mt-8 space-y-4 relative z-10">
                        <li className="flex items-start gap-4">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center font-bold text-pink-700 mt-1">1</span>
                            <p className="text-xl text-gray-700"><strong>Scalar Quantity:</strong> You only need to specify its numerical value (magnitude). Direction does not matter.</p>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center font-bold text-pink-700 mt-1">2</span>
                            <p className="text-xl text-gray-700"><strong>Magnitude:</strong> This is the numerical value (e.g., "60 km").</p>
                        </li>
                    </ul>
                </motion.div>

                <motion.div
                    whileHover={{ y: -8 }}
                    className="p-10 rounded-[3rem] bg-white border-8 border-blue-100 shadow-lg relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full flex items-start justify-end p-6">
                        <RefreshCw className="text-blue-400" size={48} />
                    </div>
                    <h3 className="text-4xl font-extrabold text-gray-800 mb-6 relative z-10">What is Displacement?</h3>
                    <p className="text-2xl text-gray-700 font-medium leading-relaxed relative z-10">
                        Displacement is the <span className="font-extrabold text-blue-500 bg-blue-50 px-2 rounded-lg">shortest straight-line path</span> between the initial and final position.
                    </p>
                    <ul className="mt-8 space-y-4 relative z-10">
                        <li className="flex items-start gap-4">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700 mt-1">1</span>
                            <p className="text-xl text-gray-700"><strong>Vector Quantity:</strong> You must specify both magnitude AND direction.</p>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700 mt-1">2</span>
                            <p className="text-xl text-gray-700"><strong>Shortcut:</strong> It ignores the path taken and only cares about where you start and where you end up!</p>
                        </li>
                    </ul>
                </motion.div>
            </div>

            {/* Example Videos */}
            <div className="flex flex-col md:flex-row gap-8 mt-16 w-full justify-center">
                <div className="w-full md:w-1/2">
                    <VideoFrame url="https://youtu.be/YshnFne48pw" />
                </div>
                <div className="w-full md:w-1/2">
                    <VideoFrame url="https://www.youtube.com/watch?v=21BwUNDOQno" />
                </div>
            </div>

            {/* Interactive Component */}
            <DistanceDisplacementActivity />

            {/* Physical Activity Box */}
            <div className="mt-16 p-10 bg-yellow-50 rounded-[3rem] border-8 border-yellow-200 shadow-lg relative overflow-hidden">
                <h3 className="text-4xl font-extrabold text-yellow-800 mb-6 text-center">🏃‍♂️ Real World Activity!</h3>
                <ul className="text-2xl text-yellow-900 font-medium leading-relaxed space-y-4 max-w-4xl mx-auto">
                    <li>• Take a <strong>metre scale</strong> and a long rope.</li>
                    <li>• Walk from one corner of a basketball court to its opposite corner along its sides (the long way round).</li>
                    <li>• Measure the <strong>distance</strong> covered by you using the rope.</li>
                    <li>• Now, measure the straight-line <strong>displacement</strong> diagonally across the court.</li>
                    <li className="mt-6 p-4 bg-yellow-100 rounded-2xl border-2 border-yellow-300">
                        <strong>Think:</strong> What difference would you notice between the two measurements? Which one is longer?
                    </li>
                </ul>
            </div>

        </div>
    );
}
