export interface MoodCard {
  id: string;
  timeBadge: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface MoodCategory {
  id: string;
  key: "wine" | "golf" | "family" | "events" | "nature" | "eat-drink";
  label: string;
  cards: MoodCard[];
}

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
  stage?: string;
  time: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface ActivityItineraryVariant {
  key: "wine" | "golf" | "family";
  label: string;
  subtitle?: string;
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
    href: "#browse-by-mood",
  },
  secondaryCta: {
    label: "PLAN YOUR DAY",
    href: "#day-planner",
  },
  heroImage: "/images/cumberland-grounds-skyline-view.jpg",
  heroImageAlt: "Scenic Hunter Valley countryside and Cumberland grounds skyline view",
};

export const browseByMoodData = {
  eyebrow: "Browse by mood",
  heading: "However you like to spend a day.",
  description:
    "Ten places we send guests to, every one inside half an hour. Wine days run through Saddlers Creek and the Pokolbin cellar doors; golf weekends through Hunter Valley Golf Club, The Vintage and Cypress Lakes. With kids it’s the Wildlife Park and Hunter Valley Gardens. Concert nights are at Roche Estate, quiet mornings in the Watagans, and dinner is a five-minute walk into Cessnock town centre. Still deciding which town to base yourself in? We’ve mapped every nearby town and how far it really is.",
};

export const moodCategories: MoodCategory[] = [
  {
    id: "mood-wine",
    key: "wine",
    label: "Wine",
    cards: [
      {
        id: "wine-1",
        timeBadge: "10 min drive",
        title: "Saddlers Creek Wines",
        description: "Boutique cellar door, small-batch reds — a lovely first stop.",
        image: "/images/ttd-wine-image-one.jpg",
        imageAlt: "Saddlers Creek Wines boutique cellar door",
      },
      {
        id: "wine-2",
        timeBadge: "10 min drive",
        title: "Pokolbin Cellar Doors",
        description: "The famous strip — dozens of cellar doors open daily.",
        image: "/images/ttd-wine-image-two.jpg",
        imageAlt: "Pokolbin Cellar Doors famous wine country strip",
      },
      {
        id: "wine-3",
        timeBadge: "13 min drive",
        title: "Roche Estate",
        description: "A Day on the Green concerts under the vines.",
        image: "/images/ttd-wine-image-three.webp",
        imageAlt: "Roche Estate concerts and dining under the vines",
      },
    ],
  },
  {
    id: "mood-golf",
    key: "golf",
    label: "Golf",
    cards: [
      {
        id: "golf-1",
        timeBadge: "15 min drive",
        title: "Hunter Valley Golf Club",
        description: "A scenic 18-hole championship course on Wine Country Drive.",
        image: "/images/ttd-golf-image-one.jpg",
        imageAlt: "Hunter Valley Golf Club championship course fairway",
      },
      {
        id: "golf-2",
        timeBadge: "20 min drive",
        title: "The Vintage Golf Club",
        description: "The Hunter's only Greg Norman–designed public-access course.",
        image: "/images/ttd-golf-image-two.jpg",
        imageAlt: "The Vintage Golf Club Greg Norman designed golf course",
      },
      {
        id: "golf-3",
        timeBadge: "15 min drive",
        title: "Cypress Lakes Golf",
        description: "Championship resort course in the heart of wine country.",
        image: "/images/ttd-golf-image-three.jpg",
        imageAlt: "Cypress Lakes Golf championship resort course",
      },
    ],
  },
  {
    id: "mood-family",
    key: "family",
    label: "Family",
    cards: [
      {
        id: "family-1",
        timeBadge: "9 min drive",
        title: "Hunter Valley Wildlife Park",
        description: "Hand-feed kangaroos before lunch — kids' favourite.",
        image: "/images/ttd-family-image-one.jpg",
        imageAlt: "Native animals and kangaroos at Hunter Valley Wildlife Park",
      },
      {
        id: "family-2",
        timeBadge: "15 min drive",
        title: "Hunter Valley Gardens",
        description: "Sixty acres of display gardens — and the Christmas Lights Spectacular.",
        image: "/images/ttd-family-image-two.jpg",
        imageAlt: "Hunter Valley Gardens display gardens and rides",
      },
      {
        id: "family-3",
        timeBadge: "5 min walk",
        title: "Cessnock Town Centre",
        description: "Dinner, pubs and BIG W — all walkable from your room.",
        image: "/images/ttd-family-image-three.jpg",
        imageAlt: "Cessnock Town Centre dining, shopping and amenities",
      },
    ],
  },
  {
    id: "mood-events",
    key: "events",
    label: "Events",
    cards: [
      {
        id: "events-1",
        timeBadge: "13 min drive",
        title: "Roche Estate",
        description: "A Day on the Green concerts under the vines.",
        image: "/images/ttd-events-image-one.webp",
        imageAlt: "Live music and events at Roche Estate",
      },
      {
        id: "events-2",
        timeBadge: "15 min drive",
        title: "Hunter Valley Gardens",
        description: "Sixty acres of display gardens — and the Christmas Lights Spectacular.",
        image: "/images/ttd-events-image-two.jpg",
        imageAlt: "Seasonal festival and light events at Hunter Valley Gardens",
      },
      {
        id: "events-3",
        timeBadge: "10 min drive",
        title: "Pokolbin Cellar Doors",
        description: "The famous strip — dozens of cellar doors open daily.",
        image: "/images/ttd-events-image-three.jpg",
        imageAlt: "Weekend events and cellar door tastings in Pokolbin",
      },
    ],
  },
  {
    id: "mood-nature",
    key: "nature",
    label: "Nature",
    cards: [
      {
        id: "nature-1",
        timeBadge: "25 min drive",
        title: "Watagans National Park",
        description: "Rainforest lookouts and quiet picnic clearings.",
        image: "/images/ttd-nature-image-one.jpg",
        imageAlt: "Scenic rainforest lookout in Watagans National Park",
      },
      {
        id: "nature-2",
        timeBadge: "15 min drive",
        title: "Hunter Valley Gardens",
        description: "Sixty acres of display gardens — and the Christmas Lights Spectacular.",
        image: "/images/ttd-nature-image-two.jpg",
        imageAlt: "Manicured botanic landscapes at Hunter Valley Gardens",
      },
      {
        id: "nature-3",
        timeBadge: "10 min drive",
        title: "Saddlers Creek Wines",
        description: "Boutique cellar door, small-batch reds — a lovely first stop.",
        image: "/images/ttd-nature-image-three.jpg",
        imageAlt: "Peaceful vineyard views at Saddlers Creek Wines",
      },
    ],
  },
  {
    id: "mood-eat-drink",
    key: "eat-drink",
    label: "Eat & Drink",
    cards: [
      {
        id: "eat-1",
        timeBadge: "5 min walk",
        title: "Cessnock Town Centre",
        description: "Dinner, pubs and BIG W — all walkable from your room.",
        image: "/images/ttd-eatanddrink-image-one.jpg",
        imageAlt: "Local cafes, restaurants and pubs in Cessnock Town Centre",
      },
      {
        id: "eat-2",
        timeBadge: "10 min drive",
        title: "Pokolbin Cellar Doors",
        description: "The famous strip — dozens of cellar doors open daily.",
        image: "/images/ttd-eatanddrink-image-two.jpg",
        imageAlt: "Gourmet dining and wine tastings along Pokolbin strip",
      },
      {
        id: "eat-3",
        timeBadge: "10 min drive",
        title: "Saddlers Creek Wines",
        description: "Boutique cellar door, small-batch reds — a lovely first stop.",
        image: "/images/ttd-eatanddrink-image-three.jpg",
        imageAlt: "Picnic grounds and artisan wines at Saddlers Creek",
      },
    ],
  },
];

export const activityBenefits: ActivityBenefit[] = [
  {
    id: "ben-1",
    icon: "car",
    label: "Inside 30 Minutes Drive",
  },
  {
    id: "ben-2",
    icon: "people",
    label: "Ideal for Couples & Families",
  },
  {
    id: "ben-3",
    icon: "tag",
    label: "Direct Town Centre Access",
  },
  {
    id: "ben-4",
    icon: "leaf",
    label: "Year-Round Hunter Valley Magic",
  },
];

export const wineDayItinerary: ActivityItineraryStep[] = [
  {
    id: "wine-step-1",
    time: "8:00am",
    title: "Coffee by the pool",
    description:
      "Brew a coffee in your room, or grab breakfast in town, before the cellar doors open — no rush.",
    image: "/images/ttd-wineday-image-one.webp",
    imageAlt: "Morning coffee by the swimming pool at Cumberland Motor Inn",
  },
  {
    id: "wine-step-2",
    time: "9:30am",
    title: "Saddlers Creek Wines",
    description:
      "10 min away. Start small-batch and local before the crowds arrive.",
    image: "/images/ttd-wineday-image-two.jpg",
    imageAlt: "Tasting room at Saddlers Creek Wines",
  },
  {
    id: "wine-step-3",
    time: "11:00am",
    title: "Pokolbin strip",
    description:
      "10 min. Three or four cellar doors along the famous stretch.",
    image: "/images/ttd-wineday-image-three.jpg",
    imageAlt: "Pokolbin cellar doors and vineyards",
  },
  {
    id: "wine-step-4",
    time: "1:00pm",
    title: "Long lunch among the vines",
    description:
      "Book ahead — we’ll make the call for you.",
    image: "/images/ttd-wineday-image-four.jpg",
    imageAlt: "Winery restaurant long lunch overlooking vineyard",
  },
  {
    id: "wine-step-5",
    time: "4:00pm",
    title: "Back for a swim",
    description:
      "Drop the car, we’ll keep your finds chilled at reception.",
    image: "/images/ttd-wineday-image-five.jpg",
    imageAlt: "Afternoon refreshing swim in the saltwater pool",
  },
  {
    id: "wine-step-6",
    time: "7:00pm",
    title: "Dinner in town",
    description:
      "5-min walk. Then a nightcap on the verandah.",
    image: "/images/ttd-wineday-image-six.webp",
    imageAlt: "Evening dinner in Cessnock town centre",
  },
];

export const golfWeekendItinerary: ActivityItineraryStep[] = [
  {
    id: "golf-step-1",
    time: "7:00am",
    title: "First tee at Hunter Valley Golf Club",
    description:
      "About 15 min — out on the fairway before the day warms up.",
    image: "/images/ttd-golfday-image-one.jpg",
    imageAlt: "Early morning first tee on championship golf course",
  },
  {
    id: "golf-step-2",
    time: "11:30am",
    title: "Back for brunch",
    description:
      "Quick swim, brunch in town, feet up.",
    image: "/images/ttd-golfday-image-two.webp",
    imageAlt: "Midday brunch and relaxing poolside",
  },
  {
    id: "golf-step-3",
    time: "1:30pm",
    title: "The Vintage",
    description:
      "Roughly 20 min — the Hunter’s Greg Norman–designed championship course.",
    image: "/images/ttd-golfday-image-three.jpg",
    imageAlt: "The Vintage Greg Norman championship golf fairway",
  },
  {
    id: "golf-step-4",
    time: "5:00pm",
    title: "Cellar door wind-down",
    description:
      "Saddlers Creek, 10 min — earn the tasting.",
    image: "/images/ttd-golfday-image-four.jpg",
    imageAlt: "Winery tasting wind-down after a round of golf",
  },
  {
    id: "golf-step-5",
    time: "7:30pm",
    title: "Steak in town",
    description:
      "5-min walk. Compare scorecards over a red.",
    image: "/images/ttd-golfday-image-five.jpg",
    imageAlt: "Hearty steak dinner in Cessnock town centre",
  },
  {
    id: "golf-step-6",
    time: "Next day",
    title: "Cypress Lakes",
    description:
      "About 15 min. Resort championship course to finish the weekend.",
    image: "/images/ttd-golfday-image-six.jpg",
    imageAlt: "Cypress Lakes resort golf course",
  },
];

export const familyEscapeItinerary: ActivityItineraryStep[] = [
  {
    id: "family-step-1",
    time: "8:30am",
    title: "Pancakes, then the pool",
    description:
      "Burn off the early-morning energy before the day starts.",
    image: "/images/ttd-familyday-image-one.webp",
    imageAlt: "Morning breakfast and swimming pool fun",
  },
  {
    id: "family-step-2",
    time: "10:00am",
    title: "Hunter Valley Wildlife Park",
    description:
      "9 min. Hand-feed the kangaroos — the day’s big hit.",
    image: "/images/ttd-familyday-image-two.jpg",
    imageAlt: "Hand-feeding kangaroos at Hunter Valley Wildlife Park",
  },
  {
    id: "family-step-3",
    time: "12:30pm",
    title: "Lunch in town",
    description:
      "5-min walk, plus a BIG W run for anything forgotten.",
    image: "/images/ttd-familyday-image-three.jpg",
    imageAlt: "Casual family lunch in Cessnock town centre",
  },
  {
    id: "family-step-4",
    time: "2:00pm",
    title: "Hunter Valley Gardens",
    description:
      "15 min. Sixty acres to run wild in.",
    image: "/images/ttd-familyday-image-four.jpg",
    imageAlt: "Exploring sixty acres of Hunter Valley Gardens",
  },
  {
    id: "family-step-5",
    time: "5:00pm",
    title: "Poolside afternoon",
    description:
      "Back to base. Extra towels already in the room.",
    image: "/images/ttd-familyday-image-five.jpg",
    imageAlt: "Relaxing poolside in the afternoon",
  },
  {
    id: "family-step-6",
    time: "7:00pm",
    title: "Movie night, four real beds",
    description:
      "TV on, kids asleep by eight.",
    image: "/images/ttd-familyday-image-six.webp",
    imageAlt: "Comfortable family suite beds and evening movie night",
  },
];

export const itineraryVariants: ActivityItineraryVariant[] = [
  {
    key: "wine",
    label: "The Wine Day",
    introText:
      "Start small-batch and local, enjoy a leisurely vineyard lunch, cool off in the pool, and stroll to dinner.",
    steps: wineDayItinerary,
  },
  {
    key: "golf",
    label: "The Golf Weekend",
    introText:
      "Tee off early on the region’s premier championship fairways, recharge with local wine, and conquer Cypress Lakes.",
    steps: golfWeekendItinerary,
  },
  {
    key: "family",
    label: "The Family Escape",
    introText:
      "Wildlife encounters, acres of garden wonderland, pool time, and spacious rooms designed for a stress-free family getaway.",
    steps: familyEscapeItinerary,
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
    image: "/images/ttd-golf-image-one.jpg",
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
    name: "Watagans National Park Lookouts",
    image: "/images/ttd-nature-image-one.jpg",
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
  {
    id: "act-4",
    name: "Hunter Valley Gardens",
    image: "/images/ttd-family-image-two.jpg",
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
    image: "/images/ttd-family-image-one.jpg",
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
];
