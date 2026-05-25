"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CARD_BORDER_RADIUS,
  ORIGINAL_CARD_HEIGHT,
  ORIGINAL_CARD_WIDTH,
} from "@cardixx/card-schema";

interface FlipCardProps {
  frontHtml: string;
  backHtml: string;
  /** Desired display width (the iframe scales via CSS transform) */
  width: number;
  /** Desired display height (the iframe scales via CSS transform) */
  height: number;
}

export function FlipCard({ frontHtml, backHtml, width, height }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const pointerStartX = useRef(0);
  const shouldReduceMotion = useReducedMotion();

  // Compute scale from desired display size to original card size
  const scale = Math.min(
    width / ORIGINAL_CARD_WIDTH,
    height / ORIGINAL_CARD_HEIGHT
  );

  // Actual rendered dimensions after scaling (maintains aspect ratio)
  const renderedWidth = ORIGINAL_CARD_WIDTH * scale;
  const renderedHeight = ORIGINAL_CARD_HEIGHT * scale;

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      const deltaX = e.clientX - pointerStartX.current;
      if (Math.abs(deltaX) > 30) {
        if (deltaX < 0 && !isFlipped) setIsFlipped(true);
        else if (deltaX > 0 && isFlipped) setIsFlipped(false);
      } else {
        handleFlip();
      }
    },
    [isFlipped, handleFlip]
  );

  const flipDuration = shouldReduceMotion ? 0 : 0.6;

  return (
    <div
      className="select-none"
      style={{
        perspective: 1000,
        width: renderedWidth,
        height: renderedHeight,
        cursor: "pointer",
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
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
        {/* Front face */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderRadius: CARD_BORDER_RADIUS * scale,
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
          }}
        >
          <iframe
            srcDoc={frontHtml}
            title="Card front"
            sandbox="allow-same-origin"
            className="border-0"
            style={{
              width: ORIGINAL_CARD_WIDTH,
              height: ORIGINAL_CARD_HEIGHT,
              transform: `scale(${scale})`,
              transformOrigin: "0 0",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Back face */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: CARD_BORDER_RADIUS * scale,
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
          }}
        >
          <iframe
            srcDoc={backHtml}
            title="Card back"
            sandbox="allow-same-origin"
            className="border-0"
            style={{
              width: ORIGINAL_CARD_WIDTH,
              height: ORIGINAL_CARD_HEIGHT,
              transform: `scale(${scale})`,
              transformOrigin: "0 0",
              pointerEvents: "none",
            }}
          />
        </div>
      </motion.div>

      <p className="mt-3 text-center text-xs text-gray-400 select-none">
        Click or swipe to flip
      </p>
    </div>
  );
}
