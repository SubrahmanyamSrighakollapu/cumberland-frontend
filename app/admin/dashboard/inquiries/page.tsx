"use client";

import { AdminContentPage } from "@/components/admin/AdminModuleConfigs";

export default function InquiriesDashboardPage() {
  return (
    <AdminContentPage
      iconName="inquiries"
      accentColor="#52c92d"
      title="Contact Inquiries"
      description="View and manage every guest inquiry. Mark items as read, replied, or archived."
      blocks={[
        { label: "New Inquiries", hint: "Unread messages submitted today.", fields: ["Inbox count"], value: "0 new" },
        { label: "This Week", hint: "Last 7 days submissions.", fields: ["Count", "Avg response time"], value: "0 inquiries" },
        { label: "All Submissions", hint: "Tabular view of every inquiry received.", fields: ["Table: name, email, subject, message, status, date"] },
        { label: "Subject Filters", hint: "Filter by: General, Booking, Wedding event, Corporate group, Other.", fields: ["Filters"], value: "5 subjects" },
        { label: "Bulk Actions", hint: "Mark as read, mark as replied, archive, export CSV.", fields: ["Actions"] },
        { label: "Email Templates", hint: "Auto-reply to guests after form submission.", fields: ["Sender name", "Subject", "Body"] },
      ]}
    />
  );
}
