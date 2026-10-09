import { Clock, Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import Link from "next/link";
import { site } from "@/data/site";

export default function TopBar() {
  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-2 text-[12px] sm:gap-4 sm:px-6 sm:py-2.5 lg:px-8">
        {/* Left: Email & Hours */}
        <div className="flex min-w-0 items-center gap-3 sm:gap-6">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-1.5 text-slate-300 hover:text-[#0090d0] transition font-medium"
          >
            <Mail className="h-3.5 w-3.5 text-[#0090d0] shrink-0" />
            <span className="truncate">{site.email}</span>
          </a>
          <span className="hidden items-center gap-1.5 text-slate-400 md:inline-flex">
            <Clock className="h-3.5 w-3.5 text-[#0090d0] shrink-0" />
            {site.hoursShort}
          </span>
        </div>

        {/* Right: Phone, Location, WhatsApp & Quick Quote */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-[#0090d0] transition"
          >
            <Phone className="h-3.5 w-3.5 text-[#e31e24] shrink-0" />
            <span className="hidden sm:inline">{site.phone}</span>
            <span className="sm:hidden">Call</span>
          </a>

          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition font-semibold sm:inline-flex"
          >
            <MessageSquare className="h-3.5 w-3.5 shrink-0" />
            WhatsApp
          </a>

          <span className="hidden items-center gap-1.5 text-slate-400 lg:inline-flex">
            <MapPin className="h-3.5 w-3.5 text-[#0090d0] shrink-0" />
            Mumbai, India
          </span>

          <Link
            href="/contact"
            className="inline-flex items-center gap-1 rounded-lg bg-[#e31e24] hover:bg-[#c5161b] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm transition"
          >
            Request Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
