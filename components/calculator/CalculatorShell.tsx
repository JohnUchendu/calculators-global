// "use client";

// import Breadcrumb from "@/components/ui/Breadcrumb";
// import Badge from "@/components/ui/Badge";
// import { type Tool } from "@/lib/constants";

// interface CalculatorShellProps {
//   tool: Tool;
//   children: React.ReactNode;
// }

// export default function CalculatorShell({ tool, children }: CalculatorShellProps) {
//   return (
//     <div className="w-full">
//       {/* Breadcrumb */}
//       <Breadcrumb toolTitle={tool.title} category={tool.category} />

//       {/* Page header */}
//       <div className="mb-6">
//         <div className="flex items-center gap-3 mb-2">
//           <span className="text-3xl">{tool.icon}</span>
//           <div>
//             <div className="flex items-center gap-2 mb-1">
//               <h1 className="text-2xl font-bold text-gray-900">{tool.title}</h1>
//             </div>
//             <Badge category={tool.category} />
//           </div>
//         </div>
//         <p className="text-gray-500 text-sm mt-2 max-w-2xl leading-relaxed">
//           {tool.description}
//         </p>
//       </div>

//       {/* Divider */}
//       <div className="h-px bg-gray-200 mb-6" />

//       {/* Calculator content */}
//       <div>{children}</div>
//     </div>
//   );
// }


"use client";

import Breadcrumb from "@/components/ui/Breadcrumb";
import Badge from "@/components/ui/Badge";
import { type Tool, CATEGORY_COLORS } from "@/lib/constants";

interface CalculatorShellProps {
  tool: Tool;
  children: React.ReactNode;
}

export default function CalculatorShell({ tool, children }: CalculatorShellProps) {
  const colors = CATEGORY_COLORS[tool.category];

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <Breadcrumb toolTitle={tool.title} category={tool.category} />

      {/* Page header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          {/* Icon — styled abbreviation pill, no emoji */}
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colors.bg}`}>
            <span className={`text-xs font-bold tracking-tight ${colors.text}`}>
              {tool.icon}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {tool.title}
            </h1>
            <Badge category={tool.category} />
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-2 max-w-2xl leading-relaxed">
          {tool.description}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 mb-6" />

      {/* Calculator content */}
      <div>{children}</div>
    </div>
  );
}