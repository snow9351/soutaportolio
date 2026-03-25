import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/** Canonical site URL for Open Graph / Twitter absolute URLs. Set NEXT_PUBLIC_SITE_URL on Vercel (e.g. https://your-app.vercel.app). */
function resolveMetadataBase(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return new URL(explicit);
  if (process.env.VERCEL_URL) return new URL(`https://${process.env.VERCEL_URL}`);
  return new URL("http://localhost:3000");
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: resolveMetadataBase(),
  title: "souta Portfolio - Mobile AI Full-Stack Developer",
  description: "Souta Hoshino's Personal Portfolio Website. Made with Next.js and Tailwind CSS.",
  keywords: "snow9351, snow9351's portfolio, mobile, full stack, engineer, financial, engineer, souta, Souta Hoshino",
  authors: [{ name: "Souta Hoshino" }],
  creator: "Souta Hoshino",
  publisher: "Souta Hoshino",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    // url: "https://snow9351.github.io/",
    siteName: "Souta Hoshino Personal Portfolio",
    title: "souta Portfolio - Mobile AI Full-Stack Developer",
    description: "Souta Hoshino's Personal Portfolio Website. Made with Next.js and Tailwind CSS.",
    images: [
      {
        url: "/images/logos/souta.png",
        width: 570,
        height: 570,
        alt: "Souta Hoshino",
      },
    ],
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "souta Portfolio - Mobile AI Full-Stack Developer",
  //   description: "Souta Hoshino's Personal Portfolio Website. Made with Next.js and Tailwind CSS.",
  //   images: ["/images/logos/souta.png"],
  // },
  icons: {
    icon: "/images/logos/logo.png",
    shortcut: "/images/logos/logo.png",
    apple: "/images/logos/logo.png",
  },
  // manifest: "/manifest.json",
  other: {
    "theme-color": "#E95420",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
