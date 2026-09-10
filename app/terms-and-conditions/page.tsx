import type { Metadata } from "next";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import Reveal from "@/components/ui/Reveal";
import { siteData } from "@/data/site";
import { BOOK_DIRECT_URL } from "@/utils/siteLinks";

export const metadata: Metadata = {
  title: "Terms & Conditions | Cumberland Motor Inn",
  description:
    "Review the booking terms, payment policies, reception hours, check-in/check-out times, child policy and stay guidelines for Cumberland Motor Inn in Cessnock, NSW.",
};

export default function TermsAndConditionsPage() {
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
                  GUEST INFORMATION
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f7f4ee] mb-4 leading-tight">
                  Terms &amp; Conditions
                </h1>
                <p className="text-base sm:text-lg text-[#f7f4ee]/85 font-sans font-light leading-relaxed">
                  Please review our booking, stay, payment, and cancellation terms prior to confirming your reservation at Cumberland Motor Inn.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Content Body */}
        <section className="py-16 sm:py-20">
          <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-[#d9d0c4] rounded-2xl p-6 sm:p-10 lg:p-12 shadow-sm space-y-10">

              {/* 1. Payment & Booking */}
              <Reveal direction="up" delay={100}>
                <div>
                  <h2 className="font-serif text-2xl font-normal text-[#20382f] mb-3 border-b border-[#d9d0c4] pb-2">
                    1. Payment &amp; Bookings
                  </h2>
                  <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#50544e]">
                    <p className="font-medium text-[#20382f]">
                      Full payment will be taken at the time of booking.
                    </p>
                    <p>
                      Reservations are confirmed upon receipt of full payment. Guests must present valid identification and the payment card used for booking upon arrival.
                    </p>
                    <p>
                      There is a surcharge added for Amex and Diners Card payments.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* 2. Reception Hours */}
              <Reveal direction="up" delay={150}>
                <div>
                  <h2 className="font-serif text-2xl font-normal text-[#20382f] mb-3 border-b border-[#d9d0c4] pb-2">
                    2. Reception Hours
                  </h2>
                  <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#50544e]">
                    <p className="font-medium text-[#20382f]">
                      Reception is open during the following hours:
                    </p>
                    <div className="bg-[#f7f4ee] p-4 rounded-xl border border-[#d9d0c4]/70 space-y-1 font-mono text-sm text-[#20382f]">
                      <div>07:00 am &ndash; 09:00 pm Monday to Friday</div>
                      <div>08:00 am &ndash; 09:00 pm Saturday &ndash; Sunday</div>
                    </div>
                    <p>
                      If you anticipate arriving outside of standard reception hours, please contact our team in advance to discuss key collection instructions.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* 3. Check-In, Check-Out & Fees */}
              <Reveal direction="up" delay={200}>
                <div>
                  <h2 className="font-serif text-2xl font-normal text-[#20382f] mb-3 border-b border-[#d9d0c4] pb-2">
                    3. Check-in, Check-out &amp; Fee Structure
                  </h2>
                  <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#50544e]">
                    <ul className="list-disc pl-5 space-y-1 text-[#20382f] font-medium">
                      <li>Check-in: From 2:00 pm till 9:00 pm</li>
                      <li>Check-out: By 10:00 am</li>
                    </ul>
                    <p className="p-4 bg-[#f7f4ee] rounded-xl border border-[#d9d0c4]/70 text-[#80563e] font-medium">
                      Management reserves the right to apply a $20.00 per hour fee for early check-ins prior to 2:00 pm. This also applies to late check-ins after 09:00 pm and late check-outs after 10:00 am.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* 4. Child Policy */}
              <Reveal direction="up" delay={250}>
                <div>
                  <h2 className="font-serif text-2xl font-normal text-[#20382f] mb-3 border-b border-[#d9d0c4] pb-2">
                    4. Child Policy &amp; Extra Bedding
                  </h2>
                  <div className="space-y-2 text-sm sm:text-base leading-relaxed text-[#50544e]">
                    <p>
                      Children up to 2 years can use a cot upon request or an existing bed.
                    </p>
                    <p>
                      Children up to 17 years can use an existing bed.
                    </p>
                    <p className="font-medium text-[#20382f]">
                      An extra bed charge of $20.00 per night applies for persons aged 18 years and over.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* 5. Cancellation & Refund Policy */}
              <Reveal direction="up" delay={300}>
                <div>
                  <h2 className="font-serif text-2xl font-normal text-[#20382f] mb-3 border-b border-[#d9d0c4] pb-2">
                    5. Cancellation &amp; Refund Policy
                  </h2>
                  <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#50544e]">
                    <p className="font-bold text-[#80563e] tracking-wide">
                      NO REFUNDS AFTER BOOKINGS.
                    </p>
                    <p>
                      All cancellations will incur a $20.00 administration fee. A 24 hour cancellation period applies prior to 2:00 pm on the date of arrival. After that time no deposits will be refunded.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* 6. Car Parking & Facilities */}
              <Reveal direction="up" delay={350}>
                <div>
                  <h2 className="font-serif text-2xl font-normal text-[#20382f] mb-3 border-b border-[#d9d0c4] pb-2">
                    6. Parking &amp; Guest Facilities
                  </h2>
                  <div className="space-y-2 text-sm sm:text-base leading-relaxed text-[#50544e]">
                    <p>
                      <strong className="text-[#20382f]">Car Parking:</strong> Off-street parking is provided at no extra charge for registered guests.
                    </p>
                    <p>
                      <strong className="text-[#20382f]">Facilities:</strong> Guests enjoy access to our outdoor swimming pool, free Wi-Fi, and non-smoking rooms. Guests must follow facility safety guidelines at all times.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* 7. Guest Conduct & Damage */}
              <Reveal direction="up" delay={400}>
                <div>
                  <h2 className="font-serif text-2xl font-normal text-[#20382f] mb-3 border-b border-[#d9d0c4] pb-2">
                    7. Guest Conduct &amp; Motel Policies
                  </h2>
                  <div className="space-y-2 text-sm sm:text-base leading-relaxed text-[#50544e]">
                    <p>
                      All guest rooms are strictly non-smoking. Management reserves the right to charge a cleaning fee if smoking occurs inside guest rooms.
                    </p>
                    <p>
                      Guests are expected to treat motel facilities and other guests with respect. Any damage to property or excessive cleaning required will be charged to the guest&rsquo;s card on file.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Assistance & Contact Block */}
              <Reveal direction="up" delay={450}>
                <div className="mt-8 p-6 bg-[#f7f4ee] rounded-xl border border-[#d9d0c4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-lg font-normal text-[#20382f]">
                      Questions about your stay?
                    </h3>
                    <p className="text-xs sm:text-sm text-[#50544e]">
                      {siteData.name} &bull; {siteData.contact.address}
                    </p>
                    <p className="text-xs sm:text-sm text-[#50544e]">
                      Phone: {siteData.contact.phone} | Email: {siteData.contact.email}
                    </p>
                  </div>
                  <a
                    href={BOOK_DIRECT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-[#80563e] hover:bg-[#68432f] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-xs shrink-0"
                  >
                    BOOK DIRECT &rarr;
                  </a>
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
