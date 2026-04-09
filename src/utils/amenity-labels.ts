interface AmenityDef {
  label: string;
  category: string;
}

const AMENITY_MAP: Record<string, AmenityDef> = {
  wifi: { label: "Wi-Fi", category: "Workspace" },
  private_desks: { label: "Private Desks", category: "Workspace" },
  power_outlets: { label: "Power Outlets", category: "Workspace" },
  quiet_zone: { label: "Quiet Zone", category: "Workspace" },
  meeting_rooms: { label: "Meeting Rooms", category: "Workspace" },
  pet_friendly: { label: "Pet Friendly", category: "Comfort & Space" },
  outdoor_seating: { label: "Outdoor Seating", category: "Comfort & Space" },
  specialty_coffee: { label: "Specialty Coffee", category: "Comfort & Space" },
  wheelchair_accessible: {
    label: "Wheelchair Accessible",
    category: "Accessibility",
  },
  bike_parking: { label: "Bike Parking", category: "Accessibility" },
  parking: { label: "Parking", category: "Accessibility" },
};

export interface AmenityGroup {
  category: string;
  items: { slug: string; label: string }[];
}

export function getAmenityLabel(slug: string): string {
  return AMENITY_MAP[slug]?.label ?? slug.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function groupAmenities(slugs: string[]): AmenityGroup[] {
  const groups = new Map<string, { slug: string; label: string }[]>();

  for (const slug of slugs) {
    const def = AMENITY_MAP[slug];
    const category = def?.category ?? "Other";
    const label = def?.label ?? getAmenityLabel(slug);

    if (!groups.has(category)) {
      groups.set(category, []);
    }
    groups.get(category)!.push({ slug, label });
  }

  return Array.from(groups.entries()).map(([category, items]) => ({
    category,
    items,
  }));
}
