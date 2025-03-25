"use client"; // Mark as client component

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface ScrollRestorationWrapperProps {
  children: React.ReactNode;
}

const ScrollRestorationWrapper: React.FC<ScrollRestorationWrapperProps> = ({ children }) => {
  const pathname = usePathname(); // Get current route
  const scrollPositions = useRef<Map<string, number>>(new Map()); // Store scroll positions
  const containerRef = useRef<HTMLDivElement>(null);

  // Save scroll position before route change
  useEffect(() => {
    const handleRouteChangeStart = () => {
      if (containerRef.current) {
        scrollPositions.current.set(pathname, containerRef.current.scrollTop);
      }
    };

    window.addEventListener("beforeunload", handleRouteChangeStart);
    return () => window.removeEventListener("beforeunload", handleRouteChangeStart);
  }, [pathname]);

  // Restore scroll position after route change
  useEffect(() => {
    const savedPosition = scrollPositions.current.get(pathname) || 0;
    if (containerRef.current) {
      containerRef.current.scrollTop = savedPosition;
    }
  }, [pathname]);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen scroll-smooth flex flex-col *:w-full items-center overflow-y-auto max-h-[calc(100vh-3rem)] overflow-x-hidden"
    >
      {children}
    </div>
  );
};

export default ScrollRestorationWrapper;