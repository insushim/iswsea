"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Waves,
  Sparkles,
  Flame,
  Droplets,
  Coffee,
  Flower2,
  ChevronLeft,
  ChevronRight,
  Shell,
} from "lucide-react";
import { specials } from "@/data/pension";

const iconMap: Record<string, React.ElementType> = {
  Waves,
  Sparkles,
  Shell,
  Flame,
  Droplets,
  Coffee,
  Flower2,
};

export default function Special() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const activeSpecial = specials[activeIndex];
  const Icon = iconMap[activeSpecial.icon];

  const handleSelectSpecial = (index: number) => {
    setActiveIndex(index);
    setImageIndex(0);
  };

  const nextImage = () => {
    setImageIndex((prev) =>
      prev === activeSpecial.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setImageIndex((prev) =>
      prev === 0 ? activeSpecial.images.length - 1 : prev - 1
    );
  };

  return (
    <section id="special" className="bg-[#0F1419] overflow-hidden" ref={ref} style={{ paddingTop: '30px', paddingBottom: '60px' }}>
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-16 xl:px-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 lg:mb-16"
        >
          <p className="text-[var(--secondary)] text-sm sm:text-base tracking-[0.3em] uppercase mb-3 sm:mb-4 font-medium">
            SPECIAL FACILITIES
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[var(--foreground)] mb-4 sm:mb-6 font-display">
            특별한 시설
          </h2>
          <p className="text-[var(--foreground-muted)] text-sm sm:text-base lg:text-xl mx-auto px-2 text-center">
            바다가 보이는 수영장부터 전 객실 개별 스파와 바베큐장,<br className="hidden sm:block" />
            갯벌체험, 4계절 모두 꽃이 피는 정원까지
          </p>
        </motion.div>

        {/* Mobile: Tab Navigation First */}
        <div className="lg:hidden mb-6">
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-2 pb-2" style={{ width: 'max-content' }}>
              {specials.map((special, index) => {
                const SpecialIcon = iconMap[special.icon];
                const isActive = index === activeIndex;

                return (
                  <button
                    key={special.id}
                    onClick={() => handleSelectSpecial(index)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-[var(--primary)] text-white shadow-lg"
                        : "bg-[#1a2332] border border-[#2a3a4a]"
                    }`}
                    style={{ width: '80px', minWidth: '80px' }}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1.5 ${
                        isActive ? "bg-white/20" : "bg-[#0d1520]"
                      }`}
                    >
                      {SpecialIcon && (
                        <SpecialIcon
                          className={`w-4 h-4 ${
                            isActive ? "text-white" : "text-[var(--primary)]"
                          }`}
                        />
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-bold text-center leading-tight ${
                        isActive ? "text-white" : "text-[var(--foreground)]"
                      }`}
                    >
                      {special.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12">
          {/* Left - Main Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeIndex}-${imageIndex}`}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-[16/9] shadow-2xl"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${activeSpecial.images[imageIndex].src})`,
                  }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/90 hover:bg-white rounded-full text-gray-900 transition-all hover:scale-110 shadow-lg backdrop-blur-sm"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/90 hover:bg-white rounded-full text-gray-900 transition-all hover:scale-110 shadow-lg backdrop-blur-sm"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Number Badge */}
                <div className="absolute top-3 left-3 sm:top-6 sm:left-6 px-3 py-1.5 sm:px-5 sm:py-2.5 bg-[var(--primary)] text-white rounded-full text-xs sm:text-base font-bold shadow-lg">
                  SPECIAL {activeSpecial.number}
                </div>

                {/* Bottom Info Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white/80 text-xs sm:text-sm font-medium tracking-wider mb-1 sm:mb-2">
                        {activeSpecial.nameEn}
                      </p>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                        {activeSpecial.name}
                      </h3>
                    </div>
                    <div className="text-white/70 text-xs sm:text-sm">
                      {imageIndex + 1} / {activeSpecial.images.length}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 overflow-x-auto pb-2 scrollbar-hide">
              {activeSpecial.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setImageIndex(idx)}
                  className={`flex-shrink-0 w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${
                    idx === imageIndex
                      ? "border-[var(--primary)] shadow-lg scale-105"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${img.src})` }}
                  />
                </button>
              ))}
            </div>

            {/* Navigation Buttons - Below Image */}
            <div className="flex justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
              <button
                onClick={prevImage}
                className="p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all hover:scale-110 shadow-lg"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
              <button
                onClick={nextImage}
                className="p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all hover:scale-110 shadow-lg"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            </div>
          </motion.div>

          {/* Right - Info & Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5 flex flex-col"
          >
            {/* Icon & Description - Mobile: Compact */}
            <div className="mb-6 lg:mb-10">
              <div className="flex items-center gap-3 sm:gap-5 mb-4 sm:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-[72px] lg:h-[72px] rounded-xl sm:rounded-2xl bg-[var(--primary)] flex items-center justify-center shadow-xl flex-shrink-0">
                  {Icon && <Icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 text-white" />}
                </div>
                <div className="min-w-0">
                  <p className="text-[var(--secondary)] text-xs sm:text-sm lg:text-base font-medium tracking-wider">
                    {activeSpecial.nameEn}
                  </p>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--foreground)] truncate">
                    {activeSpecial.name}
                  </h3>
                </div>
              </div>

              <p className="text-[var(--foreground-muted)] text-sm sm:text-base lg:text-xl leading-relaxed">
                {activeSpecial.description}
              </p>
            </div>

            {/* Desktop: Vertical Tab List */}
            <div className="hidden lg:block flex-1">
              <h4 className="text-base font-semibold text-[var(--foreground-muted)] uppercase tracking-wider mb-5">
                모든 시설 보기
              </h4>
              <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2 scrollbar-thin">
                {specials.map((special, index) => {
                  const SpecialIcon = iconMap[special.icon];
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={special.id}
                      onClick={() => handleSelectSpecial(index)}
                      className={`w-full flex items-center gap-4 p-5 rounded-2xl text-left transition-all ${
                        isActive
                          ? "bg-[var(--primary)] text-white shadow-lg"
                          : "bg-[#1a2332] hover:bg-[#243040] border border-[#2a3a4a]"
                      }`}
                    >
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isActive
                            ? "bg-white/20"
                            : "bg-[#0d1520]"
                        }`}
                      >
                        {SpecialIcon && (
                          <SpecialIcon
                            className={`w-7 h-7 ${
                              isActive ? "text-white" : "text-[var(--primary)]"
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-medium ${
                              isActive ? "text-white/70" : "text-[var(--secondary)]"
                            }`}
                          >
                            {special.number}
                          </span>
                          <span
                            className={`text-lg font-semibold truncate ${
                              isActive ? "text-white" : "text-[var(--foreground)]"
                            }`}
                          >
                            {special.name}
                          </span>
                        </div>
                        <p
                          className={`text-base truncate ${
                            isActive ? "text-white/80" : "text-[var(--foreground-muted)]"
                          }`}
                        >
                          {special.nameEn}
                        </p>
                      </div>
                      <ChevronRight
                        className={`w-6 h-6 flex-shrink-0 ${
                          isActive ? "text-white" : "text-gray-400"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next Button */}
            <div className="flex items-center gap-4 mt-6 lg:mt-10 pt-6 lg:pt-8 border-t border-[#2a3a4a]">
              <button
                onClick={() =>
                  handleSelectSpecial(
                    activeIndex === specials.length - 1 ? 0 : activeIndex + 1
                  )
                }
                className="flex-1 flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 lg:py-5 bg-[var(--primary)] text-white border-2 border-[var(--primary)] rounded-xl font-bold text-base sm:text-lg hover:bg-[var(--primary-dark)] transition-all shadow-lg"
              >
                다음 시설
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
