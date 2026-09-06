import { whyChooseUsData } from "@/data/about";
import Reveal from "@/components/ui/Reveal";

export default function WhyChooseUsSection() {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "guests":
        return (
          <svg
            className="w-8 h-8 text-[#20382f]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        );
      case "bed":
        return (
          <svg
            className="w-8 h-8 text-[#20382f]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        );
      case "pin":
        return (
          <svg
            className="w-8 h-8 text-[#20382f]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        );
      case "coffee":
        return (
          <svg
            className="w-8 h-8 text-[#20382f]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
            />
          </svg>
        );
    }
  };

  return (
    <section className="w-full bg-[#e9efe8] py-16 sm:py-20 lg:py-24 border-b border-[#d9d0c4]/40 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal direction="up" duration={600}>
          <div className="mb-10 md:mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#80563e] uppercase mb-2 block">
              WHY GUESTS CHOOSE US
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#20382f] font-normal leading-tight mb-3">
              The details that make a difference.
            </h2>
            <p className="text-base text-[#50544e] font-sans max-w-2xl">
              Thoughtful touches, friendly service and everything you need for a
              relaxed and enjoyable stay.
            </p>
          </div>
        </Reveal>

        {/* 4 Feature Cards Grid with Stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUsData.map((item, index) => (
            <Reveal
              key={item.id}
              direction="up"
              staggerIndex={index}
              duration={650}
            >
              <div className="bg-white border border-[#d9d0c4] rounded-xl p-7 sm:p-8 text-center flex flex-col items-center justify-start hover:border-[#80563e]/50 transition-colors shadow-xs">
                <div className="p-3 rounded-full bg-[#e9efe8] text-[#20382f] mb-5">
                  {renderIcon(item.iconName)}
                </div>
                <h3 className="font-serif text-2xl text-[#20382f] font-normal mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#50544e] leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

