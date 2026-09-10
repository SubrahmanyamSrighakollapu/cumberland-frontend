"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import AdminModulePage, { ModuleConfig } from "./AdminModulePage";
import { apiFetch } from "@/utils/apiClient";
import { normalizeAssetUrl } from "@/utils/mediaUrl";

interface RoomRow {
  id: string;
  slug: string;
  name: string;
  eyebrow: string;
  shortDescription: string;
  price: number;
  currency: string;
  priceUnit: string;
  capacityGuests: number;
  guestsLabel: string;
  bedConfiguration: string;
  areaM2: number | null;
  areaLabel: string | null;
  viewLabel: string | null;
  balconyLabel: string | null;
  primaryImage: string | null;
  highlights: string[];
  isFeatured: boolean;
  sortOrder: number;
  isPublished: boolean;
  updatedAt: string;
}

interface RoomFormData {
  id?: string;
  name: string;
  slug?: string;
  eyebrow: string;
  shortDescription: string;
  price: number | string;
  currency: string;
  priceUnit: string;
  capacityGuests: number | string;
  guestsLabel: string;
  bedConfiguration: string;
  areaM2: number | string | null;
  areaLabel: string;
  viewLabel: string;
  balconyLabel: string;
  seoTitle: string;
  seoDescription: string;
  introEyebrow: string;
  introHeading: string;
  introParagraph1: string;
  introParagraph2: string;
  highlightsText: string;
  primaryImage: string;
  galleryText: string;
  relatedSlugsText: string;
  is_featured: boolean;
  sort_order: number | string;
  is_published: boolean;
}

const EMPTY_FORM: RoomFormData = {
  name: "",
  slug: "",
  eyebrow: "ROOM COLLECTION",
  shortDescription: "",
  price: 200,
  currency: "$",
  priceUnit: "/ night",
  capacityGuests: 2,
  guestsLabel: "2 Guests",
  bedConfiguration: "",
  areaM2: null,
  areaLabel: "",
  viewLabel: "",
  balconyLabel: "",
  seoTitle: "",
  seoDescription: "",
  introEyebrow: "",
  introHeading: "",
  introParagraph1: "",
  introParagraph2: "",
  highlightsText: "",
  primaryImage: "",
  galleryText: "",
  relatedSlugsText: "",
  is_featured: false,
  sort_order: 0,
  is_published: true,
};

function stringToSlug(s: string) {
  return String(s)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function splitLines(s: string): string[] {
  return String(s || "")
    .split(/\r?\n|,/g)
    .map((x) => x.trim())
    .filter(Boolean);
}

function parseGalleryText(s: string): Array<{ src: string; alt: string }> {
  const lines = splitLines(s);
  return lines.map((src, i) => {
    const safe = src.split("|");
    const url = safe[0]!.trim();
    const alt = (safe[1] || "").trim() || `Room gallery image ${i + 1}`;
    return { src: url, alt };
  });
}

function rowFromApi(item: any): RoomRow {
  return {
    id: String(item.id),
    slug: item.slug,
    name: item.name,
    eyebrow: item.eyebrow,
    shortDescription: item.shortDescription ?? item.short_description ?? "",
    price: Number(item.price ?? 0),
    currency: item.currency ?? "$",
    priceUnit: item.priceUnit ?? item.price_unit ?? "/ night",
    capacityGuests: Number(item.capacityGuests ?? item.capacity_guests ?? 0),
    guestsLabel: item.guestsLabel ?? item.guests_label ?? "",
    bedConfiguration: item.bedConfiguration ?? item.bed_configuration ?? "",
    areaM2: item.areaM2 ?? item.area_m2 ? Number(item.areaM2 ?? item.area_m2) : null,
    areaLabel: item.areaLabel ?? item.area_label ?? null,
    viewLabel: item.viewLabel ?? item.view_label ?? null,
    balconyLabel: item.balconyLabel ?? item.balcony_label ?? null,
    primaryImage: item.primaryImage ?? item.primary_image ?? null,
    highlights: Array.isArray(item.highlights) ? item.highlights : [],
    isFeatured: Boolean(item.isFeatured ?? item.is_featured ?? false),
    sortOrder: Number(item.sortOrder ?? item.sort_order ?? 0),
    isPublished: Boolean(item.isPublished ?? item.is_published ?? true),
    updatedAt: item.updatedAt ?? item.updated_at ?? "",
  };
}

function makeGalleryText(gallery: any[]): string {
  if (!Array.isArray(gallery) || !gallery.length) return "";
  return gallery
    .map((g) => {
      const src = g.src || g.image || "";
      const alt = g.alt ? `|${g.alt}` : "";
      return `${src}${alt}`;
    })
    .join("\n");
}

export default function AdminRoomsModule() {
  const [rows, setRows] = useState<RoomRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [editing, setEditing] = useState<RoomFormData>(EMPTY_FORM);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<RoomRow | null>(null);

  const showToast = useCallback(
    (type: "success" | "error", message: string) => {
      setToast({ type, message });
      window.setTimeout(() => setToast(null), 3200);
    },
    []
  );

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const qs = new URLSearchParams({ limit: "200", offset: "0" });
      if (search.trim()) qs.set("q", search.trim());
      const res = await apiFetch(`/rooms?${qs.toString()}`, { auth: true });
      const items = Array.isArray(res?.data?.items) ? res.data.items : [];
      setRows(items.map(rowFromApi));
    } catch (err: any) {
      setError(err?.message || "Failed to load rooms");
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    void load();
  }, [load]);

  const stats = useMemo(
    () => ({
      total: rows.length,
      published: rows.filter((r) => r.isPublished).length,
      featured: rows.filter((r) => r.isFeatured).length,
    }),
    [rows]
  );

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.name, r.slug, r.shortDescription, r.bedConfiguration]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [rows, search]);

  const slugFromForm = (d: RoomFormData) =>
    (d.slug && d.slug.trim()) || stringToSlug(d.name);

  const togglePublish = useCallback(
    async (row: RoomRow) => {
      try {
        const res = await apiFetch(`/rooms/${row.id}/toggle-publish`, {
          method: "PATCH",
          auth: true,
        });
        if (res?.data?.id) {
          const updated = rowFromApi(res.data);
          setRows((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
          showToast("success", res.message || "Publish state updated");
        }
      } catch (err: any) {
        showToast("error", err?.message || "Failed to update publish state");
      }
    },
    [showToast]
  );

  const toggleFeatured = useCallback(
    async (row: RoomRow) => {
      try {
        const res = await apiFetch(`/rooms/${row.id}/toggle-featured`, {
          method: "PATCH",
          auth: true,
        });
        if (res?.data?.id) {
          const updated = rowFromApi(res.data);
          setRows((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
          showToast("success", res.message || "Featured state updated");
        }
      } catch (err: any) {
        showToast("error", err?.message || "Failed to update featured state");
      }
    },
    [showToast]
  );

  const openAdd = useCallback(() => {
    setEditing(EMPTY_FORM);
    setIsNew(true);
    setFormOpen(true);
  }, []);

  const openEdit = useCallback((row: RoomRow) => {
    void (async () => {
      try {
        const res = await apiFetch(`/rooms/${row.id}`, { auth: true });
        const item = res?.data;
        if (!item) throw new Error("Room not found");
        const strVal = (v: any) => (v === null || v === undefined ? "" : String(v));
        setEditing({
          id: String(item.id),
          name: strVal(item.name),
          slug: strVal(item.slug),
          eyebrow: strVal(item.eyebrow) || "ROOM COLLECTION",
          shortDescription: strVal(item.shortDescription || item.short_description),
          price: item.price ?? 0,
          currency: strVal(item.currency) || "$",
          priceUnit: strVal(item.priceUnit || item.price_unit) || "/ night",
          capacityGuests: item.capacityGuests ?? item.capacity_guests ?? 2,
          guestsLabel: strVal(item.guestsLabel || item.guests_label),
          bedConfiguration: strVal(item.bedConfiguration || item.bed_configuration),
          areaM2: item.areaM2 ?? item.area_m2 ?? "",
          areaLabel: strVal(item.areaLabel || item.area_label),
          viewLabel: strVal(item.viewLabel || item.view_label),
          balconyLabel: strVal(item.balconyLabel || item.balcony_label),
          seoTitle: strVal(item.seoTitle || item.seo_title),
          seoDescription: strVal(item.seoDescription || item.seo_description),
          introEyebrow: strVal(item.intro?.eyebrow || item.intro_eyebrow),
          introHeading: strVal(item.intro?.heading || item.intro_heading),
          introParagraph1: strVal(item.intro?.paragraph1 || item.intro_paragraph1),
          introParagraph2: strVal(item.intro?.paragraph2 || item.intro_paragraph2),
          highlightsText:
            Array.isArray(item.highlights) && item.highlights.length
              ? item.highlights.join("\n")
              : "",
          primaryImage: strVal(item.primaryImage || item.primary_image),
          galleryText: makeGalleryText(item.gallery || []),
          relatedSlugsText:
            Array.isArray(item.relatedRoomIds) && item.relatedRoomIds.length
              ? item.relatedRoomIds.join(", ")
              : "",
          is_featured: Boolean(item.isFeatured ?? item.is_featured ?? false),
          sort_order: Number(item.sortOrder ?? item.sort_order ?? 0),
          is_published: Boolean(item.isPublished ?? item.is_published ?? true),
        });
        setIsNew(false);
        setFormOpen(true);
      } catch (err: any) {
        showToast("error", err?.message || "Failed to open room for editing");
      }
    })();
  }, [showToast]);

  const onDeleteConfirm = useCallback(async () => {
    if (!confirmDelete) return;
    try {
      await apiFetch(`/rooms/${confirmDelete.id}`, {
        method: "DELETE",
        auth: true,
      });
      setRows((prev) => prev.filter((r) => r.id !== confirmDelete.id));
      showToast("success", `Room "${confirmDelete.name}" deleted`);
      setConfirmDelete(null);
    } catch (err: any) {
      showToast("error", err?.message || "Failed to delete room");
      setConfirmDelete(null);
    }
  }, [confirmDelete, showToast]);

  const formErrors = useMemo(() => {
    const errs: string[] = [];
    if (!editing.name.trim()) errs.push("Room name is required");
    if (!editing.shortDescription.trim()) errs.push("Short description is required");
    if (!editing.bedConfiguration.trim()) errs.push("Bed configuration is required");
    const slug = slugFromForm(editing);
    if (!slug) errs.push("Slug cannot be empty");
    const price = Number(editing.price);
    if (!Number.isFinite(price) || price < 0) errs.push("Price must be a positive number");
    const cap = Number(editing.capacityGuests);
    if (!Number.isFinite(cap) || cap < 0) errs.push("Capacity must be a positive number");
    return errs;
  }, [editing]);

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (formErrors.length) {
        showToast("error", formErrors[0]);
        return;
      }
      try {
        setSubmitting(true);
        const highlights = splitLines(editing.highlightsText);
        const gallery = parseGalleryText(editing.galleryText);
        const relatedSlugs = splitLines(editing.relatedSlugsText);
        const payload = {
          name: editing.name.trim(),
          slug: slugFromForm(editing),
          eyebrow: editing.eyebrow.trim() || "ROOM COLLECTION",
          shortDescription: editing.shortDescription.trim(),
          price: Number(editing.price) || 0,
          currency: editing.currency.trim() || "$",
          priceUnit: editing.priceUnit.trim() || "/ night",
          capacityGuests: Number(editing.capacityGuests) || 0,
          guestsLabel:
            editing.guestsLabel.trim() ||
            `${editing.capacityGuests || 0} Guests`,
          bedConfiguration: editing.bedConfiguration.trim(),
          areaM2: editing.areaM2 === null || editing.areaM2 === ""
            ? null
            : Number(editing.areaM2) || null,
          areaLabel: editing.areaLabel.trim() || null,
          viewLabel: editing.viewLabel.trim() || null,
          balconyLabel: editing.balconyLabel.trim() || null,
          seoTitle: editing.seoTitle.trim() || null,
          seoDescription: editing.seoDescription.trim() || null,
          introEyebrow: editing.introEyebrow.trim() || null,
          introHeading: editing.introHeading.trim() || null,
          introParagraph1: editing.introParagraph1 || null,
          introParagraph2: editing.introParagraph2 || null,
          highlights,
          primaryImage: editing.primaryImage.trim() || null,
          gallery,
          relatedRoomIds: relatedSlugs,
          isFeatured: editing.is_featured,
          sortOrder: Number(editing.sort_order) || 0,
          isPublished: editing.is_published,
        };

        const method = isNew ? "POST" : "PUT";
        const url = isNew ? "/rooms" : `/rooms/${editing.id}`;
        const res = await apiFetch(url, {
          method,
          auth: true,
          body: JSON.stringify(payload),
        });
        if (res?.data?.id) {
          const updated = rowFromApi(res.data);
          setRows((prev) =>
            isNew
              ? [updated, ...prev]
              : prev.map((r) => (r.id === updated.id ? updated : r))
          );
          showToast(
            "success",
            isNew
              ? `Room "${updated.name}" created`
              : `Room "${updated.name}" updated`
          );
          setFormOpen(false);
        }
      } catch (err: any) {
        showToast("error", err?.message || "Failed to save room");
      } finally {
        setSubmitting(false);
      }
    },
    [editing, formErrors, isNew, showToast]
  );

  const moduleConfig: ModuleConfig<RoomRow> = {
    title: "Rooms",
    description:
      "Manage accommodation listings — key details only. Amenities and stay information are shared across every room and applied automatically in the public site.",
    addLabel: "Add Room",
    onAdd: openAdd,
    onEdit: openEdit,
    onDelete: (row: RoomRow) => setConfirmDelete(row),
    onTogglePublish: togglePublish,
    showPublishToggle: true,
    hideInfoBanner: true,
    search: {
      value: search,
      onChange: setSearch,
      placeholder: "Search by room name, slug, or short description…",
    },
    stats: [
      { label: "TOTAL ROOMS", value: stats.total, color: "#17352D" },
      { label: "PUBLISHED", value: stats.published, color: "#52C92D" },
      { label: "FEATURED", value: stats.featured, color: "#80563E" },
    ],
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.75}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 21h18M4 21V10a2 2 0 012-2h12a2 2 0 012 2v11M8 8V5a2 2 0 012-2h4a2 2 0 012 2v3"
        />
      </svg>
    ),
    accentColor: "#80563E",
    accentBg: "bg-[#80563E]/10 text-[#80563E]",
    loading: loading,
    loadingMessage: "Loading room collection from the database…",
    error: error,
    columns: [
      {
        key: "name",
        label: "Room",
        width: "minmax(180px, 1.2fr)",
        render: (row: RoomRow) => {
          const img = row.primaryImage;
          return (
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-16 h-12 shrink-0 rounded-md overflow-hidden bg-stone-100 border border-stone-200">
                {img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={normalizeAssetUrl(img)}
                    alt={row.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-300 text-[10px] font-semibold">
                    NO IMAGE
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <div className="text-[15px] font-semibold text-stone-800 truncate">
                  {row.name}
                </div>
                <div className="text-xs text-stone-500 font-mono truncate mt-0.5">
                  /rooms/{row.slug}
                </div>
                <div className="text-xs text-stone-500 mt-0.5 line-clamp-2">
                  {row.shortDescription}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        key: "price",
        label: "From",
        width: "100px",
        render: (row: RoomRow) => (
          <div>
            <span className="text-lg font-cormorant font-bold text-stone-800">
              {row.currency}
              {row.price}
            </span>
            <span className="text-[10px] text-stone-500 ml-0.5">
              {row.priceUnit}
            </span>
          </div>
        ),
      },
      {
        key: "capacity",
        label: "Capacity",
        width: "110px",
        render: (row: RoomRow) => (
          <div className="text-sm text-stone-700">
            <div className="font-semibold text-stone-800">
              {row.capacityGuests}
            </div>
            <div className="text-[11px] text-stone-500">{row.guestsLabel}</div>
          </div>
        ),
      },
      {
        key: "bed",
        label: "Bed",
        width: "140px",
        render: (row: RoomRow) => (
          <div className="text-sm text-stone-700 leading-tight">
            {row.bedConfiguration}
          </div>
        ),
      },
      {
        key: "features",
        label: "Highlights",
        width: "minmax(180px, 1.4fr)",
        render: (row: RoomRow) => (
          <div className="flex flex-wrap gap-1 min-w-0">
            {row.highlights.slice(0, 3).map((h: string, i: number) => (
              <span
                key={i}
                className="inline-flex items-center px-2 py-0.5 rounded bg-stone-100 text-[11px] font-medium text-stone-700 border border-stone-200"
              >
                {h.length > 40 ? `${h.slice(0, 40)}…` : h}
              </span>
            ))}
            {row.highlights.length > 3 && (
              <span className="inline-flex items-center px-2 py-0.5 text-[11px] text-stone-500">
                +{row.highlights.length - 3} more
              </span>
            )}
          </div>
        ),
      },
      {
        key: "featured",
        label: "Featured",
        width: "100px",
        render: (row: RoomRow) => (
          <button
            type="button"
            onClick={() => toggleFeatured(row)}
            className={`p-2 rounded-md transition-colors inline-block ${
              row.isFeatured
                ? "text-[#80563E] hover:bg-[#80563E]/10"
                : "text-[#8A8478]/60 hover:bg-stone-100"
            }`}
            title={row.isFeatured ? "Unfeature from home page" : "Feature on home page"}
          >
            <svg className="w-5 h-5" fill={row.isFeatured ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          </button>
        ),
      },
    ],
    rows: filteredRows,
    emptyState: {
      title: "No rooms yet.",
      description:
        "Add your first accommodation. It will appear on the Rooms list immediately when published, and on the home featured strip when flagged as featured.",
      actionLabel: "Add Room",
      onAction: openAdd,
    },
  };

  const currentPreviewImg = editing.primaryImage.trim();
  const galleryPreviewImgs = parseGalleryText(editing.galleryText).slice(0, 6);
  const highlightCount = splitLines(editing.highlightsText).length;
  const galleryCount = parseGalleryText(editing.galleryText).length;
  const relatedCount = splitLines(editing.relatedSlugsText).length;

  return (
    <div className="w-full">
      <AdminModulePage config={moduleConfig} />

      {formOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-5 md:p-8 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setFormOpen(false);
          }}
        >
          <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="shrink-0 flex items-center justify-between gap-6 px-6 md:px-8 py-4 border-b border-stone-200 bg-stone-50/90 backdrop-blur-md">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] text-[#80563E] uppercase mb-0.5">
                  {isNew ? "NEW ROOM" : "EDIT ROOM"}
                </p>
                <h2 className="text-xl md:text-2xl font-cormorant font-semibold text-stone-800">
                  {isNew ? "Add accommodation" : `Editing — ${editing.name || "Untitled"}`}
                </h2>
                <p className="text-xs md:text-sm text-stone-500 max-w-2xl hidden sm:block">
                  Complete the key room details below. Shared amenities and stay information are managed centrally.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="p-2 rounded-xl hover:bg-stone-200/60 text-stone-400 hover:text-stone-700 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-400"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={onSubmit} className="flex-1 flex flex-col min-h-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 space-y-8">
                {formErrors.length > 0 && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    <ul className="list-disc list-inside space-y-0.5">
                      {formErrors.map((e, i) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  </div>
                )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-8">
                <div className="lg:col-span-7 space-y-8">
                  <section className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-800 border-b border-stone-200 pb-2">
                      Basics
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                      <label className="sm:col-span-12 block">
                        <span className="text-sm font-medium text-stone-700 mb-1.5 block">Room name *</span>
                        <input
                          type="text"
                          value={editing.name}
                          onChange={(e) =>
                            setEditing({ ...editing, name: e.target.value })
                          }
                          placeholder="e.g. Deluxe Queen Room"
                          className="w-full h-11 px-3.5 rounded-lg border border-stone-300 focus:border-[#17352D] focus:ring-1 focus:ring-[#17352D] outline-none text-sm"
                        />
                      </label>
                      <label className="sm:col-span-8 block">
                        <span className="text-sm font-medium text-stone-700 mb-1.5 block">
                          Slug <span className="text-stone-400 font-normal">(auto-filled from name if blank)</span>
                        </span>
                        <input
                          type="text"
                          value={editing.slug ?? ""}
                          onChange={(e) =>
                            setEditing({ ...editing, slug: e.target.value })
                          }
                          onBlur={() => {
                            const val = editing.slug ?? "";
                            setEditing({
                              ...editing,
                              slug: val.trim()
                                ? val.trim()
                                : stringToSlug(editing.name),
                            });
                          }}
                          placeholder="deluxe-queen-room"
                          className="w-full h-11 px-3.5 rounded-lg border border-stone-300 focus:border-[#17352D] focus:ring-1 focus:ring-[#17352D] outline-none text-sm font-mono"
                        />
                      </label>
                      <label className="sm:col-span-4 block">
                        <span className="text-sm font-medium text-stone-700 mb-1.5 block">Eyebrow label</span>
                        <input
                          type="text"
                          value={editing.eyebrow}
                          onChange={(e) =>
                            setEditing({ ...editing, eyebrow: e.target.value })
                          }
                          placeholder="ROOM COLLECTION"
                          className="w-full h-11 px-3.5 rounded-lg border border-stone-300 focus:border-[#17352D] focus:ring-1 focus:ring-[#17352D] outline-none text-xs font-semibold tracking-wider uppercase"
                        />
                      </label>
                      <label className="sm:col-span-12 block">
                        <span className="text-sm font-medium text-stone-700 mb-1.5 block">Short description *</span>
                        <textarea
                          rows={2}
                          value={editing.shortDescription}
                          onChange={(e) =>
                            setEditing({ ...editing, shortDescription: e.target.value })
                          }
                          placeholder="One short line that appears on room cards and SEO previews (max 500 chars)."
                          maxLength={500}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:border-[#17352D] focus:ring-1 focus:ring-[#17352D] outline-none text-sm resize-none"
                        />
                      </label>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-800 border-b border-stone-200 pb-2">
                      Pricing &amp; capacity
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                      <label className="sm:col-span-3 block">
                        <span className="text-sm font-medium text-stone-700 mb-1.5 block">Price *</span>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={editing.price as any}
                          onChange={(e) =>
                            setEditing({ ...editing, price: e.target.value })
                          }
                          className="w-full h-11 px-3.5 rounded-lg border border-stone-300 focus:border-[#17352D] focus:ring-1 focus:ring-[#17352D] outline-none text-sm"
                        />
                      </label>
                      <label className="sm:col-span-2 block">
                        <span className="text-sm font-medium text-stone-700 mb-1.5 block">Currency</span>
                        <input
                          type="text"
                          maxLength={3}
                          value={editing.currency}
                          onChange={(e) =>
                            setEditing({ ...editing, currency: e.target.value })
                          }
                          placeholder="$"
                          className="w-full h-11 px-3.5 rounded-lg border border-stone-300 focus:border-[#17352D] focus:ring-1 focus:ring-[#17352D] outline-none text-sm text-center"
                        />
                      </label>
                      <label className="sm:col-span-4 block">
                        <span className="text-sm font-medium text-stone-700 mb-1.5 block">Price suffix</span>
                        <input
                          type="text"
                          value={editing.priceUnit}
                          onChange={(e) =>
                            setEditing({ ...editing, priceUnit: e.target.value })
                          }
                          placeholder="/ night"
                          className="w-full h-11 px-3.5 rounded-lg border border-stone-300 focus:border-[#17352D] focus:ring-1 focus:ring-[#17352D] outline-none text-sm"
                        />
                      </label>
                      <label className="sm:col-span-3 block">
                        <span className="text-sm font-medium text-stone-700 mb-1.5 block">Guests (count)</span>
                        <input
                          type="number"
                          min="0"
                          value={editing.capacityGuests as any}
                          onChange={(e) =>
                            setEditing({ ...editing, capacityGuests: e.target.value })
                          }
                          className="w-full h-11 px-3.5 rounded-lg border border-stone-300 focus:border-[#17352D] focus:ring-1 focus:ring-[#17352D] outline-none text-sm"
                        />
                      </label>
                      <label className="sm:col-span-5 block">
                        <span className="text-sm font-medium text-stone-700 mb-1.5 block">Guests label</span>
                        <input
                          type="text"
                          value={editing.guestsLabel}
                          onChange={(e) =>
                            setEditing({ ...editing, guestsLabel: e.target.value })
                          }
                          placeholder="2 Guests"
                          className="w-full h-11 px-3.5 rounded-lg border border-stone-300 focus:border-[#17352D] focus:ring-1 focus:ring-[#17352D] outline-none text-sm"
                        />
                      </label>
                      <label className="sm:col-span-7 block">
                        <span className="text-sm font-medium text-stone-700 mb-1.5 block">Bed configuration *</span>
                        <input
                          type="text"
                          value={editing.bedConfiguration}
                          onChange={(e) =>
                            setEditing({ ...editing, bedConfiguration: e.target.value })
                          }
                          placeholder="1 King + 2 Singles"
                          className="w-full h-11 px-3.5 rounded-lg border border-stone-300 focus:border-[#17352D] focus:ring-1 focus:ring-[#17352D] outline-none text-sm"
                        />
                      </label>
                      <label className="sm:col-span-3 block">
                        <span className="text-sm font-medium text-stone-700 mb-1.5 block">Area (m²)</span>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={editing.areaM2 ?? ""}
                          onChange={(e) =>
                            setEditing({ ...editing, areaM2: e.target.value })
                          }
                          placeholder="32"
                          className="w-full h-11 px-3.5 rounded-lg border border-stone-300 focus:border-[#17352D] focus:ring-1 focus:ring-[#17352D] outline-none text-sm"
                        />
                      </label>
                      <label className="sm:col-span-3 block">
                        <span className="text-sm font-medium text-stone-700 mb-1.5 block">Area label</span>
                        <input
                          type="text"
                          value={editing.areaLabel ?? ""}
                          onChange={(e) =>
                            setEditing({ ...editing, areaLabel: e.target.value })
                          }
                          placeholder="32 m²"
                          className="w-full h-11 px-3.5 rounded-lg border border-stone-300 focus:border-[#17352D] focus:ring-1 focus:ring-[#17352D] outline-none text-sm"
                        />
                      </label>
                      <label className="sm:col-span-6 block">
                        <span className="text-sm font-medium text-stone-700 mb-1.5 block">View</span>
                        <input
                          type="text"
                          value={editing.viewLabel ?? ""}
                          onChange={(e) =>
                            setEditing({ ...editing, viewLabel: e.target.value })
                          }
                          placeholder="Garden View"
                          className="w-full h-11 px-3.5 rounded-lg border border-stone-300 focus:border-[#17352D] focus:ring-1 focus:ring-[#17352D] outline-none text-sm"
                        />
                      </label>
                      <label className="sm:col-span-6 block">
                        <span className="text-sm font-medium text-stone-700 mb-1.5 block">Balcony / patio</span>
                        <input
                          type="text"
                          value={editing.balconyLabel ?? ""}
                          onChange={(e) =>
                            setEditing({ ...editing, balconyLabel: e.target.value })
                          }
                          placeholder="Private Balcony"
                          className="w-full h-11 px-3.5 rounded-lg border border-stone-300 focus:border-[#17352D] focus:ring-1 focus:ring-[#17352D] outline-none text-sm"
                        />
                      </label>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-800 border-b border-stone-200 pb-2">
                      Intro copy
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                      <label className="sm:col-span-4 block">
                        <span className="text-sm font-medium text-stone-700 mb-1.5 block">Eyebrow</span>
                        <input
                          type="text"
                          value={editing.introEyebrow}
                          onChange={(e) =>
                            setEditing({ ...editing, introEyebrow: e.target.value })
                          }
                          placeholder="THE DELUXE EXPERIENCE"
                          className="w-full h-11 px-3.5 rounded-lg border border-stone-300 focus:border-[#17352D] focus:ring-1 focus:ring-[#17352D] outline-none text-xs uppercase font-semibold tracking-wider"
                        />
                      </label>
                      <label className="sm:col-span-8 block">
                        <span className="text-sm font-medium text-stone-700 mb-1.5 block">Heading</span>
                        <input
                          type="text"
                          value={editing.introHeading}
                          onChange={(e) =>
                            setEditing({ ...editing, introHeading: e.target.value })
                          }
                          placeholder="Room to slow down."
                          className="w-full h-11 px-3.5 rounded-lg border border-stone-300 focus:border-[#17352D] focus:ring-1 focus:ring-[#17352D] outline-none text-sm"
                        />
                      </label>
                      <label className="sm:col-span-12 block">
                        <span className="text-sm font-medium text-stone-700 mb-1.5 block">Intro paragraph 1</span>
                        <textarea
                          rows={3}
                          value={editing.introParagraph1}
                          onChange={(e) =>
                            setEditing({ ...editing, introParagraph1: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:border-[#17352D] focus:ring-1 focus:ring-[#17352D] outline-none text-sm resize-none"
                        />
                      </label>
                      <label className="sm:col-span-12 block">
                        <span className="text-sm font-medium text-stone-700 mb-1.5 block">Intro paragraph 2</span>
                        <textarea
                          rows={3}
                          value={editing.introParagraph2}
                          onChange={(e) =>
                            setEditing({ ...editing, introParagraph2: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:border-[#17352D] focus:ring-1 focus:ring-[#17352D] outline-none text-sm resize-none"
                        />
                      </label>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-800">
                        Highlights
                      </h3>
                      <span className="text-xs text-stone-500">
                        {highlightCount} / 12
                      </span>
                    </div>
                    <label className="block">
                      <span className="text-sm text-stone-500 mb-1.5 block">
                        One bullet per line. Shown as small pills under each room card.
                      </span>
                      <textarea
                        rows={5}
                        value={editing.highlightsText}
                        onChange={(e) =>
                          setEditing({ ...editing, highlightsText: e.target.value })
                        }
                        placeholder={"Plush king bed\nPrivate balcony with inlet views\nRenovated ensuite shower\nComplimentary Wi-Fi and parking"}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:border-[#17352D] focus:ring-1 focus:ring-[#17352D] outline-none text-sm resize-none font-mono text-[13px]"
                      />
                    </label>
                  </section>
                </div>

                <div className="lg:col-span-5 space-y-8">
                  <section className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-800 border-b border-stone-200 pb-2">
                      Cover image
                    </h3>
                    <label className="block">
                      <span className="text-sm font-medium text-stone-700 mb-1.5 block">
                        Primary image URL
                      </span>
                      <input
                        type="text"
                        value={editing.primaryImage}
                        onChange={(e) =>
                          setEditing({ ...editing, primaryImage: e.target.value })
                        }
                        placeholder="/images/room-one.png or /uploads/xxx.jpg"
                        className="w-full h-11 px-3.5 rounded-lg border border-stone-300 focus:border-[#17352D] focus:ring-1 focus:ring-[#17352D] outline-none text-sm"
                      />
                    </label>
                    <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                      {currentPreviewImg ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={normalizeAssetUrl(currentPreviewImg)}
                          alt="Cover preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-stone-400">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M4 6h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
                          </svg>
                          <div className="text-xs">No cover image yet</div>
                        </div>
                      )}
                    </div>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-800">
                        Photo gallery
                      </h3>
                      <span className="text-xs text-stone-500">{galleryCount} images</span>
                    </div>
                    <label className="block">
                      <span className="text-sm text-stone-500 mb-1.5 block">
                        One image per line. Optional alt text separated by <code className="text-[11px] bg-stone-100 px-1 rounded">|</code>.
                      </span>
                      <textarea
                        rows={5}
                        value={editing.galleryText}
                        onChange={(e) =>
                          setEditing({ ...editing, galleryText: e.target.value })
                        }
                        placeholder={"/images/room-one.png|Spacious king interior\n/images/room-two.png|Private balcony view"}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:border-[#17352D] focus:ring-1 focus:ring-[#17352D] outline-none text-sm resize-none font-mono text-[13px]"
                      />
                    </label>
                    {galleryPreviewImgs.length > 0 && (
                      <div className="grid grid-cols-3 gap-1.5">
                        {galleryPreviewImgs.map((g, i) => (
                          <div key={i} className="aspect-square rounded-md overflow-hidden border border-stone-200 bg-stone-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={normalizeAssetUrl(g.src)}
                              alt={g.alt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-800">
                        SEO &amp; related
                      </h3>
                    </div>
                    <label className="block">
                      <span className="text-sm font-medium text-stone-700 mb-1.5 block">SEO title</span>
                      <input
                        type="text"
                        value={editing.seoTitle}
                        onChange={(e) =>
                          setEditing({ ...editing, seoTitle: e.target.value })
                        }
                        placeholder="Cove King | Cumberland Motor Inn"
                        className="w-full h-11 px-3.5 rounded-lg border border-stone-300 focus:border-[#17352D] focus:ring-1 focus:ring-[#17352D] outline-none text-sm"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-stone-700 mb-1.5 block">SEO description</span>
                      <textarea
                        rows={2}
                        value={editing.seoDescription}
                        onChange={(e) =>
                          setEditing({ ...editing, seoDescription: e.target.value })
                        }
                        maxLength={500}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:border-[#17352D] focus:ring-1 focus:ring-[#17352D] outline-none text-sm resize-none"
                      />
                    </label>
                    <label className="block">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-stone-700">
                          Related rooms
                        </span>
                        <span className="text-xs text-stone-500">{relatedCount} room(s)</span>
                      </div>
                      <span className="text-xs text-stone-500 mb-1.5 block">
                        Slugs separated by commas or newlines — rendered below room detail as suggestions.
                      </span>
                      <textarea
                        rows={2}
                        value={editing.relatedSlugsText}
                        onChange={(e) =>
                          setEditing({ ...editing, relatedSlugsText: e.target.value })
                        }
                        placeholder="deluxe-twin-room, family-room"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:border-[#17352D] focus:ring-1 focus:ring-[#17352D] outline-none text-sm resize-none font-mono text-[13px]"
                      />
                    </label>
                  </section>

                  <section className="space-y-4 rounded-xl bg-stone-50 border border-stone-200 p-4">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-800">
                      Publishing
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className="sm:col-span-2 block">
                        <span className="text-sm font-medium text-stone-700 mb-1.5 block">
                          Sort order
                        </span>
                        <input
                          type="number"
                          value={editing.sort_order as any}
                          onChange={(e) =>
                            setEditing({ ...editing, sort_order: e.target.value })
                          }
                          className="w-full h-11 px-3.5 rounded-lg border border-stone-300 focus:border-[#17352D] focus:ring-1 focus:ring-[#17352D] outline-none text-sm"
                        />
                      </label>
                      <label className="flex items-center justify-between rounded-lg border border-stone-200 bg-white px-4 py-3 cursor-pointer hover:border-stone-300">
                        <div>
                          <div className="text-sm font-medium text-stone-800">Featured</div>
                          <div className="text-xs text-stone-500">Shown on home "Rooms designed for real rest."</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={editing.is_featured}
                          onChange={(e) =>
                            setEditing({ ...editing, is_featured: e.target.checked })
                          }
                          className="w-5 h-5 accent-[#17352D]"
                        />
                      </label>
                      <label className="flex items-center justify-between rounded-lg border border-stone-200 bg-white px-4 py-3 cursor-pointer hover:border-stone-300">
                        <div>
                          <div className="text-sm font-medium text-stone-800">Published</div>
                          <div className="text-xs text-stone-500">Visible on /rooms list + detail pages.</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={editing.is_published}
                          onChange={(e) =>
                            setEditing({ ...editing, is_published: e.target.checked })
                          }
                          className="w-5 h-5 accent-[#17352D]"
                        />
                      </label>
                    </div>
                  </section>
                </div>
              </div>
            </div>

            {/* Modal Footer (Sticky at bottom) */}
            <div className="shrink-0 flex items-center justify-between gap-4 px-6 md:px-8 py-4 border-t border-stone-200 bg-stone-50/90 backdrop-blur-md">
                <div className="text-xs text-stone-500 font-medium hidden sm:block">
                  {isNew ? "Draft will be added to database" : `Editing ID: ${editing.id}`}
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => setFormOpen(false)}
                    disabled={submitting}
                    className="h-11 px-5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-sm font-semibold transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="h-11 px-7 rounded-xl bg-[#17352D] hover:bg-[#0F302A] text-white text-sm font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        <span>SAVING…</span>
                      </>
                    ) : isNew ? (
                      "Create Room"
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 p-6">
            <h3 className="text-xl font-semibold text-stone-800 mb-2">
              Delete room
            </h3>
            <p className="text-sm text-stone-600 mb-6">
              Are you sure you want to permanently remove{" "}
              <span className="font-medium text-stone-800">{confirmDelete.name}</span>?
              The listing will be removed from /rooms, the home featured strip, and any
              related-room suggestions immediately.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmDelete(null)}
                className="h-10 px-4 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onDeleteConfirm}
                className="h-10 px-4 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-[120] max-w-sm px-5 py-3.5 rounded-xl shadow-xl text-sm font-medium text-white border ${
            toast.type === "success"
              ? "bg-[#17352D] border-[#17352D]"
              : "bg-rose-600 border-rose-600"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
