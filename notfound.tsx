import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <span className="text-6xl mb-4">🔢</span>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Page not found</h1>
      <p className="text-gray-500 mb-8 max-w-sm">
        The calculator or page you&apos;re looking for doesn&apos;t exist. Head
        back home to browse all tools.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
      >
        ← Back to all calculators
      </Link>
    </div>
  );
}