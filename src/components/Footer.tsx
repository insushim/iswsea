"use client";

import {
  Phone,
  MapPin,
  Instagram,
  Clock,
  ExternalLink,
  ChevronUp,
  Mail,
} from "lucide-react";
import { pensionInfo } from "@/data/pension";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0F1419] text-white">
      {/* Main Footer */}
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-16 xl:px-24 py-12 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-6 sm:mb-8">
              <img
                src="/images/common/logo.png"
                alt="숲속의바다 펜션"
                className="h-10 sm:h-12 lg:h-14 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 leading-relaxed max-w-md mx-auto lg:mx-0 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg">
              태안 안면도의 소나무 숲과 서해 바다가 만나는 곳.<br className="hidden sm:block" />
              전 객실 오션뷰, 개별 바베큐 테라스, 프라이빗 스파로<br className="hidden sm:block" />
              온전히 나만의 시간을 위한 특별한 공간입니다.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <a
                href={`https://instagram.com/${pensionInfo.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-[#E1306C] transition-all"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm">@{pensionInfo.instagram}</span>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-bold mb-6">연락처</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${pensionInfo.phone}`}
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-[var(--primary)] flex items-center justify-center transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="font-medium">{pensionInfo.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="pt-2">{pensionInfo.address}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <span>체크인 {pensionInfo.checkIn} / 체크아웃 {pensionInfo.checkOut}</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">바로가기</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={pensionInfo.naverBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-[#03C75A] transition-colors"
                >
                  네이버 예약
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="http://www.always-design.com/tour/taean/taean_badatime.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  갯벌체험 시간표
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="http://www.always-design.com/tour/taean/taean_citybus_2.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  버스 시간표
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Business Info */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
              {pensionInfo.businesses.map((biz, idx) => (
                <div key={idx} className="text-center lg:text-left flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-1">
                  <span className="font-medium text-gray-400">{biz.name}</span>
                  <span className="text-gray-600">|</span>
                  <span>대표: {biz.owner}</span>
                  <span className="text-gray-600">|</span>
                  <span>사업자번호: {biz.bizNumber}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} 숲속의바다 펜션. All rights reserved.</p>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors hover:text-white"
            >
              <ChevronUp className="w-4 h-4" />
              맨 위로
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
