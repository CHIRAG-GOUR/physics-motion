
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
        <div className="fixed top-0 left-0 right-0 h-1.5 z-50 pointer-events-none">
            {/* Background Track (No longer visible so the smoke pops better) */}
            <div className="absolute inset-0" />

            {/* The smoke-styled progress bar fill */}
            <motion.div
                className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-transparent via-gray-300 to-gray-500 origin-left shadow-[0_2px_10px_rgba(107,114,128,0.5)] z-10"
                style={{ scaleX }}
            />

            {/* The Car leaving smoke (independent of scaleX, sits in front of the bar) */}
            <motion.div
                className="absolute top-1/2 -translate-y-1/2 flex items-center -ml-12 z-20"
                style={{ x: carX }}
            >
                {/* Animated Smoke Trails right behind the car exhaust */}
                <div className="relative w-16 h-8 -mr-8 flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute right-0 w-5 h-5 rounded-full bg-gray-300/80 blur-[2px]"
                            animate={{
                                x: [-10, -50 - (Math.random() * 20)],
                                y: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 35],
                                scale: [1, 2.5 + Math.random()],
                                opacity: [0.9, 0]
                            }}
                            transition={{
                                duration: 0.8 + Math.random() * 0.5,
                                repeat: Infinity,
                                delay: i * 0.2
                            }}
                        />
                    ))}
                </div>

                {/* SVG Thicker Lamborghini Silhouette */}
                <svg
                    viewBox="0 0 120 35"
                    className="w-28 h-8 drop-shadow-[0_6px_8px_rgba(0,0,0,0.6)] z-30 text-rose-600 fill-current ml-6"
                >
                    {/* Aggressive angled thicker body */}
                    <path d="M5,28 L15,15 L35,12 L50,10 L75,12 L105,20 L115,28 L115,30 L5,30 Z" />
                    {/* Sharp spoiler */}
                    <path d="M5,18 L15,12 L15,18 Z" />
                    {/* Darker Windows */}
                    <path d="M45,12 L65,14 L85,18 L45,18 Z" className="text-gray-900 fill-current opacity-95" />
                    {/* Exotic Wheels (Lowered and larger) */}
                    <circle cx="25" cy="27" r="8" className="text-gray-900 fill-current" />
                    <circle cx="25" cy="27" r="4" className="text-gray-300 fill-current" />
                    <circle cx="90" cy="27" r="8" className="text-gray-900 fill-current" />
                    <circle cx="90" cy="27" r="4" className="text-gray-300 fill-current" />
                    {/* Front Headlight flare */}
                    <path d="M100,22 L110,24 L105,20 Z" className="text-yellow-300 fill-current opacity-80" />
                </svg>
            </motion.div>
        </div>
    );
}
