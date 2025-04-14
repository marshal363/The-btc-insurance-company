import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Easy Bitcoin Options Protection | The Bitcoin Insurance Company",
  description: "Our simplified options platform makes it easy to protect your Bitcoin holdings from market volatility. Choose a protection strategy tailored to your needs.",
  path: "/easy-option",
  ogImage: "/images/easy-option-og.png", // Make sure this image exists in your public folder
});

export default function EasyOptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto">
      {children}
    </div>
  );
} 