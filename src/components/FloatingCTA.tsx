"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Calendar, X, MessageCircle } from "lucide-react";
import { pensionInfo } from "@/data/pension";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        >
          {/* Expanded Options */}
          <AnimatePresence>
            {isExpanded && (
              <>
                <motion.a
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ delay: 0.1 }}
                  href={`tel:${pensionInfo.phone}`}
                  className="flex items-center gap-4 px-8 py-5 bg-[#1E2A3A] shadow-2xl rounded-full text-white hover:scale-105 transition-transform border border-white/10 min-w-[220px]"
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center shadow-md flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="text-left whitespace-nowrap">
                    <span className="block text-sm text-white/80" style={{ color: 'rgba(255,255,255,0.8)' }}>전화 문의</span>
                    <span className="block text-lg font-bold !text-white" style={{ color: 'white' }}>{pensionInfo.phone}</span>
                  </div>
                </motion.a>
                <motion.a
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ delay: 0.05 }}
                  href={pensionInfo.naverBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-8 py-5 bg-[#03C75A] shadow-2xl rounded-full text-white hover:scale-105 transition-transform hover:shadow-[0_10px_40px_rgba(3,199,90,0.4)] min-w-[220px]"
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div className="text-left whitespace-nowrap">
                    <span className="block text-sm text-white/80" style={{ color: 'rgba(255,255,255,0.8)' }}>네이버</span>
                    <span className="block text-lg font-bold !text-white" style={{ color: 'white' }}>예약하기</span>
                  </div>
                </motion.a>
              </>
            )}
          </AnimatePresence>

          {/* Main Toggle Button */}
          <div className="relative">
            {/* Pulse ring animation - 더 눈에 띄게 */}
            {!isExpanded && (
              <>
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#03C75A]"
                  animate={{
                    scale: [1, 1.4, 1.4],
                    opacity: [0.6, 0, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#03C75A]"
                  animate={{
                    scale: [1, 1.6, 1.6],
                    opacity: [0.4, 0, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.3,
                  }}
                />
              </>
            )}
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              animate={!isExpanded ? {
                y: [0, -8, 0],
                rotate: [0, 5, -5, 0],
              } : {}}
              transition={{
                repeat: Infinity,
                duration: 2.5,
                ease: "easeInOut"
              }}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-2xl flex items-center justify-center transition-all ${
                isExpanded
                  ? "bg-gray-800 text-white"
                  : "bg-[#03C75A] text-white hover:shadow-[0_10px_40px_rgba(3,199,90,0.6)] border-2 border-white/30"
              }`}
              style={!isExpanded ? { boxShadow: '0 8px 32px rgba(3, 199, 90, 0.5)' } : {}}
            >
              <AnimatePresence mode="wait">
                {isExpanded ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 sm:w-7 sm:h-7" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
