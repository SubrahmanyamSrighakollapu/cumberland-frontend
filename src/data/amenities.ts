export interface Amenity {
  id: string;
  title: string;
  description: string;
  iconName: "pool" | "parking" | "wifi" | "ev" | "kitchen" | "bbq";
}

export const amenitiesDataset: Record<string, Amenity> = {
  pool: {
    id: "pool",
    title: "Heated Pool",
    description: "Swim year-round with ocean views.",
    iconName: "pool",
  },
  parking: {
    id: "parking",
    title: "Free Parking",
    description: "On-site and hassle-free.",
    iconName: "parking",
  },
  wifi: {
    id: "wifi",
    title: "Complimentary Wi-Fi",
    description: "Stay connected throughout your stay.",
    iconName: "wifi",
  },
  ev: {
    id: "ev",
    title: "EV Charging",
    description: "Charge up and explore further.",
    iconName: "ev",
  },
  kitchen: {
    id: "kitchen",
    title: "Kitchenette Rooms",
    description: "Make it your own with in-room kitchenettes.",
    iconName: "kitchen",
  },
  bbq: {
    id: "bbq",
    title: "BBQ & Outdoor Area",
    description: "Good food tastes better by the water.",
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
