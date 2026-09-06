"use client";

import { AdminContentPage } from "@/components/admin/AdminModuleConfigs";

export default function ContactDashboardPage() {
  return (
    <AdminContentPage
      iconName="contact"
      accentColor="#0ea5e9"
      title="Contact Page"
      description="Manage contact details, inquiry cards, how-to-get-here directions, nearby destinations, and review incoming inquiries."
      blocks={[
        {
          label: "Hero Section",
          hint: "Page header and intro copy.",
          fields: ["Eyebrow", "Heading", "Subheading"],
        },
        {
          label: "Contact Details Cards",
          hint: "4 detail cards: phone, email, address, reception.",
          fields: ["Phone card", "Email card", "Address card", "Hours card"],
          value: "4 cards configured",
        },
        {
          label: "Inquiry Form",
          hint: "Subject options and where submissions are stored.",
          fields: ["Subject list", "Recipient email", "Auto-reply"],
          value: "5 subjects, 1 recipient",
        },
        {
          label: "Location Section",
          hint: "Google Maps, map image, link directions.",
          fields: ["Map embed URL", "Latitude", "Longitude", "Directions CTA"],
        },
        {
          label: "Getting Here",
          hint: "3 travel method cards (drive, train, air).",
          fields: ["By Car", "By Train", "By Air"],
          value: "3 methods",
        },
        {
          label: "Nearby Destinations",
          hint: "4 nearby highlights with distance + time.",
          fields: ["Sydney", "Canberra", "Melbourne", "Hobart"],
          value: "4 destinations configured",
        },
      ]}
    />
  );
}
