export interface SiteContactInfo {
  phone: string;
  phoneRaw: string;
  fax?: string;
  faxRaw?: string;
  abn?: string;
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
  tagline: "Your comfortable base for exploring Cessnock and the Hunter Valley.",
  logo: {
    src: "/images/cumberland-logo.png",
    alt: "Cumberland Motor Inn Logo",
    width: 260,
    height: 70,
  },
  contact: {
    phone: "(02) 4990 6633",
    phoneRaw: "tel:0249906633",
    fax: "(02) 4991 1619",
    faxRaw: "fax:0249911619",
    abn: "35 036 835 326",
    email: "relax@cumberlandmotorinn.com.au",
    address: "57–61 Cumberland Street, Cessnock, NSW 2325, Australia",
    shortAddress: "57–61 Cumberland Street, Cessnock, NSW 2325",
    receptionHours: "7:00 AM – 9:00 PM Mon–Fri | 8:00 AM – 9:00 PM Sat–Sun",
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
