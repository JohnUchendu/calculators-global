"use client";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "number" | "text" | "date";
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;       // e.g. "$"
  suffix?: string;       // e.g. "%", "years"
  placeholder?: string;
  hint?: string;         // small helper text below the input
  disabled?: boolean;
  id?: string;
}

export default function InputField({
  label,
  value,
  onChange,
  type = "number",
  min,
  max,
  step,
  prefix,
  suffix,
  placeholder,
  hint,
  disabled = false,
  id,
}: InputFieldProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      <div className="relative flex items-center">
        {/* Prefix */}
        {prefix && (
          <span className="absolute left-3 text-gray-400 text-sm font-medium pointer-events-none select-none z-10">
            {prefix}
          </span>
        )}

        <input
          id={inputId}
          type={type}
          value={value}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={`
            w-full rounded-lg border border-gray-300 bg-white text-gray-900
            text-sm py-2.5
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
            disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
            ${prefix ? "pl-8" : "pl-3"}
            ${suffix ? "pr-16" : "pr-3"}
          `}
        />

        {/* Suffix */}
        {suffix && (
          <span className="absolute right-3 text-gray-400 text-sm font-medium pointer-events-none select-none">
            {suffix}
          </span>
        )}
      </div>

      {/* Hint text */}
      {hint && (
        <p className="text-xs text-gray-400 mt-0.5">{hint}</p>
      )}
    </div>
  );
}