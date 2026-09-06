import { Amenity } from "@/data/home";

interface AmenityCardProps {
  amenity: Amenity;
}

export default function AmenityCard({ amenity }: AmenityCardProps) {
  // Render SVG icons matching each amenity type
  const renderIcon = () => {
    switch (amenity.iconName) {
      case "pool":
        return (
          <svg
            className="w-7 h-7 text-[#20382f] group-hover:text-[#80563e] transition-colors duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.6}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 15C3 15 5.5 13 8 13C10.5 13 13 15 13 15C13 15 15.5 13 18 13C20.5 13 23 15 23 15M3 19C3 19 5.5 17 8 17C10.5 17 13 19 13 19C13 19 15.5 17 18 17C20.5 17 23 19 23 19M16 10L14 3M12 10L10 3"
            />
          </svg>
        );
      case "parking":
        return (
          <svg
            className="w-7 h-7 text-[#20382f] group-hover:text-[#80563e] transition-colors duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.6}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10h10zm0 0h6l3-5v-5h-9v10z"
            />
          </svg>
        );
      case "wifi":
        return (
          <svg
            className="w-7 h-7 text-[#20382f] group-hover:text-[#80563e] transition-colors duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.6}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
            />
          </svg>
        );
      case "ev":
        return (
          <svg
            className="w-7 h-7 text-[#20382f] group-hover:text-[#80563e] transition-colors duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.6}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        );
      case "kitchen":
        return (
          <svg
            className="w-7 h-7 text-[#20382f] group-hover:text-[#80563e] transition-colors duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.6}
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
            className="w-7 h-7 text-[#20382f] group-hover:text-[#80563e] transition-colors duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.6}
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
    <div className="group bg-white border border-[#d9d0c4] rounded-xl p-6 sm:p-7 flex items-start gap-4 hover:border-[#80563e]/50 hover:shadow-xs transition-all duration-280 ease-out">
      <div className="p-2.5 rounded-lg bg-[#e9efe8] group-hover:bg-[#f2e9e2] shrink-0 mt-0.5 transition-colors duration-280">
        {renderIcon()}
      </div>
      <div>
        <h3 className="font-serif text-xl text-[#20382f] font-normal mb-1">
          {amenity.title}
        </h3>
        <p className="text-sm text-[#50544e] leading-relaxed font-sans">
          {amenity.description}
        </p>
      </div>
    </div>
  );
}
