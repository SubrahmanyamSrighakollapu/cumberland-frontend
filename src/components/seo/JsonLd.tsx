import { SITE_ORIGIN, SITE_NAME } from "@/utils/seo";
import { siteData } from "@/data/site";
import { RoomDetail } from "@/data/rooms";

export function MotelLocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Motel",
        "@id": `${SITE_ORIGIN}/#organization`,
        "name": SITE_NAME,
        "url": SITE_ORIGIN,
        "telephone": "+61 2 4990 6633",
        "email": siteData.contact.email,
        "logo": `${SITE_ORIGIN}/images/cumberland-logo.png`,
        "image": `${SITE_ORIGIN}/images/cumberland-main-exterior-day.jpg`,
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "57–61 Cumberland Street",
          "addressLocality": "Cessnock",
          "addressRegion": "NSW",
          "postalCode": "2325",
          "addressCountry": "AU"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -32.8388263,
          "longitude": 151.3563899
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "07:00",
            "closes": "21:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Saturday", "Sunday"],
            "opens": "08:00",
            "closes": "21:00"
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        "name": SITE_NAME,
        "url": `${SITE_ORIGIN}/`,
        "publisher": {
          "@id": `${SITE_ORIGIN}/#organization`
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${SITE_ORIGIN}${item.url}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function RoomAccommodationJsonLd({ room }: { room: RoomDetail }) {
  const mainImage =
    room.gallery && room.gallery.length > 0
      ? room.gallery[0].src.startsWith("http")
        ? room.gallery[0].src
        : `${SITE_ORIGIN}${room.gallery[0].src}`
      : `${SITE_ORIGIN}/images/cumberland-main-exterior-day.jpg`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    "name": room.name,
    "description": room.seoDescription || room.shortDescription,
    "occupancy": {
      "@type": "QuantitativeValue",
      "maxValue": room.capacityGuests
    },
    "bed": {
      "@type": "BedDetails",
      "description": room.bedConfiguration
    },
    "image": mainImage,
    "containedInPlace": {
      "@id": `${SITE_ORIGIN}/#organization`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
