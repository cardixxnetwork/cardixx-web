"use client";

import { useCallback, useState } from "react";
import { CtaButton } from "@/components/shared/cta-button";
import { AppStoreModal } from "@/components/shared/app-store-modal";
import {
  APP_STORE_URL,
  PLAY_STORE_URL,
  getDevicePlatform,
} from "@/lib/store-links";

interface MobileBottomCtaProps {
  label: string;
  appStore: string;
  googlePlay: string;
  getTheApp: string;
}

export function MobileBottomCta({
  label,
  appStore,
  googlePlay,
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

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-20 lg:hidden">
        <div className="bg-linear-to-t from-white via-white/80 to-transparent px-6 pb-6 pt-10">
          <CtaButton onClick={handleClick} className="w-full">
            {label}
          </CtaButton>
        </div>
      </div>

      <AppStoreModal
        isOpen={showStoreModal}
        onClose={() => setShowStoreModal(false)}
        translations={{
          getTheApp,
          appStore,
          googlePlay,
        }}
      />
    </>
  );
}
