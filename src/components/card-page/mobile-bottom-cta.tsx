"use client";

import { useCallback, useState, useEffect } from "react";
import { CtaButton } from "@/components/shared/cta-button";

const APP_STORE_URL = "https://apps.apple.com/app/cardixx";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.cardixx";

type DevicePlatform = "ios" | "android" | "desktop";

function getDevicePlatform(): DevicePlatform {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  if (/Android/.test(ua)) return "android";
  return "desktop";
}

interface MobileBottomCtaProps {
  label: string;
  downloadOnAppStore: string;
  getItOnGooglePlay: string;
  getTheApp: string;
}

export function MobileBottomCta({
  label,
  downloadOnAppStore,
  getItOnGooglePlay,
  getTheApp,
}: MobileBottomCtaProps) {
  const [showStoreModal, setShowStoreModal] = useState(false);

  const handleClick = useCallback(() => {
    const platform = getDevicePlatform();
    if (platform === "ios") {
      window.location.href = APP_STORE_URL;
    } else if (platform === "android") {
      window.location.href = PLAY_STORE_URL;
    } else {
      setShowStoreModal(true);
    }
  }, []);

  useEffect(() => {
    if (!showStoreModal) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setShowStoreModal(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showStoreModal]);

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-20 lg:hidden">
        <div className="bg-linear-to-t from-white via-white/80 to-transparent px-6 pb-6 pt-10">
          <CtaButton onClick={handleClick} className="w-full">
            {label}
          </CtaButton>
        </div>
      </div>

      {showStoreModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setShowStoreModal(false)}
        >
          <div
            className="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-center text-lg font-semibold text-gray-900">
              {getTheApp}
            </h3>
            <div className="mt-5 space-y-3">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                {downloadOnAppStore}
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                {getItOnGooglePlay}
              </a>
            </div>
            <button
              type="button"
              onClick={() => setShowStoreModal(false)}
              className="mt-4 w-full text-center text-sm text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
