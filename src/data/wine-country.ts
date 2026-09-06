export interface Winery {
  id: string;
  name: string;
  location: string;
  driveMinutes: number;
  categories: string[];
  hours: string;
  description: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  websiteUrl?: string;
  directionsUrl?: string;
}

export interface WineIntroFact {
  id: string;
  icon: "car" | "grapes" | "leaf";
  value: string;
  label: string;
}

export interface ItineraryStep {
  id: string;
  stage: string;
  time: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface TravelOption {
  id: string;
  icon: "bus" | "car" | "steering";
  title: string;
  description: string;
}

export const wineCountryHeroData = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Experiences", href: "/experiences" },
    { label: "Wine Country", href: "/experiences/wine-country" },
  ],
  eyebrow: "EXPLORE THE REGION",
  headingLines: [
    "Cellar doors, scenic",
    "drives and memorable",
    "pours.",
  ],
  heading: "Cellar doors, scenic\ndrives and memorable\npours.",
  description:
    "Discover boutique vineyards, breathtaking countryside and world-class wines, all within easy reach of Cumberland Motor Inn.",
  primaryCta: {
    label: "EXPLORE WINERIES →",
    href: "#featured-wineries",
  },
  secondaryCta: {
    label: "PLAN YOUR DAY",
    href: "#wine-day-plan",
  },
  heroImage: "/images/wine-country.png",
  heroImageAlt: "Scenic vineyard landscape at sunset with rolling hills",
};

export const wineCountryIntroData = {
  eyebrow: "A SHORT DRIVE AWAY",
  headingLines: ["Discover wine country", "at your own pace."],
  heading: "Discover wine country\nat your own pace.",
  paragraph1:
    "From boutique vineyards and award-winning cellar doors to exceptional local food and breathtaking scenery, our region offers a wine experience for every kind of traveller.",
  paragraph2:
    "Whether you’re planning a relaxed day of tastings, a long lunch with friends or a scenic drive through rolling vineyards, Cumberland Motor Inn is the perfect base to explore it all.",
  facts: [
    {
      id: "fact-1",
      icon: "car",
      value: "45 min",
      label: "drive to wine region",
    },
    {
      id: "fact-2",
      icon: "grapes",
      value: "150+",
      label: "wine producers",
    },
    {
      id: "fact-3",
      icon: "leaf",
      value: "Year-round",
      label: "experiences",
    },
  ] as WineIntroFact[],
  image: "/images/gallery-eight.png",
  imageAlt: "Vineyard terrace overlooking rolling green hills and grapevines",
  mapLink: {
    label: "VIEW MAP →",
    href: "#wine-country-map",
  },
};

export const wineryCategories = [
  "All",
  "Tastings",
  "Dining",
  "Tours",
  "Family Friendly",
];

export const wineryList: Winery[] = [
  {
    id: "winery-1",
    name: "Willow Ridge Estate",
    location: "Riverside Valley",
    driveMinutes: 42,
    categories: ["Tastings", "Dining"],
    hours: "10:00 AM–5:00 PM",
    description:
      "Family-owned vineyard with cool climate wines and stunning valley views.",
    image: "/images/wine-country.png",
    imageAlt: "Willow Ridge Estate vineyard with sunset background",
    featured: true,
  },
  {
    id: "winery-2",
    name: "Ember Hill Wines",
    location: "Hillside Region",
    driveMinutes: 38,
    categories: ["Tastings", "Dining"],
    hours: "10:00 AM–5:00 PM",
    description:
      "Elegant wines, seasonal dining and a relaxed outdoor setting.",
    image: "/images/eat-drink.png",
    imageAlt: "Wine tasting spread and dining table on outdoor patio",
  },
  {
    id: "winery-3",
    name: "Stone Creek Cellars",
    location: "Granite Ridge",
    driveMinutes: 50,
    categories: ["Tastings", "Tours"],
    hours: "11:00 AM–5:00 PM",
    description:
      "Award-winning wines in a striking cellar door with panoramic views.",
    image: "/images/gallery-eight.png",
    imageAlt: "Stone Creek Cellars cellar door and barrel room",
  },
  {
    id: "winery-4",
    name: "Golden Vale Vineyard",
    location: "Sunset Plains",
    driveMinutes: 42,
    categories: ["Tastings", "Family Friendly"],
    hours: "10:00 AM–5:00 PM",
    description:
      "Boutique wines, local produce and a beautiful lawn with mountain views.",
    image: "/images/gallery-nine.png",
    imageAlt: "Golden Vale Vineyard lush green rows of grapevines",
  },
  {
    id: "winery-5",
    name: "Orchard Lane Wines",
    location: "Meadowbrook",
    driveMinutes: 47,
    categories: ["Dining", "Family Friendly"],
    hours: "11:00 AM–6:00 PM",
    description:
      "Small-batch wines and woodfired cuisine in a rustic, welcoming setting.",
    image: "/images/content-image-three.png",
    imageAlt: "Woodfired dining setup at Orchard Lane Wines",
  },
  {
    id: "winery-6",
    name: "Northfield Estate",
    location: "Willow Creek",
    driveMinutes: 52,
    categories: ["Tastings", "Tours"],
    hours: "10:00 AM–5:00 PM",
    description:
      "Modern cellar door, premium wines and spectacular hilltop views.",
    image: "/images/gallery-ten.png",
    imageAlt: "Hilltop cellar door balcony view at Northfield Estate",
  },
  {
    id: "winery-7",
    name: "Highfield Valley Cellars",
    location: "Highfield Region",
    driveMinutes: 45,
    categories: ["Tastings", "Tours"],
    hours: "10:00 AM–5:00 PM",
    description:
      "Artisanal winemaking paired with sweeping estate views and guided tours.",
    image: "/images/gallery-seven.png",
    imageAlt: "Highfield Valley vineyard hillsides",
  },
  {
    id: "winery-8",
    name: "Crestview Vineyard & Dining",
    location: "Crestview Heights",
    driveMinutes: 35,
    categories: ["Dining", "Family Friendly"],
    hours: "11:00 AM–6:00 PM",
    description:
      "Farm-to-table lunch pairing with single-vineyard vintages on scenic lawn.",
    image: "/images/content-image-two.png",
    imageAlt: "Outdoor vineyard lunch setup",
  },
  {
    id: "winery-9",
    name: "Blackwood Ridge Estate",
    location: "Blackwood Valley",
    driveMinutes: 55,
    categories: ["Tastings", "Dining"],
    hours: "10:00 AM–5:00 PM",
    description:
      "Historic stone cellar door featuring oak-aged reds and organic cheese platters.",
    image: "/images/gallery-six.png",
    imageAlt: "Historic stone cellar door interior",
  },
];

export const itinerarySteps: ItineraryStep[] = [
  {
    id: "step-1",
    stage: "MORNING",
    time: "9:00 AM",
    title: "Scenic drive & first tasting",
    description:
      "Head out and enjoy the scenic countryside with a morning tasting.",
    image: "/images/gallery-four.png",
    imageAlt: "Scenic country road leading to vineyards",
  },
  {
    id: "step-2",
    stage: "MIDDAY",
    time: "12:00 PM",
    title: "Vineyard lunch.",
    description:
      "Savour local produce and award-winning wines at a long lunch.",
    image: "/images/eat-drink.png",
    imageAlt: "Outdoor vineyard dining lunch table",
  },
  {
    id: "step-3",
    stage: "AFTERNOON",
    time: "2:00 PM",
    title: "Cellar-door discovery.",
    description:
      "Visit more boutique wineries and meet the people behind the wines.",
    image: "/images/gallery-three.png",
    imageAlt: "Winery cellar door tasting counter",
  },
  {
    id: "step-4",
    stage: "EVENING",
    time: "5:00 PM",
    title: "Return and unwind.",
    description:
      "Head back to Cumberland and relax after a memorable day.",
    image: "/images/content-image-four.png",
    imageAlt: "Sunset view returning to Cumberland Motor Inn",
  },
];

export const travelOptions: TravelOption[] = [
  {
    id: "travel-1",
    icon: "bus",
    title: "Guided Tour",
    description: "Sit back and enjoy a hassle-free day.",
  },
  {
    id: "travel-2",
    icon: "car",
    title: "Private Transfer",
    description: "Comfort, convenience and local knowledge.",
  },
  {
    id: "travel-3",
    icon: "steering",
    title: "Self-Drive",
    description: "Explore at your own pace with a designated driver.",
  },
];

export const wineCountryCtaData = {
  heading: "Make Cumberland your base for wine country.",
  supportingText:
    "Relaxing stays, beautiful surroundings and world-class wine experiences are just a short drive away.",
  primaryCta: {
    label: "EXPLORE ROOMS →",
    href: "/rooms",
  },
  secondaryCta: {
    label: "BOOK YOUR STAY →",
    href: "/#availability",
  },
};
