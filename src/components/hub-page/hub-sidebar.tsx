"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Phone, Globe, MapPin, ArrowUpRight } from "lucide-react";
import {
  CtaButtonExternalLink,
  CtaOutlineButton,
} from "@/components/shared/cta-button";
import { AppStoreModal } from "@/components/shared/app-store-modal";
import {
  APP_STORE_URL,
  PLAY_STORE_URL,
  getDevicePlatform,
} from "@/lib/store-links";
import { buildHubSocialLinks } from "@/utils/hub-social-links";
import { isOpenNow } from "@/utils/business-hours";

interface HubSidebarProps {
  hub: {
    primaryType?: string | null;
    images: string[];
    phone?: string | null;
    website?: string | null;
    address: string;
    latitude: number;
    longitude: number;
    socialLinks?: Record<string, string> | null;
    businessHours?: unknown;
  };
  translations: {
    openNow: string;
    closedNow: string;
    getDirections: string;
    contact: string;
    phone: string;
    website: string;
    address: string;
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
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer hover:opacity-80"
      >
        {content}
      </a>
    );
  }
  return content;
}

export function HubSidebar({ hub, translations: t }: HubSidebarProps) {
  const [showStoreModal, setShowStoreModal] = useState(false);

  const socialLinks = buildHubSocialLinks(hub.socialLinks);
  const open = isOpenNow(hub.businessHours);

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${hub.latitude},${hub.longitude}`;

  const handleContactClick = useCallback(() => {
    if (hub.phone) {
      window.location.href = `tel:${hub.phone}`;
    } else {
      const platform = getDevicePlatform();
      if (platform === "ios") {
        window.location.href = APP_STORE_URL;
      } else if (platform === "android") {
        window.location.href = PLAY_STORE_URL;
      } else {
        setShowStoreModal(true);
      }
    }
  }, [hub.phone]);

  return (
    <>
      <div className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-[0px_128px_36px_0px_rgba(0,0,0,0),0px_82px_33px_0px_rgba(0,0,0,0),0px_46px_28px_0px_rgba(0,0,0,0.02),0px_21px_21px_0px_rgba(0,0,0,0.03),0px_5px_11px_0px_rgba(0,0,0,0.03)]">
        {/* Hub type + Open/Closed status */}
        <div className="flex items-start justify-between">
          {hub.primaryType && (
            <h3 className="text-lg font-semibold text-[#252827]">
              {hub.primaryType}
            </h3>
          )}
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-sm font-semibold ${
              open
                ? "border-[#CDD0CE] text-[#404644]"
                : "border-[#CDD0CE] text-[#8E9290]"
            }`}
          >
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                open ? "bg-[#00A068]" : "bg-[#8E9290]"
              }`}
            />
            {open ? t.openNow : t.closedNow}
          </span>
        </div>

        {/* Hub image */}
        {hub.images.length > 0 && (
          <div className="relative h-[120px] w-full overflow-hidden rounded-2xl">
            <Image
              src={hub.images[0]}
              alt="Hub"
              fill
              className="object-cover"
              sizes="364px"
              loading="eager"
            />
          </div>
        )}

        {/* Contact info */}
        <div className="flex flex-col gap-2">
          {hub.phone && (
            <ContactInfoRow
              icon={Phone}
              label={t.phone}
              value={hub.phone}
              href={`tel:${hub.phone}`}
            />
          )}
          {hub.website && (
            <ContactInfoRow
              icon={Globe}
              label={t.website}
              value={hub.website.replace(/^https?:\/\//, "")}
              href={
                hub.website.startsWith("http")
                  ? hub.website
                  : `https://${hub.website}`
              }
            />
          )}
          <ContactInfoRow
            icon={MapPin}
            label={t.address}
            value={hub.address}
            href={directionsUrl}
          />
        </div>

        {/* Social links */}
        {socialLinks.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.key}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="flex cursor-pointer items-center rounded-lg border border-[#EDEEED] p-2 transition-colors hover:bg-[#FAFAFA]"
              >
                {link.iconPath ? (
                  <Image
                    src={link.iconPath}
                    alt={link.label}
                    width={24}
                    height={24}
                  />
                ) : (
                  <span
                    className="h-6 w-6 text-[#252827]"
                    dangerouslySetInnerHTML={{ __html: link.svgHtml }}
                  />
                )}
              </a>
            ))}
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4">
          <CtaButtonExternalLink href={directionsUrl} glow>
            {t.getDirections}
            <ArrowUpRight className="h-5 w-5" />
          </CtaButtonExternalLink>
          <CtaOutlineButton
            onClick={handleContactClick}
            className="w-full"
          >
            {t.contact}
          </CtaOutlineButton>
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
