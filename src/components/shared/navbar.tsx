"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { WalletConnect } from "@/components/wallet/WalletConnect";

const NavItems = [
  {
    name: "Home",
    href: "/home",
  },
  {
    name: "Option Data",
    href: "/option-data",
  },
  {
    name: "Easy Trade",
    href: "/easy-option",
  },
];

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex h-16 items-center">
        <div className="mr-6 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">BitHedge</span>
          </Link>
        </div>
        
        {/* Navigation links - hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {NavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === item.href
                  ? "text-foreground font-semibold"
                  : "text-foreground/60"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="ml-auto flex items-center gap-3">
          <WalletConnect 
            variant="outline" 
            size="sm"
            className="h-10"
          />
        </div>
      </div>
    </header>
  );
}; 