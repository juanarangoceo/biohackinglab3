import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Biohacking Lab 3.0",
  description: "Optimización Humana a través de Ciencia y Tecnología",
};

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${manrope.variable} antialiased`}
      >
        {children}
        
        {/* Organization Schema for E-E-A-T */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Biohacking Lab 3.0",
              "url": "https://biohackinglab3.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://biohackinglab3.com/logo.png"
              },
              "description": "Plataforma líder en biohacking, longevidad y optimización del rendimiento humano",
              "sameAs": [
                "https://twitter.com/biohackinglab",
                "https://instagram.com/biohackinglab"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "email": "contacto@biohackinglab3.com"
              }
            }),
          }}
        />
      </body>
      <GoogleAnalytics gaId="G-31VBCT0DMN" />
    </html>
  );
}
