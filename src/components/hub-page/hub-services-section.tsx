import { CheckCircle } from "lucide-react";
import {
  parseBusinessHours,
  getTodayKey,
} from "@/utils/business-hours";
import { groupAmenities } from "@/utils/amenity-labels";

interface HubServicesSectionProps {
  amenities: string[];
  businessHours: unknown;
  translations: {
    services: string;
    workingHours: string;
    amenities: string;
  };
}

export function HubServicesSection({
  amenities,
  businessHours,
  translations: t,
}: HubServicesSectionProps) {
  const schedule = parseBusinessHours(businessHours);
  const todayKey = getTodayKey();
  const amenityGroups = groupAmenities(amenities);

  return (
    <section id="services" className="scroll-mt-[80px] space-y-6">
      <h2 className="text-xl font-semibold text-[#252827]">{t.services}</h2>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Working Hours */}
        {schedule.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-[#404644]">
              {t.workingHours}
            </h3>
            <div className="text-base text-[#404644]">
              {schedule.map((day) => (
                <p
                  key={day.key}
                  className={`leading-7 ${
                    day.key === todayKey ? "font-semibold" : "font-normal"
                  }`}
                >
                  {day.label}:{" "}
                  {day.isOpen
                    ? `${day.openTime} - ${day.closeTime}`
                    : "Closed"}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Amenities */}
        {amenityGroups.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-[#404644]">
              {t.amenities}
            </h3>
            <div className="flex flex-col gap-2">
              {amenityGroups.map((group) => (
                <div key={group.category}>
                  <p className="mb-2 text-base font-semibold text-[#8E9290]">
                    {group.category}
                  </p>
                  {group.items.map((item) => (
                    <div
                      key={item.slug}
                      className="flex items-center gap-1 py-0.5"
                    >
                      <CheckCircle className="h-5 w-5 shrink-0 text-[#00A068]" />
                      <span className="text-base font-medium text-[#252827]">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
