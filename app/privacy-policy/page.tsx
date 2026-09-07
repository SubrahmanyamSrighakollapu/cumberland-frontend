import type { Metadata } from "next";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";

export const metadata: Metadata = {
  title: "Privacy Policy | Cumberland Motor Inn",
  description: "Read the Privacy Policy for Cumberland Motor Inn.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f4ee] text-[#50544e]">
      <PublicHeader />
      <main className="flex-1 py-16 sm:py-20 lg:py-24">
        <div className="max-w-[840px] mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold tracking-wider text-[#80563e] uppercase mb-2 block font-sans">
            LEGAL INFORMATION
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#20382f] mb-6 font-normal">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#50544e]/70 mb-8 font-sans">
            Last Updated: January 1, 2026
          </p>

          <div className="prose prose-stone max-w-none space-y-6 text-sm sm:text-base leading-relaxed font-sans text-[#50544e]">
            <section>
              <h2 className="font-serif text-xl sm:text-2xl text-[#20382f] mb-3">1. Introduction</h2>
              <p>
                At Cumberland Motor Inn, we respect your privacy and are committed to protecting the personal information you share with us when visiting our website or staying at our property.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl sm:text-2xl text-[#20382f] mb-3">2. Information We Collect</h2>
              <p>
                We collect information that you voluntarily provide to us when booking accommodation, subscribing to our newsletter, or contacting our guest services team. This may include your name, contact details, payment information, and stay preferences.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl sm:text-2xl text-[#20382f] mb-3">3. How We Use Your Information</h2>
              <p>
                Your information is used solely to process room reservations, provide guest support, communicate stay details, improve our services, and send promotional newsletters if you have opted in.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl sm:text-2xl text-[#20382f] mb-3">4. Security & Data Protection</h2>
              <p>
                We employ industry-standard technical and organizational measures to safeguard your personal data against unauthorized access, disclosure, or misuse.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl sm:text-2xl text-[#20382f] mb-3">5. Contact Us</h2>
              <p>
                If you have questions regarding this Privacy Policy or wish to request access to your stored personal information, please contact our front desk via our <a href="/contact" className="text-[#80563e] underline">Contact page</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
