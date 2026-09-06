"use client";

import { AdminContentPage } from "@/components/admin/AdminModuleConfigs";

export default function SettingsDashboardPage() {
  return (
    <AdminContentPage
      iconName="settings"
      accentColor="#6366f1"
      title="Site Settings"
      description="Global configuration for the motel brand — logo, contact info, socials, legal links and copyright."
      blocks={[
        {
          label: "Brand & Identity",
          hint: "Site-wide title, tagline, logo file.",
          fields: ["Site name", "Tagline", "Logo image", "Logo width / height"],
          value: "Cumberland Motor Inn",
        },
        {
          label: "Primary Contact",
          hint: "Phone, email, address — used in footer, header, contact page.",
          fields: ["Phone", "Email", "Physical address", "Short address", "Reception hours"],
        },
        {
          label: "Social Media",
          hint: "Links shown in header/footer.",
          fields: ["Instagram", "Facebook", "YouTube"],
          value: "3 socials configured",
        },
        {
          label: "Legal Pages",
          hint: "Links in footer.",
          fields: ["Privacy Policy URL", "Terms & Conditions URL", "Copyright text"],
        },
        {
          label: "CMS Account",
          hint: "Change your login password and details.",
          fields: ["Display Name", "Email address", "Password"],
        },
        {
          label: "System Info",
          hint: "Read-only deployment details.",
          fields: ["Frontend", "Backend API", "MySQL status", "Environment"],
          value: "Next.js · Express · MySQL · Dev",
        },
      ]}
    />
  );
}
