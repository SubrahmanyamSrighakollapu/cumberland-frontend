import type { Metadata } from "next";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";

export const metadata: Metadata = {
  title: "Terms & Conditions | Cumberland Motor Inn",
  description: "Read the Terms & Conditions for booking and staying at Cumberland Motor Inn.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f4ee] text-[#50544e]">
      <PublicHeader />
      <main className="flex-1 py-16 sm:py-20 lg:py-24">
        <div className="max-w-[840px] mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold tracking-wider text-[#80563e] uppercase mb-2 block font-sans">
            LEGAL INFORMATION
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#20382f] mb-6 font-normal">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs text-[#50544e]/70 mb-8 font-sans">
            Last Updated: January 1, 2026
          </p>

          <div className="prose prose-stone max-w-none space-y-6 text-sm sm:text-base leading-relaxed font-sans text-[#50544e]">
            <section>
              <h2 className="font-serif text-xl sm:text-2xl text-[#20382f] mb-3">1. Booking &amp; Reservations</h2>
              <p>
                All room bookings made online or by phone require a valid credit card guarantee. Rates are displayed in local currency and are subject to availability and applicable taxes.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl sm:text-2xl text-[#20382f] mb-3">2. Cancellation Policy</h2>
              <p>
                Cancellations made up to 48 hours prior to 2:00 PM check-in on the arrival date incur no fee. Cancellations within 48 hours will be charged for the first night of the stay.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl sm:text-2xl text-[#20382f] mb-3">3. Check-in &amp; Check-out</h2>
              <p>
                Standard check-in time is from 2:00 PM onwards, and check-out is strictly by 10:00 AM. Early check-in or late check-out requests are subject to availability.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl sm:text-2xl text-[#20382f] mb-3">4. Guest Conduct &amp; Property Policy</h2>
              <p>
                Cumberland Motor Inn maintains a smoke-free policy across all indoor rooms and suites. Guests are expected to maintain respectful behavior toward staff and fellow guests during their stay.
              </p>
            </section>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
