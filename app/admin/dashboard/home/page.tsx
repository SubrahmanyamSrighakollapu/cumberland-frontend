"use client";

import { AdminContentPage } from "@/components/admin/AdminModuleConfigs";

export default function HomeDashboardPage() {
  return (
    <AdminContentPage
      iconName="home"
      accentColor="#52c92d"
      title="Home Page"
      description="Control the content that guests see first — hero banner, welcome message, featured rooms, amenities highlights, experiences links and final call-to-action."
      blocks={[
        {
          label: "Hero Banner",
          hint: "Landing hero text, eyebrow, carousel images.",
          fields: ["Eyebrow", "Heading", "Subheading", "Primary CTA", "Secondary CTA"],
          value: "Coastal stays. Brighter days.",
        },
        {
          label: "Welcome Section",
          hint: "Intro block with headline and dual paragraphs.",
          fields: ["Eyebrow", "Heading", "Paragraph 1", "Paragraph 2", "Signature / Author"],
        },
        {
          label: "Featured Rooms",
          hint: "Which 3 rooms show on the homepage. Also controls cards display.",
          fields: ["Featured Room 1", "Featured Room 2", "Featured Room 3", "CTA Text"],
          value: "Lakeview Queen Balcony, Garden King, Family Suite",
        },
        {
          label: "Amenities Block",
          hint: "6 amenities displayed on the home grid.",
          fields: ["Selected Amenities", "Heading", "Intro Text"],
          value: "6 amenities selected",
        },
        {
          label: "Experiences List",
          hint: "3 experience preview cards linking to sub-pages.",
          fields: ["Wine Country card", "Eat & Drink card", "Things to Do card"],
          value: "3 cards configured",
        },
        {
          label: "Reviews Section",
          hint: "Featured 4 guest testimonials + Google reviews bar.",
          fields: ["Heading", "Eyebrow", "Review count", "Google link"],
        },
      ]}
    />
  );
}
