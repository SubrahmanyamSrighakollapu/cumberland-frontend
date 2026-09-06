import { aboutAmenitiesData } from "@/data/about";
import Reveal from "@/components/ui/Reveal";

export default function AboutAmenitiesStrip() {
  const renderIcon = (icon: string) => {
    switch (icon) {
      case "wifi":
        return (
          <svg
            className="w-5 h-5 text-[#20382f]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
            />
          </svg>
        );
      case "parking":
        return (
          <svg
            className="w-5 h-5 text-[#20382f]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10h10zm0 0h6l3-5v-5h-9v10z"
            />
          </svg>
        );
      case "ev":
        return (
          <svg
            className="w-5 h-5 text-[#20382f]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        );
      case "pool":
        return (
          <svg
            className="w-5 h-5 text-[#20382f]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 15C3 15 5.5 13 8 13C10.5 13 13 15 13 15C13 15 15.5 13 18 13C20.5 13 23 15 23 15M3 19C3 19 5.5 17 8 17C10.5 17 13 19 13 19C13 19 15.5 17 18 17C20.5 17 23 19 23 19M16 10L14 3M12 10L10 3"
            />
          </svg>
        );
      case "kitchen":
        return (
          <svg
            className="w-5 h-5 text-[#20382f]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
            />
          </svg>
        );
      case "bbq":
        return (
          <svg
            className="w-5 h-5 text-[#20382f]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
            />
          </svg>
        );
    }
  };

  return (
    <div className="pt-10 border-t border-[#d9d0c4] mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {aboutAmenitiesData.map((item, index) => (
        <Reveal
          key={item.id}
          direction="up"
          staggerIndex={index}
          duration={600}
        >
          <div
            className={`flex items-center gap-2.5 px-3 py-2 ${
              index < aboutAmenitiesData.length - 1 ? "lg:border-r border-[#d9d0c4]/60" : ""
            }`}
          >
            <div className="p-2 rounded-md bg-[#e9efe8] text-[#20382f] shrink-0">
              {renderIcon(item.icon)}
            </div>
            <span className="text-xs font-semibold text-[#20382f] whitespace-nowrap">
              {item.label}
            </span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

