import { aboutStatsData } from "@/data/about";
import Reveal from "@/components/ui/Reveal";

export default function AboutStats() {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "calendar":
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
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
    }
  };

  return (
    <div className="pt-12 border-t border-[#d9d0c4] mt-14 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">
      {aboutStatsData.map((stat, index) => (
        <Reveal
          key={stat.id}
          direction="up"
          staggerIndex={index}
          duration={650}
        >
          <div
            className={`flex items-center gap-4 px-3 sm:px-6 ${
              index < aboutStatsData.length - 1 ? "lg:border-r border-[#d9d0c4]" : ""
            }`}
          >
            <div className="p-2.5 rounded-lg bg-[#e9efe8] shrink-0">
              {renderIcon(stat.iconName)}
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#20382f]">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-[#50544e]">
                {stat.label}
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

