import type { Metadata } from "next";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import Reveal from "@/components/ui/Reveal";
import { siteData } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Cumberland Motor Inn",
  description:
    "Learn how Cumberland Motor Inn collects, handles, uses and protects your personal information when booking or visiting our Cessnock motel.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f4ee] text-[#50544e]">
      <PublicHeader />

      <main className="flex-1">
        {/* Header Hero Banner */}
        <section className="relative w-full bg-[#0f302a] text-[#f7f4ee] py-16 sm:py-20 lg:py-24 border-b border-[#80563e]/30">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal direction="up" duration={600}>
              <div className="max-w-3xl">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b86f4b] mb-3 block font-sans">
                  LEGAL &amp; PRIVACY
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f7f4ee] mb-4 leading-tight">
                  Privacy Policy
                </h1>
                <p className="text-base sm:text-lg text-[#f7f4ee]/85 font-sans font-light leading-relaxed">
                  Cumberland Motor Inn is committed to protecting your privacy and ensuring your personal information is handled with care and security.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Content Body */}
        <section className="py-16 sm:py-20">
          <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-[#d9d0c4] rounded-2xl p-6 sm:p-10 lg:p-12 shadow-sm space-y-10">

              {/* 1. Introduction */}
              <Reveal direction="up" delay={100}>
                <div>
                  <h2 className="font-serif text-2xl font-normal text-[#20382f] mb-3 border-b border-[#d9d0c4] pb-2">
                    1. Introduction
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed text-[#50544e]">
                    At Cumberland Motor Inn, we respect the privacy of our guests and website visitors. This Privacy Policy outlines how we collect, use, store, and safeguard your personal information when you interact with our website, make a reservation, or stay at our property in Cessnock, NSW.
                  </p>
                </div>
              </Reveal>

              {/* 2. Information We Collect */}
              <Reveal direction="up" delay={150}>
                <div>
                  <h2 className="font-serif text-2xl font-normal text-[#20382f] mb-3 border-b border-[#d9d0c4] pb-2">
                    2. Information We Collect
                  </h2>
                  <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#50544e]">
                    <p>
                      We collect information necessary to provide accommodation services, process reservations, and communicate effectively with our guests. This may include:
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-[#20382f]">
                      <li>Personal identification information (such as your full name and date of birth).</li>
                      <li>Contact details (including your email address, phone number, and physical billing/residential address).</li>
                      <li>Booking details (check-in and check-out dates, room preferences, and special requirements).</li>
                      <li>Payment and transaction information processed securely for room deposits or stay balances.</li>
                      <li>Feedback, enquiries, or correspondence submitted through our website contact forms.</li>
                    </ul>
                  </div>
                </div>
              </Reveal>

              {/* 3. How We Use Your Information */}
              <Reveal direction="up" delay={200}>
                <div>
                  <h2 className="font-serif text-2xl font-normal text-[#20382f] mb-3 border-b border-[#d9d0c4] pb-2">
                    3. How We Use Your Information
                  </h2>
                  <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#50544e]">
                    <p>
                      Cumberland Motor Inn uses your personal information for purpose-driven guest management, including:
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-[#20382f]">
                      <li>Processing and confirming your room reservations and accommodation requests.</li>
                      <li>Communicating essential pre-arrival information, reception hours, or check-in instructions.</li>
                      <li>Providing guest assistance and responding to enquiries or feedback.</li>
                      <li>Fulfilling legal, accounting, tax, and regulatory compliance obligations.</li>
                    </ul>
                  </div>
                </div>
              </Reveal>

              {/* 4. Data Protection & Security */}
              <Reveal direction="up" delay={250}>
                <div>
                  <h2 className="font-serif text-2xl font-normal text-[#20382f] mb-3 border-b border-[#d9d0c4] pb-2">
                    4. Data Protection &amp; Security
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed text-[#50544e]">
                    We maintain technical, administrative, and physical security measures designed to protect your personal information against unauthorized access, disclosure, loss, misuse, or alteration. Access to guest information is restricted strictly to authorized staff members who require it to perform their duties.
                  </p>
                </div>
              </Reveal>

              {/* 5. Disclosure to Third Parties */}
              <Reveal direction="up" delay={300}>
                <div>
                  <h2 className="font-serif text-2xl font-normal text-[#20382f] mb-3 border-b border-[#d9d0c4] pb-2">
                    5. Disclosure to Third Parties
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed text-[#50544e]">
                    Cumberland Motor Inn does not sell, rent, or trade your personal information to third parties. We may disclose your information to trusted third-party service providers (such as secure payment gateway processors or booking engine providers) strictly for the purpose of completing your reservation, or where required by law.
                  </p>
                </div>
              </Reveal>

              {/* 6. Website Cookies & Analytics */}
              <Reveal direction="up" delay={350}>
                <div>
                  <h2 className="font-serif text-2xl font-normal text-[#20382f] mb-3 border-b border-[#d9d0c4] pb-2">
                    6. Cookies &amp; Website Usage
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed text-[#50544e]">
                    Our website may use standard session cookies and basic analytics tools to optimize website navigation, remember user preferences, and analyze aggregate traffic trends. Cookies do not contain sensitive personal data and can be disabled through your web browser settings if preferred.
                  </p>
                </div>
              </Reveal>

              {/* 7. Accessing & Correcting Your Information */}
              <Reveal direction="up" delay={400}>
                <div>
                  <h2 className="font-serif text-2xl font-normal text-[#20382f] mb-3 border-b border-[#d9d0c4] pb-2">
                    7. Accessing &amp; Correcting Your Information
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed text-[#50544e]">
                    You have the right to request access to the personal information held by Cumberland Motor Inn about you, or to request corrections if any details are inaccurate or out of date. To make a request, please contact our team using the details provided below.
                  </p>
                </div>
              </Reveal>

              {/* 8. Contact Information Box */}
              <Reveal direction="up" delay={450}>
                <div className="mt-8 p-6 sm:p-8 bg-[#f7f4ee] rounded-xl border border-[#d9d0c4] space-y-3">
                  <h3 className="font-serif text-xl font-normal text-[#20382f]">
                    Contacting Cumberland Motor Inn Regarding Privacy
                  </h3>
                  <p className="text-sm text-[#50544e]">
                    If you have any questions, concerns, or requests regarding this Privacy Policy or how your personal information is handled, please contact us at:
                  </p>
                  <div className="text-sm font-medium text-[#20382f] space-y-1 font-sans">
                    <p className="font-semibold text-base">{siteData.name}</p>
                    <p>57–61 Cumberland Street, Cessnock, NSW 2325</p>
                    <p>Email: <a href={`mailto:${siteData.contact.email}`} className="text-[#80563e] underline hover:text-[#68432f]">{siteData.contact.email}</a></p>
                    <p>Phone: <a href={siteData.contact.phoneRaw} className="text-[#80563e] underline hover:text-[#68432f]">{siteData.contact.phone}</a></p>
                  </div>
                </div>
              </Reveal>

            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
