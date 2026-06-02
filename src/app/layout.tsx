import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { siteConfig } from "@/config/siteConfig";
import JsonLd from "@/components/JsonLd";
import CustomCursor from "@/components/ui/CustomCursor";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.websiteUrl),
  title: `${siteConfig.name} | Luxury Hair Salon in ${siteConfig.city}`,
  description: siteConfig.metaDescription,
  alternates: {
    canonical: siteConfig.websiteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  verification: {
    google: "googlecfa264e9601c4487",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: `${siteConfig.name} | Luxury Hair Salon in ${siteConfig.city}`,
    description: siteConfig.metaDescription,
    url: siteConfig.websiteUrl,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Atelier`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Luxury Hair Salon in ${siteConfig.city}`,
    description: siteConfig.metaDescription,
    images: [siteConfig.ogImage],
  },
  keywords: [
    "Luxury Salon",
    "Couture Styling",
    "Hair Balayage",
    "Skin Resurfacing",
    "Bespoke Beauty Studio",
    `Best Hair Salon in ${siteConfig.city}`,
    "Luminous Salon"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        {/* Injecting LocalBusiness & BeautySalon Schema JSON-LD for local SEO */}
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-[#0A0A0A] text-[#F5F0E8] antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
