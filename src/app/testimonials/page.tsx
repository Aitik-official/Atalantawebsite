import Link from "next/link";
import { Star, Quote, Building2, CheckCircle2 } from "lucide-react";
import { testimonials } from "@/data/site";

export const metadata = {
  title: "Clientele & Testimonials | Atlanta Furniture",
  description:
    "Discover feedback and case studies from schools, universities, corporate parks, and banquet facilities furnished by Atlanta Furniture.",
};

export default function TestimonialsPage() {
  const caseStudies = [
    {
      title: "St. Xavier's International School Campus",
      location: "Mumbai, Maharashtra",
      scope: "450 Student Dual Benches, 65 Computer Lab Desks & 30 Staff Ergonomic Chairs",
      quote:
        "The heavy-duty steel benches have withstood 3 academic years without a single broken fastener or joint failure. Outstanding build quality.",
      client: "Trustee Management Board",
    },
    {
      title: "Apex Global Tech Park (3 Floors)",
      location: "Pune, Maharashtra",
      scope: "280 Director & Executive Synchro-Tilt Mesh Chairs",
      quote:
        "Our facility team observed an immediate drop in ergonomics complaints. The Korean breathable mesh and lumbar support are top tier.",
      client: "Facilities Director",
    },
    {
      title: "Grand Royal Banquets & Resort",
      location: "Thane, Maharashtra",
      scope: "600 Atlanta Crystal Stackable Chairs & 50 Buffet Tables",
      quote:
        "Lightweight for our staff to rearrange between weddings, yet exceptionally sturdy with zero wobble even with heavy loads.",
      client: "Managing Partner",
    },
    {
      title: "Palms Greenfield Residential Township",
      location: "Navi Mumbai, Maharashtra",
      scope: "40 x 240L & 80 x 120L Heavy Duty Mobile Sanitation Bins",
      quote:
        "The UV stabilized HDPE polymer resists bleaching under scorching sun and the rubber wheels glide smoothly on paved roads.",
      client: "Estate Management Committee",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900">
      {/* Header */}
      <section className="relative py-20 lg:py-24 bg-[#faf8f5] text-stone-900 border-b border-stone-200 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-[#b8860b]/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#8c6506] mb-4">
              <Building2 className="h-3.5 w-3.5" />
              Verified Case Studies
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 mb-6">
              Clientele & <span className="gold-gradient-text">Project Showcase</span>
            </h1>
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed mb-8">
              Explore how institutions, corporate campuses, banquet venues, and municipal townships across India benefit from Atlanta Furniture’s manufacturing excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 lg:py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mb-3">
            Featured Turnkey Deliveries
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Detailed project scopes completed on schedule with factory direct warranties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {caseStudies.map((cs, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-stone-200/90 bg-white p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#b8860b]/50 transition duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#b8860b]">
                    {cs.location}
                  </span>
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-stone-900 mb-2">
                  {cs.title}
                </h3>

                <div className="rounded-xl bg-[#faf8f5] border border-stone-200 p-3 text-xs font-medium text-stone-700 mb-5">
                  <strong className="text-stone-900 block mb-0.5">Project Scope:</strong>
                  {cs.scope}
                </div>

                <p className="text-stone-600 text-sm leading-relaxed italic mb-6">
                  "{cs.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="font-bold text-stone-900">
                  {cs.client}
                </span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Verified Project
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Regular Testimonials Grid */}
        <div className="border-t border-stone-200 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
              What Facility Directors Say
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-stone-200/90 bg-white p-8 shadow-sm"
              >
                <Quote className="h-8 w-8 text-[#b8860b]/25 mb-4" />
                <p className="text-stone-600 text-sm leading-relaxed mb-6 italic font-medium">
                  "{t.quote}"
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                  <div>
                    <h4 className="font-bold text-sm text-stone-900">
                      {t.author}
                    </h4>
                    <p className="text-xs text-[#b8860b] font-bold">{t.role} · {t.company}</p>
                  </div>
                  <div className="flex items-center text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
