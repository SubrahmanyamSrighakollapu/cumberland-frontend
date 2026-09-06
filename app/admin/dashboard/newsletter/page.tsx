"use client";

import { AdminContentPage } from "@/components/admin/AdminModuleConfigs";

export default function NewsletterDashboardPage() {
  return (
    <AdminContentPage
      iconName="newsletter"
      accentColor="#f43f5e"
      title="Newsletter Subscribers"
      description="Keep track of subscribers from the footer newsletter form. Export lists and manage active status."
      blocks={[
        { label: "Total Subscribers", hint: "All emails captured.", fields: ["Count", "Active subscribers"], value: "0 subscribers" },
        { label: "Recent Sign-ups", hint: "Latest emails joined in last 30 days.", fields: ["New this month"] },
        { label: "Subscriber List", hint: "Email, subscribed at, active status.", fields: ["Table: Email, Subscribed date", "Active toggle"] },
        { label: "Export List", hint: "Download CSV for Mailchimp / Campaign Monitor.", fields: ["CSV", "JSON"] },
        { label: "Form Text", hint: "Footer newsletter box copy.", fields: ["Heading", "Placeholder", "CTA button", "Privacy text"] },
        { label: "Double Opt-in", hint: "Settings list only. Feature planned.", fields: ["Status"] },
      ]}
    />
  );
}
