import { siteData } from "./site";

export interface ContactCard {
  id: string;
  title: string;
  value: string;
  iconName: "phone" | "envelope" | "pin" | "clock";
  actionHref?: string;
}

export interface GettingHereCard {
  id: string;
  title: string;
  description: string;
  iconName: "car" | "transit" | "arrival";
}

export interface NearbyDestination {
  id: string;
  label: string;
  duration: string;
  iconName: "beach" | "town" | "dining" | "wine";
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const contactHeroData = {
  breadcrumbHome: "Home",
  breadcrumbCurrent: "Contact",
  eyebrow: "GET IN TOUCH",
  headingLines: ["We’re here to help", "plan your stay."],
  description:
    "Have a question, special request or need local advice? Our friendly team is ready to help make your Cumberland Motor Inn experience memorable.",
  image: "/images/content-image-two.png",
  alt: "Cumberland Motor Inn entrance and reception at warm sunset",
};

export const contactInfoData = {
  eyebrow: "CONTACT DETAILS",
  heading: "Let’s start a conversation.",
  subtitle:
    "Whether you’re planning a coastal escape, need more information or have a special request, we’d love to hear from you.",
  phone: siteData.contact.phone,
  email: siteData.contact.email,
  address: siteData.contact.address,
  receptionHours: siteData.contact.receptionHours,
  cards: [
    {
      id: "call",
      title: "Call Us",
      value: siteData.contact.phone,
      iconName: "phone",
      actionHref: siteData.contact.phoneRaw,
    },
    {
      id: "email",
      title: "Email Us",
      value: siteData.contact.email,
      iconName: "envelope",
      actionHref: `mailto:${siteData.contact.email}`,
    },
    {
      id: "visit",
      title: "Visit Us",
      value: siteData.contact.shortAddress,
      iconName: "pin",
    },
    {
      id: "hours",
      title: "Reception Hours",
      value: siteData.contact.receptionHours,
      iconName: "clock",
    },
  ] as ContactCard[],
  responseTimeNote: "We usually respond within one business day.",
};

export const locationSectionData = {
  eyebrow: "LOCATION & GETTING HERE",
  heading: "Easy to find. Close to everything.",
  description:
    "Cumberland Motor Inn is perfectly positioned to help you explore the best of our coastal region, from pristine beaches to local wineries and charming towns.",
  mapImage: "/images/content-image-four.png",
  mapAlt: "Map illustration showing Cumberland Motor Inn location in Bayside",
  gettingHereCards: [
    {
      id: "driving",
      title: "Driving & Parking",
      description:
        "Easy access via the coastal highway with complimentary on-site parking for all guests.",
      iconName: "car",
    },
    {
      id: "transit",
      title: "Public Transport",
      description:
        "Bayside Station is a 6 minute drive, with regular bus services to the motel.",
      iconName: "transit",
    },
    {
      id: "arrival",
      title: "Check-in & Arrival",
      description:
        "Check-in from 2:00 PM. Our friendly reception team is here daily from 7:00 AM – 9:00 PM.",
      iconName: "arrival",
    },
  ] as GettingHereCard[],
  nearbyDestinations: [
    { id: "beach", label: "Beach", duration: "2 mins", iconName: "beach" },
    { id: "town", label: "Town Centre", duration: "6 mins", iconName: "town" },
    { id: "dining", label: "Dining", duration: "5 mins", iconName: "dining" },
    { id: "wine", label: "Wine Region", duration: "25 mins", iconName: "wine" },
  ] as NearbyDestination[],
};

export const faqSectionData = {
  eyebrow: "FREQUENTLY ASKED QUESTIONS",
  heading: "Before you arrive.",
  description:
    "Find quick answers to our most common questions. Can’t find what you’re looking for? Get in touch and we’ll be happy to help.",
  balconyImage: "/images/gallery-two.png",
  balconyAlt: "Private guest room balcony overlooking sunset ocean views",
  assistanceCard: {
    title: "Still deciding?",
    description:
      "Call our friendly team for personalised advice and local recommendations.",
    phone: siteData.contact.phone,
  },
  items: [
    {
      id: "faq-1",
      question: "What time is check-in and check-out?",
      answer:
        "Check-in starts from 2:00 PM. Please contact reception to confirm check-out times or discuss an early arrival or late departure.",
    },
    {
      id: "faq-2",
      question: "Is parking available?",
      answer:
        "Complimentary on-site parking is available for guests. Contact our team if you have specific vehicle or access requirements.",
    },
    {
      id: "faq-3",
      question: "Do you offer EV charging?",
      answer:
        "EV charging is available on site. Please contact reception before arrival to confirm access and availability.",
    },
    {
      id: "faq-4",
      question: "Can I request an accessible room?",
      answer:
        "Please contact our team before booking so we can discuss your access requirements and suitable room options.",
    },
    {
      id: "faq-5",
      question: "How do I change or cancel a booking?",
      answer:
        "Please contact the provider you booked through or speak with our team. Changes and cancellations depend on the terms of your reservation.",
    },
  ] as FaqItem[],
};

export const contactCtaData = {
  heading: "Ready to book your stay?",
  description:
    "Your coastal escape is just a few clicks away. Relaxing days, beautiful surroundings and unforgettable memories are waiting.",
  exploreRoomsRoute: "/rooms",
  bookStayRoute: "/#availability",
};
