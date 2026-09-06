import { testimonialsDataset, Review } from "./testimonials";
import { amenitiesDataset } from "./amenities";

export interface AboutStat {
  id: string;
  value: string;
  label: string;
  iconName: "calendar" | "bed" | "pin" | "guests";
}

export interface WhyChooseUsFeature {
  id: string;
  title: string;
  description: string;
  iconName: "guests" | "bed" | "pin" | "coffee";
}

export interface ExperienceBenefit {
  id: string;
  title: string;
  description: string;
  iconName: "bed" | "compass" | "guests";
}

export const aboutHeroData = {
  breadcrumbHome: "Home",
  breadcrumbCurrent: "About Us",
  eyebrow: "ABOUT CUMBERLAND",
  headingLines: ["A welcoming stay,", "made memorable."],
  description:
    "Relaxed coastal comfort, genuine hospitality and a great base for your next adventure.",
  image: "/images/content-image-two.png",
  alt: "Cumberland Motor Inn exterior at sunset with warm evening lighting",
};

export const ourStoryData = {
  eyebrow: "OUR STORY",
  headingLines: ["Comfort, character and", "genuine hospitality."],
  paragraph1:
    "Cumberland Motor Inn began with a simple idea — to create a relaxed and welcoming place where travellers can feel at home while exploring our beautiful coastal region.",
  paragraph2:
    "Family-owned and operated, we take pride in offering comfortable accommodation, friendly service and local knowledge to help you make the most of your stay.",
  paragraph3:
    "Whether you’re here for a weekend escape, a family holiday or a longer adventure, we look forward to welcoming you.",
  accentLine: "Welcoming guests since 1998",
  image: "/images/content-image-one.png",
  alt: "Landscaped Cumberland Motor Inn courtyard with parasol tables",
};

export const aboutStatsData: AboutStat[] = [
  {
    id: "years",
    value: "27+",
    label: "Years of Hospitality",
    iconName: "calendar",
  },
  {
    id: "rooms",
    value: "24",
    label: "Comfortable Rooms",
    iconName: "bed",
  },
  {
    id: "location",
    value: "Prime",
    label: "Central Location",
    iconName: "pin",
  },
  {
    id: "service",
    value: "Guest-Focused",
    label: "Service",
    iconName: "guests",
  },
];

export const whyChooseUsData: WhyChooseUsFeature[] = [
  {
    id: "welcome",
    title: "Warm Welcome",
    description: "Friendly, local hosts who care about your stay.",
    iconName: "guests",
  },
  {
    id: "rooms",
    title: "Comfortable Rooms",
    description: "Stylish, well-appointed rooms for a great night’s rest.",
    iconName: "bed",
  },
  {
    id: "location",
    title: "Convenient Location",
    description: "Close to beaches, wineries and local attractions.",
    iconName: "pin",
  },
  {
    id: "facilities",
    title: "Thoughtful Facilities",
    description: "Everything you need for a relaxing and easy stay.",
    iconName: "coffee",
  },
];

export const cumberlandExperienceData = {
  eyebrow: "THE CUMBERLAND EXPERIENCE",
  headingLines: ["Easy stays,", "thoughtfully delivered."],
  description:
    "At Cumberland Motor Inn, we make it easy to relax, explore and enjoy everything our beautiful region has to offer. From comfortable rooms to helpful local tips, we’re here to ensure your stay is seamless and memorable.",
  image: "/images/content-image-three.png",
  alt: "Coastal pool at Cumberland Motor Inn overlooking the ocean during golden hour",
  benefits: [
    {
      id: "rest",
      title: "Rest and Recharge",
      description: "Comfortable rooms and quiet surrounds for a better stay.",
      iconName: "bed",
    },
    {
      id: "explore",
      title: "Explore the Region",
      description: "Beaches, wineries and hidden gems all close by.",
      iconName: "compass",
    },
    {
      id: "service",
      title: "Service You Can Rely On",
      description:
        "Friendly support and local knowledge, whenever you need it.",
      iconName: "guests",
    },
  ] as ExperienceBenefit[],
};

export const aboutAmenitiesData = [
  { id: "wifi", label: amenitiesDataset.wifi?.title || "Free Wi-Fi", icon: "wifi" },
  { id: "parking", label: amenitiesDataset.parking?.title || "Parking", icon: "parking" },
  { id: "ev", label: amenitiesDataset.ev?.title || "EV Charging", icon: "ev" },
  { id: "pool", label: amenitiesDataset.pool?.title || "Pool", icon: "pool" },
  { id: "kitchen", label: amenitiesDataset.kitchen?.title || "Kitchenette Rooms", icon: "kitchen" },
  { id: "bbq", label: amenitiesDataset.bbq?.title || "BBQ Area", icon: "bbq" },
];

export const featuredTestimonialId = "review-sarah-l";

const sarahTestimonial: Review = testimonialsDataset[featuredTestimonialId] || {
  id: "review-sarah-l",
  name: "Sarah L.",
  date: "March 2025",
  rating: 5,
  quote:
    "“The perfect base for exploring the coast. Clean, comfortable and the friendliest staff. We’ll definitely be back!”",
  avatar: "/images/room-one.png",
};

export const aboutTestimonialData = {
  eyebrow: "WHAT OUR GUESTS SAY",
  heading: "A stay worth remembering.",
  quote: sarahTestimonial.quote,
  author: sarahTestimonial.name,
  date: sarahTestimonial.date,
  rating: sarahTestimonial.rating,
  image: sarahTestimonial.avatar,
  alt: sarahTestimonial.avatarAlt || "King guest room with private balcony overlooking coastal scenery",
};

export const aboutCtaData = {
  heading: "Come and experience Cumberland for yourself.",
  description:
    "Relaxing stays, beautiful surroundings and memories waiting to be made.",
  viewRoomsRoute: "/rooms",
  bookStayRoute: "/#availability",
};
