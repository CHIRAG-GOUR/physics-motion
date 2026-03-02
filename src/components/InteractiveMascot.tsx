import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function InteractiveMascot() {
    const mascotRef = useRef<HTMLDivElement>(null);
    const speechRef = useRef<HTMLDivElement>(null);
    const [factIndex, setFactIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const funFacts = [
        "Did you know? Light travels at 300,000 km per second! 🚀",
        "Displacement can be zero even if distance is huge! Think of a race track. 🏎️",
        "If you stay completely still, you're still moving relative to the Sun! ☀️",
        "Velocity represents both speed AND direction! 🧭"
    ];

    useEffect(() => {
        // Idle floating animation using GSAP
        if (mascotRef.current) {
            gsap.to(mascotRef.current, {
                y: -15,
                rotation: 5,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    }, []);

    const handleClick = () => {
        // Pop animation on click
        if (mascotRef.current) {
            gsap.fromTo(mascotRef.current,
                { scale: 0.8 },
                { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" }
            );
        }
        setFactIndex((prev) => (prev + 1) % funFacts.length);
    };

    return (
        <div className="fixed bottom-[10%] left-8 z-50">
            {/* Speech Bubble (only shows on hover) */}
            <motion.div
                ref={speechRef}
                initial={{ opacity: 0, scale: 0.5, x: -20, y: 20 }}
                animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0.5,
                    x: isHovered ? 0 : -20,
                    y: isHovered ? 0 : 20
                }}
                className="absolute bottom-full left-full mb-4 w-64 bg-white p-4 rounded-3xl rounded-bl-sm shadow-xl border-4 border-purple-200 pointer-events-none origin-bottom-left"
            >
                <p className="text-gray-700 font-bold text-sm">
                    {funFacts[factIndex]}
                </p>
                <p className="text-xs text-purple-400 mt-2 font-medium">Click me for another fact!</p>
            </motion.div>

            {/* Mascot Body */}
            <div
                ref={mascotRef}
                className="cursor-pointer relative drop-shadow-2xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleClick}
            >
                {/* Body shape using simple generic CSS blob styling */}
                <div className="w-24 h-24 bg-gradient-to-tr from-purple-500 to-pink-400 rounded-full flex items-center justify-center border-4 border-white shadow-[0_0_30px_rgba(216,180,254,0.6)] relative overflow-hidden group">
                    {/* Eyes */}
                    <div className="absolute top-8 left-4 w-4 h-4 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                        <div className="w-2 h-2 rounded-full bg-black translate-x-1" />
                    </div>
                    <div className="absolute top-8 right-6 w-4 h-4 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                        <div className="w-2 h-2 rounded-full bg-black translate-x-1" />
                    </div>
                    {/* Smile */}
                    <svg className="absolute top-12 left-8 w-8 h-4 text-white" viewBox="0 0 100 50">
                        <path d="M 10 10 Q 50 40 90 10" stroke="currentColor" strokeWidth="10" fill="transparent" strokeLinecap="round" />
                    </svg>
                    {/* Blush */}
                    <div className="absolute top-12 left-2 w-4 h-2 bg-pink-500 rounded-full opacity-50 blur-sm" />
                    <div className="absolute top-12 right-4 w-4 h-2 bg-pink-500 rounded-full opacity-50 blur-sm" />
                </div>
                {/* Floating Shadow */}
                <div className="w-16 h-4 bg-black/10 rounded-[100%] mx-auto mt-8 blur-md" />
            </div>
        </div>
    );
}
