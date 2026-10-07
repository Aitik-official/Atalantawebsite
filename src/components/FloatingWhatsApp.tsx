"use client";

import { MessageSquare, Phone } from "lucide-react";
import { site } from "@/data/site";

export default function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* Phone Floating Button */}
      <a
        href={site.phoneHref}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c59b27] text-black shadow-xl hover:bg-[#e6b83b] hover:scale-110 transition-all duration-300 border border-white/20"
        title="Call Atlanta Furniture"
        aria-label="Call Atlanta Furniture"
      >
        <Phone className="h-5 w-5 fill-current" />
      </a>

      {/* WhatsApp Floating Button */}
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl hover:bg-emerald-400 hover:scale-110 transition-all duration-300 pulse-glow"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="h-7 w-7" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400"></span>
        </span>
      </a>
    </div>
  );
}
