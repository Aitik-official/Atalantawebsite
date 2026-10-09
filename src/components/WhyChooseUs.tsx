import { ShieldCheck, Hammer, Sparkles, Truck, Award } from "lucide-react";
import { stats } from "@/data/site";
import Reveal from "./Reveal";

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "100% Virgin Grade Polymers",
      description:
        "Every plastic molded chair and table is manufactured using pure virgin polypropylene without recycled regrind, ensuring shatterproof tensile strength and long-term UV resistance.",
    },
    {
      icon: Hammer,
      title: "Robotically Welded CRCA Steel",
      description:
        "Our institutional student benches and desks utilize heavy-gauge cold-rolled close-annealed steel tubing with multi-stage anti-corrosion epoxy powder coating.",
    },
    {
      icon: Sparkles,
      title: "Orthopedically Formulated Ergonomics",
      description:
        "Engineered with orthopedic lumbar contours, synchro-tilt mechanisms, and posture-friendly seat heights that significantly reduce spinal strain.",
    },
    {
      icon: Truck,
      title: "Pan-India Institutional Supply",
      description:
        "Dedicated logistics network providing factory-direct volume deliveries and professional on-site installation for educational institutions, corporate parks, and municipalities.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-50 text-slate-900 border-y border-slate-200 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal variant="up" delay={50}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 border border-[#0090d0]/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0090d0] mb-3">
              <Award className="h-3.5 w-3.5 text-[#e31e24]" />
              The Atlanta Standard
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
              Why Architects & Institutions <span className="gold-gradient-text">Trust Atlanta</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              From precision injection molds to ISO 9001 certified QA laboratories, Atlanta Furniture sets the benchmark in structural endurance, aesthetic refinement, and cost efficiency.
            </p>
          </div>
        </Reveal>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={idx} variant="up" delay={idx * 100}>
                <div className="h-full rounded-3xl border border-slate-200 bg-white p-7 flex flex-col hover:border-[#0090d0]/50 hover:shadow-2xl transition duration-500 hover:-translate-y-2 shadow-sm">
                  <div className="h-12 w-12 rounded-2xl bg-sky-50 border border-[#0090d0]/30 flex items-center justify-center text-[#0090d0] mb-5">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Dynamic Numerical Stats Banner */}
        <Reveal variant="scale" delay={200}>
          <div className="rounded-3xl border border-[#0090d0]/30 bg-gradient-to-r from-sky-50 via-white to-rose-50 p-8 sm:p-12 shadow-lg">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
              {stats.map((stat, i) => (
                <div key={i} className={`pt-4 lg:pt-0 ${i !== 0 ? "lg:pl-8" : ""}`}>
                  <div className="text-3xl sm:text-5xl font-extrabold text-[#0090d0] mb-1 font-display">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
