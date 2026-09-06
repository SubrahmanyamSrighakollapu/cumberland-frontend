import Image from "next/image";
import Link from "next/link";
import { Room } from "@/data/home";

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <div className="group bg-white border border-[#d9d0c4] rounded-xl overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out h-full w-full">
      {/* Room Photograph & Body */}
      <div className="flex flex-col flex-1">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e9efe8] shrink-0">
          <Image
            src={room.image}
            alt={`${room.name} guest room at Cumberland Motor Inn`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-[1.035] transition-transform duration-500 ease-out"
          />
        </div>

        {/* Content Container */}
        <div className="p-6 flex flex-col flex-1 justify-between">
          <div>
            {/* Title with fixed height to align all cards */}
            <h3 className="font-serif text-2xl text-[#20382f] font-normal mb-2 line-clamp-1 min-h-[2rem] flex items-center">
              {room.name}
            </h3>

            {/* Description with fixed height & line clamp */}
            <p className="text-sm text-[#50544e] leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem] font-sans">
              {room.description}
            </p>

            {/* Guest & Bed Info */}
            <div className="flex items-center gap-5 text-xs text-[#50544e] pb-3.5 mb-4 border-b border-[#d9d0c4]/60 min-h-[2.25rem]">
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-[#20382f] shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>{room.guests}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-[#20382f] shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span>{room.bed}</span>
              </div>
            </div>

            {/* Amenities Pills with uniform min-height */}
            <div className="flex flex-wrap gap-1.5 mb-4 min-h-[2.75rem] content-start">
              {room.amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#f7f4ee] text-[11px] font-medium text-[#20382f] border border-[#d9d0c4]/40"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Price & Link Row */}
      <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-[#d9d0c4]/40 shrink-0 h-[64px] bg-[#faf8f5]/50">
        <div>
          <span className="text-xs text-[#50544e]">From </span>
          <span className="font-serif text-2xl font-semibold text-[#20382f]">
            ${room.price}
          </span>
          <span className="text-xs text-[#50544e]"> / night</span>
        </div>

        <Link
          href={`/rooms/${room.slug}`}
          className="text-[#80563e] hover:text-[#69452f] text-xs font-semibold tracking-wider flex items-center gap-1.5 uppercase transition-colors"
        >
          <span>VIEW ROOM</span>
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
}
