"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { LandingHeader } from "./landing-header";
import { useEffect } from "react";

export function HeaderSelector() {
  const pathname = usePathname();
  
  useEffect(() => {
    console.log("HeaderSelector rendered with pathname:", pathname);
  }, [pathname]);
  
  // Show landing header only on the root path
  if (pathname === "/") {
    console.log("Rendering LandingHeader for path:", pathname);
    return <LandingHeader />;
  }
  
  // For all other routes, show the regular navbar
  console.log("Rendering Navbar for path:", pathname);
  return <Navbar />;
} 