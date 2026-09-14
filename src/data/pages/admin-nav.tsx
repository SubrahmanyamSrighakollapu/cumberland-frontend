"use client";

import type { ReactNode } from "react";

export interface NavItem {
  key: string;
  label: string;
  href: string;
  badge?: string;
  badgeColor?: string;
  icon: (active: boolean) => ReactNode;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-[#f7f4ee]/70"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    key: "hero",
    label: "Hero Slides",
    href: "/admin/dashboard/hero",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-[#f7f4ee]/70"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zM12 8.25h.008v.008H12V8.25zm0 3h.008v.008H12v-.008zM8.25 11.25h.008v.008H8.25v-.008zM15.75 11.25h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    key: "gallery",
    label: "Gallery",
    href: "/admin/dashboard/gallery",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-[#f7f4ee]/70"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008H12V4.5z" />
      </svg>
    ),
  },
  {
    key: "rooms",
    label: "Rooms",
    href: "/admin/dashboard/rooms",
    badge: "6",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-[#f7f4ee]/70"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
  {
    key: "amenities",
    label: "Amenities",
    href: "/admin/dashboard/amenities",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-[#f7f4ee]/70"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    key: "testimonials",
    label: "Testimonials",
    href: "/admin/dashboard/testimonials",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-[#f7f4ee]/70"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    key: "faq",
    label: "FAQs",
    href: "/admin/dashboard/faq",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-[#f7f4ee]/70"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    key: "inquiries",
    label: "Contact Queries",
    href: "/admin/dashboard/inquiries",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-white" : "text-[#f7f4ee]/70"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 8.25v7.5m-6.75-7.5v7.5m2.25-10.5h-6a2.25 2.25 0 00-2.25 2.25v7.5A2.25 2.25 0 0011.25 18h6a2.25 2.25 0 002.25-2.25v-7.5A2.25 2.25 0 0019.5 5.25h1.5a.75.75 0 000 1.5h-1.5a.75.75 0 01-.75-.75zM3 5.25h1.5A2.25 2.25 0 016.75 7.5v9A2.25 2.25 0 014.5 18.75H3v-13.5z" />
      </svg>
    ),
  },
];

const NAV_GROUPS: NavGroup[] = [
  {
    label: "",
    items: NAV_ITEMS,
  },
];

export default NAV_GROUPS;
