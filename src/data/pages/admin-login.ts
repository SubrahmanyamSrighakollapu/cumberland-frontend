export interface AdminLoginBrandData {
  eyebrow: string;
  titleLines: string[];
  description: string;
  footerTag: string;
  heroImage: {
    src: string;
    alt: string;
  };
  logoImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

export const adminLoginBrandData: AdminLoginBrandData = {
  eyebrow: "WEBSITE CONTENT MANAGEMENT",
  titleLines: [
    "Keep every guest-facing",
    "detail beautifully up to date.",
  ],
  description:
    "Manage rooms, experiences, galleries and website content from one secure workspace.",
  footerTag: "Cumberland Motor Inn · CMS Portal",
  heroImage: {
    src: "/images/hero-one.png",
    alt: "Cumberland Motor Inn exterior at sunset",
  },
  logoImage: {
    src: "/images/cumberland-logo.png",
    alt: "Cumberland Motor Inn Logo",
    width: 260,
    height: 70,
  },
};
