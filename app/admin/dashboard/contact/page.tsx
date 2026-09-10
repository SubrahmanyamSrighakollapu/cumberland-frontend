"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ContactPageRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/dashboard/inquiries");
  }, [router]);
  return null;
}
