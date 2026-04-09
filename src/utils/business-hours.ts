const DAY_KEYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

const DAY_LABELS: Record<string, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export interface DaySchedule {
  key: string;
  label: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

type RawDayEntry = {
  isOpen?: boolean;
  openTime?: string;
  closeTime?: string;
};

function asRecord(
  bh: unknown
): Record<string, RawDayEntry> | null {
  if (!bh || typeof bh !== "object" || Array.isArray(bh)) return null;
  return bh as Record<string, RawDayEntry>;
}

export function parseBusinessHours(
  businessHours: unknown
): DaySchedule[] {
  const raw = asRecord(businessHours);
  if (!raw) return [];

  // Display in Monday–Sunday order
  const ordered = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return ordered.map((key) => {
    const entry = raw[key];
    return {
      key,
      label: DAY_LABELS[key] ?? key,
      isOpen: entry?.isOpen ?? false,
      openTime: entry?.openTime ?? "",
      closeTime: entry?.closeTime ?? "",
    };
  });
}

export function isOpenNow(businessHours: unknown): boolean {
  const raw = asRecord(businessHours);
  if (!raw) return false;

  const now = new Date();
  const dayKey = DAY_KEYS[now.getDay()];
  const entry = raw[dayKey];
  if (!entry?.isOpen || !entry.openTime || !entry.closeTime) return false;

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const [openH, openM] = entry.openTime.split(":").map(Number);
  const [closeH, closeM] = entry.closeTime.split(":").map(Number);
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}

export function getTodayKey(): string {
  return DAY_KEYS[new Date().getDay()];
}
