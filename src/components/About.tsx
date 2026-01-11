"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Waves, TreePine, Sunset, Sparkles, Shell, Flame, Volume2, VolumeX } from "lucide-react";
import { pensionInfo } from "@/data/pension";

const features = [
  {
    icon: Waves,
    title: "전 객실 오션뷰",
    description: "모든 객실에서 서해 바다를 조망하며 파도 소리에 잠드는 특별한 경험",
  },
  {
    icon: Sparkles,
    title: "프라이빗 스파",
    description: "각 객실마다 개별 스파를 갖추어 언제든 프라이빗한 휴식을",
  },
  {
    icon: Flame,
    title: "개별 바베큐장",
    description: "각 객실 전용 테라스에서 가족, 연인과 함께 바베큐 파티를",
  },
  {
    icon: TreePine,
    title: "소나무 숲 산책",
    description: "펜션을 둘러싼 소나무 숲에서 상쾌한 피톤치드 힐링",
  },
  {
    icon: Sunset,
    title: "아름다운 일몰",
    description: "서해안 최고의 일몰 명소에서 황금빛 노을을 감상",
  },
  {
    icon: Shell,
    title: "갯벌 체험",
    description: "펜션 앞 갯벌에서 조개잡이, 게잡이 등 다양한 체험 활동",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isMuted, setIsMuted] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 페이지 첫 클릭 시 소리 켜기
  useEffect(() => {
    const enableSound = () => {
      if (isMuted) {
        setIsMuted(false);
        setIframeKey(prev => prev + 1);
      }
      document.removeEventListener('click', enableSound);
    };
    document.addEventListener('click', enableSound);
    return () => document.removeEventListener('click', enableSound);
  }, []);

  // 음소거 토글 시 iframe 리로드
  const toggleMute = () => {
    setIsMuted(!isMuted);
    setIframeKey(prev => prev + 1);
  };

  return (
    <section id="about" className="bg-[var(--background)]" ref={ref} style={{ paddingTop: '20px', paddingBottom: '40px' }}>
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-16 xl:px-24">
        {/* Hero Content - Full Width */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-start mb-12 lg:mb-24">
          {/* Left - Text Content - 위로 올림 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 lg:-mt-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-[2px] bg-[#4A9F6D]" />
              <span className="text-[#4A90A4] text-base tracking-[0.3em] uppercase font-medium">
                {pensionInfo.nameEn}
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[var(--foreground)] mb-6 lg:mb-8 leading-tight font-display ml-4">
              숲속의바다<br />
              <span className="text-[#4A9F6D]">펜션</span>
            </h2>

            <p className="text-[var(--foreground-muted)] text-lg sm:text-xl lg:text-2xl leading-relaxed mb-6 lg:mb-8">
              파란하늘과 수많은 별빛이 가득한 펜션,<br className="hidden sm:block" />
              숲속의바다 펜션으로 여러분을 초대합니다.
            </p>

            <div className="space-y-4 mb-8 lg:mb-12">
              <p className="text-[var(--foreground-muted)] text-base sm:text-lg leading-relaxed">
                오솔길 너머로 들리는 맑은 새소리, 햇빛창이 눈부심에 행복하게 눈 뜰 수 있는 곳!<br />
                목조 건물의 깔끔하고 우아함의 매력속으로 당신을 초대합니다.
              </p>
              <p className="text-[var(--foreground-muted)] text-base sm:text-lg leading-relaxed">
                탁트인 전망, 햇살가득한 테라스, 여행의 소중함을 영원히 간직할 수 있는 곳!
                아름다운 숲속의바다펜션에서 멋진 추억을 만드세요.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 sm:gap-8 lg:gap-10">
              <div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A9F6D]">12</div>
                <div className="text-sm sm:text-base text-[var(--foreground-muted)] mt-1 sm:mt-2">프라이빗 객실</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A9F6D]">100%</div>
                <div className="text-sm sm:text-base text-[var(--foreground-muted)] mt-1 sm:mt-2">오션뷰</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A9F6D]">24H</div>
                <div className="text-sm sm:text-base text-[var(--foreground-muted)] mt-1 sm:mt-2">개별 스파</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Video - 상하 여백 제거, 자동재생 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9' }}>
              <iframe
                key={iframeKey}
                ref={iframeRef}
                src={`https://player.vimeo.com/video/653962905?autoplay=1&loop=1&background=1&title=0&byline=0&portrait=0&muted=${isMuted ? 1 : 0}`}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ width: '177.78%', height: '177.78%', minWidth: '100%', minHeight: '100%' }}
                allow="autoplay; fullscreen; autoplay"
                allowFullScreen
                title="숲속의바다 펜션 소개 영상"
              />
              {/* 음소거 토글 버튼 */}
              <button
                onClick={toggleMute}
                className="absolute bottom-4 right-4 z-10 flex items-center gap-2 px-4 py-2 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full text-white text-sm font-medium transition-all duration-200 hover:scale-105"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-5 h-5" />
                    <span>소리 켜기</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-5 h-5" />
                    <span>소리 끄기</span>
                  </>
                )}
              </button>
              {/* Video Overlay Decoration */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#4A9F6D]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#4A90A4]/10 rounded-full blur-2xl pointer-events-none" />
            </div>
          </motion.div>
        </div>

        {/* Image Gallery - Masonry Style */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-12 lg:mb-24"
        >
          {/* Left: Large Feature Image */}
          <div
            className="aspect-[4/3] lg:aspect-auto lg:h-full rounded-3xl overflow-hidden shadow-2xl"
            style={{
              backgroundImage: `url(/images/gallery/main/1.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Right: 2x2 Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div
              className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              style={{
                backgroundImage: `url(/images/gallery/special2/3.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div
              className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              style={{
                backgroundImage: `url(/images/gallery/room1/4.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div
              className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              style={{
                backgroundImage: `url(/images/gallery/main/4.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div
              className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              style={{
                backgroundImage: `url(/images/gallery/main/5.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
        </motion.div>

        {/* Features Grid - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-8 lg:mb-14">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--foreground)] mb-3 sm:mb-5 font-display">
              특별한 경험
            </h3>
            <p className="text-[var(--foreground-muted)] text-base sm:text-lg">
              숲속의바다에서만 누릴 수 있는 특별함
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="group relative p-3 sm:p-4 lg:p-6 bg-[#1a2332] rounded-xl sm:rounded-2xl border border-[#2a3a4a] hover:border-[#4A9F6D]/50 hover:shadow-2xl hover:shadow-[#4A9F6D]/10 transition-all duration-500"
              >
                {/* Background Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#4A9F6D]/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" />

                <div className="relative">
                  {/* 아이콘 + 제목 가로 배치 */}
                  <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 mb-2 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#4A9F6D] to-[#6BBF8D] flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg flex-shrink-0">
                      <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <h4 className="text-sm sm:text-base lg:text-xl font-bold text-white">
                      {feature.title}
                    </h4>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm lg:text-base leading-relaxed hidden sm:block">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
