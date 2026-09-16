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
    "Have a question, special request, meeting room enquiry or need local advice? Our friendly team is ready to help make your Cumberland Motor Inn experience memorable.",
  image: "/images/cumberland-grounds-skyline-view.jpg",
  alt: "Cumberland Motor Inn grounds and outdoor pool beneath blue sky",
};

export const contactInfoData = {
  eyebrow: "CONTACT DETAILS",
  heading: "Let’s start a conversation.",
  subtitle:
    "Whether you’re planning a Hunter Valley getaway, inquiring about meeting room hire or group accommodation, we’d love to hear from you.",
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
  mapImage: "/images/cumberland-reception-exit-driveway.jpg",
  mapAlt: "Cumberland Motor Inn reception entrance and driveway at 57-61 Cumberland Street, Cessnock NSW",
  gettingHereCards: [
    {
      id: "driving",
      title: "Driving from Sydney",
      description:
        "Head north from Sydney and follow the signs to Newcastle. Exit the Freeway at the Cessnock / Hunter Valley Vineyards sign (approx. 1 hour or 100kms on freeway), then follow the signs to Cessnock. The route to Cessnock through Freemans Waterhole is 30km shorter than using the Hunter Expressway.",
      iconName: "car",
    },
    {
      id: "transit",
      title: "Car Parking",
      description: "Off-street car parking is provided free of charge for motel guests.",
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
    "Find quick answers to common questions regarding location, room options, facilities, parking, payment and policies.",
  balconyImage: "/images/cumberland-pylon-sign-night.jpg",
  balconyAlt: "Illuminated Cumberland Motor Inn pylon sign at night",
  assistanceCard: {
    title: "Have a question?",
    description:
      "Call our friendly team for assistance and local recommendations.",
    phone: siteData.contact.phone,
  },
  items: [
    {
      id: "faq-location",
      question: "Where is Cumberland Motor Inn located?",
      answer:
        "Cumberland Motor Inn is located at 57–61 Cumberland Street, Cessnock NSW 2325. We are situated in central Cessnock, close to shops, dining, and Pokolbin cellar doors in the Hunter Valley.",
    },
    {
      id: "faq-choosing",
      question: "What should I consider when choosing a motel in Cessnock?",
      answer:
        "Key factors include free on-site parking, air-conditioned rooms, essential facilities like Wi-Fi and an outdoor pool, and a central location that connects easily to town amenities and regional attractions.",
    },
    {
      id: "faq-rooms",
      question: "Which room types accommodate my travelling group?",
      answer:
        "We offer four main room options: Deluxe Queen (sleeps 2), Deluxe Twin (1 Double & 1 Single bed, sleeps 3), Family Room (1 Double & 2 Single beds, sleeps 4), and Business Single (1 Double bed, solo travellers).",
    },
    {
      id: "faq-parking",
      question: "Is parking available on-site, and is it included?",
      answer:
        "Yes, off-street parking within the motel grounds is provided free of charge for all registered guests.",
    },
    {
      id: "faq-facilities",
      question: "Which facilities are included with my room?",
      answer:
        "All rooms include climate-control air conditioning, TV, microwave, mini refrigerator, tea and coffee making facilities, free Wi-Fi, and access to our outdoor salt-water pool and covered BBQ area.",
    },
    {
      id: "faq-rates",
      question: "How can I check current room rates and availability?",
      answer:
        "You can check real-time room availability and rates directly through our online booking engine or by phoning reception at (02) 4990 6633.",
    },
    {
      id: "faq-base",
      question: "Can I use Cumberland as a base for exploring the Hunter Valley?",
      answer:
        "Yes, Cumberland Motor Inn is a convenient base for exploring Hunter Valley wineries, Cessnock Golf Course, state forests, and regional attractions.",
    },
    {
      id: "faq-1",
      question: "What time is check-in and check-out?",
      answer:
        "Check-in is from 2:00 PM till 9:00 PM. Check-out is by 10:00 AM. Management reserves the right to apply a $20 per hour fee for early check-ins before 2pm, late check-ins after 9pm and late check-outs.",
    },
    {
      id: "faq-3",
      question: "What are your reception hours?",
      answer:
        "Reception is open 7:00 AM – 9:00 PM Monday to Friday, and 8:00 AM – 9:00 PM Saturday and Sunday.",
    },
    {
      id: "faq-4",
      question: "Do you offer a meeting room for corporate events or conferences?",
      answer:
        "Yes, Cumberland Motor Inn offers an equipped meeting and function room that caters for up to 50 people, with accommodation available at the same venue. Contact our reception team at (02) 4990 6633 or relax@cumberlandmotorinn.com.au for rates and availability.",
    },
    {
      id: "faq-5",
      question: "Can I book group accommodation?",
      answer:
        "Yes, we welcome group accommodation inquiries for corporate trips, family gatherings, or events in Cessnock. Please phone reception directly for group room availability and options.",
    },
    {
      id: "faq-6",
      question: "What is your cancellation policy?",
      answer:
        "NO REFUNDS AFTER BOOKINGS. All cancellations will incur a $20 administration fee. 24 hour cancellation period by 2pm. After that time no deposits will be refunded.",
    },
    {
      id: "faq-7",
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
