import Image from "next/image";
import Link from "next/link";
import { galleryImages } from "@/data/home";
import Reveal from "@/components/ui/Reveal";

export default function GalleryPreviewSection() {
  return (
    <section className="w-full bg-[#f7f4ee] pb-16 sm:pb-20 lg:pb-24 pt-4 border-b border-[#d9d0c4]/40 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Eyebrow & View Gallery Header Row */}
        <Reveal direction="up" duration={600}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#80563e] uppercase block">
              OUR GALLERY
            </span>

            <Link
              href="/gallery"
              className="group inline-flex items-center justify-center gap-1.5 h-[42px] px-5 bg-transparent border border-[#d9d0c4] hover:border-[#80563e] text-[#20382f] hover:text-[#80563e] text-xs font-semibold tracking-wider rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80563e]"
            >
              <span>VIEW GALLERY</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </Reveal>

        {/* 5 Gallery Thumbnail Grid with Stagger */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {galleryImages.map((img, index) => (
            <Reveal
              key={img.id}
              direction="up"
              distance={10}
              staggerIndex={index}
              duration={600}
            >
              <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-[#e9efe8] shadow-xs group cursor-pointer border border-[#d9d0c4]/40 hover:border-[#80563e]/40 transition-colors">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
