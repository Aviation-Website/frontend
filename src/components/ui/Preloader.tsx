"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950 overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Clouds Layer 1 (Back - Slower) */}
          <motion.div
            className="absolute inset-0 z-0 opacity-60"
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{ duration: 3, ease: "linear" }}
          >
            <Cloud className="absolute left-[10%] top-[20%] h-16 w-16 md:h-32 md:w-32 text-white" />
            <Cloud className="absolute right-[15%] top-[50%] h-20 w-20 md:h-40 md:w-40 text-white" />
            <Cloud className="absolute left-[30%] top-[80%] h-12 w-12 md:h-24 md:w-24 text-white" />
          </motion.div>

          {/* Plane */}
          <motion.div
            className="relative z-40 drop-shadow-2xl flex items-center justify-center w-full"
            initial={{ y: "110vh", scale: 0.5}}
            animate={{ y: "-110vh", scale: 1.2}}
            transition={{ duration: 3.5, ease: "easeInOut" }}
          >
            {/* Replace src with your actual plane image path */}
            <Image 
              src="/Logo/AirplanePreloader.png"
              width={300} 
              height={300}
              alt="Plane" 
              className="h-32 w-32 md:h-[30%] md:w-[30%] object-contain"
            />
          </motion.div>

          {/* Clouds Layer 2 (Front - Faster) */}
          <motion.div
            className="absolute inset-0 z-20 opacity-80"
            initial={{ y: "100%" }}
            animate={{ y: "-100%" }}
            transition={{ duration: 2.5, ease: "linear" }}
          >
            <Cloud className="absolute right-[20%] top-[10%] h-24 w-24 md:h-48 md:w-48 text-white/90" />
            <Cloud className="absolute left-[15%] top-[60%] h-28 w-28 md:h-56 md:w-56 text-white/90" />
          </motion.div>
          
           {/* Speed Lines / Wind Effect */}
           <motion.div
            className="absolute inset-0 z-10"
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
