"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Waves,
  Flame,
  Sparkles,
  Users,
  ExternalLink,
  Eye,
  ArrowRight,
  Ruler,
  Clock,
} from "lucide-react";
import { rooms, pensionInfo } from "@/data/pension";
import Link from "next/link";

const featureIcons: Record<string, React.ElementType> = {
  "오션뷰": Waves,
  "개별 테라스": ExternalLink,
  "바베큐": Flame,
  "스파": Sparkles,
};

export default function Rooms() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="rooms" className="bg-[var(--background-alt)] pt-8 pb-10 lg:pt-24 lg:pb-24 min-h-fit" ref={ref}>
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-16 xl:px-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <p className="text-[var(--secondary)] dark:text-[var(--secondary-light)] text-sm sm:text-base tracking-[0.3em] uppercase mb-3 sm:mb-4">
            ROOMS
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)] mb-4 sm:mb-6 font-display">
            객실 안내
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] mx-auto mb-4 sm:mb-8 rounded-full" />
          <p className="text-[var(--foreground-muted)] text-base sm:text-lg lg:text-xl mx-auto px-4 text-center">
            <span className="sm:hidden">모든 객실에서 아름다운 오션뷰와<br />개별 바베큐 테라스를 즐기세요</span>
            <span className="hidden sm:inline">숲속의바다 펜션의 모든 객실은 아름다운 오션뷰를 자랑합니다.<br />객실마다 개별적인 바베큐 테라스를 가지고 있습니다.</span>
          </p>
        </motion.div>

        {/* Rooms Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-hidden">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl bg-[var(--card)] shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${room.mainImage})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Hover Overlay with Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Link
                      href={`/room/${room.id}`}
                      target="_blank"
                      className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/40 rounded-full font-bold shadow-xl hover:scale-105 transition-all duration-200"
                    >
                      <Eye className="w-5 h-5" />
                      <span>자세히 보기</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Image count badge */}
                  <div className="absolute top-3 right-3 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                    사진 {room.images.length}장
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-[var(--foreground)]">
                      {room.name}
                    </h3>
                    <span className="text-sm text-[var(--foreground-muted)]">
                      {room.nameEn}
                    </span>
                  </div>

                  {/* Size & Capacity */}
                  <div className="flex items-center gap-4 text-sm text-[var(--foreground-muted)] mb-3">
                    <div className="flex items-center gap-1">
                      <Ruler className="w-4 h-4" />
                      <span>{room.size}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>기준 {room.capacity.standard}인 / 최대 {room.capacity.max}인</span>
                    </div>
                  </div>

                  {/* 요금표 */}
                  {room.prices && (
                    <div className="mb-3 rounded-lg overflow-hidden border border-[var(--border)]">
                      {/* 요금 헤더 */}
                      <div className="grid grid-cols-4 bg-[var(--background)] text-center text-[9px]">
                        <div className="py-1.5 px-0.5 border-r border-[var(--border)] text-[var(--foreground-muted)]">
                          <div>주중</div>
                          <div className="text-[8px] opacity-70">(월~목)</div>
                        </div>
                        <div className="py-1.5 px-0.5 border-r border-[var(--border)] text-[var(--foreground-muted)]">금요일</div>
                        <div className="py-1.5 px-0.5 border-r border-[var(--border)] text-[var(--foreground-muted)]">
                          <div>주말</div>
                          <div className="text-[8px] opacity-70">(토,공휴일전)</div>
                        </div>
                        <div className="py-1.5 px-0.5 text-[var(--foreground-muted)]">일요일</div>
                      </div>
                      {/* 요금 데이터 */}
                      <div className="grid grid-cols-4 bg-[var(--card)] text-center text-[10px]">
                        <div className="py-2 px-0.5 border-r border-[var(--border)] text-[var(--primary)] font-bold">
                          {(room.prices.weekday / 10000).toFixed(0)}만
                        </div>
                        <div className="py-2 px-0.5 border-r border-[var(--border)] text-[var(--secondary)] font-bold">
                          {(room.prices.friday / 10000).toFixed(0)}만
                        </div>
                        <div className="py-2 px-0.5 border-r border-[var(--border)] text-[#F5B041] font-bold">
                          {(room.prices.weekend / 10000).toFixed(0)}만
                        </div>
                        <div className="py-2 px-0.5 text-[var(--primary)] font-bold">
                          {(room.prices.sunday / 10000).toFixed(0)}만
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {room.features.slice(0, 3).map((feature) => {
                      const Icon = featureIcons[feature];
                      return (
                        <span
                          key={feature}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[var(--background-alt)] dark:bg-[var(--background)] rounded-full text-xs text-[var(--foreground-muted)]"
                        >
                          {Icon && <Icon className="w-3.5 h-3.5" />}
                          {feature}
                        </span>
                      );
                    })}
                  </div>

                  {/* View Detail Link */}
                  <Link
                    href={`/room/${room.id}`}
                    target="_blank"
                    className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-[var(--primary)]/10 hover:bg-[var(--primary)] text-[var(--primary)] hover:text-white rounded-lg font-medium transition-all duration-200 border border-[var(--primary)]/30 hover:border-[var(--primary)]"
                  >
                    <Eye className="w-4 h-4" />
                    <span>객실 상세보기</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 mb-4 w-full flex flex-col sm:flex-row justify-center items-center gap-4 px-6"
        >
          <a
            href={pensionInfo.naverBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#03C75A]/80 hover:bg-[#03C75A] backdrop-blur-md border border-[#03C75A]/50 text-white font-bold text-lg rounded-full transition-all hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <span>네이버 예약하기</span>
            <ExternalLink className="w-5 h-5" />
          </a>
          <a
            href={pensionInfo.yapenBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#FF6B35]/80 hover:bg-[#FF6B35] backdrop-blur-md border border-[#FF6B35]/50 text-white font-bold text-lg rounded-full transition-all hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <Clock className="w-5 h-5" />
            <span>실시간 예약하기</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
