import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
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
  title: "Aarone Den Patayan — Marketing & AI Specialist",
  description:
    "I design and build marketing automation systems — lead routing, billing and dunning, multi-step nurture sequences — for founders and marketing teams who need something that works the first time a real customer hits it wrong.",
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
        {children}
      </body>
    </html>
  );
}
