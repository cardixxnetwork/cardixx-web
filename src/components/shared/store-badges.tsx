import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/store-links";

interface StoreBadgesProps {
  variant: "badge" | "button";
  labels: { appStore: string; googlePlay: string };
  className?: string;
}

export function StoreBadges({ variant, labels, className }: StoreBadgesProps) {
  if (variant === "badge") {
    return (
      <div
        className={className ?? "flex flex-wrap justify-center gap-4"}
      >
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 cursor-pointer items-center gap-2.5 rounded-xl bg-[#252827] px-5 transition-opacity hover:opacity-90"
          aria-label={labels.appStore}
        >
          <AppleIcon />
          <div className="text-left">
            <div className="text-[10px] leading-tight text-white/70">
              Download on the
            </div>
            <div className="text-sm font-semibold leading-tight text-white">
              App Store
            </div>
          </div>
        </a>
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 cursor-pointer items-center gap-2.5 rounded-xl bg-[#252827] px-5 transition-opacity hover:opacity-90"
          aria-label={labels.googlePlay}
        >
          <GooglePlayIcon />
          <div className="text-left">
            <div className="text-[10px] leading-tight text-white/70">
              GET IT ON
            </div>
            <div className="text-sm font-semibold leading-tight text-white">
              Google Play
            </div>
          </div>
        </a>
      </div>
    );
  }

  // variant === "button"
  return (
    <div className={className ?? "space-y-3"}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        <AppleIconMono />
        {labels.appStore}
      </a>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        <GooglePlayIconMono />
        {labels.googlePlay}
      </a>
    </div>
  );
}

/* ─── Badge variant icons (colored) ─────────────────────── */

function AppleIcon() {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="white">
      <path d="M16.52 12.58c-.03-2.85 2.33-4.22 2.44-4.29-1.33-1.94-3.4-2.21-4.13-2.24-1.76-.18-3.43 1.03-4.32 1.03-.89 0-2.27-1.01-3.73-.98-1.92.03-3.69 1.12-4.68 2.84-2 3.46-.51 8.59 1.43 11.4.95 1.37 2.08 2.92 3.57 2.86 1.43-.06 1.97-.93 3.7-.93s2.22.93 3.73.9c1.54-.03 2.52-1.4 3.46-2.78 1.09-1.59 1.54-3.13 1.57-3.21-.03-.01-3.01-1.16-3.04-4.6ZM13.71 4.21c.79-.96 1.32-2.29 1.18-3.62-1.14.05-2.52.76-3.34 1.71-.73.85-1.37 2.2-1.2 3.5 1.27.1 2.57-.65 3.36-1.59Z" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg width="22" height="24" viewBox="0 0 22 24" fill="none">
      <path
        d="M1.22 0.58C0.93 0.88 0.75 1.35 0.75 1.97v20.06c0 0.62 0.18 1.09 0.47 1.39l0.07 0.07 11.23-11.23v-0.26L1.29 0.51 1.22 0.58Z"
        fill="#4285F4"
      />
      <path
        d="M16.26 15.99L12.52 12.26v-0.26l3.74-3.74 0.08 0.05 4.43 2.52c1.27 0.72 1.27 1.89 0 2.61l-4.43 2.52-0.08 0.05Z"
        fill="#FBBC04"
      />
      <path
        d="M16.35 15.95L12.52 12.13 1.22 23.42c0.42 0.44 1.1 0.5 1.88 0.06l13.25-7.53Z"
        fill="#EA4335"
      />
      <path
        d="M16.35 8.31L3.1 0.78C2.32 0.34 1.64 0.4 1.22 0.84l11.3 11.29 3.83-3.82Z"
        fill="#34A853"
      />
    </svg>
  );
}

/* ─── Button variant icons (monochrome white) ───────────── */

function AppleIconMono() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function GooglePlayIconMono() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.6l2.573 1.49c.486.282.486.983 0 1.265l-2.573 1.49-2.573-2.623 2.573-2.622zM5.864 2.658L16.8 8.99l-2.302 2.302-8.635-8.635z" />
    </svg>
  );
}
