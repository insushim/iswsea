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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-[380px]"
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#1e293b] to-[#0f172a] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10">

              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-emerald-500/15 to-teal-500/10 rounded-full blur-3xl" />
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:rotate-90 duration-300"
              >
                <X className="w-4 h-4 text-white/70" />
              </button>

              {/* Header */}
              <div className="relative pt-8 pb-4 px-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-500/30 mb-4"
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  특별 이벤트
                </h2>
                <p className="text-white/50 text-sm mt-1">숲속의바다 펜션</p>
              </div>

              {/* Events */}
              <div className="px-5 pb-4 space-y-3">
                {activeEvents.map((event, idx) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="relative"
                  >
                    <div
                      className="relative p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02]"
                      style={{
                        background: `linear-gradient(135deg, ${event.color}15, ${event.color}05)`,
                        borderColor: `${event.color}30`
                      }}
                    >
                      {/* Badge */}
                      {event.badge && (
                        <span
                          className="absolute -top-2 right-4 px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-lg"
                          style={{
                            background: `linear-gradient(135deg, ${event.color}, ${event.color}dd)`,
                            boxShadow: `0 4px 15px ${event.color}40`
                          }}
                        >
                          {event.badge}
                        </span>
                      )}

                      {/* Title */}
                      <h3 className="font-bold text-white text-[15px] pr-16 leading-snug">
                        {event.title}
                      </h3>

                      {/* Period */}
                      <p className="text-white/40 text-xs mt-1 mb-2">
                        {event.period}
                      </p>

                      {/* Highlight */}
                      {event.highlight && (
                        <div
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold mb-2"
                          style={{
                            background: `${event.color}20`,
                            color: event.color
                          }}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          {event.highlight}
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-white/60 text-[13px] leading-relaxed">
                        {event.description}
                      </p>

                      {/* Conditions */}
                      {event.conditions && event.conditions.length > 0 && (
                        <p className="text-white/30 text-[11px] mt-2 pl-2 border-l-2 border-white/10">
                          {event.conditions[0]}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-5 pb-5 pt-2">
                <div className="flex items-center justify-between">
                  <label
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={() => setDontShowToday(!dontShowToday)}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200 ${
                        dontShowToday
                          ? "bg-emerald-500 shadow-lg shadow-emerald-500/30"
                          : "bg-white/10 group-hover:bg-white/20"
                      }`}
                    >
                      {dontShowToday && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                    </div>
                    <span className="text-[13px] text-white/50 group-hover:text-white/70 transition-colors">
                      24시간 동안 열지 않음
                    </span>
                  </label>

                  <button
                    onClick={handleClose}
                    className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white text-sm font-medium transition-all hover:scale-105"
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
