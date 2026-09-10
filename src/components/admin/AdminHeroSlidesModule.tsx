"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import AdminModulePage, { ModuleConfig, StatTile, TableColumn } from "@/components/admin/AdminModulePage";
import { apiFetch } from "@/utils/apiClient";
import { normalizeAssetUrl } from "@/utils/mediaUrl";
import {
  HeroSlideRow,
  fallbackHeroSlides,
  stringToSlug,
} from "@/utils/heroClient";

const MAX_BYTES = 5 * 1024 * 1024;

const ALLOWED_MIME = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
const ALLOWED_EXT = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

interface FormState {
  id: string | null;
  slug: string;
  image: string;
  alt: string;
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  sortOrder: number;
  isPublished: boolean;
}

const EMPTY_FORM: FormState = {
  id: null,
  slug: "",
  image: "",
  alt: "",
  eyebrow: "",
  headingLine1: "",
  headingLine2: "",
  description: "",
  sortOrder: 0,
  isPublished: true,
};

function bytesText(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${bytes} B`;
}

function truncate(s: string, n: number): string {
  if (!s) return "—";
  if (s.length <= n) return s;
  return s.slice(0, n - 1) + "…";
}

export default function AdminHeroSlidesModule() {
  const [rows, setRows] = useState<HeroSlideRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [editing, setEditing] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [confirmDelete, setConfirmDelete] = useState<HeroSlideRow | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const showToast = useCallback(
    (type: "success" | "error", message: string) => {
      setToast({ type, message });
      window.setTimeout(() => setToast(null), 3200);
    },
    []
  );

  const loadRows = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data: any = await apiFetch(
        "/hero-slides?sort=sort_order_asc&limit=200",
        { auth: true }
      );
      const items = Array.isArray(data) ? data : data?.items ?? [];
      const mapped: HeroSlideRow[] = items.map((x: any) => ({
        id: String(x.id),
        slug: x.slug ?? "",
        image: x.image ?? "",
        alt: x.alt ?? "",
        eyebrow: x.eyebrow ?? x.eyebrow ?? "",
        headingLine1: x.headingLine1 ?? x.heading_line_1 ?? "",
        headingLine2: x.headingLine2 ?? x.heading_line_2 ?? "",
        description: x.description ?? "",
        sortOrder: Number(x.sortOrder ?? x.sort_order ?? 0),
        isPublished: !(
          x.isPublished === false ||
          x.isPublished === 0 ||
          x.is_published === false ||
          x.is_published === 0
        ),
        createdAt: x.createdAt ?? x.created_at ?? null,
        updatedAt: x.updatedAt ?? x.updated_at ?? null,
      }));
      setRows(mapped);
    } catch (e: any) {
      setError(e?.message || "Failed to load hero slides.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRows();
  }, [loadRows]);

  const handleAdd = () => {
    setEditing({
      ...EMPTY_FORM,
      sortOrder: rows.length + 1,
      isPublished: true,
    });
    setSelectedFile(null);
    if (filePreview) URL.revokeObjectURL(filePreview);
    setFilePreview(null);
    setFileError(null);
    setFormOpen(true);
  };

  const handleEdit = (row: HeroSlideRow) => {
    setEditing({
      id: row.id,
      slug: row.slug,
      image: row.image,
      alt: row.alt,
      eyebrow: row.eyebrow,
      headingLine1: row.headingLine1,
      headingLine2: row.headingLine2,
      description: row.description,
      sortOrder: row.sortOrder,
      isPublished: row.isPublished,
    });
    setSelectedFile(null);
    if (filePreview) URL.revokeObjectURL(filePreview);
    setFilePreview(null);
    setFileError(null);
    setFormOpen(true);
  };

  const confirmDeleteNow = async () => {
    if (!confirmDelete) return;
    setSubmitting(true);
    try {
      await apiFetch(`/hero-slides/${encodeURIComponent(confirmDelete.id)}`, {
        auth: true,
        method: "DELETE",
      });
      showToast("success", "Hero slide deleted.");
      setConfirmDelete(null);
      loadRows();
    } catch (e: any) {
      showToast("error", e?.message || e?.data?.message || "Failed to delete.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePublish = async (row: HeroSlideRow) => {
    try {
      await apiFetch(
        `/hero-slides/${encodeURIComponent(row.id)}/toggle-publish`,
        { auth: true, method: "PATCH" }
      );
      showToast(
        "success",
        row.isPublished ? "Hero slide unpublished." : "Hero slide published."
      );
      loadRows();
    } catch (e: any) {
      showToast(
        "error",
        e?.message || e?.data?.message || "Failed to toggle publish."
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);
    if (!file) {
      setSelectedFile(null);
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
        setFilePreview(null);
      }
      return;
    }
    const lowerName = file.name.toLowerCase();
    const extOk = ALLOWED_EXT.some((ext) => lowerName.endsWith(ext));
    if (!ALLOWED_MIME.includes(file.type) || !extOk) {
      setFileError("Invalid file type. Allowed: JPG, PNG, WebP, GIF.");
      setSelectedFile(null);
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
        setFilePreview(null);
      }
      return;
    }
    if (file.size > MAX_BYTES) {
      setFileError(
        `File too large (${bytesText(file.size)}). Maximum allowed size is 5 MB.`
      );
      setSelectedFile(null);
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
        setFilePreview(null);
      }
      return;
    }
    setSelectedFile(file);
    const nextPreview = URL.createObjectURL(file);
    if (filePreview) URL.revokeObjectURL(filePreview);
    setFilePreview(nextPreview);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isNew = editing.id === null;

    if (
      !editing.headingLine1.trim() ||
      !editing.headingLine2.trim() ||
      !editing.description.trim()
    ) {
      showToast("error", "Heading 1, Heading 2 and Description are required.");
      return;
    }

    if (isNew && !selectedFile && !editing.image.trim()) {
      setFileError("Please upload a hero image.");
      return;
    }
    if (fileError) {
      showToast("error", fileError);
      return;
    }

    setSubmitting(true);
    try {
      const slug = editing.slug.trim() || stringToSlug(editing.headingLine1);
      const alt = editing.alt.trim() || editing.headingLine1.trim();
      const eyebrow = editing.eyebrow.trim();
      const fd = new FormData();
      fd.append("slug", slug);
      fd.append("alt", alt);
      fd.append("eyebrow", eyebrow);
      fd.append("headingLine1", editing.headingLine1.trim());
      fd.append("headingLine2", editing.headingLine2.trim());
      fd.append("description", editing.description.trim());
      fd.append("sortOrder", String(editing.sortOrder));
      fd.append("isPublished", editing.isPublished ? "1" : "0");
      if (selectedFile) fd.append("image", selectedFile);

      if (isNew) {
        await apiFetch("/hero-slides", {
          auth: true,
          method: "POST",
          body: fd,
        });
        showToast("success", "Hero slide added.");
      } else {
        await apiFetch(`/hero-slides/${encodeURIComponent(editing.id!)}`, {
          auth: true,
          method: "PUT",
          body: fd,
        });
        showToast("success", "Hero slide updated.");
      }
      setFormOpen(false);
      setEditing(EMPTY_FORM);
      if (selectedFile) setSelectedFile(null);
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
        setFilePreview(null);
      }
      setFileError(null);
      loadRows();
    } catch (e: any) {
      showToast(
        "error",
        e?.data?.message || e?.message || "Failed to save hero slide."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.slug.toLowerCase().includes(q) ||
        r.alt.toLowerCase().includes(q) ||
        r.eyebrow.toLowerCase().includes(q) ||
        r.headingLine1.toLowerCase().includes(q) ||
        r.headingLine2.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
    );
  }, [rows, search]);

  const previewImgSrc = filePreview
    ? filePreview
    : editing.image && !selectedFile
      ? normalizeAssetUrl(editing.image)
      : null;

  const stats: StatTile[] = [
    {
      label: "HERO SLIDES",
      value: rows.length,
      color: "#80563E",
    },
    {
      label: "PUBLISHED",
      value: rows.filter((r) => r.isPublished).length,
      color: "#52C92D",
    },
  ];

  const columns: TableColumn<HeroSlideRow>[] = [
    {
      key: "thumb",
      label: "Image",
      width: "w-24",
      render: (row) => (
        <div className="relative h-12 w-20 rounded-md overflow-hidden border border-[#D9D0C4] bg-stone-100 shrink-0">
          {row.image ? (
            <Image
              src={normalizeAssetUrl(row.image)}
              alt={row.alt || row.headingLine1}
              fill
              className="object-cover"
              sizes="80px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-[#8A8478] text-xs">
              No img
            </div>
          )}
        </div>
      ),
    },
    {
      key: "heading",
      label: "Slide content",
      width: "flex-1 min-w-[280px]",
      render: (row) => (
        <div>
          <div className="text-sm font-bold text-[#0F302A] font-manrope">
            {truncate(row.headingLine1, 48)}{" "}
            <span className="font-normal text-[#80563E]">
              {truncate(row.headingLine2, 44)}
            </span>
          </div>
          <div className="text-xs text-[#8A8478] font-manrope mt-1">
            slug: {truncate(row.slug, 32)}
          </div>
          <div className="text-xs text-[#50544E]/80 font-manrope mt-1 line-clamp-2">
            {truncate(row.description, 120)}
          </div>
        </div>
      ),
    },
    {
      key: "sortOrder",
      label: "Order",
      width: "w-20",
      render: (row) => (
        <div className="text-sm font-manrope font-semibold text-[#17352D]">
          {row.sortOrder}
        </div>
      ),
    },
  ];

  const moduleConfig: ModuleConfig<HeroSlideRow> = {
    title: "Home Hero Carousel",
    description:
      "Hero slides appear on the home page. Each slide has its own image + heading (2 lines) + description. Buttons (Check Availability / Explore Rooms) and the 4.8 rating card stay common across all slides.",
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zM12 8.25h.008v.008H12V8.25zm0 3h.008v.008H12v-.008zM8.25 11.25h.008v.008H8.25v-.008zM15.75 11.25h.008v.008h-.008v-.008z" />
      </svg>
    ),
    addLabel: "+ Add Hero Slide",
    accentColor: "#80563E",
    accentBg: "bg-[#80563E]/10 text-[#80563E]",
    stats,
    search: {
      value: search,
      onChange: setSearch,
      placeholder:
        "Search hero slides by heading, description or slug...",
    },
    columns,
    rows: filteredRows,
    loading,
    loadingMessage: "Loading hero slides...",
    error,
    showPublishToggle: true,
    onAdd: handleAdd,
    onEdit: handleEdit,
    onDelete: (row) => setConfirmDelete(row),
    onTogglePublish: handleTogglePublish,
    emptyState: {
      title: "No hero slides yet",
      description:
        "Fallback 3 static hero slides are displayed on the public site. Add your first custom slide above.",
      actionLabel: "+ Add first Hero Slide",
      onAction: handleAdd,
    },
  };

  return (
    <>
      <AdminModulePage config={moduleConfig} />

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
        <div className="fixed inset-0 z-[90] bg-black/50 flex items-center justify-center p-4 sm:p-6">
          <div className="relative bg-white rounded-2xl shadow-2xl border border-[#D9D0C4] w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-[#D9D0C4]/60">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#0F302A]">
                  {editing.id ? "Edit Hero Slide" : "Add Hero Slide"}
                </h2>
              </div>
              <button
                onClick={() => {
                  setFormOpen(false);
                  setEditing(EMPTY_FORM);
                  if (filePreview) URL.revokeObjectURL(filePreview);
                  setFilePreview(null);
                  setSelectedFile(null);
                  setFileError(null);
                }}
                disabled={submitting}
                className="p-2 rounded-lg border border-[#D9D0C4] hover:bg-stone-50 text-[#0F302A] transition-colors disabled:opacity-50"
                title="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-1 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#17352D] uppercase tracking-wider mb-1.5 font-manrope">
                      Hero image *
                    </label>
                    <label className="block w-full h-[46px] px-3.5 rounded-lg border border-dashed border-[#80563E]/50 bg-white text-[#0F302A] font-manrope text-sm hover:border-[#80563E] hover:bg-[#80563E]/5 cursor-pointer transition-colors">
                      <span className="h-full w-full inline-flex items-center gap-2 overflow-hidden">
                        <svg className="w-5 h-5 text-[#80563E] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9m0 0l-3 3m3-3l3 3M20.25 18.75V7.5A2.25 2.25 0 0018 5.25h-3.879a2.25 2.25 0 01-1.591-.659l-.954-.954A2.25 2.25 0 009.937 3H6A2.25 2.25 0 003.75 5.25v13.5A2.25 2.25 0 006 21h12a2.25 2.25 0 002.25-2.25z" />
                        </svg>
                        <span className="truncate">
                          {selectedFile
                            ? `${selectedFile.name} (${bytesText(selectedFile.size)})`
                            : editing.image
                              ? "Choose new image (optional — keeps current)"
                              : "Choose hero image (JPG/PNG/WebP/GIF, ≤ 5MB)"}
                        </span>
                      </span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp,.gif"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    {fileError && (
                      <p className="text-xs text-rose-600 font-manrope font-semibold mt-1.5">
                        {fileError}
                      </p>
                    )}
                  </div>
                  <div className="relative h-[180px] w-full rounded-xl overflow-hidden border border-[#D9D0C4] shrink-0 bg-stone-100">
                    {previewImgSrc ? (
                      <Image
                        src={previewImgSrc}
                        alt="Hero preview"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 320px"
                        priority={false}
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-[#8A8478] gap-2 text-xs font-manrope">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008H12V6z" />
                        </svg>
                        No image preview
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#17352D] uppercase tracking-wider mb-1.5 font-manrope">
                      Heading line 1 *
                    </label>
                    <input
                      value={editing.headingLine1}
                      onChange={(e) => {
                        const v = e.target.value;
                        setEditing({
                          ...editing,
                          headingLine1: v,
                          slug: editing.slug || stringToSlug(v),
                        });
                      }}
                      maxLength={100}
                      placeholder="e.g. Make room for"
                      className="w-full h-[46px] px-3.5 rounded-lg border border-[#D9D0C4] bg-white text-[#0F302A] font-manrope text-sm focus:outline-none focus:ring-2 focus:ring-[#80563E]/30 focus:border-[#80563E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#17352D] uppercase tracking-wider mb-1.5 font-manrope">
                      Heading line 2 *
                    </label>
                    <input
                      value={editing.headingLine2}
                      onChange={(e) =>
                        setEditing({ ...editing, headingLine2: e.target.value })
                      }
                      maxLength={100}
                      placeholder="e.g. the good days."
                      className="w-full h-[46px] px-3.5 rounded-lg border border-[#D9D0C4] bg-white text-[#0F302A] font-manrope text-sm focus:outline-none focus:ring-2 focus:ring-[#80563E]/30 focus:border-[#80563E]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#17352D] uppercase tracking-wider mb-1.5 font-manrope">
                      Description *
                    </label>
                    <textarea
                      value={editing.description}
                      onChange={(e) =>
                        setEditing({ ...editing, description: e.target.value })
                      }
                      rows={4}
                      maxLength={500}
                      placeholder="Short description text shown under the heading."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D9D0C4] bg-white text-[#0F302A] font-manrope text-sm focus:outline-none focus:ring-2 focus:ring-[#80563E]/30 focus:border-[#80563E]"
                    />
                    <p className="mt-1 text-xs text-[#50544E]/60 font-manrope">
                      {editing.description.length}/500 characters
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#17352D] uppercase tracking-wider mb-1.5 font-manrope">
                      Sort order
                    </label>
                    <input
                      type="number"
                      value={editing.sortOrder}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          sortOrder: Number(e.target.value || 0),
                        })
                      }
                      className="w-full h-[46px] px-3.5 rounded-lg border border-[#D9D0C4] bg-white text-[#0F302A] font-manrope text-sm focus:outline-none focus:ring-2 focus:ring-[#80563E]/30 focus:border-[#80563E]"
                    />
                  </div>
                  <div className="flex items-end pb-1">
                    <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
                      <span className="relative inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={editing.isPublished}
                          onChange={(e) =>
                            setEditing({ ...editing, isPublished: e.target.checked })
                          }
                          className="peer sr-only"
                        />
                        <span className="block w-11 h-6 rounded-full bg-stone-200 peer-checked:bg-[#52C92D] transition-colors" />
                        <span className="absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white border border-stone-300 peer-checked:translate-x-5 transition-transform shadow-sm" />
                      </span>
                      <span className="text-sm font-manrope font-semibold text-[#17352D]">
                        Published
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-4 border-t border-[#D9D0C4]/60">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => {
                    setFormOpen(false);
                    setEditing(EMPTY_FORM);
                    if (filePreview) URL.revokeObjectURL(filePreview);
                    setFilePreview(null);
                    setSelectedFile(null);
                    setFileError(null);
                  }}
                  className="h-[46px] px-6 rounded-lg border border-[#D9D0C4] text-[#0F302A] font-manrope text-sm font-semibold hover:bg-stone-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="h-[46px] px-6 rounded-lg bg-[#80563E] hover:bg-[#69452f] text-white font-manrope text-sm font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting
                    ? "Saving..."
                    : editing.id
                      ? "Update Hero Slide"
                      : "Add Hero Slide"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-[90] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-[#D9D0C4] w-full max-w-md p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 shrink-0">
                <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.008v.008H12v-.008zM10.29 3.86L1.82 18a2.25 2.25 0 001.941 3.36h16.477a2.25 2.25 0 001.941-3.36L13.71 3.86a2.25 2.25 0 00-3.42 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-serif font-bold text-[#0F302A]">
                  Delete this hero slide?
                </h3>
                <p className="text-sm text-[#50544E]/80 font-manrope mt-1">
                  Slug{" "}
                  <span className="font-mono text-xs bg-stone-100 px-1.5 py-0.5 rounded">
                    {confirmDelete.slug}
                  </span>{" "}
                  — image file will be removed if uploaded. This action
                  cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setConfirmDelete(null)}
                disabled={submitting}
                className="h-[42px] px-5 rounded-lg border border-[#D9D0C4] text-[#0F302A] font-manrope text-sm font-semibold hover:bg-stone-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteNow}
                disabled={submitting}
                className="h-[42px] px-5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-manrope text-sm font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
              >
                {submitting ? "Deleting..." : "Delete permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
