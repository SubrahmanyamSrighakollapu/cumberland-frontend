"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import AdminModulePage, { ModuleConfig } from "./AdminModulePage";
import { apiFetch } from "@/utils/apiClient";

interface TestimonialRow {
  id: string;
  name: string;
  dateText: string | null;
  rating: number;
  quote: string;
  avatar: string;
  avatarAlt: string;
  isFeatured: boolean;
  sortOrder: number;
  isPublished: boolean;
}

interface TestimonialFormData {
  id?: string;
  name: string;
  date_text: string | null;
  rating: number;
  quote: string;
  avatar: string;
  avatar_alt: string;
  is_featured: boolean;
  sort_order: number;
  is_published: boolean;
}

const EMPTY_FORM: TestimonialFormData = {
  name: "",
  date_text: null,
  rating: 5,
  quote: "",
  avatar: "",
  avatar_alt: "",
  is_featured: false,
  sort_order: 0,
  is_published: true,
};

function rowFromApi(item: any): TestimonialRow {
  return {
    id: String(item.id),
    name: item.name,
    dateText: item.dateText ?? item.date_text ?? null,
    rating: Number(item.rating ?? 5),
    quote: item.quote,
    avatar: item.avatar || "",
    avatarAlt: item.avatarAlt || item.avatar_alt || "",
    isFeatured: Boolean(item.isFeatured ?? item.is_featured ?? false),
    sortOrder: Number(item.sortOrder ?? item.sort_order ?? 0),
    isPublished: Boolean(item.isPublished ?? item.is_published ?? true),
  };
}

function StarRow({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const dim = size === "lg" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          className={`${dim} ${n <= rating ? "text-yellow-400" : "text-stone-200"}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l2.917 6.28L22 9.27l-5.25 4.79L18.334 22 12 18.27 5.666 22l1.584-7.94L2 9.27l7.083-.99L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`p-1 rounded-md transition-colors ${
            n <= value ? "text-yellow-400 hover:bg-yellow-50" : "text-stone-200 hover:bg-stone-50 hover:text-stone-400"
          }`}
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l2.917 6.28L22 9.27l-5.25 4.79L18.334 22 12 18.27 5.666 22l1.584-7.94L2 9.27l7.083-.99L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

export default function AdminTestimonialsModule() {
  const [rows, setRows] = useState<TestimonialRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [editing, setEditing] = useState<TestimonialFormData>(EMPTY_FORM);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<TestimonialRow | null>(null);

  const showToast = useCallback(
    (type: "success" | "error", message: string) => {
      setToast({ type, message });
      window.setTimeout(() => setToast(null), 3200);
    },
    []
  );

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res: any = await apiFetch("/testimonials?limit=200", {
        auth: false,
      });
      const items: any[] = res?.data?.items ?? res?.items ?? [];
      setRows(items.map(rowFromApi));
    } catch (err: any) {
      setError(err?.data?.message || err.message || "Failed to load testimonials");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const stats = useMemo(() => {
    const total = rows.length;
    const published = rows.filter((r) => r.isPublished).length;
    const featured = rows.filter((r) => r.isFeatured).length;
    const draft = rows.filter((r) => !r.isPublished).length;
    return { total, published, featured, draft };
  }, [rows]);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.name, r.quote, r.dateText || ""]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [rows, search]);

  const openCreate = () => {
    setEditing({ ...EMPTY_FORM });
    setIsNew(true);
    setFormOpen(true);
  };

  const openEdit = async (row: TestimonialRow) => {
    try {
      const res: any = await apiFetch(`/testimonials/${row.id}`, { auth: true });
      const it = res?.data ?? res;
      setEditing({
        id: String(it.id),
        name: it.name || "",
        date_text: it.dateText ?? it.date_text ?? null,
        rating: Number(it.rating ?? 5),
        quote: it.quote || "",
        avatar: it.avatar || "",
        avatar_alt: it.avatarAlt || it.avatar_alt || "",
        is_featured: Boolean(it.isFeatured ?? it.is_featured ?? false),
        sort_order: Number(it.sortOrder ?? it.sort_order ?? 0),
        is_published: Boolean(it.isPublished ?? it.is_published ?? true),
      });
      setIsNew(false);
      setFormOpen(true);
    } catch (err: any) {
      showToast("error", err?.data?.message || err.message || "Failed to open edit");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editing.name.trim() || !editing.quote.trim()) {
      showToast("error", "Name and Quote are required.");
      return;
    }

    setSubmitting(true);
    try {
      const body: any = {
        name: editing.name.trim(),
        date_text: editing.date_text && editing.date_text.trim() ? editing.date_text.trim() : null,
        rating: Number(editing.rating),
        quote: editing.quote.trim(),
        avatar: editing.avatar.trim() || null,
        avatar_alt: editing.avatar_alt.trim() || null,
        is_featured: editing.is_featured,
        sort_order: Number(editing.sort_order),
        is_published: editing.is_published,
      };

      if (isNew) {
        await apiFetch("/testimonials", {
          auth: true,
          method: "POST",
          body: JSON.stringify(body),
        });
        showToast("success", "Testimonial created");
      } else {
        await apiFetch(`/testimonials/${editing.id}`, {
          auth: true,
          method: "PUT",
          body: JSON.stringify(body),
        });
        showToast("success", "Testimonial updated");
      }
      setFormOpen(false);
      setEditing(EMPTY_FORM);
      loadData();
    } catch (err: any) {
      showToast("error", err?.data?.message || err.message || "Failed to save testimonial");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePublish = async (row: TestimonialRow) => {
    try {
      const res: any = await apiFetch(`/testimonials/${row.id}/toggle-publish`, {
        auth: true,
        method: "PATCH",
      });
      showToast(
        "success",
        res?.data?.isPublished ?? res?.is_published ? "Testimonial published" : "Testimonial unpublished"
      );
      loadData();
    } catch (err: any) {
      showToast("error", err?.data?.message || err.message || "Toggle failed");
    }
  };

  const handleToggleFeatured = async (row: TestimonialRow) => {
    try {
      const res: any = await apiFetch(`/testimonials/${row.id}/toggle-featured`, {
        auth: true,
        method: "PATCH",
      });
      showToast(
        "success",
        res?.data?.isFeatured ?? res?.is_featured ? "Marked as featured" : "Removed from featured"
      );
      loadData();
    } catch (err: any) {
      showToast("error", err?.data?.message || err.message || "Toggle featured failed");
    }
  };

  const confirmDeleteItem = async () => {
    if (!confirmDelete) return;
    try {
      await apiFetch(`/testimonials/${confirmDelete.id}`, {
        auth: true,
        method: "DELETE",
      });
      showToast("success", "Testimonial deleted");
      setConfirmDelete(null);
      loadData();
    } catch (err: any) {
      showToast("error", err?.data?.message || err.message || "Delete failed");
    }
  };

  const config: ModuleConfig<TestimonialRow> = {
    title: "Testimonials",
    description:
      "Manage guest reviews shown on Home page, About page, and room pages",
    accentColor: "#D97706",
    accentBg: "bg-amber-50 text-amber-700",
    addLabel: "Add Testimonial",
    onAdd: openCreate,
    onEdit: (row) => openEdit(row),
    onDelete: (row) => setConfirmDelete(row),
    onTogglePublish: handleTogglePublish,
    showPublishToggle: true,
    hideInfoBanner: true,
    search: {
      value: search,
      onChange: setSearch,
      placeholder: "Search by name, quote, or date…",
    },
    stats: [
      { label: "Total", value: stats.total, color: "#0F302A" },
      { label: "Published", value: stats.published, color: "#52C92D" },
      { label: "Featured", value: stats.featured, color: "#D97706" },
      { label: "Draft", value: stats.draft, color: "#50544E" },
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
          d="M20.483 15.341a8.963 8.963 0 01-3.659 2.715m0 0a8.947 8.947 0 01-4.824.897c-1.754-.086-3.443-.596-4.824-1.474M16.824 18.056c-.353 1.153-1.007 2.188-1.87 3.044M16.824 18.056c1.712.287 3.43-.089 4.834-1.058m0 0c.99-.676 1.767-1.619 2.253-2.713M21.658 14.285a24.325 24.325 0 00-1.175-5.289 22.65 22.65 0 00-2.23-5.218m-5.218 12.759c-.32-1.095-.279-2.242.118-3.326.21-.585.545-1.136.994-1.631M10.053 8.087c-.656.008-1.309-.09-1.937-.294a6.638 6.638 0 01-2.543-1.41 6.578 6.578 0 01-1.85-3.02m6.33 4.724c.046-.66-.055-1.319-.299-1.94a6.618 6.618 0 00-1.407-2.54 6.57 6.57 0 00-3.022-1.848M12.92 6.825a8.962 8.962 0 00-3.647-2.707"
        />
      </svg>
    ),
    loading: loading,
    loadingMessage: "Loading testimonials from the database...",
    error: error,
    columns: [
      {
        key: "avatar",
        label: "Avatar",
        width: "10%",
        render: (row) => (
          <div className="relative w-9 h-9 rounded-full overflow-hidden bg-stone-100 shrink-0 border border-[#D9D0C4]/50">
            {row.avatar ? (
              <img
                src={row.avatar}
                alt={row.avatarAlt || row.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#8A8478] bg-stone-100">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12zm0 2.25c-3.75 0-9 1.875-9 5.625V21h18v-1.125c0-3.75-5.25-5.625-9-5.625z" />
                </svg>
              </div>
            )}
          </div>
        ),
      },
      {
        key: "name",
        label: "Name",
        width: "22%",
        render: (row) => (
          <div>
            <div
              className={`font-semibold font-manrope ${
                row.isPublished
                  ? "text-[#0F302A]"
                  : "text-[#50544E]/60 line-through"
              }`}
            >
              {row.name}
            </div>
            <div className="text-xs text-[#50544E]/60 font-manrope mt-0.5">
              {row.dateText || "—"}
            </div>
          </div>
        ),
      },
      {
        key: "rating",
        label: "Rating",
        width: "15%",
        render: (row) => <StarRow rating={row.rating} />,
      },
      {
        key: "isFeatured",
        label: "Featured",
        render: (row) =>
          row.isFeatured ? (
            <button
              type="button"
              onClick={() => handleToggleFeatured(row)}
              className="inline-flex px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold font-manrope border border-amber-200 hover:bg-amber-100 transition-colors"
              title="Click to unfeature"
            >
              ★ Featured
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleToggleFeatured(row)}
              className="inline-flex px-2.5 py-1 rounded-full bg-stone-50 text-stone-500 text-[11px] font-bold font-manrope border border-stone-200 hover:bg-stone-100 transition-colors"
              title="Click to feature"
            >
              — Standard
            </button>
          ),
      },
      {
        key: "quote",
        label: "Quote",
        render: (row) => (
          <div className="text-sm text-[#17352D] font-manrope line-clamp-2 max-w-md">
            <span className="text-[#80563E]">“</span>
            {row.quote.length > 90 ? row.quote.slice(0, 90) + "…" : row.quote}
            <span className="text-[#80563E]">”</span>
          </div>
        ),
      },
    ],
    rows: filteredRows,
    emptyState: {
      title: "No testimonials yet.",
      description:
        "Add your first guest review to display on Home & About sections.",
      actionLabel: "Add Testimonial",
      onAction: openCreate,
    },
  };

  return (
    <>
      <AdminModulePage config={config} />

      {toast && (
        <div className="fixed bottom-6 right-6 z-[100]">
          <div
            className={`rounded-xl shadow-2xl px-4 py-3 font-manrope text-sm font-semibold border ${
              toast.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-rose-50 border-rose-200 text-rose-800"
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}

      {formOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-[#0F302A]/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#F7F4EE] rounded-2xl shadow-2xl border border-[#D9D0C4]/60 max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="font-cormorant text-2xl sm:text-3xl text-[#0F302A] font-semibold">
                    {isNew ? "Add Testimonial" : "Edit Testimonial"}
                  </h3>
                  <p className="text-sm text-[#50544E]/70 font-manrope mt-1">
                    Share a happy guest&apos;s experience.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="p-2 rounded-lg hover:bg-black/5 text-[#50544E] hover:text-[#0F302A] transition-colors"
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

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#17352D] uppercase tracking-wider mb-1.5 font-manrope">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={editing.name}
                      onChange={(e) =>
                        setEditing({ ...editing, name: e.target.value })
                      }
                      className="w-full h-[46px] px-3.5 rounded-lg border border-[#D9D0C4] bg-white text-[#0F302A] font-manrope text-sm focus:outline-none focus:ring-2 focus:ring-[#80563E]/30 focus:border-[#80563E]"
                      placeholder="Jane Thompson"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#17352D] uppercase tracking-wider mb-1.5 font-manrope">
                      Date text
                    </label>
                    <input
                      type="text"
                      value={editing.date_text || ""}
                      onChange={(e) =>
                        setEditing({ ...editing, date_text: e.target.value || null })
                      }
                      className="w-full h-[46px] px-3.5 rounded-lg border border-[#D9D0C4] bg-white text-[#0F302A] font-manrope text-sm focus:outline-none focus:ring-2 focus:ring-[#80563E]/30 focus:border-[#80563E]"
                      placeholder="April 2025"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#17352D] uppercase tracking-wider mb-1.5 font-manrope">
                      Rating
                    </label>
                    <div className="h-[46px] flex items-center">
                      <StarPicker
                        value={editing.rating}
                        onChange={(n) => setEditing({ ...editing, rating: n })}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#17352D] uppercase tracking-wider mb-1.5 font-manrope">
                      Quote *
                    </label>
                    <textarea
                      rows={4}
                      value={editing.quote}
                      onChange={(e) =>
                        setEditing({ ...editing, quote: e.target.value })
                      }
                      className="w-full px-3.5 py-3 rounded-lg border border-[#D9D0C4] bg-white text-[#0F302A] font-manrope text-sm focus:outline-none focus:ring-2 focus:ring-[#80563E]/30 focus:border-[#80563E] resize-none"
                      placeholder="Our stay was absolutely magical. The room was beautiful and the staff were incredible..."
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#17352D] uppercase tracking-wider mb-1.5 font-manrope">
                      Avatar URL
                    </label>
                    <input
                      type="text"
                      value={editing.avatar}
                      onChange={(e) =>
                        setEditing({ ...editing, avatar: e.target.value })
                      }
                      className="w-full h-[46px] px-3.5 rounded-lg border border-[#D9D0C4] bg-white text-[#0F302A] font-manrope text-sm focus:outline-none focus:ring-2 focus:ring-[#80563E]/30 focus:border-[#80563E]"
                      placeholder="https://.../avatar.jpg"
                    />
                    <p className="text-xs text-[#50544E]/60 font-manrope mt-1.5">
                      Paste a public image URL. File uploader coming soon.
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#17352D] uppercase tracking-wider mb-1.5 font-manrope">
                      Avatar Alt
                    </label>
                    <input
                      type="text"
                      value={editing.avatar_alt}
                      onChange={(e) =>
                        setEditing({ ...editing, avatar_alt: e.target.value })
                      }
                      className="w-full h-[46px] px-3.5 rounded-lg border border-[#D9D0C4] bg-white text-[#0F302A] font-manrope text-sm focus:outline-none focus:ring-2 focus:ring-[#80563E]/30 focus:border-[#80563E]"
                      placeholder="Photo of Jane Thompson"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#17352D] uppercase tracking-wider mb-1.5 font-manrope">
                      Sort order
                    </label>
                    <input
                      type="number"
                      value={editing.sort_order}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          sort_order: Number(e.target.value),
                        })
                      }
                      className="w-full h-[46px] px-3.5 rounded-lg border border-[#D9D0C4] bg-white text-[#0F302A] font-manrope text-sm focus:outline-none focus:ring-2 focus:ring-[#80563E]/30 focus:border-[#80563E]"
                    />
                  </div>

                  <div className="flex items-end">
                    <div
                      className="flex items-center gap-2 cursor-pointer select-none pb-2"
                      onClick={() =>
                        setEditing({
                          ...editing,
                          is_featured: !editing.is_featured,
                        })
                      }
                    >
                      <div
                        className={`w-10 h-6 rounded-full p-0.5 transition-colors ${
                          editing.is_featured
                            ? "bg-amber-500"
                            : "bg-[#8A8478]/40"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                            editing.is_featured ? "translate-x-4" : ""
                          }`}
                        />
                      </div>
                      <span className="text-sm font-manrope font-semibold text-[#0F302A]">
                        {editing.is_featured ? "Featured on home" : "Standard testimonial"}
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-2 flex items-center justify-between gap-4 pt-1">
                    <div
                      className="flex items-center gap-2 cursor-pointer select-none"
                      onClick={() =>
                        setEditing({
                          ...editing,
                          is_published: !editing.is_published,
                        })
                      }
                    >
                      <div
                        className={`w-10 h-6 rounded-full p-0.5 transition-colors ${
                          editing.is_published
                            ? "bg-[#52C92D]"
                            : "bg-[#8A8478]/40"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                            editing.is_published ? "translate-x-4" : ""
                          }`}
                        />
                      </div>
                      <span className="text-sm font-manrope font-semibold text-[#0F302A]">
                        {editing.is_published
                          ? "Published on live site"
                          : "Draft (hidden from visitors)"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-[#D9D0C4]/60">
                  <button
                    type="button"
                    onClick={() => setFormOpen(false)}
                    className="h-[46px] px-5 rounded-lg font-manrope text-xs font-bold uppercase tracking-wider text-[#50544E] hover:text-[#0F302A] hover:bg-black/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="h-[46px] px-6 rounded-lg bg-[#80563E] hover:bg-[#69452F] disabled:opacity-70 disabled:cursor-not-allowed text-white font-manrope text-xs font-bold uppercase tracking-wider shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    {submitting && (
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    )}
                    {isNew ? "Create Testimonial" : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-[#0F302A]/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#D9D0C4]/60 p-6">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-rose-100 text-rose-700 shrink-0 flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-cormorant text-xl font-semibold text-[#0F302A]">
                  Delete this testimonial?
                </h3>
                <p className="text-sm font-manrope text-[#50544E]/80 mt-1.5 leading-relaxed">
                  <span className="font-semibold text-[#0F302A]">
                    {confirmDelete.name}
                  </span>
                  {"'s review will be permanently removed from Home, About and room pages."}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setConfirmDelete(null)}
                className="h-[44px] px-5 rounded-lg font-manrope text-xs font-bold uppercase tracking-wider text-[#50544E] hover:text-[#0F302A] hover:bg-black/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteItem}
                className="h-[44px] px-5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-manrope text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Yes, delete permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
