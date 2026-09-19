export interface RoomAmenityItem {
  id: string;
  title: string;
  icon: string; // icon key for SVG renderer
  description?: string;
}

export interface RoomGalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export interface RoomFeatureTile {
  id: string;
  icon: "person" | "bed" | "area" | "balcony" | "patio" | "view";
  label: string;
}

export interface StayInfoItem {
  id: string;
  title: string;
  content: string;
  icon: string;
}

export interface RoomDetail {
  id: string;
  slug: string;
  name: string;
  eyebrow: string;
  shortDescription: string;
  price: number;
  currency: string;
  priceUnit: string;
  capacityGuests: number;
  guestsLabel: string;
  bedConfiguration: string;
  areaM2: number;
  areaLabel: string;
  viewLabel: string;
  balconyLabel?: string;
  seoTitle: string;
  seoDescription: string;
  intro: {
    eyebrow: string;
    heading: string;
    paragraph1: string;
    paragraph2: string;
    featureTiles: RoomFeatureTile[];
  };
  primaryImage?: string;
  gallery: RoomGalleryImage[];
  amenities: RoomAmenityItem[];
  highlights: string[];
  stayInfo: StayInfoItem[];
  relatedRoomIds: string[];
}

export const defaultAmenities: RoomAmenityItem[] = [
  {
    id: "wifi",
    title: "Complimentary Wi-Fi",
    icon: "wifi",
    description: "High-speed wireless internet throughout the room.",
  },
  {
    id: "ac",
    title: "Air conditioning",
    icon: "ac",
    description: "Climate control heating and cooling.",
  },
  {
    id: "tv",
    title: "Smart TV with casting",
    icon: "tv",
    description: "50-inch HD Smart TV with streaming capabilities.",
  },
  {
    id: "fridge",
    title: "Mini refrigerator",
    icon: "fridge",
    description: "Compact in-room fridge for refreshments.",
  },
  {
    id: "coffee",
    title: "Tea & coffee facilities",
    icon: "coffee",
    description: "Nespresso machine with complimentary pods and tea.",
  },
  {
    id: "desk",
    title: "Work desk",
    icon: "desk",
    description: "Dedicated workspace with ergonomic seating.",
  },
  {
    id: "shower",
    title: "Walk-in shower",
    icon: "shower",
    description: "Modern bathroom with rainfall showerhead and local toiletries.",
  },
  {
    id: "balcony",
    title: "Private balcony",
    icon: "balcony",
    description: "Furnished private balcony with outdoor seating.",
  },
  {
    id: "parking",
    title: "Free parking on-site",
    icon: "parking",
    description: "Dedicated parking space right outside your room.",
  },
  {
    id: "non-smoking",
    title: "Non-smoking rooms",
    icon: "non-smoking",
    description: "100% smoke-free indoor environment.",
  },
];

export const defaultStayInfo: StayInfoItem[] = [
  {
    id: "check-in",
    title: "Check-in & check-out",
    content:
      "Check-in from 2:00 PM till 9:00 PM\nCheck-out by 10:00 AM\nManagement reserves the right to apply a $20 per hour fee for early check-ins before 2pm, late check-ins after 9pm and late check-outs.",
    icon: "clock",
  },
  {
    id: "cancellation",
    title: "Cancellation policy",
    content:
      "NO REFUNDS AFTER BOOKINGS. All cancellations will incur a $20 administration fee. 24 hour cancellation period by 2pm. After that time no deposits will be refunded.",
    icon: "shield",
  },
  {
    id: "parking-info",
    title: "Car parking",
    content: "Off street parking, no charge.",
    icon: "car",
  },
  {
    id: "surcharges",
    title: "Credit card surcharges",
    content: "There is a surcharge added for Amex and Diners Card.",
    icon: "credit-card",
  },
  {
    id: "reception",
    title: "Reception hours",
    content:
      "7:00 AM – 9:00 PM Monday to Friday\n8:00 AM – 9:00 PM Saturday and Sunday",
    icon: "clock",
  },
  {
    id: "accessibility",
    title: "Accessible facilities",
    content:
      "Accessible facilities and convenient room access designed for guest comfort.",
    icon: "accessibility",
  },
];

export const roomsDataset: Record<string, RoomDetail> = {
  "deluxe-queen-room": {
    id: "deluxe-queen-room",
    slug: "deluxe-queen-room",
    name: "Deluxe Queen Room",
    eyebrow: "ACCOMMODATION",
    shortDescription:
      "Air-conditioned room featuring 1 Queen bed, TV, microwave, mini refrigerator, and tea and coffee making facilities.",
    price: 160,
    currency: "$",
    priceUnit: "/ night",
    capacityGuests: 2,
    guestsLabel: "2 Guests",
    bedConfiguration: "1 Queen Bed",
    areaM2: 28,
    areaLabel: "Spacious",
    viewLabel: "Cessnock Grounds",
    balconyLabel: "Ground Floor",
    seoTitle: "Deluxe Queen Room | Cumberland Motor Inn Cessnock",
    seoDescription:
      "Stay in our comfortable Deluxe Queen Room featuring air conditioning, TV, microwave, refrigerator and tea/coffee facilities in Cessnock.",
    intro: {
      eyebrow: "CESSNOCK MOTEL ACCOMMODATION",
      heading: "Relaxed queen comfort for couples & solo travellers.",
      paragraph1:
        "Designed for up to 2 guests, the Deluxe Queen Room features 1 Queen bed, climate-control heating and cooling, TV, microwave, mini refrigerator, and tea and coffee making facilities.",
      paragraph2:
        "Situated on the ground floor of our Cessnock motel with convenient off-street parking, offering a peaceful base for exploring Hunter Valley cellar doors and regional dining.",
      featureTiles: [
        { id: "ft-1", icon: "person", label: "2 Guests" },
        { id: "ft-2", icon: "bed", label: "1 Queen Bed" },
        { id: "ft-3", icon: "area", label: "Air Conditioned" },
        { id: "ft-4", icon: "patio", label: "Cessnock Location" },
      ],
    },
    gallery: [
      {
        id: "gal-1",
        src: "/images/cumberland-courtyard-accommodation-day.jpg",
        alt: "Deluxe Queen Room wing and guest suite entrance at Cumberland Motor Inn",
        caption: "Deluxe Queen Room Suite",
      },
      {
        id: "gal-2",
        src: "/images/cumberland-courtyard-panoramic-day.jpg",
        alt: "Courtyard view of Cumberland Motor Inn accommodation suites",
        caption: "Courtyard Suites",
      },
      {
        id: "gal-3",
        src: "/images/cumberland-balcony-courtyard-view.jpg",
        alt: "Balcony view overlooking Cumberland Motor Inn grounds",
        caption: "Balcony Outlook",
      },
    ],
    amenities: defaultAmenities,
    highlights: [
      "1 Queen Bed",
      "Air conditioning & heating",
      "Microwave & refrigerator",
      "Tea & coffee making facilities",
    ],
    stayInfo: defaultStayInfo,
    relatedRoomIds: ["deluxe-twin-room", "family-room", "business-single-room"],
  },
  "deluxe-twin-room": {
    id: "deluxe-twin-room",
    slug: "deluxe-twin-room",
    name: "Deluxe Twin Room",
    eyebrow: "ACCOMMODATION",
    shortDescription:
      "Air-conditioned twin suite featuring 1 Double bed and 1 Single bed, TV, microwave, mini refrigerator, and tea/coffee facilities.",
    price: 175,
    currency: "$",
    priceUnit: "/ night",
    capacityGuests: 3,
    guestsLabel: "3 Guests",
    bedConfiguration: "1 Single Bed & 1 Double Bed",
    areaM2: 32,
    areaLabel: "Spacious",
    viewLabel: "Cessnock Grounds",
    seoTitle: "Deluxe Twin Room | Cumberland Motor Inn Cessnock",
    seoDescription:
      "Our Deluxe Twin Room features 1 single bed and 1 double bed, air conditioning, TV, microwave, fridge, and tea/coffee making facilities.",
    intro: {
      eyebrow: "SHARED MOTEL COMFORT",
      heading: "Ideal twin accommodation for small groups & families.",
      paragraph1:
        "Accommodating up to 3 guests, our Deluxe Twin Room features a double bed and single bed configuration, air conditioning, TV, microwave, mini fridge, and tea and coffee making facilities.",
      paragraph2:
        "A practical choice for friends travelling together or small families seeking comfortable motel lodging close to Cessnock town centre and wine country.",
      featureTiles: [
        { id: "ft-1", icon: "person", label: "3 Guests" },
        { id: "ft-2", icon: "bed", label: "1 Single & 1 Double" },
        { id: "ft-3", icon: "area", label: "Air Conditioned" },
        { id: "ft-4", icon: "view", label: "Grounds View" },
      ],
    },
    gallery: [
      {
        id: "gal-1",
        src: "/images/cumberland-courtyard-panoramic-day.jpg",
        alt: "Deluxe Twin Room suite exterior and courtyard view at Cumberland Motor Inn",
        caption: "Deluxe Twin Room Suites",
      },
      {
        id: "gal-2",
        src: "/images/cumberland-covered-carport-night.jpg",
        alt: "Dedicated carport parking for Deluxe Twin Room guests",
        caption: "Covered Carport Parking",
      },
    ],
    amenities: defaultAmenities,
    highlights: [
      "1 Single & 1 Double Bed",
      "Air conditioning",
      "TV, microwave & fridge",
      "Tea & coffee making facilities",
    ],
    stayInfo: defaultStayInfo,
    relatedRoomIds: ["deluxe-queen-room", "family-room", "business-single-room"],
  },
  "family-room": {
    id: "family-room",
    slug: "family-room",
    name: "Family Room",
    eyebrow: "ACCOMMODATION",
    shortDescription:
      "Spacious air-conditioned family suite featuring 1 Double bed and 2 Single beds, TV, microwave, mini refrigerator, and tea/coffee facilities.",
    price: 210,
    currency: "$",
    priceUnit: "/ night",
    capacityGuests: 4,
    guestsLabel: "4 Guests",
    bedConfiguration: "2 Single Beds & 1 Double Bed",
    areaM2: 42,
    areaLabel: "Large Space",
    viewLabel: "Grounds View",
    seoTitle: "Family Room | Cumberland Motor Inn Cessnock",
    seoDescription:
      "Spacious Family Room at Cumberland Motor Inn featuring 2 single beds and 1 double bed, air conditioning, TV, microwave, and fridge.",
    intro: {
      eyebrow: "SPACIOUS FAMILY ACCOMMODATION",
      heading: "Generous family room layout with flexible bedding.",
      paragraph1:
        "Our Family Room sleeps up to 4 guests with 1 double bed and 2 single beds. Includes climate control air conditioning, TV, microwave, mini refrigerator, and tea and coffee making facilities.",
      paragraph2:
        "Offers ample room for families or group visits seeking practical, value-focused accommodation in Cessnock within easy reach of regional attractions.",
      featureTiles: [
        { id: "ft-1", icon: "person", label: "4 Guests" },
        { id: "ft-2", icon: "bed", label: "2 Singles & 1 Double" },
        { id: "ft-3", icon: "area", label: "Large Room" },
        { id: "ft-4", icon: "patio", label: "Spacious Layout" },
      ],
    },
    gallery: [
      {
        id: "gal-1",
        src: "/images/cumberland-main-exterior-day.jpg",
        alt: "Spacious Family Room suite wing at Cumberland Motor Inn",
        caption: "Family Accommodation Wing",
      },
      {
        id: "gal-2",
        src: "/images/cumberland-reception-pool-view.jpg",
        alt: "Outdoor salt-water pool area near Family Room suites",
        caption: "Pool & Grounds Access",
      },
    ],
    amenities: defaultAmenities,
    highlights: [
      "2 Single Beds & 1 Double Bed",
      "Large room layout",
      "Air conditioning",
      "Microwave & refrigerator",
    ],
    stayInfo: defaultStayInfo,
    relatedRoomIds: ["deluxe-queen-room", "deluxe-twin-room", "business-single-room"],
  },
  "business-single-room": {
    id: "business-single-room",
    slug: "business-single-room",
    name: "Business Single Room",
    eyebrow: "ACCOMMODATION",
    shortDescription:
      "Quiet single room featuring 1 Double bed, toaster, microwave, mini refrigerator, seating area, TV, and air conditioning.",
    price: 145,
    currency: "$",
    priceUnit: "/ night",
    capacityGuests: 1,
    guestsLabel: "1 Guest",
    bedConfiguration: "1 Double Bed",
    areaM2: 24,
    areaLabel: "Comfortable",
    viewLabel: "Grounds View",
    seoTitle: "Business Single Room | Cumberland Motor Inn Cessnock",
    seoDescription:
      "Comfortable Business Single Room featuring a double bed, toaster, microwave, and seating area for corporate or solo travelers in Cessnock.",
    intro: {
      eyebrow: "SOLO & CORPORATE TRAVEL",
      heading: "Practical comfort for work stays and solo visits.",
      paragraph1:
        "Designed for corporate guests and solo travellers, this room features 1 double bed, a dedicated seating area, toaster, microwave, mini refrigerator, TV, and air conditioning.",
      paragraph2:
        "Provides a quiet, functional room in Cessnock with complimentary Wi-Fi and convenient on-site parking.",
      featureTiles: [
        { id: "ft-1", icon: "person", label: "1 Guest" },
        { id: "ft-2", icon: "bed", label: "1 Double Bed" },
        { id: "ft-3", icon: "area", label: "Seating Area" },
        { id: "ft-4", icon: "patio", label: "Toaster & Microwave" },
      ],
    },
    gallery: [
      {
        id: "gal-1",
        src: "/images/cumberland-building-facade-lawn.jpg",
        alt: "Quiet business single room building facade and garden view",
        caption: "Business Suite Exterior",
      },
      {
        id: "gal-2",
        src: "/images/cumberland-reception-brick-archway.jpg",
        alt: "Welcoming brick archway near reception for corporate guests",
        caption: "Reception Entryway",
      },
    ],
    amenities: defaultAmenities,
    highlights: [
      "1 Double Bed",
      "Toaster & microwave",
      "Seating area",
      "Air conditioning & free Wi-Fi",
    ],
    stayInfo: defaultStayInfo,
    relatedRoomIds: ["deluxe-queen-room", "deluxe-twin-room", "family-room"],
  },
  // Alias keys for legacy routes
  "lakeview-queen-balcony": {
    id: "deluxe-queen-room",
    slug: "deluxe-queen-room",
    name: "Deluxe Queen Room",
    eyebrow: "ACCOMMODATION",
    shortDescription:
      "This air-conditioned room features a TV, microwave, refrigerator and tea and coffee making facilities.",
    price: 160,
    currency: "$",
    priceUnit: "/ night",
    capacityGuests: 2,
    guestsLabel: "2 Guests",
    bedConfiguration: "1 Queen Bed",
    areaM2: 28,
    areaLabel: "Spacious",
    viewLabel: "Cessnock Grounds",
    seoTitle: "Deluxe Queen Room | Cumberland Motor Inn Cessnock",
    seoDescription:
      "Stay in our comfortable Deluxe Queen Room featuring air conditioning, TV, microwave, refrigerator and tea/coffee facilities in Cessnock.",
    intro: {
      eyebrow: "COMFORTABLE CESSNOCK STAY",
      heading: "Relaxed queen comfort.",
      paragraph1:
        "Bedding consists of 1 Queen bed. This air-conditioned room features a TV, microwave, refrigerator and tea and coffee making facilities.",
      paragraph2:
        "Located in the heart of Cessnock, providing an ideal base for exploring Hunter Valley wineries and attractions.",
      featureTiles: [
        { id: "ft-1", icon: "person", label: "2 Guests" },
        { id: "ft-2", icon: "bed", label: "1 Queen Bed" },
        { id: "ft-3", icon: "area", label: "Air Conditioned" },
        { id: "ft-4", icon: "patio", label: "Cessnock Location" },
      ],
    },
    gallery: [
      {
        id: "gal-1",
        src: "/images/room-one.png",
        alt: "Deluxe Queen Room interior with comfortable Queen bed at Cumberland Motor Inn",
        caption: "Deluxe Queen Room",
      },
    ],
    amenities: defaultAmenities,
    highlights: [
      "1 Queen Bed",
      "Air conditioning & heating",
      "Microwave & refrigerator",
      "Tea & coffee making facilities",
    ],
    stayInfo: defaultStayInfo,
    relatedRoomIds: ["deluxe-twin-room", "family-room", "business-single-room"],
  },
  "cove-king": {
    id: "deluxe-queen-room",
    slug: "deluxe-queen-room",
    name: "Deluxe Queen Room",
    eyebrow: "ACCOMMODATION",
    shortDescription:
      "This air-conditioned room features a TV, microwave, refrigerator and tea and coffee making facilities.",
    price: 160,
    currency: "$",
    priceUnit: "/ night",
    capacityGuests: 2,
    guestsLabel: "2 Guests",
    bedConfiguration: "1 Queen Bed",
    areaM2: 28,
    areaLabel: "Spacious",
    viewLabel: "Cessnock Grounds",
    seoTitle: "Deluxe Queen Room | Cumberland Motor Inn Cessnock",
    seoDescription:
      "Stay in our comfortable Deluxe Queen Room featuring air conditioning, TV, microwave, refrigerator and tea/coffee facilities in Cessnock.",
    intro: {
      eyebrow: "COMFORTABLE CESSNOCK STAY",
      heading: "Relaxed queen comfort.",
      paragraph1:
        "Bedding consists of 1 Queen bed. This air-conditioned room features a TV, microwave, refrigerator and tea and coffee making facilities.",
      paragraph2:
        "Located in the heart of Cessnock, providing an ideal base for exploring Hunter Valley wineries and attractions.",
      featureTiles: [
        { id: "ft-1", icon: "person", label: "2 Guests" },
        { id: "ft-2", icon: "bed", label: "1 Queen Bed" },
        { id: "ft-3", icon: "area", label: "Air Conditioned" },
        { id: "ft-4", icon: "patio", label: "Grounds View" },
      ],
    },
    gallery: [
      {
        id: "gal-1",
        src: "/images/room-one.png",
        alt: "Deluxe Queen Room interior",
        caption: "Deluxe Queen Room",
      },
    ],
    amenities: defaultAmenities,
    highlights: [
      "1 Queen Bed",
      "Air conditioning & heating",
      "Microwave & refrigerator",
      "Tea & coffee making facilities",
    ],
    stayInfo: defaultStayInfo,
    relatedRoomIds: ["deluxe-twin-room", "family-room", "business-single-room"],
  },
  "ocean-twin": {
    id: "deluxe-twin-room",
    slug: "deluxe-twin-room",
    name: "Deluxe Twin Room",
    eyebrow: "ACCOMMODATION",
    shortDescription:
      "This air-conditioned room features a TV, microwave, refrigerator and tea and coffee making facilities.",
    price: 175,
    currency: "$",
    priceUnit: "/ night",
    capacityGuests: 3,
    guestsLabel: "3 Guests",
    bedConfiguration: "1 Single Bed & 1 Double Bed",
    areaM2: 32,
    areaLabel: "Spacious",
    viewLabel: "Cessnock Grounds",
    seoTitle: "Deluxe Twin Room | Cumberland Motor Inn Cessnock",
    seoDescription:
      "Our Deluxe Twin Room features 1 single bed and 1 double bed, air conditioning, TV, microwave, fridge, and tea/coffee making facilities.",
    intro: {
      eyebrow: "SHARED COMFORT",
      heading: "Ideal for friends or small families.",
      paragraph1:
        "Bedding consists of 1 single bed and 1 double bed. This air-conditioned room features a TV, microwave, refrigerator and tea and coffee making facilities.",
      paragraph2:
        "Enjoy comfortable beds and essential motel amenities close to Hunter Valley Wine Country.",
      featureTiles: [
        { id: "ft-1", icon: "person", label: "3 Guests" },
        { id: "ft-2", icon: "bed", label: "1 Single & 1 Double" },
        { id: "ft-3", icon: "area", label: "Air Conditioned" },
        { id: "ft-4", icon: "view", label: "Spacious Layout" },
      ],
    },
    gallery: [
      {
        id: "gal-1",
        src: "/images/room-two.png",
        alt: "Deluxe Twin Room bedding",
        caption: "Deluxe Twin Room Bedding",
      },
    ],
    amenities: defaultAmenities,
    highlights: [
      "1 Single & 1 Double Bed",
      "Air conditioning",
      "TV, microwave & fridge",
      "Tea & coffee making facilities",
    ],
    stayInfo: defaultStayInfo,
    relatedRoomIds: ["deluxe-queen-room", "family-room", "business-single-room"],
  },
  "family-suite": {
    id: "family-room",
    slug: "family-room",
    name: "Family Room",
    eyebrow: "ACCOMMODATION",
    shortDescription:
      "This large air-conditioned room features a TV, microwave, refrigerator and tea and coffee making facilities.",
    price: 210,
    currency: "$",
    priceUnit: "/ night",
    capacityGuests: 4,
    guestsLabel: "4 Guests",
    bedConfiguration: "2 Single Beds & 1 Double Bed",
    areaM2: 42,
    areaLabel: "Large Space",
    viewLabel: "Grounds View",
    seoTitle: "Family Room | Cumberland Motor Inn Cessnock",
    seoDescription:
      "Spacious Family Room at Cumberland Motor Inn featuring 2 single beds and 1 double bed, air conditioning, TV, microwave, and fridge.",
    intro: {
      eyebrow: "SPACIOUS FAMILY ACCOMMODATION",
      heading: "Plenty of room for the family.",
      paragraph1:
        "Bedding consists of 2 single beds and 1 double bed. This large air-conditioned room features a TV, microwave, refrigerator and tea and coffee making facilities.",
      paragraph2:
        "Perfect for families exploring the Hunter Valley, visiting local events, or enjoying a weekend retreat.",
      featureTiles: [
        { id: "ft-1", icon: "person", label: "4 Guests" },
        { id: "ft-2", icon: "bed", label: "2 Singles & 1 Double" },
        { id: "ft-3", icon: "area", label: "Large Room" },
        { id: "ft-4", icon: "patio", label: "Ground Floor" },
      ],
    },
    gallery: [
      {
        id: "gal-1",
        src: "/images/room-three.png",
        alt: "Family Room",
        caption: "Spacious Family Room",
      },
    ],
    amenities: defaultAmenities,
    highlights: [
      "2 Single Beds & 1 Double Bed",
      "Large room layout",
      "Air conditioning",
      "Microwave & refrigerator",
    ],
    stayInfo: defaultStayInfo,
    relatedRoomIds: ["deluxe-queen-room", "deluxe-twin-room", "business-single-room"],
  },
};

const PRIMARY_ROOM_SLUGS = [
  "deluxe-queen-room",
  "deluxe-twin-room",
  "family-room",
  "business-single-room",
];

export function getRoomBySlug(slug: string): RoomDetail | undefined {
  return roomsDataset[slug];
}

export function getAllRoomSlugs(): string[] {
  return PRIMARY_ROOM_SLUGS;
}

export function getAllRooms(): RoomDetail[] {
  return PRIMARY_ROOM_SLUGS.map((slug) => roomsDataset[slug]).filter(Boolean) as RoomDetail[];
}
