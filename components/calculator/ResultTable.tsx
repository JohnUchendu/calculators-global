"use client";

import { useState } from "react";

export interface TableColumn {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
  className?: string;
}

export interface TableRow {
  [key: string]: string | number;
}

interface ResultTableProps {
  columns: TableColumn[];
  rows: TableRow[];
  title?: string;
  maxRows?: number;          // rows shown before "show more" — default 12
  stickyHeader?: boolean;
  caption?: string;
}

export default function ResultTable({
  columns,
  rows,
  title,
  maxRows = 12,
  stickyHeader = true,
  caption,
}: ResultTableProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleRows = expanded ? rows : rows.slice(0, maxRows);
  const hasMore = rows.length > maxRows;

  if (rows.length === 0) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      {/* Table header bar */}
      {title && (
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
          <span className="text-xs text-gray-400">{rows.length} rows</span>
        </div>
      )}

      {/* Scrollable table wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {caption && (
            <caption className="sr-only">{caption}</caption>
          )}
          <thead>
            <tr className={`bg-gray-50 border-b border-gray-200 ${stickyHeader ? "sticky top-0 z-10" : ""}`}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap
                    ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"}
                    ${col.className ?? ""}
                  `}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {visibleRows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className="hover:bg-gray-50 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-2.5 text-gray-700 whitespace-nowrap
                      ${col.align === "right" ? "text-right font-medium" : col.align === "center" ? "text-center" : "text-left"}
                      ${col.className ?? ""}
                      ${rowIdx === 0 ? "font-medium" : ""}
                    `}
                  >
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show more / less */}
      {hasMore && (
        <div className="px-5 py-3 border-t border-gray-100 text-center">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            {expanded
              ? "↑ Show less"
              : `↓ Show all ${rows.length} rows`}
          </button>
        </div>
      )}
    </div>
  );
}