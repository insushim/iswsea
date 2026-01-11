"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  ExternalLink,
  Phone,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import { pensionInfo, priceInfo } from "@/data/pension";

export default function Reservation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="reservation"
      className="bg-[#0F1419] text-white relative overflow-hidden"
      style={{ paddingTop: '30px', paddingBottom: '60px' }}
      ref={ref}
    >

      <div className="w-full max-w-none px-4 sm:px-6 lg:px-16 xl:px-24 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <p className="text-white/70 text-sm sm:text-base tracking-[0.3em] uppercase mb-3 sm:mb-4 font-medium">
            RESERVATION
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 font-display">
            예약 안내
          </h2>
        </motion.div>

        {/* 1줄 레이아웃 - 전체 너비 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4"
        >
          {/* 네이버 예약 */}
          <a
            href={pensionInfo.naverBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center p-4 sm:p-6 bg-[#1a2332] rounded-xl sm:rounded-2xl border border-[#2a3a4a] hover:border-[#03C75A] transition-all hover:scale-[1.02]"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#03C75A] flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white mb-0.5 sm:mb-1">네이버 예약</h3>
            <p className="text-gray-500 text-xs">간편 예약</p>
          </a>

          {/* 전화 예약 */}
          <a
            href={`tel:${pensionInfo.phone}`}
            className="group flex flex-col items-center justify-center p-4 sm:p-6 bg-[#1a2332] rounded-xl sm:rounded-2xl border border-[#2a3a4a] hover:border-[#4A90A4] transition-all hover:scale-[1.02]"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#4A90A4] flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white mb-0.5 sm:mb-1">전화 예약</h3>
            <p className="text-[#4A90A4] text-xs sm:text-sm font-medium">{pensionInfo.phone}</p>
          </a>

          {/* 입/퇴실 시간 */}
          <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-[#1a2332] rounded-xl sm:rounded-2xl border border-[#2a3a4a]">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#0d1520] flex items-center justify-center mb-2 sm:mb-3">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#4A90A4]" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white mb-1 sm:mb-2">입/퇴실</h3>
            <div className="flex gap-2 sm:gap-4 text-xs sm:text-sm">
              <span className="text-gray-400">IN <span className="text-white font-bold">{pensionInfo.checkIn}</span></span>
              <span className="text-gray-400">OUT <span className="text-white font-bold">{pensionInfo.checkOut}</span></span>
            </div>
          </div>

          {/* 추가 인원 */}
          <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-[#1a2332] rounded-xl sm:rounded-2xl border border-[#2a3a4a]">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#0d1520] flex items-center justify-center mb-2 sm:mb-3">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#4A9F6D]" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white mb-0.5 sm:mb-1">추가 인원</h3>
            <p className="text-[#4A9F6D] text-base sm:text-lg font-bold">{priceInfo.extraPerson.toLocaleString()}원</p>
            <p className="text-gray-500 text-xs">{priceInfo.freeAge} 무료</p>
          </div>

          {/* 요금 기준 */}
          <div className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center p-4 sm:p-6 bg-[#1a2332] rounded-xl sm:rounded-2xl border border-[#2a3a4a]">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#0d1520] flex items-center justify-center mb-2 sm:mb-3">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-[#F5B041]" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white mb-1 sm:mb-2">요금 기준</h3>
            <div className="text-xs space-y-0.5 sm:space-y-1 text-center">
              <p><span className="text-[#4A9F6D]">●</span> <span className="text-gray-400">주중</span> <span className="text-white">일~목</span></p>
              <p><span className="text-[#F5B041]">●</span> <span className="text-gray-400">금요일</span></p>
              <p><span className="text-[#E74C3C]">●</span> <span className="text-gray-400">주말</span> <span className="text-white">토,공휴일전</span></p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
