"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import NAV_GROUPS from "@/data/pages/admin-nav";
import { apiFetch } from "@/utils/apiClient";

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
  const [isMounted, setIsMounted] = useState(false);

  // Change Password state
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdError, setPwdError] = useState<string | null>(null);
  const [pwdSuccess, setPwdSuccess] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isLoading && !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [isMounted, isAuthenticated, isLoading, router]);

  if (!isMounted || isLoading || !isAuthenticated) {
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

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError(null);
    setPwdSuccess(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPwdError("All password fields are required.");
      return;
    }
    if (newPassword.length < 8) {
      setPwdError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwdError("New password and confirmation do not match.");
      return;
    }

    setPwdLoading(true);
    try {
      await apiFetch("/auth/change-password", {
        auth: true,
        method: "PUT",
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });
      setPwdSuccess("Password updated successfully! Logging out to re-login...");
      setTimeout(() => {
        logout();
        router.replace("/admin/login");
      }, 1500);
    } catch (err: any) {
      setPwdError(err?.data?.message || err?.message || "Failed to change password");
    } finally {
      setPwdLoading(false);
    }
  };

  const openChangePasswordModal = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowCurrent(false);
    setShowNew(false);
    setShowConfirm(false);
    setPwdError(null);
    setPwdSuccess(null);
    setUserMenuOpen(false);
    setChangePasswordOpen(true);
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
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80563E] rounded py-1"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="relative h-10 w-44">
              <Image
                src="/images/cumberland-logo.png"
                alt="Cumberland Motor Inn Logo"
                fill
                className="object-contain object-left"
                priority
              />
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
        <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-2 scrollbar-thin">
          {NAV_GROUPS.map((group, gi) => (
            <div key={gi}>
              {group.label ? (
                <div className="px-3 mb-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f7f4ee]/35">
                  {group.label}
                </div>
              ) : null}
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
                    onClick={openChangePasswordModal}
                  >
                    <svg className="w-4 h-4 text-[#50544E]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    Change Password
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

      {/* Change Password Modal */}
      {changePasswordOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0F302A]/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#D9D0C4]/60 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[#D9D0C4]/60 flex items-center justify-between">
              <div>
                <h3 className="font-cormorant text-2xl font-semibold text-[#0F302A]">Change Password</h3>
                <p className="text-xs text-[#50544E]/70 font-manrope mt-0.5">
                  Update your admin account security password
                </p>
              </div>
              <button
                onClick={() => setChangePasswordOpen(false)}
                className="p-2 rounded-lg hover:bg-black/5 text-[#50544E] transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="p-6 space-y-4 font-manrope">
              {pwdError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {pwdError}
                </div>
              )}
              {pwdSuccess && (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                  {pwdSuccess}
                </div>
              )}

              {/* Current Password */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0F302A] mb-1.5">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    required
                    className="w-full h-11 pl-3.5 pr-10 rounded-lg border border-[#D9D0C4] focus:outline-none focus:ring-2 focus:ring-[#80563E] text-sm text-[#0F302A]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#50544E]/60 hover:text-[#0F302A] transition-colors p-1"
                    title={showCurrent ? "Hide password" : "Show password"}
                  >
                    {showCurrent ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.646C3.434 8.796 7.182 6 12 6s8.566 2.796 9.964 5.677c.098.211.098.435 0 .646C20.566 15.204 16.818 18 12 18s-8.566-2.796-9.964-5.678z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0F302A] mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    required
                    minLength={8}
                    className="w-full h-11 pl-3.5 pr-10 rounded-lg border border-[#D9D0C4] focus:outline-none focus:ring-2 focus:ring-[#80563E] text-sm text-[#0F302A]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#50544E]/60 hover:text-[#0F302A] transition-colors p-1"
                    title={showNew ? "Hide password" : "Show password"}
                  >
                    {showNew ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.646C3.434 8.796 7.182 6 12 6s8.566 2.796 9.964 5.677c.098.211.098.435 0 .646C20.566 15.204 16.818 18 12 18s-8.566-2.796-9.964-5.678z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0F302A] mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    required
                    minLength={8}
                    className="w-full h-11 pl-3.5 pr-10 rounded-lg border border-[#D9D0C4] focus:outline-none focus:ring-2 focus:ring-[#80563E] text-sm text-[#0F302A]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#50544E]/60 hover:text-[#0F302A] transition-colors p-1"
                    title={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.646C3.434 8.796 7.182 6 12 6s8.566 2.796 9.964 5.677c.098.211.098.435 0 .646C20.566 15.204 16.818 18 12 18s-8.566-2.796-9.964-5.678z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setChangePasswordOpen(false)}
                  disabled={pwdLoading}
                  className="h-11 px-5 rounded-lg border border-[#D9D0C4] text-xs font-bold uppercase tracking-wider text-[#50544E] hover:bg-stone-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={pwdLoading}
                  className="h-11 px-6 rounded-lg bg-[#80563E] hover:bg-[#69452F] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  {pwdLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving…
                    </>
                  ) : (
                    "Save & Logout"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
