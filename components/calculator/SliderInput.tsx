"use client";

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;       // displayed next to the value, e.g. "%" or "yrs"
  formatValue?: (v: number) => string;  // custom display formatter
  hint?: string;
  id?: string;
}

export default function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix = "",
  formatValue,
  hint,
  id,
}: SliderInputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  const pct = ((value - min) / (max - min)) * 100;
  const displayValue = formatValue ? formatValue(value) : `${value}${suffix}`;

  return (
    <div className="flex flex-col gap-1.5">
      {/* Label row */}
      <div className="flex items-center justify-between">
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-md min-w-[52px] text-center">
          {displayValue}
        </span>
      </div>

      {/* Slider */}
      <div className="relative flex items-center h-5">
        {/* Track background */}
        <div className="absolute w-full h-1.5 rounded-full bg-gray-200" />

        {/* Filled track */}
        <div
          className="absolute h-1.5 rounded-full bg-green-500 pointer-events-none"
          style={{ width: `${pct}%` }}
        />

        <input
          id={inputId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="relative w-full h-1.5 appearance-none bg-transparent cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-green-500
            [&::-webkit-slider-thumb]:shadow-sm
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-green-500
            [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>

      {/* Min / max labels */}
      <div className="flex justify-between text-xs text-gray-400">
        <span>{formatValue ? formatValue(min) : `${min}${suffix}`}</span>
        <span>{formatValue ? formatValue(max) : `${max}${suffix}`}</span>
      </div>

      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}