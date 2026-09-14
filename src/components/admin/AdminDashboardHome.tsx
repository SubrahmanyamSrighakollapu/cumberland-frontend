"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/utils/apiClient";

interface Stats {
  rooms: number;
  gallery: number;
  testimonials: number;
  amenities: number;
  wineries: number;
  diningVenues: number;
  activities: number;
  newInquiries: number;
}

const DEFAULT_STATS: Stats = {
  rooms: 6,
  gallery: 10,
  testimonials: 4,
  amenities: 6,
  wineries: 9,
  diningVenues: 9,
  activities: 9,
  newInquiries: 0,
};

const STAT_CARDS = [
  {
    key: "rooms",
    label: "Rooms",
    href: "/admin/dashboard/rooms",
    accent: "from-[#52c92d]/20 to-[#52c92d]/5",
    dot: "bg-[#52c92d]",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
  {
    key: "gallery",
    label: "Gallery Images",
    href: "/admin/dashboard/gallery",
    accent: "from-[#80563E]/20 to-[#80563E]/5",
    dot: "bg-[#80563E]",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008H12V4.5z" />
      </svg>
    ),
  },
  {
    key: "testimonials",
    label: "Testimonials",
    href: "/admin/dashboard/testimonials",
    accent: "from-amber-500/20 to-amber-500/5",
    dot: "bg-amber-500",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    key: "amenities",
    label: "Amenities",
    href: "/admin/dashboard/amenities",
    accent: "from-sky-500/20 to-sky-500/5",
    dot: "bg-sky-500",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    key: "newInquiries",
    label: "New Inquiries",
    href: "/admin/dashboard/inquiries",
    accent: "from-[#52c92d]/20 to-[#52c92d]/5",
    dot: "bg-[#52c92d]",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 8.25v7.5m-6.75-7.5v7.5m2.25-10.5h-6a2.25 2.25 0 00-2.25 2.25v7.5A2.25 2.25 0 0011.25 18h6a2.25 2.25 0 002.25-2.25v-7.5A2.25 2.25 0 0019.5 5.25h1.5a.75.75 0 000 1.5h-1.5a.75.75 0 01-.75-.75zM3 5.25h1.5A2.25 2.25 0 016.75 7.5v9A2.25 2.25 0 014.5 18.75H3v-13.5z" />
      </svg>
    ),
  },
];

const MODULE_SHORTCUTS = [
  {
    title: "Home Page",
    desc: "Hero, welcome copy, featured rooms, reviews",
    href: "/admin/dashboard/home",
    color: "bg-[#52c92d]/10 text-[#17352D]",
  },
  {
    title: "Contact Page",
    desc: "Details, FAQs, inquiry submissions",
    href: "/admin/dashboard/contact",
    color: "bg-sky-500/10 text-sky-800",
  },
];

export default function AdminDashboardHome() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>(DEFAULT_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchStats() {
      try {
        const res = await apiFetch("/dashboard/stats", { auth: true });
        if (!cancelled && res?.data) setStats(res.data);
      } catch {
        if (!cancelled) setStats(DEFAULT_STATS);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchStats();
    return () => {
      cancelled = true;
    };
  }, []);

  const today = new Date().toLocaleDateString("en-AU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#17352D] via-[#0F302A] to-[#17352D] text-white p-6 sm:p-10 shadow-lg">
        <div
          className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-[#80563E]/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -right-10 -bottom-20 w-60 h-60 rounded-full bg-[#52c92d]/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold font-manrope text-[#52c92d] mb-4 shadow-sm">
            <svg className="w-4 h-4 text-[#52c92d]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            <span>{today}</span>
          </div>
          <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-3">
            Good to see you{user?.name ? `, ${user.name.split(" ")[0]}` : ""} 👋
          </h2>
          <p className="text-[#f7f4ee]/75 max-w-xl font-manrope leading-relaxed text-sm sm:text-base">
            Manage rooms, gallery imagery, amenities and website content from one central suite.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/admin/dashboard/rooms"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#80563E] hover:bg-[#69452F] text-white text-sm font-semibold font-manrope transition-colors"
            >
              Manage Rooms
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              href="/admin/dashboard/gallery"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-semibold font-manrope transition-colors"
            >
              Open Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Stat cards */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h3 className="font-cormorant text-2xl font-semibold text-[#0F302A]">At a glance</h3>
            <p className="text-sm text-[#50544E]/70 font-manrope mt-1">
              Your current content inventory across all modules.
            </p>
          </div>
          {loading && (
            <div className="flex items-center gap-2 text-xs text-[#50544E]/60 font-manrope">
              <div className="w-3 h-3 border-2 border-[#17352D]/20 border-t-[#80563E] rounded-full animate-spin" />
              Syncing with database…
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {STAT_CARDS.map((card) => {
            const value = (stats as unknown as Record<string, number>)[card.key] ?? 0;
            return (
              <Link
                key={card.key}
                href={card.href}
                className="group relative overflow-hidden rounded-xl bg-white border border-[#D9D0C4]/60 p-5 hover:shadow-lg hover:border-[#80563E]/30 transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative flex items-start justify-between">
                  <div className={`w-11 h-11 rounded-lg bg-[#F7F4EE] flex items-center justify-center text-[#0F302A] group-hover:scale-110 transition-transform duration-300`}>
                    {card.icon}
                  </div>
                  <span className={`w-2 h-2 rounded-full ${card.dot}`} />
                </div>
                <div className="relative mt-5">
                  <div className="font-cormorant text-3xl font-bold text-[#0F302A]">
                    {typeof value === "number" ? value.toLocaleString() : value}
                  </div>
                  <div className="mt-1 text-sm text-[#50544E]/70 font-manrope flex items-center gap-1.5">
                    {card.label}
                    <svg
                      className="w-3.5 h-3.5 text-[#80563E] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
