"use client";

import { AdminContentPage } from "@/components/admin/AdminModuleConfigs";

export default function AboutDashboardPage() {
  return (
    <AdminContentPage
      iconName="about"
      accentColor="#80563E"
      title="About Page"
      description="Craft your motel's story, stats, why-choose-us pillars, featured testimonial and final CTA for the About page."
      blocks={[
        {
          label: "Page Hero",
          hint: "Top banner with intro and image.",
          fields: ["Eyebrow", "Heading", "Summary Paragraph"],
        },
        {
          label: "Our Story",
          hint: "Full-length brand story with optional dual images.",
          fields: ["Heading", "Paragraph 1", "Paragraph 2"],
        },
        {
          label: "Stats Strip",
          hint: "4 featured metrics (guests, years, rooms, reviews etc).",
          fields: ["Stat 1", "Stat 2", "Stat 3", "Stat 4"],
          value: "4 stats configured",
        },
        {
          label: "Why Choose Us",
          hint: "4 pillar cards — title + description + icon.",
          fields: ["Pillar 1", "Pillar 2", "Pillar 3", "Pillar 4"],
          value: "4 pillars configured",
        },
        {
          label: "Cumberland Experience",
          hint: "Central section with 3 value props (stay, relax, explore).",
          fields: ["Heading", "Intro", "Props"],
          value: "3 props",
        },
        {
          label: "Featured Testimonial",
          hint: "Highlighted single guest review quote.",
          fields: ["Guest Name", "Guest Location", "Rating", "Quote"],
        },
      ]}
    />
  );
}
