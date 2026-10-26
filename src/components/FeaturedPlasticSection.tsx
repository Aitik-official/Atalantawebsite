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
import { ProductItem } from "@/data/site";
import ProductCard from "./ProductCard";
import ProductQuickViewModal from "./ProductQuickViewModal";
import Reveal from "./Reveal";
import { useCatalog } from "./CatalogProvider";

export default function FeaturedPlasticSection() {
  const { findCategory, productsFor } = useCatalog();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);

  const plasticCategory = findCategory("plastic-furniture");
  const subcategoryTabs = [
    { name: "All Models", key: "all", count: productsFor("plastic-furniture").length },
    ...(plasticCategory?.subcategories.map((sub) => ({
      name: sub.name,
      key: sub.slug,
      count: productsFor("plastic-furniture", sub.slug).length,
    })) || []),
  ];

  const allPlasticProducts = useMemo(() => {
    return productsFor("plastic-furniture", selectedSubcategory);
  }, [selectedSubcategory, productsFor]);

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
    <section className="py-20 lg:py-28 bg-white text-slate-900 relative border-b border-slate-200 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#e31e24]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal variant="up" delay={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 border border-[#0090d0]/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0090d0] mb-3 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-[#0090d0]" />
                100% Virgin Polymer · UV-Stabilized Luster
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
                Featured Atlanta <span className="gold-gradient-text">Plastic Furniture</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
                Precision-molded from pure virgin grade polypropylene. Engineered for heavy banquet endurance, outdoor weather resistance, and ergonomic posture support.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/plastic-furniture"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#0090d0] hover:bg-[#0073ab] text-white px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition shadow-sm hover:scale-105"
              >
                <span>Explore All 17+ Models</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Subcategory Navigation Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            {/* Subcategory Pills */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
              {subcategoryTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedSubcategory(tab.key)}
                  className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold transition-all ${
                    selectedSubcategory === tab.key
                      ? "bg-[#0090d0] text-white shadow-md scale-105"
                      : "bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
                  }`}
                >
                  <span>{tab.name}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                      selectedSubcategory === tab.key
                        ? "bg-white/20 text-white"
                        : "bg-sky-50 text-[#0090d0]"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Continuous Movement Indicator */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-sky-50 border border-sky-200/70 text-sky-900 text-xs font-bold shadow-xs">
                <span className="h-2 w-2 rounded-full bg-[#e31e24] animate-ping" />
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
          <div className="rounded-3xl bg-gradient-to-r from-sky-500/10 via-slate-50 to-[#e31e24]/10 border border-[#0090d0]/20 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-slate-800 w-full md:w-auto">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-white shadow-xs border border-[#0090d0]/30 flex items-center justify-center text-[#0090d0] shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    200 kg Load Tested
                  </h4>
                  <span className="text-xs text-slate-500">
                    Heavy-duty reinforced ribbing
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-white shadow-xs border border-[#0090d0]/30 flex items-center justify-center text-[#e31e24] shrink-0">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    100% Weatherproof
                  </h4>
                  <span className="text-xs text-slate-500">
                    UV & monsoon resistant luster
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-white shadow-xs border border-[#0090d0]/30 flex items-center justify-center text-[#0090d0] shrink-0">
                  <Armchair className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Stackable up to 15+
                  </h4>
                  <span className="text-xs text-slate-500">
                    Rapid venue & lawn clearing
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/plastic-furniture"
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 hover:bg-[#0090d0] text-white px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition shadow-sm"
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
