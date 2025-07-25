import "@/app/global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Footer } from "@/components/footer";
import { BASE_URL } from "@/lib/constants";
import { Header } from "@/components/header";
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Luis Barragan",
  description: "Luis Barragan's Dev Blog",
  openGraph: {
    title: "Luis Barragan",
    description: "Luis Barragan's Dev Blog",
    url: BASE_URL,
    siteName: "Hugo Lin Dev",
    locale: "en_US",
    type: "website",
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/favicon.ico",
        sizes: "192x192",
        type: "image/x-icon",
      },
    ],
  },
  manifest: "/manifest.json",
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        "text-neutral-900 bg-neutral-50 dark:text-neutral-50 dark:bg-neutral-900",
        GeistSans.variable,
        GeistMono.variable,
      )}
    >
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID!} />
      <body className="antialiased max-w-xl mx-4 sm:mx-auto">
        <Header />
        <main className="flex-auto min-w-0 my-6 flex flex-col px-2 md:px-0">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
