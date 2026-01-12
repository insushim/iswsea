"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Check } from "lucide-react";
import { useAdminStore } from "@/stores/adminStore";

export default function EventPopup() {
  const { events, popupEnabled } = useAdminStore();
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowToday, setDontShowToday] = useState(false);

  const activeEvents = events.filter((e) => e.active);

  useEffect(() => {
    if (!popupEnabled || activeEvents.length === 0) {
      return;
    }

    const dontShowUntil = localStorage.getItem("eventPopupDontShowUntil");

    if (dontShowUntil) {
      const untilDate = new Date(dontShowUntil);
      if (new Date() < untilDate) {
        return;
      }
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [popupEnabled, activeEvents.length]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("eventPopupClosedAt", new Date().toISOString());

    if (dontShowToday) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      localStorage.setItem("eventPopupDontShowUntil", tomorrow.toISOString());
    }
  };

  if (!popupEnabled || activeEvents.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100]"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[88%] max-w-[480px]"
          >
            <div className="relative rounded-[32px] bg-gradient-to-b from-[#1a2234] via-[#141c2e] to-[#0d1320] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] border border-white/[0.08]">

              {/* Decorative Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[32px]">
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-amber-500/15 to-orange-500/5 rounded-full blur-[80px]" />
                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-emerald-500/10 to-teal-500/5 rounded-full blur-[80px]" />
              </div>

              {/* Close Button - 충분히 안쪽으로 */}
              <button
                onClick={handleClose}
                className="absolute top-8 right-8 z-10 w-10 h-10 rounded-full bg-white/[0.08] hover:bg-white/[0.15] backdrop-blur-sm flex items-center justify-center transition-all hover:rotate-90 duration-300 border border-white/[0.1]"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>

              {/* Header */}
              <div className="relative pt-16 pb-8 px-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                  className="inline-flex items-center justify-center w-[76px] h-[76px] rounded-[22px] bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 shadow-[0_8px_32px_rgba(251,146,60,0.4)] mb-6"
                >
                  <Sparkles className="w-10 h-10 text-white drop-shadow-lg" />
                </motion.div>
                <h2 className="text-[28px] font-bold text-white tracking-tight">
                  특별 이벤트
                </h2>
                <p className="text-white/45 text-[15px] mt-2 font-medium">숲속의바다 펜션</p>
              </div>

              {/* Events */}
              <div className="px-10 pb-8 space-y-6">
                {activeEvents.map((event, idx) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="relative"
                  >
                    <div
                      className="relative px-8 py-7 rounded-[22px] border transition-all duration-300 hover:scale-[1.01]"
                      style={{
                        background: `linear-gradient(145deg, ${event.color}15, ${event.color}08)`,
                        borderColor: `${event.color}30`
                      }}
                    >
                      {/* Badge - 훨씬 더 크게 */}
                      {event.badge && (
                        <span
                          className="absolute -top-4 right-6 px-6 py-3 rounded-full text-[17px] font-bold text-white shadow-lg tracking-wide"
                          style={{
                            background: `linear-gradient(135deg, ${event.color}, ${event.color}dd)`,
                            boxShadow: `0 6px 20px ${event.color}40`
                          }}
                        >
                          {event.badge}
                        </span>
                      )}

                      {/* Title - 훨씬 더 크게 */}
                      <h3 className="font-bold text-white text-[18px] pr-20 leading-relaxed">
                        {event.title}
                      </h3>

                      {/* Period */}
                      <p className="text-white/45 text-[14px] mt-3 mb-5 font-medium">
                        {event.period}
                      </p>

                      {/* Highlight - 훨씬 더 크게 */}
                      {event.highlight && (
                        <div
                          className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl text-[17px] font-bold mb-5"
                          style={{
                            background: `${event.color}20`,
                            color: event.color
                          }}
                        >
                          <Sparkles className="w-6 h-6" />
                          {event.highlight}
                        </div>
                      )}

                      {/* Description - 더 크게 */}
                      <p className="text-white/65 text-[15px] leading-[1.9]">
                        {event.description}
                      </p>

                      {/* Conditions */}
                      {event.conditions && event.conditions.length > 0 && (
                        <p className="text-white/35 text-[13px] mt-5 pl-4 border-l-2 border-white/[0.15] leading-relaxed">
                          {event.conditions[0]}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer - 패딩 충분히 넉넉하게 */}
              <div className="px-10 pb-10 pt-4">
                <div className="flex items-center justify-between gap-6">
                  <label
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => setDontShowToday(!dontShowToday)}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                        dontShowToday
                          ? "bg-emerald-500 shadow-[0_4px_12px_rgba(16,185,129,0.35)]"
                          : "bg-white/[0.1] group-hover:bg-white/[0.18] border border-white/[0.12]"
                      }`}
                    >
                      {dontShowToday && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                    </div>
                    <span className="text-[15px] text-white/55 group-hover:text-white/75 transition-colors">
                      24시간 동안 열지 않음
                    </span>
                  </label>

                  <button
                    onClick={handleClose}
                    className="px-8 py-3.5 bg-white/[0.1] hover:bg-white/[0.18] rounded-xl text-white text-[16px] font-semibold transition-all hover:scale-105 border border-white/[0.1] flex-shrink-0"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
