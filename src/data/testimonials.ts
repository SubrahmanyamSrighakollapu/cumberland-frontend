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
      "The perfect weekend escape. Beautiful location, stylish rooms and such a relaxed vibe.",
    avatar: "/images/client-image-one.png",
    avatarAlt: "Emma R. guest portrait",
  },
  "review-2": {
    id: "review-2",
    name: "Liam T.",
    date: "March 2025",
    rating: 5,
    quote:
      "Amazing views, super clean rooms and the friendliest team. We’ll definitely be back!",
    avatar: "/images/client-image-two.png",
    avatarAlt: "Liam T. guest portrait",
  },
  "review-3": {
    id: "review-3",
    name: "Sophie M.",
    date: "February 2025",
    rating: 5,
    quote:
      "A little slice of paradise. Close to everything but feels like a world away.",
    avatar: "/images/client-image-three.png",
    avatarAlt: "Sophie M. guest portrait",
  },
  "review-sarah-l": {
    id: "review-sarah-l",
    name: "Sarah L.",
    date: "March 2025",
    rating: 5,
    quote:
      "“The perfect base for exploring the coast. Clean, comfortable and the friendliest staff. We’ll definitely be back!”",
    avatar: "/images/room-one.png",
    avatarAlt: "King guest room with private balcony overlooking coastal scenery",
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
