"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SLIDE_KEYS = [
  "join",
  "create",
  "checkIn",
  "discover",
  "connect",
  "measure",
] as const;

const MIN_INDEX = 1;
const MAX_INDEX = SLIDE_KEYS.length - 2;

const SLIDE_COLORS = [
  "#0FCB77",
  "#11BE82",
  "#04C294",
  "#2AB57E",
  "#00A068",
  "#049A79",
];

interface SlideData {
  key: string;
  title: string;
  shortTitle: string;
  description: string;
  shortDescription: string;
  color: string;
  image: string;
}

export function HeroCarousel() {
  const t = useTranslations("hero");
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(MIN_INDEX);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef(0);

  const slides: SlideData[] = SLIDE_KEYS.map((key, i) => ({
    key,
    title: t(`${key}.title`),
    shortTitle: t(`${key}.shortTitle`),
    description: t(`${key}.description`),
    shortDescription: t(`${key}.shortDescription`),
    color: SLIDE_COLORS[i],
    image: `/carousel/${i + 1}.png`,
  }));

  const nextLabel = t("next");
  const tryLabel = t("tryYourself");

  const goNext = useCallback(() => {
    if (activeIndex < MAX_INDEX) {
      setDirection(1);
      setActiveIndex((prev) => prev + 1);
    }
  }, [activeIndex]);

  const goPrev = useCallback(() => {
    if (activeIndex > MIN_INDEX) {
      setDirection(-1);
      setActiveIndex((prev) => prev - 1);
    }
  }, [activeIndex]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (diff > 50) goNext();
      else if (diff < -50) goPrev();
    },
    [goNext, goPrev],
  );

  const prev = slides[activeIndex - 1];
  const active = slides[activeIndex];
  const next = slides[activeIndex + 1];
  const isLast = activeIndex === MAX_INDEX;

  return (
    <div className="mx-auto max-w-[1392px] px-5 md:px-8 min-[1344px]:px-0">
      {/* SEO: all slide content in DOM for crawlers */}
      <div className="sr-only">
        {slides.map((s) => (
          <div key={s.key}>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </div>
        ))}
      </div>

      <div
        className="flex items-stretch gap-4 lg:gap-6"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Prev collapsed card — visible only when viewport fits all 3 cards */}
        <div className="hidden w-[276px] shrink-0 min-[1344px]:block">
          <CollapsedCard
            slide={prev}
            shouldReduceMotion={shouldReduceMotion ?? false}
          />
        </div>

        {/* Active expanded card — static container, inner content animates */}
        <div className="min-w-0 flex-1">
          <ExpandedCard
            slide={active}
            direction={direction}
            isLast={isLast}
            canGoPrev={activeIndex > MIN_INDEX}
            onNext={goNext}
            onPrev={goPrev}
            nextLabel={nextLabel}
            tryLabel={tryLabel}
            shouldReduceMotion={shouldReduceMotion ?? false}
          />
        </div>

        {/* Next collapsed card — visible only when viewport fits all 3 cards */}
        <div className="hidden w-[276px] shrink-0 min-[1344px]:block">
          <CollapsedCard
            slide={next}
            shouldReduceMotion={shouldReduceMotion ?? false}
          />
        </div>
      </div>

      {/* Mobile: dot indicators */}
      <div className="mt-6 flex justify-center gap-2 lg:hidden">
        {SLIDE_KEYS.slice(MIN_INDEX, MAX_INDEX + 1).map((key, i) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setDirection(i + MIN_INDEX > activeIndex ? 1 : -1);
              setActiveIndex(i + MIN_INDEX);
            }}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i + MIN_INDEX === activeIndex
                ? "w-8 bg-brand-dark"
                : "w-2 bg-[#AEB1AF]",
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Collapsed side card ────────────────────────────────── */

function CollapsedCard({
  slide,
  shouldReduceMotion,
}: {
  slide: SlideData;
  shouldReduceMotion: boolean;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-[#E5E7E6] bg-white p-6">
      <div className="mb-10 text-center">
        <h3
          className="font-semibold text-brand-dark"
          style={{ fontSize: "clamp(20px, 1.944vw, 28px)", lineHeight: "clamp(26px, 2.5vw, 36px)" }}
        >
          {slide.shortTitle}
        </h3>
        <p
          className="mt-1 font-semibold text-[#8E9290]"
          style={{ fontSize: "clamp(12px, 0.972vw, 14px)", lineHeight: "clamp(16px, 1.389vw, 20px)" }}
        >
          {slide.shortDescription}
        </p>
      </div>

      {/* Phone mockup with real image */}
      <div className="flex justify-center">
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.key}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              transition={shouldReduceMotion ? { duration: 0.05 } : { duration: 0.3, ease: "easeInOut" }}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                width={366}
                height={656}
                className="h-auto w-full translate-x-[18px]"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ─── Expanded center card ───────────────────────────────── */

function ExpandedCard({
  slide,
  direction,
  isLast,
  canGoPrev,
  onNext,
  onPrev,
  nextLabel,
  tryLabel,
  shouldReduceMotion,
}: {
  slide: SlideData;
  direction: number;
  isLast: boolean;
  canGoPrev: boolean;
  onNext: () => void;
  onPrev: () => void;
  nextLabel: string;
  tryLabel: string;
  shouldReduceMotion: boolean;
}) {
  const textVariants = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.05 } },
        exit: { opacity: 0, transition: { duration: 0.05 } },
      }
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
      };

  const imageVariants = shouldReduceMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1, transition: { duration: 0.05 } },
        exit: { opacity: 0, transition: { duration: 0.05 } },
      }
    : {
        enter: (d: number) => ({
          x: d > 0 ? 120 : -120,
          opacity: 0,
        }),
        center: {
          x: 0,
          opacity: 1,
          transition: {
            type: "spring" as const,
            damping: 25,
            stiffness: 200,
          },
        },
        exit: (d: number) => ({
          x: d > 0 ? -120 : 120,
          opacity: 0,
          transition: {
            type: "spring" as const,
            damping: 30,
            stiffness: 300,
          },
        }),
      };

  return (
    <div className="relative flex h-full min-h-[480px] gap-4 overflow-hidden rounded-3xl bg-white p-6 lg:min-h-[700px]">
      {/* Gradient background */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[220px]"
        style={{
          background:
            "linear-gradient(0deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%), radial-gradient(42.32% 99.77% at 81.63% 100%, #D0FF62 0%, rgba(255, 255, 255, 0.00) 100%), linear-gradient(90deg, #16B9A4 0%, #45D272 100%)",
        }}
      />

      {/* Left: text content — fade animation, vertically centered */}
      <div className="relative z-10 flex flex-1 flex-col justify-between lg:max-w-[50%]">
        <div className="flex flex-1 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.key}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <h3
                className="font-semibold text-brand-dark"
                style={{ fontSize: "clamp(24px, 3.333vw, 48px)", lineHeight: "clamp(30px, 4.167vw, 60px)" }}
              >
                {slide.title}
              </h3>
              <p
                className="mt-3 max-w-md font-medium text-[#252827] lg:mt-4"
                style={{ fontSize: "clamp(14px, 1.25vw, 18px)", lineHeight: "clamp(20px, 1.806vw, 26px)" }}
              >
                {slide.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation — pinned to bottom */}
        <div className="mb-12 flex items-center gap-3 pt-8">
          <button
            type="button"
            onClick={canGoPrev ? onPrev : undefined}
            disabled={!canGoPrev}
            className="flex size-12 items-center justify-center rounded-full border border-[#E5E7E6] text-[#8E9290] transition-colors hover:border-brand hover:text-brand-dark disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[#E5E7E6] disabled:hover:text-[#8E9290]"
            aria-label="Previous slide"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={isLast ? undefined : onNext}
            className="flex h-12 items-center gap-2 rounded-full bg-gradient-to-b from-brand-light to-brand-dark px-8 text-sm font-semibold text-white transition-shadow hover:shadow-[0_0_24px_rgba(28,185,130,0.5)]"
          >
            {isLast ? tryLabel : nextLabel}
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      {/* Right: phone image — slides R-to-L, vertically centered, hidden on mobile */}
      <div className="relative z-10 hidden items-center justify-center overflow-visible lg:flex lg:w-[50%]">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={slide.key}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              width={366}
              height={656}
              className="h-auto w-full translate-x-[18px]"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
