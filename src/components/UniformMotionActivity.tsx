import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function UniformMotionActivity() {
    const [isUniform, setIsUniform] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const carControls = useAnimation();

    // Graph state: tracking data points over time (seconds -> distance)
    const [dataPoints, setDataPoints] = useState<{ t: number, d: number }[]>([]);
    const animationRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    // Max visual boundaries
    const maxTime = 10; // 10 seconds simulation
    const maxDist = 100; // 100 meters

    const resetSimulation = () => {
        setIsPlaying(false);
        setDataPoints([]);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        carControls.set({ x: 0 });
    };

    const startSimulation = () => {
        resetSimulation();
        setIsPlaying(true);
        startTimeRef.current = Date.now();

        const animate = () => {
            if (!startTimeRef.current) return;

            const elapsedTime = (Date.now() - startTimeRef.current) / 1000;

            if (elapsedTime > maxTime) {
                setIsPlaying(false);
                return;
            }

            // Calculate Distance based on Motion Type
            let currentDist = 0;
            if (isUniform) {
                // Uniform: Constant speed v = distance / time -> d = v * t
                // Let's say v = 10 m/s
                currentDist = 10 * elapsedTime;
            } else {
                // Non-Uniform: Accelerating -> d = 0.5 * a * t^2
                // Let's say a = 2 m/s^2 -> d = t^2
                currentDist = Math.pow(elapsedTime, 2);
            }

            // Move the car visually
            // Assume the visual track is 100 units wide

            // Only update data points a few times per second to prevent UI lag
            setDataPoints(prev => {
                const lastPoint = prev[prev.length - 1];
                if (!lastPoint || elapsedTime - lastPoint.t > 0.2) {
                    return [...prev, { t: elapsedTime, d: currentDist }];
                }
                return prev;
            });

            // Need to calculate CSS pixel offset for x
            // We'll let Framer Motion handle percentage based movement

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        // Animate Framer Car
        if (isUniform) {
            carControls.start({ x: 'calc(100% - 64px)', transition: { duration: maxTime, ease: "linear" } });
        } else {
            carControls.start({ x: 'calc(100% - 64px)', transition: { duration: maxTime, ease: "easeIn" } });
        }
    };

    // Clean up animation on unmount
    useEffect(() => {
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []);

    // Helper for SVG Graph drawing
    const createPath = () => {
        if (dataPoints.length === 0) return "";
        return dataPoints.map((point, i) => {
            // Map t (0-maxTime) to X px (0-300)
            const x = (point.t / maxTime) * 300;
            // Map d (0-maxDist) to Y px (0-200), invert Y for SVG drawing
            const y = 200 - ((point.d / maxDist) * 200);
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(" ");
    };

    return (
        <div className="w-full bg-white p-12 rounded-[3.5rem] border-8 border-cyan-200 shadow-xl mb-16 relative overflow-hidden">
            <h3 className="text-4xl font-extrabold text-cyan-900 mb-6 text-center">Interactive Graph: </h3>
            <h4 className="text-2xl font-bold text-center text-cyan-700 mb-10">Uniform vs Non-Uniform Motion 📈</h4>

            <p className="text-xl text-gray-700 font-medium text-center max-w-3xl mx-auto mb-12">
                Choose a driving style! Watch how a constant speed creates a perfectly <b>straight line</b>, while changing speeds create a <b>curved line</b> on a Distance-Time graph!
            </p>

            {/* Controls */}
            <div className="flex justify-center gap-6 mb-12">
                <button
                    onClick={() => { setIsUniform(true); resetSimulation(); }}
                    className={`px-8 py-4 rounded-3xl font-bold text-xl transition-all shadow-md border-4 ${isUniform ? 'bg-cyan-500 text-white border-cyan-600 scale-105' : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'}`}
                >
                    🛣️ Uniform (Steady 10m/s)
                </button>
                <button
                    onClick={() => { setIsUniform(false); resetSimulation(); }}
                    className={`px-8 py-4 rounded-3xl font-bold text-xl transition-all shadow-md border-4 ${!isUniform ? 'bg-indigo-500 text-white border-indigo-600 scale-105' : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'}`}
                >
                    🚦 Non-Uniform (Accelerating)
                </button>
            </div>

            {/* Simulation Arena */}
            <div className="flex flex-col md:flex-row gap-12 items-center justify-center">

                {/* Physical Track */}
                <div className="w-full md:w-1/2 flex flex-col gap-4 bg-slate-50 p-6 rounded-3xl border-[4px] border-slate-200">
                    <div className="flex justify-between font-bold text-slate-400 mb-2">
                        <span>Start 0m</span>
                        <span>Finish {maxDist}m</span>
                    </div>

                    <div className="relative w-full h-24 bg-slate-800 rounded-full border-4 border-slate-600 overflow-hidden shadow-inner">
                        {/* Road lines */}
                        <div className="absolute top-1/2 w-full border-t-4 border-dashed border-yellow-400 opacity-50"></div>

                        {/* The Car */}
                        <motion.div
                            animate={carControls}
                            className="absolute top-2 left-2 w-16 h-16 text-5xl flex items-center justify-center"
                        >
                            {isUniform ? '🚙' : '🏎️'}
                        </motion.div>
                    </div>

                    <button
                        onClick={startSimulation}
                        disabled={isPlaying}
                        className={`mt-4 py-3 rounded-2xl font-bold text-xl uppercase tracking-widest text-white shadow-lg transition-transform ${isPlaying ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 hover:-translate-y-1'}`}
                    >
                        {isPlaying ? 'Driving...' : 'DRIVE! 🏁'}
                    </button>
                </div>

                {/* Graphing Screen */}
                <div className="w-full md:w-1/2">
                    <div className="bg-[#f8fafc] p-6 rounded-[2.5rem] border-8 border-slate-300 shadow-md relative">
                        <div className="absolute -left-12 top-1/2 -rotate-90 font-bold text-slate-500 tracking-widest uppercase">Distance (m)</div>
                        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 font-bold text-slate-500 tracking-widest uppercase">Time (s)</div>

                        {/* Graph Canvas */}
                        <svg className="w-full aspect-[3/2] bg-white border-l-4 border-b-4 border-slate-400 rounded-bl-sm overflow-visible" viewBox="0 0 300 200">
                            {/* Grid markers */}
                            <line x1={0} y1={200} x2={300} y2={200} stroke="#94a3b8" strokeWidth={4} />
                            <line x1={0} y1={0} x2={0} y2={200} stroke="#94a3b8" strokeWidth={4} />

                            {/* Dynamic Plot Line */}
                            {dataPoints.length > 0 && (
                                <motion.path
                                    d={createPath()}
                                    fill="none"
                                    stroke={isUniform ? "#06b6d4" : "#6366f1"} // Cyan vs Indigo
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                            )}
                        </svg>

                        {/* Analysis Output Box */}
                        <div className="mt-6 p-4 rounded-xl bg-slate-100 border-2 border-slate-200">
                            <h5 className="font-extrabold text-slate-700 mb-1">Graph Shape:</h5>
                            {dataPoints.length > 5 ? (
                                isUniform ? (
                                    <p className="text-xl font-bold text-cyan-600 bg-cyan-50 p-2 rounded-lg text-center shadow-sm">📏 Straight Line = Uniform Motion</p>
                                ) : (
                                    <p className="text-xl font-bold text-indigo-600 bg-indigo-50 p-2 rounded-lg text-center shadow-sm">📈 Curved Line = Non-Uniform</p>
                                )
                            ) : (
                                <p className="text-slate-400 italic text-center">Awaiting data...</p>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
