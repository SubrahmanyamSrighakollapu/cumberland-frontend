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
    "Whether you’re planning a Hunter Valley getaway, need more information or have a special request, we’d love to hear from you.",
  phone: siteData.contact.phone,
  fax: siteData.contact.fax,
  abn: siteData.contact.abn,
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
    "Cumberland Motor Inn is conveniently set in Cessnock, providing easy access to Hunter Valley wineries, dining, parks, state forests and local attractions.",
  mapImage: "/images/content-image-four.png",
  mapAlt: "Map showing Cumberland Motor Inn location at 57-61 Cumberland Street, Cessnock NSW",
  gettingHereCards: [
    {
      id: "driving",
      title: "Driving from Sydney",
      description:
        "Head north from Sydney and follow the signs to Newcastle. Exit the Freeway at the Cessnock / Hunter Valley Vineyards sign (approx. 1 hour or 100kms on freeway), then follow the signs to Cessnock. The old route to Cessnock through Freemans Waterhole is 30km shorter than using the new Hunter Expressway.",
      iconName: "car",
    },
    {
      id: "transit",
      title: "Car Parking",
      description: "Off street parking, no charge for motel guests.",
      iconName: "transit",
    },
    {
      id: "arrival",
      title: "Check-in & Reception",
      description:
        "Check-in from 2:00 PM till 9:00 PM. Check-out by 10:00 AM. Reception hours: 7am–9pm Mon–Fri, 8am–9pm Sat–Sun. ($20/hr fee applies for early/late check-in/out).",
      iconName: "arrival",
    },
  ] as GettingHereCard[],
  nearbyDestinations: [
    { id: "golf", label: "Cessnock Golf Course", duration: "5 mins", iconName: "town" },
    { id: "cpac", label: "Performing Arts Centre", duration: "Short walk", iconName: "town" },
    { id: "dining", label: "Cessnock Dining", duration: "2 mins", iconName: "dining" },
    { id: "wine", label: "Wine Country", duration: "10 mins", iconName: "wine" },
  ] as NearbyDestination[],
};

export const faqSectionData = {
  eyebrow: "FREQUENTLY ASKED QUESTIONS",
  heading: "Before you arrive.",
  description:
    "Find quick answers to our most common questions regarding check-in, parking, payment and directions.",
  balconyImage: "/images/gallery-two.png",
  balconyAlt: "Cumberland Motor Inn guest room view",
  assistanceCard: {
    title: "Have a question?",
    description:
      "Call our friendly team for assistance and local recommendations.",
    phone: siteData.contact.phone,
  },
  items: [
    {
      id: "faq-1",
      question: "What time is check-in and check-out?",
      answer:
        "Check-in is from 2:00 PM till 9:00 PM. Check-out is by 10:00 AM. Management reserves the right to apply a $20 per hour fee for early check-ins before 2pm, late check-ins after 9pm and late check-outs.",
    },
    {
      id: "faq-2",
      question: "Is parking available on-site?",
      answer:
        "Yes, off street parking is provided free of charge for all guests.",
    },
    {
      id: "faq-3",
      question: "What are your reception hours?",
      answer:
        "Reception is open 7:00 AM – 9:00 PM Monday to Friday, and 8:00 AM – 9:00 PM Saturday and Sunday.",
    },
    {
      id: "faq-4",
      question: "What is your cancellation policy?",
      answer:
        "NO REFUNDS AFTER BOOKINGS. All cancellations will incur a $20 administration fee. 24 hour cancellation period by 2pm. After that time no deposits will be refunded.",
    },
    {
      id: "faq-5",
      question: "Are there credit card surcharges?",
      answer:
        "There is a surcharge added for Amex and Diners Card payments.",
    },
  ] as FaqItem[],
};

export const contactCtaData = {
  heading: "Plan your stay in Cessnock.",
  description:
    "Enjoy comfortable accommodation with Hunter Valley Wine Country right on your doorstep.",
  exploreRoomsRoute: "/rooms",
  bookStayRoute: "/#availability",
};
