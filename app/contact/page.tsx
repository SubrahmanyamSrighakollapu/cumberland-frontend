import PublicHeader from "@/components/layout/PublicHeader";
import ContactHero from "@/components/contact/ContactHero";
import ContactDetails from "@/components/contact/ContactDetails";
import ContactEnquiryForm from "@/components/contact/ContactEnquiryForm";
import ContactLocationSection from "@/components/contact/ContactLocationSection";
import ContactFaqSection from "@/components/contact/ContactFaqSection";
import ContactFinalCta from "@/components/contact/ContactFinalCta";
import PublicFooter from "@/components/layout/PublicFooter";
import { buildRouteMetadata } from "@/utils/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata = buildRouteMetadata({
  title: "Contact & Location | Cumberland Motor Inn Cessnock",
  description:
    "Find Cumberland Motor Inn at 57–61 Cumberland Street, Cessnock NSW 2325. Call (02) 4990 6633 for accommodation enquiries and directions.",
  canonical: "https://www.cumberlandmotorinn.com.au/contact",
  socialImage: {
    url: "/images/cumberland-reception-brick-archway.jpg",
    alt: "Reception entrance and location at Cumberland Motor Inn in Cessnock",
  },
});

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-ivory)] text-[var(--color-body)]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Contact & Location", url: "/contact" },
        ]}
      />
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
