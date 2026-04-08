"use client";

import { Modal } from "./modal";
import { StoreBadges } from "./store-badges";

interface AppStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  translations: {
    getTheApp: string;
    downloadOnAppStore: string;
    getItOnGooglePlay: string;
  };
}

export function AppStoreModal({
  isOpen,
  onClose,
  translations,
}: AppStoreModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-center text-lg font-semibold text-gray-900">
        {translations.getTheApp}
      </h3>
      <div className="mt-5">
        <StoreBadges
          variant="button"
          labels={{
            appStore: translations.downloadOnAppStore,
            googlePlay: translations.getItOnGooglePlay,
          }}
        />
      </div>
      <button
        type="button"
        onClick={onClose}
        className="mt-4 w-full cursor-pointer text-center text-sm text-gray-400 hover:text-gray-600"
      >
        &times;
      </button>
    </Modal>
  );
}
