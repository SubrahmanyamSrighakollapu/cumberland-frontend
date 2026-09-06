export interface ActivityCategory {
  id: string;
  title: string;
  icon: "waves" | "leaf" | "family" | "museum";
  description: string;
  filterKey: string;
  image: string;
  imageAlt: string;
}

export interface ActivityBenefit {
  id: string;
  icon: "car" | "people" | "tag" | "leaf";
  label: string;
}

export interface Activity {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
  description: string;
  location: string;
  driveMinutes: number;
  distanceMeters: number;
  duration: string;
  audience: string;
  priceLevel: 0 | 1 | 2 | 3;
  priceDisplay: string;
  seasonality: string;
  categories: string[];
  bookingRequired?: boolean;
  featured?: boolean;
  directionsUrl?: string;
}

export interface ActivityItineraryStep {
  id: string;
  stage: string;
  time: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface ActivityItineraryVariant {
  key: "relaxed" | "adventure";
  label: string;
  introText: string;
  steps: ActivityItineraryStep[];
}

export interface ActivitySupportOption {
  id: string;
  icon: "family" | "weather" | "calendar";
  title: string;
  description: string;
}

export const thingsToDoHeroData = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Experiences", href: "/experiences" },
    { label: "Things to Do", href: "/experiences/things-to-do" },
  ],
  eyebrow: "EXPLORE & EXPERIENCE",
  headingLines: ["Make every day", "part of the getaway."],
  heading: "Make every day\npart of the getaway.",
  description:
    "From sparkling waters to scenic trails and unique local attractions, discover unforgettable experiences just moments from Cumberland Motor Inn.",
  primaryCta: {
    label: "EXPLORE ACTIVITIES →",
    href: "#activities",
  },
  secondaryCta: {
    label: "PLAN YOUR STAY",
    href: "#day-planner",
  },
  heroImage: "/images/thinks-to-do.png",
  heroImageAlt: "Kayakers on calm coastal water in warm evening light",
};

export const activityCategories: ActivityCategory[] = [
  {
    id: "cat-water",
    title: "On the Water",
    icon: "waves",
    description: "Kayak, cruise, fish and explore our beautiful coastline.",
    filterKey: "Water",
    image: "/images/thinks-to-do.png",
    imageAlt: "Kayakers paddling on calm coastal water",
  },
  {
    id: "cat-nature",
    title: "Nature & Walks",
    icon: "leaf",
    description: "Scenic trails, lookouts and natural wonders.",
    filterKey: "Nature",
    image: "/images/gallery-nine.png",
    imageAlt: "Coastal boardwalk winding through green headland",
  },
  {
    id: "cat-family",
    title: "Family Fun",
    icon: "family",
    description: "Hands-on experiences for all ages.",
    filterKey: "Family",
    image: "/images/gallery-four.png",
    imageAlt: "Family exploring scenic outdoor park",
  },
  {
    id: "cat-culture",
    title: "Culture & Leisure",
    icon: "museum",
    description: "Art, history, markets and local charm.",
    filterKey: "Culture",
    image: "/images/gallery-seven.png",
    imageAlt: "Historic gallery and cultural venue exterior",
  },
];

export const activityBenefits: ActivityBenefit[] = [
  {
    id: "ben-1",
    icon: "car",
    label: "Minutes from the motel",
  },
  {
    id: "ben-2",
    icon: "people",
    label: "All ages welcome",
  },
  {
    id: "ben-3",
    icon: "tag",
    label: "Free & paid options",
  },
  {
    id: "ben-4",
    icon: "leaf",
    label: "Year-round activities",
  },
];

export const directoryFilterPills = [
  "All",
  "Water",
  "Nature",
  "Family",
  "Culture",
  "Indoor",
];

export const activityList: Activity[] = [
  {
    id: "act-1",
    name: "Azure Bay Kayak Hire",
    image: "/images/thinks-to-do.png",
    imageAlt: "Kayaks lined up on shore and paddlers on calm water",
    description:
      "Explore calm bays and hidden coves with quality kayaks and local tips.",
    location: "Riverside Valley",
    driveMinutes: 8,
    distanceMeters: 2500,
    duration: "2–4 hours",
    audience: "All ages",
    priceLevel: 2,
    priceDisplay: "$$",
    seasonality: "Year-round",
    categories: ["Water", "Nature"],
    bookingRequired: false,
    featured: true,
  },
  {
    id: "act-2",
    name: "Coastal Boardwalk",
    image: "/images/gallery-nine.png",
    imageAlt: "Seaside boardwalk with ocean lookout views",
    description:
      "A stunning seaside boardwalk with ocean views, lookouts and picnic spots.",
    location: "Harbour Bay",
    driveMinutes: 6,
    distanceMeters: 1800,
    duration: "1–2 hours",
    audience: "All ages",
    priceLevel: 0,
    priceDisplay: "Free",
    seasonality: "Year-round",
    categories: ["Nature", "Family"],
    bookingRequired: false,
  },
  {
    id: "act-3",
    name: "Discovery Wildlife Park",
    image: "/images/gallery-four.png",
    imageAlt: "Native wildlife sanctuary enclosure with surrounding greenery",
    description:
      "Get up close with native wildlife in a beautiful natural setting.",
    location: "Greenhills",
    driveMinutes: 15,
    distanceMeters: 6200,
    duration: "1–2 hours",
    audience: "All ages",
    priceLevel: 2,
    priceDisplay: "$$",
    seasonality: "Year-round",
    categories: ["Nature", "Family"],
    bookingRequired: true,
  },
  {
    id: "act-4",
    name: "Harbour Cruise",
    image: "/images/gallery-ten.png",
    imageAlt: "Passenger cruise vessel on coastal harbour waters",
    description:
      "Relax on a scenic cruise and discover the region from the water.",
    location: "Cumberland Harbour",
    driveMinutes: 10,
    distanceMeters: 3800,
    duration: "1.5 hours",
    audience: "All ages",
    priceLevel: 2,
    priceDisplay: "$$",
    seasonality: "Year-round",
    categories: ["Water", "Family"],
    bookingRequired: false,
  },
  {
    id: "act-5",
    name: "Regional Art House",
    image: "/images/gallery-seven.png",
    imageAlt: "Contemporary regional art exhibition room",
    description:
      "Contemporary and local art, rotating exhibitions and a boutique shop.",
    location: "Cumberland Town",
    driveMinutes: 5,
    distanceMeters: 1200,
    duration: "1–2 hours",
    audience: "All ages",
    priceLevel: 1,
    priceDisplay: "$",
    seasonality: "Year-round",
    categories: ["Culture", "Indoor"],
    bookingRequired: false,
  },
  {
    id: "act-6",
    name: "Lakeside Adventure Centre",
    image: "/images/content-image-three.png",
    imageAlt: "Indoor climbing wall and family adventure arena",
    description:
      "Indoor climbing, mini golf, laser tag and more for all-weather fun.",
    location: "Lakeside",
    driveMinutes: 12,
    distanceMeters: 5100,
    duration: "2–3 hours",
    audience: "All ages",
    priceLevel: 2,
    priceDisplay: "$$",
    seasonality: "Year-round",
    categories: ["Family", "Indoor"],
    bookingRequired: true,
  },
  {
    id: "act-7",
    name: "Sunset Coastal Trail",
    image: "/images/gallery-two.png",
    imageAlt: "Sunset coastal trail walking path",
    description:
      "Elevated coastal path offering panoramic ocean vistas at golden hour.",
    location: "Sunset Point",
    driveMinutes: 14,
    distanceMeters: 5800,
    duration: "1–2 hours",
    audience: "All ages",
    priceLevel: 0,
    priceDisplay: "Free",
    seasonality: "Year-round",
    categories: ["Nature"],
    bookingRequired: false,
  },
  {
    id: "act-8",
    name: "Bay Fishing Charter",
    image: "/images/eat-drink.png",
    imageAlt: "Deep sea fishing boat on deep blue bay",
    description:
      "Guided half-day fishing charters with equipment and expert captain provided.",
    location: "Cumberland Marina",
    driveMinutes: 9,
    distanceMeters: 3100,
    duration: "3–4 hours",
    audience: "All ages",
    priceLevel: 3,
    priceDisplay: "$$$",
    seasonality: "Year-round",
    categories: ["Water"],
    bookingRequired: true,
  },
  {
    id: "act-9",
    name: "Coastal Heritage Museum",
    image: "/images/gallery-six.png",
    imageAlt: "Historic coastal maritime heritage exhibition artifacts",
    description:
      "Interactive maritime history exhibits and historic lighthouse artifacts.",
    location: "Old Town Port",
    driveMinutes: 7,
    distanceMeters: 2200,
    duration: "1–2 hours",
    audience: "All ages",
    priceLevel: 1,
    priceDisplay: "$",
    seasonality: "Year-round",
    categories: ["Culture", "Indoor"],
    bookingRequired: false,
  },
];

export const relaxedDayItinerary: ActivityItineraryStep[] = [
  {
    id: "rel-1",
    stage: "MORNING",
    time: "8:30 AM",
    title: "Waterfront Walk",
    description: "Easy coastal walk with stunning views.",
    image: "/images/gallery-nine.png",
    imageAlt: "Morning coastal boardwalk walk",
  },
  {
    id: "rel-2",
    stage: "LATE MORNING",
    time: "10:30 AM",
    title: "Coffee by the Bay",
    description: "Great coffee and local flavours.",
    image: "/images/gallery-five.png",
    imageAlt: "Morning coffee cup at waterfront café",
  },
  {
    id: "rel-3",
    stage: "AFTERNOON",
    time: "1:30 PM",
    title: "Harbour Cruise",
    description: "Relax and see the region from the water.",
    image: "/images/gallery-ten.png",
    imageAlt: "Afternoon harbour cruise boat",
  },
  {
    id: "rel-4",
    stage: "SUNSET",
    time: "5:30 PM",
    title: "Lakeside Picnic",
    description: "Unwind with good food and a beautiful view.",
    image: "/images/content-image-four.png",
    imageAlt: "Sunset picnic overlooking coastal waters",
  },
];

export const adventureDayItinerary: ActivityItineraryStep[] = [
  {
    id: "adv-1",
    stage: "MORNING",
    time: "9:00 AM",
    title: "Kayak the Bay",
    description: "Paddle through calm water and explore sheltered coves.",
    image: "/images/thinks-to-do.png",
    imageAlt: "Morning kayak tour on calm waters",
  },
  {
    id: "adv-2",
    stage: "MIDDAY",
    time: "12:00 PM",
    title: "Wildlife Encounters",
    description: "Discover native wildlife and enjoy a relaxed lunch break.",
    image: "/images/gallery-four.png",
    imageAlt: "Midday wildlife park tour",
  },
  {
    id: "adv-3",
    stage: "AFTERNOON",
    time: "2:30 PM",
    title: "Indoor Adventure",
    description: "Try climbing and family activities at the adventure centre.",
    image: "/images/content-image-three.png",
    imageAlt: "Afternoon climbing and adventure activities",
  },
  {
    id: "adv-4",
    stage: "SUNSET",
    time: "6:00 PM",
    title: "Scenic Lookout",
    description: "Finish the day with fresh air and sweeping views.",
    image: "/images/gallery-seven.png",
    imageAlt: "Sunset lookout over scenic headland",
  },
];

export const itineraryVariants: ActivityItineraryVariant[] = [
  {
    key: "relaxed",
    label: "Relaxed Day",
    introText:
      "Two great ways to experience our region. Here’s a relaxed day to get you started.",
    steps: relaxedDayItinerary,
  },
  {
    key: "adventure",
    label: "Adventure Day",
    introText: "A little more action, with time to discover something new.",
    steps: adventureDayItinerary,
  },
];

export const activitySupportOptions: ActivitySupportOption[] = [
  {
    id: "supp-1",
    icon: "family",
    title: "Family Recommendations",
    description: "Activities suited for kids and all ages",
  },
  {
    id: "supp-2",
    icon: "weather",
    title: "Weather Alternatives",
    description: "Rainy-day options and indoor entertainment",
  },
  {
    id: "supp-3",
    icon: "calendar",
    title: "Local Bookings",
    description: "Hassle-free reservations for tours and tickets",
  },
];

export const thingsToDoCtaData = {
  heading: "Stay close to your next adventure.",
  supportingText:
    "Great experiences, comfortable stays and unforgettable memories are all just moments away.",
  primaryCta: {
    label: "EXPLORE ROOMS →",
    href: "/rooms",
  },
  secondaryCta: {
    label: "BOOK YOUR STAY →",
    href: "/#availability",
  },
};
