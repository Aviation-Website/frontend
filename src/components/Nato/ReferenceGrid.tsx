"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Volume2, Play } from "lucide-react";
import { NatoData } from "./data";

export const ReferenceGrid = () => {
  const [playingLetter, setPlayingLetter] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Cleanup function
  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const clearPlayingState = () => {
    setPlayingLetter(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const speakWithSynthesis = (code: string, letter: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      clearPlayingState();
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    setPlayingLetter(letter);
    
    const utterance = new SpeechSynthesisUtterance(code);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    utterance.onend = () => {
      clearPlayingState();
    };
    
    utterance.onerror = () => {
      clearPlayingState();
    };
    
    // Safety timeout in case events don't fire
    timeoutRef.current = setTimeout(() => {
      clearPlayingState();
    }, 5000);
    
    window.speechSynthesis.speak(utterance);
  };

  const playNatoAudio = (audioUrl: string, letter: string, code: string) => {
    if (playingLetter) return; // Prevent multiple plays at once
    
    // Stop any currently playing audio and clear timeout
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    setPlayingLetter(letter);
    
    try {
      const audio = new Audio();
      audio.preload = 'auto';
      audioRef.current = audio;
      
      const cleanup = () => {
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('loadeddata', handleLoaded);
        audio.removeEventListener('canplay', handleCanPlay);
        clearPlayingState();
      };
      
      const handleEnded = () => {
        cleanup();
      };
      
      const handleError = () => {
        cleanup();
        // Fallback to speech synthesis
        if (typeof window !== 'undefined' && window.speechSynthesis) {
          speakWithSynthesis(code, letter);
        }
      };

      let canPlayTriggered = false;
      
      const handleLoaded = () => {
        if (!canPlayTriggered) {
          // Try to play once data is loaded
          audio.play().catch(handleError);
        }
      };

      const handleCanPlay = () => {
        canPlayTriggered = true;
        // Try to play when ready
        audio.play().catch(handleError);
      };
      
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);
      audio.addEventListener('loadeddata', handleLoaded);
      audio.addEventListener('canplay', handleCanPlay);
      
      // Set source after listeners to catch all events
      audio.src = audioUrl;
      audio.load();
      
      // Safety timeout: if nothing happens in 8 seconds, reset state
      timeoutRef.current = setTimeout(() => {
        cleanup();
        // Try speech synthesis as fallback
        if (typeof window !== 'undefined' && window.speechSynthesis) {
          speakWithSynthesis(code, letter);
        }
      }, 8000);
      
    } catch {
      // Fallback to speech synthesis
      clearPlayingState();
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        speakWithSynthesis(code, letter);
      }
    }
  };

  return (
    <div className="w-full bg-white pb-24">
        <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-bold flex items-center gap-3 text-gray-900">
                    <Image
                      src="/Nato/search-document-svgrepo-com.svg"
                      alt="Search document icon"
                      width={44}
                      height={24}
                      className="w-14 h-14"
                    />
                    Full Reference
                </h2>
                <div className="h-px flex-1 bg-gray-200 ml-6" />
            </div>

            <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {NatoData.map((item) => {
                    const isPlaying = playingLetter === item.letter;
                    const isDisabled = playingLetter !== null && !isPlaying;
                    
                    return (
                    <motion.div
                        key={item.letter}
                        whileHover={!isDisabled ? { y: -8, transition: { duration: 0.12, delay: 0 } } : {}}
                        whileTap={!isDisabled ? { scale: 0.98 } : {}}
                        onClick={() => !isDisabled && playNatoAudio(item.audio, item.letter, item.code)}
                        className={`group relative bg-[#002d4b] border border-slate-800 rounded-2xl p-5 transition-all duration-150 overflow-hidden select-none ${
                            isDisabled 
                                ? 'cursor-not-allowed' 
                                : 'hover:bg-[#002d4b]/90 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer'
                        } ${isPlaying ? 'ring-2 ring-blue-500 border-blue-500 bg-[#002d4b]/90' : ''}`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className={`text-4xl font-bold transition-colors duration-150 ${
                                isPlaying ? 'text-blue-400' : 'text-slate-400 group-hover:text-white'
                            }`}>
                                {item.letter}
                            </span>
                            <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-150 shadow-sm pointer-events-none ${
                                isPlaying 
                                    ? 'bg-blue-600 border-blue-600 text-white animate-pulse' 
                                    : 'bg-[#002d4b]/80 border-slate-700 text-slate-400 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white group-hover:scale-110'
                            }`}>
                                {isPlaying ? (
                                    <Volume2 className="w-5 h-5" />
                                ) : (
                                    <Play className="w-5 h-5 ml-0.5" />
                                )}
                            </div>
                        </div>
                        
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-slate-200 group-hover:text-white mb-1 transition-colors duration-150">{item.code}</h3>
                            <p className="text-xs text-slate-400 font-medium uppercase tracking-widest font-mono group-hover:text-blue-300 transition-colors duration-150">
                                {item.pronunciation}
                            </p>
                        </div>

                        {/* Decorative bg element */}
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-linear-to-br from-blue-500/5 to-transparent rounded-full group-hover:scale-150 transition-transform duration-250 ease-out" />
                    </motion.div>
                    );
                })}
            </motion.div>
        </div>
    </div>
  );
};
