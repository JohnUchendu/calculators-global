// Displays a subtle info/tip box below the result card.
// Used to show formula explanations, assumptions, or disclaimers.

interface InfoBoxProps {
  title?: string;
  children: React.ReactNode;
  variant?: "info" | "tip" | "warning";
}

const VARIANTS = {
  info:    { wrapper: "bg-blue-50 border-blue-200",   icon: "ℹ️", title: "text-blue-700",   body: "text-blue-600"   },
  tip:     { wrapper: "bg-green-50 border-green-200", icon: "💡", title: "text-green-700",  body: "text-green-600"  },
  warning: { wrapper: "bg-amber-50 border-amber-200", icon: "⚠️", title: "text-amber-700",  body: "text-amber-600"  },
};

export default function InfoBox({
  title,
  children,
  variant = "info",
}: InfoBoxProps) {
  const v = VARIANTS[variant];

  return (
    <div className={`rounded-xl border p-4 ${v.wrapper}`}>
      <div className="flex items-start gap-2.5">
        <span className="text-base mt-0.5 shrink-0">{v.icon}</span>
        <div>
          {title && (
            <p className={`text-sm font-semibold mb-1 ${v.title}`}>{title}</p>
          )}
          <div className={`text-sm leading-relaxed ${v.body}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}