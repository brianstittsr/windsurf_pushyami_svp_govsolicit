import type { Metadata } from "next";
import { Manrope, DM_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { AccessibilityWidget } from "@/components/shared/accessibility-widget";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://itmcsolutions.com"),
  title: {
    default: "ITMC Solutions | IT & Management Consulting for Federal CIO Organizations",
    template: "%s | ITMC Solutions",
  },
  description:
    "ITMC Solutions is a leading program management and IT consulting firm specializing in federal government contracting. As a trusted veteran-, woman-, and minority-owned small business, we deliver comprehensive solutions for CPIC/portfolio management, business solution architecture, and TBM.",
  keywords: [
    "federal IT consulting",
    "government IT consulting",
    "CPIC portfolio management",
    "Technology Business Management",
    "TBM",
    "federal CIO consulting",
    "data analytics",
    "solution architecture",
    "program management",
    "digital transformation",
    "SBA 8(a) certified",
    "veteran owned business",
    "woman owned business",
  ],
  authors: [{ name: "ITMC Solutions, LLC", url: "https://itmcsolutions.com" }],
  creator: "ITMC Solutions, LLC",
  publisher: "ITMC Solutions, LLC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://itmcsolutions.com",
  },
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
    url: "https://itmcsolutions.com",
    siteName: "ITMC Solutions",
    title: "ITMC Solutions | IT & Management Consulting for Federal CIO Organizations",
    description:
      "Trusted by Federal CIO organizations from HUD to DHS & beyond. We're your partners from strategy to execution for CPIC/portfolio management, TBM, data analytics, and program management.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ITMC Solutions - IT & Management Consulting for Federal Agencies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ITMC Solutions | IT & Management Consulting for Federal CIO Organizations",
    description:
      "Trusted by Federal CIO organizations from HUD to DHS & beyond. We're your partners from strategy to execution.",
    images: ["/og-image.png"],
    creator: "@itmcsolutions",
  },
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  category: "business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Skip to main content link for keyboard users - WCAG 2.4.1 */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${manrope.variable} ${dmSans.variable} font-sans antialiased`}>
        {/* Skip to main content link - WCAG 2.4.1 Bypass Blocks */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Skip to main content
        </a>
        {children}
        <Toaster />
        {/* UserWay Accessibility Widget */}
        <AccessibilityWidget />
      </body>
    </html>
  );
}
