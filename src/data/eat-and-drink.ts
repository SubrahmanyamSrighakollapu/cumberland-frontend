export interface DiningVenue {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
  description: string;
  type: "Cafés" | "Restaurants" | "Bars";
  cuisine: string;
  isOnSite: boolean;
  distanceMeters: number;
  travelText: string;
  priceLevel: 1 | 2 | 3;
  priceDisplay: string;
  priceAccessibilityLabel: string;
  hours: string;
  reservationsText: string;
  featured?: boolean;
  directionsUrl?: string;
  externalUrl?: string;
  contactPhone?: string;
  address?: string;
}

export interface FeaturedFact {
  id: string;
  icon: "cutlery" | "clock" | "calendar" | "walk";
  main: string;
  sub: string;
}

export interface FeaturedBenefit {
  id: string;
  icon: "leaf" | "people" | "wine";
  title: string;
  description: string;
}

export interface FoodItineraryStep {
  id: string;
  time: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface SupportOption {
  id: string;
  icon: "calendar" | "leaf" | "people";
  title: string;
  description: string;
}

export const eatDrinkHeroData = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Experiences", href: "/experiences" },
    { label: "Eat & Drink", href: "/experiences/eat-and-drink" },
  ],
  eyebrow: "LOCAL FLAVOURS",
  headingLines: [
    "Good food, relaxed",
    "moments and plenty",
    "to savour.",
  ],
  heading: "Good food, relaxed\nmoments and plenty\nto savour.",
  description:
    "From cosy cafés to waterfront restaurants, enjoy delicious local flavours just moments from your stay.",
  primaryCta: {
    label: "EXPLORE DINING →",
    href: "#local-dining",
  },
  secondaryCta: {
    label: "ASK OUR TEAM",
    href: "/contact",
  },
  heroImage: "/images/eat-drink.png",
  heroImageAlt: "Waterfront dining table at sunset with food and wine glasses",
};

export const featuredDiningData = {
  eyebrow: "FEATURED EXPERIENCE",
  headingLines: ["A memorable meal,", "close to your room."],
  heading: "A memorable meal,\nclose to your room.",
  description:
    "Enjoy contemporary coastal cuisine in a relaxed setting, just a short stroll from Cumberland Motor Inn. Fresh local produce, friendly service and a welcoming atmosphere make it the perfect choice for a memorable evening.",
  image: "/images/content-image-one.png",
  imageAlt: "Chef plating a contemporary coastal culinary dish",
  facts: [
    {
      id: "fact-1",
      icon: "cutlery",
      main: "Contemporary",
      sub: "Coastal cuisine",
    },
    {
      id: "fact-2",
      icon: "clock",
      main: "Dinner",
      sub: "5:30–10:00 PM",
    },
    {
      id: "fact-3",
      icon: "calendar",
      main: "Reservations",
      sub: "recommended",
    },
    {
      id: "fact-4",
      icon: "walk",
      main: "1 minute",
      sub: "walk",
    },
  ] as FeaturedFact[],
  benefits: [
    {
      id: "ben-1",
      icon: "leaf",
      title: "Fresh Local Produce",
      description: "Seasonal and regional",
    },
    {
      id: "ben-2",
      icon: "people",
      title: "Family Friendly",
      description: "Welcoming for all ages",
    },
    {
      id: "ben-3",
      icon: "wine",
      title: "Wine & Cocktails",
      description: "Local and international",
    },
  ] as FeaturedBenefit[],
};

export const diningCategories = [
  "All",
  "Cafés",
  "Restaurants",
  "Bars",
  "On-site",
];

export const diningVenues: DiningVenue[] = [
  {
    id: "venue-1",
    name: "Driftwood Kitchen",
    image: "/images/gallery-one.png",
    imageAlt: "Contemporary plated seafood at Driftwood Kitchen",
    description:
      "Seasonal coastal cuisine with a focus on fresh, local produce.",
    type: "Restaurants",
    cuisine: "Modern Australian",
    isOnSite: true,
    distanceMeters: 80,
    travelText: "2 min walk",
    priceLevel: 2,
    priceDisplay: "$$",
    priceAccessibilityLabel: "Price level: moderate",
    hours: "Open until 9:30 PM",
    reservationsText: "Reservations recommended",
    featured: true,
    address: "12 Esplanade Parade (On-site / adjacent)",
    contactPhone: "(02) 4900 1122",
  },
  {
    id: "venue-2",
    name: "Harbour Table",
    image: "/images/gallery-ten.png",
    imageAlt: "Outdoor dining table overlooking water at Harbour Table",
    description:
      "Waterfront dining with stunning views and a relaxed atmosphere.",
    type: "Restaurants",
    cuisine: "Seafood",
    isOnSite: false,
    distanceMeters: 350,
    travelText: "5 min walk",
    priceLevel: 3,
    priceDisplay: "$$$",
    priceAccessibilityLabel: "Price level: premium",
    hours: "Open until 10:00 PM",
    reservationsText: "Reservations recommended",
    address: "48 Harbour View Promenade",
    contactPhone: "(02) 4900 2233",
  },
  {
    id: "venue-3",
    name: "Morning Tide Café",
    image: "/images/gallery-five.png",
    imageAlt: "Coffee, fresh pastries, and light breakfast items",
    description:
      "Great coffee, fresh pastries and light meals to start your day.",
    type: "Cafés",
    cuisine: "Café",
    isOnSite: false,
    distanceMeters: 450,
    travelText: "6 min walk",
    priceLevel: 1,
    priceDisplay: "$",
    priceAccessibilityLabel: "Price level: budget friendly",
    hours: "Open until 3:00 PM",
    reservationsText: "Walk-ins welcome",
    address: "15 Coastal Lane",
    contactPhone: "(02) 4900 3344",
  },
  {
    id: "venue-4",
    name: "The Olive Room",
    image: "/images/gallery-two.png",
    imageAlt: "Warm Mediterranean restaurant interior dining room",
    description:
      "A cosy neighbourhood restaurant serving modern Mediterranean dishes.",
    type: "Restaurants",
    cuisine: "Mediterranean",
    isOnSite: false,
    distanceMeters: 1800,
    travelText: "4 min drive",
    priceLevel: 2,
    priceDisplay: "$$",
    priceAccessibilityLabel: "Price level: moderate",
    hours: "Open until 9:00 PM",
    reservationsText: "Reservations recommended",
    address: "88 Olive Tree Way",
    contactPhone: "(02) 4900 4455",
  },
  {
    id: "venue-5",
    name: "Salt & Ember",
    image: "/images/content-image-three.png",
    imageAlt: "Woodfired steak and seasonal restaurant dish spread",
    description:
      "Premium local produce, woodfired flavours and an extensive wine list.",
    type: "Restaurants",
    cuisine: "Steakhouse",
    isOnSite: false,
    distanceMeters: 3200,
    travelText: "7 min drive",
    priceLevel: 3,
    priceDisplay: "$$$",
    priceAccessibilityLabel: "Price level: premium",
    hours: "Open until 10:00 PM",
    reservationsText: "Reservations recommended",
    address: "210 Ridge Street",
    contactPhone: "(02) 4900 5566",
  },
  {
    id: "venue-6",
    name: "Bay Lantern Bar",
    image: "/images/gallery-six.png",
    imageAlt: "Evening cocktail with waterfront views at Bay Lantern Bar",
    description:
      "Relaxed waterfront bar with cocktails, local beers and small bites.",
    type: "Bars",
    cuisine: "Bar & Tapas",
    isOnSite: false,
    distanceMeters: 1200,
    travelText: "3 min drive",
    priceLevel: 2,
    priceDisplay: "$$",
    priceAccessibilityLabel: "Price level: moderate",
    hours: "Open until 11:00 PM",
    reservationsText: "Walk-ins & bookings",
    address: "5 Lantern Point",
    contactPhone: "(02) 4900 6677",
  },
  {
    id: "venue-7",
    name: "Coastal Roast & Bakery",
    image: "/images/gallery-four.png",
    imageAlt: "Artisanal espresso and freshly baked breads",
    description:
      "Artisanal coffee, freshly baked sourdough pastries and gourmet brunch.",
    type: "Cafés",
    cuisine: "Bakery & Café",
    isOnSite: false,
    distanceMeters: 600,
    travelText: "8 min walk",
    priceLevel: 1,
    priceDisplay: "$",
    priceAccessibilityLabel: "Price level: budget friendly",
    hours: "Open until 2:00 PM",
    reservationsText: "Walk-ins welcome",
    address: "32 Marine Parade",
    contactPhone: "(02) 4900 7788",
  },
  {
    id: "venue-8",
    name: "The Pier Oyster Bar",
    image: "/images/gallery-nine.png",
    imageAlt: "Fresh oysters and chilled white wine on ice",
    description:
      "Freshly shucked coastal oysters, chilled regional wines and pier views.",
    type: "Bars",
    cuisine: "Seafood Bar",
    isOnSite: false,
    distanceMeters: 900,
    travelText: "2 min drive",
    priceLevel: 3,
    priceDisplay: "$$$",
    priceAccessibilityLabel: "Price level: premium",
    hours: "Open until 10:30 PM",
    reservationsText: "Reservations recommended",
    address: " Pier 4 Esplanade",
    contactPhone: "(02) 4900 8899",
  },
  {
    id: "venue-9",
    name: "Sunset Lawn Lounge",
    image: "/images/content-image-four.png",
    imageAlt: "Sunset cocktails on outdoor grass lawn overlooking water",
    description:
      "Open-air cocktail lawn with live acoustic music and woodfired pizzas.",
    type: "Bars",
    cuisine: "Cocktail Lounge",
    isOnSite: false,
    distanceMeters: 1500,
    travelText: "4 min drive",
    priceLevel: 2,
    priceDisplay: "$$",
    priceAccessibilityLabel: "Price level: moderate",
    hours: "Open until 11:30 PM",
    reservationsText: "Walk-ins & bookings",
    address: "99 Sunset Terrace",
    contactPhone: "(02) 4900 9900",
  },
];

export const foodItinerarySteps: FoodItineraryStep[] = [
  {
    id: "itinerary-1",
    time: "8:00 AM",
    title: "Morning Coffee",
    description: "Great coffee and fresh pastries to start the day.",
    image: "/images/gallery-five.png",
    imageAlt: "Morning coffee cup and freshly baked pastry",
  },
  {
    id: "itinerary-2",
    time: "12:30 PM",
    title: "Long Lunch",
    description: "Relaxed dining with fresh, local flavours.",
    image: "/images/eat-drink.png",
    imageAlt: "Vineyard long lunch dining spread",
  },
  {
    id: "itinerary-3",
    time: "5:00 PM",
    title: "Golden Hour",
    description: "Unwind with a drink and take in the water views.",
    image: "/images/content-image-four.png",
    imageAlt: "Sunset cocktails overlooking the bay",
  },
  {
    id: "itinerary-4",
    time: "7:30 PM",
    title: "Dinner & Drinks",
    description: "A memorable meal to end the day in style.",
    image: "/images/content-image-three.png",
    imageAlt: "Contemporary evening dinner setting with wine",
  },
];

export const recommendationOptions: SupportOption[] = [
  {
    id: "supp-1",
    icon: "calendar",
    title: "Table Reservations",
    description: "We can book for you",
  },
  {
    id: "supp-2",
    icon: "leaf",
    title: "Dietary Requirements",
    description: "Vegetarian, vegan and more",
  },
  {
    id: "supp-3",
    icon: "people",
    title: "Group Dining",
    description: "Great options for families and groups",
  },
];

export const eatDrinkCtaData = {
  heading: "Stay close to the flavours you came to enjoy.",
  supportingText:
    "Great food, good company and unforgettable memories are all just moments away.",
  primaryCta: {
    label: "EXPLORE ROOMS →",
    href: "/rooms",
  },
  secondaryCta: {
    label: "BOOK YOUR STAY →",
    href: "/#availability",
  },
};
