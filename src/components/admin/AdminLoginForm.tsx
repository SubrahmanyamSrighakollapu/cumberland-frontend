"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminLoginFooter } from "./AdminLoginFooter";
import { AdminHelpDialog } from "./AdminHelpDialog";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/utils/apiClient";

export const AdminLoginForm: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [statusMessage, setStatusMessage] = useState<{
    type: "info" | "error" | "success";
    text: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
  }>({
    isOpen: false,
    title: "",
    message: "",
  });

  const validateEmail = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return "Enter your email address.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) return "Enter a valid email address.";
    return "";
  };

  const validatePassword = (val: string) => {
    if (!val) return "Enter your password.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    const eErr = validateEmail(email);
    const pErr = validatePassword(password);

    setEmailError(eErr);
    setPasswordError(pErr);

    if (eErr || pErr) {
      if (eErr) {
        const el = document.getElementById("admin-email");
        el?.focus();
      } else if (pErr) {
        const el = document.getElementById("admin-password");
        el?.focus();
      }
      return;
    }

    setIsLoading(true);
    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (res?.success && res?.data) {
        login(res.data.token, res.data.user);
        setStatusMessage({
          type: "success",
          text: `Welcome back, ${res.data.user.name}! Redirecting to dashboard…`,
        });
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 600);
        return;
      }

      throw new Error(res?.message || "Login failed");
    } catch (err: any) {
      const msg =
        err?.data?.message ||
        err?.message ||
        "Could not sign in. Ensure the backend is running (npm run dev) and credentials are correct.";
      setStatusMessage({ type: "error", text: msg });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setDialogState({
      isOpen: true,
      title: "Password Recovery",
      message:
        "Please contact your website administrator to request a password reset. Password self-service will be enabled in an upcoming release.",
    });
  };

  const handleContactSupport = () => {
    setDialogState({
      isOpen: true,
      title: "CMS Technical Support",
      message:
        "Need help accessing the Cumberland Motor Inn Content Management System? Please contact support at admin@cumberlandmotorinn.com or reach out to your website administrator.",
    });
  };

  const handlePrivacyPolicy = () => {
    setDialogState({
      isOpen: true,
      title: "Privacy Policy",
      message:
        "Cumberland Motor Inn respects your privacy and is committed to protecting administrator data and site assets. Full security terms apply upon authentication deployment.",
    });
  };

  return (
    <div className="w-full lg:w-[45%] bg-[#F7F4EE] flex flex-col justify-between p-6 sm:p-8 lg:px-10 lg:py-6 min-h-screen lg:min-h-0 lg:h-screen lg:max-h-screen overflow-y-auto lg:overflow-hidden">
      <div className="w-full max-w-[460px] xl:max-w-[480px] mx-auto my-auto py-2">
        <h1 className="font-cormorant text-3xl sm:text-4xl lg:text-[46px] font-semibold text-[#0F302A] leading-[1.05] mb-1.5">
          Welcome back
        </h1>
        <p className="font-manrope text-sm sm:text-base text-[#50544E] mb-5 lg:mb-6 font-light">
          Sign in to manage your website content.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {statusMessage && (
            <div
              className={`p-3 rounded-lg text-xs sm:text-sm font-manrope font-medium flex items-center gap-2.5 animate-in fade-in
                ${statusMessage.type === "success" ? "bg-[#E9EFE8] border border-[#52C92D]/40 text-[#17352D]" : ""}
                ${statusMessage.type === "error" ? "bg-red-50 border border-red-300/60 text-red-800" : ""}
                ${statusMessage.type === "info" ? "bg-[#F7F4EE] border border-[#D9D0C4] text-[#17352D]" : ""}
              `}
              role="status"
              aria-live="polite"
            >
              {statusMessage.type === "error" ? (
                <svg className="w-4 h-4 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              ) : statusMessage.type === "success" ? (
                <svg className="w-4 h-4 text-[#52C92D] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-[#80563E] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <span className="leading-snug">{statusMessage.text}</span>
            </div>
          )}

          <div>
            <label htmlFor="admin-email" className="block text-xs sm:text-sm font-medium text-[#17352D] mb-1.5 font-manrope">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#50544E]">
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                placeholder="admin@cumberlandmotorinn.com"
                autoComplete="username"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                disabled={isLoading}
                aria-invalid={Boolean(emailError)}
                aria-describedby={emailError ? "email-error" : undefined}
                className={`w-full h-[50px] sm:h-[52px] pl-11 pr-4 bg-white border ${
                  emailError ? "border-red-500" : "border-[#D9D0C4]"
                } rounded-lg text-[#17352D] text-sm placeholder-[#50544E]/50 font-manrope focus:outline-none focus:ring-2 focus:ring-[#80563E] focus:border-[#80563E] transition-all disabled:opacity-60 disabled:cursor-not-allowed`}
              />
            </div>
            {emailError && (
              <p id="email-error" className="mt-1 text-xs text-red-600 font-manrope font-medium">
                {emailError}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-xs sm:text-sm font-medium text-[#17352D] mb-1.5 font-manrope">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#50544E]">
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError("");
                }}
                placeholder="••••••••••••"
                autoComplete="current-password"
                disabled={isLoading}
                aria-invalid={Boolean(passwordError)}
                aria-describedby={passwordError ? "password-error" : undefined}
                className={`w-full h-[50px] sm:h-[52px] pl-11 pr-11 bg-white border ${
                  passwordError ? "border-red-500" : "border-[#D9D0C4]"
                } rounded-lg text-[#17352D] text-sm placeholder-[#50544E]/50 font-manrope focus:outline-none focus:ring-2 focus:ring-[#80563E] focus:border-[#80563E] transition-all disabled:opacity-60 disabled:cursor-not-allowed`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#50544E] hover:text-[#17352D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#80563E] rounded-r-lg transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.05 10.05 0 012.122-.063c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {passwordError && (
              <p id="password-error" className="mt-1 text-xs text-red-600 font-manrope font-medium">
                {passwordError}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 pt-0.5">
            <label className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#50544E] font-manrope cursor-pointer select-none group">
              <span className="relative inline-flex items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                />
                <span className="w-4 h-4 rounded border border-[#D9D0C4] bg-white peer-checked:bg-[#80563E] peer-checked:border-[#80563E] transition-colors flex items-center justify-center">
                  {rememberMe && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
              </span>
              <span className="group-hover:text-[#17352D] transition-colors">Remember me</span>
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={isLoading}
              className="text-xs sm:text-sm text-[#80563E] hover:text-[#69452F] font-medium underline underline-offset-2 transition-colors font-manrope disabled:opacity-60"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[50px] sm:h-[52px] bg-[#80563E] hover:bg-[#69452F] text-white font-manrope text-sm font-semibold tracking-wider uppercase rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#80563E] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                SIGNING IN…
              </>
            ) : (
              "SIGN IN"
            )}
          </button>
        </form>

        <div className="mt-5 rounded-xl bg-[#0F302A]/95 text-white p-4 border border-[#80563E]/30">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-[#52C92D]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45L12 11.08 5.1 7.63 12 4.18zM4 8.83l7 3.5v7.28l-7-3.5V8.83zm9 10.78v-7.28l7-3.5v7.28l-7 3.5z" />
            </svg>
            <span className="text-[11px] uppercase tracking-[0.18em] text-[#f7f4ee]/60 font-manrope font-bold">Setup Credentials</span>
          </div>
          <div className="space-y-1 text-xs font-manrope text-[#f7f4ee]/85 leading-relaxed">
            <div><span className="text-[#f7f4ee]/50">Email:</span> <code className="text-[#52C92D] bg-black/20 px-1.5 py-0.5 rounded">admin@cumberlandmotorinn.com</code></div>
            <div><span className="text-[#f7f4ee]/50">Password:</span> <code className="text-[#52C92D] bg-black/20 px-1.5 py-0.5 rounded">Admin@12345</code></div>
            <p className="pt-1.5 text-[10px] text-[#f7f4ee]/40">
              Run <code className="text-[#80563E]/90">npm run seed</code> first in the backend folder to create this user.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-xs text-[#50544E]/80 font-manrope mt-4">
          <svg className="w-3.5 h-3.5 text-[#17352D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Secure administrator access</span>
        </div>

        <div className="border-t border-[#D9D0C4]/60 my-5 lg:my-6" />

        <div className="text-center text-xs sm:text-sm text-[#50544E] font-manrope">
          <span>Need help accessing the CMS? </span>
          <button
            type="button"
            onClick={handleContactSupport}
            className="font-medium text-[#80563E] hover:text-[#69452F] underline underline-offset-2 transition-colors inline-block"
          >
            Contact support
          </button>
        </div>
      </div>

      <AdminLoginFooter onOpenPrivacy={handlePrivacyPolicy} />

      <AdminHelpDialog
        isOpen={dialogState.isOpen}
        onClose={() => setDialogState({ isOpen: false, title: "", message: "" })}
        title={dialogState.title}
        message={dialogState.message}
      />
    </div>
  );
};
