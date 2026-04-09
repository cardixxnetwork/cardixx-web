export default function HubLoading() {
  return (
    <main className="animate-pulse pb-28 lg:pb-8">
      {/* Title + Badge */}
      <div className="mx-auto max-w-6xl px-6 pt-8 lg:px-8">
        <div className="flex flex-col gap-2">
          <div className="h-10 w-72 rounded bg-gray-200 lg:h-14 lg:w-96" />
          <div className="h-6 w-52 rounded-full bg-gray-200" />
        </div>
      </div>

      {/* Image Gallery */}
      <div className="mx-auto max-w-6xl px-6 pt-6 lg:px-8">
        <div className="grid h-[320px] grid-cols-6 gap-4 lg:h-[500px]">
          <div className="col-span-6 rounded-lg bg-gray-200 lg:col-span-4" />
          <div className="hidden grid-rows-2 gap-4 lg:col-span-2 lg:grid">
            <div className="rounded-lg bg-gray-200" />
            <div className="rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>



      {/* ─── Desktop Layout ─── */}
      <div className="mx-auto hidden max-w-6xl px-8 pt-8 lg:grid lg:grid-cols-[1fr_412px] lg:gap-8">
        {/* Left column */}
        <div>
          {/* About section */}
          <div className="space-y-4">
            <div className="h-6 w-48 rounded bg-gray-200" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-3/4 rounded bg-gray-200" />
            </div>
          </div>

          <hr className="my-8 border-[#EDEEED]" />

          {/* Services section */}
          <div className="space-y-4">
            <div className="h-6 w-24 rounded bg-gray-200" />
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <div className="h-5 w-32 rounded bg-gray-200" />
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="h-4 w-48 rounded bg-gray-200" />
                ))}
              </div>
              <div className="space-y-2">
                <div className="h-5 w-24 rounded bg-gray-200" />
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-4 w-36 rounded bg-gray-200" />
                ))}
              </div>
            </div>
          </div>

          <hr className="my-8 border-[#EDEEED]" />

          {/* Comments section */}
          <div className="space-y-4">
            <div className="h-6 w-28 rounded bg-gray-200" />
            <div className="h-4 w-40 rounded bg-gray-200" />
          </div>

          <hr className="my-8 border-[#EDEEED]" />

          {/* Photos section */}
          <div className="space-y-4">
            <div className="h-6 w-20 rounded bg-gray-200" />
            <div className="aspect-[16/9] w-full rounded-lg bg-gray-200" />
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg bg-gray-200"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right column: sidebar */}
        <aside>
          <div className="sticky top-[96px]">
            <div className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-[0px_128px_36px_0px_rgba(0,0,0,0),0px_82px_33px_0px_rgba(0,0,0,0),0px_46px_28px_0px_rgba(0,0,0,0.02),0px_21px_21px_0px_rgba(0,0,0,0.03),0px_5px_11px_0px_rgba(0,0,0,0.03)]">
              {/* Hub type + status */}
              <div className="flex items-start justify-between">
                <div className="h-5 w-28 rounded bg-gray-200" />
                <div className="h-6 w-20 rounded-full bg-gray-200" />
              </div>

              {/* Image */}
              <div className="h-[120px] w-full rounded-2xl bg-gray-200" />

              {/* Contact rows */}
              <div className="flex flex-col gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
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
                {Array.from({ length: 2 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-[#EDEEED] p-2"
                  >
                    <div className="h-6 w-6 rounded bg-gray-200" />
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col items-center">
                <div className="z-2 mb-[-24px] h-12 w-full rounded-full bg-gray-200" />
                <div className="z-1 mx-6 h-6 w-full overflow-hidden rounded-[26px]">
                  <div className="h-full w-full bg-gray-100" />
                </div>
              </div>
              <div className="h-12 w-full rounded-full border border-gray-200" />
            </div>
          </div>
        </aside>
      </div>

      {/* ─── Mobile Layout ─── */}
      <div className="mx-auto max-w-6xl px-6 pt-8 lg:hidden">
        <div className="space-y-4">
          <div className="h-6 w-48 rounded bg-gray-200" />
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-3/4 rounded bg-gray-200" />
          </div>
        </div>

        <hr className="my-8 border-[#EDEEED]" />

        <div className="space-y-4">
          <div className="h-6 w-24 rounded bg-gray-200" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 w-48 rounded bg-gray-200" />
          ))}
        </div>
      </div>

      {/* Mobile Bottom CTA */}
      <div className="fixed inset-x-0 bottom-0 z-20 lg:hidden">
        <div className="bg-linear-to-t from-white via-white/80 to-transparent px-6 pb-6 pt-10">
          <div className="h-12 w-full rounded-full bg-gray-200" />
        </div>
      </div>
    </main>
  );
}
