import Link from "next/link";
import {
  Factory,
  CheckCircle2,
  Target,
  Sparkles,
} from "lucide-react";
import { stats } from "@/data/site";

export const metadata = {
  title: "About Us | Atlanta Furniture & Atlanta World",
  description:
    "Learn about Atlanta Furniture’s 10+ year journey in high-precision polymer molding, steel fabrication, and ergonomic institutional furniture manufacturing.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900">
      {/* Header Banner */}
      <section className="relative py-20 lg:py-24 bg-[#faf8f5] text-stone-900 border-b border-stone-200 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-[#b8860b]/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#8c6506] mb-4">
              <Factory className="h-3.5 w-3.5" />
              10+ Years of Manufacturing Mastery
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 mb-6">
              Engineering Ergonomics & <span className="gold-gradient-text">Structural Longevity</span>
            </h1>
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed mb-8">
              Atlanta Furniture was established with a singular mission: to manufacture institutional and residential furniture that eliminates compromise between aesthetic elegance and lifelong commercial endurance.
            </p>
          </div>
        </div>
      </section>

      {/* Narrative & Factory Overview */}
      <section className="py-16 lg:py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 flex flex-col">
            <span className="text-xs font-bold uppercase tracking-widest text-[#b8860b] mb-2">
              Our Heritage & Quality Code
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mb-6">
              From High-Tonnage Polymer Injection to Precision Steel Welding
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-4">
              At Atlanta Furniture (Atlanta World), our state-of-the-art facility integrates heavy-duty injection molding machines, robotic pipe bending systems, multi-tank anti-rust pre-treatment setups, and electrostatic powder coating lines.
            </p>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
              Unlike generic suppliers who rely on recycled brittle plastic fillers, 100% of our polymer seating utilizes virgin polypropylene reinforced with UV-stabilizers. The result is furniture that endures years of harsh sun exposure, active classroom dynamics, and continuous corporate use without bending, cracking, or fading.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm font-semibold text-stone-800">
                <CheckCircle2 className="h-5 w-5 text-[#b8860b] shrink-0" />
                <span>Zero Recycled Regrind in High-Stress Seating</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-stone-800">
                <CheckCircle2 className="h-5 w-5 text-[#b8860b] shrink-0" />
                <span>Heavy Gauge CRCA Steel with 7-Tank Epoxy Coating</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-stone-800">
                <CheckCircle2 className="h-5 w-5 text-[#b8860b] shrink-0" />
                <span>ISO 9001:2015 Quality Management Systems</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl border border-stone-200 bg-white p-4 shadow-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80"
                alt="Atlanta Manufacturing Plant"
                className="rounded-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mission & Vision Bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="rounded-3xl border border-stone-200/90 bg-white p-8 sm:p-10 shadow-sm">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 text-[#b8860b] flex items-center justify-center mb-5 border border-[#b8860b]/20">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-3">
              Our Mission
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              To deliver world-class ergonomic furniture engineered with unyielding structural integrity, making certified, durable, and comfortable spaces accessible for schools, businesses, and communities across India.
            </p>
          </div>

          <div className="rounded-3xl border border-stone-200/90 bg-white p-8 sm:p-10 shadow-sm">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 text-[#b8860b] flex items-center justify-center mb-5 border border-[#b8860b]/20">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-3">
              Our Vision
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              To be recognized as India’s most dependable manufacturer of polymer seating, classroom dual desks, and commercial sanitation solutions through ongoing automation, ergonomic research, and sustainable material practices.
            </p>
          </div>
        </div>

        {/* Numerical Stats Banner */}
        <div className="rounded-3xl border border-[#b8860b]/30 bg-gradient-to-r from-amber-50 via-white to-amber-50 p-8 sm:p-12 text-stone-900 shadow-md">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
            {stats.map((stat, i) => (
              <div key={i} className={`pt-4 lg:pt-0 ${i !== 0 ? "lg:pl-8" : ""}`}>
                <div className="text-3xl sm:text-5xl font-extrabold text-[#b8860b] mb-1 font-display">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-stone-700 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
