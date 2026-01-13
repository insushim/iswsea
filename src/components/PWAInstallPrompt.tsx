"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, RefreshCw, Smartphone } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const LAST_UPDATE_VERSION_KEY = "woodinsea-last-update-version";
const APP_VERSION = "1.0.0";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    const isInStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as typeof window.navigator & { standalone?: boolean })
        .standalone === true;
    setIsStandalone(isInStandaloneMode);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      if (!isInStandaloneMode) {
        setTimeout(() => setShowInstallPrompt(true), 3000);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then((registration) => {
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                const lastVersion = localStorage.getItem(
                  LAST_UPDATE_VERSION_KEY
                );
                if (lastVersion !== APP_VERSION) {
                  setShowUpdatePrompt(true);
                }
              }
            });
          }
        });
      });

      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data && event.data.type === "SW_UPDATED") {
          const lastVersion = localStorage.getItem(LAST_UPDATE_VERSION_KEY);
          if (lastVersion !== event.data.version) {
            setShowUpdatePrompt(true);
          }
        }
      });
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
    setShowInstallPrompt(false);
  };

  const handleUpdateClick = () => {
    localStorage.setItem(LAST_UPDATE_VERSION_KEY, APP_VERSION);
    setShowUpdatePrompt(false);
    window.location.reload();
  };

  const dismissUpdate = () => {
    setShowUpdatePrompt(false);
  };

  const dismissInstall = () => {
    setShowInstallPrompt(false);
  };

  const shouldShowInstall =
    showInstallPrompt && !isStandalone && (deferredPrompt || isIOS);

  return (
    <>
      <AnimatePresence>
        {shouldShowInstall && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-4 sm:max-w-sm"
          >
            <div className="bg-[#1a2332] rounded-2xl shadow-2xl border border-[#2a3a4a] p-4 backdrop-blur-lg">
              <button
                onClick={dismissInstall}
                className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4A9F6D] to-[#6BBF8D] flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 pr-6">
                  <h3 className="text-white font-bold text-base mb-1">
                    Install App
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Add to home screen for quick access
                  </p>

                  {isIOS ? (
                    <div className="text-xs text-gray-500">
                      <span className="text-[#4A9F6D]">Safari</span>{" "}
                      <span className="inline-flex items-center gap-1 bg-gray-700 px-1.5 py-0.5 rounded">
                        Share
                      </span>{" "}
                      then Add to Home Screen
                    </div>
                  ) : (
                    <button
                      onClick={handleInstallClick}
                      className="flex items-center gap-2 px-4 py-2 bg-[#4A9F6D] hover:bg-[#3d8a5c] text-white rounded-lg font-medium text-sm transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Install
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showUpdatePrompt && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed top-4 left-4 right-4 z-50 sm:left-auto sm:right-4 sm:max-w-sm"
          >
            <div className="bg-gradient-to-r from-[#4A9F6D] to-[#6BBF8D] rounded-2xl shadow-2xl p-4">
              <button
                onClick={dismissUpdate}
                className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 pr-6">
                  <h3 className="text-white font-bold text-base mb-1">
                    Update Available
                  </h3>
                  <p className="text-white/80 text-sm mb-3">
                    A new version is ready
                  </p>
                  <button
                    onClick={handleUpdateClick}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-[#4A9F6D] rounded-lg font-bold text-sm transition-colors hover:bg-white/90"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Update Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
