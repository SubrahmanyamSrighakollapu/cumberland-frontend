"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import AdminModulePage, { ModuleConfig } from "./AdminModulePage";
import { apiFetch } from "@/utils/apiClient";

interface FaqRow {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  isPublished: boolean;
}

interface FaqFormData {
  id?: string;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
  is_published: boolean;
}

const EMPTY_FORM: FaqFormData = {
  question: "",
  answer: "",
  category: "General",
  sort_order: 0,
  is_published: true,
};

function rowFromApi(item: any): FaqRow {
  return {
    id: String(item.id),
    question: item.question,
    answer: item.answer,
    category: item.category || "General",
    sortOrder: Number(item.sortOrder ?? item.sort_order ?? 0),
    isPublished: Boolean(item.isPublished ?? item.is_published ?? true),
  };
}

function firstLine(text: string, max: number = 100): string {
  if (!text) return "—";
  const line = text.split("\n")[0];
  return line.length > max ? line.slice(0, max) + "…" : line;
}

const CATEGORY_COLORS: Record<string, string> = {
  General: "bg-sky-50 text-sky-700 border-sky-100",
  Booking: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Rooms: "bg-violet-50 text-violet-700 border-violet-100",
  Amenities: "bg-amber-50 text-amber-700 border-amber-100",
  Dining: "bg-rose-50 text-rose-700 border-rose-100",
  Policies: "bg-stone-100 text-stone-700 border-stone-200",
  Location: "bg-teal-50 text-teal-700 border-teal-100",
};

function categoryPill(category: string): string {
  return CATEGORY_COLORS[category] || "bg-[#17352D]/8 text-[#17352D] border-transparent";
}

export default function AdminFaqsModule() {
  const [rows, setRows] = useState<FaqRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [editing, setEditing] = useState<FaqFormData>(EMPTY_FORM);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<FaqRow | null>(null);

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
      const res: any = await apiFetch("/faqs?limit=500", {
        auth: false,
      });
      const items: any[] = res?.data?.items ?? res?.items ?? [];
      setRows(items.map(rowFromApi));
    } catch (err: any) {
      setError(err?.data?.message || err.message || "Failed to load FAQs");
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
    const draft = rows.filter((r) => !r.isPublished).length;
    const categories = new Set(rows.map((r) => r.category)).size;
    return { total, published, draft, categories };
  }, [rows]);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.question, r.answer, r.category]
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

  const openEdit = async (row: FaqRow) => {
    try {
      const res: any = await apiFetch(`/faqs/${row.id}`, { auth: true });
      const it = res?.data ?? res;
      setEditing({
        id: String(it.id),
        question: it.question || "",
        answer: it.answer || "",
        category: it.category || "General",
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

    if (!editing.question.trim() || !editing.answer.trim()) {
      showToast("error", "Question and Answer are required.");
      return;
    }

    setSubmitting(true);
    try {
      const body: any = {
        question: editing.question.trim(),
        answer: editing.answer.trim(),
        category: editing.category.trim() || "General",
        sort_order: Number(editing.sort_order),
        is_published: editing.is_published,
      };

      if (isNew) {
        await apiFetch("/faqs", {
          auth: true,
          method: "POST",
          body: JSON.stringify(body),
        });
        showToast("success", "FAQ created");
      } else {
        await apiFetch(`/faqs/${editing.id}`, {
          auth: true,
          method: "PUT",
          body: JSON.stringify(body),
        });
        showToast("success", "FAQ updated");
      }
      setFormOpen(false);
      setEditing(EMPTY_FORM);
      loadData();
    } catch (err: any) {
      showToast("error", err?.data?.message || err.message || "Failed to save FAQ");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePublish = async (row: FaqRow) => {
    try {
      const res: any = await apiFetch(`/faqs/${row.id}/toggle-publish`, {
        auth: true,
        method: "PATCH",
      });
      showToast(
        "success",
        res?.data?.isPublished ?? res?.is_published ? "FAQ published" : "FAQ unpublished"
      );
      loadData();
    } catch (err: any) {
      showToast("error", err?.data?.message || err.message || "Toggle failed");
    }
  };

  const confirmDeleteItem = async () => {
    if (!confirmDelete) return;
    try {
      await apiFetch(`/faqs/${confirmDelete.id}`, {
        auth: true,
        method: "DELETE",
      });
      showToast("success", "FAQ deleted");
      setConfirmDelete(null);
      loadData();
    } catch (err: any) {
      showToast("error", err?.data?.message || err.message || "Delete failed");
    }
  };

  const config: ModuleConfig<FaqRow> = {
    title: "FAQs",
    description:
      "Answers shown on Contact page FAQ section and About page FAQ section. Keep answers concise & actionable.",
    accentColor: "#0EA5E9",
    accentBg: "bg-sky-50 text-sky-700",
    addLabel: "Add FAQ",
    onAdd: openCreate,
    onEdit: (row) => openEdit(row),
    onDelete: (row) => setConfirmDelete(row),
    onTogglePublish: handleTogglePublish,
    showPublishToggle: true,
    hideInfoBanner: true,
    search: {
      value: search,
      onChange: setSearch,
      placeholder: "Search by question, answer, or category…",
    },
    stats: [
      { label: "Total", value: stats.total, color: "#0F302A" },
      { label: "Published", value: stats.published, color: "#52C92D" },
      { label: "Draft", value: stats.draft, color: "#50544E" },
      { label: "Categories", value: stats.categories, color: "#0EA5E9" },
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
          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
        />
      </svg>
    ),
    loading: loading,
    loadingMessage: "Loading FAQs from the database...",
    error: error,
    columns: [
      {
        key: "question",
        label: "Question",
        width: "30%",
        render: (row) => (
          <div
            className={`font-semibold font-manrope text-sm ${
              row.isPublished
                ? "text-[#0F302A]"
                : "text-[#50544E]/60 line-through"
            }`}
            style={{ maxWidth: 340 }}
          >
            {row.question.length > 60
              ? row.question.slice(0, 60) + "…"
              : row.question}
          </div>
        ),
      },
      {
        key: "category",
        label: "Category",
        width: "14%",
        render: (row) => (
          <span
            className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold font-manrope border ${categoryPill(
              row.category
            )}`}
          >
            {row.category}
          </span>
        ),
      },
      {
        key: "answer",
        label: "Answer Preview",
        render: (row) => (
          <div className="text-sm text-[#17352D]/80 font-manrope max-w-lg">
            {firstLine(row.answer, 100)}
          </div>
        ),
      },
      {
        key: "sortOrder",
        label: "Order",
        width: "10%",
        render: (row) => (
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-[#F7F4EE] text-xs font-bold text-[#50544E] font-manrope">
            {row.sortOrder}
          </span>
        ),
      },
    ],
    rows: filteredRows,
    emptyState: {
      title: "No FAQs yet.",
      description:
        "Add the most common guest questions to reduce repeat enquiries.",
      actionLabel: "Add FAQ",
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
                    {isNew ? "Add FAQ" : "Edit FAQ"}
                  </h3>
                  <p className="text-sm text-[#50544E]/70 font-manrope mt-1">
                    Clear, concise answers reduce repeat enquiries.
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
                      Question *
                    </label>
                    <input
                      type="text"
                      value={editing.question}
                      onChange={(e) =>
                        setEditing({ ...editing, question: e.target.value })
                      }
                      className="w-full h-[46px] px-3.5 rounded-lg border border-[#D9D0C4] bg-white text-[#0F302A] font-manrope text-sm focus:outline-none focus:ring-2 focus:ring-[#80563E]/30 focus:border-[#80563E]"
                      placeholder="What time is check-in and check-out?"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#17352D] uppercase tracking-wider mb-1.5 font-manrope">
                      Answer *
                    </label>
                    <textarea
                      rows={6}
                      value={editing.answer}
                      onChange={(e) =>
                        setEditing({ ...editing, answer: e.target.value })
                      }
                      className="w-full px-3.5 py-3 rounded-lg border border-[#D9D0C4] bg-white text-[#0F302A] font-manrope text-sm focus:outline-none focus:ring-2 focus:ring-[#80563E]/30 focus:border-[#80563E] resize-none"
                      placeholder="Check-in is from 2:00 PM onwards, check-out is by 10:00 AM. Early check-in and late check-out may be available on request..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#17352D] uppercase tracking-wider mb-1.5 font-manrope">
                      Category
                    </label>
                    <input
                      type="text"
                      value={editing.category}
                      onChange={(e) =>
                        setEditing({ ...editing, category: e.target.value })
                      }
                      className="w-full h-[46px] px-3.5 rounded-lg border border-[#D9D0C4] bg-white text-[#0F302A] font-manrope text-sm focus:outline-none focus:ring-2 focus:ring-[#80563E]/30 focus:border-[#80563E]"
                      placeholder="General"
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
                    {isNew ? "Create FAQ" : "Save Changes"}
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
                  Delete this FAQ?
                </h3>
                <p className="text-sm font-manrope text-[#50544E]/80 mt-1.5 leading-relaxed">
                  <span className="font-semibold text-[#0F302A]">
                    {confirmDelete.question.length > 50
                      ? confirmDelete.question.slice(0, 50) + "…"
                      : confirmDelete.question}
                  </span>{" "}
                  will be permanently removed from Contact & About FAQ sections.
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
