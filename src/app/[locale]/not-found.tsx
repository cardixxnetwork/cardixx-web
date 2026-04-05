import Link from "next/link";

export default function LocaleNotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="mt-4 text-lg text-gray-600">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-700"
      >
        Go Home
      </Link>
    </main>
  );
}
