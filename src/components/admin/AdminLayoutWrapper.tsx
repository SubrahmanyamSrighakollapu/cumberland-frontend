"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import NAV_GROUPS from "@/data/pages/admin-nav";

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f4ee]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#17352d]/20 border-t-[#80563E] rounded-full animate-spin" />
          <p className="text-sm text-[#50544E] font-manrope">Loading Cumberland CMS…</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.replace("/admin/login");
  };

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#50544E] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===================== SIDEBAR ===================== */}
      <aside
        className={`fixed lg:sticky lg:top-0 left-0 top-0 h-screen w-[280px] shrink-0 bg-[#0F302A] text-[#f7f4ee] z-50
          transform transition-transform duration-300 ease-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 flex flex-col
        `}
      >
        {/* Brand */}
        <div className="h-[80px] px-6 flex items-center justify-between border-b border-[#17352d]/70">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52c92d] rounded"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="w-10 h-10 rounded-lg bg-[#80563E] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V9m0 0a5 5 0 015 5m-5-5a5 5 0 00-5 5m5-5l-3 3m3-3l3 3" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 21h16" />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="font-cormorant text-xl font-semibold text-white leading-none">Cumberland</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#f7f4ee]/50 mt-1">Content Suite</div>
            </div>
          </Link>
          <button
            className="lg:hidden text-[#f7f4ee]/80 hover:text-white p-2 rounded-md hover:bg-[#17352d]"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-7 scrollbar-thin">
          {NAV_GROUPS.map((group, gi) => (
            <div key={gi}>
              <div className="px-3 mb-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f7f4ee]/35">
                {group.label}
              </div>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.key}>
                      <Link
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-manrope transition-all relative
                          ${active
                            ? "bg-[#80563E] text-white shadow-[0_4px_12px_rgba(128,86,62,0.25)]"
                            : "text-[#f7f4ee]/85 hover:bg-[#17352d]/60 hover:text-white"
                          }
                        `}
                      >
                        {active && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r bg-[#52c92d]" />
                        )}
                        <span className="shrink-0 flex items-center">
                          {item.icon(active)}
                        </span>
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 ${
                            item.badgeColor || "bg-[#80563E]/70 text-white"
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer — preview banner */}
        <div className="p-4 border-t border-[#17352d]/70">
          <div className="rounded-xl bg-gradient-to-br from-[#80563E]/30 to-[#17352d] p-4 border border-[#80563E]/20">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-[#52c92d]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#f7f4ee]/70">Quick Tip</span>
            </div>
            <p className="text-xs leading-relaxed text-[#f7f4ee]/70 font-manrope">
              Use this panel to manage every piece of website content — rooms, gallery images, experiences and more.
            </p>
          </div>
        </div>
      </aside>

      {/* ===================== MAIN ===================== */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-[80px] bg-white/80 backdrop-blur-md border-b border-[#D9D0C4]/60 flex items-center px-4 sm:px-6 lg:px-8 gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-[#F7F4EE] text-[#17352D] transition-colors"
            aria-label="Open sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs font-manrope text-[#50544E]/60">
              <span>CMS</span>
              <span className="text-[#D9D0C4]">/</span>
              <span className="text-[#17352D] font-medium truncate">
                {NAV_GROUPS.flatMap((g) => g.items).find((i) => isActive(i.href))?.label || "Dashboard"}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-cormorant font-semibold text-[#0F302A] truncate mt-0.5">
              {NAV_GROUPS.flatMap((g) => g.items).find((i) => isActive(i.href))?.label || "Dashboard"}
            </h1>
          </div>

          {/* Visit site */}
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#D9D0C4]/60 text-xs font-semibold font-manrope text-[#17352D] hover:bg-[#F7F4EE] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            Visit Site
          </Link>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen((o) => !o)}
              className="flex items-center gap-2 sm:gap-3 pl-2 pr-2 sm:pl-3 sm:pr-3 py-1.5 rounded-full hover:bg-[#F7F4EE] transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#80563E] to-[#52c92d] flex items-center justify-center text-white text-sm font-bold">
                {user?.name?.charAt(0) || "A"}
              </div>
              <div className="hidden sm:block text-left leading-tight">
                <div className="text-sm font-semibold text-[#0F302A] font-manrope">{user?.name}</div>
                <div className="text-[11px] text-[#50544E]/60 capitalize">{user?.role}</div>
              </div>
              <svg className="w-4 h-4 text-[#50544E]/60 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {userMenuOpen && (
              <>
                <div className="fixed inset-0 z-0" onClick={() => setUserMenuOpen(false)} />
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#D9D0C4]/60 z-10 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-[#D9D0C4]/60">
                    <div className="font-semibold text-[#0F302A] font-manrope text-sm">{user?.name}</div>
                    <div className="text-xs text-[#50544E]/60 mt-0.5">{user?.email}</div>
                    <div className="inline-flex items-center gap-1 mt-2 text-[10px] uppercase tracking-wider bg-[#52c92d]/10 text-[#52c92d] px-2 py-0.5 rounded-full font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#52c92d]"></span>
                      {user?.role}
                    </div>
                  </div>
                  <button
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-[#17352D] hover:bg-[#F7F4EE] transition-colors font-manrope"
                    onClick={() => {
                      router.push("/admin/dashboard/settings");
                      setUserMenuOpen(false);
                    }}
                  >
                    <svg className="w-4 h-4 text-[#50544E]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    Change Password
                  </button>
                  <button
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-[#17352D] hover:bg-[#F7F4EE] transition-colors font-manrope"
                    onClick={() => {
                      router.push("/admin/dashboard/settings");
                      setUserMenuOpen(false);
                    }}
                  >
                    <svg className="w-4 h-4 text-[#50544E]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281C14.743 6.086 15 6.594 15 7.158v.012c0 .422.287.788.696.954l1.22.496c.553.225.82.824.605 1.377l-.464 1.152a.98.98 0 000 .802l.464 1.152c.215.553-.052 1.152-.605 1.377l-1.22.496c-.41.166-.696.532-.696.954v.012c0 .564-.257 1.072-.684 1.227l-1.213.466c-.55.21-.898.74-.853 1.312.014.18.014.36 0 .54a.997.997 0 01-.96.839h-2.593a.997.997 0 01-.96-.839c-.014-.18-.014-.36 0-.54.045-.572-.303-1.102-.853-1.312l-1.213-.466C6.557 18.114 6.3 17.606 6.3 17.042v-.012c0-.422-.287-.788-.696-.954l-1.22-.496c-.553-.225-.82-.824-.605-1.377l.464-1.152a.98.98 0 000-.802l-.464-1.152c-.215-.553.052-1.152.605-1.377l1.22-.496c.41-.166.696-.532.696-.954v-.012c0-.564.257-1.072.684-1.227l.213-1.281c.09-.542.56-.94 1.11-.94h2.593z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Site Settings
                  </button>
                  <div className="border-t border-[#D9D0C4]/60 my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-red-700 hover:bg-red-50 transition-colors font-manrope"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
