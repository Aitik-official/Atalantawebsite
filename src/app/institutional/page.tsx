import Link from "next/link";
import {
  GraduationCap,
  Building2,
  PartyPopper,
  Trash2,
  CheckCircle2,
  FileSpreadsheet,
  MessageSquare,
  Phone,
} from "lucide-react";
import { site } from "@/data/site";

export const metadata = {
  title: "Institutional & Bulk Turnkey Furnishing | Atlanta Furniture",
  description:
    "Direct manufacturer supply for schools, universities, corporate parks, banquets, and government tenders across India.",
};

export default function InstitutionalPage() {
  const verticals = [
    {
      title: "Schools, Colleges & Coaching Academies",
      desc: "Dual student benches with integrated storage, computer lab workstations, teacher podiums, and auditorium seating built with anti-pinch safety edges and heavy gauge CRCA steel frames.",
      items: [
        "Primary & Secondary Student Benches (II & III)",
        "Single Seater Classroom Desks",
        "Library Reading Tables & Chairs",
        "Hostel Double-Deck Bunk Beds",
      ],
      icon: GraduationCap,
      image: "https://atlantaworld.in/admin/products/17188714390.jpg",
    },
    {
      title: "Corporate Workspaces & IT Facilities",
      desc: "Ergonomic mesh director seating, high-density synchro executive chairs, conference table suites, and visitor lounge chairs engineered for 12+ hour daily productivity.",
      items: [
        "Executive High-Back Director Chairs (7001 Series)",
        "Mesh Task Seating with Orthopedic Lumbar Support",
        "Modular Workstation Partitions",
        "Heavy Duty Metal Filing & Storage Cabinets",
      ],
      icon: Building2,
      image: "https://atlantaworld.in/admin/products/17161205220.jpg",
    },
    {
      title: "Hospitality, Banquets & Convention Halls",
      desc: "High-load stackable luxury polymer seating, folding banquet catering tables, and outdoor cafe furniture with 100% virgin resin luster.",
      items: [
        "Atlanta CRYSTAL Banquet Chairs",
        "Atlanta ARIZONA Molded Seating",
        "Heavy Duty Stools & Party Hall Tables",
        "UV-Stabilized All-Weather Garden Sets",
      ],
      icon: PartyPopper,
      image: "https://atlantaworld.in/admin/products/17164641970.png",
    },
    {
      title: "Municipal Waste & Commercial Sanitation",
      desc: "Commercial wheelie dustbins (100L, 120L, 240L) manufactured from high molecular density virgin HDPE for housing societies, hospitals, and municipal corporations.",
      items: [
        "240 Litre Heavy-Duty Wheelie Bin",
        "120 Litre Mobile Waste Collector",
        "100 Litre Commercial Dustbin",
        "Color-Coded Bio-Medical & Segregation Bins",
      ],
      icon: Trash2,
      image: "https://atlantaworld.in/admin/products/17172400200.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900">
      {/* Hero Header */}
      <section className="relative py-20 lg:py-24 bg-[#faf8f5] text-stone-900 border-b border-stone-200 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-[#b8860b]/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#8c6506] mb-4">
              <FileSpreadsheet className="h-3.5 w-3.5" />
              B2B & Institutional Turnkey Supply
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 mb-6">
              Factory Direct Sourcing for <span className="gold-gradient-text">Large Facilities</span>
            </h1>
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed mb-8">
              Atlanta Furniture collaborates directly with architects, procurement committees, school trustees, and facility managers across India to deliver custom-engineered furniture at scale.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="rounded-2xl bg-[#b8860b] px-7 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg hover:bg-[#8c6506] transition"
              >
                Submit Institutional RFQ
              </Link>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-emerald-600/30 bg-emerald-50 px-6 py-4 text-sm font-bold text-emerald-800 hover:bg-emerald-100 transition shadow-sm"
              >
                <MessageSquare className="h-4 w-4 text-emerald-600" />
                <span>Chat with Project Lead</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Verticals Grid */}
      <section className="py-16 lg:py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mb-4">
            Specialized Solutions for Every Sector
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Engineered to comply with stringent educational safety codes, corporate ergonomic standards, and municipal durability benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {verticals.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="rounded-3xl border border-stone-200/90 bg-white p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#b8860b]/50 transition duration-300"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="h-14 w-14 rounded-2xl bg-amber-50 text-[#b8860b] flex items-center justify-center border border-[#b8860b]/30">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="h-24 w-24 rounded-2xl bg-[#faf8f5] border border-stone-200 p-2 flex items-center justify-center overflow-hidden shrink-0">
                      <img src={v.image} alt={v.title} className="h-full w-full object-contain" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-stone-900 mb-3">
                    {v.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-6">
                    {v.desc}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {v.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-700 font-medium">
                        <CheckCircle2 className="h-4 w-4 text-[#b8860b] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-stone-100 flex items-center justify-between">
                  <Link
                    href="/contact"
                    className="text-xs sm:text-sm font-bold text-[#b8860b] hover:underline"
                  >
                    Request Volume Pricing &rarr;
                  </Link>
                  <span className="text-xs text-stone-400 font-medium">Custom Colors Available</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Turnkey Process Steps */}
        <div className="rounded-3xl border border-stone-200 bg-white p-8 sm:p-12 shadow-sm">
          <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 text-center mb-10">
            How Atlanta Executes Institutional Projects
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-[#b8860b] text-white font-extrabold flex items-center justify-center text-lg mb-4 shadow-sm">
                1
              </div>
              <h4 className="font-bold text-base text-stone-900 mb-2">
                Layout / BOQ Review
              </h4>
              <p className="text-xs text-stone-500">
                Share your architectural drawings, student strength, or room dimensions with our design engineers.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-[#b8860b] text-white font-extrabold flex items-center justify-center text-lg mb-4 shadow-sm">
                2
              </div>
              <h4 className="font-bold text-base text-stone-900 mb-2">
                Sample Demonstration
              </h4>
              <p className="text-xs text-stone-500">
                Physical model samples provided for committee inspection, load testing, and color approval.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-[#b8860b] text-white font-extrabold flex items-center justify-center text-lg mb-4 shadow-sm">
                3
              </div>
              <h4 className="font-bold text-base text-stone-900 mb-2">
                Volume Manufacturing
              </h4>
              <p className="text-xs text-stone-500">
                High-capacity automated polymer molding and robotic steel fabrication with strict ISO QA checks.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-[#b8860b] text-white font-extrabold flex items-center justify-center text-lg mb-4 shadow-sm">
                4
              </div>
              <h4 className="font-bold text-base text-stone-900 mb-2">
                Delivery & Assembly
              </h4>
              <p className="text-xs text-stone-500">
                Safe pan-India container transport with trained installation crews for swift on-site setup.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
