import Link from "next/link";
import { GraduationCap, Briefcase, PartyPopper, Trash2, ArrowRight, CheckCircle2, MessageSquare, Phone } from "lucide-react";
import { site } from "@/data/site";
import Reveal from "./Reveal";

export default function InstitutionalShowcase() {
  const sectors = [
    {
      icon: GraduationCap,
      title: "Schools & Universities",
      description: "Dual student benches, lab computer desks, library tables, and hostel bunk beds engineered for heavy classroom traffic.",
      highlights: ["Tamper-proof fasteners", "Ergonomic posture angles", "Rounded anti-injury safety edges"],
      image: "https://atlantaworld.in/admin/products/17188714390.jpg",
      href: "/products?category=Institutional+Furniture",
    },
    {
      icon: Briefcase,
      title: "Corporate & IT Parks",
      description: "Synchro-tilt executive mesh chairs, director leatherette seating, modular work desks, and conference room suites.",
      highlights: ["3D adjustable armrests", "Breathable Korean mesh", "BIFMA certified hydraulic gas lifts"],
      image: "https://atlantaworld.in/admin/products/17161205220.jpg",
      href: "/products?category=Office+Furniture",
    },
    {
      icon: PartyPopper,
      title: "Banquets & Event Venues",
      description: "Stackable luxury polymer chairs, lightweight catering tables, and crystal banquet seating with 200kg load capacity.",
      highlights: ["High-density stackability", "Scratch & stain resistant", "Vibrant gloss color retention"],
      image: "https://atlantaworld.in/admin/products/17164641970.png",
      href: "/products?category=Plastic+Furniture",
    },
    {
      icon: Trash2,
      title: "Municipal & Waste Logistics",
      description: "High-capacity mobile wheelie bins (100L, 120L, 240L) built from UV-stabilized virgin HDPE for harsh outdoor sanitation.",
      highlights: ["Shock-absorbing rubber wheels", "Reinforced pedal linkage", "UV & chemical resistant"],
      image: "https://atlantaworld.in/admin/products/17172400200.jpg",
      href: "/products?category=Waste+Management",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white text-stone-900 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal variant="up" delay={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#b8860b] block mb-2">
                Tailored Turnkey Solutions
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900">
                Institutional & <span className="gold-gradient-text">Commercial Supply</span>
              </h2>
              <p className="text-stone-600 text-sm sm:text-base mt-3">
                We specialize in bulk manufacturing and on-schedule turnkey delivery for large-scale institutional projects across India.
              </p>
            </div>

            <Link
              href="/institutional"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#b8860b] px-6 py-3.5 text-xs sm:text-sm font-bold uppercase text-white hover:bg-[#8c6506] shadow-md transition shrink-0"
            >
              <span>Institutional RFQ Planner</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        {/* 4 Sector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {sectors.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <Reveal key={idx} variant="up" delay={idx * 120}>
                <div className="group h-full rounded-3xl border border-stone-200/90 bg-[#faf8f5] p-7 sm:p-8 flex flex-col justify-between hover:border-[#b8860b]/50 hover:shadow-2xl transition duration-500 hover:-translate-y-2">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="h-12 w-12 rounded-2xl bg-amber-50 text-[#b8860b] flex items-center justify-center border border-[#b8860b]/30">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="h-20 w-20 rounded-xl bg-white border border-stone-200 p-2 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                        <img
                          src={sec.image}
                          alt={sec.title}
                          className="h-full w-full object-contain group-hover:scale-110 transition duration-500"
                        />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-[#b8860b] transition">
                      {sec.title}
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed mb-5">
                      {sec.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {sec.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-stone-700 font-medium">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#b8860b] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                    <Link
                      href={sec.href}
                      className="text-xs font-bold text-[#b8860b] hover:underline flex items-center gap-1"
                    >
                      View Matching Products &rarr;
                    </Link>
                    <a
                      href={`https://wa.me/919930349455?text=Hello%20Atlanta%20Furniture,%20I%20need%20a%20bulk%20quote%20for%20${encodeURIComponent(sec.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                    >
                      <MessageSquare className="h-3.5 w-3.5 text-emerald-600" /> Direct Inquiry
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Instant Quote CTA Box */}
        <Reveal variant="scale" delay={200}>
          <div className="rounded-3xl border border-stone-200 bg-gradient-to-r from-amber-50 via-white to-amber-50 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
            <div>
              <h3 className="text-2xl font-bold text-stone-900 mb-1">
                Have an active campus, office, or municipal project?
              </h3>
              <p className="text-stone-600 text-sm max-w-xl">
                Send us your architectural layout, bill of quantities (BOQ), or target specifications for prioritized factory estimation within 2 hours.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className="rounded-xl bg-[#b8860b] px-6 py-3.5 text-xs sm:text-sm font-bold uppercase text-white hover:bg-[#8c6506] transition shadow-md"
              >
                Submit Layout / BOQ
              </Link>
              <a
                href={site.phoneHref}
                className="rounded-xl border border-stone-300 bg-white px-4 py-3.5 text-xs sm:text-sm font-bold text-stone-800 hover:bg-stone-50 transition flex items-center gap-2 shadow-sm"
              >
                <Phone className="h-4 w-4 text-[#b8860b]" />
                <span>Call Us</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
