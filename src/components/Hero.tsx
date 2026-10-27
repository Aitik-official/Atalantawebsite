"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { site, hero } from "@/data/site";
import Reveal from "./Reveal";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSubIndex, setActiveSubIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const fallbackProductImage =
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80";
  const fallbackBgImage =
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85";

  const heroCategories = [
    {
      title: "PREMIUM POLYMER SEATING",
      highlight: "MOLDED PERFECTION",
      subtitle:
        "100% Virgin Polypropylene chairs, dining tables, banquet seating, and stools engineered for lifelong strength.",
      bgImage:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85",
      categoryName: "PLASTIC FURNITURE",
      categoryLink: "/plastic-furniture",
      tabLabel: "Plastic Furniture",
      subcategories: [
        {
          name: "PLASTIC CHAIRS",
          href: "/plastic-furniture/plastic-chairs",
          productTitle: "Crystal Premium Polymer Chair",
          price: "Starting from ₹1,999",
          image: "/admin/products/17164641970.png",
        },
        {
          name: "DINING TABLES",
          href: "/plastic-furniture/dining-tables",
          productTitle: "Atlanta 4-Seater Dining Table",
          price: "Starting from ₹4,499",
          image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "STOOLS",
          href: "/plastic-furniture/stools",
          productTitle: "Deo Round Stool Series",
          price: "Starting from ₹499",
          image: "/admin/products/17134409740.png",
        },
        {
          name: "PARTY HALLS",
          href: "/plastic-furniture/party-halls",
          productTitle: "Arizona Lawn & Banquet Armchair",
          price: "Starting from ₹2,499",
          image: "/admin/products/17164643560.png",
        },
      ],
    },
    {
      title: "EXECUTIVE OFFICE SUITES",
      highlight: "ERGONOMIC MASTERY",
      subtitle:
        "Synchro-tilt director and task mesh chairs, steel wardrobes, and visitor cantilever seating for corporate workspaces.",
      bgImage:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85",
      categoryName: "OFFICE FURNITURE",
      categoryLink: "/office-furniture",
      tabLabel: "Office Furniture",
      subcategories: [
        {
          name: "WARD ROBES",
          href: "/office-furniture/wardrobes",
          productTitle: "Steel 2-Door Office Wardrobe",
          price: "Starting from ₹12,499",
          image: "/admin/products/17169790490.jpg",
        },
        {
          name: "DIRECTOR CHAIR",
          href: "/office-furniture/director-chair",
          productTitle: "Director Executive Chair 1001",
          price: "Starting from ₹7,999",
          image: "/admin/products/17161205220.jpg",
        },
        {
          name: "EXECUTIVE CHAIRS",
          href: "/office-furniture/executive-chairs",
          productTitle: "Task Mesh Executive Chair 7001",
          price: "Starting from ₹4,800",
          image: "/admin/products/17161209700.jpg",
        },
        {
          name: "VISITOR CHAIRS",
          href: "/office-furniture/visitor-chairs",
          productTitle: "Visitor Cantilever Chair 7003",
          price: "Starting from ₹3,800",
          image: "/admin/products/17161210760.jpg",
        },
        {
          name: "STUDENT DESK",
          href: "/office-furniture/student-desk",
          productTitle: "Ergonomic Student Study Desk",
          price: "Starting from ₹3,150",
          image: "/admin/products/17169784300.jpg",
        },
      ],
    },
    {
      title: "CAMPUS & CLASSROOM",
      highlight: "STUDENT BENCHES & DESKS",
      subtitle:
        "Heavy-gauge CRCA robotically welded dual desks, computer tables, lockers, and hostel bunk beds for institutions.",
      bgImage:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000&q=85",
      categoryName: "OFFICE & INSTITUTIONAL",
      categoryLink: "/office-institutional",
      tabLabel: "Office & Institutional",
      subcategories: [
        {
          name: "STUDENT BENCHES",
          href: "/office-institutional/student-benches",
          productTitle: "Dual Student Bench Series I",
          price: "Starting from ₹2,850",
          image: "/admin/products/17169780110.jpg",
        },
        {
          name: "COMPUTER TABLE",
          href: "/office-institutional/computer-table",
          productTitle: "IT Lab Workstation Table",
          price: "Starting from ₹5,400",
          image: "/admin/products/17169788090.jpg",
        },
        {
          name: "STUDENT DESK",
          href: "/office-institutional/student-desk",
          productTitle: "Single & Dual Classroom Desk",
          price: "Starting from ₹3,300",
          image: "/admin/products/17188714390.jpg",
        },
        {
          name: "OFFICE DESK",
          href: "/office-institutional/office-desk",
          productTitle: "Corporate Executive Office Desk",
          price: "Starting from ₹8,999",
          image: "/admin/products/17169786440.jpg",
        },
        {
          name: "VISITOR CHAIR",
          href: "/office-institutional/visitor-chair",
          productTitle: "Waiting Area Multi-Seater Chair",
          price: "Starting from ₹3,600",
          image: "/admin/products/17161211600.jpg",
        },
        {
          name: "STORAGE",
          href: "/office-institutional/storage",
          productTitle: "Heavy Steel Personal Locker Unit",
          price: "Starting from ₹14,200",
          image: "/admin/products/17169790490.jpg",
        },
        {
          name: "HOSTEL BEDS",
          href: "/office-institutional/hostel-beds",
          productTitle: "Heavy Steel Hostel Bunk Bed",
          price: "Starting from ₹7,500",
          image: "/admin/products/17169780110.jpg",
        },
      ],
    },
    {
      title: "HEAVY-DUTY SANITATION",
      highlight: "COMMERCIAL WHEELIE BINS",
      subtitle:
        "100L, 120L, and 240L high-molecular-density virgin HDPE mobile bins with shock-absorbing solid rubber transport wheels.",
      bgImage:
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=2000&q=85",
      categoryName: "WASTE MANAGEMENT",
      categoryLink: "/waste-management",
      tabLabel: "Waste Management",
      subcategories: [
        {
          name: "DUSTBIN",
          href: "/waste-management/dustbin",
          productTitle: "240L Heavy-Duty Wheelie Bin",
          price: "Starting from ₹4,129",
          image: "/admin/products/17172400200.jpg",
        },
      ],
    },
  ];

  // Auto-play timer every 3 seconds (3000ms)
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % heroCategories.length;
        setActiveSubIndex(0);
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, heroCategories.length]);

  const activeCategory = heroCategories[currentSlide];
  const activeSubcategory =
    activeCategory.subcategories[activeSubIndex] ||
    activeCategory.subcategories[0];

  const handleSlideChange = (newIndex: number) => {
    setCurrentSlide(newIndex);
    setActiveSubIndex(0);
  };

  return (
    <section
      className="relative min-h-[620px] lg:min-h-[720px] text-white overflow-hidden flex items-center justify-center py-14 lg:py-20"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Images with smooth Cross-fade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {heroCategories.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === idx
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105 pointer-events-none"
            }`}
          >
            <img
              src={slide.bgImage}
              alt={slide.title}
              className="h-full w-full object-cover object-center"
              onError={(e) => {
                e.currentTarget.src = fallbackBgImage;
              }}
            />
          </div>
        ))}

        {/* Refined soft luxury overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/55 to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Content (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow badge */}
            <Reveal variant="up" delay={50}>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0090d0]/50 bg-[#0090d0]/15 px-4 py-1.5 backdrop-blur-md mb-5 shadow-lg shadow-sky-950/20">
                <Sparkles
                  className="h-3.5 w-3.5 text-[#0090d0] animate-spin"
                  style={{ animationDuration: "8s" }}
                />
                <span className="text-xs font-bold uppercase tracking-widest text-sky-300">
                  {hero.eyebrow}
                </span>
              </div>
            </Reveal>

            {/* Dynamic Animated Title */}
            <Reveal variant="up" delay={150}>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white mb-5 drop-shadow-md">
                {activeCategory.title}{" "}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0090d0] via-sky-300 to-[#e31e24]">
                  {activeCategory.highlight}
                </span>
              </h1>
            </Reveal>

            {/* Subtitle */}
            <Reveal variant="up" delay={250}>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-8 max-w-xl font-normal drop-shadow">
                {activeCategory.subtitle}
              </p>
            </Reveal>

            {/* CTA Button Row */}
            <Reveal variant="up" delay={350}>
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <Link
                  href={activeSubcategory.href}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#0090d0] px-7 py-4 text-sm sm:text-base font-bold uppercase tracking-wider text-white shadow-xl shadow-sky-950/40 hover:bg-[#0073ab] hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
                >
                  <span>Explore {activeSubcategory.name}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-950/60 backdrop-blur-md px-6 py-4 text-sm sm:text-base font-bold text-emerald-300 hover:bg-emerald-900/80 shadow-lg transition duration-300 hover:scale-105"
                >
                  <MessageSquare className="h-4 w-4 text-emerald-400" />
                  <span>WhatsApp RFQ</span>
                </a>
              </div>
            </Reveal>

            {/* Key trust badges */}
            <Reveal variant="up" delay={450}>
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/15 text-xs sm:text-sm text-slate-200 font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0090d0] shrink-0" />
                  <span>100% Virgin Polymer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#e31e24] shrink-0" />
                  <span>ISO 9001:2015</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0090d0] shrink-0" />
                  <span>Pan-India Supply</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Visual Floating Showcase Card (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <Reveal variant="scale" delay={200}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-slate-900/90 backdrop-blur-2xl p-5 group transition-all">
                {/* Header: Category Name + [View All] Link */}
                <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-extrabold text-sky-300 uppercase tracking-wider">
                      {activeCategory.categoryName}
                    </span>
                    <Link
                      href={activeCategory.categoryLink}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#e31e24] hover:text-red-400 underline underline-offset-2 ml-1"
                    >
                      View All &rarr;
                    </Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-[#0090d0] animate-ping" />
                    <span className="text-xs font-extrabold text-slate-400">
                      0{currentSlide + 1} / 0{heroCategories.length}
                    </span>
                  </div>
                </div>

                {/* Subcategory Pills Row on the Card */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {activeCategory.subcategories.map((sub, sIdx) => (
                    <Link
                      key={sIdx}
                      href={sub.href}
                      onMouseEnter={() => setActiveSubIndex(sIdx)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                        activeSubIndex === sIdx
                          ? "bg-[#0090d0] text-white shadow-sm font-extrabold scale-105"
                          : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white border border-white/10"
                      }`}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>

                {/* Spotlight Image Card on Clean White Background */}
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-white shadow-inner mb-3 flex items-center justify-center p-3">
                  <img
                    key={activeSubcategory.image}
                    src={activeSubcategory.image}
                    alt={activeSubcategory.productTitle}
                    className="h-full w-full object-contain transition-all duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = fallbackProductImage;
                    }}
                  />
                </div>

                {/* Spotlight Info Card */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0090d0] block">
                      {activeSubcategory.name}
                    </span>
                    <h4 className="text-sm sm:text-base font-extrabold text-white line-clamp-1">
                      {activeSubcategory.productTitle}
                    </h4>
                    <span className="text-xs text-slate-300 font-medium">
                      {activeSubcategory.price}
                    </span>
                  </div>

                  <Link
                    href={activeSubcategory.href}
                    className="rounded-xl bg-[#e31e24] hover:bg-[#c5161b] text-white px-4 py-2 text-xs font-bold transition shrink-0 shadow-lg"
                  >
                    View Models &rarr;
                  </Link>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={() =>
                    handleSlideChange(
                      (currentSlide - 1 + heroCategories.length) %
                        heroCategories.length
                    )
                  }
                  className="absolute left-2 top-[48%] -translate-y-1/2 z-30 h-8 w-8 rounded-full bg-black/70 backdrop-blur-md text-white hover:bg-[#0090d0] shadow-lg flex items-center justify-center transition hover:scale-110 border border-white/20"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() =>
                    handleSlideChange(
                      (currentSlide + 1) % heroCategories.length
                    )
                  }
                  className="absolute right-2 top-[48%] -translate-y-1/2 z-30 h-8 w-8 rounded-full bg-black/70 backdrop-blur-md text-white hover:bg-[#0090d0] shadow-lg flex items-center justify-center transition hover:scale-110 border border-white/20"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
