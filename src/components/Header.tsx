"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  Instagram,
  Calendar,
} from "lucide-react";
import { pensionInfo, navItems } from "@/data/pension";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-3 sm:py-4 lg:py-6 bg-gradient-to-b from-black/60 to-transparent">
        <div className="w-full px-4 sm:px-6 lg:px-16">
          <div className="flex items-center justify-start">
            {/* 왼쪽: 로고 */}
            <a href="#" className="flex items-center flex-shrink-0">
              <div className="relative">
                <img
                  src="/images/common/logo.png"
                  alt="숲속의바다 펜션"
                  className="h-12 sm:h-16 lg:h-20 w-auto object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
            </a>

            {/* 가운데: 메뉴 - 로고에서 100px 오른쪽 */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-12" style={{ marginLeft: '100px' }}>
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-xl lg:text-2xl font-bold tracking-wide transition-all whitespace-nowrap text-white hover:text-white/80"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* 오른쪽: 전화, 예약 - 맨 오른쪽 배치 */}
            <div className="flex-1" />
            <div className="flex items-center gap-4">
              {/* Phone - 테두리 안에 여백 넉넉하게, 흰색 글씨 */}
              <a
                href={`tel:${pensionInfo.phone}`}
                className="hidden md:flex items-center gap-3 rounded-full transition-all font-medium whitespace-nowrap border-2 bg-transparent border-white/60 backdrop-blur-sm hover:bg-white/10 hover:border-white/80"
                style={{ padding: '12px 28px' }}
              >
                <Phone className="w-5 h-5 text-white" />
                <span className="text-lg text-white">{pensionInfo.phone}</span>
              </a>

              {/* Quick Reservation - 네이버 예약 */}
              <a
                href={pensionInfo.naverBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-2 rounded-full transition-all font-bold whitespace-nowrap hover:-translate-y-0.5 bg-[#03C75A] hover:bg-[#02b351] border border-[#03C75A]"
                style={{ padding: '12px 28px' }}
              >
                <Calendar className="w-5 h-5 text-white" />
                <span className="text-lg text-white">네이버 예약</span>
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden p-3 rounded-full transition-all border text-white border-white/30 bg-black/20 hover:bg-black/30"
                aria-label="메뉴 열기"
              >
                <Menu className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - 프리미엄 풀스크린 디자인 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] lg:hidden"
          >
            {/* Full Screen Background with subtle pattern */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1a2d] to-[#0a1628]"
            />

            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 -left-20 w-60 h-60 bg-emerald-500/5 rounded-full blur-[100px]" />
              <div className="absolute bottom-40 -right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px]" />
            </div>

            {/* Close Button - 우상단 */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              aria-label="메뉴 닫기"
            >
              <X className="w-6 h-6 text-white/80" />
            </motion.button>

            {/* Content */}
            <div className="relative h-full flex flex-col px-8 pt-8 pb-10">
              {/* Logo & Brand */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center pt-4"
              >
                <img
                  src="/images/common/logo.png"
                  alt="숲속의바다 펜션"
                  className="h-20 w-auto object-contain mb-2"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
                <p className="text-white/30 text-xs tracking-[0.3em] uppercase">Premium Pension</p>
              </motion.div>

              {/* Navigation - 좌측 정렬, 큰 타이포 */}
              <nav className="flex-1 flex items-center mt-8">
                <ul className="w-full space-y-1">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + index * 0.05 }}
                    >
                      <a
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center py-4 border-b border-white/5"
                      >
                        <span className="text-white/20 text-sm font-medium w-8">0{index + 1}</span>
                        <span className="text-2xl font-bold text-white/90 group-hover:text-white transition-colors group-hover:translate-x-2 duration-300">
                          {item.name}
                        </span>
                        <motion.span
                          className="ml-auto text-white/0 group-hover:text-white/50 transition-colors"
                        >
                          →
                        </motion.span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Bottom Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-3 mt-auto"
              >
                {/* 네이버 예약 버튼 */}
                <a
                  href={pensionInfo.naverBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-5 bg-[#03C75A] text-white rounded-2xl font-bold text-lg hover:bg-[#02b351] transition-all shadow-[0_8px_30px_rgba(3,199,90,0.3)]"
                >
                  <Calendar className="w-5 h-5" />
                  네이버 예약하기
                </a>

                {/* 연락처 버튼들 */}
                <div className="flex gap-3">
                  <a
                    href={`tel:${pensionInfo.phone}`}
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-colors border border-white/10"
                  >
                    <Phone className="w-5 h-5" />
                    <span className="text-sm">{pensionInfo.phone}</span>
                  </a>
                  <a
                    href={`https://instagram.com/${pensionInfo.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-4 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-colors border border-white/10"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>

                {/* Copyright */}
                <p className="text-center text-white/20 text-xs pt-2">
                  © 2024 숲속의바다. All rights reserved.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
