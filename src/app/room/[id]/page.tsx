"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Waves,
  Flame,
  Sparkles,
  Users,
  Phone,
  ExternalLink,
  Home,
  Maximize2,
  Grid3X3,
  MapPin,
} from "lucide-react";
import { rooms, pensionInfo } from "@/data/pension";
import Link from "next/link";

const featureIcons: Record<string, React.ElementType> = {
  "오션뷰": Waves,
  "개별 테라스": ExternalLink,
  "바베큐": Flame,
  "스파": Sparkles,
};

export default function RoomDetailPage() {
  const params = useParams();
  const roomId = params.id as string;
  const room = rooms.find((r) => r.id === roomId);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<"slider" | "grid">("slider");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentImageIndex]);

  if (!room) {
    return (
      <div className="min-h-screen bg-[#0F1419] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">객실을 찾을 수 없습니다</h1>
          <Link href="/#rooms" className="text-[#4A9F6D] hover:underline">
            객실 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === room.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? room.images.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-[#0F1419]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F1419]/95 backdrop-blur-md border-b border-[#2a3a4a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/#rooms" className="flex items-center gap-2 text-white hover:text-[#4A9F6D] transition-colors">
              <ChevronLeft className="w-5 h-5" />
              <span>객실 목록</span>
            </Link>
            <div className="text-center">
              <p className="text-[#4A90A4] text-xs tracking-wider">{room.nameEn}</p>
              <h1 className="text-white font-bold">{room.name}</h1>
            </div>
            <Link href="/" className="flex items-center gap-2 text-white hover:text-[#4A9F6D] transition-colors">
              <Home className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Image Section */}
        <section className="relative">
          {/* View Mode Toggle */}
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            <button
              onClick={() => setViewMode("slider")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "slider"
                  ? "bg-[#4A9F6D] text-white"
                  : "bg-black/50 text-white/70 hover:text-white"
              }`}
            >
              <Maximize2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-[#4A9F6D] text-white"
                  : "bg-black/50 text-white/70 hover:text-white"
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
          </div>

          {viewMode === "slider" ? (
            <>
              {/* Main Image */}
              <div
                className="relative h-[60vh] lg:h-[70vh] cursor-pointer"
                onClick={() => setIsFullscreen(true)}
              >
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${room.images[currentImageIndex].src})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1419] via-transparent to-transparent" />

                {/* Navigation Arrows */}
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all hover:scale-110"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all hover:scale-110"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/60 backdrop-blur-sm rounded-full text-white">
                  <span className="text-2xl font-bold">{currentImageIndex + 1}</span>
                  <span className="text-white/60 mx-2">/</span>
                  <span className="text-white/60">{room.images.length}</span>
                </div>

                {/* Click to expand hint */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm flex items-center gap-2">
                  <Maximize2 className="w-4 h-4" />
                  클릭하여 전체화면으로 보기
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="bg-[#0d1520] py-4 px-4 overflow-x-auto">
                <div className="flex gap-3 justify-center">
                  {room.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 w-20 h-14 lg:w-28 lg:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === currentImageIndex
                          ? "border-[#4A9F6D] scale-105 shadow-lg shadow-[#4A9F6D]/30"
                          : "border-transparent opacity-50 hover:opacity-100"
                      }`}
                    >
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${img.src})` }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Grid View */
            <div className="p-4 lg:p-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {room.images.map((img, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => {
                      setCurrentImageIndex(idx);
                      setIsFullscreen(true);
                    }}
                    className="aspect-[4/3] rounded-xl overflow-hidden group relative"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${img.src})` }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                      <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 rounded text-white text-sm">
                      {idx + 1}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Room Info Section - Premium Layout */}
        <section className="w-full px-4 sm:px-6 lg:px-16 xl:px-24 py-8">
          {/* Header */}
          <div className="mb-8 pb-6 border-b border-[#2a3a4a]">
            <p className="text-[#4A90A4] text-sm tracking-wider mb-1">{room.nameEn}</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">{room.name}</h2>
            <p className="text-gray-400 text-base leading-relaxed">{room.description}</p>
          </div>

          {/* Two Column Grid - Map Left, Info Right */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column - Map */}
            <div className="p-5 bg-[#1a2332] rounded-2xl border border-[#2a3a4a] flex flex-col">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#4A9F6D]" />
                객실 위치
              </h3>
              <div className="flex-1 rounded-xl overflow-hidden bg-[#e8f0e8]">
                <img
                  src="/images/pension-map.png.png"
                  alt="펜션 배치도"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="mt-4 p-4 bg-[#0d1520] rounded-xl text-center">
                <p className="text-[#4A9F6D] font-bold text-lg">
                  현재 객실: {room.name} ({room.nameEn})
                </p>
              </div>
            </div>

            {/* Right Column - Info Card */}
            <div className="flex flex-col gap-5">
              {/* Reservation CTA - Premium Style */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a2332] to-[#0d1520] border border-[#2a3a4a] p-8">
                {/* Decorative Background */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#4A9F6D]/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#4A90A4]/10 rounded-full blur-2xl" />

                <div className="relative z-10">
                  {/* Room Title & Sub Info */}
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold text-white">{room.name}</h3>
                    <p className="text-[#4A90A4] text-sm">기준{room.capacity.standard}명 / 최대{room.capacity.max}명 ({room.size})</p>
                  </div>

                  {/* Room Info Table */}
                  <div className="mb-4 rounded-xl overflow-hidden border border-[#2a3a4a]">
                    {/* Header */}
                    <div className="grid grid-cols-3 bg-[#0d1520] text-center text-xs">
                      <div className="py-2 px-1 border-r border-[#2a3a4a] text-gray-400">객실명</div>
                      <div className="py-2 px-1 border-r border-[#2a3a4a] text-gray-400">평수</div>
                      <div className="py-2 px-1 text-gray-400">기준/최대</div>
                    </div>
                    {/* Data Row */}
                    <div className="grid grid-cols-3 bg-[#1a2332] text-center text-xs">
                      <div className="py-3 px-1 border-r border-[#2a3a4a] text-white font-medium">{room.name}</div>
                      <div className="py-3 px-1 border-r border-[#2a3a4a] text-gray-300">{room.size}</div>
                      <div className="py-3 px-1 text-gray-300">{room.capacity.standard}명/{room.capacity.max}명</div>
                    </div>
                  </div>

                  {/* Price Table */}
                  {room.prices && (
                    <div className="mb-6 rounded-xl overflow-hidden border border-[#2a3a4a]">
                      {/* Price Header */}
                      <div className="grid grid-cols-4 bg-[#0d1520] text-center text-[10px] sm:text-xs">
                        <div className="py-2 px-1 border-r border-[#2a3a4a] text-gray-400">
                          <div>주중</div>
                          <div className="text-[9px] text-gray-500">(월~목)</div>
                        </div>
                        <div className="py-2 px-1 border-r border-[#2a3a4a] text-gray-400">금요일</div>
                        <div className="py-2 px-1 border-r border-[#2a3a4a] text-gray-400">
                          <div>주말</div>
                          <div className="text-[9px] text-gray-500">(토,공휴일전일)</div>
                        </div>
                        <div className="py-2 px-1 text-gray-400">일요일</div>
                      </div>
                      {/* Price Data Row */}
                      <div className="grid grid-cols-4 bg-[#1a2332] text-center text-[11px] sm:text-sm">
                        <div className="py-3 px-1 border-r border-[#2a3a4a] text-[#4A9F6D] font-bold">
                          {room.prices.weekday.toLocaleString()}원
                        </div>
                        <div className="py-3 px-1 border-r border-[#2a3a4a] text-[#4A90A4] font-bold">
                          {room.prices.friday.toLocaleString()}원
                        </div>
                        <div className="py-3 px-1 border-r border-[#2a3a4a] text-[#F5B041] font-bold">
                          {room.prices.weekend.toLocaleString()}원
                        </div>
                        <div className="py-3 px-1 text-[#4A9F6D] font-bold">
                          {room.prices.sunday.toLocaleString()}원
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Phone - Centered */}
                  <a
                    href={`tel:${pensionInfo.phone}`}
                    className="flex items-center justify-center gap-3 text-white hover:text-[#4A9F6D] transition-colors mb-5"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#4A90A4]/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#4A90A4]" />
                    </div>
                    <span className="font-bold text-xl">{pensionInfo.phone}</span>
                  </a>

                  {/* Big CTA Button - 네이버 예약 */}
                  <a
                    href={pensionInfo.naverBookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block w-full py-6 overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#03C75A]/20 mb-5"
                  >
                    {/* Button Background - 네이버 녹색 */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#03C75A] via-[#04D861] to-[#03C75A] bg-[length:200%_100%] group-hover:animate-[shimmer_1.5s_infinite]" />
                    <div className="absolute inset-[1px] rounded-[11px] bg-gradient-to-r from-[#03C75A] to-[#04D861]" />

                    <div className="relative flex items-center justify-center gap-3">
                      <span className="text-white font-bold text-xl tracking-wide">네이버 예약하기</span>
                      <ExternalLink className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>

                  {/* Capacity & Check-in/out Info - Same Row */}
                  <div className="flex items-center justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#4A9F6D]" />
                      <span className="text-gray-400">기준 <span className="text-white font-medium">{room.capacity.standard}명</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#4A90A4]" />
                      <span className="text-gray-400">최대 <span className="text-white font-medium">{room.capacity.max}명</span></span>
                    </div>
                    <span className="text-[#2a3a4a]">|</span>
                    <span className="text-gray-400">체크인 <span className="text-[#4A9F6D] font-medium">{pensionInfo.checkIn}</span></span>
                    <span className="text-gray-400">체크아웃 <span className="text-[#4A90A4] font-medium">{pensionInfo.checkOut}</span></span>
                  </div>
                </div>
              </div>

              {/* Features & Amenities Combined Card */}
              <div className="bg-[#1a2332] rounded-2xl border border-[#2a3a4a] p-6">
                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-[#4A9F6D] uppercase tracking-wider mb-4">객실 특징</h3>
                  <div className="flex flex-wrap gap-3">
                    {room.features.map((feature) => {
                      const Icon = featureIcons[feature];
                      return (
                        <div key={feature} className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#4A9F6D]/10 to-transparent rounded-xl border border-[#4A9F6D]/20">
                          {Icon && <Icon className="w-5 h-5 text-[#4A9F6D]" />}
                          <span className="text-white font-medium">{feature}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[#2a3a4a] my-6" />

                {/* Amenities */}
                <div>
                  <h3 className="text-sm font-bold text-[#4A90A4] uppercase tracking-wider mb-4">구비 시설</h3>
                  <div className="flex flex-wrap gap-2">
                    {["TV", "에어컨", "냉장고", "전자레인지", "취사도구", "드라이기", "욕실용품", "Wi-Fi"].map((item) => (
                      <span key={item} className="px-4 py-2 bg-[#0d1520] text-gray-300 rounded-lg text-sm border border-[#2a3a4a] hover:border-[#4A90A4]/50 transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notice Card - Detailed Info from Original Site */}
              <div className="bg-[#1a2332] rounded-2xl border border-[#2a3a4a] p-6">
                <h3 className="text-sm font-bold text-[#F5B041] uppercase tracking-wider mb-5">NOTICE</h3>

                <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                  {/* Price Info */}
                  <div className="pb-4 border-b border-[#2a3a4a]">
                    <p className="mb-2">
                      <span className="text-white">-</span> 객실 요금은 <span className="text-[#4A9F6D] font-medium">기준 인원 2명</span>에 대한 요금이며 기준 인원 초과시 <span className="text-[#4A9F6D] font-medium">1인당, 1일당 추가요금</span>이 발생합니다.
                    </p>
                    <p className="text-gray-400 ml-3">
                      (유치원 미만 무료, 유치원 이상은 <span className="text-white font-medium">20,000원</span> 추가됩니다.)
                    </p>
                  </div>

                  {/* BBQ Info */}
                  <div className="pb-4 border-b border-[#2a3a4a]">
                    <p className="mb-2">
                      <span className="text-white">-</span> 바베큐 이용시 <span className="text-[#4A90A4] font-medium">숯+그릴 사용</span>은 2~4인 기준 1회 이용료 <span className="text-white font-medium">20,000원</span>/ 5~8인 기준 1회 이용료 <span className="text-white font-medium">30,000원</span>/ 9인이상 1회 이용료 <span className="text-white font-medium">40,000원</span>
                    </p>
                    <p className="text-gray-400 ml-3">
                      - 바베큐는 각 객실 앞 개별테라스에서 가능합니다. <span className="text-[#4A90A4]">(전객실 개별)</span>
                    </p>
                  </div>

                  {/* Rules */}
                  <div className="space-y-2">
                    <p>
                      <span className="text-white">-</span> <span className="text-[#F5B041]">미성년자는 보호자 동반 없이 이용 하실 수 없습니다.</span>
                    </p>
                    <p>
                      <span className="text-white">-</span> <span className="text-[#F5B041]">반려동물은 타 객실 및 손님을 위해 입실이 불가</span>하니 양해 바랍니다.
                    </p>
                    <p className="text-gray-400 ml-3">
                      (동반 입실 시 당일 예약 취소에 해당됩니다.)
                    </p>
                    <p>
                      <span className="text-white">-</span> <span className="text-[#F5B041]">객실 내에서는 절대 금연</span>입니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Rooms */}
        <section className="bg-[#0d1520] py-12">
          <div className="w-full px-4 sm:px-6 lg:px-16 xl:px-24">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">다른 객실 보기</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {rooms.filter((r) => r.id !== room.id).map((otherRoom) => (
                <Link
                  key={otherRoom.id}
                  href={`/room/${otherRoom.id}`}
                  className="group"
                >
                  <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${otherRoom.mainImage})` }}
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white font-bold text-sm">{otherRoom.name}</p>
                      <p className="text-white/60 text-xs">{otherRoom.nameEn}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Image */}
            <motion.img
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={room.images[currentImageIndex].src}
              alt={room.images[currentImageIndex].alt}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white text-xl">
              {currentImageIndex + 1} / {room.images.length}
            </div>

            {/* Thumbnails */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 max-w-[80vw] overflow-x-auto p-2">
              {room.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                  className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === currentImageIndex
                      ? "border-white scale-110"
                      : "border-transparent opacity-50 hover:opacity-100"
                  }`}
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${img.src})` }}
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
