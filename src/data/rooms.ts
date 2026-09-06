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
      "Check-in from 2:00 PM\nCheck-out by 10:00 AM\nEarly check-in or late check-out may be available on request, subject to availability.",
    icon: "clock",
  },
  {
    id: "cancellation",
    title: "Cancellation policy",
    content:
      "Cancellation conditions depend on your selected rate. Please review the terms provided with your booking or contact our team.",
    icon: "shield",
  },
  {
    id: "children",
    title: "Children & extra beds",
    content:
      "Please contact our team to discuss suitable room arrangements and any extra-bed requirements.",
    icon: "users",
  },
  {
    id: "accessibility",
    title: "Accessibility",
    content:
      "Contact us before booking so we can help you choose a room that suits your access requirements.",
    icon: "accessibility",
  },
  {
    id: "pets",
    title: "Pets",
    content:
      "Please check with our team before bringing a pet, as room suitability and conditions may vary.",
    icon: "paw",
  },
  {
    id: "parking-info",
    title: "Parking",
    content:
      "Complimentary on-site parking is available for guests. Contact our team if you have specific vehicle requirements.",
    icon: "car",
  },
];

export const roomsDataset: Record<string, RoomDetail> = {
  "lakeview-queen-balcony": {
    id: "lakeview-queen-balcony",
    slug: "lakeview-queen-balcony",
    name: "Lakeview Queen Balcony",
    eyebrow: "ROOM COLLECTION",
    shortDescription:
      "Quiet comfort, private balcony, and a view worth waking up for.",
    price: 210,
    currency: "$",
    priceUnit: "/ night",
    capacityGuests: 2,
    guestsLabel: "2 Guests",
    bedConfiguration: "1 Queen Bed",
    areaM2: 32,
    areaLabel: "32 m²",
    viewLabel: "Lake View",
    balconyLabel: "Private Balcony",
    seoTitle: "Lakeview Queen Balcony | Cumberland Motor Inn",
    seoDescription:
      "Enjoy quiet coastal comfort, a private balcony, and serene lake views at Cumberland Motor Inn.",
    intro: {
      eyebrow: "THE LAKEVIEW EXPERIENCE",
      heading: "Room to slow down.",
      paragraph1:
        "Our Lakeview Queen Balcony room offers the perfect blend of comfort and coastal charm. Relax on your private balcony with peaceful water views, enjoy modern amenities, and unwind in a spacious, beautifully appointed space.",
      paragraph2:
        "Whether you’re here for a weekend escape or a longer stay, this room is designed to help you slow down and make the most of the stunning surroundings.",
      featureTiles: [
        { id: "ft-1", icon: "person", label: "2 Guests" },
        { id: "ft-2", icon: "bed", label: "1 Queen Bed" },
        { id: "ft-3", icon: "area", label: "32 m²" },
        { id: "ft-4", icon: "balcony", label: "Private Balcony" },
      ],
    },
    gallery: [
      {
        id: "gal-1",
        src: "/images/room-one.png",
        alt: "Lakeview Queen Balcony room interior with plush queen bed and view",
        caption: "Spacious and comfortable",
      },
      {
        id: "gal-2",
        src: "/images/room-two.png",
        alt: "Private balcony with outdoor chairs overlooking the water",
        caption: "Private balcony with lake views",
      },
      {
        id: "gal-3",
        src: "/images/room-three.png",
        alt: "Modern renovated bathroom with walk-in rainfall shower",
        caption: "Renovated ensuite bathroom",
      },
      {
        id: "gal-4",
        src: "/images/room-four.png",
        alt: "In-room coffee station with Nespresso machine",
        caption: "Nespresso tea and coffee facilities",
      },
      {
        id: "gal-5",
        src: "/images/room-five.png",
        alt: "Seating area with comfortable armchairs near balcony window",
        caption: "Relaxing indoor lounge corner",
      },
      {
        id: "gal-6",
        src: "/images/room-six.png",
        alt: "Bedroom vanity desk and ambient lighting",
        caption: "Work desk & Smart TV area",
      },
      {
        id: "gal-7",
        src: "/images/room-seven.png",
        alt: "Close-up of premium linen and soft pillows",
        caption: "Luxury linens and bedding",
      },
      {
        id: "gal-8",
        src: "/images/room-eight.png",
        alt: "Sunset view from room balcony",
        caption: "Golden hour balcony vista",
      },
    ],
    amenities: defaultAmenities,
    highlights: [
      "Fully renovated with modern coastal styling",
      "Private balcony with beautiful lake views",
      "Luxurious queen bed with premium linen",
      "Spacious and comfortable for couples",
    ],
    stayInfo: defaultStayInfo,
    relatedRoomIds: ["garden-king", "twin-courtyard", "family-suite"],
  },
  "garden-king": {
    id: "garden-king",
    slug: "garden-king",
    name: "Garden King",
    eyebrow: "ROOM COLLECTION",
    shortDescription:
      "Spacious comfort with garden views and a private patio.",
    price: 200,
    currency: "$",
    priceUnit: "/ night",
    capacityGuests: 2,
    guestsLabel: "2 Guests",
    bedConfiguration: "1 King Bed",
    areaM2: 35,
    areaLabel: "35 m²",
    viewLabel: "Garden View",
    balconyLabel: "Private Patio",
    seoTitle: "Garden King | Cumberland Motor Inn",
    seoDescription:
      "Relax in our Garden King room featuring a private patio, lush garden surroundings, and a king bed.",
    intro: {
      eyebrow: "LUSH GARDEN SETTING",
      heading: "Peaceful garden retreat.",
      paragraph1:
        "Surrounded by manicured coastal gardens, our Garden King room offers a tranquil setting with an outdoor patio area. Perfect for morning coffees or unhurried reading.",
      paragraph2:
        "Featuring a plush king-sized bed, premium amenities, and walk-in shower for a truly restful getaway.",
      featureTiles: [
        { id: "ft-1", icon: "person", label: "2 Guests" },
        { id: "ft-2", icon: "bed", label: "1 King Bed" },
        { id: "ft-3", icon: "area", label: "35 m²" },
        { id: "ft-4", icon: "patio", label: "Private Patio" },
      ],
    },
    gallery: [
      {
        id: "gal-1",
        src: "/images/room-two.png",
        alt: "Garden King bedroom with king bed",
        caption: "Spacious king bedroom",
      },
      {
        id: "gal-2",
        src: "/images/room-seven.png",
        alt: "Garden patio seating area",
        caption: "Shaded outdoor garden patio",
      },
      {
        id: "gal-3",
        src: "/images/room-three.png",
        alt: "Ensuite bathroom interior",
        caption: "Walk-in rainfall shower",
      },
      {
        id: "gal-4",
        src: "/images/room-four.png",
        alt: "Coffee and tea setup",
        caption: "In-room tea & coffee",
      },
      {
        id: "gal-5",
        src: "/images/room-nine.png",
        alt: "Garden surroundings view",
        caption: "Manicured coastal gardens",
      },
    ],
    amenities: defaultAmenities,
    highlights: [
      "Spacious layout with king bed",
      "Private outdoor garden patio",
      "Quiet ground-floor access",
      "Full modern amenities included",
    ],
    stayInfo: defaultStayInfo,
    relatedRoomIds: ["lakeview-queen-balcony", "twin-courtyard", "family-suite"],
  },
  "twin-courtyard": {
    id: "twin-courtyard",
    slug: "twin-courtyard",
    name: "Twin Courtyard",
    eyebrow: "ROOM COLLECTION",
    shortDescription:
      "Perfect for friends or families, with two comfortable beds.",
    price: 190,
    currency: "$",
    priceUnit: "/ night",
    capacityGuests: 4,
    guestsLabel: "4 Guests",
    bedConfiguration: "2 Queen Beds",
    areaM2: 38,
    areaLabel: "38 m²",
    viewLabel: "Courtyard View",
    seoTitle: "Twin Courtyard | Cumberland Motor Inn",
    seoDescription:
      "Ideal for friends and small families, our Twin Courtyard room features two queen beds and courtyard access.",
    intro: {
      eyebrow: "SHARED COMFORT",
      heading: "Ideal for groups & families.",
      paragraph1:
        "The Twin Courtyard room is designed for flexibility, offering two plush queen beds, generous room proportions, and direct access to our central outdoor courtyard.",
      paragraph2:
        "Enjoy modern entertainment options, crisp linens, and effortless access to the swimming pool area.",
      featureTiles: [
        { id: "ft-1", icon: "person", label: "4 Guests" },
        { id: "ft-2", icon: "bed", label: "2 Queen Beds" },
        { id: "ft-3", icon: "area", label: "38 m²" },
        { id: "ft-4", icon: "view", label: "Courtyard View" },
      ],
    },
    gallery: [
      {
        id: "gal-1",
        src: "/images/room-three.png",
        alt: "Twin Courtyard room with two queen beds",
        caption: "Two queen beds configuration",
      },
      {
        id: "gal-2",
        src: "/images/room-six.png",
        alt: "Courtyard view window",
        caption: "Sunny courtyard outlook",
      },
      {
        id: "gal-3",
        src: "/images/room-four.png",
        alt: "Bathroom vanity",
        caption: "Clean modern bathroom",
      },
      {
        id: "gal-4",
        src: "/images/room-five.png",
        alt: "Seating desk area",
        caption: "Desk & Smart TV setup",
      },
      {
        id: "gal-5",
        src: "/images/room-ten.png",
        alt: "Courtyard outdoor seating",
        caption: "Central courtyard access",
      },
    ],
    amenities: defaultAmenities,
    highlights: [
      "Two queen beds sleeping up to 4 guests",
      "Direct central courtyard access",
      "Proximity to motel pool & BBQ",
      "Complimentary Wi-Fi & parking",
    ],
    stayInfo: defaultStayInfo,
    relatedRoomIds: ["lakeview-queen-balcony", "garden-king", "family-suite"],
  },
  "family-suite": {
    id: "family-suite",
    slug: "family-suite",
    name: "Family Suite",
    eyebrow: "ROOM COLLECTION",
    shortDescription:
      "Extra space for special stays, with a separate living area.",
    price: 310,
    currency: "$",
    priceUnit: "/ night",
    capacityGuests: 5,
    guestsLabel: "5 Guests",
    bedConfiguration: "1 King + 2 Singles",
    areaM2: 52,
    areaLabel: "52 m²",
    viewLabel: "Ocean View",
    balconyLabel: "Private Balcony",
    seoTitle: "Family Suite | Cumberland Motor Inn",
    seoDescription:
      "Spacious Family Suite with separate living room, ocean views, master king bed, and kitchenette.",
    intro: {
      eyebrow: "SPACIOUS FAMILY LIVING",
      heading: "Room for the whole family.",
      paragraph1:
        "Our expansive Family Suite offers 52 square meters of premium living space. Features a separate master bedroom with a king bed, plus a second sleeping zone with two single beds.",
      paragraph2:
        "Includes a generous lounge area, kitchenette with microwave and fridge, private balcony, and ocean views.",
      featureTiles: [
        { id: "ft-1", icon: "person", label: "5 Guests" },
        { id: "ft-2", icon: "bed", label: "1 King + 2 Singles" },
        { id: "ft-3", icon: "area", label: "52 m²" },
        { id: "ft-4", icon: "balcony", label: "Private Balcony" },
      ],
    },
    gallery: [
      {
        id: "gal-1",
        src: "/images/room-four.png",
        alt: "Family Suite living room and balcony view",
        caption: "Separate living area with balcony",
      },
      {
        id: "gal-2",
        src: "/images/room-one.png",
        alt: "Master king bedroom suite",
        caption: "Master king bedroom",
      },
      {
        id: "gal-3",
        src: "/images/room-five.png",
        alt: "Second bedroom single beds",
        caption: "Second bedroom area",
      },
      {
        id: "gal-4",
        src: "/images/room-six.png",
        alt: "Kitchenette dining bar",
        caption: "Kitchenette & dining setup",
      },
      {
        id: "gal-5",
        src: "/images/room-eight.png",
        alt: "Large family bathroom",
        caption: "Family bathroom with tub & shower",
      },
      {
        id: "gal-6",
        src: "/images/room-ten.png",
        alt: "Balcony ocean view",
        caption: "Panoramic ocean balcony view",
      },
    ],
    amenities: defaultAmenities,
    highlights: [
      "52 m² with separate living & master bedroom",
      "Kitchenette with microwave, sink & fridge",
      "Private balcony with panoramic views",
      "Sleeps up to 5 guests comfortably",
    ],
    stayInfo: defaultStayInfo,
    relatedRoomIds: ["lakeview-queen-balcony", "garden-king", "twin-courtyard"],
  },
  "cove-king": {
    id: "cove-king",
    slug: "cove-king",
    name: "Cove King",
    eyebrow: "ROOM COLLECTION",
    shortDescription:
      "A spacious king room with modern comforts and a private balcony.",
    price: 210,
    currency: "$",
    priceUnit: "/ night",
    capacityGuests: 2,
    guestsLabel: "2 Guests",
    bedConfiguration: "1 King Bed",
    areaM2: 32,
    areaLabel: "32 m²",
    viewLabel: "Cove View",
    balconyLabel: "Private Balcony",
    seoTitle: "Cove King | Cumberland Motor Inn",
    seoDescription:
      "Relax in our Cove King room with private balcony, king bed, and modern coastal design.",
    intro: {
      eyebrow: "COASTAL ELEGANCE",
      heading: "Contemporary king comfort.",
      paragraph1:
        "The Cove King room offers elevated coastal living with crisp design, plush king bedding, and a quiet private balcony overlooking the inlet.",
      paragraph2:
        "Features a renovated walk-in rainfall shower, Smart TV, and dedicated work desk.",
      featureTiles: [
        { id: "ft-1", icon: "person", label: "2 Guests" },
        { id: "ft-2", icon: "bed", label: "1 King Bed" },
        { id: "ft-3", icon: "area", label: "32 m²" },
        { id: "ft-4", icon: "balcony", label: "Private Balcony" },
      ],
    },
    gallery: [
      {
        id: "gal-1",
        src: "/images/room-one.png",
        alt: "Cove King bedroom interior",
        caption: "Spacious Cove King interior",
      },
      {
        id: "gal-2",
        src: "/images/room-five.png",
        alt: "Balcony overlook",
        caption: "Private balcony with inlet view",
      },
      {
        id: "gal-3",
        src: "/images/room-seven.png",
        alt: "Renovated bathroom",
        caption: "Walk-in rainfall shower",
      },
      {
        id: "gal-4",
        src: "/images/room-eight.png",
        alt: "Smart TV and desk",
        caption: "Work desk & smart entertainment",
      },
    ],
    amenities: defaultAmenities,
    highlights: [
      "Plush king bed",
      "Private balcony with inlet views",
      "Renovated ensuite shower",
      "Complimentary Wi-Fi and parking",
    ],
    stayInfo: defaultStayInfo,
    relatedRoomIds: ["lakeview-queen-balcony", "ocean-twin", "family-suite"],
  },
  "ocean-twin": {
    id: "ocean-twin",
    slug: "ocean-twin",
    name: "Ocean Twin",
    eyebrow: "ROOM COLLECTION",
    shortDescription:
      "Perfect for friends or families, with two comfortable queen beds.",
    price: 230,
    currency: "$",
    priceUnit: "/ night",
    capacityGuests: 4,
    guestsLabel: "4 Guests",
    bedConfiguration: "2 Queen Beds",
    areaM2: 36,
    areaLabel: "36 m²",
    viewLabel: "Ocean View",
    balconyLabel: "Private Balcony",
    seoTitle: "Ocean Twin | Cumberland Motor Inn",
    seoDescription:
      "Stay in our Ocean Twin room featuring two queen beds, private balcony, and ocean views.",
    intro: {
      eyebrow: "OCEANFRONT COMFORT",
      heading: "Breathtaking ocean views.",
      paragraph1:
        "Wake up to the sound of rolling waves in our Ocean Twin room. Equipped with two queen beds, private balcony, and floor-to-ceiling glass doors.",
      paragraph2:
        "Accommodates up to 4 guests with full modern amenities and coastal styling.",
      featureTiles: [
        { id: "ft-1", icon: "person", label: "4 Guests" },
        { id: "ft-2", icon: "bed", label: "2 Queen Beds" },
        { id: "ft-3", icon: "area", label: "36 m²" },
        { id: "ft-4", icon: "balcony", label: "Private Balcony" },
      ],
    },
    gallery: [
      {
        id: "gal-1",
        src: "/images/room-two.png",
        alt: "Ocean Twin room with two queen beds",
        caption: "Two queen beds with ocean view",
      },
      {
        id: "gal-2",
        src: "/images/room-six.png",
        alt: "Balcony looking towards ocean",
        caption: "Oceanfront private balcony",
      },
      {
        id: "gal-3",
        src: "/images/room-nine.png",
        alt: "Bathroom vanity",
        caption: "Modern bathroom interior",
      },
      {
        id: "gal-4",
        src: "/images/room-ten.png",
        alt: "Seating corner",
        caption: "Lounge corner with tea & coffee",
      },
    ],
    amenities: defaultAmenities,
    highlights: [
      "Two queen beds sleeping 4 guests",
      "Private balcony with ocean views",
      "High-speed Wi-Fi & Smart TV",
      "Complimentary on-site parking",
    ],
    stayInfo: defaultStayInfo,
    relatedRoomIds: ["lakeview-queen-balcony", "cove-king", "family-suite"],
  },
};

export function getRoomBySlug(slug: string): RoomDetail | undefined {
  return roomsDataset[slug];
}

export function getAllRoomSlugs(): string[] {
  return Object.keys(roomsDataset);
}

export function getAllRooms(): RoomDetail[] {
  return Object.values(roomsDataset);
}
