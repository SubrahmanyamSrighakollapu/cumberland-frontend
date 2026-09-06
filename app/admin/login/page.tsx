import type { Metadata } from "next";
import { AdminLoginBrandPanel } from "@/components/admin/AdminLoginBrandPanel";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login | Cumberland Motor Inn",
  description:
    "Secure website content management system login entrance for Cumberland Motor Inn.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen lg:min-h-0 lg:h-screen lg:max-h-screen w-full flex flex-col lg:flex-row bg-[#F7F4EE] selection:bg-[#80563E] selection:text-white overflow-x-hidden">
      {/* 1. Left Photographic Brand Panel (55% desktop width) */}
      <AdminLoginBrandPanel />

      {/* 2. Right Login Form Panel (45% desktop width) */}
      <AdminLoginForm />
    </div>
  );
}
