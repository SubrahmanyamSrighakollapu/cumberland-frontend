import React from "react";
import Image from "next/image";
import { adminLoginBrandData } from "@/data/pages/admin-login";

export const AdminLoginBrandPanel: React.FC = () => {
  const { eyebrow, titleLines, description, footerTag, heroImage, logoImage } =
    adminLoginBrandData;

  return (
    <div className="relative hidden lg:flex lg:w-[55%] flex-col justify-between p-8 xl:p-12 h-screen max-h-screen overflow-hidden bg-[#0F302A]">
      {/* Background Motel Photograph */}
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        priority
        sizes="55vw"
        className="object-cover object-center"
      />

      {/* Top Subtle Dark Gradient Overlay */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 via-black/30 to-transparent pointer-events-none z-10" />

      {/* Bottom Deep-Evergreen Gradient Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#0F302A] via-[#0F302A]/85 to-transparent pointer-events-none z-10" />

      {/* Top Logo */}
      <div className="relative z-20 pt-2 pl-2">
        <Image
          src={logoImage.src}
          alt={logoImage.alt}
          width={logoImage.width}
          height={logoImage.height}
          className="w-[220px] xl:w-[260px] h-auto object-contain drop-shadow-md"
          priority
        />
      </div>

      {/* Bottom Editorial Content */}
      <div className="relative z-20 max-w-xl pb-4 pl-2">
        <span className="block text-xs uppercase tracking-[0.2em] font-semibold text-white/80 font-manrope mb-2">
          {eyebrow}
        </span>

        <h2 className="font-cormorant text-3xl xl:text-5xl font-normal leading-[1.1] text-white mb-3">
          {titleLines[0]}
          <br className="hidden xl:inline" /> {titleLines[1]}
        </h2>

        <p className="font-manrope text-base xl:text-lg text-white/90 font-light leading-relaxed mb-4">
          {description}
        </p>

        <div className="w-24 border-t border-white/30 my-4" />

        <p className="font-manrope text-xs tracking-wider text-white/70 uppercase">
          {footerTag}
        </p>
      </div>
    </div>
  );
};

