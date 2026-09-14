"use client";

import Reveal from "@/components/ui/Reveal";

export default function LocationAdvantages() {
  const advantages = [
    {
      icon: (
        <svg className="w-6 h-6 text-[#80563e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Prime Central Base",
      description: "Located right in Cessnock, providing quick 10-15 minute access to Pokolbin, Lovedale, and Rothbury cellar doors.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#80563e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 17a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4zM3 9l2-4h14l2 4M3 9v8a1 1 0 001 1h1m16-9v8a1 1 0 01-1 1h-1M3 9h18" />
        </svg>
      ),
      title: "Free On-Site Motel Parking",
      description: "Enjoy hassle-free parking within the motel grounds for cars, tour vehicles, and SUVs at no extra charge.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#80563e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      title: "Undercover BBQ & Pool",
      description: "Unwind after a day in the vineyards with a dip in our outdoor pool or cook a relaxed meal in our garden BBQ courtyard.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#80563e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Tour Pickup Friendly",
      description: "Many accredited Hunter Valley wine tours and day trip operators offer convenient direct pickup from Cumberland Motor Inn.",
    },
  ];

  return (
    <section className="w-full bg-[#17352d] text-white py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#80563e_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal direction="up" delay={50}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#80563e] uppercase mb-2 block">
              WHY BASE HERE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-white font-normal leading-tight mb-4">
              The Ideal Base for Hunter Valley Visitors
            </h2>
            <p className="text-sm sm:text-base text-[#f7f4ee]/80 font-light leading-relaxed">
              Combine peaceful motel comfort and great value with immediate proximity to the region's finest food, wine, and leisure attractions.
            </p>
          </div>
        </Reveal>

        {/* 4 Feature Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {advantages.map((adv, idx) => (
            <Reveal key={idx} direction="up" staggerIndex={idx} delay={100}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#80563e]/20 border border-[#80563e]/40 flex items-center justify-center mb-5">
                    {adv.icon}
                  </div>
                  <h3 className="font-serif text-xl text-white font-medium mb-2">
                    {adv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#f7f4ee]/75 font-sans leading-relaxed">
                    {adv.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
