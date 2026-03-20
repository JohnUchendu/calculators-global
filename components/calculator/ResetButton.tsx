"use client";

interface ResetButtonProps {
  onReset: () => void;
  label?: string;
}

export default function ResetButton({
  onReset,
  label = "Reset",
}: ResetButtonProps) {
  return (
    <button
      type="button"
      onClick={onReset}
      className="
        inline-flex items-center gap-1.5 px-3 py-2 rounded-lg
        text-sm font-medium text-gray-500
        border border-gray-200 bg-white
        hover:bg-gray-50 hover:text-gray-700 hover:border-gray-300
        transition-colors
      "
    >
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      {label}
    </button>
  );
}