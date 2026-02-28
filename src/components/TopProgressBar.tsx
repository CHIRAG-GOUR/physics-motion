
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function TopProgressBar() {
    const { scrollYProgress } = useScroll();

    // Smooth the scroll progress for both animations
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // The progress bar fill uses scaleX
    const scaleX = smoothProgress;

    // The car will move from 0% to 100% across the viewport width
    const carX = useTransform(smoothProgress, [0, 1], ["0%", "100vw"]);

    return (
        <div className="fixed top-0 left-0 right-0 h-4 z-50 pointer-events-none">
            {/* Background Track */}
            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />

            {/* The actual progress bar fill */}
            <motion.div
                className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 origin-left shadow-[0_4px_15px_rgba(236,72,153,0.5)]"
                style={{ scaleX }}
            />

            {/* The Car leaving smoke (independent of scaleX) */}
            <motion.div
                className="absolute top-1/2 -translate-y-1/2 flex items-center -ml-8"
                style={{ x: carX }}
            >
                {/* Animated Smoke Trails */}
                <div className="relative w-16 h-8 -mr-8 flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute right-0 w-4 h-4 rounded-full bg-white/80 blur-[2px]"
                            animate={{
                                x: [-10, -40 - (Math.random() * 20)],
                                y: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 30],
                                scale: [1, 2 + Math.random()],
                                opacity: [0.8, 0]
                            }}
                            transition={{
                                duration: 0.8 + Math.random() * 0.5,
                                repeat: Infinity,
                                delay: i * 0.2
                            }}
                        />
                    ))}
                </div>

                {/* SVG Lamborghini Silhouette */}
                <svg
                    viewBox="0 0 120 30"
                    className="w-20 h-6 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] z-10 text-rose-500 fill-current"
                >
                    {/* Aggressive angled body */}
                    <path d="M5,25 L15,12 L35,10 L50,8 L75,10 L105,18 L115,25 Z" />
                    {/* Sharp spoiler */}
                    <path d="M5,15 L15,10 L15,15 Z" />
                    {/* Windows */}
                    <path d="M45,10 L65,12 L85,16 L45,16 Z" className="text-gray-900 fill-current opacity-90" />
                    {/* Exotic Wheels */}
                    <circle cx="25" cy="25" r="7" className="text-gray-900 fill-current" />
                    <circle cx="25" cy="25" r="3" className="text-gray-400 fill-current" />
                    <circle cx="90" cy="25" r="7" className="text-gray-900 fill-current" />
                    <circle cx="90" cy="25" r="3" className="text-gray-400 fill-current" />
                </svg>
            </motion.div>
        </div>
    );
}
