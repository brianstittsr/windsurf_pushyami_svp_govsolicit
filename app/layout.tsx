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
  metadataBase: new URL("https://xprotege.com"),
  title: {
    default: "XProtege | Unfold the Power of Excellence",
    template: "%s | XProtege",
  },
  description:
    "XProtege (XITM) is a premier technology company delivering AI, cloud services, cybersecurity, data analytics, digital modernization, and ERP implementations. Woman- and minority-owned, serving federal agencies and commercial clients.",
  keywords: [
    "artificial intelligence",
    "cloud services",
    "cybersecurity",
    "data analytics",
    "digital modernization",
    "enterprise IT",
    "ERP implementations",
    "SAP",
    "Microsoft Dynamics 365",
    "GovCloud",
    "federal IT consulting",
    "woman owned business",
    "minority owned business",
  ],
  authors: [{ name: "XProtege", url: "https://xprotege.com" }],
  creator: "XProtege",
  publisher: "XProtege",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://xprotege.com",
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
    url: "https://xprotege.com",
    siteName: "XProtege",
    title: "XProtege | Unfold the Power of Excellence",
    description:
      "Where innovation meets execution. XProtege delivers AI, cloud services, cybersecurity, and digital modernization solutions to federal agencies and commercial clients.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "XProtege - Unfold the Power of Excellence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "XProtege | Unfold the Power of Excellence",
    description:
      "Where innovation meets execution. XProtege delivers AI, cloud services, cybersecurity, and digital modernization solutions.",
    images: ["/og-image.png"],
    creator: "@xprotege",
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
