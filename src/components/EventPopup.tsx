"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Clock, Calendar, Sparkles, ChevronRight, CheckCircle } from "lucide-react";
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-[101] max-w-md w-full max-h-[90vh] overflow-hidden"
          >
            <div className="bg-gradient-to-br from-[#1a2332] to-[#0F1419] rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10 overflow-hidden h-full flex flex-col">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-[#F5B041]/20 via-[#4A9F6D]/20 to-[#4A90A4]/20 p-4 sm:p-6">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#F5B041]/10 rounded-full blur-3xl" />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#4A90A4]/10 rounded-full blur-3xl" />
                </div>

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#F5B041] to-[#E67E22] flex items-center justify-center shadow-lg">
                      <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                        EVENT
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#F5B041]" />
                      </h2>
                      <p className="text-xs sm:text-sm text-white/60">숲속의바다 특별 이벤트</p>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {activeEvents.map((event, idx) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 + 0.2 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

                    <div className="relative bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-colors">
                      {/* Badge */}
                      {event.badge && (
                        <div
                          className="absolute -top-2 -right-2 px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-lg"
                          style={{ backgroundColor: event.color }}
                        >
                          {event.badge}
                        </div>
                      )}

                      {/* Event Title */}
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${event.color}20` }}
                        >
                          <Calendar className="w-4 h-4" style={{ color: event.color }} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-white text-sm sm:text-base leading-tight">
                            {event.title}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-1">
                            <Clock className="w-3 h-3 text-white/40" />
                            <span className="text-xs text-white/50">{event.period}</span>
                          </div>
                        </div>
                      </div>

                      {/* Highlight */}
                      {event.highlight && (
                        <div
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg mb-3 text-sm font-bold"
                          style={{
                            backgroundColor: `${event.color}15`,
                            color: event.color
                          }}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          {event.highlight}
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-3">
                        {event.description}
                      </p>

                      {/* Conditions */}
                      {event.conditions && event.conditions.length > 0 && (
                        <div className="space-y-1">
                          {event.conditions.map((cond, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-white/40">
                              <ChevronRight className="w-3 h-3 flex-shrink-0 mt-0.5" />
                              <span>{cond}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Logo */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex justify-center pt-2"
                >
                  <img
                    src="http://www.woodinsea.com/html/img/common/logo.png"
                    alt="숲속의바다 펜션"
                    className="h-8 sm:h-10 opacity-60"
                  />
                </motion.div>
              </div>

              {/* Footer */}
              <div className="p-4 sm:p-5 bg-black/20 border-t border-white/10">
                <div className="flex items-center justify-between gap-4">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div
                      onClick={() => setDontShowToday(!dontShowToday)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        dontShowToday
                          ? "bg-[#4A9F6D] border-[#4A9F6D]"
                          : "border-white/30 group-hover:border-white/50"
                      }`}
                    >
                      {dontShowToday && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className="text-xs sm:text-sm text-white/60 group-hover:text-white/80 transition-colors">
                      24시간 동안 열지 않음
                    </span>
                  </label>

                  <button
                    onClick={handleClose}
                    className="px-4 sm:px-6 py-2 sm:py-2.5 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs sm:text-sm font-medium transition-colors"
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
