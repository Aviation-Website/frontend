"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Keyboard } from "lucide-react";
import { NatoData } from "./data";

export const TranslatorSection = () => {
  const [inputText, setInputText] = useState("");

  // Handle translation
  const translatedWords = inputText
    .toUpperCase()
    .split("")
    .map((char, index) => {
      const match = NatoData.find((item) => item.letter === char);
      return match ? { ...match, id: index } : { letter: char, code: char, pronunciation: "", id: index };
    });

  return (
    <div className="w-full bg-white pb-12 pt-0 relative z-20">
      <div className="container mx-auto px-6">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-3xl mx-auto"
        >
            {/* Input Container - Dark on White Background */}
            <div className="bg-[#002d4b]/70 backdrop-blur-xl border border-gray-800 rounded-3xl p-2 shadow-2xl transform -translate-y-8">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                        <Keyboard className="w-6 h-6" />
                    </div>
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type to translate (e.g. 'Pilot')"
                        className="w-full bg-slate-900 text-white placeholder:text-gray-600 text-xl md:text-2xl py-6 pl-14 pr-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        maxLength={20}
                    />
                    {inputText && (
                        <button 
                            onClick={() => setInputText("")}
                            className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-white transition-colors"
                        >
                            <span className="text-xs bg-gray-800 px-2 py-1 rounded">ESC</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Live Translation Result */}
            <AnimatePresence mode="wait">
                {translatedWords.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-4 pb-4 pt-8"
                    >
                        <div className="flex flex-wrap gap-3 justify-center">
                            {translatedWords.map((item, idx) => (
                                item.code !== " " ? (
                                    <motion.div
                                        key={`${item.id}-${idx}`}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className={`flex flex-col items-center py-3 px-6 rounded-xl min-w-[100px] shadow-lg ${
                                            item.code === item.letter 
                                            ? "bg-[#002d4b] border border-slate-700" // Special char
                                            : "bg-[#002d4b] border border-slate-800" // Valid NATO - Dark like reference grid
                                        }`}
                                    >
                                        <span className="text-xs text-slate-400 font-mono mb-1">{item.letter}</span>
                                        <span className="text-lg font-bold text-white">{item.code}</span>
                                    </motion.div>
                                ) : (
                                    <div key={idx} className="w-4" /> // Spacer for spaces
                                )
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
