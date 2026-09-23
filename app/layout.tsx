import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: "../public/fonts/manrope-variable.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "400 800",
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
    <html lang="en">
      <body className={`${manrope.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
