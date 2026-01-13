"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { tours } from "@/data/pension";

export default function Tour() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [imageIndices, setImageIndices] = useState<Record<string, number>>(
    Object.fromEntries(tours.map((t) => [t.id, 0]))
  );

  const nextImage = (tourId: string, maxLength: number) => {
    setImageIndices((prev) => ({
      ...prev,
      [tourId]: prev[tourId] === maxLength - 1 ? 0 : prev[tourId] + 1,
    }));
  };

  const prevImage = (tourId: string, maxLength: number) => {
    setImageIndices((prev) => ({
      ...prev,
      [tourId]: prev[tourId] === 0 ? maxLength - 1 : prev[tourId] - 1,
    }));
  };

  return (
    <section id="tour" className="bg-[var(--background-alt)] pt-8 pb-10 lg:pt-8 lg:pb-6" ref={ref}>
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-16 xl:px-24">
        {/* Section Header - 더 컴팩트하게 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 lg:mb-4"
        >
          <p className="text-[var(--secondary)] dark:text-[var(--secondary-light)] text-sm tracking-[0.3em] uppercase mb-2">
            TOUR GUIDE
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--foreground)] font-display">
            주변 여행지
          </h2>
          <p className="text-[var(--foreground-muted)] text-sm lg:text-base mt-3">
            <span className="sm:hidden">태안, 안면도의 아름다운<br />여행지를 소개합니다</span>
            <span className="hidden sm:inline">태안, 가로림만, 안면도의 아름다운 여행지를 소개합니다</span>
          </p>
        </motion.div>

        {/* Tour Grid - PC에서 더 컴팩트한 카드 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-3">
          {tours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group bg-[var(--card)] rounded-xl lg:rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Image Carousel - PC에서 더 작은 비율 */}
              <div className="relative aspect-[16/10] lg:aspect-[16/8] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${tour.images[imageIndices[tour.id]]})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Navigation */}
                <button
                  onClick={() => prevImage(tour.id, tour.images.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-gray-800" />
                </button>
                <button
                  onClick={() => nextImage(tour.id, tour.images.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-gray-800" />
                </button>

                {/* Dots */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {tour.images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`w-1 h-1 rounded-full transition-all ${
                        idx === imageIndices[tour.id]
                          ? "bg-white w-3"
                          : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>

                {/* Tour Number Badge */}
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-[var(--primary)] text-white rounded-full text-[10px] font-bold">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Content - PC에서 더 컴팩트하게 */}
              <div className="p-3 lg:p-2">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="text-base lg:text-xs font-bold text-[var(--foreground)]">
                    {tour.name}
                  </h3>
                  <span className="hidden lg:flex items-center gap-1 text-[10px] text-[var(--foreground-muted)]">
                    <Clock className="w-2.5 h-2.5" />
                    {tour.distance}
                  </span>
                </div>

                <div className="flex items-center gap-3 lg:hidden mb-2 text-xs text-[var(--foreground-muted)]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {tour.distance}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    펜션에서
                  </span>
                </div>

                <p className="text-[var(--foreground-muted)] text-xs lg:text-[10px] leading-relaxed line-clamp-2 lg:line-clamp-1">
                  {tour.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tidal Time Link */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-6 lg:mt-5"
        >
          <a
            href="http://www.always-design.com/tour/taean/taean_badatime.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 lg:px-12 lg:py-4 bg-white/10 backdrop-blur-xl border border-white/30 text-white font-bold text-sm lg:text-base rounded-full transition-all hover:scale-105 hover:bg-white/20 shadow-xl hover:shadow-2xl"
          >
            <Clock className="w-4 h-4 lg:w-5 lg:h-5" />
            <span>갯벌체험 시간표 보기</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
