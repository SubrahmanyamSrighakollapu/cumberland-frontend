import Image from "next/image";
import Link from "next/link";
import { Experience } from "@/data/home";

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Link
      href={experience.route}
      className="group relative aspect-[3/2] w-full rounded-xl overflow-hidden shadow-md block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52c92d]"
    >
      {/* Background Photograph */}
      <Image
        src={experience.image}
        alt={`${experience.title} experience at Cumberland Motor Inn`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-500 ease-out"
      />

      {/* Base Legibility Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(to top, rgba(15, 48, 42, 0.92) 0%, rgba(15, 48, 42, 0.52) 50%, rgba(15, 48, 42, 0.1) 100%)",
        }}
      />

      {/* Slightly Strengthened Gradient Overlay on Hover */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(to top, rgba(15, 48, 42, 0.96) 0%, rgba(15, 48, 42, 0.65) 55%, rgba(15, 48, 42, 0.2) 100%)",
        }}
      />

      {/* Content Container Positioned Lower Left with subtle upward movement */}
      <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col justify-end text-white transition-transform duration-300 ease-out group-hover:-translate-y-1">
        <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-1">
          {experience.title}
        </h3>

        <p className="text-sm text-[#f7f4ee]/90 leading-relaxed mb-3 font-sans line-clamp-2">
          {experience.description}
        </p>

        <div className="text-xs font-semibold tracking-wider text-white uppercase flex items-center gap-1.5 group-hover:text-[#52c92d] transition-colors duration-200">
          <span>EXPLORE</span>
          <span className="inline-block group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true">
            &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
