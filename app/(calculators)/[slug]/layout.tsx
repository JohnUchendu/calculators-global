import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex gap-10">
          <Sidebar />

          {/* Calculator content — white card matching blog article style */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
              {children}
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}