"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Phone, Mail, Globe, MapPin } from "lucide-react";
import type { CardFullFragment } from "@/graphql/generated/graphql";

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
  return (
    <div className="flex items-start gap-3 text-sm">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
      <div className="min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all text-gray-700 hover:text-[#2AB57E]"
          >
            {value}
          </a>
        ) : (
          <p className="break-all text-gray-700">{value}</p>
        )}
      </div>
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2AB57E] text-white transition-opacity hover:opacity-80"
    >
      {children}
    </a>
  );
}

function getInitials(firstName?: string | null, lastName?: string | null) {
  const f = firstName?.charAt(0)?.toUpperCase() ?? "";
  const l = lastName?.charAt(0)?.toUpperCase() ?? "";
  return f + l || "?";
}

function buildSocialUrl(value: string, baseUrl: string): string {
  return value.startsWith("http") ? value : `${baseUrl}${value}`;
}

const SOCIAL_PLATFORMS: {
  key: keyof CardFullFragment;
  label: string;
  baseUrl: string;
  svg: string;
}[] = [
  {
    key: "whatsapp",
    label: "WhatsApp",
    baseUrl: "https://wa.me/",
    svg: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    baseUrl: "https://linkedin.com/in/",
    svg: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    key: "instagram",
    label: "Instagram",
    baseUrl: "https://instagram.com/",
    svg: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z",
  },
  {
    key: "x",
    label: "X",
    baseUrl: "https://x.com/",
    svg: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    key: "facebook",
    label: "Facebook",
    baseUrl: "https://facebook.com/",
    svg: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    key: "telegram",
    label: "Telegram",
    baseUrl: "https://t.me/",
    svg: "M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.492-1.302.48-.428-.012-1.252-.242-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
  },
  {
    key: "youtube",
    label: "YouTube",
    baseUrl: "https://youtube.com/@",
    svg: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    key: "github",
    label: "GitHub",
    baseUrl: "https://github.com/",
    svg: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  {
    key: "tiktok",
    label: "TikTok",
    baseUrl: "https://tiktok.com/@",
    svg: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
  {
    key: "threads",
    label: "Threads",
    baseUrl: "https://threads.net/@",
    svg: "M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.432 1.781 3.632 2.695 6.54 2.717 2.227-.017 4.048-.59 5.413-1.703 1.587-1.295 2.087-3.065 1.494-5.27-.385-1.428-1.2-2.117-2.069-2.501a4.635 4.635 0 01-.559 2.019c-.588 1.028-1.554 1.78-2.712 2.11-1.105.317-2.377.261-3.48-.154-1.477-.555-2.572-1.74-2.928-3.17-.255-1.02-.175-2.11.225-3.064.533-1.27 1.57-2.188 2.92-2.584 1.07-.314 2.194-.305 3.21.024 0 0-.014-.679-.021-1.022l2.082-.056c.02.773.054 1.545.054 1.545.876.42 1.584.997 2.097 1.716.758 1.065 1.118 2.42 1.069 4.03.05 2.76-1.024 5.028-3.1 6.548C17.662 23.23 15.248 23.98 12.186 24zm.084-8.21c.667 0 1.302-.142 1.825-.376.779-.349 1.331-.91 1.596-1.623.175-.474.237-1.005.175-1.535-.086-.724-.456-1.35-1.072-1.81-.487-.366-1.122-.574-1.79-.587-.56-.012-1.118.1-1.598.326-.66.312-1.132.832-1.367 1.505-.174.498-.2 1.04-.075 1.568.202.86.86 1.57 1.762 1.9.44.165.906.258 1.376.258l.168-.001v-.625z",
  },
];

function AppStoreModal({
  onClose,
  translations,
}: {
  onClose: () => void;
  translations: { downloadOnAppStore: string; getItOnGooglePlay: string; getTheApp: string };
}) {
  // Close on Escape
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

  // Build social links from card data
  const socialLinks: {
    key: string;
    url: string;
    label: string;
    svg: string;
  }[] = [];

  for (const platform of SOCIAL_PLATFORMS) {
    const value = card[platform.key] as string | null | undefined;
    if (!value) continue;

    let url: string;
    if (platform.key === "whatsapp" && !value.startsWith("http")) {
      url = `${platform.baseUrl}${value.replace(/\D/g, "")}`;
    } else {
      url = buildSocialUrl(value, platform.baseUrl);
    }

    socialLinks.push({
      key: platform.key as string,
      url,
      label: platform.label,
      svg: platform.svg,
    });
  }

  return (
    <>
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        {/* Profile Photo */}
        <div className="flex flex-col items-center text-center">
          <div className="relative h-24 w-24 overflow-hidden rounded-full bg-[#2AB57E]">
            {card.profilePhoto ? (
              <Image
                src={card.profilePhoto}
                alt={fullName}
                fill
                className="object-cover"
                sizes="96px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-white">
                {getInitials(card.firstName, card.lastName)}
              </div>
            )}
          </div>

          <h1 className="mt-4 text-xl font-bold text-gray-900">{fullName}</h1>
          {(card.jobTitle || card.headline) && (
            <p className="mt-1 text-sm text-gray-500">
              {card.jobTitle || card.headline}
            </p>
          )}
        </div>

        {/* Company Logo */}
        {card.companyLogo && (
          <div className="mt-5 overflow-hidden rounded-xl">
            <Image
              src={card.companyLogo}
              alt={card.companyName ?? "Company"}
              width={400}
              height={100}
              className="h-auto w-full object-contain"
            />
          </div>
        )}

        {/* Contact Info */}
        <div className="mt-6 space-y-4">
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
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {socialLinks.map((link) => (
              <SocialIcon key={link.key} href={link.url} label={link.label}>
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d={link.svg} />
                </svg>
              </SocialIcon>
            ))}
          </div>
        )}

        {/* CTA Buttons */}
        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={handleCtaClick}
            className="w-full rounded-full bg-[#2AB57E] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#239e6d]"
          >
            {t.saveToWallet}
          </button>
          <button
            type="button"
            onClick={handleCtaClick}
            className="w-full rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            {t.sendContactRequest}
          </button>
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
