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
  Info,
} from "lucide-react";
import { rooms, pensionInfo, priceInfo } from "@/data/pension";
import Link from "next/link";

export default function Guide() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="guide"
      className="bg-[#0F1419] text-white relative overflow-hidden pt-8 pb-10 lg:pt-16 lg:pb-16"
      ref={ref}
    >
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-16 xl:px-24 relative z-10">
        {/* Section Header - 더 컴팩트하게 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 lg:mb-8"
        >
          <p className="text-white/70 text-sm tracking-[0.3em] uppercase mb-2 font-medium">
            GUIDE
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display">
            이용안내
          </h2>
        </motion.div>

        {/* ===== 모바일 레이아웃 (기존 유지) ===== */}
        <div className="lg:hidden">
          {/* Price Info */}
          <div className="bg-[#1a2332] rounded-xl border border-[#2a3a4a] p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#4A9F6D]/20 flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-[#4A9F6D]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">요금 안내</h3>
                <ul className="space-y-1 text-gray-300 text-xs">
                  <li>- 주중 : 일~목 / 금요일 : 금요일요금 / 주말 : 토, 공휴일 전날</li>
                  <li>- 성수기, 준성수기 기간에는 요금이 상이할 수 있습니다.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Room List */}
          <div className="bg-[#1a2332] rounded-xl border border-[#2a3a4a] overflow-hidden mb-6">
            <div className="p-3 border-b border-[#2a3a4a]">
              <h3 className="text-base font-bold text-white">객실 안내</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#0d1520] text-gray-400">
                    <th className="py-2 px-2 text-left border-r border-[#2a3a4a]">객실명</th>
                    <th className="py-2 px-2 text-center border-r border-[#2a3a4a]">평수</th>
                    <th className="py-2 px-2 text-center">기준/최대</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room, idx) => (
                    <tr key={room.id} className={idx % 2 === 0 ? "bg-[#1a2332]" : "bg-[#151d28]"}>
                      <td className="py-2 px-2 border-r border-[#2a3a4a]">
                        <Link href={`/room/${room.id}`} className="text-white font-medium hover:text-[#4A9F6D] transition-colors">
                          {room.name}
                        </Link>
                      </td>
                      <td className="py-2 px-2 text-center text-gray-300 border-r border-[#2a3a4a]">{room.size}</td>
                      <td className="py-2 px-2 text-center text-gray-300">{room.capacity.standard}명/{room.capacity.max}명</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-[#03C75A]/10 border-t border-[#2a3a4a] flex flex-col items-center gap-2">
              <span className="text-xs text-gray-300">실시간 요금 및 예약</span>
              <div className="flex items-center gap-2">
                <a href={pensionInfo.naverBookingUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-2 bg-[#03C75A] text-white rounded-full font-bold text-xs">
                  <Calendar className="w-3.5 h-3.5" />네이버 예약
                </a>
                <a href={pensionInfo.yapenBookingUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-2 bg-[#FF6B35] text-white rounded-full font-bold text-xs">
                  <Clock className="w-3.5 h-3.5" />실시간 예약
                </a>
              </div>
            </div>
          </div>

          {/* Extra Person & BBQ - 모바일 */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-[#1a2332] rounded-xl border border-[#2a3a4a] p-3">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-[#4A90A4]" />
                <h3 className="text-sm font-bold text-white">추가 인원</h3>
              </div>
              <p className="text-lg font-bold text-[#4A9F6D]">{priceInfo.extraPerson.toLocaleString()}원</p>
              <p className="text-[10px] text-gray-500 mt-1">유치원 미만 무료</p>
            </div>
            <div className="bg-[#1a2332] rounded-xl border border-[#2a3a4a] p-3">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-4 h-4 text-[#F5B041]" />
                <h3 className="text-sm font-bold text-white">바베큐</h3>
              </div>
              <p className="text-xs text-gray-300">
                {priceInfo.bbqPrices.map((item) => (
                  <span key={item.persons} className="block">{item.persons}: {item.price.toLocaleString()}원</span>
                ))}
              </p>
            </div>
          </div>

          {/* Usage Guide - 모바일 (간략화) */}
          <div className="bg-[#1a2332] rounded-xl border border-[#2a3a4a] p-4 mb-6">
            <h3 className="text-base font-bold text-white mb-3">이용 안내</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#0d1520] rounded-lg p-2">
                <span className="text-gray-400">입실</span>
                <span className="text-white font-medium ml-2">15:00~22:00</span>
              </div>
              <div className="bg-[#0d1520] rounded-lg p-2">
                <span className="text-gray-400">퇴실</span>
                <span className="text-white font-medium ml-2">오전 11시</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-[#2a3a4a]">
              <div className="flex items-center gap-2 text-[#F5B041]">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-bold">유의사항</span>
              </div>
              <ul className="mt-2 text-xs text-gray-300 space-y-1">
                <li>• 미성년자 보호자 동반 필수</li>
                <li>• 반려동물 입실 금지</li>
                <li>• 객실 내 절대 금연</li>
              </ul>
            </div>
          </div>

          {/* Contact - 모바일 */}
          <div className="bg-gradient-to-r from-[#1a2332] to-[#0d1520] rounded-xl border border-[#2a3a4a] p-4 text-center">
            <p className="text-gray-400 text-sm mb-1">문의 및 예약</p>
            <a href={`tel:${pensionInfo.phone}`} className="text-2xl font-bold text-white">{pensionInfo.phone}</a>
          </div>
        </div>

        {/* ===== PC 레이아웃 - 1페이지에 꽉 차게 ===== */}
        <div className="hidden lg:block">
          {/* 첫 번째 줄: 요금안내 + 객실 테이블 + 예약버튼 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-12 gap-5 mb-5"
          >
            {/* 요금 안내 */}
            <div className="col-span-3 bg-[#1a2332] rounded-2xl border border-[#2a3a4a] p-6 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#4A9F6D]/20 flex items-center justify-center">
                  <Info className="w-5 h-5 text-[#4A9F6D]" />
                </div>
                <h3 className="text-base font-bold text-white">요금 안내</h3>
              </div>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4A9F6D]"></span>
                  주중: 일~목요일
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F5B041]"></span>
                  금요일: 금요일 요금
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E74C3C]"></span>
                  주말: 토, 공휴일 전날
                </li>
                <li className="text-[#4A90A4] text-xs mt-2">* 성수기 요금 상이</li>
              </ul>
            </div>

            {/* 객실 테이블 */}
            <div className="col-span-6 bg-[#1a2332] rounded-2xl border border-[#2a3a4a] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#0d1520] text-gray-400">
                      <th className="py-3 px-4 text-left border-r border-[#2a3a4a]">객실명</th>
                      <th className="py-3 px-4 text-center border-r border-[#2a3a4a]">평수</th>
                      <th className="py-3 px-4 text-center">기준/최대</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((room, idx) => (
                      <tr key={room.id} className={idx % 2 === 0 ? "bg-[#1a2332]" : "bg-[#151d28]"}>
                        <td className="py-2.5 px-4 border-r border-[#2a3a4a]">
                          <Link href={`/room/${room.id}`} className="text-white font-medium hover:text-[#4A9F6D] transition-colors">
                            {room.name}
                          </Link>
                        </td>
                        <td className="py-2.5 px-4 text-center text-gray-300 border-r border-[#2a3a4a]">{room.size}</td>
                        <td className="py-2.5 px-4 text-center text-gray-300">{room.capacity.standard}/{room.capacity.max}명</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 예약 버튼 + 추가 인원 */}
            <div className="col-span-3 flex flex-col gap-4">
              <div className="bg-[#03C75A]/10 rounded-2xl border border-[#03C75A]/30 p-5 flex-1 flex flex-col justify-center">
                <p className="text-sm text-gray-300 mb-4 text-center">실시간 요금 확인</p>
                <a href={pensionInfo.naverBookingUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-5 py-3 bg-[#03C75A] text-white rounded-full font-bold text-base hover:bg-[#02b351] transition-all mb-3">
                  <Calendar className="w-5 h-5" />네이버 예약
                </a>
                <a href={pensionInfo.yapenBookingUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-5 py-3 bg-[#FF6B35] text-white rounded-full font-bold text-base hover:bg-[#E55A2B] transition-all">
                  <Clock className="w-5 h-5" />실시간 예약
                </a>
              </div>
              <div className="bg-[#1a2332] rounded-2xl border border-[#2a3a4a] p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-[#4A90A4]" />
                    <span className="text-sm text-gray-300">추가 인원</span>
                  </div>
                  <span className="text-2xl font-bold text-[#4A9F6D]">{priceInfo.extraPerson.toLocaleString()}원</span>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-right">유치원 미만 무료</p>
              </div>
            </div>
          </motion.div>

          {/* 두 번째 줄: 바베큐 + 이용안내 (좌우 2컬럼) + 유의사항 + 연락처 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-12 gap-5"
          >
            {/* 바베큐 요금 */}
            <div className="col-span-2 bg-[#1a2332] rounded-2xl border border-[#2a3a4a] p-5">
              <div className="flex items-center gap-2 mb-4">
                <Flame className="w-5 h-5 text-[#F5B041]" />
                <h3 className="text-base font-bold text-white">바베큐</h3>
              </div>
              <div className="space-y-3">
                {priceInfo.bbqPrices.map((item) => (
                  <div key={item.persons} className="flex justify-between items-center py-2.5 px-3 bg-[#0d1520] rounded-xl text-sm">
                    <span className="text-gray-300">{item.persons}</span>
                    <span className="text-white font-bold">{item.price.toLocaleString()}원</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">* 객실 앞 테라스 이용</p>
            </div>

            {/* 이용안내 왼쪽 */}
            <div className="col-span-3 bg-[#1a2332] rounded-2xl border border-[#2a3a4a] p-5">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#4A9F6D] flex items-center justify-center text-white text-xs font-bold">01</span>
                  <span className="text-sm text-white font-medium">입금 시 입금자명 확인</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#4A9F6D] flex items-center justify-center text-white text-xs font-bold">02</span>
                  <span className="text-sm text-white font-medium">최대인원 초과 시 입실불가</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#4A9F6D] flex items-center justify-center text-white text-xs font-bold">03</span>
                  <div className="text-sm">
                    <span className="text-white font-medium">입실: </span>
                    <span className="text-[#4A9F6D] font-bold">15:00 ~ 22:00</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#4A9F6D] flex items-center justify-center text-white text-xs font-bold">04</span>
                  <div className="text-sm">
                    <span className="text-white font-medium">퇴실: </span>
                    <span className="text-[#4A90A4] font-bold">오전 11시</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 이용안내 오른쪽 */}
            <div className="col-span-3 bg-[#1a2332] rounded-2xl border border-[#2a3a4a] p-5">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#F5B041] flex items-center justify-center text-white text-xs font-bold">05</span>
                  <span className="text-sm text-white font-medium">퇴실 시 키 반납</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#F5B041] flex items-center justify-center text-white text-xs font-bold">06</span>
                  <span className="text-sm text-white font-medium">쓰레기 분리 배출</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#4A90A4] flex items-center justify-center text-white text-xs font-bold">07</span>
                  <span className="text-sm text-white font-medium">바베큐 21시까지</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#4A90A4] flex items-center justify-center text-white text-xs font-bold">08</span>
                  <span className="text-sm text-white font-medium">수영장: 여름 성수기만</span>
                </div>
              </div>
            </div>

            {/* 유의사항 */}
            <div className="col-span-2 bg-[#1a2332] rounded-2xl border border-[#F5B041]/30 p-5">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-[#F5B041]" />
                <h3 className="text-base font-bold text-[#F5B041]">유의사항</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-[#F5B041]">•</span>
                  미성년자 보호자 동반
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-[#F5B041]">•</span>
                  반려동물 입실 금지
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-[#F5B041]">•</span>
                  객실 내 절대 금연
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-[#F5B041]">•</span>
                  객실 내 육류 구이 금지
                </li>
              </ul>
            </div>

            {/* 연락처 + 주변시설 */}
            <div className="col-span-2 flex flex-col gap-4">
              <div className="bg-gradient-to-r from-[#1a2332] to-[#0d1520] rounded-2xl border border-[#2a3a4a] p-5 text-center flex-1 flex flex-col justify-center">
                <p className="text-gray-400 text-sm mb-2">문의 및 예약</p>
                <a href={`tel:${pensionInfo.phone}`} className="text-xl font-bold text-white hover:text-[#4A9F6D] transition-colors">
                  {pensionInfo.phone}
                </a>
              </div>
              <div className="bg-[#1a2332] rounded-2xl border border-[#2a3a4a] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-[#4A9F6D]" />
                  <span className="text-sm font-medium text-white">주변 시설</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-gray-400">
                    <span>꾸지나무골해수욕장</span>
                    <span className="text-[#4A90A4]">6분</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>만대항 전망대</span>
                    <span className="text-[#4A90A4]">10분</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>신두리 해수욕장</span>
                    <span className="text-[#4A90A4]">30분</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
