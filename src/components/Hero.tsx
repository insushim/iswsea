"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronDown, Calendar, Eye } from "lucide-react";
import { heroImages, pensionInfo } from "@/data/pension";

// Ken Burns 효과 - 각 슬라이드마다 다른 방향으로 줌/패닝
const kenBurnsVariants = [
  { scale: [1, 1.15], x: ["0%", "3%"], y: ["0%", "2%"] },      // 우하단으로 줌인
  { scale: [1.1, 1], x: ["2%", "-2%"], y: ["0%", "0%"] },      // 좌우 패닝 + 줌아웃
  { scale: [1, 1.12], x: ["0%", "-3%"], y: ["0%", "-2%"] },    // 좌상단으로 줌인
  { scale: [1.12, 1.02], x: ["-2%", "2%"], y: ["2%", "-1%"] }, // 대각선 패닝
  { scale: [1, 1.18], x: ["0%", "0%"], y: ["0%", "3%"] },      // 세로 줌인
  { scale: [1.15, 1], x: ["3%", "-2%"], y: ["-2%", "1%"] },    // 줌아웃 + 패닝
  { scale: [1, 1.1], x: ["-2%", "2%"], y: ["0%", "0%"] },      // 좌우 패닝
  { scale: [1.08, 1.15], x: ["0%", "-2%"], y: ["1%", "-2%"] }, // 느린 줌인
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 7000); // 7초로 늘려서 Ken Burns 효과를 더 잘 볼 수 있게

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [currentSlide]);

  const prevSlide = () => {
    setDirection(-1);
    goToSlide((currentSlide - 1 + heroImages.length) % heroImages.length);
  };

  const nextSlide = () => {
    setDirection(1);
    goToSlide((currentSlide + 1) % heroImages.length);
  };

  const currentImage = heroImages[currentSlide];
  const currentKenBurns = kenBurnsVariants[currentSlide % kenBurnsVariants.length];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Images with Ken Burns Effect */}
      <AnimatePresence initial={true} mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Ken Burns 이미지 - 줌/패닝 애니메이션 */}
          <motion.img
            key={`img-${currentSlide}`}
            src={currentImage.src}
            alt={currentImage.alt}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{
              scale: currentKenBurns.scale[0],
              x: currentKenBurns.x[0],
              y: currentKenBurns.y[0]
            }}
            animate={{
              scale: currentKenBurns.scale[1],
              x: currentKenBurns.x[1],
              y: currentKenBurns.y[1]
            }}
            transition={{
              duration: 7,
              ease: "linear"
            }}
          />
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-black/35" />
        </motion.div>
      </AnimatePresence>

      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 z-[1]" />

      {/* Content - 모바일에서 검은 영역 중앙 정렬 */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <div className="w-full max-w-none px-4 md:px-8 lg:px-16 mt-[28vh] sm:mt-0">
          {/* Logo Mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <motion.div
              className="w-16 h-[1px] bg-white/60"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <span className="text-white/90 text-sm tracking-[0.4em] font-light uppercase">
              {pensionInfo.nameEn}
            </span>
            <motion.div
              className="w-16 h-[1px] bg-white/60"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </motion.div>

          {/* Dynamic Title - 슬라이드별 변경 with stagger effect */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight tracking-tight"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <span className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                  {currentImage.title}
                </span>
              </motion.h1>
              <motion.p
                className="text-xl sm:text-2xl md:text-3xl text-white/90 font-light mb-8 sm:mb-14 md:mb-16 lg:mb-20 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                {currentImage.subtitle}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-7 md:gap-8 lg:gap-10 px-4 mt-8"
          >
            <motion.a
              href={pensionInfo.naverBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-4 w-[240px] sm:min-w-[260px] sm:h-[60px] px-10 py-4 bg-[#03C75A] backdrop-blur-md border border-[#03C75A] text-white font-semibold text-base sm:text-lg rounded-full transition-all hover:bg-[#02b351]"
              whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(3,199,90,0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              <Calendar className="w-5 h-5" />
              <span>네이버 예약</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#rooms"
              className="group flex items-center justify-center gap-4 w-[240px] sm:min-w-[220px] sm:h-[60px] px-10 py-4 bg-white/10 backdrop-blur-md border-2 border-white/60 text-white font-semibold text-base sm:text-lg rounded-full transition-all"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye className="w-5 h-5" />
              <span>객실 보기</span>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Slide Navigation - 좌우 화살표 (모바일에서 숨김) */}
      <motion.button
        onClick={prevSlide}
        className="hidden sm:flex absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 lg:p-4 rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-md transition-all border border-white/20 items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="이전 슬라이드"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.button>

      <motion.button
        onClick={nextSlide}
        className="hidden sm:flex absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 lg:p-4 rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-md transition-all border border-white/20 items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="다음 슬라이드"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.button>

      {/* Progress Bar - 하단 프로그레스 */}
      <div className="absolute bottom-16 sm:bottom-20 lg:bottom-28 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative"
            aria-label={`슬라이드 ${index + 1}`}
          >
            <div
              className={`h-1 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? "w-12 bg-white"
                  : "w-6 bg-white/40 group-hover:bg-white/70"
              }`}
            />
            {index === currentSlide && (
              <motion.div
                className="absolute top-0 left-0 h-1 bg-white/60 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 7, ease: "linear" }}
                key={`progress-${currentSlide}`}
              />
            )}
          </button>
        ))}
      </div>

      {/* Slide Counter - 우측 하단 */}
      <div className="absolute bottom-28 right-8 z-20 text-white font-light hidden lg:flex items-baseline gap-1">
        <motion.span
          className="text-3xl font-medium"
          key={currentSlide}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {String(currentSlide + 1).padStart(2, "0")}
        </motion.span>
        <span className="text-white/50 mx-1">/</span>
        <span className="text-white/70 text-lg">{String(heroImages.length).padStart(2, "0")}</span>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 sm:bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-1 sm:gap-2 text-white/80 hover:text-white transition-colors"
        >
          <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase font-light">Scroll</span>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.a>
      </motion.div>

      {/* Side Info - 좌측 세로 텍스트 */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20 hidden xl:block">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            className="w-[1px] h-16 bg-white/30"
            initial={{ height: 0 }}
            animate={{ height: 64 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <span className="text-white/70 text-xs tracking-[0.3em] uppercase [writing-mode:vertical-lr]">
            태안 안면도
          </span>
          <motion.div
            className="w-[1px] h-16 bg-white/30"
            initial={{ height: 0 }}
            animate={{ height: 64 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          />
        </div>
      </div>
    </section>
  );
}
