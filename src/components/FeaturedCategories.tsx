import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Reveal from "./Reveal";

export default function FeaturedCategories() {
  const modernCategories = [
    {
      id: "plastic",
      name: "Plastic Furniture",
      tagline: "Banquets & Dining",
      highlight: "Virgin Polymer",
      count: "17+ Models",
      code: "01",
      href: "/plastic-furniture",
      image: "https://atlantaworld.in/admin/products/17164641970.png",
      glowColor: "group-hover:from-[#0090d0]/10 group-hover:to-sky-500/5",
    },
    {
      id: "office",
      name: "Office Furniture",
      tagline: "Executive & Task",
      highlight: "Ergonomic Lumbar",
      count: "10+ Models",
      code: "02",
      href: "/office-furniture",
      image: "https://atlantaworld.in/admin/products/17161205220.jpg",
      glowColor: "group-hover:from-blue-500/10 group-hover:to-indigo-500/5",
    },
    {
      id: "institutional",
      name: "Institutional Furniture",
      tagline: "Classrooms & Labs",
      highlight: "CRCA Steel",
      count: "38+ Models",
      code: "03",
      href: "/office-institutional",
      image: "https://atlantaworld.in/admin/products/17169780110.jpg",
      glowColor: "group-hover:from-emerald-500/10 group-hover:to-teal-500/5",
    },
    {
      id: "waste",
      name: "Waste Management",
      tagline: "Commercial Sanitation",
      highlight: "Virgin HDPE",
      count: "4+ Capacities",
      code: "04",
      href: "/waste-management",
      image: "https://atlantaworld.in/admin/products/17172400200.jpg",
      glowColor: "group-hover:from-[#e31e24]/10 group-hover:to-rose-500/5",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 relative overflow-hidden border-b border-slate-200">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-rose-200/15 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal variant="up" delay={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 border border-[#0090d0]/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0090d0] mb-3 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-[#0090d0]" />
                Core Product Lines
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
                Engineered Furniture <span className="gold-gradient-text">Categories</span>
              </h2>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-2xl bg-white border border-slate-200 px-5 py-3 text-xs sm:text-sm font-bold text-slate-800 hover:border-[#0090d0] hover:text-[#0090d0] shadow-sm transition group hover:-translate-y-0.5"
            >
              <span>Browse All 69+ Products</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform text-[#e31e24]" />
            </Link>
          </div>
        </Reveal>

        {/* 4 Identical Height Modern Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
          {modernCategories.map((cat, idx) => (
            <Reveal key={cat.id} variant="up" delay={idx * 100} className="h-full">
              <Link
                href={cat.href}
                className="group relative flex flex-col h-full rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-2xl hover:shadow-sky-900/10 transition-all duration-500 hover:-translate-y-2 hover:border-[#0090d0]/50 overflow-hidden justify-between"
              >
                {/* Subtle Hover Gradient Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-transparent to-transparent ${cat.glowColor} transition-all duration-500 opacity-0 group-hover:opacity-100 pointer-events-none`}
                />

                {/* Top Header: Badge & Count (Exact Same Height) */}
                <div className="relative z-10 flex items-center justify-between gap-2 h-7 mb-4">
                  <span className="rounded-full bg-slate-100 group-hover:bg-sky-50 border border-slate-200 group-hover:border-[#0090d0]/40 px-3 py-1 text-[11px] font-bold text-slate-700 group-hover:text-[#0090d0] transition-colors whitespace-nowrap">
                    {cat.highlight}
                  </span>
                  <span className="text-xs font-extrabold text-[#0090d0] bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                    {cat.count}
                  </span>
                </div>

                {/* Studio Showcase Canvas (Exact Same Fixed Aspect Ratio & Height) */}
                <div className="relative z-10 aspect-[4/3] w-full rounded-2xl bg-gradient-to-b from-slate-50 via-slate-50/50 to-slate-100/60 p-4 flex items-center justify-center mb-4 border border-slate-100 group-hover:border-sky-200/60 transition-all shadow-inner">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-contain drop-shadow-md group-hover:drop-shadow-xl transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-1"
                  />
                </div>

                {/* Category Info Block (Exact Same Fixed Height for Alignment) */}
                <div className="relative z-10 h-14 flex flex-col justify-center mb-4">
                  <span className="text-[10px] font-extrabold text-[#0090d0] uppercase tracking-widest block mb-0.5 truncate">
                    {cat.code} · {cat.tagline}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-[#0090d0] transition-colors truncate">
                    {cat.name}
                  </h3>
                </div>

                {/* Bottom Action Bar */}
                <div className="relative z-10 pt-3.5 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
                    Explore Series
                  </span>
                  <div className="h-8 w-8 rounded-full bg-slate-100 group-hover:bg-[#0090d0] text-slate-700 group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
