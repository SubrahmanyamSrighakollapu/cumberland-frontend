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
    description: "Relax, refresh and unwind.",
    iconName: "pool",
  },
  parking: {
    id: "parking",
    title: "Free Parking",
    description: "Convenient on-site parking.",
    iconName: "parking",
  },
  wifi: {
    id: "wifi",
    title: "Free WiFi",
    description: "Stay connected throughout your stay.",
    iconName: "wifi",
  },
  ev: {
    id: "ev",
    title: "Non-Smoking Rooms",
    description: "Fresh and comfortable spaces.",
    iconName: "ev",
  },
  kitchen: {
    id: "kitchen",
    title: "Accessible Facilities",
    description: "Designed with accessibility in mind.",
    iconName: "kitchen",
  },
  bbq: {
    id: "bbq",
    title: "Family Rooms",
    description: "Comfortable stays for the whole family.",
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
