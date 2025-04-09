"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { HomeIcon, BarChartIcon, ArrowRightLeftIcon } from "lucide-react";

const NavItems = [
  {
    name: "Home",
    href: "/home",
    icon: HomeIcon,
  },
  {
    name: "Option Data",
    href: "/option-data",
    icon: BarChartIcon,
  },
  {
    name: "Easy Trade",
    href: "/easy-option",
    icon: ArrowRightLeftIcon,
  },
];

export function BottomNav() {
  const pathname = usePathname();

  // Don't show on landing page
  if (pathname === "/") {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-safe">
      <div className="grid h-full grid-cols-3">
        {NavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 relative transition-colors duration-200",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5 transition-all", isActive && "text-primary")} />
              <span className="text-xs font-medium">{item.name}</span>
              
              {/* Active indicator */}
              {isActive && (
                <span className="absolute -top-[0.5px] left-1/2 -translate-x-1/2 w-8 h-[2.5px] bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
} 