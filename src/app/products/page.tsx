import { Suspense } from "react";
import ProductCatalog from "@/components/ProductCatalog";
import { Layers, MessageSquare } from "lucide-react";
import { site } from "@/data/site";

export const metadata = {
  title: "Products Catalog | Atlanta Furniture",
  description: "Browse 69+ certified models of Atlanta plastic chairs, office executive seating, student desks, and commercial dustbins.",
};

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f6] text-stone-900">
      {/* Page Header Banner */}
      <section className="relative py-16 lg:py-20 bg-[#faf8f5] text-stone-900 border-b border-stone-200 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 border border-[#0090d0]/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0090d0] mb-4">
              <Layers className="h-3.5 w-3.5" />
              Complete Manufacturer Catalog
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
              Explore Certified <span className="brand-gradient-text">Furniture Collections</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Precision molded from 100% virgin polypropylene and heavy-gauge powder-coated CRCA steel. Filter by category, subcategory, or search individual model specifications.
            </p>
          </div>
        </div>
      </section>

      {/* Catalog Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <Suspense fallback={<div className="py-20 text-center text-stone-500">Loading catalog...</div>}>
          <ProductCatalog showFilters={true} />
        </Suspense>
      </div>

      {/* Direct WhatsApp Assistance Banner */}
      <section className="border-t border-stone-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-stone-900 mb-1">
              Can’t find the exact dimensions or custom RAL colour you require?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              Our injection molding and fabrication units produce tailored custom runs for bulk institutional orders.
            </p>
          </div>

          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md transition shrink-0"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Consult Atlanta Factory Engineers</span>
          </a>
        </div>
      </section>
    </div>
  );
}
