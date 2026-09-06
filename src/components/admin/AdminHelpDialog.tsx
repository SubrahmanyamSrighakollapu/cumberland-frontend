"use client";

import React, { useEffect } from "react";

interface AdminHelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export const AdminHelpDialog: React.FC<AdminHelpDialogProps> = ({
  isOpen,
  onClose,
  title,
  message,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div
        className="bg-white rounded-xl max-w-md w-full p-6 sm:p-8 shadow-xl border border-[#D9D0C4] text-[#50544E] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-[#0F302A] p-1 rounded-md transition-colors"
          aria-label="Close dialog"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#E9EFE8] text-[#17352D] flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-[#80563E]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3
            id="dialog-title"
            className="font-cormorant text-2xl font-semibold text-[#0F302A]"
          >
            {title}
          </h3>
        </div>

        <p className="text-sm font-manrope leading-relaxed text-[#50544E] mb-6">
          {message}
        </p>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#17352D] hover:bg-[#0F302A] text-white text-xs font-semibold uppercase tracking-wider rounded font-manrope transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
