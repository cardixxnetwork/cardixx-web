import type { CardFullFragment } from "@/graphql/generated/graphql";

interface AboutTabProps {
  card: CardFullFragment;
  skillsLabel: string;
}

export function AboutTab({ card, skillsLabel }: AboutTabProps) {
  const fullName = [card.prefix, card.firstName, card.middleName, card.lastName, card.suffix]
    .filter(Boolean)
    .join(" ");

  const skills = card.specialties
    ?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">{fullName}</h2>
        {card.bio && (
          <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-600">
            {card.bio}
          </p>
        )}
      </div>

      {skills && skills.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{skillsLabel}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
