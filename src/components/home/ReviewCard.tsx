import Image from "next/image";
import { Review } from "@/data/home";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white border border-[#d9d0c4] rounded-xl p-6 sm:p-7 flex flex-col justify-between h-full min-h-[240px] shadow-xs hover:border-[#80563e]/40 transition-colors duration-280">
      <div className="flex-1 flex flex-col">
        {/* Verified Stay Badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e9efe8] text-[#20382f] text-xs font-medium mb-4 self-start">
          <svg className="w-3.5 h-3.5 text-[#80563e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>Verified Guest Stay</span>
        </div>

        {/* Review Quote */}
        <p className="text-sm text-[#20382f] leading-relaxed italic mb-6 font-sans flex-1">
          &ldquo;{review.quote}&rdquo;
        </p>
      </div>

      {/* Guest Portrait & Metadata */}
      <div className="flex items-center gap-3.5 pt-4 border-t border-[#f7f4ee] mt-auto">
        <div className="relative w-11 h-11 rounded-full overflow-hidden bg-[#e9efe8] shrink-0 border border-[#d9d0c4]">
          <Image
            src={review.avatar}
            alt={review.name}
            fill
            sizes="44px"
            className="object-cover object-center"
          />
        </div>

        <div>
          <div className="text-sm font-semibold text-[#20382f]">
            {review.name}
          </div>
          <div className="text-xs text-[#50544e]">{review.date}</div>
        </div>
      </div>
    </div>
  );
}
