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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-md bg-[#0F1419]/90 backdrop-blur-md shadow-2xl border-l border-white/10"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/common/logo.png"
                    alt="숲속의바다 펜션"
                    className="h-10 w-auto object-contain"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="메뉴 닫기"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="p-6">
                <ul className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-4 py-4 px-4 text-lg font-semibold text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#2563eb]" />
                        {item.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Contact Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-black/20">
                <div className="space-y-4">
                  {/* 예약 버튼 - 네이버 예약 */}
                  <a
                    href={pensionInfo.naverBookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 bg-[#03C75A] text-white rounded-xl font-bold text-lg hover:bg-[#02b351] hover:shadow-lg transition-all"
                  >
                    <Calendar className="w-5 h-5" />
                    네이버 예약하기
                  </a>

                  {/* 전화 버튼 */}
                  <a
                    href={`tel:${pensionInfo.phone}`}
                    className="flex items-center justify-center gap-3 w-full py-4 bg-transparent text-white border-2 border-white/60 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    {pensionInfo.phone}
                  </a>

                  {/* 인스타그램 */}
                  <div className="flex items-center justify-center gap-4 pt-2">
                    <a
                      href={`https://instagram.com/${pensionInfo.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white/60 hover:text-[#E1306C] transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                      <span className="text-sm">@{pensionInfo.instagram}</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
