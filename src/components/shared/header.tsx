"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { LanguageSelector } from "./language-selector";
import { MobileNav } from "./mobile-nav";
import { CtaButtonLink } from "./cta-button";

const NAV_LINKS = [
  { key: "networkingHubs", href: "/networking-hubs" },
  { key: "pricing", href: "/pricing" },
  { key: "blog", href: "/blog" },
] as const;

function HamburgerButton({
  isOpen,
  onClick,
  label,
}: {
  isOpen: boolean;
  onClick: () => void;
  label: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 300, damping: 22 };

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative z-60 flex size-10 flex-col items-center justify-center gap-[5px] lg:hidden"
      aria-label={label}
      aria-expanded={isOpen}
    >
      <motion.span
        animate={
          isOpen
            ? { rotate: 45, y: 7, backgroundColor: "#252827" }
            : { rotate: 0, y: 0, backgroundColor: "#252827" }
        }
        transition={transition}
        className="block h-[2px] w-5 rounded-full"
      />
      <motion.span
        animate={
          isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
        }
        transition={transition}
        className="block h-[2px] w-5 rounded-full bg-[#252827]"
      />
      <motion.span
        animate={
          isOpen
            ? { rotate: -45, y: -7, backgroundColor: "#252827" }
            : { rotate: 0, y: 0, backgroundColor: "#252827" }
        }
        transition={transition}
        className="block h-[2px] w-5 rounded-full"
      />
    </button>
  );
}

export function Header() {
  const t = useTranslations("header");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 0);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileNav = useCallback(() => {
    setMobileNavOpen((prev) => !prev);
  }, []);

  const closeMobileNav = useCallback(() => {
    setMobileNavOpen(false);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md transition-shadow duration-300",
          scrolled && "shadow-[0_8px_17px_rgba(0,0,0,0.05)]",
        )}
      >
        <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-8 lg:px-[120px]">
          {/* Left: Nav links (desktop) */}
          <div className="hidden min-w-0 flex-1 lg:flex">
            <ul className="flex items-center gap-6">
              {NAV_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="whitespace-nowrap text-sm font-semibold leading-5 text-[#252827] transition-colors hover:text-brand-dark"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile: hamburger (left side) */}
          <HamburgerButton
            isOpen={mobileNavOpen}
            onClick={toggleMobileNav}
            label={mobileNavOpen ? t("closeMenu") : t("menu")}
          />

          {/* Center: Logo */}
          <Link
            href="/"
            className="shrink-0"
            aria-label="Cardixx Home"
          >
            <Logo className="h-10 w-auto md:h-12 lg:h-14" />
          </Link>

          {/* Right: Language selector + CTA (desktop) */}
          <div className="hidden min-w-0 flex-1 items-center justify-end gap-3 lg:flex">
            <LanguageSelector />

            <CtaButtonLink href="/#start" className="w-auto shrink-0 px-8 text-sm">
              {t("startNetworking")}
            </CtaButtonLink>
          </div>

          {/* Mobile: placeholder for layout balance */}
          <div className="w-10 lg:hidden" />
        </nav>
      </header>

      {/* Mobile navigation overlay */}
      <MobileNav isOpen={mobileNavOpen} onClose={closeMobileNav} />
    </>
  );
}
