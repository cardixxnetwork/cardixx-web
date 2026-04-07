"use client";

import { useState, useRef } from "react";

const ORIGINAL_CARD_WIDTH = 342;
const ORIGINAL_CARD_HEIGHT = 195;

interface InteractiveCardProps {
  frontHtml: string;
  backHtml?: string;
  scale: number;
}

const thickness = 2;
const edgeColor = "#cbd5e1";
const mouseSensitivity = 10;
const lighting = { glow: 15, shadow: 45 };

export function InteractiveCard({
  frontHtml,
  backHtml,
  scale,
}: InteractiveCardProps) {
  const [flipAngle, setFlipAngle] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStart = useRef({ x: 0 });

  const hasBack = !!backHtml;
  const width = ORIGINAL_CARD_WIDTH * scale;
  const height = ORIGINAL_CARD_HEIGHT * scale;

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX };
    setTilt({ x: 0, y: 0 });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const offset = e.clientX - dragStart.current.x;
    const rect = e.currentTarget.getBoundingClientRect();
    setLightPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
    if (offset > 85) { setIsDragging(false); setFlipAngle(prev => prev + 180); setDragOffset(0); return; }
    if (offset < -85) { setIsDragging(false); setFlipAngle(prev => prev - 180); setDragOffset(0); return; }
    setDragOffset(offset);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 40) setFlipAngle(prev => prev + 180);
    else if (dragOffset < -40) setFlipAngle(prev => prev - 180);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLightPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    setTilt({
      x: ((y - rect.height / 2) / (rect.height / 2)) * -mouseSensitivity,
      y: ((x - rect.width / 2) / (rect.width / 2)) * mouseSensitivity,
    });
  };

  const tiltX = isDragging ? 0 : (isHovering ? tilt.x : 0);
  const tiltY = isDragging ? 0 : (isHovering ? tilt.y : 0);
  const flipY = flipAngle + (isDragging ? dragOffset / 2.5 : 0);

  const ambientBg = `linear-gradient(135deg, rgba(255,255,255,${lighting.glow / 100}) 0%, transparent 50%, rgba(0,0,0,${lighting.shadow / 100}) 100%)`;
  const dynamicBg = `radial-gradient(circle at ${100 - lightPos.x}% ${100 - lightPos.y}%, rgba(255,255,255,${lighting.glow / 100}) 0%, rgba(0,0,0,${lighting.shadow / 100}) 150%)`;

  return (
    <div
      style={{ width, height, perspective: 1200 }}
      className="relative touch-none select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => { setIsHovering(false); setTilt({ x: 0, y: 0 }); }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div
        className="h-full w-full transition-transform duration-500 ease-out"
        style={{ transformStyle: "preserve-3d", transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)` }}
      >
        {/* Flip container */}
        <div
          className="absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${flipY}deg)`,
            transition: isDragging ? "none" : "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        >
          {/* Ground shadow — inside flip container so it rotates with the card */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{
              backgroundColor: "#000000",
              opacity: 0.15,
              filter: "blur(30px)",
              transform: `translateZ(${-thickness - 40}px) translateY(25px) scale(0.95)`,
            }}
          />

          {/* Edge layers */}
          {Array.from({ length: thickness * 2 - 1 }).map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-3xl"
              style={{ backgroundColor: edgeColor, transform: `translateZ(${-thickness + i + 1}px)` }}
            />
          ))}

          {/* FRONT FACE */}
          <div
            className="absolute inset-0 rounded-3xl bg-white overflow-hidden"
            style={{ backfaceVisibility: "hidden", transform: `translateZ(${thickness}px)` }}
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
            {/* Ambient light (base) */}
            <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: ambientBg }} />
            {/* Dynamic light (fade in/out) */}
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out"
              style={{ opacity: isHovering || isDragging ? 1 : 0, background: dynamicBg }}
            />
          </div>

          {/* BACK FACE */}
          <div
            className="absolute inset-0 rounded-3xl bg-slate-900 overflow-hidden"
            style={{ backfaceVisibility: "hidden", transform: `rotateY(180deg) translateZ(${thickness}px)` }}
          >
            {hasBack ? (
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
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-sm font-bold tracking-widest text-white">CARDIXX</span>
              </div>
            )}
            {/* Ambient light (base) */}
            <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: ambientBg }} />
            {/* Dynamic light (fade in/out) */}
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out"
              style={{ opacity: isHovering || isDragging ? 1 : 0, background: dynamicBg }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
