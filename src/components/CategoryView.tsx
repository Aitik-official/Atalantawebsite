"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  Search, 
  X, 
  ShieldCheck, 
  Sparkles, 
  Phone, 
  MessageSquare, 
  CheckCircle2
} from "lucide-react";
import { ProductItem, site } from "@/data/site";
import ProductCard from "./ProductCard";
import ProductQuickViewModal from "./ProductQuickViewModal";
import { useCatalog } from "./CatalogProvider";

interface CategoryViewProps {
  categorySlug: string;
  subcategorySlug?: string;
}

export default function CategoryView({ categorySlug, subcategorySlug }: CategoryViewProps) {
  const { findCategory, findSubcategory, productsFor, ready } = useCatalog();
  const category = findCategory(categorySlug);
  const currentSub = subcategorySlug ? findSubcategory(categorySlug, subcategorySlug) : null;
  
  const [selectedSub, setSelectedSub] = useState<string>(subcategorySlug || "all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "name">("featured");
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);

  const subcategories = category?.subcategories || [];

  const productsList = useMemo(() => {
    let prods = productsFor(categorySlug, selectedSub === "all" ? undefined : selectedSub);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      prods = prods.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.specifications && Object.values(p.specifications).some((v) => v.toLowerCase().includes(q)))
      );
    }

    if (sortBy === "price-asc") {
      prods = [...prods].sort((a, b) => a.priceNumber - b.priceNumber);
    } else if (sortBy === "price-desc") {
      prods = [...prods].sort((a, b) => b.priceNumber - a.priceNumber);
    } else if (sortBy === "name") {
      prods = [...prods].sort((a, b) => a.title.localeCompare(b.title));
    }

    return prods;
  }, [categorySlug, selectedSub, searchQuery, sortBy, productsFor]);

  if (!category && !ready) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center text-slate-500">
        Loading collection...
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Category Not Found</h2>
        <p className="text-slate-500 mb-6">The requested furniture category does not exist.</p>
        <Link
          href="/products"
          className="rounded-xl bg-[#0090d0] px-6 py-2.5 text-xs font-bold uppercase text-white shadow"
        >
          View Full Catalog
        </Link>
      </div>
    );
  }

  const activeSubTitle = currentSub ? currentSub.name : (selectedSub !== "all" ? subcategories.find(s => s.slug === selectedSub)?.name : null);
  const pageTitle = activeSubTitle ? `${activeSubTitle} · ${category.shortName}` : category.name;
  const pageDescription = currentSub?.desc || `Explore Atlanta's certified range of ${category.shortName.toLowerCase()} engineered with 100% virgin raw materials, ergonomic standards, and lifelong durability.`;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      {/* Breadcrumb Bar */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-sm py-3 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex items-center flex-wrap gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0090d0] transition">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          
          <Link 
            href={category.href} 
            className={`hover:text-[#0090d0] transition ${!activeSubTitle ? "text-[#0090d0] font-bold" : ""}`}
          >
            {category.name}
          </Link>

          {activeSubTitle && (
            <>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-[#0090d0] font-bold">
                {activeSubTitle}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Hero Category Banner */}
      <section className="relative py-12 lg:py-16 bg-gradient-to-b from-sky-50/50 via-white to-slate-50 border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0090d0_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 border border-[#0090d0]/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0090d0] mb-3 shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-[#0090d0]" />
                Atlanta Factory Collection · {category.shortName}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-3 uppercase">
                {pageTitle}
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                {pageDescription}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 shadow-xs">
                  <ShieldCheck className="h-4 w-4 text-[#0090d0]" />
                  100% Virgin Grade Materials
                </span>
                <span className="flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 shadow-xs">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Direct Factory Wholesale Pricing
                </span>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm max-w-sm shrink-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0090d0] block mb-1">
                Institutional & Bulk RFQ
              </span>
              <h4 className="text-base font-bold text-slate-900 mb-2">
                Need Bulk Pricing or Custom Colors?
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                Instant technical assistance, custom RAL polymer shades, and school/office turnkey quotations.
              </p>
              
              <div className="flex flex-col gap-2">
                <a
                  href={`${site.whatsapp}&text=Hello%20Atlanta%20Furniture,%20I%20am%20inquiring%20about%20${encodeURIComponent(pageTitle)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Chat on WhatsApp</span>
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0090d0] hover:bg-[#0073ab] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition uppercase"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Request Official Quote</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12 w-full">
        {/* Search & Sort Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder={`Search models in ${pageTitle}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-8 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-[#0090d0] focus:bg-white focus:outline-none transition shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-xs text-slate-500 font-medium">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-xl border border-slate-300 bg-white py-2 px-3 text-xs font-semibold text-slate-800 focus:border-[#0090d0] focus:outline-none cursor-pointer shadow-xs"
            >
              <option value="featured">Featured Sequence</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Model Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {productsList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {productsList.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center my-8 shadow-xs">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 text-[#0090d0] mb-3">
              <Search className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              No specific models found matching "{searchQuery}"
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Clear your search or browse all models in {category.shortName}.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedSub("all");
              }}
              className="mt-4 rounded-xl bg-[#0090d0] px-4 py-2 text-xs font-bold uppercase text-white hover:bg-[#0073ab] transition"
            >
              Reset Search Filter
            </button>
          </div>
        )}
      </section>

      {/* Technical Specifications & Material Assurance Banner */}
      <section className="border-t border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-6">
              <div className="h-10 w-10 rounded-xl bg-sky-100/80 flex items-center justify-center text-[#0090d0] mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">
                100% Virgin Polymer Guarantee
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every Atlanta polymer chair, table, and bin is manufactured exclusively with virgin-grade raw granules for maximum flexural strength and UV resistance.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-6">
              <div className="h-10 w-10 rounded-xl bg-blue-100/80 flex items-center justify-center text-[#0090d0] mb-4">
                <Sparkles className="h-5 w-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">
                Epoxy Powder Coated CRCA Steel
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Institutional benches, office desks, and storage lockers undergo 7-tank anti-rust surface treatment with robotic MIG welding.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-6">
              <div className="h-10 w-10 rounded-xl bg-emerald-100/80 flex items-center justify-center text-emerald-700 mb-4">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">
                Direct Factory Warranty & Support
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enjoy standard 1 to 5 years manufacturer structural warranty with Pan-India delivery and institutional assembly support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
