import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function BottomProgressRing() {
    const { scrollYProgress } = useScroll();

    // Smooth scroll physics
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // The circle path length (2 * PI * r) where r = 40 is approx 251.2
    const pathLength = 251.2;

    // We animate the stroke from full offset (hidden) to 0 (full)
    const strokeDashoffset = useTransform(smoothProgress, [0, 1], [pathLength, 0]);

    // The ship travels along the circle edge mapping progress (0 to 1) to an angle (-90deg to 270deg)
    const angleRotation = useTransform(smoothProgress, [0, 1], [0, 360]);

    return (
        <div className="fixed bottom-8 right-8 z-50 pointer-events-none flex items-center justify-center w-24 h-24">

            {/* Pulsing ring background (plasma glow effect) */}
            <motion.div
                className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Glowing background track ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" viewBox="0 0 100 100">
                <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-cyan-900/40"
                    strokeWidth="8"
                    fill="none"
                />

                {/* The "Plasma" filling ring */}
                <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-cyan-400"
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={pathLength}
                    style={{ strokeDashoffset }}
                />
            </svg>

            {/* Center percentage text */}
            <div className="absolute inset-0 flex items-center justify-center flex-col drop-shadow-md">
                <motion.span className="text-cyan-500 font-extrabold text-xl ml-1">
                    {useTransform(smoothProgress, p => Math.round(p * 100))}
                </motion.span>
                <span className="text-cyan-800 text-[10px] font-bold -mt-1">%</span>
            </div>

            {/* The Ship Icon orbiting along the SVG path */}
            <motion.div
                className="absolute top-0 bottom-0 left-0 right-0"
                style={{ rotate: angleRotation }}
            >
                {/* The ship sits at the top (12 o'clock) of the rotating container */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">

                    {/* Ship Thrust Flame */}
                    <motion.div
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2 h-4 bg-pink-500 rounded-full blur-[2px]"
                        animate={{ height: ["10px", "16px", "10px"], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 0.1, repeat: Infinity }}
                    />

                    {/* Ship SVG (Sci-fi circular ship / drone) */}
                    <div className="w-8 h-8 bg-white rounded-full border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)] flex items-center justify-center rotate-180">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-cyan-500 fill-current">
                            {/* Drone core */}
                            <circle cx="12" cy="12" r="5" className="text-cyan-600" />
                            <circle cx="12" cy="12" r="2" className="text-white" />
                            {/* Drone wings */}
                            <path d="M2,12 L7,10 L7,14 Z" />
                            <path d="M22,12 L17,10 L17,14 Z" />
                            <path d="M12,2 L10,7 L14,7 Z" />
                            <path d="M12,22 L10,17 L14,17 Z" />
                        </svg>
                    </div>
                </div>
            </motion.div>

        </div>
    );
}
