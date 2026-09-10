export interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  quote: string;
  avatar: string;
  avatarAlt?: string;
}

export const testimonialsDataset: Record<string, Review> = {
  "review-1": {
    id: "review-1",
    name: "Emma R.",
    date: "April 2025",
    rating: 5,
    quote:
      "The perfect base for exploring the Hunter Valley. Clean, comfortable rooms, great outdoor pool and such a relaxed vibe.",
    avatar: "/images/client-image-one.png",
    avatarAlt: "Emma R. guest portrait",
  },
  "review-2": {
    id: "review-2",
    name: "Liam T.",
    date: "March 2025",
    rating: 5,
    quote:
      "Great location right in Cessnock, super clean rooms and the friendliest team. We'll definitely be back!",
    avatar: "/images/client-image-two.png",
    avatarAlt: "Liam T. guest portrait",
  },
  "review-3": {
    id: "review-3",
    name: "Sophie M.",
    date: "February 2025",
    rating: 5,
    quote:
      "Ideal location for wine tasting weekends. Close to Pokolbin cellar doors, Cessnock dining and local attractions.",
    avatar: "/images/client-image-three.png",
    avatarAlt: "Sophie M. guest portrait",
  },
  "review-sarah-l": {
    id: "review-sarah-l",
    name: "Sarah L.",
    date: "March 2025",
    rating: 5,
    quote:
      "“The perfect base for exploring the Hunter Valley. Clean, comfortable and the friendliest staff. We’ll definitely be back!”",
    avatar: "/images/room-one.png",
    avatarAlt: "Guest room at Cumberland Motor Inn Cessnock",
  },
};

export const guestReviews: Review[] = [
  testimonialsDataset["review-1"],
  testimonialsDataset["review-2"],
  testimonialsDataset["review-3"],
];

export function getTestimonialById(id: string): Review | undefined {
  return testimonialsDataset[id];
}
