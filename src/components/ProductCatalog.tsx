"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { ProductItem } from "@/data/site";
import ProductCard from "./ProductCard";
import ProductQuickViewModal from "./ProductQuickViewModal";
import { useCatalog } from "./CatalogProvider";

interface CatalogProps {
  initialCategory?: string;
  limit?: number;
  showFilters?: boolean;
}

export default function ProductCatalog({
  initialCategory = "all",
  limit,
  showFilters = true,
}: CatalogProps) {
  const { products: allProducts, categories } = useCatalog();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || initialCategory;
  const searchParam = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>(searchParam);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(limit || 16);

  useEffect(() => {
    if (searchParams.get("category")) {
      setSelectedCategory(searchParams.get("category") || "all");
      setSelectedSubcategory("all");
    }
    if (searchParams.get("search")) {
      setSearchQuery(searchParams.get("search") || "");
    }
  }, [searchParams]);

  const normalizeCat = (cat: string) => {
    const c = cat.toLowerCase().replace(/_/g, "-").trim();
    if (c.includes("plastic")) return "plastic furniture";
    if (c.includes("office") && !c.includes("institutional")) return "office furniture";
    if (c.includes("institutional")) return "institutional furniture";
    if (c.includes("waste")) return "waste management";
    return c;
  };

  const availableSubcategories = useMemo(() => {
    let filtered = allProducts;
    if (selectedCategory !== "all") {
      filtered = allProducts.filter(
        (p) => normalizeCat(p.category) === normalizeCat(selectedCategory)
      );
    }
    const subs = Array.from(new Set(filtered.map((p) => p.subcategory).filter(Boolean)));
    return subs;
  }, [selectedCategory, allProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // 1. Strict Category Isolation
    if (selectedCategory !== "all") {
      result = result.filter(
        (p) => normalizeCat(p.category) === normalizeCat(selectedCategory)
      );
    }

    // 2. Strict Subcategory Isolation
    if (selectedSubcategory !== "all") {
      result = result.filter(
        (p) => p.subcategory.toLowerCase() === selectedSubcategory.toLowerCase()
      );
    }

    // 3. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.specifications && Object.values(p.specifications).some((v) => v.toLowerCase().includes(q)))
      );
    }

    // 4. Sort
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.priceNumber - b.priceNumber);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.priceNumber - a.priceNumber);
    } else if (sortBy === "rating") {
      result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    }

    return result;
  }, [selectedCategory, selectedSubcategory, searchQuery, sortBy, allProducts]);

  const displayedProducts = limit ? filteredProducts.slice(0, visibleCount) : filteredProducts;

  return (
    <div className="w-full">
      {showFilters && (
        <div className="mb-8 flex flex-col gap-6">
          {/* Main Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedSubcategory("all");
              }}
              className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition shadow-xs ${
                selectedCategory === "all"
                  ? "bg-[#0090d0] text-white shadow-sm"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              All Categories ({allProducts.length})
            </button>

            {categories.map((cat) => {
              const isCatActive = normalizeCat(selectedCategory) === normalizeCat(cat.categoryKey);
              const catCount = allProducts.filter((p) => normalizeCat(p.category) === normalizeCat(cat.categoryKey)).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.categoryKey);
                    setSelectedSubcategory("all");
                  }}
                  className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shadow-xs ${
                    isCatActive
                      ? "bg-[#0090d0] text-white shadow-sm"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  <span>{cat.shortName || cat.name}</span>
                  <span className="text-[11px] opacity-80 font-normal">
                    ({catCount})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Subcategory Pills & Search Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {availableSubcategories.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">
                  Subcategory:
                </span>
                <button
                  onClick={() => setSelectedSubcategory("all")}
                  className={`rounded-lg px-3 py-1 text-xs font-semibold transition border ${
                    selectedSubcategory === "all"
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  All Types ({filteredProducts.length})
                </button>
                {availableSubcategories.map((sub) => {
                  const isSubActive = selectedSubcategory.toLowerCase() === sub.toLowerCase();
                  const subCount = allProducts.filter(
                    (p) =>
                      (selectedCategory === "all" || normalizeCat(p.category) === normalizeCat(selectedCategory)) &&
                      p.subcategory.toLowerCase() === sub.toLowerCase()
                  ).length;

                  return (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubcategory(sub)}
                      className={`rounded-lg px-3 py-1 text-xs font-semibold transition border flex items-center gap-1 ${
                        isSubActive
                          ? "bg-[#0090d0] text-white border-[#0090d0]"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <span>{sub}</span>
                      <span className="text-[10px] opacity-80">({subCount})</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Search & Sort Controls */}
            <div className="flex w-full md:w-auto items-center gap-3 ml-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter models, specs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white py-2 pl-9 pr-8 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-[#0090d0] focus:outline-none shadow-xs"
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

              {/* Sort Selector */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded-xl border border-slate-300 bg-white py-2 px-3 text-xs sm:text-sm text-slate-800 focus:border-[#0090d0] focus:outline-none cursor-pointer shadow-xs font-medium"
                >
                  <option value="featured">Featured Order</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Indicators */}
          {(selectedCategory !== "all" || selectedSubcategory !== "all" || searchQuery) && (
            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
              <span>Showing {filteredProducts.length} matching products</span>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedSubcategory("all");
                  setSearchQuery("");
                }}
                className="text-[#0090d0] hover:underline font-bold"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Products Grid */}
      {displayedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center my-10 shadow-xs">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-50 text-[#0090d0] mb-4 border border-[#0090d0]/20">
            <Search className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            No furniture models found matching your criteria
          </h3>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Try resetting your search query or selecting a different furniture category.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSelectedSubcategory("all");
              setSearchQuery("");
            }}
            className="mt-4 rounded-xl bg-[#0090d0] px-5 py-2 text-xs font-bold uppercase text-white hover:bg-[#0073ab] transition shadow-xs"
          >
            Show All Products
          </button>
        </div>
      )}

      {/* Load More Button if limited */}
      {limit && visibleCount < filteredProducts.length && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 16)}
            className="rounded-2xl border border-slate-300 bg-white px-8 py-3.5 text-sm font-bold text-slate-800 shadow-xs hover:bg-[#0090d0] hover:text-white hover:border-[#0090d0] transition duration-200"
          >
            Load More Products ({filteredProducts.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
