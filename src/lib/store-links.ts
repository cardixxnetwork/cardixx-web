export const APP_STORE_URL = "https://apps.apple.com/app/cardixx";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.cardixx";

export type DevicePlatform = "ios" | "android" | "desktop";

export function getDevicePlatform(): DevicePlatform {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  if (/Android/.test(ua)) return "android";
  return "desktop";
}
