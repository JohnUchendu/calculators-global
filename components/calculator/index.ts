// Barrel export — import everything from "@/components/calculator"
// e.g. import { CalculatorShell, InputField, ResultCard } from "@/components/calculator"

export { default as CalculatorShell }  from "./CalculatorShell";
export { default as CalculatorLayout } from "./CalculatorLayout";
export { default as InputField }       from "./InputField";
export { default as SliderInput }      from "./SliderInput";
export { default as SelectField }      from "./SelectField";
export { default as ResultCard }       from "./ResultCard";
export { default as ResultTable }      from "./ResultTable";
export { default as ResetButton }      from "./ResetButton";
export { default as InfoBox }          from "./InfoBox";

// Re-export types used by ResultTable
export type { TableColumn, TableRow } from "./ResultTable";

// SEO content block
export { default as SeoContent } from "./SeoContent";