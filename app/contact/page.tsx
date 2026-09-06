import type { Metadata } from "next";
import PublicHeader from "@/components/layout/PublicHeader";
import ContactHero from "@/components/contact/ContactHero";
import ContactDetails from "@/components/contact/ContactDetails";
import ContactEnquiryForm from "@/components/contact/ContactEnquiryForm";
import ContactLocationSection from "@/components/contact/ContactLocationSection";
import ContactFaqSection from "@/components/contact/ContactFaqSection";
import ContactFinalCta from "@/components/contact/ContactFinalCta";
import PublicFooter from "@/components/layout/PublicFooter";

export const metadata: Metadata = {
  title: "Contact Us | Cumberland Motor Inn",
  description:
    "Get in touch with Cumberland Motor Inn for room information, local recommendations and help planning your stay.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-ivory)] text-[var(--color-body)]">
      <PublicHeader />
      <main className="flex-1">
        <ContactHero />

        {/* Contact Details & Enquiry Form Container Section */}
        <section className="w-full bg-[#f7f4ee] py-16 sm:py-20 lg:py-24 border-b border-[#d9d0c4]/40">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-6 xl:col-span-5">
                <ContactDetails />
              </div>
              <div className="lg:col-span-6 xl:col-span-7">
                <ContactEnquiryForm />
              </div>
            </div>
          </div>
        </section>

        <ContactLocationSection />
        <ContactFaqSection />
        <ContactFinalCta />
      </main>
      <PublicFooter />
    </div>
  );
}
