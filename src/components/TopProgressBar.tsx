
import { motion, useScroll, useSpring } from 'framer-motion';

export default function TopProgressBar() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="fixed top-0 left-0 right-0 h-4 z-50 pointer-events-none">
            {/* Background Track */}
            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />

            {/* The actual progress bar fill */}
            <motion.div
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transform origin-left shadow-[0_4px_15px_rgba(236,72,153,0.5)]"
                style={{ scaleX }}
            >
                {/* The Car leaving smoke attached to the right edge */}
                <div className="absolute -right-12 top-1/2 -translate-y-1/2 -scale-x-100 flex items-center">

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

                    {/* SVG Sports Car (Lamborghini/Ferrari inspired silhouette) */}
                    <svg
                        viewBox="0 0 100 40"
                        className="w-16 h-8 drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)] z-10 text-rose-500 fill-current"
                    >
                        {/* Body */}
                        <path d="M10,25 C10,20 15,15 30,12 C40,10 50,5 60,8 C75,12 85,15 90,20 C95,25 95,30 90,30 L10,30 Z" />
                        {/* Spoiler */}
                        <path d="M5,15 L15,15 L15,20 L5,20 Z" />
                        <path d="M12,25 L12,15" stroke="currentColor" strokeWidth="2" />
                        {/* Wheels */}
                        <circle cx="25" cy="30" r="6" className="text-gray-900 fill-current" />
                        <circle cx="75" cy="30" r="6" className="text-gray-900 fill-current" />
                        {/* Windows */}
                        <path d="M40,12 C50,8 55,8 60,10 L70,18 L40,18 Z" className="text-white fill-current opacity-80" />
                    </svg>

                </div>
            </motion.div>
        </div>
    );
}
