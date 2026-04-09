import Image from "next/image";
import type { CardFullFragment } from "@/graphql/generated/graphql";

interface CompanySectionProps {
  card: CardFullFragment;
  industryLabel: string;
  specialtiesLabel: string;
}

export function CompanySection({ card, industryLabel, specialtiesLabel }: CompanySectionProps) {
  if (!card.companyName && !card.about && !card.companyLogo) {
    return null;
  }

  return (
    <section id="company" className="scroll-mt-[80px] space-y-4">
      <h2 className="text-xl font-semibold text-[#252827]">Company</h2>

      {card.companyLogo && (
        <div className="h-12 w-52">
          <Image
            src={card.companyLogo}
            alt={card.companyName ?? "Company"}
            width={208}
            height={48}
            className="h-full w-auto object-contain"
          />
        </div>
      )}

      {card.companyName && (
        <p className="text-base font-semibold text-[#404644]">{card.companyName}</p>
      )}

      {card.about && (
        <p className="whitespace-pre-line text-base leading-relaxed text-[#404644]">
          {card.about}
        </p>
      )}

      {/* Industry / Specialties detail rows */}
      <div className="flex flex-col gap-6 pt-4">
        {card.industry && (
          <div className="flex gap-6">
            <span className="w-[160px] shrink-0 text-sm font-semibold text-[#8E9290]">
              {industryLabel}
            </span>
            <p className="min-w-0 flex-1 text-base text-[#404644]">{card.industry}</p>
          </div>
        )}
        {card.specialties && (card.specialties as string[]).length > 0 && (
          <div className="flex gap-6">
            <span className="w-[160px] shrink-0 text-sm font-semibold text-[#8E9290]">
              {specialtiesLabel}
            </span>
            <p className="min-w-0 flex-1 text-base text-[#404644]">
              {(card.specialties as string[]).join(', ')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
