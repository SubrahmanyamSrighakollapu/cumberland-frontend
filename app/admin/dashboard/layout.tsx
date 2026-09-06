import type { Metadata } from "next";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";

export const metadata: Metadata = {
  title: "Cumberland CMS · Content Dashboard",
  description: "Cumberland Motor Inn content management dashboard.",
  robots: { index: false, follow: false },
};

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
