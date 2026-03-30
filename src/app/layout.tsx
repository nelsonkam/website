import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/config";
import "katex/dist/katex.min.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.SITE_URL ?? "https://nelsonkamga.com"
  ),
  title: {
    default: siteConfig.title,
    template: `%s`,
  },
  description: siteConfig.description,
};

// Inline script to prevent flash of wrong theme (reads localStorage before paint).
// This is a static string, not user-provided content.
const themeScript = `(function(){var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',t)})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
      </head>
      <body>
        <div className="container">
          <Header />
          <div className="content">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
