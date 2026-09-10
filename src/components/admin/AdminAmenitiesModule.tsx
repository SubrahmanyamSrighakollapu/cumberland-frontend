"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import AdminModulePage, { ModuleConfig } from "./AdminModulePage";
import { apiFetch } from "@/utils/apiClient";
import {
  ApiAmenity,
  HOME_ICON_OPTIONS,
  ROOM_ICON_OPTIONS,
  stringToSlug,
} from "@/utils/amenityClient";

type Category = "home" | "room";

interface AmenityRow {
  id: string;
  slug: string;
  category: Category;
  title: string;
  description: string;
  iconKey: string;
  sortOrder: number;
  isPublished: boolean;
}

interface AmenityFormData {
  id?: string;
  category: Category;
  slug: string;
  title: string;
  description: string;
  iconKey: string;
  sortOrder: number | string;
  isPublished: boolean;
}

const DEFAULTS: Record<Category, AmenityFormData> = {
  home: {
    category: "home",
    slug: "",
    title: "",
    description: "",
    iconKey: "pool",
    sortOrder: 0,
    isPublished: true,
  },
  room: {
    category: "room",
    slug: "",
    title: "",
    description: "",
    iconKey: "wifi",
    sortOrder: 0,
    isPublished: true,
  },
};

function rowFromApi(api: ApiAmenity): AmenityRow {
  return {
    id: api.id,
    slug: api.slug,
    category: api.category === "room" ? "room" : "home",
    title: api.title,
    description: api.description || "",
    iconKey: api.iconKey,
    sortOrder: Number(api.sortOrder || 0),
    isPublished: Boolean(api.isPublished),
  };
}

function iconPreview(category: Category, iconKey: string) {
  const style = { className: "w-5 h-5 text-[#0f302a]", strokeWidth: 1.7 };
  const S = (p: { d: string; f?: string }) => (
    <svg
      className={style.className}
      fill={p.f || "none"}
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={style.strokeWidth}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={p.d} />
    </svg>
  );
  const common = (d: string) => S({ d });
  if (category === "home") {
    switch (iconKey) {
      case "pool":
        return common(
          "M3 15s2.5-2 5-2c2.5 0 5 2 5 2s2.5-2 5-2c2.5 0 5 2 5 2M3 19s2.5-2 5-2c2.5 0 5 2 5 2s2.5-2 5-2c2.5 0 5 2 5 2M16 10l-2-7m-4 7l-2-7"
        );
      case "parking":
        return common(
          "M9 7h4a3 3 0 010 6H8V7zm0 6h4a3 3 0 010 6H8v-6zM3 3h18v18H3V3z"
        );
      case "wifi":
        return common(
          "M8.11 16.4a5.5 5.5 0 017.78 0M12 20h.01m-7.08-7.07c3.9-3.9 10.23-3.9 14.14 0M1.39 9.39c5.86-5.86 15.35-5.86 21.21 0"
        );
      case "ev":
        return common("M13 10V3L4 14h7v7l9-11h-7z");
      case "kitchen":
        return common(
          "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
        );
      case "bbq":
        return common(
          "M17.66 18.66A8 8 0 016.34 7.34S7 9 9 10c0-2 .5-5 2.99-7C14 5 16.1 5.78 17.66 7.34A8 8 0 0120 13a8 8 0 01-2.34 5.66z"
        );
    }
  }
  if (category === "room") {
    switch (iconKey) {
      case "wifi":
        return common(
          "M8.11 16.4a5.5 5.5 0 017.78 0M12 20h.01m-7.08-7.07c3.9-3.9 10.23-3.9 14.14 0M1.39 9.39c5.86-5.86 15.35-5.86 21.21 0"
        );
      case "ac":
        return common(
          "M12 3v18m0-18l4 4m-4-4L8 7m4 14l4-4m-4 4l-4-4M3 12h18m-18 0l4-4m-4 4l4 4m14-4l-4-4m4 4l-4 4"
        );
      case "tv":
        return common(
          "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        );
      case "fridge":
        return common(
          "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V5a2 2 0 00-2-2H5a2 2 0 00-2 2v6"
        );
      case "coffee":
        return common(
          "M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"
        );
      case "desk":
        return common("M3 10h18M3 14h18m-9-4v8m-7 0h14");
      case "shower":
        return common("M4 4v5a2 2 0 002 2h12a2 2 0 002-2V4M12 11v9m-4 0h8");
      case "balcony":
        return common(
          "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        );
      case "parking":
        return common(
          "M9 7h4a3 3 0 010 6H8V7zm0 6h4a3 3 0 010 6H8v-6zM3 3h18v18H3V3z"
        );
      case "non-smoking":
        return common(
          "M18.36 18.36A9 9 0 005.64 5.64m12.73 12.73A9 9 0 015.64 5.64m12.73 12.73L5.64 5.64"
        );
    }
  }
  return common("M5 13l4 4L19 7");
}

export default function AdminAmenitiesModule() {
  const [rows, setRows] = useState<AmenityRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<Category>("home");
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<AmenityRow | null>(null);
  const [formData, setFormData] = useState<AmenityFormData>(DEFAULTS.home);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState<AmenityRow | null>(null);

  const pushToast = useCallback(
    (msg: string, ok = true) => {
      setToast({ msg, ok });
      window.setTimeout(() => setToast(null), 3200);
    },
    []
  );

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiFetch("/amenities?limit=200&offset=0&sort=sort_order_asc");
      const items = Array.isArray(res?.data?.items) ? res.data.items : [];
      setRows(items.map(rowFromApi));
    } catch (err: any) {
      setRows([]);
      setError(err?.message || "Failed to load amenities.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const togglePublish = useCallback(
    async (row: AmenityRow) => {
      try {
        const res = await apiFetch(`/amenities/${row.id}/toggle-publish`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });
        setRows((prev) =>
          prev.map((r) =>
            r.id === row.id ? { ...r, isPublished: !r.isPublished } : r
          )
        );
        pushToast(res?.message || "Publish state updated.");
      } catch (err: any) {
        pushToast(err?.message || "Failed to update publish state.", false);
      }
    },
    [pushToast]
  );

  const openAdd = (category: Category = tab) => {
    setEditing(null);
    setFormData({ ...DEFAULTS[category], category });
    setFormErrors([]);
    setShowForm(true);
  };

  const openEdit = (row: AmenityRow) => {
    setEditing(row);
    setFormData({
      id: row.id,
      category: row.category,
      slug: row.slug,
      title: row.title,
      description: row.description,
      iconKey: row.iconKey,
      sortOrder: row.sortOrder,
      isPublished: row.isPublished,
    });
    setFormErrors([]);
    setShowForm(true);
  };

  const validate = (d: AmenityFormData): string[] => {
    const errs: string[] = [];
    if (!d.title.trim()) errs.push("Title is required.");
    const slug = (d.slug && d.slug.trim()) || stringToSlug(d.title);
    if (!slug) errs.push("Slug is required.");
    if (!d.iconKey) errs.push("Icon is required.");
    if (d.description && d.description.length > 255)
      errs.push("Description max 255 characters.");
    return errs;
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(formData);
    if (errs.length) {
      setFormErrors(errs);
      return;
    }
    setSaving(true);
    try {
      const slug =
        (formData.slug && formData.slug.trim()) || stringToSlug(formData.title);
      const body = {
        category: formData.category,
        slug,
        title: formData.title.trim(),
        description: formData.description.trim() || null,
        iconKey: formData.iconKey,
        sortOrder: Number(formData.sortOrder || 0),
        isPublished: formData.isPublished,
      };
      const isEdit = Boolean(editing);
      const res = isEdit
        ? await apiFetch(`/amenities/${editing!.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          })
        : await apiFetch("/amenities", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
      pushToast(
        res?.message || (isEdit ? "Amenity updated." : "Amenity added.")
      );
      setShowForm(false);
      setEditing(null);
      void load();
    } catch (err: any) {
      setFormErrors([err?.message || "Failed to save."]);
    } finally {
      setSaving(false);
    }
  };

  const onConfirmDelete = async () => {
    if (!confirmDelete) return;
    try {
      const res = await apiFetch(`/amenities/${confirmDelete.id}`, {
        method: "DELETE",
      });
      pushToast(res?.message || "Amenity deleted.");
      setConfirmDelete(null);
      void load();
    } catch (err: any) {
      pushToast(err?.message || "Failed to delete.", false);
    }
  };

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    const byCat = rows.filter((r) => r.category === tab);
    if (!q) return byCat;
    return byCat.filter((r) =>
      [r.title, r.slug, r.description, r.iconKey]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [rows, tab, search]);

  const stats = useMemo(() => {
    const pool = rows.filter((r) => r.category === tab);
    return {
      total: pool.length,
      published: pool.filter((r) => r.isPublished).length,
    };
  }, [rows, tab]);

  const iconOptions = tab === "home" ? HOME_ICON_OPTIONS : ROOM_ICON_OPTIONS;

  const moduleConfig: ModuleConfig<AmenityRow> = {
    title: tab === "home" ? "Home Amenities" : "Room Amenities",
    description:
      tab === "home"
        ? "Property-level amenities that appear on the home and about pages. Shared across the site."
        : "Amenities included with every room — they appear in the Room Amenities section of every accommodation detail page.",
    addLabel: `Add ${tab === "home" ? "Home" : "Room"} Amenity`,
    onAdd: () => openAdd(tab),
    onEdit: openEdit,
    onDelete: (row) => setConfirmDelete(row),
    onTogglePublish: togglePublish,
    showPublishToggle: true,
    hideInfoBanner: true,
    search: {
      value: search,
      onChange: setSearch,
      placeholder: `Search ${tab} amenities by title, slug or description…`,
    },
    stats: [
      { label: tab === "home" ? "HOME AMENITIES" : "ROOM AMENITIES", value: stats.total, color: "#17352D" },
      { label: "PUBLISHED", value: stats.published, color: "#52C92D" },
    ],
    icon:
      tab === "home" ? (
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
            d="M3 15s2.5-2 5-2c2.5 0 5 2 5 2s2.5-2 5-2c2.5 0 5 2 5 2M3 19s2.5-2 5-2c2.5 0 5 2 5 2s2.5-2 5-2c2.5 0 5 2 5 2M16 10l-2-7m-4 7l-2-7"
          />
        </svg>
      ) : (
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
            d="M9.81 15.9L9 18.75l-.81-2.85a4.5 4.5 0 00-3.09-3.09L2.25 12l2.85-.81a4.5 4.5 0 003.09-3.09L9 5.25l.81 2.85a4.5 4.5 0 003.09 3.09L15.75 12l-2.85.81a4.5 4.5 0 00-3.09 3.09z"
          />
        </svg>
      ),
    accentColor: tab === "home" ? "#17352D" : "#80563E",
    accentBg:
      tab === "home"
        ? "bg-[#17352D]/10 text-[#17352D]"
        : "bg-[#80563E]/10 text-[#80563E]",
    loading,
    loadingMessage: `Loading ${tab} amenities…`,
    error,
    columns: [
      {
        key: "icon",
        label: "Icon",
        width: "60px",
        render: (row) => (
          <div className="w-9 h-9 rounded-lg bg-[#e9efe8] flex items-center justify-center">
            {iconPreview(row.category, row.iconKey)}
          </div>
        ),
      },
      {
        key: "title",
        label: "Amenity",
        width: "minmax(200px, 1.4fr)",
        render: (row) => (
          <div className="min-w-0">
            <div className="text-[15px] font-semibold text-stone-800 truncate">
              {row.title}
            </div>
            <div className="text-xs font-mono text-stone-500 truncate mt-0.5">
              slug: {row.slug}
            </div>
            <div className="text-xs text-stone-500 mt-0.5 line-clamp-2">
              {row.description || (
                <span className="text-stone-300 italic">
                  No description
                </span>
              )}
            </div>
          </div>
        ),
      },
      {
        key: "category",
        label: "Category",
        width: "110px",
        render: (row) => (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase ${
              row.category === "home"
                ? "bg-[#e9efe8] text-[#17352d] border border-[#17352d]/15"
                : "bg-[#f2e9e2] text-[#80563e] border border-[#80563e]/15"
            }`}
          >
            {row.category}
          </span>
        ),
      },
      {
        key: "sort",
        label: "Order",
        width: "80px",
        render: (row) => (
          <span className="text-sm font-mono text-stone-700">
            {row.sortOrder}
          </span>
        ),
      },
    ],
    rows: filteredRows,
    emptyState: {
      title: `No ${tab} amenities yet.`,
      description:
        tab === "home"
          ? "Add your first home amenity. It will appear on the home and about pages when published."
          : "Add your first room amenity. It will appear in the Room Amenities section of every accommodation detail page when published.",
      actionLabel: `Add ${tab === "home" ? "Home" : "Room"} Amenity`,
      onAction: () => openAdd(tab),
    },
  };

  const fieldCls =
    "w-full h-11 px-3 rounded-lg bg-white border border-stone-200 focus:border-[#17352d] focus:ring-2 focus:ring-[#17352d]/10 outline-none text-sm text-stone-800";

  return (
    <div className="w-full">
      <div className="mb-5 inline-flex items-center bg-white rounded-xl p-1 border border-stone-200 shadow-2xs">
        {(["home", "room"] as Category[]).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setTab(c)}
            className={`px-4 h-9 rounded-lg text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
              tab === c
                ? "bg-[#17352d] text-white shadow-sm"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            {c === "home" ? "Home Amenities" : "Room Amenities"}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => openAdd("home")}
          className="h-11 px-4 rounded-lg bg-[#17352d] text-white text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#0f302a] transition-colors"
        >
          + Add Home Amenity
        </button>
        <button
          type="button"
          onClick={() => openAdd("room")}
          className="h-11 px-4 rounded-lg bg-[#80563e] text-white text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#69452f] transition-colors"
        >
          + Add Room Amenity
        </button>
      </div>

      <AdminModulePage<AmenityRow> config={moduleConfig} />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 sm:p-8 border border-stone-200 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-4 mb-4 border-b border-stone-200">
              <div>
                <h2 className="font-serif text-2xl text-stone-800">
                  {editing ? "Edit Amenity" : `New ${formData.category === "home" ? "Home" : "Room"} Amenity`}
                </h2>
                <p className="text-xs text-stone-500 mt-1 font-sans">
                  {formData.category === "home"
                    ? "Shown on the home and about property amenities sections."
                    : "Shown on every room detail page under Room Amenities."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditing(null);
                }}
                className="p-2 text-stone-500 hover:text-stone-800 rounded-full hover:bg-stone-100 transition-colors"
                aria-label="Close"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {formErrors.length > 0 && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700 space-y-0.5">
                {formErrors.map((e, i) => (
                  <div key={i}>• {e}</div>
                ))}
              </div>
            )}

            <form onSubmit={submitForm} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                    Category
                  </label>
                  <div className="flex gap-2">
                    {(["home", "room"] as Category[]).map((c) => (
                      <label
                        key={c}
                        className={`flex-1 cursor-pointer rounded-lg border text-center py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                          formData.category === c
                            ? c === "home"
                              ? "bg-[#17352d] text-white border-[#17352d]"
                              : "bg-[#80563e] text-white border-[#80563e]"
                            : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                        }`}
                      >
                        <input
                          type="radio"
                          className="hidden"
                          name="category"
                          value={c}
                          checked={formData.category === c}
                          onChange={(e) => {
                            const cat = e.target.value as Category;
                            setFormData((p) => ({
                              ...p,
                              category: cat,
                              iconKey:
                                (cat === "home"
                                  ? HOME_ICON_OPTIONS
                                  : ROOM_ICON_OPTIONS
                                )[0].value,
                            }));
                          }}
                        />
                        {c === "home" ? "Home" : "Room"}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                    Icon
                  </label>
                  <select
                    className={fieldCls}
                    value={formData.iconKey}
                    onChange={(e) =>
                      setFormData({ ...formData, iconKey: e.target.value })
                    }
                  >
                    {iconOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    className={fieldCls}
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: e.target.value,
                        slug:
                          formData.slug ||
                          formData.slug === ""
                            ? stringToSlug(e.target.value)
                            : formData.slug,
                      })
                    }
                    placeholder="Heated Pool"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                    Slug
                  </label>
                  <input
                    type="text"
                    className={fieldCls}
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        slug: stringToSlug(e.target.value),
                      })
                    }
                    placeholder="auto-from-title"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                  Description
                  <span className="ml-1 text-stone-400 normal-case tracking-normal">
                    (max 255 chars, room amenities can be empty)
                  </span>
                </label>
                <textarea
                  className={`${fieldCls} h-24 py-3 resize-y align-top`}
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Short one-sentence description"
                  maxLength={255}
                />
                <div className="text-[10px] text-stone-400 text-right mt-1 font-mono">
                  {formData.description.length}/255
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                    Sort order
                  </label>
                  <input
                    type="number"
                    className={fieldCls}
                    value={formData.sortOrder}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sortOrder: Number(e.target.value || 0),
                      })
                    }
                  />
                </div>
                <label className="flex items-center gap-3 h-11 px-3 rounded-lg bg-white border border-stone-200 cursor-pointer hover:border-stone-400 transition-colors col-span-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#17352d]"
                    checked={formData.isPublished}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isPublished: e.target.checked,
                      })
                    }
                  />
                  <span className="text-sm font-semibold text-stone-700">
                    Published (visible on public site)
                  </span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-stone-200 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditing(null);
                  }}
                  className="h-10 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider text-stone-600 hover:bg-stone-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="h-10 px-5 rounded-lg bg-[#17352d] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#0f302a] transition-colors disabled:opacity-60"
                >
                  {saving
                    ? "Saving…"
                    : editing
                      ? "Save Changes"
                      : "Create Amenity"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-stone-200 shadow-2xl">
            <h3 className="font-serif text-xl text-stone-800 mb-2">
              Delete amenity?
            </h3>
            <p className="text-sm text-stone-600 mb-5">
              <span className="font-semibold">{confirmDelete.title}</span> (
              {confirmDelete.category}/{confirmDelete.slug}) will be permanently
              removed from the public site and admin list. This cannot be
              undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmDelete(null)}
                className="h-10 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider text-stone-600 hover:bg-stone-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirmDelete}
                className="h-10 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-[60] px-4 h-12 rounded-lg shadow-lg text-white text-sm font-semibold flex items-center gap-2 border border-white/10 ${
            toast.ok ? "bg-[#17352d]" : "bg-red-600"
          }`}
        >
          {toast.ok ? (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
          <span>{toast.msg}</span>
        </div>
      )}
    </div>
  );
}
