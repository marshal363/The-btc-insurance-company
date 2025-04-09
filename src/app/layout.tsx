import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";

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
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans min-h-screen bg-background text-foreground antialiased`}>
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t py-4 bg-background">
            <div className="container flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} BitHedge - Bitcoin Vegas Hackathon Project
              </div>
              <div className="text-xs text-muted-foreground mt-2 md:mt-0">
                Running on Stacks Testnet - No real funds required
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
