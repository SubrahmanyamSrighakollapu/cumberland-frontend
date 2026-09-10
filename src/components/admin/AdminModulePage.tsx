"use client";

import React from "react";
import Link from "next/link";

export interface TableColumn<T> {
  key: string;
  label: string;
  width?: string;
  render?: (row: T, index: number) => React.ReactNode;
}

export interface StatTile {
  label: string;
  value: number | string;
  color?: string;
}

export interface SearchConfig {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface EmptyStateConfig {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export interface ModuleConfig<T> {
  title: string;
  description: string;
  icon: React.ReactNode;
  addLabel: string;
  addHref?: string;
  emptyMessage?: string;
  accentColor?: string;
  accentBg?: string;
  columns: TableColumn<T>[];
  rows: T[];
  onAdd?: () => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onTogglePublish?: (row: T) => void;
  showPublishToggle?: boolean;
  loading?: boolean;
  loadingMessage?: string;
  error?: string | null;
  search?: SearchConfig;
  stats?: StatTile[];
  emptyState?: EmptyStateConfig;
  hideInfoBanner?: boolean;
  hideAddButton?: boolean;
  hideSharedActionColumn?: boolean;
}

function defaultRender(row: Record<string, unknown>, key: string) {
  const v = row[key];
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (v === null || v === undefined) return "—";
  return String(v);
}

export default function AdminModulePage<T extends { id: string | number; isPublished?: boolean; is_published?: boolean }>({
  config,
}: {
  config: ModuleConfig<T>;
}) {
  const accentColor = config.accentColor || "#80563E";
  const accentBg = config.accentBg || "bg-[#80563E]/10 text-[#80563E]";

  const stats: StatTile[] =
    config.stats && config.stats.length > 0
      ? config.stats
      : [
          { label: "Total Items", value: config.rows.length, color: "#0F302A" },
          {
            label: "Published",
            value: config.rows.filter((r: any) => !(r.isPublished === false || r.is_published === false)).length,
            color: "#52C92D",
          },
          {
            label: "Featured",
            value: config.rows.filter((r: any) => r.featured || r.is_featured).length,
            color: "#80563E",
          },
          {
            label: "Draft",
            value: config.rows.filter((r: any) => r.isPublished === false || r.is_published === false).length,
            color: "#50544E",
          },
        ];

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 sm:p-8 text-white shadow-md"
        style={{ background: `linear-gradient(135deg, #17352D 0%, #0F302A 50%, #17352D 100%)` }}
      >
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-20" style={{ backgroundColor: accentColor }} />
        <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${accentColor}25`, color: "white" }}
            >
              {config.icon}
            </div>
            <div>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-semibold leading-tight">
                {config.title}
              </h2>
              <p className="mt-1.5 text-[#f7f4ee]/70 font-manrope text-sm sm:text-base max-w-2xl leading-relaxed">
                {config.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {!config.hideAddButton && config.addLabel && (config.onAdd ? (
              <button
                type="button"
                onClick={config.onAdd}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-semibold font-manrope transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/40"
                style={{ backgroundColor: accentColor }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                {config.addLabel}
              </button>
            ) : (
              config.addLabel && (
                <Link
                  href={config.addHref || "#"}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-semibold font-manrope transition-colors hover:opacity-90"
                  style={{ backgroundColor: accentColor }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  {config.addLabel}
                </Link>
              )
            ))}
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-white border border-[#D9D0C4]/60 p-4 sm:p-5 hover:shadow-md transition-shadow">
            <div className="text-[11px] text-[#50544E]/60 uppercase tracking-[0.14em] font-bold font-manrope">
              {s.label}
            </div>
            <div className="font-cormorant text-3xl font-bold mt-1" style={{ color: s.color || "#0F302A" }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Search/Filter bar + table */}
      <div className="rounded-2xl bg-white border border-[#D9D0C4]/60 overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 border-b border-[#D9D0C4]/60 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          {config.search ? (
            <div className="relative w-full sm:max-w-md">
              <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#50544E]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                value={config.search.value}
                onChange={(e) => config.search?.onChange(e.target.value)}
                placeholder={config.search.placeholder || `Search ${config.title.toLowerCase()}…`}
                className="w-full h-11 pl-10 pr-4 rounded-lg bg-[#F7F4EE] border border-transparent focus:border-[#80563E]/40 focus:bg-white text-sm font-manrope outline-none transition-all"
              />
            </div>
          ) : (
            <div className="relative w-full sm:max-w-md">
              <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#50544E]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                placeholder={`Search ${config.title.toLowerCase()}…`}
                className="w-full h-11 pl-10 pr-4 rounded-lg bg-[#F7F4EE] border border-transparent focus:border-[#80563E]/40 focus:bg-white text-sm font-manrope outline-none transition-all"
              />
            </div>
          )}
          <div className="flex items-center gap-2 text-xs font-manrope text-[#50544E]/70">
            <span className={`px-2.5 py-1 rounded-full ${accentBg} font-semibold`}>
              {config.rows.length} items
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-x-auto">
          {config.loading ? (
            <div className="p-16 text-center">
              <div
                className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4"
                style={{ backgroundColor: `${accentColor}12`, color: accentColor }}
              >
                <div className="w-6 h-6 border-2 border-current/30 border-t-current rounded-full animate-spin" />
              </div>
              <p className="font-cormorant text-xl font-semibold text-[#0F302A] mb-1">
                Loading…
              </p>
              <p className="text-sm text-[#50544E]/70 font-manrope max-w-sm mx-auto">
                {config.loadingMessage || `Fetching ${config.title.toLowerCase()} from the database.`}
              </p>
            </div>
          ) : config.error ? (
            <div className="p-16 text-center">
              <div
                className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4 bg-rose-50 text-rose-600"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <p className="font-cormorant text-xl font-semibold text-rose-700 mb-1">
                Couldn&apos;t load data
              </p>
              <p className="text-sm text-[#50544E]/70 font-manrope max-w-sm mx-auto">
                {config.error}
              </p>
            </div>
          ) : config.rows.length === 0 ? (
            <div className="p-16 text-center">
              <div
                className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4"
                style={{ backgroundColor: `${accentColor}10`, color: accentColor }}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
              <p className="font-cormorant text-xl font-semibold text-[#0F302A] mb-1">
                {config.emptyState?.title || "Nothing here yet"}
              </p>
              <p className="text-sm text-[#50544E]/70 font-manrope max-w-sm mx-auto mb-5">
                {config.emptyState?.description ||
                  config.emptyMessage ||
                  `Click "${config.addLabel}" to add your first item.`}
              </p>
              {config.emptyState?.actionLabel && config.emptyState?.onAction && (
                <button
                  type="button"
                  onClick={config.emptyState.onAction}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-semibold font-manrope transition-colors hover:opacity-90"
                  style={{ backgroundColor: accentColor }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  {config.emptyState.actionLabel}
                </button>
              )}
            </div>
          ) : (
            <table className="w-full min-w-[760px]">
              <thead>
                <tr className="bg-[#F7F4EE]/50 text-left">
                  {config.columns.map((col) => (
                    <th
                      key={col.key}
                      style={{ width: col.width }}
                      className="px-5 py-3.5 text-[11px] uppercase tracking-[0.12em] text-[#50544E]/60 font-bold font-manrope whitespace-nowrap"
                    >
                      {col.label}
                    </th>
                  ))}
                  {!config.hideSharedActionColumn && (
                    <th className="px-5 py-3.5 text-[11px] uppercase tracking-[0.12em] text-[#50544E]/60 font-bold font-manrope text-right whitespace-nowrap">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {config.rows.map((row, idx) => {
                  const isPublished = !(row.isPublished === false || row.is_published === false);
                  const rawId = (row as any)?.id;
                  const rowKey =
                    rawId !== null && rawId !== undefined && String(rawId) !== ""
                      ? String(rawId)
                      : `row-${idx}`;
                  return (
                    <tr
                      key={rowKey}
                      className={`border-t border-[#D9D0C4]/40 hover:bg-[#F7F4EE]/40 transition-colors ${idx % 2 ? "bg-white" : "bg-[#FAF8F3]/40"}`}
                    >
                      {config.columns.map((col) => (
                        <td
                          key={col.key}
                          className="px-5 py-4 text-sm text-[#17352D] font-manrope align-middle"
                        >
                          {col.render ? col.render(row, idx) : defaultRender(row, col.key)}
                        </td>
                      ))}
                      {!config.hideSharedActionColumn && (
                        <td className="px-5 py-4 text-right align-middle whitespace-nowrap">
                          <div className="inline-flex items-center gap-1">
                            {typeof config.onEdit === "function" && config.onEdit && (
                              <button
                                onClick={() => config.onEdit?.(row)}
                                className="p-2 rounded-md text-[#17352D] hover:bg-[#52c92d]/10 hover:text-[#17352D] transition-colors"
                                title="Edit"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                              </button>
                            )}
                            {typeof config.onDelete === "function" && (
                              <button
                                onClick={() => config.onDelete?.(row)}
                                className="p-2 rounded-md text-[#50544E] hover:bg-red-50 hover:text-red-600 transition-colors"
                                title="Delete"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer bar */}
        {!config.loading && !config.error && config.rows.length > 0 && (
          <div className="px-5 py-3.5 border-t border-[#D9D0C4]/60 flex items-center justify-between text-xs text-[#50544E]/70 font-manrope bg-[#FAF8F3]/30">
            <span>Showing <span className="font-semibold text-[#0F302A]">{config.rows.length}</span> of {config.rows.length} items</span>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1.5 rounded-md border border-[#D9D0C4]/60 hover:bg-white transition-colors disabled:opacity-40" disabled>
                Prev
              </button>
              <span className="px-2.5 py-1.5 rounded-md text-[#0F302A] font-semibold">1</span>
              <button className="px-3 py-1.5 rounded-md border border-[#D9D0C4]/60 hover:bg-white transition-colors disabled:opacity-40" disabled>
                Next
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
