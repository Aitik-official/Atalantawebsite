"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Armchair,
} from "lucide-react";
import { getProductsForCategory, ProductItem } from "@/data/site";
import ProductCard from "./ProductCard";
import ProductQuickViewModal from "./ProductQuickViewModal";
import Reveal from "./Reveal";

export default function FeaturedPlasticSection() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);

  const subcategoryTabs = [
    { name: "All Models", key: "all", count: 17 },
    { name: "Plastic Chairs", key: "plastic-chairs", count: 14 },
    { name: "Dining Tables", key: "dining-tables", count: 4 },
    { name: "Stools", key: "stools", count: 3 },
    { name: "Party Halls", key: "party-halls", count: 3 },
  ];

  const allPlasticProducts = useMemo(() => {
    return getProductsForCategory("plastic-furniture", selectedSubcategory);
  }, [selectedSubcategory]);

  // Duplicate product array 3 times for a completely seamless, gapless continuous marquee loop
  const continuousList = useMemo(() => {
    if (allPlasticProducts.length === 0) return [];
    if (allPlasticProducts.length < 6) {
      return [
        ...allPlasticProducts,
        ...allPlasticProducts,
        ...allPlasticProducts,
        ...allPlasticProducts,
      ];
    }
    return [...allPlasticProducts, ...allPlasticProducts];
  }, [allPlasticProducts]);

  return (
    <section className="py-20 lg:py-28 bg-white text-stone-900 relative border-b border-stone-200/80 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#c59b27]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal variant="up" delay={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-[#b8860b]/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#8c6506] mb-3 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-[#b8860b]" />
                100% Virgin Polymer · UV-Stabilized Luster
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900">
                Featured Atlanta <span className="gold-gradient-text">Plastic Furniture</span>
              </h2>
              <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl">
                Precision-molded from pure virgin grade polypropylene. Engineered for heavy banquet endurance, outdoor weather resistance, and ergonomic posture support.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/plastic-furniture"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#b8860b] hover:bg-[#8c6506] text-white px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition shadow-sm hover:scale-105"
              >
                <span>Explore All 17+ Models</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Subcategory Navigation Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            {/* Subcategory Pills */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#faf8f5] border border-stone-200/80 shadow-xs">
              {subcategoryTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedSubcategory(tab.key)}
                  className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold transition-all ${
                    selectedSubcategory === tab.key
                      ? "bg-[#b8860b] text-white shadow-md scale-105"
                      : "bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-900 border border-stone-200"
                  }`}
                >
                  <span>{tab.name}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                      selectedSubcategory === tab.key
                        ? "bg-white/20 text-white"
                        : "bg-amber-50 text-[#8c6506]"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Continuous Movement Indicator */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200/70 text-amber-900 text-xs font-bold shadow-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Continuous Live Showcase · Hover to Pause</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Infinite Continuous Marquee Loop Stream */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left & Right subtle gradient edge masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-slow flex gap-6 px-4">
          {continuousList.map((product, idx) => (
            <div
              key={`${product.id}-${idx}`}
              className="w-[280px] sm:w-[310px] lg:w-[330px] shrink-0 transition-transform duration-300 hover:scale-105"
            >
              <ProductCard
                product={product}
                onQuickView={(prod) => setQuickViewProduct(prod)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        {/* Bottom Feature Pillars Bar */}
        <Reveal variant="up" delay={200}>
          <div className="rounded-3xl bg-gradient-to-r from-amber-500/10 via-[#faf8f5] to-amber-500/10 border border-[#b8860b]/20 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-stone-800 w-full md:w-auto">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-white shadow-xs border border-[#b8860b]/30 flex items-center justify-center text-[#b8860b] shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                    200 kg Load Tested
                  </h4>
                  <span className="text-xs text-stone-500">
                    Heavy-duty reinforced ribbing
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-white shadow-xs border border-[#b8860b]/30 flex items-center justify-center text-[#b8860b] shrink-0">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                    100% Weatherproof
                  </h4>
                  <span className="text-xs text-stone-500">
                    UV & monsoon resistant luster
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-white shadow-xs border border-[#b8860b]/30 flex items-center justify-center text-[#b8860b] shrink-0">
                  <Armchair className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                    Stackable up to 15+
                  </h4>
                  <span className="text-xs text-stone-500">
                    Rapid venue & lawn clearing
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/plastic-furniture"
                className="inline-flex items-center gap-2 rounded-2xl bg-stone-900 hover:bg-[#b8860b] text-white px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition shadow-sm"
              >
                <span>View All Plastic Furniture</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
