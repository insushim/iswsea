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
    <section id="tour" className="bg-[var(--background-alt)]" ref={ref} style={{ paddingTop: '30px', paddingBottom: '80px' }}>
      <div className="w-full max-w-none px-6 sm:px-8 lg:px-16 xl:px-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[var(--secondary)] dark:text-[var(--secondary-light)] text-base tracking-[0.3em] uppercase mb-4">
            TOUR GUIDE
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--foreground)] mb-6 font-display">
            주변 여행지
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] mx-auto mb-8 rounded-full" />
          <p className="text-[var(--foreground-muted)] text-xl max-w-3xl mx-auto">
            태안, 가로림만, 안면도의 아름다운 여행지를 소개합니다
          </p>
        </motion.div>

        {/* Tour Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-[var(--card)] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Image Carousel */}
              <div className="relative aspect-[4/3] overflow-hidden">
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
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-800" />
                </button>
                <button
                  onClick={() => nextImage(tour.id, tour.images.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                >
                  <ChevronRight className="w-4 h-4 text-gray-800" />
                </button>

                {/* Dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {tour.images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        idx === imageIndices[tour.id]
                          ? "bg-white w-4"
                          : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>

                {/* Tour Number Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 bg-[var(--primary)] text-white rounded-full text-xs font-bold">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                  {tour.name}
                </h3>

                <div className="flex items-center gap-4 mb-4 text-base text-[var(--foreground-muted)]">
                  <span className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    {tour.distance}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    펜션에서
                  </span>
                </div>

                <p className="text-[var(--foreground-muted)] text-base leading-relaxed line-clamp-3">
                  {tour.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tidal Time Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="http://www.always-design.com/tour/taean/taean_badatime.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold text-xl rounded-full transition-all hover:scale-105 hover:bg-white/20"
          >
            <Clock className="w-6 h-6" />
            <span>갯벌체험 시간표 보기</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
