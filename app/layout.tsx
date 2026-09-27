import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import NodeGraphBackground from "@/components/site/NodeGraphBackground";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aarone Den Patayan — Marketing & AI Automation Specialist",
  description:
    "I set up automations that follow up with your leads, chase failed payments, and keep customers in the loop — and I try hard to break every one before your customers ever use it.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-bg text-ink font-sans antialiased">
        {/* Blocking theme-init script: dark is the default (no attribute
            needed — :root already holds the dark values), so this only
            has work to do for a returning visitor who chose light mode.
            Runs before first paint (strategy="beforeInteractive") so
            there is no flash of dark before switching to light. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{if(localStorage.getItem('theme')==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`}
        </Script>
        <NodeGraphBackground />
        {children}
      </body>
    </html>
  );
}
