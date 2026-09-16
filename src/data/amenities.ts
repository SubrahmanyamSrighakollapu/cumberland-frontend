export interface Amenity {
  id: string;
  title: string;
  description: string;
  iconName: "pool" | "parking" | "wifi" | "ev" | "kitchen" | "bbq";
}

export const amenitiesDataset: Record<string, Amenity> = {
  pool: {
    id: "pool",
    title: "Outdoor Swimming Pool",
    description: "Relax and refresh in our outdoor salt-water pool, included for all motel guests.",
    iconName: "pool",
  },
  parking: {
    id: "parking",
    title: "Free On-Site Parking",
    description: "Complimentary off-street parking within the motel right outside your room.",
    iconName: "parking",
  },
  wifi: {
    id: "wifi",
    title: "Free High-Speed Wi-Fi",
    description: "Stay connected with complimentary wireless internet throughout the property.",
    iconName: "wifi",
  },
  ev: {
    id: "ev",
    title: "Non-Smoking Rooms",
    description: "100% smoke-free guest rooms for a clean, fresh environment.",
    iconName: "ev",
  },
  kitchen: {
    id: "kitchen",
    title: "Accessible Facilities",
    description: "Ground-floor access and accessible features for guest convenience.",
    iconName: "kitchen",
  },
  bbq: {
    id: "bbq",
    title: "Covered Outdoor BBQ",
    description: "Undercover brick arch BBQ lounge and outdoor dining area for self-catering meals.",
    iconName: "bbq",
  },
};

export const amenitiesList: Amenity[] = [
  amenitiesDataset.pool,
  amenitiesDataset.parking,
  amenitiesDataset.wifi,
  amenitiesDataset.ev,
  amenitiesDataset.kitchen,
  amenitiesDataset.bbq,
];

export function getAmenityById(id: string): Amenity | undefined {
  return amenitiesDataset[id];
}
