import Link from "next/link";
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedPlasticSection from "@/components/FeaturedPlasticSection";
import HomeCategoryShowcases from "@/components/HomeCategoryShowcases";
import WhyChooseUs from "@/components/WhyChooseUs";
import ClientReviews from "@/components/ClientReviews";
import { ArrowRight, MessageSquare, Factory } from "lucide-react";
import { site } from "@/data/site";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f6] text-stone-900">
      {/* 1. Luxury Hero Section */}
      <Hero />

      {/* 2. Bento Grid of 4 Core Product Divisions */}
      <FeaturedCategories />

      {/* 3. Modern Featured Atlanta Plastic Furniture Showcase */}
      <FeaturedPlasticSection />

      {/* 4. Distinct Category Showcase Sections (Office, Institutional, Waste Management) */}
      <HomeCategoryShowcases />

      {/* 5. The Atlanta Quality Standard & Manufacturing Pillars */}
      <WhyChooseUs />

      {/* 6. Client Feedback & Testimonials */}
      <ClientReviews />

      {/* 8. Bottom Direct Factory CTA */}
      <section className="py-16 bg-[#faf8f5] text-stone-900 border-t border-stone-200 relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-[#b8860b]/40 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#8c6506] mb-4">
            <Factory className="h-4 w-4" />
            Direct Factory Sourcing
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 mb-5 leading-tight">
            Ready to Furnish Your Campus, Office, or Commercial Facility?
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
            Get instant factory quotations, custom polymer color matching, and volume discounts delivered right to your inbox or WhatsApp.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#b8860b] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg hover:bg-[#8c6506] transition"
            >
              <span>Request Instant Quotation</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-emerald-600/30 bg-emerald-50 px-7 py-4 text-sm font-bold text-emerald-800 hover:bg-emerald-100 shadow-sm transition"
            >
              <MessageSquare className="h-4 w-4 text-emerald-600" />
              <span>Inquire via WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
