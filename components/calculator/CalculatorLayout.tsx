// Two-column layout used by every calculator:
// Left column  → inputs (form fields, sliders)
// Right column → results (ResultCard, ResultTable)
//
// On mobile it stacks vertically (inputs first, results below).

interface CalculatorLayoutProps {
  inputs: React.ReactNode;
  results: React.ReactNode;
  // Optional extra section below both columns (e.g. amortization table)
  below?: React.ReactNode;
}

export default function CalculatorLayout({
  inputs,
  results,
  below,
}: CalculatorLayoutProps) {
  return (
    <div className="space-y-6">
      {/* Two-column section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Inputs panel — 2/5 width on desktop */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-5">
            {inputs}
          </div>
        </div>

        {/* Results panel — 3/5 width on desktop */}
        <div className="lg:col-span-3 space-y-4">
          {results}
        </div>
      </div>

      {/* Below section — full width (amortization tables etc.) */}
      {below && <div>{below}</div>}
    </div>
  );
}