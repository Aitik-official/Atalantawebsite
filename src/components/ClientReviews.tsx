"use client";

import { useState, useEffect } from "react";
import { Star, Quote, Building2, CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { testimonials } from "@/data/site";
import Reveal from "./Reveal";

export default function ClientReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Extended client list for a rich, diverse review carousel
  const allReviews = [
    ...testimonials,
    {
      quote:
        "Our co-working network installed Atlanta Task Mesh 8002 chairs across 250 workstations. Outstanding durability, zero mechanical failure across 2 years of 14-hour daily shifts.",
      author: "Vikram Malhotra",
      role: "Operations VP",
      company: "WorkSphere Hubs, Bangalore & Pune",
      rating: 5,
    },
    {
      quote:
        "We procured 350+ heavy-gauge CRCA double-tier hostel beds and study tables for our residential medical academy campus. Sturdy robotic welds with zero squeaking.",
      author: "Dr. Arvind Deshmukh",
      role: "Dean of Administration",
      company: "Apex Institute of Health Sciences, Nagpur",
      rating: 5,
    },
  ];

  // Auto-advance carousel every 4 seconds in a loop
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allReviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, allReviews.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? allReviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allReviews.length);
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-50 text-slate-900 relative border-t border-slate-200 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-sky-200/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-[#0090d0]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header & Navigation Row */}
        <Reveal variant="up" delay={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 border border-[#0090d0]/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0090d0] mb-3 shadow-xs">
                <Building2 className="h-3.5 w-3.5 text-[#0090d0]" />
                Verified Client Feedback
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
                Trusted by Leaders <span className="gold-gradient-text">Across India</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
                Read how educational institutions, corporate offices, banquet chains, and municipal bodies evaluate Atlanta’s commercial durability.
              </p>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-bold text-slate-500 mr-2">
                {currentIndex + 1} / {allReviews.length}
              </span>
              <button
                onClick={handlePrev}
                aria-label="Previous review"
                className="h-10 w-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-[#0090d0] hover:text-white transition shadow-sm hover:scale-105"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                aria-label="Next review"
                className="h-10 w-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-[#0090d0] hover:text-white transition shadow-sm hover:scale-105"
              >
                →
              </button>
            </div>
          </div>
        </Reveal>

        {/* Carousel Slider Window */}
        <div
          className="relative overflow-hidden w-full py-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Subtle gradient side fades */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

          {/* Sliding Track: Moves smoothly 1 card at a time */}
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 360}px)`,
            }}
          >
            {allReviews.concat(allReviews).map((item, idx) => (
              <div
                key={`${item.author}-${idx}`}
                className="w-[320px] sm:w-[380px] lg:w-[420px] shrink-0 transition-transform duration-300 hover:scale-[1.02] flex flex-col"
              >
                <div className="relative h-full flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-sm hover:shadow-xl hover:border-[#0090d0]/40 transition duration-300">
                  <div>
                    {/* Top Quote & Rating Row */}
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <div className="h-10 w-10 rounded-2xl bg-sky-50 border border-[#0090d0]/30 flex items-center justify-center text-[#0090d0]">
                        <Quote className="h-5 w-5" />
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 bg-sky-50/70 border border-sky-200/60 px-2.5 py-1 rounded-full text-xs font-bold">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-current" />
                        ))}
                        <span className="ml-1 text-slate-800 text-[11px]">5.0</span>
                      </div>
                    </div>

                    {/* Review Quote Body */}
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 font-medium italic">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Author & Client Meta */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                        {item.author}
                        <CheckCircle className="h-4 w-4 text-[#0090d0]" />
                      </h4>
                      <p className="text-xs text-[#0090d0] font-bold mt-0.5">{item.role}</p>
                      <p className="text-xs text-slate-500 font-medium">{item.company}</p>
                    </div>

                    <div className="h-8 w-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0" title="Verified Institutional Buyer">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Carousel Indicator & Live State */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-200 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Auto-rotating feedback loop · Hover to pause</span>
          </div>

          <div className="flex items-center gap-1.5">
            {allReviews.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setCurrentIndex(dotIdx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === dotIdx
                    ? "w-7 bg-[#0090d0]"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to review ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
