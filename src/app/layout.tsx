import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Cardixx - The Operating System for Professional Networking",
    template: "%s | Cardixx",
  },
  description:
    "Networking Made Simple, Intentional, and Measurable. Create your digital business card, connect, and grow your network.",
  metadataBase: new URL("https://cardixx.com"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // next-intl sets the locale on the request; we use it for the lang attribute.
  // For non-locale routes (embed, api), default to "en".
  let locale = "en";
  try {
    const { getLocale } = await import("next-intl/server");
    locale = await getLocale();
  } catch {
    // Non-locale routes (embed, api) won't have a locale set
  }

  return (
    <html lang={locale} className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
