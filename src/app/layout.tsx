import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Cardixx - The Operating System for Professional Networking",
    template: "%s | Cardixx",
  },
  description:
    "Networking Made Simple, Intentional, and Measurable. Create your digital business card, connect, and grow your network.",
  metadataBase: new URL("https://cardixx.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
