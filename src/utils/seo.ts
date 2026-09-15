import type { Metadata } from "next";

export const SITE_ORIGIN = "https://www.cumberlandmotorinn.com.au";
export const SITE_NAME = "Cumberland Motor Inn";

export interface PageSeoContent {
  title: string;
  description: string;
  targetPhrases?: string[]; // Internal editorial planning data, not emitted to meta keywords
  canonical: string;
  socialImage?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  noIndex?: boolean;
}

export function buildRouteMetadata(seo: PageSeoContent): Metadata {
  const canonicalUrl = seo.canonical.startsWith("http")
    ? seo.canonical
    : `${SITE_ORIGIN}${seo.canonical.startsWith("/") ? seo.canonical : "/" + seo.canonical}`;

  const defaultImageUrl = `${SITE_ORIGIN}/images/cumberland-main-exterior-day.jpg`;
  const defaultImageAlt = "Cumberland Motor Inn entrance and exterior in Cessnock";

  const imageUrl = seo.socialImage?.url
    ? seo.socialImage.url.startsWith("http")
      ? seo.socialImage.url
      : `${SITE_ORIGIN}${seo.socialImage.url.startsWith("/") ? seo.socialImage.url : "/" + seo.socialImage.url}`
    : defaultImageUrl;

  const imageAlt = seo.socialImage?.alt || defaultImageAlt;

  const openGraphImages = [
    {
      url: imageUrl,
      alt: imageAlt,
      ...(seo.socialImage?.width && { width: seo.socialImage.width }),
      ...(seo.socialImage?.height && { height: seo.socialImage.height }),
    },
  ];

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: seo.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          "max-image-preview": "large",
        },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: "en_AU",
      type: "website",
      images: openGraphImages,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [imageUrl],
    },
  };
}
