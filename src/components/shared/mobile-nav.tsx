"use client";

import { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "./logo";
import { LanguageSelector } from "./language-selector";

const NAV_LINKS = [
  { key: "networkingHubs", href: "/#networking-hubs" },
  { key: "pricing", href: "/pricing" },
  { key: "blog", href: "/blog" },
  { key: "faq", href: "/#faq" },
] as const;

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const panelVariants = {
  hidden: { x: "100%" },
  visible: {
    x: "0%",
    transition: { type: "spring" as const, damping: 25, stiffness: 300 },
  },
  exit: {
    x: "100%",
    transition: { type: "spring" as const, damping: 30, stiffness: 400 },
  },
};

const panelVariantsReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
  exit: { opacity: 0, transition: { duration: 0 } },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const listVariantsReduced = {
  hidden: {},
  visible: { transition: { staggerChildren: 0 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, damping: 20, stiffness: 300 },
  },
};

const itemVariantsReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
};

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const t = useTranslations("header");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const activePanel = shouldReduceMotion
    ? panelVariantsReduced
    : panelVariants;
  const activeList = shouldReduceMotion ? listVariantsReduced : listVariants;
  const activeItem = shouldReduceMotion ? itemVariantsReduced : itemVariants;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="mobile-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={
              shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }
            }
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel — full width */}
          <motion.nav
            key="mobile-nav-panel"
            variants={activePanel}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex h-dvh w-full flex-col overflow-y-auto bg-white lg:hidden"
            aria-label="Mobile navigation"
          >
            {/* Top bar with logo + close */}
            <div className="flex items-center justify-between px-5 py-4 md:px-8">
              <Link href="/" onClick={onClose} aria-label="Cardixx Home">
                <Logo width={120} height={47} />
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-[#EDEEED]"
                aria-label={t("closeMenu")}
              >
                <X className="size-6 text-[#252827]" strokeWidth={2} />
              </button>
            </div>

            {/* Logo watermark */}
            <div className="pointer-events-none absolute bottom-8 right-6 opacity-[0.03]">
              <Logo width={240} height={94} />
            </div>

            {/* Nav links */}
            <motion.ul
              variants={activeList}
              initial="hidden"
              animate="visible"
              className="flex shrink-0 flex-col gap-1 px-5 py-8 md:px-8"
            >
              {NAV_LINKS.map(({ key, href }) => (
                <motion.li key={key} variants={activeItem}>
                  <Link
                    href={href}
                    onClick={onClose}
                    className="group flex items-center justify-between rounded-2xl px-4 py-5 text-2xl font-semibold text-[#252827] transition-colors hover:bg-[#EDEEED]"
                  >
                    <span>{t(key)}</span>
                    <ArrowRight className="size-5 translate-x-0 text-[#8E9290] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            {/* Bottom section */}
            <motion.div
              variants={activeItem}
              initial="hidden"
              animate="visible"
              className="mt-auto flex shrink-0 flex-col gap-4 px-5 pb-8 md:px-8"
            >
              <LanguageSelector variant="mobile" />

              <Link
                href="/#start"
                onClick={onClose}
                className="flex h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-brand-light to-brand-dark text-base font-semibold text-white"
              >
                {t("startNetworking")}
                <ArrowRight className="size-5" />
              </Link>
            </motion.div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
