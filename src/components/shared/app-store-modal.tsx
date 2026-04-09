"use client";

import { Modal } from "./modal";
import { StoreBadges } from "./store-badges";

interface AppStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  translations: {
    getTheApp: string;
    appStore: string;
    googlePlay: string;
  };
}

export function AppStoreModal({
  isOpen,
  onClose,
  translations,
}: AppStoreModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="relative mx-4 w-full max-w-[280px] rounded-3xl bg-white p-6 shadow-2xl"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        aria-label="Close"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M1 1l12 12M13 1L1 13" />
        </svg>
      </button>

      <p className="text-center text-sm font-medium text-gray-500">
        {translations.getTheApp}
      </p>

      <StoreBadges
        variant="badge"
        labels={{
          appStore: translations.appStore,
          googlePlay: translations.googlePlay,
        }}
        className="mt-5 flex flex-col gap-3"
      />
    </Modal>
  );
}
