import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Countries Explorer - Discover All Countries of the World",
    template: "%s | Countries Explorer",
  },
  description:
    "Explore comprehensive information about all countries of the world. Discover country flags, capitals, populations, currencies, languages, and more. Your complete guide to countries worldwide.",
  keywords: [
    "countries",
    "world countries",
    "country information",
    "country flags",
    "country capitals",
    "country population",
    "world map",
    "country data",
    "country facts",
    "geography",
    "countries list",
    "all countries",
    "country details",
    "country statistics",
  ],
  authors: [{ name: "Countries Explorer" }],
  creator: "Countries Explorer",
  publisher: "Countries Explorer",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Countries Explorer",
    title: "Countries Explorer - Discover All Countries of the World",
    description:
      "Explore comprehensive information about all countries of the world. Discover country flags, capitals, populations, currencies, languages, and more.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Countries Explorer - Discover All Countries",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Countries Explorer - Discover All Countries of the World",
    description:
      "Explore comprehensive information about all countries of the world. Discover country flags, capitals, populations, currencies, languages, and more.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "RVwS_8le5BZT0PTH8pgE9MI95nkGyyqSdbyGxZuK9ZE",
  },
  category: "Geography",
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
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
