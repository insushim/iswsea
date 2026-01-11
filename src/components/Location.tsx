"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Car, Bus, Navigation, ExternalLink, Clock } from "lucide-react";
import { pensionInfo } from "@/data/pension";

const busInfo = [
  { route: "남부터미널 → 안면도", frequency: "11회 운행", duration: "3시간", time: "06:40 ~ 16:00" },
  { route: "남부터미널 → 태안", frequency: "22회 운행", duration: "2시간 20분", time: "06:40 ~ 20:00" },
  { route: "센트럴시티 → 안면도", frequency: "4회 운행", duration: "2시간 10분", time: "07:20 ~ 17:40" },
  { route: "동서울 → 태안", frequency: "4회 운행", duration: "2시간 50분", time: "07:20 ~ 18:10" },
];

// 숲속의바다 펜션 좌표 (카카오맵 기준)
const PENSION_LAT = 36.8089;
const PENSION_LNG = 126.3177;

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Location() {
  const ref = useRef(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // 카카오맵 스크립트 로드
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=c80b770d9c2b93ea23464f15ac98ba2c&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        setMapLoaded(true);
      });
    };

    return () => {
      // 클린업 시 스크립트 제거하지 않음 (재로드 방지)
    };
  }, []);

  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    const { kakao } = window;

    // 지도 생성
    const mapOption = {
      center: new kakao.maps.LatLng(PENSION_LAT, PENSION_LNG),
      level: 5, // 줌 레벨
    };

    const map = new kakao.maps.Map(mapRef.current, mapOption);

    // 마커 생성
    const markerPosition = new kakao.maps.LatLng(PENSION_LAT, PENSION_LNG);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);

    // 인포윈도우 (펜션 이름 표시)
    const iwContent = `
      <div style="padding:8px 12px;font-size:13px;font-weight:600;white-space:nowrap;background:#fff;border-radius:4px;box-shadow:0 2px 6px rgba(0,0,0,0.15);">
        숲속의바다펜션
      </div>
    `;
    const infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: false,
    });
    infowindow.open(map, marker);

    // 지도 컨트롤 추가
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

  }, [mapLoaded]);

  return (
    <section id="location" className="bg-[var(--background)]" ref={ref} style={{ paddingTop: '30px', paddingBottom: '60px' }}>
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-16 xl:px-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-20"
        >
          <p className="text-[#4A90A4] text-sm sm:text-base tracking-[0.3em] uppercase mb-3 sm:mb-4 font-medium">
            LOCATION
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)] mb-4 sm:mb-6 font-display">
            오시는 길
          </h2>
          <p className="text-[var(--foreground-muted)] text-base sm:text-lg lg:text-xl px-4">
            태안 안면도의 아름다운 자연 속으로 오세요
          </p>
        </motion.div>

        {/* Main Content Grid - Map Left, Info Right - Same Height */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Map Section - Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl h-[300px] sm:h-[400px] lg:h-[700px] relative">
              {/* 카카오맵 */}
              <div ref={mapRef} className="w-full h-full" />

              {/* 로딩 상태 */}
              {!mapLoaded && (
                <div className="absolute inset-0 bg-[#1a2332] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#4A9F6D] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">지도를 불러오는 중...</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Info Section - Right - Match Map Height */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-auto lg:h-[700px] flex flex-col gap-4 sm:gap-5"
          >
            {/* Contact Card */}
            <div className="p-4 sm:p-6 lg:p-8 bg-[#1a2332] rounded-xl sm:rounded-2xl border border-[#2a3a4a] shadow-xl">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#0d1520] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#4A9F6D]" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold mb-1 text-white">주소</h3>
                    <p className="text-gray-300 text-sm sm:text-base">{pensionInfo.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#0d1520] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#4A90A4]" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold mb-1 text-white">예약문의</h3>
                    <a
                      href={`tel:${pensionInfo.phone}`}
                      className="text-xl sm:text-2xl font-bold text-[#4A9F6D] hover:text-[#6BBF8D] transition-colors"
                    >
                      {pensionInfo.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#0d1520] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#4A90A4]" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold mb-1 text-white">체크인/아웃</h3>
                    <p className="text-gray-300 text-sm sm:text-base">
                      입실 <span className="font-bold text-white">{pensionInfo.checkIn}</span> /
                      퇴실 <span className="font-bold text-white">{pensionInfo.checkOut}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Image - Grows to fill space - hidden on mobile */}
            <div className="hidden lg:block rounded-2xl overflow-hidden shadow-xl flex-1 min-h-[100px] relative group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(/images/gallery/main/1.jpg)`,
                }}
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <p className="text-white text-xl font-bold tracking-wider">FOREST & SEA</p>
              </div>
            </div>

            {/* Transportation Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* By Car */}
              <div className="p-4 sm:p-5 bg-[#1a2332] rounded-xl border border-[#2a3a4a]">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#0d1520] flex items-center justify-center">
                    <Car className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A90A4]" />
                  </div>
                  <h3 className="font-bold text-white text-sm sm:text-base">네비게이션 이용시</h3>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  <span className="font-medium text-white">도로명:</span> 충남 태안군 이원면 원이로 2170-5
                </p>
              </div>

              {/* By Bus */}
              <div className="p-4 sm:p-5 bg-[#1a2332] rounded-xl border border-[#2a3a4a]">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#0d1520] flex items-center justify-center">
                    <Bus className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A90A4]" />
                  </div>
                  <h3 className="font-bold text-white text-sm sm:text-base">대중교통 이용시</h3>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  태안시외버스터미널 → 만대행 시내버스 → 모세골 정류장 또는 숲속의바다펜션 앞 하차
                </p>
              </div>
            </div>

            {/* Bus Schedule - hidden on mobile for cleaner view */}
            <div className="hidden sm:block p-4 sm:p-5 bg-[#1a2332] rounded-xl border border-[#2a3a4a]">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#0d1520] flex items-center justify-center">
                  <Bus className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A9F6D]" />
                </div>
                <h3 className="font-bold text-white text-sm sm:text-base">서울지역 버스 안내</h3>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {busInfo.map((bus, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-[#2a3a4a] last:border-0 gap-1 sm:gap-0"
                  >
                    <span className="font-medium text-white text-xs sm:text-sm">
                      {bus.route}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#4A9F6D]/20 text-[#4A9F6D] rounded text-xs font-medium">
                        {bus.frequency}
                      </span>
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#4A90A4]/20 text-[#4A90A4] rounded text-xs font-medium">
                        {bus.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <a
                href="http://www.always-design.com/tour/taean/taean_citybus_2.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-3 sm:py-4 bg-[#4A9F6D] text-white rounded-xl font-semibold hover:bg-[#3D8A5A] transition-all hover:scale-105 shadow-lg text-xs sm:text-sm"
              >
                <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>오실 때 버스</span>
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
              <a
                href="http://www.always-design.com/tour/taean/taean_intercity.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-3 sm:py-4 bg-[#1a2332] border border-[#2a3a4a] text-white rounded-xl font-semibold hover:border-[#4A9F6D] hover:text-[#4A9F6D] transition-all text-xs sm:text-sm"
              >
                <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>가실 때 버스</span>
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
