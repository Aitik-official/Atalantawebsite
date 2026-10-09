import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Award, FileCheck2, CheckCircle2, Factory, ArrowRight } from "lucide-react";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Quality Certifications & Standards | Atlanta Furniture",
  description: "ISO 9001:2015, 100% Virgin Polymer Testing, and Safety Compliance Certifications of Atlanta Furniture.",
};

export default function CertificatesPage() {
  const certifications = [
    {
      title: "ISO 9001:2015 Quality Management System",
      issuer: "International Quality Accreditation Council",
      desc: "Certified manufacturing processes governing raw polymer grading, robotic pipe bending, and electrostatic powder coating.",
      tag: "Active Quality System",
    },
    {
      title: "100% Virgin Polypropylene Testing Certificate",
      issuer: "Polymer Material Testing Lab",
      desc: "Verified zero-regrind formulation ensuring high tensile resilience, UV protection, and crack resistance.",
      tag: "Raw Material Purity",
    },
    {
      title: "School Furniture Ergonomics & Safety Code",
      issuer: "Institutional Ergonomics Standard",
      desc: "Certified for classroom safety, load-bearing integrity up to 300kg, and anti-pinch rounded edges.",
      tag: "Institutional Compliance",
    },
    {
      title: "HDPE Environmental & UV Resistance Benchmark",
      issuer: "Sanitation Standards Bureau",
      desc: "High density polyethylene chemical and weather endurance certification for 100L, 120L, and 240L wheelie bins.",
      tag: "Sanitation Certified",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-[#0f1115] text-stone-900 dark:text-white">
      <section className="relative py-20 lg:py-24 bg-[#0f172a] text-white border-b border-slate-800 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#0090d0]/20 border border-[#0090d0]/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0090d0] mb-4">
              <ShieldCheck className="h-3.5 w-3.5" />
              Compliance & Manufacturing Codes
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
              Quality Certifications & <span className="brand-gradient-text">Standards</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Every Atlanta Furniture unit is engineered and tested in compliance with established national and international safety, durability, and raw material standards.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {certifications.map((c, i) => (
            <div
              key={i}
              className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#161920] p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#0090d0]/40 transition duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-sky-50 text-[#0090d0] border border-[#0090d0]/30 px-3 py-1 text-xs font-bold uppercase">
                    {c.tag}
                  </span>
                  <Award className="h-6 w-6 text-[#0090d0]" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {c.title}
                </h3>
                <p className="text-xs font-semibold text-[#0090d0] mb-4">
                  Issued By: {c.issuer}
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {c.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-white/10 mt-6 flex items-center justify-between">
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> Full Compliance Verified
                </span>
                <Link
                  href="/contact"
                  className="text-xs font-bold text-[#0090d0] hover:underline"
                >
                  Request Dossier &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
