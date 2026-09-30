import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: "../public/fonts/Manrope-Variable.ttf",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});

export const metadata: Metadata = {
  title: "Euler Motors — Electric goods vehicles, India ke liye.",
  description:
    "Electric three-wheelers built for Indian roads. Explore Storm EV, Turbo EV, HiLoad EV and Neo by Euler. Calculate your savings and book a test drive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans antialiased">
        {/* Tablet scale-to-fit — set BEFORE first paint (no flash): in the
            768–1279.98px band, render the desktop design at its native 1440px
            canvas, scaled to the exact viewport width (below 1280 the Neo card's
            Figma-cropped photo squeezes under its text column — native desktop
            needs the ≥1280 viewport that gives the design's 1280px card).
            Must be a JS-assigned number: Chrome silently drops calc() inside
            the zoom property, so the CSS calc version never applied.
            innerWidth is unaffected by root zoom (verified) and the band guard
            stays stable — no oscillation. Phones (<768) and desktops
            (≥1280): zoom removed. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){function z(){var m=matchMedia("(min-width:768px) and (max-width:1279.98px)");document.documentElement.style.zoom=m.matches?window.innerWidth/1440:""}z();addEventListener("resize",z)})();`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
