"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Phone, Mail, Globe, MapPin } from "lucide-react";
import type { CardFullFragment } from "@/graphql/generated/graphql";
import { buildSocialLinks } from "@/utils/social-platforms";
import { CtaButton } from "@/components/shared/cta-button";
import { AppStoreModal } from "@/components/shared/app-store-modal";
import {
  APP_STORE_URL,
  PLAY_STORE_URL,
  getDevicePlatform,
} from "@/lib/store-links";

interface ProfileSidebarProps {
  card: CardFullFragment;
  translations: {
    phone: string;
    email: string;
    website: string;
    location: string;
    saveToWallet: string;
    sendContactRequest: string;
    appStore: string;
    googlePlay: string;
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
                  <Image src={link.iconPath} alt={link.label} width={24} height={24} className="w-6" />
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
          {/* TODO: Do not delete, this will be activated later on when we have send contact request feature on cardixx-core */}
          {/* <CtaOutlineButton onClick={handleCtaClick} className="w-full">
            {t.sendContactRequest}
          </CtaOutlineButton> */}
        </div>
      </div>

      <AppStoreModal
        isOpen={showStoreModal}
        onClose={() => setShowStoreModal(false)}
        translations={{
          appStore: t.appStore,
          googlePlay: t.googlePlay,
          getTheApp: t.getTheApp,
        }}
      />
    </>
  );
}
