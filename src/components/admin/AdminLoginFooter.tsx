import React from "react";
import Link from "next/link";

interface AdminLoginFooterProps {
  onOpenPrivacy?: () => void;
}

export const AdminLoginFooter: React.FC<AdminLoginFooterProps> = ({
  onOpenPrivacy,
}) => {
  return (
    <footer className="mt-6 pt-4 border-t border-[#D9D0C4]/40 text-xs text-[#50544E] font-manrope">
      <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
        <span>&copy; 2026 Cumberland Motor Inn. All rights reserved.</span>

        <div className="flex items-center gap-3">
          {onOpenPrivacy ? (
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="hover:text-[#17352D] underline underline-offset-2 transition-colors"
            >
              Privacy Policy
            </button>
          ) : (
            <Link
              href="/contact"
              className="hover:text-[#17352D] underline underline-offset-2 transition-colors"
            >
              Privacy Policy
            </Link>
          )}

          <span className="text-[#D9D0C4]">&bull;</span>

          <Link
            href="/"
            className="text-[#80563E] hover:text-[#69452F] font-medium transition-colors inline-flex items-center gap-1"
          >
            <span>&larr;</span> Back to website
          </Link>
        </div>
      </div>
    </footer>
  );
};
