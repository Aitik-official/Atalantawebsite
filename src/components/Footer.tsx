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
    <footer className="bg-[#f5f2eb] text-stone-700 border-t border-stone-200/90 relative overflow-hidden">
      {/* Top Gold Gradient Accent Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#8c6506] via-[#d4a017] to-[#8c6506]" />

      {/* ------------------------------------------------------------------------- */}
      {/* Top CTA Bar: Catalog Download & Institutional Inquiry                     */}
      {/* ------------------------------------------------------------------------- */}
      <div className="border-b border-stone-200/90 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-7">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center lg:text-left">
              <div className="h-12 w-12 rounded-2xl bg-amber-50 border border-[#b8860b]/30 flex items-center justify-center text-[#b8860b] shrink-0 shadow-xs">
                <Download className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-stone-900">
                  Download Official Atlanta Furniture Catalog
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
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
                className="inline-flex items-center gap-2 rounded-xl bg-stone-900 hover:bg-[#b8860b] text-white px-5 py-3 text-xs font-bold uppercase tracking-wider transition shadow-sm hover:scale-105"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-stone-200">
          {/* Column 1: Brand Info & Certifications (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <Logo />
            </div>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6">
              Atlanta Furniture is India’s trusted manufacturer of 100% virgin polymer molded seating, ergonomic corporate office chairs, heavy-duty classroom dual-desks, and commercial mobile waste management systems.
            </p>

            {/* Quality & Manufacturing Badges */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              <div className="flex items-center gap-2 rounded-xl bg-white border border-stone-200/90 p-2.5 shadow-xs">
                <ShieldCheck className="h-4 w-4 text-[#b8860b] shrink-0" />
                <span className="text-[11px] font-bold text-stone-800">ISO 9001:2015</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white border border-stone-200/90 p-2.5 shadow-xs">
                <Award className="h-4 w-4 text-[#b8860b] shrink-0" />
                <span className="text-[11px] font-bold text-stone-800">BIFMA Ergonomics</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white border border-stone-200/90 p-2.5 shadow-xs">
                <Sparkles className="h-4 w-4 text-[#b8860b] shrink-0" />
                <span className="text-[11px] font-bold text-stone-800">100% Virgin Polymer</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white border border-stone-200/90 p-2.5 shadow-xs">
                <Truck className="h-4 w-4 text-[#b8860b] shrink-0" />
                <span className="text-[11px] font-bold text-stone-800">Pan-India Dispatch</span>
              </div>
            </div>

            <div className="text-xs font-semibold text-stone-600">
              Direct Factory Supply & Institutional Tender Fulfillment
            </div>
          </div>

          {/* Column 2: Plastic & Waste Divisions (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#8c6506] mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#b8860b]" />
              Polymer & Waste Management
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600 font-medium">
              <li>
                <Link
                  href="/plastic-furniture/plastic-chairs"
                  className="hover:text-[#b8860b] transition flex items-center gap-1.5"
                >
                  <ArrowRight className="h-3 w-3 text-[#b8860b]" />
                  <span>Plastic Chairs (14 Models)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/plastic-furniture/dining-tables"
                  className="hover:text-[#b8860b] transition flex items-center gap-1.5"
                >
                  <ArrowRight className="h-3 w-3 text-[#b8860b]" />
                  <span>4 & 6-Seater Dining Tables</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/plastic-furniture/stools"
                  className="hover:text-[#b8860b] transition flex items-center gap-1.5"
                >
                  <ArrowRight className="h-3 w-3 text-[#b8860b]" />
                  <span>Rhino & Deo Utility Stools</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/plastic-furniture/party-halls"
                  className="hover:text-[#b8860b] transition flex items-center gap-1.5"
                >
                  <ArrowRight className="h-3 w-3 text-[#b8860b]" />
                  <span>Party Hall & Banquet Seating</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/waste-management/dustbin"
                  className="hover:text-[#b8860b] transition flex items-center gap-1.5"
                >
                  <ArrowRight className="h-3 w-3 text-[#b8860b]" />
                  <span>240L / 120L Wheeled Mobile Dustbins</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/plastic-furniture"
                  className="text-[#b8860b] font-bold hover:underline flex items-center gap-1 pt-1.5"
                >
                  <span>Explore All Plastic Models &rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Office & Institutional (2 Cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#8c6506] mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#b8860b]" />
              Office & Institutional
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600 font-medium">
              <li>
                <Link
                  href="/office-furniture/director-chair"
                  className="hover:text-[#b8860b] transition flex items-center gap-1.5"
                >
                  <ArrowRight className="h-3 w-3 text-[#b8860b]" />
                  <span>Director Chairs</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/office-furniture/executive-chairs"
                  className="hover:text-[#b8860b] transition flex items-center gap-1.5"
                >
                  <ArrowRight className="h-3 w-3 text-[#b8860b]" />
                  <span>Executive Mesh Chairs</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/office-furniture/visitor-chairs"
                  className="hover:text-[#b8860b] transition flex items-center gap-1.5"
                >
                  <ArrowRight className="h-3 w-3 text-[#b8860b]" />
                  <span>Visitor Sledge Chairs</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/office-furniture/wardrobes"
                  className="hover:text-[#b8860b] transition flex items-center gap-1.5"
                >
                  <ArrowRight className="h-3 w-3 text-[#b8860b]" />
                  <span>Steel Wardrobes</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/office-institutional/student-benches"
                  className="hover:text-[#b8860b] transition flex items-center gap-1.5"
                >
                  <ArrowRight className="h-3 w-3 text-[#b8860b]" />
                  <span>Student Dual Benches</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/office-institutional/computer-table"
                  className="hover:text-[#b8860b] transition flex items-center gap-1.5"
                >
                  <ArrowRight className="h-3 w-3 text-[#b8860b]" />
                  <span>Computer Lab Tables</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Factory Coordinates & Contact (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#8c6506] mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#b8860b]" />
              Factory Hub & Sales
            </h4>
            <div className="space-y-3 text-xs text-stone-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#b8860b] shrink-0 mt-0.5" />
                <a
                  href={site.address.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#b8860b] transition leading-relaxed font-medium"
                >
                  {site.address.full}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#b8860b] shrink-0" />
                <div className="flex flex-col">
                  <a href={site.phoneHref} className="hover:text-[#b8860b] transition font-bold text-stone-900">
                    {site.phone}
                  </a>
                  <a href={`tel:${site.secondaryPhone}`} className="hover:text-[#b8860b] transition text-stone-600">
                    {site.secondaryPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#b8860b] shrink-0" />
                <div className="flex flex-col">
                  <a href={`mailto:${site.email}`} className="hover:text-[#b8860b] transition font-semibold text-stone-900">
                    {site.email}
                  </a>
                  <a href={`mailto:${site.secondaryEmail}`} className="hover:text-[#b8860b] transition text-stone-600">
                    {site.secondaryEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-stone-600 pt-1 font-medium">
                <Clock className="h-4 w-4 text-[#b8860b] shrink-0" />
                <span>{site.hoursShort} (Sun: Closed)</span>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------------- */}
        {/* Bottom Bar: Copyright & Quick Links                                       */}
        {/* ------------------------------------------------------------------------- */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-medium">
          <div>
            © {new Date().getFullYear()} {site.name} ({site.brandName}). All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-6 text-stone-600">
            <Link href="/about" className="hover:text-[#b8860b] transition">
              About Us
            </Link>
            <Link href="/certificates" className="hover:text-[#b8860b] transition">
              Certificates & ISO
            </Link>
            <Link href="/clients" className="hover:text-[#b8860b] transition">
              Clients
            </Link>
            <Link href="/testimonials" className="hover:text-[#b8860b] transition">
              Testimonials
            </Link>
            <Link href="/contact" className="hover:text-[#b8860b] transition">
              Contact & RFQ
            </Link>
          </div>

          <div className="flex items-center gap-2 text-stone-600 font-semibold">
            <span>Engineered & Manufactured in India 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
