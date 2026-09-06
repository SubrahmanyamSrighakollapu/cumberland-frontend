export interface SiteContactInfo {
  phone: string;
  phoneRaw: string;
  email: string;
  address: string;
  shortAddress: string;
  receptionHours: string;
}

export interface SiteSocialLink {
  id: string;
  platform: "instagram" | "facebook" | "youtube";
  url: string;
  ariaLabel: string;
}

export interface SiteLegalLink {
  id: string;
  label: string;
  href: string;
}

export interface SiteData {
  name: string;
  tagline: string;
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  contact: SiteContactInfo;
  socialLinks: SiteSocialLink[];
  legalLinks: SiteLegalLink[];
  copyrightText: string;
}

export const siteData: SiteData = {
  name: "Cumberland Motor Inn",
  tagline: "Coastal stays. Brighter days.",
  logo: {
    src: "/images/cumberland-logo.png",
    alt: "Cumberland Motor Inn Logo",
    width: 260,
    height: 70,
  },
  contact: {
    phone: "+00 1234 5678",
    phoneRaw: "tel:+0012345678",
    email: "stay@cumberland.example",
    address: "128 Oceanview Drive, Bayside, NSW 2556",
    shortAddress: "128 Oceanview Drive, Bayside",
    receptionHours: "7:00 AM – 9:00 PM daily",
  },
  socialLinks: [
    {
      id: "instagram",
      platform: "instagram",
      url: "https://instagram.com",
      ariaLabel: "Visit Cumberland Motor Inn on Instagram",
    },
    {
      id: "facebook",
      platform: "facebook",
      url: "https://facebook.com",
      ariaLabel: "Visit Cumberland Motor Inn on Facebook",
    },
    {
      id: "youtube",
      platform: "youtube",
      url: "https://youtube.com",
      ariaLabel: "Visit Cumberland Motor Inn on YouTube",
    },
  ],
  legalLinks: [
    { id: "privacy", label: "Privacy Policy", href: "/privacy-policy" },
    { id: "terms", label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
  copyrightText: "Cumberland Motor Inn © 2026",
};
