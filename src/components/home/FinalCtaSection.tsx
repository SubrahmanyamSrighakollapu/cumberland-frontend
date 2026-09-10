import Reveal from "@/components/ui/Reveal";
import { BOOK_DIRECT_URL } from "@/utils/siteLinks";

export default function FinalCtaSection() {
  return (
    <section className="w-full bg-[#80563e] text-white py-14 sm:py-16 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" duration={600}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white mb-2 leading-tight">
                Ready for your Hunter Valley getaway?
              </h2>
              <p className="text-base sm:text-lg text-white/90 font-sans max-w-2xl">
                Enjoy clean, comfortable accommodation in Cessnock with easy access to legendary cellar doors, dining, and natural attractions.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href={BOOK_DIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-1.5 h-[50px] px-8 bg-white hover:bg-[#f7f4ee] text-[#80563e] font-semibold text-sm tracking-wider uppercase rounded-lg shadow-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>BOOK YOUR STAY</span>
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
