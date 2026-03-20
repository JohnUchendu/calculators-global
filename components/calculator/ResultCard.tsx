interface ResultItem {
  label: string;
  value: string;
  highlight?: boolean;   // makes this item the primary/big result
  sublabel?: string;     // small helper text under the value
}

interface ResultCardProps {
  items: ResultItem[];
  title?: string;
}

export default function ResultCard({ items, title }: ResultCardProps) {
  const primary = items.find((i) => i.highlight) ?? items[0];
  const secondary = items.filter((i) => i !== primary);

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl overflow-hidden">
      {title && (
        <div className="px-5 pt-4 pb-0">
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wider">
            {title}
          </p>
        </div>
      )}

      {/* Primary result */}
      <div className="px-5 py-5 border-b border-green-200">
        <p className="text-sm text-green-700 font-medium mb-1">{primary.label}</p>
        <p className="text-4xl font-bold text-green-700 tracking-tight">
          {primary.value}
        </p>
        {primary.sublabel && (
          <p className="text-xs text-green-600 mt-1">{primary.sublabel}</p>
        )}
      </div>

      {/* Secondary results grid */}
      {secondary.length > 0 && (
        <div
          className={`grid divide-x divide-green-200 ${
            secondary.length === 1
              ? "grid-cols-1"
              : secondary.length === 2
              ? "grid-cols-2"
              : secondary.length === 3
              ? "grid-cols-3"
              : "grid-cols-2"
          }`}
        >
          {secondary.map((item) => (
            <div key={item.label} className="px-4 py-3">
              <p className="text-xs text-green-600 mb-0.5 truncate">{item.label}</p>
              <p className="text-base font-semibold text-green-800 truncate">
                {item.value}
              </p>
              {item.sublabel && (
                <p className="text-xs text-green-500 mt-0.5">{item.sublabel}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}