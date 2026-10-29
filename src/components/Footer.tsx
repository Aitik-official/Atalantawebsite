"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Download,
  ExternalLink,
  Award,
  Truck,
} from "lucide-react";
import Logo from "./Logo";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 relative overflow-hidden">
      {/* Top Brand Gradient Accent Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#0090d0] via-sky-400 to-[#e31e24]" />

      {/* ------------------------------------------------------------------------- */}
      {/* Top CTA Bar: Catalog Download & Institutional Inquiry                     */}
      {/* ------------------------------------------------------------------------- */}
      <div className="border-b border-slate-800 bg-slate-950/60 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-7">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center lg:text-left">
              <div className="h-12 w-12 rounded-2xl bg-sky-500/10 border border-[#0090d0]/30 flex items-center justify-center text-[#0090d0] shrink-0 shadow-xs">
                <Download className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  Download Official Atlanta Furniture Catalog
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Complete technical specifications, dimensions, color charts & institutional bulk pricing.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 text-xs font-bold uppercase tracking-wider transition shadow-sm hover:scale-105"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Request Price List</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0090d0] hover:bg-[#0073ab] text-white px-5 py-3 text-xs font-bold uppercase tracking-wider transition shadow-sm hover:scale-105"
              >
                <span>Submit Tender / RFQ</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------------- */}
      {/* Main Footer Columns                                                       */}
      {/* ------------------------------------------------------------------------- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Column 1: Brand Info & Certifications (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center gap-3 mb-4 bg-white/90 p-2.5 rounded-xl w-fit">
              <Logo />
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
              Atlanta Furniture is India’s trusted manufacturer of 100% virgin polymer molded seating, ergonomic corporate office chairs, heavy-duty classroom dual-desks, and commercial mobile waste management systems.
            </p>

            {/* Quality & Manufacturing Badges */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              <div className="flex items-center gap-2 rounded-xl bg-slate-800/80 border border-slate-700/80 p-2.5 shadow-xs">
                <ShieldCheck className="h-4 w-4 text-[#0090d0] shrink-0" />
                <span className="text-[11px] font-bold text-slate-200">ISO 9001:2015</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-slate-800/80 border border-slate-700/80 p-2.5 shadow-xs">
                <Award className="h-4 w-4 text-[#e31e24] shrink-0" />
                <span className="text-[11px] font-bold text-slate-200">BIFMA Ergonomics</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-slate-800/80 border border-slate-700/80 p-2.5 shadow-xs">
                <Sparkles className="h-4 w-4 text-[#0090d0] shrink-0" />
                <span className="text-[11px] font-bold text-slate-200">100% Virgin Polymer</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-slate-800/80 border border-slate-700/80 p-2.5 shadow-xs">
                <Truck className="h-4 w-4 text-[#e31e24] shrink-0" />
                <span className="text-[11px] font-bold text-slate-200">Pan-India Dispatch</span>
              </div>
            </div>

            <div className="text-xs font-semibold text-slate-400">
              Direct Factory Supply & Institutional Tender Fulfillment
            </div>
          </div>

          {/* Column 2: Plastic & Waste Divisions (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-sky-400 mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#0090d0]" />
              Polymer & Waste Management
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-medium">
              <li>
                <Link
                  href="/plastic-furniture/plastic-chairs"
                  className="hover:text-[#0090d0] transition flex items-center gap-1.5"
                >
                  <ArrowRight className="h-3 w-3 text-[#0090d0]" />
                  <span>Plastic Chairs (14 Models)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/plastic-furniture/dining-tables"
                  className="hover:text-[#0090d0] transition flex items-center gap-1.5"
                >
                  <ArrowRight className="h-3 w-3 text-[#0090d0]" />
                  <span>4 & 6-Seater Dining Tables</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/plastic-furniture/stools"
                  className="hover:text-[#0090d0] transition flex items-center gap-1.5"
                >
                  <ArrowRight className="h-3 w-3 text-[#0090d0]" />
                  <span>Rhino & Deo Utility Stools</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/plastic-furniture/party-halls"
                  className="hover:text-[#0090d0] transition flex items-center gap-1.5"
                >
                  <ArrowRight className="h-3 w-3 text-[#0090d0]" />
                  <span>Party Hall & Banquet Seating</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/waste-management/dustbin"
                  className="hover:text-[#0090d0] transition flex items-center gap-1.5"
                >
                  <ArrowRight className="h-3 w-3 text-[#0090d0]" />
                  <span>240L / 120L Wheeled Mobile Dustbins</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/plastic-furniture"
                  className="text-[#0090d0] font-bold hover:underline flex items-center gap-1 pt-1.5"
                >
                  <span>Explore All Plastic Models &rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Office & Institutional (2 Cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-sky-400 mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#0090d0]" />
              Office & Institutional
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-medium">
              <li>
                <Link
                  href="/office-furniture/director-chair"
                  className="hover:text-[#0090d0] transition flex items-center gap-1.5"
                >
                  <ArrowRight className="h-3 w-3 text-[#0090d0]" />
                  <span>Director Chairs</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/office-furniture/executive-chairs"
                  className="hover:text-[#0090d0] transition flex items-center gap-1.5"
                >
                  <ArrowRight className="h-3 w-3 text-[#0090d0]" />
                  <span>Executive Mesh Chairs</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/office-furniture/visitor-chairs"
                  className="hover:text-[#0090d0] transition flex items-center gap-1.5"
                >
                  <ArrowRight className="h-3 w-3 text-[#0090d0]" />
                  <span>Visitor Sledge Chairs</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/office-furniture/wardrobes"
                  className="hover:text-[#0090d0] transition flex items-center gap-1.5"
                >
                  <ArrowRight className="h-3 w-3 text-[#0090d0]" />
                  <span>Steel Wardrobes</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/office-institutional/student-benches"
                  className="hover:text-[#0090d0] transition flex items-center gap-1.5"
                >
                  <ArrowRight className="h-3 w-3 text-[#0090d0]" />
                  <span>Student Dual Benches</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/office-institutional/computer-table"
                  className="hover:text-[#0090d0] transition flex items-center gap-1.5"
                >
                  <ArrowRight className="h-3 w-3 text-[#0090d0]" />
                  <span>Computer Lab Tables</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Factory Coordinates & Contact (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-sky-400 mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#0090d0]" />
              Factory Hub & Sales
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#e31e24] shrink-0 mt-0.5" />
                <a
                  href={site.address.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0090d0] transition leading-relaxed font-medium"
                >
                  {site.address.full}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#0090d0] shrink-0" />
                <div className="flex flex-col">
                  <a href={site.phoneHref} className="hover:text-[#0090d0] transition font-bold text-white">
                    {site.phone}
                  </a>
                  {site.secondaryPhone !== site.phone ? (
                    <a href={`tel:${site.secondaryPhone.replace(/\s/g, "")}`} className="hover:text-[#0090d0] transition text-slate-400">
                      {site.secondaryPhone}
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#e31e24] shrink-0" />
                <div className="flex flex-col">
                  <a href={`mailto:${site.email}`} className="hover:text-[#0090d0] transition font-semibold text-white">
                    {site.email}
                  </a>
                  {site.secondaryEmail !== site.email ? (
                    <a href={`mailto:${site.secondaryEmail}`} className="hover:text-[#0090d0] transition text-slate-400">
                      {site.secondaryEmail}
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-slate-400 pt-1 font-medium">
                <Clock className="h-4 w-4 text-[#0090d0] shrink-0" />
                <span>{site.hoursShort} (Sun: Closed)</span>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------------- */}
        {/* Bottom Bar: Copyright & Quick Links                                       */}
        {/* ------------------------------------------------------------------------- */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <div>
            © {new Date().getFullYear()} {site.name} ({site.brandName}). All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-6 text-slate-300">
            <Link href="/about" className="hover:text-[#0090d0] transition">
              About Us
            </Link>
            <Link href="/certificates" className="hover:text-[#0090d0] transition">
              Certificates & ISO
            </Link>
            <Link href="/clients" className="hover:text-[#0090d0] transition">
              Clients
            </Link>
            <Link href="/testimonials" className="hover:text-[#0090d0] transition">
              Testimonials
            </Link>
            <Link href="/contact" className="hover:text-[#0090d0] transition">
              Contact & RFQ
            </Link>
          </div>

          <div className="flex items-center gap-2 text-slate-300 font-semibold">
            <span>Engineered & Manufactured in India 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
