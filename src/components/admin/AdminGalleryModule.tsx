"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import AdminModulePage, { ModuleConfig } from "./AdminModulePage";
import { apiFetch } from "@/utils/apiClient";
import { normalizeAssetUrl } from "@/utils/mediaUrl";

interface GalleryRow {
  id: string;
  title: string;
  category: string;
  media: "image" | "video";
  layout: "wide" | "standard" | "tall";
  image: string;
  route: string;
  isPublished: boolean;
}

interface GalleryFormData {
  id?: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  description: string;
  media_type: "image" | "video";
  layout: "wide" | "standard" | "tall";
  route: string;
  sort_order: number;
  is_published: boolean;
}

const CATEGORIES = [
  "Rooms",
  "Property",
  "Amenities",
  "Dining",
  "Experiences",
  "Local Area",
];
const LAYOUTS: Array<"wide" | "standard" | "tall"> = [
  "wide",
  "standard",
  "tall",
];
const MEDIA_TYPES: Array<"image" | "video"> = ["image", "video"];

const MAX_BYTES = 5 * 1024 * 1024;

const EMPTY_FORM: GalleryFormData = {
  title: "",
  category: "Rooms",
  image: "",
  alt: "",
  description: "",
  media_type: "image",
  layout: "standard",
  route: "",
  sort_order: 0,
  is_published: true,
};

function bytesText(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}

function rowFromApi(item: any): GalleryRow {
  return {
    id: String(item.id),
    title: item.title,
    category: item.category,
    media: item.mediaType || item.media_type || "image",
    layout: item.layout,
    image: normalizeAssetUrl(item.image),
    route: item.route || "—",
    isPublished: Boolean(item.isPublished ?? item.is_published ?? true),
  };
}

export default function AdminGalleryModule() {
  const [rows, setRows] = useState<GalleryRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [editing, setEditing] = useState<GalleryFormData>(EMPTY_FORM);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<GalleryRow | null>(null);

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

  const loadGallery = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res: any = await apiFetch("/gallery?limit=200&sort=newest", {
        auth: true,
      });
      const items: any[] = res?.data?.items ?? res?.items ?? [];
      setRows(items.map(rowFromApi));
    } catch (err: any) {
      setError(err?.data?.message || err.message || "Failed to load gallery");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGallery();
  }, [loadGallery]);

  useEffect(() => {
    if (!formOpen) {
      setSelectedFile(null);
      setFilePreview(null);
      setFileError(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
    return () => {
      if (filePreview) URL.revokeObjectURL(filePreview);
    };
  }, [formOpen, filePreview]);

  const stats = useMemo(() => {
    const total = rows.length;
    const published = rows.filter((r) => r.isPublished).length;
    const featured = rows.filter(
      (r) => r.layout === "wide" || r.layout === "tall"
    ).length;
    const videos = rows.filter((r) => r.media === "video").length;
    return { total, published, featured, videos };
  }, [rows]);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.title, r.category, r.media, r.layout]
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

  const openEdit = async (row: GalleryRow) => {
    try {
      const res: any = await apiFetch(`/gallery/${row.id}`, { auth: true });
      const it = res?.data ?? res;
      setEditing({
        id: String(it.id),
        title: it.title || "",
        category: it.category || "Rooms",
        image: normalizeAssetUrl(it.image || ""),
        alt: it.alt || "",
        description: it.description || "",
        media_type: it.mediaType || it.media_type || "image",
        layout: it.layout || "standard",
        route: it.route || "",
        sort_order: Number(it.sortOrder ?? it.sort_order ?? 0),
        is_published: Boolean(it.isPublished ?? it.is_published ?? true),
      });
      setIsNew(false);
      setFormOpen(true);
    } catch (err: any) {
      showToast(
        "error",
        err?.data?.message || err.message || "Failed to open edit"
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
        setFilePreview(null);
      }
      return;
    }
    const allowedMime = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "video/mp4",
      "video/webm",
    ];
    const allowedExt = [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
      ".gif",
      ".mp4",
      ".webm",
    ];
    const lowerName = file.name.toLowerCase();
    const extOk = allowedExt.some((ext) => lowerName.endsWith(ext));
    if (!allowedMime.includes(file.type) || !extOk) {
      setFileError(
        "Invalid file type. Allowed: JPG, PNG, WebP, GIF, MP4, WebM."
      );
      setSelectedFile(null);
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
        setFilePreview(null);
      }
      return;
    }
    if (file.size > MAX_BYTES) {
      setFileError(
        `File too large (${bytesText(file.size)}). Maximum size is 5 MB.`
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

    if (!editing.title.trim() || !editing.alt.trim()) {
      showToast("error", "Title and Alt are required.");
      return;
    }
    if (isNew && !selectedFile) {
      setFileError("Please select a file to upload (image or short video).");
      return;
    }
    if (fileError) {
      showToast("error", fileError);
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("title", editing.title.trim());
      fd.append("category", editing.category);
      fd.append("alt", editing.alt.trim());
      fd.append("media_type", editing.media_type);
      fd.append("layout", editing.layout);
      fd.append("sort_order", String(editing.sort_order));
      fd.append("is_published", editing.is_published ? "1" : "0");
      if (editing.description) fd.append("description", editing.description);
      if (editing.route) fd.append("route", editing.route.trim());
      if (selectedFile) fd.append("image", selectedFile);

      if (isNew) {
        await apiFetch("/gallery", {
          auth: true,
          method: "POST",
          body: fd,
        });
        showToast("success", "Gallery item created");
      } else {
        await apiFetch(`/gallery/${editing.id}`, {
          auth: true,
          method: "PUT",
          body: fd,
        });
        showToast("success", "Gallery item updated");
      }
      setFormOpen(false);
      setEditing(EMPTY_FORM);
      loadGallery();
    } catch (err: any) {
      showToast(
        "error",
        err?.data?.message || err.message || "Failed to save gallery item"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePublish = async (row: GalleryRow) => {
    try {
      const res: any = await apiFetch(`/gallery/${row.id}/toggle-publish`, {
        auth: true,
        method: "PATCH",
      });
      showToast(
        "success",
        res?.data?.isPublished
          ? "Gallery item published"
          : "Gallery item unpublished"
      );
      loadGallery();
    } catch (err: any) {
      showToast("error", err?.data?.message || err.message || "Toggle failed");
    }
  };

  const confirmDeleteItem = async () => {
    if (!confirmDelete) return;
    try {
      await apiFetch(`/gallery/${confirmDelete.id}`, {
        auth: true,
        method: "DELETE",
      });
      showToast("success", "Gallery item deleted");
      setConfirmDelete(null);
      loadGallery();
    } catch (err: any) {
      showToast("error", err?.data?.message || err.message || "Delete failed");
    }
  };

  const config: ModuleConfig<GalleryRow> = {
    title: "Gallery",
    description:
      "Upload and organise all gallery imagery and videos. Assign categories, layouts and link to rooms, pages or experiences. Changes publish live to the Gallery page and homepage preview instantly.",
    accentColor: "#80563E",
    accentBg: "bg-[#80563E]/10 text-[#80563E]",
    addLabel: "Upload Media",
    onAdd: openCreate,
    onEdit: (row) => openEdit(row),
    onDelete: (row) => setConfirmDelete(row),
    onTogglePublish: handleTogglePublish,
    showPublishToggle: true,
    hideInfoBanner: true,
    search: {
      value: search,
      onChange: setSearch,
      placeholder: "Search by title, category, layout or media type...",
    },
    stats: [
      { label: "Total Items", value: stats.total, color: "#17352D" },
      { label: "Published", value: stats.published, color: "#52C92D" },
      { label: "Large Layouts", value: stats.featured, color: "#80563E" },
      { label: "Videos", value: stats.videos, color: "#F43F5E" },
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
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008H12V4.5z"
        />
      </svg>
    ),
    loading: loading,
    loadingMessage: "Loading gallery items from the database...",
    error: error,
    columns: [
      {
        key: "image",
        label: "Preview",
        width: "15%",
        render: (row) => (
          <div className="relative w-16 h-12 rounded-md overflow-hidden bg-stone-100 shrink-0 border border-[#D9D0C4]/50">
            {row.media === "video" ? (
              <div className="absolute inset-0 flex items-center justify-center text-[#50544E]">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.7}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
            ) : (
              <Image
                src={row.image}
                alt={row.title}
                fill
                className="object-cover"
                sizes="64px"
              />
            )}
          </div>
        ),
      },
      {
        key: "title",
        label: "Title",
        width: "30%",
        render: (row) => (
          <div>
            <div
              className={`font-semibold font-manrope ${
                row.isPublished
                  ? "text-[#0F302A]"
                  : "text-[#50544E]/60 line-through"
              }`}
            >
              {row.title}
            </div>
            <div className="text-xs text-[#50544E]/60 font-manrope">
              {row.route}
            </div>
          </div>
        ),
      },
      {
        key: "category",
        label: "Category",
        render: (row) => (
          <span className="inline-flex px-2.5 py-1 rounded-full bg-[#17352D]/8 text-[#17352D] text-[11px] font-bold font-manrope">
            {row.category}
          </span>
        ),
      },
      {
        key: "layout",
        label: "Layout",
        render: (row) => (
          <span className="text-xs font-semibold text-[#50544E] uppercase tracking-wider">
            {row.layout}
          </span>
        ),
      },
      {
        key: "media",
        label: "Type",
        render: (row) => (
          <span
            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
              row.media === "video"
                ? "bg-rose-100 text-rose-700"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {row.media.toUpperCase()}
          </span>
        ),
      },
    ],
    rows: filteredRows,
    emptyState: {
      title: "No gallery media yet.",
      description:
        "Add your first photo or video. It will appear on the Gallery page and the home page preview strip.",
      actionLabel: "Upload Media",
      onAction: openCreate,
    },
  };

  const imageToPreview =
    filePreview || (editing.image && !selectedFile ? editing.image : null);
  const mediaTypeSelected =
    editing.media_type || "image";

  function isVideoUrl(url: string | null): boolean {
    if (!url) return false;
    return (
      /\.(mp4|webm)(\?|#.*)?$/i.test(url) || mediaTypeSelected === "video"
    );
  }

  const previewIsVideo =
    selectedFile
      ? selectedFile.type.startsWith("video/")
      : isVideoUrl(imageToPreview);

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
                    {isNew ? "Add Gallery Media" : "Edit Gallery Media"}
                  </h3>
                  <p className="text-sm text-[#50544E]/70 font-manrope mt-1">
                    Upload an image or short video — maximum 5 MB.
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
                      Title *
                    </label>
                    <input
                      type="text"
                      value={editing.title}
                      onChange={(e) =>
                        setEditing({ ...editing, title: e.target.value })
                      }
                      className="w-full h-[46px] px-3.5 rounded-lg border border-[#D9D0C4] bg-white text-[#0F302A] font-manrope text-sm focus:outline-none focus:ring-2 focus:ring-[#80563E]/30 focus:border-[#80563E]"
                      placeholder="Pool & Sun Deck"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#17352D] uppercase tracking-wider mb-1.5 font-manrope">
                      Category *
                    </label>
                    <select
                      value={editing.category}
                      onChange={(e) =>
                        setEditing({ ...editing, category: e.target.value })
                      }
                      className="w-full h-[46px] px-3.5 rounded-lg border border-[#D9D0C4] bg-white text-[#0F302A] font-manrope text-sm focus:outline-none focus:ring-2 focus:ring-[#80563E]/30 focus:border-[#80563E]"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#17352D] uppercase tracking-wider mb-1.5 font-manrope">
                      Layout
                    </label>
                    <select
                      value={editing.layout}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          layout: e.target.value as any,
                        })
                      }
                      className="w-full h-[46px] px-3.5 rounded-lg border border-[#D9D0C4] bg-white text-[#0F302A] font-manrope text-sm focus:outline-none focus:ring-2 focus:ring-[#80563E]/30 focus:border-[#80563E]"
                    >
                      {LAYOUTS.map((l) => (
                        <option key={l} value={l}>
                          {l.charAt(0).toUpperCase() + l.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#17352D] uppercase tracking-wider mb-1.5 font-manrope">
                      Media Type
                    </label>
                    <select
                      value={editing.media_type}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          media_type: e.target.value as any,
                        })
                      }
                      className="w-full h-[46px] px-3.5 rounded-lg border border-[#D9D0C4] bg-white text-[#0F302A] font-manrope text-sm focus:outline-none focus:ring-2 focus:ring-[#80563E]/30 focus:border-[#80563E]"
                    >
                      {MEDIA_TYPES.map((m) => (
                        <option key={m} value={m}>
                          {m.charAt(0).toUpperCase() + m.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#17352D] uppercase tracking-wider mb-1.5 font-manrope">
                      Sort Order
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

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#17352D] uppercase tracking-wider mb-1.5 font-manrope">
                      {isNew ? "Media file *" : "Replace media"}
                    </label>
                    <div className="flex flex-col sm:flex-row sm:items-stretch gap-3">
                      <div className="flex-1">
                        <label className="block w-full h-[46px] px-3.5 rounded-lg border border-dashed border-[#80563E]/50 bg-white text-[#0F302A] font-manrope text-sm hover:border-[#80563E] hover:bg-[#80563E]/5 cursor-pointer transition-colors">
                          <span className="h-full w-full inline-flex items-center gap-2 overflow-hidden">
                            <svg
                              className="w-5 h-5 text-[#80563E] shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth={1.75}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 16.5V9m0 0l-3 3m3-3l3 3M20.25 18.75V7.5A2.25 2.25 0 0018 5.25h-3.879a2.25 2.25 0 01-1.591-.659l-.954-.954A2.25 2.25 0 009.937 3H6A2.25 2.25 0 003.75 5.25v13.5A2.25 2.25 0 006 21h12a2.25 2.25 0 002.25-2.25z"
                              />
                            </svg>
                            <span className="truncate">
                              {selectedFile
                                ? `${selectedFile.name} (${bytesText(selectedFile.size)})`
                                : isNew
                                  ? "Choose file — image or short video (max 5 MB)"
                                  : "Choose a new file (optional)"}
                            </span>
                          </span>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,.jpg,.jpeg,.png,.webp,.gif,.mp4,.webm"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                        {fileError && (
                          <p className="text-xs text-rose-600 font-manrope font-semibold mt-1.5">
                            {fileError}
                          </p>
                        )}
                        {!fileError && (
                          <p className="text-xs text-[#50544E]/60 font-manrope mt-1.5">
                            Formats: JPG, PNG, WebP, GIF, MP4, WebM — up to 5 MB.
                          </p>
                        )}
                      </div>
                      <div className="relative h-[88px] w-[140px] sm:h-[88px] sm:w-[140px] rounded-lg overflow-hidden border border-[#D9D0C4] shrink-0 bg-stone-100">
                        {imageToPreview ? (
                          previewIsVideo ? (
                            <video
                              className="absolute inset-0 w-full h-full object-cover"
                              muted
                              playsInline
                              src={imageToPreview}
                            />
                          ) : (
                            <Image
                              src={imageToPreview}
                              alt="preview"
                              fill
                              className="object-cover"
                              sizes="140px"
                            />
                          )
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-[#8A8478]">
                            <svg
                              className="w-7 h-7"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth={1.6}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#17352D] uppercase tracking-wider mb-1.5 font-manrope">
                      Alt (accessibility) *
                    </label>
                    <input
                      type="text"
                      value={editing.alt}
                      onChange={(e) =>
                        setEditing({ ...editing, alt: e.target.value })
                      }
                      className="w-full h-[46px] px-3.5 rounded-lg border border-[#D9D0C4] bg-white text-[#0F302A] font-manrope text-sm focus:outline-none focus:ring-2 focus:ring-[#80563E]/30 focus:border-[#80563E]"
                      placeholder="Swimming pool and sun loungers under palm trees"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#17352D] uppercase tracking-wider mb-1.5 font-manrope">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={editing.description}
                      onChange={(e) =>
                        setEditing({ ...editing, description: e.target.value })
                      }
                      className="w-full px-3.5 py-3 rounded-lg border border-[#D9D0C4] bg-white text-[#0F302A] font-manrope text-sm focus:outline-none focus:ring-2 focus:ring-[#80563E]/30 focus:border-[#80563E] resize-none"
                      placeholder="Short caption shown on the gallery overlay."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#17352D] uppercase tracking-wider mb-1.5 font-manrope">
                      Link (route or URL)
                    </label>
                    <input
                      type="text"
                      value={editing.route}
                      onChange={(e) =>
                        setEditing({ ...editing, route: e.target.value })
                      }
                      className="w-full h-[46px] px-3.5 rounded-lg border border-[#D9D0C4] bg-white text-[#0F302A] font-manrope text-sm focus:outline-none focus:ring-2 focus:ring-[#80563E]/30 focus:border-[#80563E]"
                      placeholder="/rooms/cove-king"
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
                    {isNew ? "Create Media" : "Save Changes"}
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
                  Delete this gallery item?
                </h3>
                <p className="text-sm font-manrope text-[#50544E]/80 mt-1.5 leading-relaxed">
                  <span className="font-semibold text-[#0F302A]">
                    {confirmDelete.title}
                  </span>{" "}
                  will be permanently removed and will no longer appear on the
                  Gallery page or the home page preview.
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
