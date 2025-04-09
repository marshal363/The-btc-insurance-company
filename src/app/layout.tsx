import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { HeaderSelector } from "@/components/shared/header-selector";
import { Footer } from "@/components/shared/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "BitHedge - sBTC Options for Hedging Bitcoin Volatility",
  description: "Hedge Bitcoin volatility with sBTC options secured by Bitcoin's own security",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This is a server component, we shouldn't use Date or other dynamic values here
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans min-h-screen bg-background text-foreground antialiased`}>
        <div className="relative flex min-h-screen flex-col">
          <HeaderSelector />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
