import { experiencesList } from "@/data/home";
import ExperienceCard from "./ExperienceCard";
import Reveal from "@/components/ui/Reveal";

export default function ExperiencesSection() {
  return (
    <section className="w-full bg-[#17352d] text-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal direction="up" duration={600}>
          <div className="mb-10 md:mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#80563e] uppercase mb-2 block">
              EXPERIENCES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-white font-normal leading-tight">
              Make more of your stay.
            </h2>
          </div>
        </Reveal>

        {/* Experience Cards Grid with Stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {experiencesList.map((experience, index) => (
            <Reveal
              key={experience.id}
              direction="up"
              staggerIndex={index}
              duration={600}
            >
              <ExperienceCard experience={experience} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
