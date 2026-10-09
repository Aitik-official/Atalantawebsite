"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Trash2,
  Building2,
  Zap,
} from "lucide-react";
import { getProductsForCategory, ProductItem, site } from "@/data/site";
import ProductCard from "./ProductCard";
import ProductQuickViewModal from "./ProductQuickViewModal";
import Reveal from "./Reveal";

export default function HomeCategoryShowcases() {
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);

  // Subcategory filter states
  const [officeSub, setOfficeSub] = useState("all");
  const [instSub, setInstSub] = useState("all");
  const [wasteSub, setWasteSub] = useState("all");

  // Office Big Card Spotlight Loop State
  const [officeSpotlightIndex, setOfficeSpotlightIndex] = useState(0);
  const [isOfficeHovered, setIsOfficeHovered] = useState(false);

  // Office Right-Side 1-by-1 Moving Chair Carousel State
  const [officeCarouselIndex, setOfficeCarouselIndex] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  const officeSpotlights = [
    {
      title: "Director Chair 1001",
      badge: "Executive Flagship",
      spec: "Class-4 Gas Lift",
      desc: "Plush high-density multi-layer cushioning with chrome star base and multi-position synchro-tilt lock for 12+ hr daily posture support.",
      image: "https://atlantaworld.in/admin/products/17161205220.jpg",
      f1: "Synchro-Tilt",
      f2: "Chrome Star Base",
      link: "/office-furniture/director-chair",
      cta: "Explore Director Chairs",
    },
    {
      title: "Executive Mesh Chair 8002",
      badge: "Ergonomic Bestseller",
      spec: "Orthopedic Lumbar",
      desc: "Breathable high-tensile Korean mesh with 2D adjustable armrests and synchro-tilt mechanism engineered for corporate workstations.",
      image: "https://atlantaworld.in/admin/products/17161208640.jpg",
      f1: "Breathable Mesh",
      f2: "2D Armrests",
      link: "/office-furniture/executive-chairs",
      cta: "Explore Executive Chairs",
    },
    {
      title: "Visitor Cantilever 7003",
      badge: "Boardroom Premium",
      spec: "Cantilever Steel",
      desc: "Heavy-gauge tubular steel cantilever sledge base with anti-tip nylon glides for conference and visitor seating.",
      image: "https://atlantaworld.in/admin/products/17161210760.jpg",
      f1: "Tubular Steel",
      f2: "Anti-Tip Glides",
      link: "/office-furniture/visitor-chairs",
      cta: "Explore Visitor Chairs",
    },
    {
      title: "Director Luxury Chair 1003",
      badge: "Director Series",
      spec: "Diamond Quilting",
      desc: "Diamond-patterned orthopedic backrest with heavy-duty castors and tilt-tension adjustment for corporate boardrooms.",
      image: "https://atlantaworld.in/admin/products/17161207300.jpg",
      f1: "Contoured Foam",
      f2: "Twin Castors",
      link: "/office-furniture/director-chair",
      cta: "Explore Luxury Chairs",
    },
    {
      title: "High-Back Mesh Chair 8004",
      badge: "Task Ergonomics",
      spec: "Multi-Lock Tilt",
      desc: "Ergonomic s-curve lumbar curve with responsive pneumatic lift and 360-degree silent swivel nylon base.",
      image: "https://atlantaworld.in/admin/products/17161210180.jpg",
      f1: "S-Curve Frame",
      f2: "Class-4 Piston",
      link: "/office-furniture/executive-chairs",
      cta: "Explore Mesh Chairs",
    },
    {
      title: "Visitor Sledge Chair 7004",
      badge: "Conference Series",
      spec: "Chrome Cantilever",
      desc: "Heavy-gauge tubular steel sledge base with high-density molded seat padding for guest meeting spaces.",
      image: "https://atlantaworld.in/admin/products/17161211170.jpg",
      f1: "Heavy Steel",
      f2: "Molded Cushion",
      link: "/office-furniture/visitor-chairs",
      cta: "Explore Visitor Seating",
    },
  ];

  // Auto-rotate office spotlight product every 3 seconds in a continuous loop
  useEffect(() => {
    if (isOfficeHovered) return;
    const timer = setInterval(() => {
      setOfficeSpotlightIndex((prev) => (prev + 1) % officeSpotlights.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isOfficeHovered, officeSpotlights.length]);

  const activeOfficeSpotlight = officeSpotlights[officeSpotlightIndex];

  const officeProducts = getProductsForCategory("office-furniture", officeSub);
  const instProducts = getProductsForCategory("office-institutional", instSub).slice(0, 4);
  const wasteProducts = getProductsForCategory("waste-management", wasteSub).slice(0, 3);

  // Auto-advance right-side office chairs carousel one-by-one in a loop every 3.5 seconds
  useEffect(() => {
    if (isCarouselHovered || officeProducts.length <= 1) return;
    const interval = setInterval(() => {
      setOfficeCarouselIndex((prev) => (prev + 1) % officeProducts.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isCarouselHovered, officeProducts.length]);

  // Reset carousel index when subcategory filter changes
  useEffect(() => {
    setOfficeCarouselIndex(0);
  }, [officeSub]);

  const handlePrevOffice = () => {
    setOfficeCarouselIndex((prev) =>
      prev === 0 ? officeProducts.length - 1 : prev - 1
    );
  };

  const handleNextOffice = () => {
    setOfficeCarouselIndex((prev) => (prev + 1) % officeProducts.length);
  };

  return (
    <div className="flex flex-col space-y-0">
      {/* ========================================================================= */}
      {/* 1. OFFICE FURNITURE - ASYMMETRIC LUXURY EXECUTIVE BENTO SPOTLIGHT LAYOUT   */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-[#faf8f5] text-stone-900 border-b border-stone-200/80 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <Reveal variant="up" delay={50}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-500/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-800 mb-3 shadow-sm">
                  <Briefcase className="h-3.5 w-3.5 text-blue-700" />
                  Division 01 · Ergonomic Lumbar Support & BIFMA Certified
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900">
                  Office Furniture <span className="gold-gradient-text">Collection</span>
                </h2>
                <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl">
                  High-back director chairs, synchro-tilt executive mesh task chairs, cantilever visitor seating, and heavy CRCA steel wardrobes.
                </p>
              </div>

              <Link
                href="/office-furniture"
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 hover:bg-[#0090d0] text-white px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition shadow-sm shrink-0"
              >
                <span>View All 14+ Models</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          {/* Asymmetric Bento Layout: Left Hero Spotlight (Looping) + Right 1-by-1 Chair Carousel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Big Spotlight Card (4 Cols) with 3s Loop */}
            <div className="lg:col-span-4">
              <Reveal variant="scale" delay={100} className="h-full">
                <div
                  onMouseEnter={() => setIsOfficeHovered(true)}
                  onMouseLeave={() => setIsOfficeHovered(false)}
                  className="relative h-full flex flex-col justify-between rounded-3xl bg-gradient-to-br from-blue-500/10 via-white to-sky-100/30 p-6 sm:p-8 border border-slate-200 shadow-lg overflow-hidden group transition-all"
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />

                  {/* Top Badge & Live Indicator */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3 min-h-[26px]">
                      <span className="rounded-full bg-slate-900 text-sky-300 text-[11px] font-extrabold px-3 py-1 uppercase tracking-wider shadow-sm transition-all truncate">
                        {activeOfficeSpotlight.badge}
                      </span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-slate-600">
                          {activeOfficeSpotlight.spec}
                        </span>
                      </div>
                    </div>

                    <div className="h-[64px] flex items-center">
                      <h3 className="text-2xl font-extrabold text-slate-900 leading-tight transition-all line-clamp-2">
                        {activeOfficeSpotlight.title}
                      </h3>
                    </div>
                  </div>

                  {/* Center Clean Cutout Image with Smooth Fade Animation */}
                  <div className="relative aspect-square w-full rounded-2xl bg-slate-50 p-4 flex items-center justify-center my-5 shadow-sm border border-slate-100 group-hover:scale-105 transition-transform duration-500">
                    <img
                      key={activeOfficeSpotlight.image}
                      src={activeOfficeSpotlight.image}
                      alt={activeOfficeSpotlight.title}
                      className="h-full w-full object-contain drop-shadow-md animate-fadeIn"
                      onError={(e) => {
                        e.currentTarget.src = "https://atlantaworld.in/admin/products/17161205220.jpg";
                      }}
                    />
                  </div>

                  {/* Bottom Features, Indicators & Action */}
                  <div>
                    {/* Dot Product Switcher Indicator */}
                    <div className="flex items-center justify-center gap-1.5 mb-4">
                      {officeSpotlights.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={() => setOfficeSpotlightIndex(dotIdx)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            officeSpotlightIndex === dotIdx
                              ? "w-7 bg-[#0090d0]"
                              : "w-2 bg-slate-300 hover:bg-slate-400"
                          }`}
                          aria-label={`Go to spotlight ${dotIdx + 1}`}
                        />
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 font-semibold mb-5 pt-3 border-t border-slate-200">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#0090d0]" />
                        <span>{activeOfficeSpotlight.f1}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#0090d0]" />
                        <span>{activeOfficeSpotlight.f2}</span>
                      </div>
                    </div>

                    <Link
                      href={activeOfficeSpotlight.link}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#0090d0] hover:bg-[#0073ab] text-white py-3.5 px-4 text-xs font-bold uppercase tracking-wider transition shadow-md"
                    >
                      <span>{activeOfficeSpotlight.cta}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Feed & One-by-One Chair Carousel (8 Cols) */}
            <div
              className="lg:col-span-8 flex flex-col justify-between"
              onMouseEnter={() => setIsCarouselHovered(true)}
              onMouseLeave={() => setIsCarouselHovered(false)}
            >
              {/* Top Header & Carousel Navigation Controls */}
              <div className="flex items-center justify-between gap-4 mb-5 pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#0090d0] animate-pulse" />
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900">
                    Office Chairs & Storage Models ({officeProducts.length})
                  </span>
                </div>

                {/* Prev / Next 1-by-1 Switcher Controls */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-slate-500 mr-1">
                    {officeProducts.length > 0 ? `${officeCarouselIndex + 1} / ${officeProducts.length}` : "0 / 0"}
                  </span>
                  <button
                    onClick={handlePrevOffice}
                    aria-label="Previous chair"
                    className="h-9 w-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-[#0090d0] hover:text-white transition shadow-xs"
                  >
                    ←
                  </button>
                  <button
                    onClick={handleNextOffice}
                    aria-label="Next chair"
                    className="h-9 w-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-[#0090d0] hover:text-white transition shadow-xs"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* 1-by-1 Moving Chair Carousel Track */}
              <div className="relative overflow-hidden w-full rounded-2xl py-2">
                <div
                  className="flex gap-6 transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${officeCarouselIndex * 300}px)`,
                  }}
                >
                  {officeProducts.concat(officeProducts).map((p, idx) => (
                    <div
                      key={`${p.id}-${idx}`}
                      className="w-[270px] sm:w-[280px] lg:w-[290px] shrink-0 transition-transform duration-300 hover:scale-[1.02]"
                    >
                      <ProductCard
                        product={p}
                        onQuickView={(prod) => setQuickViewProduct(prod)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom live indicator */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Moving one-by-one in a loop · Auto-rotates every 3.5s (Hover to Pause)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {officeProducts.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => setOfficeCarouselIndex(dotIdx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        officeCarouselIndex === dotIdx
                          ? "w-5 bg-[#0090d0]"
                          : "w-1.5 bg-slate-300 hover:bg-slate-400"
                      }`}
                      aria-label={`Slide to chair ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CAMPUS & INSTITUTIONAL - BENTO METRIC CARDS & WORKSTATION FEED         */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white text-stone-900 border-b border-stone-200/80 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal variant="up" delay={50}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3">
                  <GraduationCap className="h-3.5 w-3.5 text-emerald-700" />
                  Division 02 · Schools, Colleges & IT Labs
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900">
                  Campus & Institutional <span className="gold-gradient-text">Furniture</span>
                </h2>
                <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl">
                  Heavy-gauge CRCA robotically welded steel dual desks, IT workstations, and hostel bunk beds.
                </p>
              </div>

              <Link
                href="/office-institutional"
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition shadow-sm shrink-0"
              >
                <span>View All 38+ Models</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* 3 Campus Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="rounded-2xl bg-[#faf8f5] border border-emerald-100 p-4 flex items-center gap-3.5 shadow-sm">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                    150+ Campus Projects
                  </h4>
                  <span className="text-xs text-stone-500">
                    Trusted pan-India educational supply
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-[#faf8f5] border border-emerald-100 p-4 flex items-center gap-3.5 shadow-sm">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                    Anti-Injury Safety Edges
                  </h4>
                  <span className="text-xs text-stone-500">
                    Rounded post-formed PVC edge banding
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-[#faf8f5] border border-emerald-100 p-4 flex items-center gap-3.5 shadow-sm">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                    7-Tank Pretreatment
                  </h4>
                  <span className="text-xs text-stone-500">
                    Scratch & rust-proof epoxy coating
                  </span>
                </div>
              </div>
            </div>

            {/* Subcategory Pills */}
            <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-stone-200/80">
              {[
                { name: "ALL INSTITUTIONAL", key: "all" },
                { name: "STUDENT BENCHES", key: "student-benches" },
                { name: "COMPUTER TABLE", key: "computer-table" },
                { name: "STUDENT DESK", key: "student-desk" },
                { name: "OFFICE DESK", key: "office-desk" },
                { name: "VISITOR CHAIR", key: "visitor-chair" },
                { name: "STORAGE", key: "storage" },
                { name: "HOSTEL BEDS", key: "hostel-beds" },
              ].map((pill) => (
                <button
                  key={pill.key}
                  onClick={() => setInstSub(pill.key)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    instSub === pill.key
                      ? "bg-emerald-800 text-white shadow-md scale-105"
                      : "bg-[#faf8f5] text-stone-700 hover:bg-stone-200/70 border border-stone-200/80"
                  }`}
                >
                  {pill.name}
                </button>
              ))}
            </div>
          </Reveal>

          {/* 4-Card Institutional Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {instProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={(prod) => setQuickViewProduct(prod)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. WASTE MANAGEMENT - MUNICIPAL COMPARISON & SPECIFICATION CARDS          */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-[#faf8f5] text-stone-900 border-b border-stone-200/80 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal variant="up" delay={50}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 border border-teal-500/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal-800 mb-3">
                  <Trash2 className="h-3.5 w-3.5 text-teal-700" />
                  Division 03 · EN 840 Municipal Sanitation Standard
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900">
                  Commercial Waste <span className="gold-gradient-text">Management</span>
                </h2>
                <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl">
                  UV-stabilized virgin HDPE mobile waste bins with shock-absorbing solid rubber transport wheels.
                </p>
              </div>

              <Link
                href="/waste-management"
                className="inline-flex items-center gap-2 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition shadow-sm shrink-0"
              >
                <span>View All Waste Solutions</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          {/* 3 Product Cards + 1 Municipal Tender RFP Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {wasteProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={(prod) => setQuickViewProduct(prod)}
              />
            ))}

            {/* Municipal Bulk RFQ Card */}
            <Reveal variant="scale" delay={200} className="h-full">
              <div className="h-full flex flex-col justify-between rounded-2xl border-2 border-dashed border-teal-300 bg-teal-50/50 p-6 shadow-sm">
                <div>
                  <span className="rounded-full bg-teal-800 text-white text-[10px] font-extrabold px-3 py-1 uppercase tracking-wider inline-block mb-3">
                    Bulk RFP & Tender
                  </span>
                  <h4 className="text-lg font-extrabold text-stone-900 mb-2">
                    Municipal & Industrial Direct Supply
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    Custom segregation color coding (Green / Blue / Yellow / Red) with custom corporate logo hot-stamping available.
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-teal-200/60">
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white py-3 px-3 text-xs font-bold uppercase tracking-wider transition shadow-sm"
                  >
                    <span>Request Municipal Tender</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </Reveal>
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
