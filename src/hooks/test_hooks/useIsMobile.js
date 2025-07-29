// ../../hooks/test_hooks/useIsMobile.js
"use client";

import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768; // Tailwind's 'md' breakpoint by default

export function useIsMobile(breakpoint = MOBILE_BREAKPOINT) {
  // Initialize to a value that won't cause a flash if possible,
  // or ensure the component consuming it handles the initial undefined/false state gracefully.
  // Setting to false initially is common practice.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // This function will only run on the client.
    const checkDeviceSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Call it once to set the initial state correctly after mount.
    checkDeviceSize();

    window.addEventListener("resize", checkDeviceSize);

    // Cleanup listener on component unmount.
    return () => window.removeEventListener("resize", checkDeviceSize);
  }, [breakpoint]); // Re-run effect if breakpoint changes

  return isMobile;
}