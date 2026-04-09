export default function CardLoading() {
  return (
    <main className="animate-pulse pb-28 lg:pb-8">
      {/* ─── Card Hero (centered, both layouts) ─── */}
      <div className="mx-auto max-w-6xl px-4 pt-8 lg:px-8">
        <div className="mx-auto max-w-[513px]">
          <div className="aspect-[342/195] w-full rounded-3xl bg-gray-200" />
        </div>
      </div>

      {/* ─── Mobile Layout ─── */}
      <div className="mx-auto max-w-6xl px-6 lg:hidden">
        {/* Profile info */}
        <div className="mt-6 flex items-center gap-4">
          <div className="h-14 w-14 shrink-0 rounded-full bg-gray-200" />
          <div className="min-w-0 flex-1">
            <div className="h-6 w-40 rounded bg-gray-200" />
            <div className="mt-1 h-5 w-28 rounded bg-gray-200" />
          </div>
        </div>

        {/* Social icons */}
        <div className="mt-4 flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-[#EDEEED] p-2">
              <div className="h-6 w-6 rounded bg-gray-200" />
            </div>
          ))}
        </div>

        {/* Bio */}
        <div className="mt-6 space-y-2">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-3/4 rounded bg-gray-200" />
        </div>

        {/* Contact info */}
        <div className="mt-6 flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex shrink-0 items-center rounded-lg border border-[#EDEEED] p-2">
                <div className="h-6 w-6 rounded bg-gray-200" />
              </div>
              <div className="min-w-0">
                <div className="h-3 w-12 rounded bg-gray-200" />
                <div className="mt-1 h-4 w-32 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>

        {/* Divider + Company section */}
        <hr className="my-8 border-[#EDEEED]" />
        <div className="space-y-4">
          <div className="h-6 w-24 rounded bg-gray-200" />
          <div className="h-12 w-52 rounded bg-gray-200" />
          <div className="h-5 w-36 rounded bg-gray-200" />
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-2/3 rounded bg-gray-200" />
          </div>
          <div className="flex flex-col gap-6 pt-4">
            <div className="flex gap-6">
              <div className="h-4 w-[160px] shrink-0 rounded bg-gray-200" />
              <div className="h-4 flex-1 rounded bg-gray-200" />
            </div>
            <div className="flex gap-6">
              <div className="h-4 w-[160px] shrink-0 rounded bg-gray-200" />
              <div className="h-4 flex-1 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Desktop Layout: two columns ─── */}
      <div className="mx-auto hidden max-w-6xl px-8 pt-8 lg:grid lg:grid-cols-[1fr_412px] lg:gap-8">
        {/* Left column: all sections */}
        <div>
          {/* About section */}
          <div className="space-y-6">
            <div className="flex flex-col gap-4">
              <div className="h-6 w-48 rounded bg-gray-200" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-3/4 rounded bg-gray-200" />
              </div>
            </div>
            {/* Skills */}
            <div>
              <div className="h-5 w-16 rounded bg-gray-200" />
              <div className="mt-3 flex flex-wrap gap-2">
                <div className="h-7 w-[72px] rounded-2xl bg-gray-200" />
                <div className="h-7 w-[96px] rounded-2xl bg-gray-200" />
                <div className="h-7 w-[80px] rounded-2xl bg-gray-200" />
                <div className="h-7 w-[104px] rounded-2xl bg-gray-200" />
                <div className="h-7 w-[64px] rounded-2xl bg-gray-200" />
              </div>
            </div>
          </div>

          {/* Divider + Company section */}
          <hr className="my-8 border-[#EDEEED]" />
          <div className="space-y-4">
            <div className="h-6 w-24 rounded bg-gray-200" />
            <div className="h-12 w-52 rounded bg-gray-200" />
            <div className="h-5 w-36 rounded bg-gray-200" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-2/3 rounded bg-gray-200" />
            </div>
            <div className="flex flex-col gap-6 pt-4">
              <div className="flex gap-6">
                <div className="h-4 w-[160px] shrink-0 rounded bg-gray-200" />
                <div className="h-4 flex-1 rounded bg-gray-200" />
              </div>
              <div className="flex gap-6">
                <div className="h-4 w-[160px] shrink-0 rounded bg-gray-200" />
                <div className="h-4 flex-1 rounded bg-gray-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Right column: sticky sidebar */}
        <aside>
          <div className="sticky top-[96px]">
            <div className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-[0px_128px_36px_0px_rgba(0,0,0,0),0px_82px_33px_0px_rgba(0,0,0,0),0px_46px_28px_0px_rgba(0,0,0,0.02),0px_21px_21px_0px_rgba(0,0,0,0.03),0px_5px_11px_0px_rgba(0,0,0,0.03)]">
              {/* Profile header */}
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 shrink-0 rounded-full bg-gray-200" />
                <div className="min-w-0 flex-1">
                  <div className="h-6 w-36 rounded bg-gray-200" />
                  <div className="mt-1 h-5 w-24 rounded bg-gray-200" />
                </div>
              </div>

              {/* Video / company image placeholder */}
              <div className="aspect-video w-full rounded-lg bg-gray-200" />

              {/* Contact rows */}
              <div className="flex flex-col gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="flex shrink-0 items-center rounded-lg border border-[#EDEEED] p-2">
                      <div className="h-6 w-6 rounded bg-gray-200" />
                    </div>
                    <div className="min-w-0">
                      <div className="h-3 w-12 rounded bg-gray-200" />
                      <div className="mt-1 h-4 w-32 rounded bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Social icons */}
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-lg border border-[#EDEEED] p-2">
                    <div className="h-6 w-6 rounded bg-gray-200" />
                  </div>
                ))}
              </div>

              {/* CTA button with glow */}
              <div className="flex flex-col items-center">
                <div className="z-2 mb-[-24px] h-12 w-full rounded-full bg-gray-200" />
                <div className="z-1 mx-6 h-6 w-full overflow-hidden rounded-[26px]">
                  <div className="h-full w-full bg-gray-100" />
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ─── Mobile Bottom CTA ─── */}
      <div className="fixed inset-x-0 bottom-0 z-20 lg:hidden">
        <div className="bg-linear-to-t from-white via-white/80 to-transparent px-6 pb-6 pt-10">
          <div className="h-12 w-full rounded-full bg-gray-200" />
        </div>
      </div>
    </main>
  );
}
