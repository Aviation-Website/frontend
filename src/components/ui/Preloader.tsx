"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

const Preloader = () => {
  const pathname = usePathname();
  const isHome = pathname === "/home" || pathname === "/";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isHome) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // reduced from 3500ms -> ~1s shorter total

    return () => clearTimeout(timer);
  }, [isHome]);

  if (!isHome) return null;

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950 overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background Clouds Layer 1 (Back - Slower) */}
          <motion.div
            className="absolute inset-0 z-0 opacity-60 pointer-events-none"
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{ duration: 3, ease: "linear" }}
          >
            <Cloud className="absolute left-[10%] top-[20%] h-16 w-16 md:h-32 md:w-32 text-white" />
            <Cloud className="absolute right-[15%] top-[50%] h-20 w-20 md:h-40 md:w-40 text-white" />
            <Cloud className="absolute left-[30%] top-[80%] h-12 w-12 md:h-24 md:w-24 text-white" />
          </motion.div>

          {/* Plane - MAIN CONTENT */}
          <motion.div
            className="absolute z-30 flex items-center justify-center"
            initial={{ y: "80vh", opacity: 1, scale: 0.9 }}
            animate={{ y: "-20vh", opacity: 1, scale: 2.2 }}
            exit={{ y: "-120vh", opacity: 0, scale: 2.4 }}
            transition={{ 
              duration: 1.8, // was 2.3s, ~0.5s faster so it finishes before 2.5s timeout
              ease: "easeInOut",
            }}
          >
            <div className="flex flex-col items-center gap-4">
              <Image 
                src="/Logo/AirplanePreloader.png"
                width={260} 
                height={260}
                alt="Plane" 
                className="w-32 h-32 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain drop-shadow-2xl"
                priority
                unoptimized
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-white text-center"
              >
                <p className="text-sm md:text-base">Loading AirSpeak...</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Foreground Clouds Layer 2 (Front - Faster) */}
          <motion.div
            className="absolute inset-0 z-20 opacity-80 pointer-events-none"
            initial={{ y: "100%" }}
            animate={{ y: "-100%" }}
            transition={{ duration: 2.5, ease: "linear" }}
          >
            <Cloud className="absolute right-[20%] top-[10%] h-24 w-24 md:h-48 md:w-48 text-white/90" />
            <Cloud className="absolute left-[15%] top-[60%] h-28 w-28 md:h-56 md:w-56 text-white/90" />
          </motion.div>
          
          {/* Speed Lines / Wind Effect */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 bg-white/30"
                style={{
                  left: `${20 + i * 15}%`,
                  height: "20vh",
                  top: "100%",
                }}
                animate={{ top: "-20%" }}
                transition={{
                  duration: 1 + (i % 3) * 0.2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: (i % 5) * 0.1
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Cloud = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
  </svg>
);

export default Preloader;
