"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { Link } from "@/i18n/navigation";

interface CtaButtonBaseProps {
  children: ReactNode;
  className?: string;
  /** Show the green glow element below the button */
  glow?: boolean;
}

interface CtaButtonProps extends CtaButtonBaseProps {
  onClick?: () => void;
}

interface CtaButtonLinkProps extends CtaButtonBaseProps {
  href: string;
}

const BG_GRADIENT = "radial-gradient(ellipse at 50% 0%, #11BE82, #00A068)";

const OUTLINE_BUTTON_CLASS =
  "relative flex h-12 shrink-0 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full border border-[#8E9290] px-8 text-base font-semibold whitespace-nowrap text-[#252827]";

export function useSpotlight() {
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hovering, setHovering] = useState(false);

  const onMouseMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return { ref, pos, hovering, onMouseMove, setHovering };
}

const BUTTON_CLASS =
  "relative flex h-12 shrink-0 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-8 text-base font-semibold whitespace-nowrap text-white";

function SpotlightOverlay({ x, y, visible, variant = "filled" }: { x: number; y: number; visible: boolean; variant?: "filled" | "outline" }) {
  const bg =
    variant === "outline"
      ? `radial-gradient(circle at ${x}% ${y}%, rgba(0,0,0,0.06) 0%, transparent 55%)`
      : `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.22) 0%, transparent 55%)`;

  return (
    <span
      className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0, background: bg }}
    />
  );
}

export function CtaButton({ children, onClick, className, glow }: CtaButtonProps) {
  const { ref, pos, hovering, onMouseMove, setHovering } = useSpotlight();

  return (
    <div className="flex flex-col items-center">
      <button
        ref={ref as React.RefObject<HTMLButtonElement>}
        type="button"
        onClick={onClick}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={{ background: BG_GRADIENT }}
        className={`${BUTTON_CLASS} ${glow ? "z-2 mb-[-24px] w-full" : ""} ${className ?? ""}`}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        <SpotlightOverlay x={pos.x} y={pos.y} visible={hovering} />
      </button>
      {glow && (
        <div className="z-1 mx-6 h-6 w-full overflow-hidden rounded-[26px]">
          <div className="h-full w-full bg-white opacity-60 shadow-[0_0_24px_0_#1cb982]" />
        </div>
      )}
    </div>
  );
}

export function CtaOutlineButton({ children, onClick, className }: Omit<CtaButtonProps, "glow">) {
  const { ref, pos, hovering, onMouseMove, setHovering } = useSpotlight();

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`${OUTLINE_BUTTON_CLASS} ${className ?? ""}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <SpotlightOverlay x={pos.x} y={pos.y} visible={hovering} variant="outline" />
    </button>
  );
}

export function CtaOutlineButtonLink({ children, href, className }: Omit<CtaButtonLinkProps, "glow">) {
  const { ref, pos, hovering, onMouseMove, setHovering } = useSpotlight();

  return (
    <Link
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={href}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`${OUTLINE_BUTTON_CLASS} ${className ?? ""}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <SpotlightOverlay x={pos.x} y={pos.y} visible={hovering} variant="outline" />
    </Link>
  );
}

export function CtaButtonLink({ children, href, className, glow }: CtaButtonLinkProps) {
  const { ref, pos, hovering, onMouseMove, setHovering } = useSpotlight();

  return (
    <div className="flex flex-col items-center">
      <Link
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={{ background: BG_GRADIENT }}
        className={`${BUTTON_CLASS} ${glow ? "z-2 mb-[-24px] w-full" : ""} ${className ?? ""}`}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        <SpotlightOverlay x={pos.x} y={pos.y} visible={hovering} />
      </Link>
      {glow && (
        <div className="z-1 mx-6 h-6 w-full overflow-hidden rounded-[26px]">
          <div className="h-full w-full bg-white opacity-60 shadow-[0_0_24px_0_#1cb982]" />
        </div>
      )}
    </div>
  );
}
