interface HubAboutSectionProps {
  name: string;
  description: string;
}

export function HubAboutSection({ name, description }: HubAboutSectionProps) {
  return (
    <section id="about" className="scroll-mt-[80px] space-y-4">
      <h2 className="text-xl font-semibold text-[#252827]">{name}</h2>
      <p className="whitespace-pre-line text-base leading-relaxed text-[#404644]">
        {description}
      </p>
    </section>
  );
}
