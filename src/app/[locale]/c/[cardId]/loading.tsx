export default function CardLoading() {
  return (
    <main className="mx-auto max-w-6xl animate-pulse px-4 py-8 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-8">
        {/* Left column skeleton */}
        <div className="space-y-6">
          {/* Card hero skeleton */}
          <div className="aspect-[342/195] w-full rounded-xl bg-gray-200" />
          {/* Tabs skeleton */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="h-8 w-20 rounded bg-gray-200" />
              <div className="h-8 w-20 rounded bg-gray-200" />
              <div className="h-8 w-24 rounded bg-gray-200" />
            </div>
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            <div className="h-4 w-1/2 rounded bg-gray-200" />
            <div className="h-4 w-2/3 rounded bg-gray-200" />
          </div>
        </div>

        {/* Right sidebar skeleton */}
        <aside className="hidden lg:block">
          <div className="space-y-4">
            <div className="mx-auto h-24 w-24 rounded-full bg-gray-200" />
            <div className="mx-auto h-5 w-40 rounded bg-gray-200" />
            <div className="mx-auto h-4 w-32 rounded bg-gray-200" />
            <div className="mt-6 space-y-3">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-3/4 rounded bg-gray-200" />
            </div>
            <div className="h-10 w-full rounded-lg bg-gray-200" />
            <div className="h-10 w-full rounded-lg bg-gray-200" />
          </div>
        </aside>
      </div>
    </main>
  );
}
