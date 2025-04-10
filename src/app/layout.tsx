import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { HeaderSelector } from "@/components/shared/header-selector";
import { Footer } from "@/components/shared/footer";
import { BottomNav } from "@/components/shared/navigation/bottom-nav";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "BitHedge - sBTC Options for Hedging Bitcoin Volatility",
  description: "Hedge Bitcoin volatility with sBTC options secured by Bitcoin's own security",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This is a server component, we shouldn't use Date or other dynamic values here
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${inter.variable} font-sans min-h-screen bg-background text-foreground antialiased`}
        suppressHydrationWarning={true}
      >
        <div className="relative flex min-h-screen flex-col">
          <HeaderSelector />
          <main className="flex-1 pb-20 md:pb-0">{children}</main>
          <Footer />
          <BottomNav />
        </div>
      </body>
    </html>
  );
}