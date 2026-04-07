import type { CardFullFragment } from "@/graphql/generated/graphql";

interface AboutSectionProps {
  card: CardFullFragment;
  skillsLabel: string;
}

export function AboutSection({ card, skillsLabel }: AboutSectionProps) {
  const fullName = [card.prefix, card.firstName, card.middleName, card.lastName, card.suffix]
    .filter(Boolean)
    .join(" ");

  const skills = card.specialties
    ?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <section id="about" className="scroll-mt-[80px] space-y-6">
      {/* Name & Bio */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-[#252827]">{fullName}</h2>
        {card.bio && (
          <p className="whitespace-pre-line text-base leading-relaxed text-[#404644]">
            {card.bio}
          </p>
        )}
      </div>

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div>
          <h3 className="text-base font-semibold text-[#404644]">{skillsLabel}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-2xl bg-[#EDEEED] px-4 py-1 text-sm font-medium text-[#252827]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
