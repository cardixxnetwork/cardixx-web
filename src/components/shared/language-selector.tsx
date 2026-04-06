"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

const LOCALE_DATA: Record<Locale, { label: string; flag: string }> = {
  en: { label: "English", flag: "🇬🇧" },
  tr: { label: "Türkçe", flag: "🇹🇷" },
  de: { label: "Deutsch", flag: "🇩🇪" },
};

interface LanguageSelectorProps {
  className?: string;
  variant?: "default" | "mobile";
}

export function LanguageSelector({
  className,
  variant = "default",
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLocale(newLocale: Locale) {
    setIsOpen(false);
    router.replace(pathname, { locale: newLocale });
  }

  const isMobile = variant === "mobile";
  const current = LOCALE_DATA[locale];

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 rounded-full border border-[#AEB1AF] text-sm font-semibold text-[#252827] transition-colors hover:border-[#8E9290]",
          isMobile ? "h-12 px-5" : "h-12 w-[140px] px-5",
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="flex-1 text-left">{current.label}</span>
        <ChevronDown
          className={cn(
            "size-4 text-[#8E9290] transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: isMobile ? 8 : -8 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: isMobile ? 8 : -8 }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.15, ease: "easeOut" }
            }
            className={cn(
              "absolute z-50 max-h-[280px] overflow-y-auto rounded-2xl border border-[#AEB1AF]/30 bg-white py-2 shadow-xl",
              isMobile
                ? "bottom-full left-0 mb-2 w-[200px]"
                : "right-0 top-full mt-2 w-[200px]",
            )}
            role="listbox"
            aria-activedescendant={locale}
          >
            {locales.map((l) => {
              const data = LOCALE_DATA[l];
              return (
                <button
                  key={l}
                  type="button"
                  role="option"
                  aria-selected={l === locale}
                  onClick={() => switchLocale(l)}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-[#EDEEED]",
                    l === locale
                      ? "font-semibold text-brand-dark"
                      : "font-medium text-[#252827]",
                  )}
                >
                  <span className="text-base leading-none">{data.flag}</span>
                  <span>{data.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
