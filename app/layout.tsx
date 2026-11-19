import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "./site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cloud Post Studio — Little things, sent on paper",
  description: "Postcards, notebooks, and envelopes from an imaginary stationery studio.",
  icons: "/mail-mark.svg",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeader />
        {children}
        <footer className="site-footer">
          <div className="shell footer-inner">
            <a className="brand" href="/" aria-label="Cloud Post Studio — Home">
              <Image src="/mail-mark.svg" alt="" width={28} height={28} />
              Cloud Post Studio
            </a>
            <a href="/#demo">Get the newsletter <span aria-hidden="true">↗</span></a>
          </div>
          <div className="shell footer-lettering scroll-reveal" aria-hidden="true">SEE YOU IN THE MAIL<span>✦</span></div>
        </footer>
      </body>
    </html>
  );
}
