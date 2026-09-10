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
    balconyLabel: "Ground Floor",
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
      {
        id: "gal-2",
        src: "/images/room-three.png",
        alt: "Clean ensuite bathroom in Deluxe Queen Room",
        caption: "Ensuite Bathroom",
      },
      {
        id: "gal-3",
        src: "/images/room-four.png",
        alt: "In-room microwave refrigerator tea coffee setup",
        caption: "Tea & Coffee Facilities",
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
        { id: "ft-4", icon: "view", label: "Grounds View" },
      ],
    },
    gallery: [
      {
        id: "gal-1",
        src: "/images/room-two.png",
        alt: "Deluxe Twin Room with single bed and double bed",
        caption: "Deluxe Twin Room Bedding",
      },
      {
        id: "gal-2",
        src: "/images/room-six.png",
        alt: "TV and microwave area in Deluxe Twin Room",
        caption: "Room Amenities",
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
        { id: "ft-4", icon: "patio", label: "Spacious Layout" },
      ],
    },
    gallery: [
      {
        id: "gal-1",
        src: "/images/room-three.png",
        alt: "Family Room at Cumberland Motor Inn",
        caption: "Spacious Family Room Layout",
      },
      {
        id: "gal-2",
        src: "/images/room-four.png",
        alt: "Family Room amenities and microwave",
        caption: "Kitchenette Facilities",
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
      "This single room features a toaster, microwave and seating area.",
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
      eyebrow: "SOLO & BUSINESS TRAVEL",
      heading: "Practical comfort for work or solo stays.",
      paragraph1:
        "Bedding consists of 1 double bed. This single room features a toaster, microwave and seating area.",
      paragraph2:
        "Designed for business travelers and solo visitors seeking a convenient, quiet stay in Cessnock.",
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
        src: "/images/room-one.png",
        alt: "Business Single Room interior with double bed",
        caption: "Business Single Room",
      },
      {
        id: "gal-2",
        src: "/images/room-five.png",
        alt: "Seating area and toaster in Business Single Room",
        caption: "Seating & Microwave Corner",
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
