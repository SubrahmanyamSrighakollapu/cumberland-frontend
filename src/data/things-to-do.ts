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
    "From Cessnock Golf Course and state forests to the Performing Arts Centre and Hunter Valley Gardens, discover local experiences right on your doorstep.",
  primaryCta: {
    label: "EXPLORE ACTIVITIES →",
    href: "#activities",
  },
  secondaryCta: {
    label: "PLAN YOUR STAY",
    href: "#day-planner",
  },
  heroImage: "/images/thinks-to-do.png",
  heroImageAlt: "Scenic Hunter Valley countryside and vineyards in warm sunlight",
};

export const activityCategories: ActivityCategory[] = [
  {
    id: "cat-golf",
    title: "Golf & Recreation",
    icon: "waves",
    description: "Play 18 holes at Cessnock Golf Course and Cypress Lakes.",
    filterKey: "Golf",
    image: "/images/thinks-to-do.png",
    imageAlt: "Green fairways at Cessnock Golf Course",
  },
  {
    id: "cat-nature",
    title: "Parks & State Forests",
    icon: "leaf",
    description: "Explore Werakata National Park and Watagans State Forest.",
    filterKey: "Nature",
    image: "/images/gallery-nine.png",
    imageAlt: "Bushwalking trail in Werakata National Park",
  },
  {
    id: "cat-family",
    title: "Family Attractions",
    icon: "family",
    description: "Hunter Valley Gardens, Wildlife Park and hot air ballooning.",
    filterKey: "Family",
    image: "/images/gallery-four.png",
    imageAlt: "Family enjoying Hunter Valley Gardens",
  },
  {
    id: "cat-culture",
    title: "Arts & Culture",
    icon: "museum",
    description: "Cessnock Performing Arts Centre (CPAC) just a walk away.",
    filterKey: "Culture",
    image: "/images/gallery-seven.png",
    imageAlt: "Cessnock Performing Arts Centre exterior",
  },
];

export const activityBenefits: ActivityBenefit[] = [
  {
    id: "ben-1",
    icon: "car",
    label: "Minutes from motel",
  },
  {
    id: "ben-2",
    icon: "people",
    label: "All ages welcome",
  },
  {
    id: "ben-3",
    icon: "tag",
    label: "Free & ticketed options",
  },
  {
    id: "ben-4",
    icon: "leaf",
    label: "Year-round experiences",
  },
];

export const directoryFilterPills = [
  "All",
  "Golf",
  "Nature",
  "Family",
  "Culture",
];

export const activityList: Activity[] = [
  {
    id: "act-1",
    name: "Cessnock Golf Course",
    image: "/images/thinks-to-do.png",
    imageAlt: "Manicured green fairways at Cessnock Golf Course",
    description:
      "Enjoy a round of golf on picturesque greens just minutes from Cumberland Motor Inn.",
    location: "Cessnock",
    driveMinutes: 5,
    distanceMeters: 2000,
    duration: "2–4 hours",
    audience: "Golfers of all levels",
    priceLevel: 2,
    priceDisplay: "$$",
    seasonality: "Year-round",
    categories: ["Golf"],
    bookingRequired: false,
    featured: true,
  },
  {
    id: "act-2",
    name: "Cessnock Performing Arts Centre (CPAC)",
    image: "/images/gallery-seven.png",
    imageAlt: "Cessnock Performing Arts Centre facade",
    description:
      "Conveniently located just a short walk away, featuring live theater, musical concerts, comedy shows and cultural events.",
    location: "Cessnock Town Centre",
    driveMinutes: 2,
    distanceMeters: 400,
    duration: "1.5–3 hours",
    audience: "All ages",
    priceLevel: 2,
    priceDisplay: "$$",
    seasonality: "Year-round",
    categories: ["Culture"],
    bookingRequired: true,
    featured: true,
  },
  {
    id: "act-3",
    name: "Werakata National Park & State Forests",
    image: "/images/gallery-nine.png",
    imageAlt: "Native gum trees and bushwalk trails in Werakata National Park",
    description:
      "Explore peaceful eucalypt forests, scenic bushwalking trails, birdwatching, and spring wildflower displays.",
    location: "Cessnock / Hunter Valley",
    driveMinutes: 6,
    distanceMeters: 3000,
    duration: "1–3 hours",
    audience: "All ages",
    priceLevel: 0,
    priceDisplay: "Free",
    seasonality: "Year-round",
    categories: ["Nature"],
    bookingRequired: false,
  },
  {
    id: "act-4",
    name: "Hunter Valley Gardens",
    image: "/images/gallery-four.png",
    imageAlt: "Lush display gardens and manicured lawns at Hunter Valley Gardens",
    description:
      "Spanning 14 hectares with 10 international themed gardens, shopping village, and seasonal light displays.",
    location: "Pokolbin",
    driveMinutes: 12,
    distanceMeters: 9000,
    duration: "2–4 hours",
    audience: "All ages & families",
    priceLevel: 2,
    priceDisplay: "$$",
    seasonality: "Year-round",
    categories: ["Family", "Nature"],
    bookingRequired: false,
    featured: true,
  },
  {
    id: "act-5",
    name: "Hunter Valley Wildlife Park",
    image: "/images/gallery-three.png",
    imageAlt: "Koala and native animals at Hunter Valley Wildlife Park",
    description:
      "Interactive native animal sanctuary offering close encounters with koalas, kangaroos, meerkats and lemurs.",
    location: "Nulkaba",
    driveMinutes: 8,
    distanceMeters: 5000,
    duration: "2–3 hours",
    audience: "Families & kids",
    priceLevel: 2,
    priceDisplay: "$$",
    seasonality: "Year-round",
    categories: ["Family"],
    bookingRequired: false,
  },
  {
    id: "act-6",
    name: "Hot Air Ballooning over Hunter Valley",
    image: "/images/content-image-four.png",
    imageAlt: "Colorful hot air balloon floating over sunrise Hunter Valley vineyards",
    description:
      "Breathtaking sunrise flights high above rolling Hunter Valley vineyards followed by a champagne breakfast.",
    location: "Pokolbin / Cessnock",
    driveMinutes: 10,
    distanceMeters: 7000,
    duration: "3–4 hours",
    audience: "Adults & couples",
    priceLevel: 3,
    priceDisplay: "$$$",
    seasonality: "Year-round",
    categories: ["Family", "Nature"],
    bookingRequired: true,
  },
  {
    id: "act-7",
    name: "Watagans National Park Lookouts",
    image: "/images/gallery-two.png",
    imageAlt: "Sweeping rainforest and valley vista from Watagans lookout",
    description:
      "Elevated mountain lookouts, shaded rainforest walking trails, and spectacular views over the valley.",
    location: "Watagans Region",
    driveMinutes: 20,
    distanceMeters: 18000,
    duration: "2–4 hours",
    audience: "Bushwalkers & nature lovers",
    priceLevel: 0,
    priceDisplay: "Free",
    seasonality: "Year-round",
    categories: ["Nature"],
    bookingRequired: false,
  },
];

export const relaxedDayItinerary: ActivityItineraryStep[] = [
  {
    id: "rel-1",
    stage: "MORNING",
    time: "8:30 AM",
    title: "Nature Walk",
    description: "Easy forest walk in Werakata National Park.",
    image: "/images/gallery-nine.png",
    imageAlt: "Morning forest trail walk in Werakata National Park",
  },
  {
    id: "rel-2",
    stage: "LATE MORNING",
    time: "10:30 AM",
    title: "Coffee in Cessnock",
    description: "Great coffee and local bakery treats in town.",
    image: "/images/gallery-five.png",
    imageAlt: "Morning coffee cup at Cessnock café",
  },
  {
    id: "rel-3",
    stage: "AFTERNOON",
    time: "1:30 PM",
    title: "Hunter Valley Gardens",
    description: "Stroll through 14 hectares of stunning display gardens.",
    image: "/images/gallery-four.png",
    imageAlt: "Afternoon at Hunter Valley Gardens",
  },
  {
    id: "rel-4",
    stage: "SUNSET",
    time: "5:30 PM",
    title: "Poolside Relax",
    description: "Unwind at Cumberland Motor Inn's outdoor salt-water pool.",
    image: "/images/content-image-four.png",
    imageAlt: "Sunset at Cumberland Motor Inn swimming pool",
  },
];

export const adventureDayItinerary: ActivityItineraryStep[] = [
  {
    id: "adv-1",
    stage: "MORNING",
    time: "6:00 AM",
    title: "Sunrise Balloon Flight",
    description: "Float high above rolling Hunter Valley vineyards.",
    image: "/images/thinks-to-do.png",
    imageAlt: "Sunrise hot air balloon flight over vineyards",
  },
  {
    id: "adv-2",
    stage: "MIDDAY",
    time: "10:30 AM",
    title: "Cessnock Golf Course",
    description: "Play a round of golf on picturesque green fairways.",
    image: "/images/thinks-to-do.png",
    imageAlt: "Midday golf on Cessnock Golf Course",
  },
  {
    id: "adv-3",
    stage: "AFTERNOON",
    time: "2:00 PM",
    title: "Wildlife Encounters",
    description: "Meet native koalas and kangaroos at Hunter Valley Wildlife Park.",
    image: "/images/gallery-three.png",
    imageAlt: "Afternoon wildlife park visit",
  },
  {
    id: "adv-4",
    stage: "EVENING",
    time: "7:00 PM",
    title: "CPAC Show",
    description: "Enjoy a live show at Cessnock Performing Arts Centre.",
    image: "/images/gallery-seven.png",
    imageAlt: "Evening show at Cessnock Performing Arts Centre",
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
