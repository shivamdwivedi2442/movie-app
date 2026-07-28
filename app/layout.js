import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://reelhouse.example.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Reel House — Discover films worth your evening",
    template: "%s | Reel House",
  },
  description:
    "Browse trending, top-rated, and upcoming movies. Search any title, filter by genre, and read full cast and synopsis details — fast, and built for every screen.",
  keywords: [
    "movies", "film database", "trending movies", "movie search",
    "top rated movies", "upcoming movies", "movie reviews",
  ],
  authors: [{ name: "Reel House" }],
  creator: "Reel House",
  applicationName: "Reel House",
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    siteName: "Reel House",
    title: "Reel House — Discover films worth your evening",
    description:
      "Browse trending, top-rated, and upcoming movies with a fast, cinematic interface.",
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reel House — Discover films worth your evening",
    description:
      "Browse trending, top-rated, and upcoming movies with a fast, cinematic interface.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: "/" },
  icons: {
    icon: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport = {
  themeColor: "#08080B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Reel House",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-velvet-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}