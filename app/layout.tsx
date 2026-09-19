import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import PoweredByBadge from "@/components/layout/PoweredByBadge";
import BackToTop from "@/components/layout/BackToTop";
import { MotelLocalBusinessJsonLd } from "@/components/seo/JsonLd";
import AnalyticsTracker from "@/components/seo/AnalyticsTracker";
import { SITE_ORIGIN } from "@/utils/seo";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: "Motel Accommodation in Cessnock | Cumberland Motor Inn NSW",
    template: "%s | Cumberland Motor Inn",
  },
  description:
    "Motel Accommodation in Cessnock, Cumberland Motor Inn is located in the heart of Cessnock, the gateway to the Hunter Valley wine country.",
  verification: {
    google: "KHjABfArMhkNCRJvZL1c4dfo9RB6I1x6CJsy_ZlChmM",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", rel: "icon", type: "image/x-icon" },
      { url: "/images/favicon.png", type: "image/png", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
      { url: "/images/favicon.png", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    other: [
      {
        rel: "icon",
        url: "/favicon.ico",
      },
      {
        rel: "apple-touch-icon",
        url: "/apple-touch-icon.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${cormorant.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[var(--color-ivory)] text-[var(--color-body)]">
        {/* GA4 Measurement */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5MS8C0BV1J"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            if (!window.location.pathname.startsWith('/admin')) {
              gtag('config', 'G-5MS8C0BV1J');
            }
          `}
        </Script>
        <AuthProvider>
          <AnalyticsTracker />
          <MotelLocalBusinessJsonLd />
          {children}
          <BackToTop />
          <PoweredByBadge />
        </AuthProvider>
      </body>
    </html>
  );
}
