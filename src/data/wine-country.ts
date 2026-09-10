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
      value: "10-15 min",
      label: "drive to wine country",
    },
    {
      id: "fact-2",
      icon: "grapes",
      value: "150+",
      label: "cellar doors & vineyards",
    },
    {
      id: "fact-3",
      icon: "leaf",
      value: "Year-round",
      label: "tastings & dining",
    },
  ] as WineIntroFact[],
  image: "/images/gallery-eight.png",
  imageAlt: "Hunter Valley vineyard terrace overlooking green rolling hills",
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
    name: "Tyrrell's Wines",
    location: "Pokolbin, Hunter Valley",
    driveMinutes: 12,
    categories: ["Tastings", "Tours"],
    hours: "10:00 AM–5:00 PM",
    description:
      "Historic family-owned winery established in 1858, famous for iconic Hunter Valley Semillon and Shiraz.",
    image: "/images/wine-country.png",
    imageAlt: "Tyrrell's Wines vineyard landscape in Pokolbin",
    featured: true,
  },
  {
    id: "winery-2",
    name: "Brokenwood Wines",
    location: "Pokolbin, Hunter Valley",
    driveMinutes: 14,
    categories: ["Tastings", "Dining"],
    hours: "11:00 AM–5:00 PM",
    description:
      "Modern tasting lounge and outdoor terrace featuring Graveyard Vineyard Shiraz and single-vineyard releases.",
    image: "/images/eat-drink.png",
    imageAlt: "Brokenwood Wines tasting room and outdoor dining spread",
  },
  {
    id: "winery-3",
    name: "Audrey Wilkinson",
    location: "Pokolbin, Hunter Valley",
    driveMinutes: 15,
    categories: ["Tastings", "Tours"],
    hours: "10:00 AM–5:00 PM",
    description:
      "Perched atop a ridge with 360-degree views of the Brokenback Ranges and historic winemaking museum.",
    image: "/images/gallery-eight.png",
    imageAlt: "Audrey Wilkinson vineyard ridge and cellars",
  },
  {
    id: "winery-4",
    name: "McGuigan Wines",
    location: "Pokolbin, Hunter Valley",
    driveMinutes: 14,
    categories: ["Tastings", "Family Friendly"],
    hours: "10:00 AM–5:00 PM",
    description:
      "Welcoming cellar door experience offering guided tastings, regional cheese pairings and garden spaces.",
    image: "/images/gallery-nine.png",
    imageAlt: "McGuigan Wines cellars and vineyard rows",
  },
  {
    id: "winery-5",
    name: "Hope Estate",
    location: "Pokolbin, Hunter Valley",
    driveMinutes: 12,
    categories: ["Dining", "Tours", "Family Friendly"],
    hours: "10:00 AM–5:00 PM",
    description:
      "Expansive estate hosting major music concerts, craft brewery tastings and estate-grown wine experiences.",
    image: "/images/content-image-three.png",
    imageAlt: "Hope Estate grounds and amphitheatre stage area",
  },
  {
    id: "winery-6",
    name: "Bimbadgen Winery",
    location: "Pokolbin, Hunter Valley",
    driveMinutes: 15,
    categories: ["Tastings", "Dining"],
    hours: "10:00 AM–5:00 PM",
    description:
      "Iconic bell tower winery offering Esca restaurant dining, vineyard views and outdoor concert events.",
    image: "/images/gallery-ten.png",
    imageAlt: "Bimbadgen Winery bell tower and vineyard outlook",
  },
  {
    id: "winery-7",
    name: "Mount Pleasant Wines",
    location: "Pokolbin, Hunter Valley",
    driveMinutes: 10,
    categories: ["Tastings", "Tours"],
    hours: "10:00 AM–5:00 PM",
    description:
      "Historic vineyard site established by Maurice O'Shea, offering premium Shiraz and aged Semillon tastings.",
    image: "/images/gallery-seven.png",
    imageAlt: "Mount Pleasant historic vines and tasting room",
  },
  {
    id: "winery-8",
    name: "Gartelmann Wines",
    location: "Lovedale, Hunter Valley",
    driveMinutes: 15,
    categories: ["Dining", "Family Friendly"],
    hours: "10:00 AM–5:00 PM",
    description:
      "Boutique Lovedale cellar door set alongside a peaceful lagoon and Deck Cafe dining.",
    image: "/images/content-image-two.png",
    imageAlt: "Gartelmann Wines lagoon outdoor seating",
  },
  {
    id: "winery-9",
    name: "Thomas Wines",
    location: "Pokolbin, Hunter Valley",
    driveMinutes: 13,
    categories: ["Tastings"],
    hours: "10:00 AM–5:00 PM",
    description:
      "Specialist winemaking focused exclusively on single-vineyard Hunter Valley Semillon and Shiraz.",
    image: "/images/gallery-six.png",
    imageAlt: "Thomas Wines cellar door tasting room",
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
