"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Phone, Mail, Globe, MapPin } from "lucide-react";
import type { CardFullFragment } from "@/graphql/generated/graphql";
import { buildSocialLinks } from "@/utils/social-platforms";
import { CtaButton, CtaOutlineButton } from "@/components/shared/cta-button";

const APP_STORE_URL = "https://apps.apple.com/app/cardixx";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.cardixx";

type DevicePlatform = "ios" | "android" | "desktop";

function getDevicePlatform(): DevicePlatform {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  if (/Android/.test(ua)) return "android";
  return "desktop";
}

interface ProfileSidebarProps {
  card: CardFullFragment;
  translations: {
    phone: string;
    email: string;
    website: string;
    location: string;
    saveToWallet: string;
    sendContactRequest: string;
    downloadOnAppStore: string;
    getItOnGooglePlay: string;
    getTheApp: string;
  };
}

function ContactInfoRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-2">
      <div className="flex shrink-0 items-center rounded-lg border border-[#EDEEED] p-2">
        <Icon className="h-6 w-6 text-[#252827]" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-[#8E9290]">{label}</p>
        <p className="truncate text-sm font-medium text-[#252827]">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block hover:opacity-80">
        {content}
      </a>
    );
  }
  return content;
}

function getInitials(firstName?: string | null, lastName?: string | null) {
  const f = firstName?.charAt(0)?.toUpperCase() ?? "";
  const l = lastName?.charAt(0)?.toUpperCase() ?? "";
  return f + l || "?";
}

/* ─── Video embed helpers ─── */

/** Extract YouTube video ID from various URL formats */
function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match?.[1] ?? null;
}

/** Extract Vimeo video ID */
function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match?.[1] ?? null;
}

/** Check if URL is a direct video file */
function isDirectVideo(url: string): boolean {
  return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url);
}

function VideoPlayer({ url }: { url: string }) {
  const youtubeId = getYouTubeId(url);
  if (youtubeId) {
    return (
      <div className="relative w-full overflow-hidden rounded-lg pt-[56.25%]">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
          title="Video"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  const vimeoId = getVimeoId(url);
  if (vimeoId) {
    return (
      <div className="relative w-full overflow-hidden rounded-lg pt-[56.25%]">
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?dnt=1`}
          title="Video"
          allow="fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  if (isDirectVideo(url)) {
    return (
      <video
        src={url}
        controls
        preload="none"
        playsInline
        className="w-full rounded-lg"
      />
    );
  }

  // Fallback: try as direct video
  return (
    <video
      src={url}
      controls
      preload="none"
      playsInline
      className="w-full rounded-lg"
    />
  );
}

function AppStoreModal({
  onClose,
  translations,
}: {
  onClose: () => void;
  translations: { downloadOnAppStore: string; getItOnGooglePlay: string; getTheApp: string };
}) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-center text-lg font-semibold text-gray-900">
          {translations.getTheApp}
        </h3>
        <div className="mt-5 space-y-3">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            {translations.downloadOnAppStore}
          </a>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.6l2.573 1.49c.486.282.486.983 0 1.265l-2.573 1.49-2.573-2.623 2.573-2.622zM5.864 2.658L16.8 8.99l-2.302 2.302-8.635-8.635z" />
            </svg>
            {translations.getItOnGooglePlay}
          </a>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full text-center text-sm text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export function ProfileSidebar({ card, translations: t }: ProfileSidebarProps) {
  const [showStoreModal, setShowStoreModal] = useState(false);

  const fullName = [
    card.prefix,
    card.firstName,
    card.middleName,
    card.lastName,
    card.suffix,
  ]
    .filter(Boolean)
    .join(" ");

  const websiteUrl = card.companyWebsite || card.personalWebsite;

  const handleCtaClick = useCallback(() => {
    const platform = getDevicePlatform();
    if (platform === "ios") {
      window.location.href = APP_STORE_URL;
    } else if (platform === "android") {
      window.location.href = PLAY_STORE_URL;
    } else {
      setShowStoreModal(true);
    }
  }, []);

  const socialLinks = buildSocialLinks(card as unknown as Record<string, unknown>);

  return (
    <>
      <div className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-[0px_128px_36px_0px_rgba(0,0,0,0),0px_82px_33px_0px_rgba(0,0,0,0),0px_46px_28px_0px_rgba(0,0,0,0.02),0px_21px_21px_0px_rgba(0,0,0,0.03),0px_5px_11px_0px_rgba(0,0,0,0.03)]">
        {/* Profile header: avatar + name/title */}
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
            {card.profilePhoto ? (
              <Image
                src={card.profilePhoto}
                alt={fullName}
                fill
                className="object-cover"
                sizes="80px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-brand text-xl font-bold text-white">
                {getInitials(card.firstName, card.lastName)}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-semibold text-[#252827]">{fullName}</h2>
            {(card.jobTitle || card.headline) && (
              <p className="text-base font-medium text-[#4E5552]">
                {card.jobTitle || card.headline}
              </p>
            )}
          </div>
        </div>

        {/* Video or Company Image */}
        {card.videoLink ? (
          <VideoPlayer url={card.videoLink} />
        ) : card.companyLogo ? (
          <div className="overflow-hidden rounded-lg">
            <Image
              src={card.companyLogo}
              alt={card.companyName ?? "Company"}
              width={364}
              height={206}
              className="h-auto w-full object-cover"
            />
          </div>
        ) : null}

        {/* Contact Info */}
        <div className="flex flex-col gap-2">
          {card.companyPhone && (
            <ContactInfoRow
              icon={Phone}
              label={t.phone}
              value={card.companyPhone}
              href={`tel:${card.companyPhone}`}
            />
          )}
          {card.companyEmail && (
            <ContactInfoRow
              icon={Mail}
              label={t.email}
              value={card.companyEmail}
              href={`mailto:${card.companyEmail}`}
            />
          )}
          {websiteUrl && (
            <ContactInfoRow
              icon={Globe}
              label={t.website}
              value={websiteUrl.replace(/^https?:\/\//, "")}
              href={
                websiteUrl.startsWith("http")
                  ? websiteUrl
                  : `https://${websiteUrl}`
              }
            />
          )}
          {card.location && (
            <ContactInfoRow
              icon={MapPin}
              label={t.location}
              value={card.location}
            />
          )}
        </div>

        {/* Social Icons */}
        {socialLinks.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.key}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="flex items-center rounded-lg border border-[#EDEEED] p-2 transition-colors hover:bg-[#FAFAFA]"
              >
                {link.iconPath ? (
                  <Image src={link.iconPath} alt={link.label} width={24} height={24} className="h-6 w-6" />
                ) : (
                  <span className="h-6 w-6 text-[#252827]" dangerouslySetInnerHTML={{ __html: link.svgHtml }} />
                )}
              </a>
            ))}
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4">
          <CtaButton onClick={handleCtaClick} glow>
            {t.saveToWallet}
          </CtaButton>

          <CtaOutlineButton onClick={handleCtaClick} className="w-full">
            {t.sendContactRequest}
          </CtaOutlineButton>
        </div>
      </div>

      {showStoreModal && (
        <AppStoreModal
          onClose={() => setShowStoreModal(false)}
          translations={{
            downloadOnAppStore: t.downloadOnAppStore,
            getItOnGooglePlay: t.getItOnGooglePlay,
            getTheApp: t.getTheApp,
          }}
        />
      )}
    </>
  );
}
