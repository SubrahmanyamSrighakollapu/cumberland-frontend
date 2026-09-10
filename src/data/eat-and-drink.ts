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
    "From cosy Cessnock cafés to renowned Hunter Valley winery restaurants, enjoy delicious local dining close to Cumberland Motor Inn.",
  primaryCta: {
    label: "EXPLORE DINING →",
    href: "#local-dining",
  },
  secondaryCta: {
    label: "ASK OUR TEAM",
    href: "/contact",
  },
  heroImage: "/images/eat-drink.png",
  heroImageAlt: "Hunter Valley dining table with local produce and wine glasses",
};

export const featuredDiningData = {
  eyebrow: "FEATURED EXPERIENCE",
  headingLines: ["A memorable meal,", "close to your room."],
  heading: "A memorable meal,\nclose to your room.",
  description:
    "Enjoy contemporary regional cuisine in a relaxed setting, close to Cumberland Motor Inn. Fresh local produce, friendly service and a welcoming atmosphere make Cessnock and the Hunter Valley a food lover's destination.",
  image: "/images/content-image-one.png",
  imageAlt: "Chef plating a contemporary Hunter Valley culinary dish",
  facts: [
    {
      id: "fact-1",
      icon: "cutlery",
      main: "Contemporary",
      sub: "Regional cuisine",
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
      main: "2 minutes",
      sub: "from motel",
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
      title: "Hunter Valley Wine",
      description: "Local vintages & pairings",
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
    name: "Vincent Street Kitchen & Bar",
    image: "/images/gallery-one.png",
    imageAlt: "Modern Australian dining at Vincent Street Kitchen & Bar in Cessnock",
    description:
      "Vibrant Cessnock dining venue serving seasonal steaks, woodfired pizzas, and regional wines.",
    type: "Restaurants",
    cuisine: "Modern Australian",
    isOnSite: false,
    distanceMeters: 400,
    travelText: "5 min walk",
    priceLevel: 2,
    priceDisplay: "$$",
    priceAccessibilityLabel: "Price level: moderate",
    hours: "Open until 10:00 PM",
    reservationsText: "Reservations recommended",
    featured: true,
    address: "201 Vincent Street, Cessnock",
    contactPhone: "(02) 4990 1011",
  },
  {
    id: "venue-2",
    name: "Esca Bimbadgen",
    image: "/images/gallery-ten.png",
    imageAlt: "Vineyard terrace dining at Esca Bimbadgen in Pokolbin",
    description:
      "Award-winning winery restaurant perched over Bimbadgen vineyards with panoramic views.",
    type: "Restaurants",
    cuisine: "Fine Dining",
    isOnSite: false,
    distanceMeters: 12000,
    travelText: "15 min drive",
    priceLevel: 3,
    priceDisplay: "$$$",
    priceAccessibilityLabel: "Price level: premium",
    hours: "Open until 9:30 PM",
    reservationsText: "Reservations required",
    address: "790 McDonalds Road, Pokolbin",
    contactPhone: "(02) 4998 4666",
  },
  {
    id: "venue-3",
    name: "Cessnock Artisanal Bakery & Café",
    image: "/images/gallery-five.png",
    imageAlt: "Freshly roasted coffee and artisan pastries in Cessnock",
    description:
      "Great espresso coffee, freshly baked sourdough pastries and hearty breakfast options.",
    type: "Cafés",
    cuisine: "Bakery & Café",
    isOnSite: false,
    distanceMeters: 300,
    travelText: "3 min walk",
    priceLevel: 1,
    priceDisplay: "$",
    priceAccessibilityLabel: "Price level: budget friendly",
    hours: "Open 6:30 AM – 3:00 PM",
    reservationsText: "Walk-ins welcome",
    address: "Cessnock Town Centre",
    contactPhone: "(02) 4990 2233",
  },
  {
    id: "venue-4",
    name: "The Deck Café Lovedale",
    image: "/images/gallery-two.png",
    imageAlt: "Relaxed outdoor deck cafe dining in Lovedale",
    description:
      "Tapas and relaxed breakfast dining set amidst lush Lovedale greenery alongside a peaceful lagoon.",
    type: "Cafés",
    cuisine: "Tapas & Cafe",
    isOnSite: false,
    distanceMeters: 14000,
    travelText: "15 min drive",
    priceLevel: 2,
    priceDisplay: "$$",
    priceAccessibilityLabel: "Price level: moderate",
    hours: "Open until 3:30 PM",
    reservationsText: "Bookings recommended",
    address: "700 Lovedale Road, Lovedale",
    contactPhone: "(02) 4930 7113",
  },
  {
    id: "venue-5",
    name: "Cessnock Vintage Bistro",
    image: "/images/content-image-three.png",
    imageAlt: "Warm bistro dining atmosphere in Cessnock",
    description:
      "Cosy heritage bistro serving prime Angus steaks, country pies, and Hunter Valley craft beers.",
    type: "Restaurants",
    cuisine: "Steakhouse & Grill",
    isOnSite: false,
    distanceMeters: 600,
    travelText: "2 min drive",
    priceLevel: 2,
    priceDisplay: "$$",
    priceAccessibilityLabel: "Price level: moderate",
    hours: "Open until 9:00 PM",
    reservationsText: "Reservations recommended",
    address: "Cessnock Central",
    contactPhone: "(02) 4990 3344",
  },
  {
    id: "venue-6",
    name: "The Royal Oak Hotel Bar & Grill",
    image: "/images/gallery-six.png",
    imageAlt: "Historic Cessnock pub bar and dining area",
    description:
      "Historic Cessnock pub with welcoming atmosphere, craft beers on tap, and hearty pub classics.",
    type: "Bars",
    cuisine: "Pub & Bistro",
    isOnSite: false,
    distanceMeters: 500,
    travelText: "6 min walk",
    priceLevel: 2,
    priceDisplay: "$$",
    priceAccessibilityLabel: "Price level: moderate",
    hours: "Open until 11:00 PM",
    reservationsText: "Walk-ins & bookings",
    address: "Cessnock CBD",
    contactPhone: "(02) 4990 1200",
  },
];

export const foodItinerarySteps: FoodItineraryStep[] = [
  {
    id: "itinerary-1",
    time: "8:00 AM",
    title: "Morning Coffee in Cessnock",
    description: "Great coffee and fresh pastries in the town centre.",
    image: "/images/gallery-five.png",
    imageAlt: "Morning coffee cup and freshly baked pastry in Cessnock",
  },
  {
    id: "itinerary-2",
    time: "12:30 PM",
    title: "Winery Long Lunch",
    description: "Relaxed vineyard dining with fresh Hunter Valley produce.",
    image: "/images/eat-drink.png",
    imageAlt: "Vineyard long lunch dining spread in Pokolbin",
  },
  {
    id: "itinerary-3",
    time: "5:00 PM",
    title: "Golden Hour Tastings",
    description: "Unwind with local Hunter Valley wines and sunset country views.",
    image: "/images/content-image-four.png",
    imageAlt: "Sunset wine tasting overlook in the Hunter Valley",
  },
  {
    id: "itinerary-4",
    time: "7:30 PM",
    title: "Dinner & Drinks",
    description: "A memorable meal in Cessnock or nearby wine country.",
    image: "/images/content-image-three.png",
    imageAlt: "Contemporary evening dinner setting with Hunter Valley wine",
  },
];

export const recommendationOptions: SupportOption[] = [
  {
    id: "supp-1",
    icon: "calendar",
    title: "Table Reservations",
    description: "Ask our team for local dining recommendations",
  },
  {
    id: "supp-2",
    icon: "leaf",
    title: "Dietary Requirements",
    description: "Vegetarian, vegan and gluten-free options nearby",
  },
  {
    id: "supp-3",
    icon: "people",
    title: "Group Dining",
    description: "Great options for families, corporate & touring groups",
  },
];

export const eatDrinkCtaData = {
  heading: "Stay close to the flavours of the Hunter Valley.",
  supportingText:
    "Great local food, regional wines and welcoming hospitality are all just moments from your room.",
  primaryCta: {
    label: "EXPLORE ROOMS →",
    href: "/rooms",
  },
  secondaryCta: {
    label: "BOOK YOUR STAY →",
    href: "/#availability",
  },
};
