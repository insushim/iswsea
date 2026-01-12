"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Bell, ChevronDown, ChevronUp, Settings } from "lucide-react";
import { useAdminStore } from "@/stores/adminStore";
import Link from "next/link";

export default function Notice() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { notices } = useAdminStore();

  const activeNotices = notices.filter((n) => n.active);

  if (activeNotices.length === 0) {
    return null;
  }

  return (
    <section
      id="notice"
      className="bg-[#0F1419] text-white relative overflow-hidden"
      style={{ paddingTop: "60px", paddingBottom: "80px" }}
      ref={ref}
    >
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-16 xl:px-24 relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 relative w-full"
        >
          <p className="text-white/70 text-sm sm:text-base tracking-[0.3em] uppercase mb-3 sm:mb-4 font-medium">
            NOTICE
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 font-display">
            공지사항
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#F5B041] to-[#4A9F6D] mx-auto rounded-full" />

          {/* 관리자 로그인 버튼 */}
          <Link
            href="/admin"
            className="absolute right-0 top-0 flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-white/50 hover:text-white/80 text-xs sm:text-sm transition-all"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">관리자</span>
          </Link>
        </motion.div>

        {/* Notice Board */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full"
        >
          {/* 게시판 헤더 */}
          <div className="bg-[#0d1520] rounded-t-xl sm:rounded-t-2xl border border-[#2a3a4a] border-b-0">
            <div className="grid grid-cols-12 px-3 sm:px-6 text-xs sm:text-sm lg:text-base font-medium text-gray-400" style={{ paddingTop: '12px', paddingBottom: '12px' }}>
              <div className="col-span-1 hidden sm:flex items-center justify-center">번호</div>
              <div className="col-span-8 sm:col-span-7 flex items-center justify-center">제목</div>
              <div className="col-span-2 hidden lg:flex items-center justify-center">작성일</div>
              <div className="col-span-4 sm:col-span-2 flex items-center justify-center">구분</div>
            </div>
          </div>

          {/* 게시판 목록 */}
          <div className="bg-[#1a2332] rounded-b-xl sm:rounded-b-2xl border border-[#2a3a4a] border-t-0 overflow-hidden">
            {activeNotices.map((notice, idx) => (
              <div key={notice.id}>
                {/* 게시글 행 */}
                <div
                  onClick={() => setExpandedId(expandedId === notice.id ? null : notice.id)}
                  className={`grid grid-cols-12 px-3 sm:px-6 cursor-pointer transition-colors hover:bg-[#1f2a3d] ${
                    idx !== activeNotices.length - 1 ? "border-b border-[#2a3a4a]" : ""
                  } ${expandedId === notice.id ? "bg-[#1f2a3d]" : ""}`}
                  style={{ paddingTop: '14px', paddingBottom: '14px' }}
                >
                  <div className="col-span-1 text-gray-500 text-sm hidden sm:flex items-center justify-center">
                    {activeNotices.length - idx}
                  </div>
                  <div className="col-span-8 sm:col-span-7 flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2">
                    {notice.important && (
                      <span className="px-1.5 sm:px-2 py-0.5 bg-[#F5B041]/20 text-[#F5B041] text-xs font-medium rounded flex-shrink-0">
                        중요
                      </span>
                    )}
                    <span className="text-white font-medium text-xs sm:text-sm lg:text-base hover:text-[#4A9F6D] transition-colors truncate">
                      {notice.title}
                    </span>
                    {expandedId === notice.id ? (
                      <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                    )}
                  </div>
                  <div className="col-span-2 text-gray-500 text-sm hidden lg:flex items-center justify-center">
                    {notice.date}
                  </div>
                  <div className="col-span-4 sm:col-span-2 flex items-center justify-center">
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${
                        notice.important
                          ? "bg-[#F5B041]/10 text-[#F5B041]"
                          : "bg-[#4A90A4]/10 text-[#4A90A4]"
                      }`}
                    >
                      {notice.important ? "공지" : "안내"}
                    </span>
                  </div>
                </div>

                {/* 펼쳐진 내용 */}
                <AnimatePresence>
                  {expandedId === notice.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="bg-[#0d1520] border-b border-[#2a3a4a] overflow-hidden"
                    >
                      <div className="p-4 sm:p-6 lg:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-[#2a3a4a]">
                          {notice.important && (
                            <span className="px-2 py-1 bg-[#F5B041]/20 text-[#F5B041] text-xs font-medium rounded w-fit">
                              중요
                            </span>
                          )}
                          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white">{notice.title}</h3>
                          <span className="text-gray-500 text-xs sm:text-sm sm:ml-auto">{notice.date}</span>
                        </div>
                        <pre className="text-gray-300 text-xs sm:text-sm whitespace-pre-wrap font-sans leading-relaxed">
                          {notice.content}
                        </pre>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
