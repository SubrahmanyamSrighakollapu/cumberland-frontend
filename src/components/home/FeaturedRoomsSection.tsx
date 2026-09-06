import Link from "next/link";
import { featuredRooms } from "@/data/home";
import RoomCard from "./RoomCard";
import Reveal from "@/components/ui/Reveal";

export default function FeaturedRoomsSection() {
  return (
    <section className="w-full bg-[#f7f4ee] py-16 sm:py-20 lg:py-24 border-b border-[#d9d0c4]/40 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal direction="up" duration={600}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-12">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] text-[#80563e] uppercase mb-2 block">
                OUR ROOMS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#20382f] font-normal leading-tight">
                Rooms designed for real rest.
              </h2>
            </div>

            <div>
              <Link
                href="/rooms"
                className="group inline-flex items-center justify-center gap-1.5 h-[46px] px-6 bg-transparent border border-[#d9d0c4] hover:border-[#80563e] text-[#20382f] hover:text-[#80563e] text-sm font-semibold tracking-wider rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80563e]"
              >
                <span>VIEW ALL ROOMS</span>
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Room Cards Grid with Stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredRooms.map((room, index) => (
            <Reveal
              key={room.id}
              direction="up"
              staggerIndex={index}
              duration={600}
              className="h-full"
            >
              <RoomCard room={room} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
