"use client";

import React from "react";
import Image from "next/image";
import AdminModulePage, { ModuleConfig } from "./AdminModulePage";
import { getAllRooms } from "@/data/rooms";
import { galleryItems } from "@/data/gallery-media";
import { amenitiesList } from "@/data/amenities";
import { guestReviews, testimonialsDataset } from "@/data/testimonials";
import { wineryList } from "@/data/wine-country";
import { diningVenues } from "@/data/eat-and-drink";
import { activityList } from "@/data/things-to-do";
import { faqSectionData } from "@/data/contact";

// ============== ROOMS ==============
export function AdminRoomsPage() {
  const rooms = getAllRooms();
  const rows = rooms.map((r: any) => ({
    id: r.id,
    name: r.name,
    slug: r.slug,
    guests: r.guestsLabel,
    price: `${r.currency}${r.price}${r.priceUnit}`,
    view: r.viewLabel || "—",
    status: r.is_published === false ? "Draft" : "Published",
    featured: r.is_featured || (r.name.includes("Cove") || r.name.includes("Ocean") || r.name.includes("Family")),
    image: r.gallery[0]?.src,
  }));

  const config: ModuleConfig<any> = {
    title: "Rooms",
    description:
      "Create, edit and manage every accommodation room — pricing, description, gallery images, amenities, features and related rooms.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    addLabel: "Add New Room",
    accentColor: "#52c92d",
    accentBg: "bg-[#52c92d]/10 text-[#17352D]",
    columns: [
      {
        key: "name",
        label: "Room",
        width: "35%",
        render: (row: any) => (
          <div className="flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-[#D9D0C4]/50">
              {row.image ? (
                <Image src={row.image} alt={row.name} fill className="object-cover" sizes="56px" />
              ) : null}
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-[#0F302A] font-manrope">{row.name}</div>
              <div className="text-xs text-[#50544E]/60 font-manrope">/{row.slug}</div>
            </div>
          </div>
        ),
      },
      { key: "guests", label: "Guests" },
      { key: "price", label: "Price", render: (row: any) => <span className="font-semibold text-[#80563E]">{row.price}</span> },
      { key: "view", label: "View" },
      {
        key: "featured",
        label: "Featured",
        render: (row: any) =>
          row.featured ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#80563E]/10 text-[#80563E] text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#80563E]" /> YES
            </span>
          ) : (
            <span className="text-[#50544E]/40 text-[11px] font-bold">—</span>
          ),
      },
    ],
    rows,
  };

  return <AdminModulePage config={config} />;
}

// ============== GALLERY ==============
export function AdminGalleryPage() {
  const rows = galleryItems.map((g: any) => ({
    id: g.id,
    title: g.title,
    category: g.category,
    media: g.mediaType,
    layout: g.layout,
    image: g.image,
    route: g.route || "—",
  }));

  const config: ModuleConfig<any> = {
    title: "Gallery",
    description:
      "Upload and organise all gallery imagery and videos. Assign categories, layouts and link to rooms, pages or experiences.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008H12V4.5z" />
      </svg>
    ),
    addLabel: "Upload Media",
    accentColor: "#80563E",
    accentBg: "bg-[#80563E]/10 text-[#80563E]",
    columns: [
      {
        key: "image",
        label: "Preview",
        width: "15%",
        render: (row: any) => (
          <div className="relative w-16 h-12 rounded-md overflow-hidden bg-stone-100 shrink-0 border border-[#D9D0C4]/50">
            <Image src={row.image} alt={row.title} fill className="object-cover" sizes="64px" />
          </div>
        ),
      },
      {
        key: "title",
        label: "Title",
        width: "30%",
        render: (row: any) => (
          <div>
            <div className="font-semibold text-[#0F302A] font-manrope">{row.title}</div>
            <div className="text-xs text-[#50544E]/60 font-manrope">{row.route}</div>
          </div>
        ),
      },
      {
        key: "category",
        label: "Category",
        render: (row: any) => (
          <span className="inline-flex px-2.5 py-1 rounded-full bg-[#17352D]/8 text-[#17352D] text-[11px] font-bold font-manrope">
            {row.category}
          </span>
        ),
      },
      {
        key: "layout",
        label: "Layout",
        render: (row: any) => (
          <span className="text-xs font-semibold text-[#50544E] uppercase tracking-wider">{row.layout}</span>
        ),
      },
      {
        key: "media",
        label: "Type",
        render: (row: any) => (
          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${row.media === "video" ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"}`}>
            {row.media.toUpperCase()}
          </span>
        ),
      },
    ],
    rows,
  };

  return <AdminModulePage config={config} />;
}

// ============== AMENITIES ==============
export function AdminAmenitiesPage() {
  const rows = amenitiesList.map((a: any) => ({
    id: a.id,
    title: a.title,
    icon: a.iconName,
    description: a.description,
  }));

  const config: ModuleConfig<any> = {
    title: "Amenities",
    description:
      "Manage property amenities such as pool, parking, Wi-Fi, EV charging, kitchenettes and BBQ area. These appear across home, about and room pages.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    addLabel: "Add Amenity",
    accentColor: "#0ea5e9",
    accentBg: "bg-sky-500/10 text-sky-800",
    columns: [
      {
        key: "icon",
        label: "Icon",
        width: "15%",
        render: (row: any) => (
          <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-700 flex items-center justify-center capitalize font-bold text-sm">
            {row.icon.slice(0, 2)}
          </div>
        ),
      },
      { key: "title", label: "Title", render: (row: any) => <span className="font-semibold text-[#0F302A]">{row.title}</span> },
      { key: "description", label: "Description", render: (row: any) => <span className="text-[#50544E]/80 text-sm">{row.description}</span> },
    ],
    rows,
  };

  return <AdminModulePage config={config} />;
}

// ============== TESTIMONIALS ==============
export function AdminTestimonialsPage() {
  const rows = Object.values(testimonialsDataset).map((t: any) => ({
    id: t.id,
    name: t.name,
    date: t.date,
    rating: t.rating,
    quote: t.quote,
    avatar: t.avatar,
  }));

  const config: ModuleConfig<any> = {
    title: "Testimonials",
    description:
      "Collect and manage guest reviews. Choose which testimonials feature on the home page and about page.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    addLabel: "Add Testimonial",
    accentColor: "#f59e0b",
    accentBg: "bg-amber-500/10 text-amber-800",
    columns: [
      {
        key: "avatar",
        label: "Guest",
        width: "35%",
        render: (row: any) => (
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden bg-stone-100 shrink-0 border-2 border-white shadow">
              <Image src={row.avatar} alt={row.name} fill className="object-cover" sizes="44px" />
            </div>
            <div>
              <div className="font-semibold text-[#0F302A] font-manrope">{row.name}</div>
              <div className="text-xs text-[#50544E]/60 font-manrope">{row.date}</div>
            </div>
          </div>
        ),
      },
      {
        key: "rating",
        label: "Rating",
        render: (row: any) => (
          <div className="flex items-center text-amber-500 gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className={`w-4 h-4 ${i < row.rating ? "fill-current" : "fill-stone-200 stroke-stone-300"}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499L13.605 8.61L19.123 9.052L14.919 12.654L16.204 18.04L11.48 15.154L6.757 18.04L8.041 12.654L3.837 9.052L9.354 8.61L11.48 3.499z" />
              </svg>
            ))}
          </div>
        ),
      },
      {
        key: "quote",
        label: "Quote",
        render: (row: any) => <span className="text-[#50544E]/80 italic line-clamp-2">{row.quote}</span>,
      },
    ],
    rows,
  };

  return <AdminModulePage config={config} />;
}

// ============== WINERIES ==============
export function AdminWineriesPage() {
  const rows = wineryList.map((w: any) => ({
    id: w.id,
    name: w.name,
    location: w.location,
    drive: `${w.driveMinutes} min`,
    hours: w.hours,
    categories: w.categories?.join(", ") || "—",
    image: w.image,
    featured: w.featured,
  }));

  const config: ModuleConfig<any> = {
    title: "Wine Country",
    description:
      "Manage cellar doors, vineyards and winery listings. Set featured wineries, categories, hours and driving times.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    addLabel: "Add Winery",
    accentColor: "#8b5cf6",
    accentBg: "bg-purple-500/10 text-purple-800",
    columns: [
      {
        key: "name",
        label: "Winery",
        width: "30%",
        render: (row: any) => (
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-[#D9D0C4]/50">
              <Image src={row.image} alt={row.name} fill className="object-cover" sizes="48px" />
            </div>
            <div>
              <div className="font-semibold text-[#0F302A] font-manrope">{row.name}</div>
              <div className="text-xs text-[#50544E]/60 font-manrope">{row.location}</div>
            </div>
          </div>
        ),
      },
      { key: "drive", label: "Drive" },
      { key: "hours", label: "Hours", render: (row: any) => <span className="text-[#50544E]/80 text-sm">{row.hours}</span> },
      {
        key: "categories",
        label: "Categories",
        render: (row: any) => (
          <div className="flex flex-wrap gap-1">
            {(row.categories || "—").split(", ").map((c: string) => (
              <span key={c} className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-800 font-bold">{c}</span>
            ))}
          </div>
        ),
      },
      {
        key: "featured",
        label: "Featured",
        render: (row: any) =>
          row.featured ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-700 text-[11px] font-bold">
              ⭐ YES
            </span>
          ) : (
            <span className="text-[#50544E]/40 text-[11px]">—</span>
          ),
      },
    ],
    rows,
  };

  return <AdminModulePage config={config} />;
}

// ============== DINING ==============
export function AdminDiningPage() {
  const rows = diningVenues.map((d: any) => ({
    id: d.id,
    name: d.name,
    type: d.type,
    cuisine: d.cuisine,
    price: d.priceDisplay,
    travel: d.travelText,
    image: d.image,
    featured: d.featured,
    onSite: d.isOnSite,
  }));

  const config: ModuleConfig<any> = {
    title: "Eat & Drink",
    description:
      "Curate local cafés, restaurants and waterfront bars. Highlight featured venues, pricing tiers and proximity to the motel.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    addLabel: "Add Venue",
    accentColor: "#f43f5e",
    accentBg: "bg-rose-500/10 text-rose-800",
    columns: [
      {
        key: "name",
        label: "Venue",
        width: "30%",
        render: (row: any) => (
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-[#D9D0C4]/50">
              <Image src={row.image} alt={row.name} fill className="object-cover" sizes="48px" />
            </div>
            <div>
              <div className="font-semibold text-[#0F302A] font-manrope">{row.name}</div>
              <div className="text-xs text-[#50544E]/60 font-manrope">{row.cuisine}</div>
            </div>
          </div>
        ),
      },
      {
        key: "type",
        label: "Type",
        render: (row: any) => (
          <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-800 text-[11px] font-bold">{row.type}</span>
        ),
      },
      { key: "price", label: "Price", render: (row: any) => <span className="font-bold text-[#0F302A]">{row.price}</span> },
      { key: "travel", label: "Distance" },
      {
        key: "onSite",
        label: "On-site",
        render: (row: any) =>
          row.onSite ? (
            <span className="px-2 py-0.5 rounded bg-[#52c92d]/15 text-[#17352D] text-[11px] font-bold">ON-SITE</span>
          ) : (
            <span className="text-[11px] text-[#50544E]/40">No</span>
          ),
      },
    ],
    rows,
  };

  return <AdminModulePage config={config} />;
}

// ============== ACTIVITIES ==============
export function AdminActivitiesPage() {
  const rows = activityList.map((a: any) => ({
    id: a.id,
    name: a.name,
    location: a.location,
    drive: `${a.driveMinutes} min`,
    duration: a.duration,
    price: a.priceDisplay,
    audience: a.audience,
    image: a.image,
    featured: a.featured,
  }));

  const config: ModuleConfig<any> = {
    title: "Things to Do",
    description:
      "Create and manage activities, adventures and local attractions. Use categories to help guests easily filter by water, nature, family or culture.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    addLabel: "Add Activity",
    accentColor: "#0d9488",
    accentBg: "bg-teal-500/10 text-teal-800",
    columns: [
      {
        key: "name",
        label: "Activity",
        width: "30%",
        render: (row: any) => (
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-[#D9D0C4]/50">
              <Image src={row.image} alt={row.name} fill className="object-cover" sizes="48px" />
            </div>
            <div>
              <div className="font-semibold text-[#0F302A] font-manrope">{row.name}</div>
              <div className="text-xs text-[#50544E]/60 font-manrope">{row.location}</div>
            </div>
          </div>
        ),
      },
      { key: "drive", label: "Drive" },
      { key: "duration", label: "Duration" },
      { key: "audience", label: "Audience" },
      { key: "price", label: "Price", render: (row: any) => <span className="font-bold text-[#0F302A]">{row.price}</span> },
    ],
    rows,
  };

  return <AdminModulePage config={config} />;
}

// ============== FAQ ==============
export function AdminFaqPage() {
  const rows = faqSectionData.items.map((f: any, i: number) => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
    order: i + 1,
  }));

  const config: ModuleConfig<any> = {
    title: "FAQs",
    description:
      "Manage the frequently asked questions that appear on the contact page. Re-order and organise answers to match guest needs.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
    addLabel: "Add FAQ",
    accentColor: "#6366f1",
    accentBg: "bg-indigo-500/10 text-indigo-800",
    columns: [
      { key: "order", label: "#", width: "8%", render: (row: any) => <span className="font-bold text-[#50544E]/60">#{row.order}</span> },
      { key: "question", label: "Question", render: (row: any) => <span className="font-semibold text-[#0F302A]">{row.question}</span> },
      {
        key: "answer",
        label: "Answer",
        render: (row: any) => <span className="text-[#50544E]/70 line-clamp-2">{row.answer}</span>,
      },
    ],
    rows,
  };

  return <AdminModulePage config={config} />;
}

// ============== GENERIC PAGE MODULE (Home, About, Contact, Settings, Inquiries, Newsletter) ==============
export function AdminContentPage({
  title,
  description,
  iconName,
  accentColor,
  blocks,
}: {
  title: string;
  description: string;
  iconName: string;
  accentColor: string;
  blocks: { label: string; hint: string; fields?: string[]; value?: string; color?: string }[];
}) {
  const Icon: any = {
    home: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.5 1.5 0 012.121 0L22.5 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    about: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      </svg>
    ),
    contact: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    settings: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.007.378.138.75.43.99l1.003.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    inquiries: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 8.25v7.5m-6.75-7.5v7.5m2.25-10.5h-6a2.25 2.25 0 00-2.25 2.25v7.5A2.25 2.25 0 0011.25 18h6a2.25 2.25 0 002.25-2.25v-7.5A2.25 2.25 0 0019.5 5.25h1.5a.75.75 0 000 1.5h-1.5a.75.75 0 01-.75-.75zM3 5.25h1.5A2.25 2.25 0 016.75 7.5v9A2.25 2.25 0 014.5 18.75H3v-13.5z" />
      </svg>
    ),
    newsletter: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  }[iconName];

  return (
    <div className="space-y-6">
      <div
        className="relative overflow-hidden rounded-2xl p-6 sm:p-8 text-white shadow-md"
        style={{ background: `linear-gradient(135deg, #17352D 0%, #0F302A 50%, #17352D 100%)` }}
      >
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-20" style={{ backgroundColor: accentColor }} />
        <div className="relative flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${accentColor}30`, color: "white" }}
          >
            {Icon}
          </div>
          <div>
            <h2 className="font-cormorant text-3xl sm:text-4xl font-semibold leading-tight">{title}</h2>
            <p className="mt-1.5 text-[#f7f4ee]/70 font-manrope text-sm sm:text-base max-w-3xl leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {blocks.map((block, i) => (
          <div
            key={i}
            className="group rounded-2xl bg-white border border-[#D9D0C4]/60 p-6 hover:shadow-lg hover:border-[#80563E]/30 transition-all"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="font-cormorant text-xl font-semibold text-[#0F302A]">{block.label}</h3>
                <p className="text-xs text-[#50544E]/60 font-manrope mt-1">{block.hint}</p>
              </div>
              <button
                className="px-3.5 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider font-manrope transition-colors"
                style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
              >
                Edit
              </button>
            </div>
            {block.fields ? (
              <div className="space-y-2">
                {block.fields.map((f) => (
                  <div key={f} className="flex items-center justify-between text-sm py-2 border-b border-[#D9D0C4]/30 last:border-0">
                    <span className="text-[#50544E]/60 font-manrope">{f}</span>
                    <span className="text-[#17352D] font-manrope truncate max-w-[55%] text-right">
                      {block.value || "Click Edit to set"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg bg-[#F7F4EE] p-4 text-sm text-[#50544E]/70 font-manrope italic min-h-[72px] flex items-center">
                {block.value || `No ${block.label.toLowerCase()} configured yet. Click Edit to begin.`}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
