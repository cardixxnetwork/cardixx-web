"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Card design dimensions — themes use viewport width=342 for consistency
const ORIGINAL_CARD_WIDTH = 342;
const ORIGINAL_CARD_HEIGHT = 195;

interface CardHeroProps {
  frontHtml: string;
  backHtml?: string;
  name: string;
  flipHint?: string;
}

export function CardHero({ frontHtml, backHtml, name, flipHint }: CardHeroProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerStartX = useRef(0);
  const shouldReduceMotion = useReducedMotion();
  const hasBack = !!backHtml;

  // Compute scale to fit the container width while maintaining aspect ratio
  useEffect(() => {
    function updateScale() {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      setScale(containerWidth / ORIGINAL_CARD_WIDTH);
    }

    updateScale();

    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!hasBack) return;
      const deltaX = e.clientX - pointerStartX.current;
      if (Math.abs(deltaX) > 30) {
        if (deltaX < 0 && !isFlipped) setIsFlipped(true);
        else if (deltaX > 0 && isFlipped) setIsFlipped(false);
      } else {
        setIsFlipped((prev) => !prev);
      }
    },
    [isFlipped, hasBack]
  );

  const flipDuration = shouldReduceMotion ? 0 : 0.6;

  // The container takes full width; height is derived from aspect ratio × scale
  const scaledHeight = ORIGINAL_CARD_HEIGHT * scale;

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: scaledHeight,
          perspective: hasBack ? 1000 : undefined,
          cursor: hasBack ? "pointer" : undefined,
        }}
        onPointerDown={hasBack ? handlePointerDown : undefined}
        onPointerUp={hasBack ? handlePointerUp : undefined}
      >
        {hasBack ? (
          <motion.div
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{
              duration: flipDuration,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 overflow-hidden rounded-2xl shadow-xl"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <iframe
                srcDoc={frontHtml}
                title={`${name} card front`}
                sandbox="allow-same-origin"
                className="border-0"
                style={{
                  width: ORIGINAL_CARD_WIDTH,
                  height: ORIGINAL_CARD_HEIGHT,
                  transform: `scale(${scale})`,
                  transformOrigin: "0 0",
                }}
              />
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 overflow-hidden rounded-2xl shadow-xl"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <iframe
                srcDoc={backHtml}
                title={`${name} card back`}
                sandbox="allow-same-origin"
                className="border-0"
                style={{
                  width: ORIGINAL_CARD_WIDTH,
                  height: ORIGINAL_CARD_HEIGHT,
                  transform: `scale(${scale})`,
                  transformOrigin: "0 0",
                }}
              />
            </div>
          </motion.div>
        ) : (
          <div className="overflow-hidden rounded-2xl shadow-xl w-full h-full">
            <iframe
              srcDoc={frontHtml}
              title={`${name} card front`}
              sandbox="allow-same-origin"
              className="border-0"
              style={{
                width: ORIGINAL_CARD_WIDTH,
                height: ORIGINAL_CARD_HEIGHT,
                transform: `scale(${scale})`,
                transformOrigin: "0 0",
              }}
            />
          </div>
        )}
      </div>

      {hasBack && (
        <p className="mt-2 text-center text-xs text-gray-400 select-none">
          {flipHint ?? "Click or swipe to flip"}
        </p>
      )}
    </div>
  );
}
