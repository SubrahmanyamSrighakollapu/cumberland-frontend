"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import AdminModulePage, { ModuleConfig } from "./AdminModulePage";
import { apiFetch } from "@/utils/apiClient";

type InquiryStatus = "new" | "read" | "replied" | "archived";

interface InquiryRow {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  enquiryType: string | null;
  arrivalDate: string | null;
  departureDate: string | null;
  message: string;
  status: InquiryStatus;
  replySent: boolean;
  isSpam: boolean;
  extra: {
    enquiry_type?: string;
    arrival_date?: string;
    departure_date?: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

interface InquiryDetail extends InquiryRow {
  message: string;
}

function rowFromApi(item: any): InquiryRow {
  const ex: any = item.extra && typeof item.extra === "object" ? item.extra : {};
  return {
    id: String(item.id),
    fullName: item.fullName ?? item.full_name ?? item.name ?? "—",
    email: item.email || "",
    phone: item.phone || "",
    subject: item.subject || "—",
    enquiryType:
      item.enquiryType ?? ex.enquiry_type ?? item.enquiry_type ?? null,
    arrivalDate:
      item.arrivalDate ?? ex.arrival_date ?? item.arrival_date ?? null,
    departureDate:
      item.departureDate ?? ex.departure_date ?? item.departure_date ?? null,
    message: item.message || "",
    status: (item.status || "new") as InquiryStatus,
    replySent: Boolean(item.replySent ?? item.reply_sent ?? false),
    isSpam: Boolean(item.isSpam ?? item.is_spam ?? false),
    extra: item.extra || null,
    createdAt: item.createdAt ?? item.created_at ?? "",
    updatedAt: item.updatedAt ?? item.updated_at ?? "",
  };
}

function formatShortDate(iso: string): string {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso.slice(0, 10);
  }
}

function formatFullDateTime(iso: string): string {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function statusStyle(status: InquiryStatus): string {
  switch (status) {
    case "new":
      return "bg-rose-100 text-rose-700 border-rose-200";
    case "read":
      return "bg-sky-100 text-sky-700 border-sky-200";
    case "replied":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "archived":
      return "bg-stone-100 text-stone-600 border-stone-200";
    default:
      return "bg-stone-100 text-stone-600 border-stone-200";
  }
}

function statusLabel(status: InquiryStatus): string {
  switch (status) {
    case "new":
      return "New";
    case "read":
      return "Opened";
    case "replied":
      return "Completed";
    case "archived":
      return "Archived";
    default:
      return String(status);
  }
}

function truncate(str: string, max: number): string {
  if (!str) return "—";
  return str.length > max ? str.slice(0, max) + "…" : str;
}

export default function AdminContactInquiriesModule() {
  const [rows, setRows] = useState<InquiryRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<InquiryRow | null>(null);

  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [detailLoading, setDetailLoading] = useState<boolean>(false);
  const [detail, setDetail] = useState<InquiryDetail | null>(null);

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
      const params = new URLSearchParams({ limit: "200" });
      if (statusFilter && statusFilter !== "all") params.set("status", statusFilter);
      if (search.trim()) params.set("q", search.trim());

      const res: any = await apiFetch(
        `/contact-inquiries?${params.toString()}`,
        { auth: true }
      );
      const items: any[] = res?.data?.items ?? res?.items ?? [];
      setRows(items.map(rowFromApi));
    } catch (err: any) {
      setError(err?.data?.message || err.message || "Failed to load enquiries");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    const t = window.setTimeout(() => {
      loadData();
    }, 250);
    return () => window.clearTimeout(t);
  }, [loadData]);

  const stats = useMemo(() => {
    const total = rows.length;
    const n = rows.filter((r) => r.status === "new").length;
    const completed = rows.filter(
      (r) => r.status === "replied" || r.status === "archived"
    ).length;
    return { total, new: n, completed };
  }, [rows]);

  const openDetail = async (row: InquiryRow) => {
    setDetailId(row.id);
    setDetailOpen(true);
    setDetailLoading(true);
    setDetail(null);
    try {
      const res: any = await apiFetch(`/contact-inquiries/${row.id}`, { auth: true });
      const it = res?.data ?? res;
      const detailed = rowFromApi(it) as InquiryDetail;
      detailed.message = it.message || row.message;
      setDetail(detailed);
      loadData();
    } catch (err: any) {
      showToast("error", err?.data?.message || err.message || "Failed to load enquiry details");
    } finally {
      setDetailLoading(false);
    }
  };

  const updateStatus = async (rowId: string, patch: { status: InquiryStatus }) => {
    try {
      await apiFetch(`/contact-inquiries/${rowId}/status`, {
        auth: true,
        method: "PATCH",
        body: JSON.stringify(patch),
      });
      showToast("success", `Marked ${statusLabel(patch.status)}`);
      if (detailOpen && detailId === rowId && detail) {
        setDetail({ ...detail, status: patch.status });
      }
      loadData();
    } catch (err: any) {
      showToast("error", err?.data?.message || err.message || "Update failed");
    }
  };

  const markComplete = async (rowId: string) => {
    await updateStatus(rowId, { status: "replied" });
  };

  const confirmDeleteItem = async () => {
    if (!confirmDelete) return;
    try {
      await apiFetch(`/contact-inquiries/${confirmDelete.id}`, {
        auth: true,
        method: "DELETE",
      });
      showToast("success", "Enquiry deleted");
      if (detailOpen && detailId === confirmDelete.id) {
        setDetailOpen(false);
        setDetail(null);
        setDetailId(null);
      }
      setConfirmDelete(null);
      loadData();
    } catch (err: any) {
      showToast("error", err?.data?.message || err.message || "Delete failed");
    }
  };

  const statTiles = [
    { label: "Total", value: stats.total, color: "#0F302A" },
    { label: "New", value: stats.new, color: "#F43F5E" },
    { label: "Completed", value: stats.completed, color: "#52C92D" },
  ];

  const config: ModuleConfig<InquiryRow> = {
    title: "Contact Queries",
    description:
      "Messages submitted via the public Contact form. Open a message to read it; click Mark Complete once the guest has been contacted.",
    accentColor: "#52C92D",
    accentBg: "bg-emerald-50 text-emerald-700",
    addLabel: "",
    hideInfoBanner: true,
    hideAddButton: true,
    hideSharedActionColumn: true,
    onDelete: (row) => setConfirmDelete(row),
    search: {
      value: search,
      onChange: setSearch,
      placeholder: "Search name / email / message",
    },
    stats: statTiles,
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
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    ),
    loading: loading,
    loadingMessage: "Loading contact enquiries from the database...",
    error: error,
    columns: [
      {
        key: "createdAt",
        label: "Date Received",
        width: "12%",
        render: (row) => (
          <div>
            <div className="text-sm font-semibold text-[#0F302A] font-manrope">
              {formatShortDate(row.createdAt)}
            </div>
          </div>
        ),
      },
      {
        key: "sender",
        label: "Sender",
        width: "18%",
        render: (row) => (
          <div>
            <div className="font-semibold font-manrope text-[#0F302A]">
              {row.fullName}
            </div>
            <div className="text-xs text-[#50544E]/70 font-manrope mt-0.5 break-all">
              {row.email || "—"}
            </div>
            {row.phone && (
              <div className="text-xs text-[#50544E]/60 font-manrope mt-0.5">
                {row.phone}
              </div>
            )}
          </div>
        ),
      },
      {
        key: "enquiry",
        label: "Enquiry Type",
        width: "16%",
        render: (row) => {
          const et = row.enquiryType || row.subject;
          if (!et) return <span className="text-[#50544E]/50 text-xs">—</span>;
          return (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-[#17352D]/5 text-[#17352D] border border-[#17352D]/10">
              {truncate(et, 40)}
            </span>
          );
        },
      },
      {
        key: "dates",
        label: "Arrival / Departure",
        width: "16%",
        render: (row) => {
          const a = row.arrivalDate || row.extra?.arrival_date;
          const d = row.departureDate || row.extra?.departure_date;
          if (!a && !d) {
            return (
              <span className="text-xs text-[#50544E]/50 font-manrope">—</span>
            );
          }
          return (
            <div className="text-xs font-manrope space-y-0.5 text-[#17352D]">
              {a && (
                <div>
                  <span className="text-[#50544E]/60 font-semibold mr-1">
                    In:
                  </span>
                  <span className="font-bold">{a}</span>
                </div>
              )}
              {d && (
                <div>
                  <span className="text-[#50544E]/60 font-semibold mr-1">
                    Out:
                  </span>
                  <span className="font-bold">{d}</span>
                </div>
              )}
            </div>
          );
        },
      },
      {
        key: "status",
        label: "Status",
        width: "10%",
        render: (row) => (
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold font-manrope border ${statusStyle(
              row.status
            )}`}
          >
            {statusLabel(row.status)}
          </span>
        ),
      },
      {
        key: "message",
        label: "Message",
        render: (row) => (
          <div className="text-sm text-[#17352D]/80 font-manrope line-clamp-1 max-w-xs">
            {truncate(row.message, 90)}
          </div>
        ),
      },
      {
        key: "actions",
        label: "Actions",
        width: "14%",
        render: (row) => {
          const done = row.status === "replied" || row.status === "archived";
          return (
            <div className="inline-flex items-center gap-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openDetail(row);
                }}
                className="p-2 rounded-md border border-[#D9D0C4] bg-white text-[#17352D] hover:bg-stone-50 transition-colors"
                title="View message"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.646C3.434 8.796 7.182 6 12 6s8.566 2.796 9.964 5.677c.098.211.098.435 0 .646C20.566 15.204 16.818 18 12 18s-8.566-2.796-9.964-5.678zM12 15a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
              </button>
              <button
                type="button"
                disabled={done}
                onClick={(e) => {
                  e.stopPropagation();
                  markComplete(row.id);
                }}
                className={`p-2 rounded-md transition-colors ${
                  done
                    ? "bg-stone-100 text-stone-400 border border-stone-200 cursor-default"
                    : "bg-[#52C92D] hover:bg-[#45b624] text-white border border-[#52C92D]"
                }`}
                title={done ? "Already completed" : "Mark Complete"}
              >
                {done ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmDelete(row);
                }}
                className="p-2 rounded-md text-[#50544E] hover:bg-red-50 hover:text-red-600 transition-colors"
                title="Delete"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          );
        },
      },
    ],
    rows: rows,
    emptyState: {
      title: "No enquiries yet.",
      description:
        "Submissions from the public Contact page will appear here.",
    },
  };

  const renderParagraphs = (text: string) => {
    if (!text) return <p className="text-[#50544E]/70 italic">(No message)</p>;
    return text
      .split(/\n{2,}|\n/)
      .filter((p) => p && p.trim())
      .map((p, i) => (
        <p key={i} className="text-[#17352D] font-manrope leading-relaxed mb-3 last:mb-0">
          {p}
        </p>
      ));
  };

  return (
    <>
      <div className="space-y-6">
        <div className="space-y-0">
          <AdminModulePage config={config} />
        </div>
      </div>

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

      {detailOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-[#0F302A]/60 backdrop-blur-sm">
          <div className="w-full max-w-3xl bg-[#F7F4EE] rounded-2xl shadow-2xl border border-[#D9D0C4]/60 max-h-[92vh] overflow-hidden flex flex-col">
            <div className="p-6 sm:p-7 border-b border-[#D9D0C4]/60 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#80563E] font-manrope">
                  Enquiry
                </p>
                <h3 className="font-cormorant text-2xl sm:text-3xl text-[#0F302A] font-semibold mt-1">
                  #{detailId}
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {detail && (
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold font-manrope border ${statusStyle(
                        detail.status
                      )}`}
                    >
                      {statusLabel(detail.status)}
                    </span>
                  )}
                  <span className="text-xs text-[#50544E]/70 font-manrope">
                    Received {formatFullDateTime(detail?.createdAt || "")}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setDetailOpen(false);
                  setDetail(null);
                  setDetailId(null);
                }}
                className="p-2 rounded-lg hover:bg-black/5 text-[#50544E] hover:text-[#0F302A] transition-colors shrink-0"
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

            <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-6">
              {detailLoading ? (
                <div className="py-12 text-center">
                  <div className="w-10 h-10 border-2 border-sky-500/30 border-t-sky-500 rounded-full animate-spin mx-auto" />
                  <p className="text-sm text-[#50544E]/70 font-manrope mt-3">
                    Loading enquiry details…
                  </p>
                </div>
              ) : detail ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-[#50544E]/60 font-bold font-manrope mb-1">
                        Sender
                      </div>
                      <div className="font-cormorant text-xl font-semibold text-[#0F302A]">
                        {detail.fullName}
                      </div>
                      {detail.email && (
                        <a
                          href={`mailto:${detail.email}`}
                          className="block text-sm text-[#0EA5E9] hover:underline font-manrope mt-1"
                        >
                          {detail.email}
                        </a>
                      )}
                      {detail.phone && (
                        <a
                          href={`tel:${detail.phone}`}
                          className="block text-sm text-[#50544E] hover:text-[#0F302A] font-manrope mt-0.5"
                        >
                          {detail.phone}
                        </a>
                      )}
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-[#50544E]/60 font-bold font-manrope mb-1">
                        Subject
                      </div>
                      <div className="font-semibold text-[#0F302A] font-manrope leading-snug">
                        {detail.subject}
                      </div>
                      {(detail.enquiryType ||
                        detail.arrivalDate ||
                        detail.departureDate ||
                        detail.extra?.enquiry_type ||
                        detail.extra?.arrival_date ||
                        detail.extra?.departure_date) && (
                        <div className="mt-3 rounded-lg bg-white border border-[#D9D0C4]/60 p-3 text-xs font-manrope space-y-1.5">
                          {(() => {
                            const et =
                              detail.enquiryType || detail.extra?.enquiry_type;
                            const ad =
                              detail.arrivalDate || detail.extra?.arrival_date;
                            const dd =
                              detail.departureDate ||
                              detail.extra?.departure_date;
                            return (
                              <>
                                {et && (
                                  <div className="flex items-center gap-2">
                                    <span className="text-[#50544E]/60 font-semibold w-28 shrink-0">
                                      Enquiry type:
                                    </span>
                                    <span className="text-[#0F302A] font-bold inline-flex items-center px-2 py-0.5 rounded bg-[#17352D]/5 border border-[#17352D]/10">
                                      {et}
                                    </span>
                                  </div>
                                )}
                                {ad && (
                                  <div className="flex items-center gap-2">
                                    <span className="text-[#50544E]/60 font-semibold w-28 shrink-0">
                                      Arrival:
                                    </span>
                                    <span className="text-[#0F302A] font-bold">
                                      {ad}
                                    </span>
                                  </div>
                                )}
                                {dd && (
                                  <div className="flex items-center gap-2">
                                    <span className="text-[#50544E]/60 font-semibold w-28 shrink-0">
                                      Departure:
                                    </span>
                                    <span className="text-[#0F302A] font-bold">
                                      {dd}
                                    </span>
                                  </div>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-xl bg-white border border-[#D9D0C4]/60 p-5">
                    <div className="text-[11px] uppercase tracking-wider text-[#50544E]/60 font-bold font-manrope mb-3">
                      Message
                    </div>
                    <div className="text-sm">
                      {renderParagraphs(detail.message)}
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-12 text-center text-sm text-rose-600 font-manrope">
                  Couldn&apos;t load enquiry details.
                </div>
              )}
            </div>

            <div className="border-t border-[#D9D0C4]/60 p-5 sm:p-6 flex flex-wrap gap-2 justify-end bg-[#FAF8F3]/60">
              {detail && (
                <>
                  {detail.status !== "replied" && detail.status !== "archived" ? (
                    <button
                      type="button"
                      onClick={() => markComplete(detail.id)}
                      className="h-[42px] px-5 rounded-lg bg-[#52C92D] hover:bg-[#45b624] text-white font-manrope text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Mark Complete
                    </button>
                  ) : (
                    <span className="h-[42px] px-5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 font-manrope text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 select-none">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Completed
                    </span>
                  )}
                  <div className="w-full sm:w-0 h-0 sm:flex-1" />
                  <button
                    type="button"
                    onClick={() => {
                      setConfirmDelete(detail);
                      setDetailOpen(false);
                    }}
                    className="h-[42px] px-4 rounded-lg bg-rose-50 text-rose-700 border border-rose-100 hover:bg-rose-100 font-manrope text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDetailOpen(false);
                      setDetail(null);
                      setDetailId(null);
                    }}
                    className="h-[42px] px-4 rounded-lg text-[#50544E] hover:text-[#0F302A] hover:bg-black/5 font-manrope text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Close
                  </button>
                </>
              )}
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
                  Delete this enquiry?
                </h3>
                <p className="text-sm font-manrope text-[#50544E]/80 mt-1.5 leading-relaxed">
                  Message from{" "}
                  <span className="font-semibold text-[#0F302A]">
                    {confirmDelete.fullName}
                  </span>{" "}
                  with subject{" "}
                  <span className="italic">
                    “
                    {confirmDelete.subject.length > 40
                      ? confirmDelete.subject.slice(0, 40) + "…"
                      : confirmDelete.subject}
                    ”
                  </span>{" "}
                  will be permanently removed.
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
