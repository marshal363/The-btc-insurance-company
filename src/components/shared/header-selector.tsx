"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { useEffect } from "react";

export function HeaderSelector() {
  const pathname = usePathname();
  
  useEffect(() => {
    console.log("HeaderSelector rendered with pathname:", pathname);
  }, [pathname]);
  
  // Skip rendering on the root path as it's handled by page.tsx
  if (pathname === "/") {
    return null;
  }
  
  // For all other routes, show the regular navbar
  console.log("Rendering Navbar for path:", pathname);
  return <Navbar />;
} 