import Image from "next/image";
import type { CardFullFragment } from "@/graphql/generated/graphql";

interface CompanyTabProps {
  card: CardFullFragment;
  industryLabel: string;
  specialtiesLabel: string;
}

export function CompanyTab({ card, industryLabel, specialtiesLabel }: CompanyTabProps) {
  if (!card.companyName && !card.about && !card.companyLogo) {
    return null;
  }

  return (
    <div className="space-y-5">
      {card.companyLogo && (
        <div className="w-20">
          <Image
            src={card.companyLogo}
            alt={card.companyName ?? "Company"}
            width={80}
            height={80}
            className="h-auto w-full rounded-lg object-contain"
          />
        </div>
      )}

      {card.companyName && (
        <h2 className="text-lg font-bold text-gray-900">{card.companyName}</h2>
      )}

      {card.about && (
        <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">
          {card.about}
        </p>
      )}

      {card.industry && (
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            {industryLabel}
          </span>
          <p className="mt-1 text-sm text-gray-700">{card.industry}</p>
        </div>
      )}

      {card.specialties && (
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            {specialtiesLabel}
          </span>
          <p className="mt-1 text-sm text-gray-700">{card.specialties}</p>
        </div>
      )}
    </div>
  );
}
