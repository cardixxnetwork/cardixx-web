interface HubCommentsSectionProps {
  noCommentsLabel: string;
}

export function HubCommentsSection({
  noCommentsLabel,
}: HubCommentsSectionProps) {
  // Comments will be wired to a backend query in the future.
  // For now, render an empty state.
  return (
    <section id="comments" className="scroll-mt-[80px] space-y-4">
      <h2 className="text-xl font-semibold text-[#252827]">Comments</h2>
      <p className="text-base text-[#8E9290]">{noCommentsLabel}</p>
    </section>
  );
}
