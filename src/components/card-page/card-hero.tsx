"use client";

import { useState, useRef, useEffect } from "react";
import { InteractiveCard } from "./interactive-card";

const ORIGINAL_CARD_WIDTH = 342;
const MAX_SCALE = 513 / ORIGINAL_CARD_WIDTH; // ~1.5x

interface CardHeroProps {
  frontHtml: string;
  backHtml?: string;
  name: string;
}

export function CardHero({ frontHtml, backHtml }: CardHeroProps) {
  const [scale, setScale] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updateScale() {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      setScale(Math.min(containerWidth / ORIGINAL_CARD_WIDTH, MAX_SCALE));
    }

    updateScale();

    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div ref={containerRef} className="w-full max-w-[513px]">
        <InteractiveCard
          frontHtml={frontHtml}
          backHtml={backHtml}
          scale={scale}
        />
      </div>
    </div>
  );
}
