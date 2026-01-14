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
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // 사용자 상호작용(클릭/터치/드래그) 시 자동 소리 재생
  useEffect(() => {
    const handleUserInteraction = () => {
      setIsMuted(false);
    };

    // 클릭, 터치, 드래그 이벤트 감지
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });
    document.addEventListener('mousedown', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('mousedown', handleUserInteraction);
    };
  }, []);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  // 초기 로딩 시 null 상태에서는 아무것도 렌더링하지 않음
  if (isDesktop === null) {
    return (
      <section id="about" className="bg-[var(--background)] pt-5 pb-10 lg:pt-24 lg:pb-24 min-h-fit" ref={ref}>
        <div className="w-full max-w-none px-4 sm:px-6 lg:px-16 xl:px-24" />
      </section>
    );
  }

  return (
    <section id="about" className="bg-[var(--background)] pt-4 pb-6 lg:pt-24 lg:pb-24 min-h-fit" ref={ref}>
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-16 xl:px-24">

        {/* ===== 모바일 레이아웃 ===== */}
        {!isDesktop && (
          <div>
            <div className="mb-4 text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-8 h-[1px] bg-[#4A9F6D]" />
                <span className="text-[#4A90A4] text-xs tracking-[0.15em] uppercase font-medium">
                  {pensionInfo.nameEn}
                </span>
                <div className="w-8 h-[1px] bg-[#4A9F6D]" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2 leading-tight font-display">
                숲속의바다 <span className="text-[#4A9F6D]">펜션</span>
              </h2>
              <p className="text-[var(--foreground-muted)] text-sm leading-relaxed mb-3">
                파란하늘과 수많은 별빛이 가득한<br />숲속의바다 펜션으로 초대합니다
              </p>
              {/* 비디오 - 모바일 전용 (단일 iframe) */}
              <div style={{ aspectRatio: '16/9' }} className="relative rounded-xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 overflow-hidden">
                  <iframe
                    src={`https://player.vimeo.com/video/653962905?autoplay=1&loop=1&background=1&title=0&byline=0&portrait=0&muted=${isMuted ? 1 : 0}`}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ width: '177.78%', height: '177.78%', minWidth: '100%', minHeight: '100%' }}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    title="숲속의바다 펜션 소개 영상"
                  />
                </div>
                <button
                  onClick={toggleMute}
                  className="absolute bottom-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all z-10 backdrop-blur-sm"
                  aria-label={isMuted ? "소리 켜기" : "소리 끄기"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {/* 특별한 경험 - 컴팩트 3열 */}
            <div className="grid grid-cols-3 gap-2">
              {features.map((feature) => (
                <div key={feature.title} className="p-2 bg-[#1a2332] rounded-lg border border-[#2a3a4a] flex flex-col items-center text-center">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#4A9F6D] to-[#6BBF8D] flex items-center justify-center mb-1">
                    <feature.icon className="w-3 h-3 text-white" />
                  </div>
                  <h4 className="text-[10px] font-bold text-white leading-tight">{feature.title}</h4>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== PC 레이아웃 ===== */}
        {isDesktop && (
          <div>
            <div className="grid grid-cols-12 gap-6 mb-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="col-span-4 flex flex-col justify-center"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-[2px] bg-[#4A9F6D]" />
                  <span className="text-[#4A90A4] text-sm tracking-[0.2em] uppercase font-medium">
                    {pensionInfo.nameEn}
                  </span>
                </div>
                <h2 className="text-4xl xl:text-5xl font-bold text-[var(--foreground)] mb-4 leading-tight font-display">
                  숲속의바다<br /><span className="text-[#4A9F6D]">펜션</span>
                </h2>
                <p className="text-[var(--foreground-muted)] text-base xl:text-lg leading-relaxed mb-4">
                  파란하늘과 수많은 별빛이 가득한 펜션,<br />숲속의바다로 여러분을 초대합니다.
                </p>
                <p className="text-[var(--foreground-muted)] text-sm leading-relaxed mb-5">
                  맑은 새소리, 햇빛에 행복하게 눈 뜰 수 있는 곳!<br />
                  탁트인 전망과 햇살가득한 테라스에서 멋진 추억을 만드세요.
                </p>
                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="text-2xl xl:text-3xl font-bold text-[#4A9F6D]">12</div>
                    <div className="text-xs text-[var(--foreground-muted)]">프라이빗 객실</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl xl:text-3xl font-bold text-[#4A9F6D]">100%</div>
                    <div className="text-xs text-[var(--foreground-muted)]">오션뷰</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl xl:text-3xl font-bold text-[#4A9F6D]">24H</div>
                    <div className="text-xs text-[var(--foreground-muted)]">개별 스파</div>
                  </div>
                </div>
              </motion.div>

              {/* 비디오 - PC 전용 (단일 iframe) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="col-span-5"
              >
                <div className="h-full min-h-[340px] relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 overflow-hidden">
                    <iframe
                      src={`https://player.vimeo.com/video/653962905?autoplay=1&loop=1&background=1&title=0&byline=0&portrait=0&muted=${isMuted ? 1 : 0}`}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{ width: '177.78%', height: '177.78%', minWidth: '100%', minHeight: '100%' }}
                      allow="autoplay; fullscreen"
                      allowFullScreen
                      title="숲속의바다 펜션 소개 영상"
                    />
                  </div>
                  <button
                    onClick={toggleMute}
                    className="absolute bottom-4 right-4 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all z-10 backdrop-blur-sm"
                    aria-label={isMuted ? "소리 켜기" : "소리 끄기"}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="col-span-3 flex flex-col gap-4"
              >
                <div className="flex-1 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow" style={{ backgroundImage: `url(/images/gallery/special2/3.jpg)`, backgroundSize: "cover", backgroundPosition: "center", minHeight: '165px' }} />
                <div className="flex-1 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow" style={{ backgroundImage: `url(/images/gallery/room1/4.jpg)`, backgroundSize: "cover", backgroundPosition: "center", minHeight: '165px' }} />
              </motion.div>
            </div>

            <div className="grid grid-cols-12 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="col-span-5 rounded-2xl overflow-hidden shadow-xl"
                style={{ backgroundImage: `url(/images/gallery/main/1.jpg)`, backgroundSize: "cover", backgroundPosition: "center", minHeight: '380px' }}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="col-span-4 grid grid-cols-2 gap-4"
              >
                <div className="rounded-xl overflow-hidden shadow-lg" style={{ backgroundImage: `url(/images/gallery/main/4.jpg)`, backgroundSize: "cover", backgroundPosition: "center", minHeight: '182px' }} />
                <div className="rounded-xl overflow-hidden shadow-lg" style={{ backgroundImage: `url(/images/gallery/main/5.jpg)`, backgroundSize: "cover", backgroundPosition: "center", minHeight: '182px' }} />
                <div className="rounded-xl overflow-hidden shadow-lg" style={{ backgroundImage: `url(/images/gallery/special1/1.jpg)`, backgroundSize: "cover", backgroundPosition: "center", minHeight: '182px' }} />
                <div className="rounded-xl overflow-hidden shadow-lg" style={{ backgroundImage: `url(/images/gallery/special1/2.jpg)`, backgroundSize: "cover", backgroundPosition: "center", minHeight: '182px' }} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="col-span-3 bg-[#1a2332] rounded-2xl border border-[#2a3a4a] p-5 flex flex-col"
              >
                <h3 className="text-xl font-bold text-white mb-2">특별한 경험</h3>
                <p className="text-gray-400 text-sm mb-5">숲속의바다에서만 누릴 수 있는 특별함</p>
                <div className="flex-1 flex flex-col gap-3">
                  {features.map((feature) => (
                    <div key={feature.title} className="flex items-center gap-3 p-2.5 bg-[#0d1520] rounded-xl hover:bg-[#151d28] transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4A9F6D] to-[#6BBF8D] flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white leading-tight">{feature.title}</h4>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{feature.description.slice(0, 20)}...</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
