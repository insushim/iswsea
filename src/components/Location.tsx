"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Car, Bus, Navigation, ExternalLink, Clock } from "lucide-react";
import { pensionInfo } from "@/data/pension";

const busInfo = [
  { route: "남부터미널 → 안면도", frequency: "11회 운행", duration: "3시간", time: "06:40 ~ 16:00" },
  { route: "남부터미널 → 태안", frequency: "22회 운행", duration: "2시간 20분", time: "06:40 ~ 20:00" },
  { route: "센트럴시티 → 안면도", frequency: "4회 운행", duration: "2시간 10분", time: "07:20 ~ 17:40" },
  { route: "동서울 → 태안", frequency: "4회 운행", duration: "2시간 50분", time: "07:20 ~ 18:10" },
];

// 네이버 지도 Place ID
const NAVER_PLACE_ID = "12146230";

export default function Location() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="location" className="bg-[var(--background)] pt-8 pb-10 lg:pt-10 lg:pb-10" ref={ref}>
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-16 xl:px-24">
        {/* Section Header - 더 컴팩트하게 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 lg:mb-8"
        >
          <p className="text-[#4A90A4] text-sm tracking-[0.3em] uppercase mb-2 font-medium">
            LOCATION
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--foreground)] font-display">
            오시는 길
          </h2>
          <p className="text-[var(--foreground-muted)] text-sm lg:text-base mt-3">
            <span className="sm:hidden">태안 안면도의 아름다운<br />자연 속으로 오세요</span>
            <span className="hidden sm:inline">태안 안면도의 아름다운 자연 속으로 오세요</span>
          </p>
        </motion.div>

        {/* Main Content Grid - Map Left, Info Right - Same Height */}
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 items-stretch">
          {/* Map Section - Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="rounded-xl lg:rounded-2xl overflow-hidden shadow-xl h-[300px] sm:h-[350px] lg:h-[680px] relative">
              {/* 모바일: 네이버 지도 링크 버튼 */}
              <div className="lg:hidden w-full h-full bg-[#1a2332] flex flex-col items-center justify-center p-6">
                <div className="w-20 h-20 rounded-full bg-[#0d1520] flex items-center justify-center mb-4">
                  <MapPin className="w-10 h-10 text-[#4A9F6D]" />
                </div>
                <p className="text-white text-lg font-bold mb-2 text-center">숲속의바다 펜션</p>
                <p className="text-gray-400 text-sm mb-6 text-center">{pensionInfo.address}</p>
                <a
                  href={`https://map.naver.com/p/entry/place/${NAVER_PLACE_ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-[#03C75A] text-white rounded-full font-bold hover:bg-[#02b351] transition-all"
                >
                  <MapPin className="w-5 h-5" />
                  <span>네이버 지도에서 보기</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              {/* PC: iframe */}
              <iframe
                src={`https://map.naver.com/p/entry/place/${NAVER_PLACE_ID}?c=15.00,0,0,0,dh`}
                className="hidden lg:block w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="숲속의바다 펜션 위치"
              />
            </div>
          </motion.div>

          {/* Info Section - Right - Match Map Height */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="h-auto lg:h-[680px] flex flex-col gap-3 lg:gap-5"
          >
            {/* Contact Card - 더 크게 */}
            <div className="p-3 lg:p-6 bg-[#1a2332] rounded-xl lg:rounded-2xl border border-[#2a3a4a] shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="w-9 h-9 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-[#0d1520] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 lg:w-6 lg:h-6 text-[#4A9F6D]" />
                  </div>
                  <div>
                    <h3 className="text-xs lg:text-sm font-bold text-white">주소</h3>
                    <p className="text-gray-300 text-xs lg:text-sm">{pensionInfo.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="w-9 h-9 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-[#0d1520] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 lg:w-6 lg:h-6 text-[#4A90A4]" />
                  </div>
                  <div>
                    <h3 className="text-xs lg:text-sm font-bold text-white">예약문의</h3>
                    <a
                      href={`tel:${pensionInfo.phone}`}
                      className="text-base lg:text-xl font-bold text-[#4A9F6D] hover:text-[#6BBF8D] transition-colors"
                    >
                      {pensionInfo.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="w-9 h-9 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-[#0d1520] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 lg:w-6 lg:h-6 text-[#4A90A4]" />
                  </div>
                  <div>
                    <h3 className="text-xs lg:text-sm font-bold text-white">체크인/아웃</h3>
                    <p className="text-gray-300 text-xs lg:text-sm">
                      입실 <span className="font-bold text-white">{pensionInfo.checkIn}</span> /
                      퇴실 <span className="font-bold text-white">{pensionInfo.checkOut}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Image - Grows to fill space - hidden on mobile */}
            <div className="hidden lg:block rounded-xl overflow-hidden shadow-lg flex-1 min-h-[80px] relative group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(/images/gallery/main/1.jpg)`,
                }}
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <p className="text-white text-base font-bold tracking-wider">FOREST & SEA</p>
              </div>
            </div>

            {/* Transportation Cards - 더 크게 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-5">
              {/* By Car */}
              <div className="p-3 lg:p-5 bg-[#1a2332] rounded-xl lg:rounded-2xl border border-[#2a3a4a]">
                <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
                  <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-[#0d1520] flex items-center justify-center">
                    <Car className="w-3.5 h-3.5 lg:w-5 lg:h-5 text-[#4A90A4]" />
                  </div>
                  <h3 className="font-bold text-white text-xs lg:text-base">네비게이션</h3>
                </div>
                <p className="text-gray-400 text-xs lg:text-sm leading-relaxed">
                  <span className="font-medium text-white">도로명:</span> 충남 태안군 이원면 원이로 2170-5
                </p>
              </div>

              {/* By Bus */}
              <div className="p-3 lg:p-5 bg-[#1a2332] rounded-xl lg:rounded-2xl border border-[#2a3a4a]">
                <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
                  <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-[#0d1520] flex items-center justify-center">
                    <Bus className="w-3.5 h-3.5 lg:w-5 lg:h-5 text-[#4A90A4]" />
                  </div>
                  <h3 className="font-bold text-white text-xs lg:text-base">대중교통</h3>
                </div>
                <p className="text-gray-400 text-xs lg:text-sm leading-relaxed">
                  태안터미널 → 만대행 버스 → 모세골 정류장 하차
                </p>
              </div>
            </div>

            {/* Bus Schedule - 더 크게 */}
            <div className="hidden sm:block p-3 lg:p-5 bg-[#1a2332] rounded-xl lg:rounded-2xl border border-[#2a3a4a]">
              <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-4">
                <Bus className="w-4 h-4 lg:w-5 lg:h-5 text-[#4A9F6D]" />
                <h3 className="font-bold text-white text-xs lg:text-base">서울 → 태안/안면도 버스</h3>
              </div>
              <div className="space-y-1.5 lg:space-y-2">
                {busInfo.map((bus, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-1.5 lg:py-2.5 border-b border-[#2a3a4a] last:border-0"
                  >
                    <span className="font-medium text-white text-[11px] lg:text-sm">
                      {bus.route}
                    </span>
                    <div className="flex items-center gap-1.5 lg:gap-2">
                      <span className="px-1.5 py-0.5 lg:px-2.5 lg:py-1 bg-[#4A9F6D]/20 text-[#4A9F6D] rounded text-[10px] lg:text-xs font-medium">
                        {bus.frequency}
                      </span>
                      <span className="px-1.5 py-0.5 lg:px-2.5 lg:py-1 bg-[#4A90A4]/20 text-[#4A90A4] rounded text-[10px] lg:text-xs font-medium">
                        {bus.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links - 더 크게 */}
            <div className="grid grid-cols-2 gap-2 lg:gap-5">
              <a
                href="http://www.always-design.com/tour/taean/taean_citybus_2.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 lg:gap-2 px-3 py-2.5 lg:py-4 bg-[#4A9F6D] text-white rounded-lg lg:rounded-xl font-semibold hover:bg-[#3D8A5A] transition-all hover:scale-105 shadow-lg text-xs lg:text-base"
              >
                <Navigation className="w-3.5 h-3.5 lg:w-5 lg:h-5" />
                <span>오실 때 버스</span>
                <ExternalLink className="w-3 h-3 lg:w-4 lg:h-4" />
              </a>
              <a
                href="http://www.always-design.com/tour/taean/taean_intercity.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 lg:gap-2 px-3 py-2.5 lg:py-4 bg-[#1a2332] border border-[#2a3a4a] text-white rounded-lg lg:rounded-xl font-semibold hover:border-[#4A9F6D] hover:text-[#4A9F6D] transition-all text-xs lg:text-base"
              >
                <Navigation className="w-3.5 h-3.5 lg:w-5 lg:h-5" />
                <span>가실 때 버스</span>
                <ExternalLink className="w-3 h-3 lg:w-4 lg:h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
