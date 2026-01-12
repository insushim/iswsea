"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Clock,
  Users,
  Flame,
  AlertCircle,
  MapPin,
  Phone,
  Calendar,
  CheckCircle,
  CreditCard,
  Info,
  ExternalLink,
} from "lucide-react";
import { rooms, pensionInfo, priceInfo } from "@/data/pension";
import Link from "next/link";

export default function Guide() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="guide"
      className="bg-[#0F1419] text-white relative overflow-hidden"
      style={{ paddingTop: "60px", paddingBottom: "80px" }}
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
            GUIDE
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 font-display">
            이용안내
          </h2>
        </motion.div>

        {/* Price Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 sm:mb-12"
        >
          <div className="bg-[#1a2332] rounded-xl sm:rounded-2xl border border-[#2a3a4a] p-4 sm:p-6 mb-8 sm:mb-10">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#4A9F6D]/20 flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 sm:w-6 sm:h-6 text-[#4A9F6D]" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">요금 안내</h3>
                <ul className="space-y-1 text-gray-300 text-xs sm:text-sm">
                  <li>- 주중 : 일요일~목요일 / 금요일 : 금요일요금 / 주말 : 토요일, 법정공휴일 전날</li>
                  <li>- 성수기, 준성수기 기간에는 요금이 상이할 수 있습니다.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Room List & Price Guide */}
          <div className="bg-[#1a2332] rounded-xl sm:rounded-2xl border border-[#2a3a4a] overflow-hidden">
            <div className="p-3 sm:p-4 border-b border-[#2a3a4a]">
              <h3 className="text-base sm:text-lg font-bold text-white">객실 안내</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#0d1520] text-gray-400">
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left border-r border-[#2a3a4a] whitespace-nowrap">객실명</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-center border-r border-[#2a3a4a]">평수</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-center whitespace-nowrap">기준/최대</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room, idx) => (
                    <tr key={room.id} className={idx % 2 === 0 ? "bg-[#1a2332]" : "bg-[#151d28]"}>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 border-r border-[#2a3a4a]">
                        <Link href={`/room/${room.id}`} className="text-white font-medium hover:text-[#4A9F6D] transition-colors whitespace-nowrap">
                          {room.name}
                        </Link>
                      </td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-center text-gray-300 border-r border-[#2a3a4a]">{room.size}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-center text-gray-300">{room.capacity.standard}명/{room.capacity.max}명</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Price Guide */}
            <div className="p-4 bg-[#03C75A]/10 border-t border-[#2a3a4a] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-sm text-gray-300">실시간 요금 및 예약 가능 여부 확인</span>
              <a
                href={pensionInfo.naverBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#03C75A] text-white rounded-full font-bold text-sm hover:bg-[#02b351] transition-all"
              >
                <Calendar className="w-4 h-4" />
                네이버 예약에서 확인
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Additional Info Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mb-10 sm:mb-14"
        >
          {/* Extra Person */}
          <div className="bg-[#1a2332] rounded-xl sm:rounded-2xl border border-[#2a3a4a] p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#4A90A4]/20 flex items-center justify-center">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A90A4]" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">추가 인원 요금</h3>
            </div>
            <p className="text-gray-300 mb-3 text-xs sm:text-sm">객실 요금은 기준 인원 2명에 대한 요금이며 기준 인원 초과시 1인당, 1일당 추가요금이 발생합니다.</p>
            <div className="bg-[#0d1520] rounded-lg sm:rounded-xl p-3 sm:p-4">
              <p className="text-center">
                <span className="text-gray-400 text-sm">추가 인원 1인당</span>
                <span className="text-xl sm:text-2xl font-bold text-[#4A9F6D] ml-2 sm:ml-3">{priceInfo.extraPerson.toLocaleString()}원</span>
              </p>
              <p className="text-center text-gray-500 text-xs sm:text-sm mt-2">(유치원 미만 무료, 유치원 이상은 20,000원 추가됩니다.)</p>
            </div>
          </div>

          {/* BBQ */}
          <div className="bg-[#1a2332] rounded-xl sm:rounded-2xl border border-[#2a3a4a] p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#F5B041]/20 flex items-center justify-center">
                <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-[#F5B041]" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">바베큐 이용료</h3>
            </div>
            <p className="text-gray-300 mb-3 text-xs sm:text-sm">바베큐 이용시 숯+그릴 사용료 (1회 기준)</p>
            <div className="space-y-2">
              {priceInfo.bbqPrices.map((item) => (
                <div key={item.persons} className="flex justify-between items-center py-2 px-3 sm:px-4 bg-[#0d1520] rounded-lg">
                  <span className="text-gray-300 text-sm">{item.persons}</span>
                  <span className="text-white font-bold text-sm sm:text-base">{item.price.toLocaleString()}원</span>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-xs sm:text-sm mt-3">* 바베큐는 각 객실 앞 개별테라스에서 가능합니다.</p>
          </div>
        </motion.div>

        {/* Usage Guide */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-14"
        >
          {/* Left Column */}
          <div className="space-y-6 sm:space-y-7">
            {/* 입금 및 예약 확인 */}
            <div className="bg-[#1a2332] rounded-xl sm:rounded-2xl border border-[#2a3a4a] p-5 sm:p-7">
              <h3 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#4A9F6D] flex items-center justify-center text-white text-xs font-bold">01</span>
                입금 및 예약 확인
              </h3>
              <ul className="space-y-2 text-gray-300 text-xs sm:text-sm">
                <li>- 입금 시 예약자와 입금자명이 다를 경우 필히 확인 전화 주십시오.</li>
              </ul>
            </div>

            {/* 최대인원 초과 */}
            <div className="bg-[#1a2332] rounded-xl sm:rounded-2xl border border-[#2a3a4a] p-5 sm:p-7">
              <h3 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#4A9F6D] flex items-center justify-center text-white text-xs font-bold">02</span>
                최대인원 초과
              </h3>
              <ul className="space-y-2 text-gray-300 text-xs sm:text-sm">
                <li>- 최대인원 초과시 입실 및 환불이 불가합니다.</li>
              </ul>
            </div>

            {/* 입실 시간 */}
            <div className="bg-[#1a2332] rounded-xl sm:rounded-2xl border border-[#2a3a4a] p-5 sm:p-7">
              <h3 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#4A9F6D] flex items-center justify-center text-white text-xs font-bold">03</span>
                입실 시간
              </h3>
              <ul className="space-y-2 text-gray-300 text-xs sm:text-sm">
                <li>- 이용 당일 <span className="text-[#4A9F6D] font-medium">15:00 ~ 22:00</span></li>
              </ul>
            </div>

            {/* 퇴실 시간 */}
            <div className="bg-[#1a2332] rounded-xl sm:rounded-2xl border border-[#2a3a4a] p-5 sm:p-7">
              <h3 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#4A9F6D] flex items-center justify-center text-white text-xs font-bold">04</span>
                퇴실 시간
              </h3>
              <ul className="space-y-2 text-gray-300 text-xs sm:text-sm">
                <li>- 마지막 이용일 <span className="text-[#4A90A4] font-medium">오전 11시</span></li>
              </ul>
            </div>

            {/* 객실 정리 */}
            <div className="bg-[#1a2332] rounded-xl sm:rounded-2xl border border-[#2a3a4a] p-5 sm:p-7">
              <h3 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#4A9F6D] flex items-center justify-center text-white text-xs font-bold">05</span>
                객실 정리
              </h3>
              <ul className="space-y-2 text-gray-300 text-xs sm:text-sm">
                <li>- 퇴실 점검 후 객실 키를 반납해 주세요.</li>
                <li>- 쓰레기는 분리하여 지정 장소에 버려주세요.</li>
              </ul>
            </div>

            {/* 유의사항 */}
            <div className="bg-[#1a2332] rounded-xl sm:rounded-2xl border border-[#F5B041]/30 p-5 sm:p-7">
              <h3 className="text-sm sm:text-base font-bold text-[#F5B041] mb-3 sm:mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                유의사항
              </h3>
              <ul className="space-y-2.5 text-gray-300 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#F5B041]">•</span>
                  <span><span className="text-[#F5B041] font-medium">미성년자</span> 보호자 동반 필수</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F5B041]">•</span>
                  <span><span className="text-[#F5B041] font-medium">반려동물</span> 입실 금지</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F5B041]">•</span>
                  <span>객실 내 <span className="text-[#F5B041] font-medium">절대 금연</span></span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 sm:space-y-7">
            {/* 취사 및 바베큐 */}
            <div className="bg-[#1a2332] rounded-xl sm:rounded-2xl border border-[#2a3a4a] p-5 sm:p-7">
              <h3 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#F5B041] flex items-center justify-center text-white text-xs font-bold">06</span>
                취사 및 바베큐
              </h3>
              <ul className="space-y-2.5 text-gray-300 text-xs sm:text-sm">
                <li>- 오후 9시 이후 바베큐장 이용 금지</li>
                <li>- 객실 내 육류 구이 금지</li>
              </ul>
            </div>

            {/* 수영장 */}
            <div className="bg-[#1a2332] rounded-xl sm:rounded-2xl border border-[#2a3a4a] p-5 sm:p-7">
              <h3 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#4A90A4] flex items-center justify-center text-white text-xs font-bold">07</span>
                수영장
              </h3>
              <ul className="space-y-2.5 text-gray-300 text-xs sm:text-sm">
                <li>- <span className="text-[#4A90A4] font-medium">여름 성수기 기간</span>에만 운영</li>
                <li>- 수영장 내 음식물 반입 금지</li>
              </ul>
            </div>

            {/* 주변 시설 */}
            <div className="bg-[#1a2332] rounded-xl sm:rounded-2xl border border-[#2a3a4a] p-5 sm:p-7">
              <h3 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A9F6D]" />
                주변 시설안내
              </h3>
              <ul className="space-y-3 text-gray-300 text-xs sm:text-sm">
                <li className="flex justify-between"><span>꾸지나무골 해수욕장</span><span className="text-[#4A90A4]">차량 6분</span></li>
                <li className="flex justify-between"><span>만대항 당봉 전망대</span><span className="text-[#4A90A4]">차량 10분</span></li>
                <li className="flex justify-between"><span>용난굴</span><span className="text-[#4A90A4]">차량 11분</span></li>
                <li className="flex justify-between"><span>신두리 해수욕장</span><span className="text-[#4A90A4]">차량 30분</span></li>
                <li className="flex justify-between"><span>백화산 구름 다리</span><span className="text-[#4A90A4]">차량 35분</span></li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-[#1a2332] to-[#0d1520] rounded-xl sm:rounded-2xl border border-[#2a3a4a] p-4 sm:p-6 lg:p-8 text-center"
        >
          <p className="text-gray-400 mb-2 sm:mb-3 text-sm sm:text-base">문의 및 예약</p>
          <a href={`tel:${pensionInfo.phone}`} className="text-2xl sm:text-3xl font-bold text-white hover:text-[#4A9F6D] transition-colors">
            {pensionInfo.phone}
          </a>
          <p className="text-gray-500 mt-2 sm:mt-3 text-xs sm:text-sm">{pensionInfo.address}</p>
        </motion.div>
      </div>
    </section>
  );
}
