"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function PoweredByBadge() {
  const pathname = usePathname();

  // Hide on all admin routes (login, dashboard, etc.)
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 sm:right-6 z-50 pointer-events-auto transition-transform duration-200 hover:scale-105">
      <Image
        src="/images/powered-by-image.png"
        alt="Powered by"
        width={380}
        height={152}
        className="h-16 sm:h-20 md:h-24 lg:h-26 w-auto object-contain drop-shadow-lg"
        priority
      />
    </div>
  );
}
