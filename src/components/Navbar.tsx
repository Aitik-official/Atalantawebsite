"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  ChevronDown, 
  ChevronRight, 
  Menu, 
  Phone, 
  Search, 
  X, 
  MessageSquare
} from "lucide-react";
import Logo from "./Logo";
import { site } from "@/data/site";
import { useCatalog } from "./CatalogProvider";

export default function Navbar() {
  const { navItems } = useCatalog();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200 py-2"
          : "bg-white border-b border-slate-200 py-2.5"
      }`}
    >
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-3 sm:px-5 lg:px-6 gap-3">
        {/* Brand Logo on the far left */}
        <div className="flex items-center shrink-0">
          <Logo />
        </div>

        {/* Desktop Navigation - All in ONE single row */}
        <nav ref={navRef} className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 flex-1 justify-center shrink-0">
          {navItems.map((item) => {
            const children = item.children;
            const hasChildren = Boolean(children && children.length > 0);
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            const isOpen = activeDropdown === item.label;

            if (hasChildren && children) {
              return (
                <div
                  key={item.label}
                  className="relative group shrink-0"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-1 px-2 xl:px-2.5 py-1.5 text-[11px] xl:text-[12.5px] font-bold tracking-tight uppercase transition rounded-lg whitespace-nowrap shrink-0 ${
                      isActive
                        ? "text-[#0090d0] bg-sky-50 font-extrabold"
                        : "text-slate-800 hover:text-[#0090d0] hover:bg-sky-50/60"
                    }`}
                  >
                    <span className="whitespace-nowrap">{item.label}</span>
                    <ChevronDown
                      className={`h-3 w-3 transition-transform duration-200 text-[#0090d0] shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Link>

                  {/* Clean Dropdown Menu */}
                  {isOpen && (
                    <div className="absolute left-0 top-full pt-1.5 min-w-[260px] z-50 animate-fadeIn">
                      <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-xl backdrop-blur-xl">
                        <div className="px-3 py-1.5 border-b border-slate-100 mb-1 flex items-center justify-between">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0090d0]">
                            {item.label}
                          </span>
                          <Link
                            href={item.href}
                            className="text-[10px] font-bold text-slate-500 hover:text-[#e31e24] flex items-center gap-0.5"
                          >
                            View All <ChevronRight className="h-3 w-3" />
                          </Link>
                        </div>

                        <div className="flex flex-col gap-0.5">
                          {children.map((sub) => {
                            const isSubActive = pathname === sub.href;
                            return (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className={`flex items-center justify-between px-3 py-2 text-[12px] font-bold rounded-lg transition whitespace-nowrap ${
                                  isSubActive
                                    ? "bg-sky-50 text-[#0090d0]"
                                    : "text-slate-700 hover:bg-slate-50 hover:text-[#0090d0]"
                                }`}
                              >
                                <span>{sub.label}</span>
                                <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 text-[#e31e24] transition" />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`px-2 xl:px-2.5 py-1.5 text-[11px] xl:text-[12.5px] font-bold tracking-tight uppercase transition rounded-lg whitespace-nowrap shrink-0 ${
                  isActive
                    ? "text-[#0090d0] bg-sky-50 font-extrabold"
                    : "text-slate-800 hover:text-[#0090d0] hover:bg-sky-50/60"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Search Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-1.5 sm:p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            aria-label="Search Catalog"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Quick WhatsApp CTA */}
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-emerald-600/30 bg-emerald-50 px-2.5 xl:px-3 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition whitespace-nowrap shrink-0"
          >
            <MessageSquare className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden xl:inline">WhatsApp RFQ</span>
          </a>

          {/* Contact / Inquire CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-1 rounded-lg bg-[#0090d0] hover:bg-[#0073ab] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition whitespace-nowrap shrink-0"
          >
            <span>Get Quote</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-black hover:bg-slate-100 transition"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Expandable Light Search Bar */}
      {searchOpen && (
        <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 sm:px-6 shadow-inner">
          <form
            onSubmit={handleSearchSubmit}
            className="mx-auto flex max-w-3xl items-center gap-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search plastic chairs, director chairs, student desks, dustbins..."
                className="w-full rounded-xl border border-slate-300 bg-white py-2 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-[#0090d0] focus:outline-none focus:ring-1 focus:ring-[#0090d0] shadow-xs"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-[#0090d0] hover:bg-[#0073ab] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition shrink-0 shadow-xs"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto shadow-xl">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              className={`px-3 py-2.5 rounded-lg text-sm font-bold uppercase ${
                pathname === "/" ? "bg-sky-50 text-[#0090d0]" : "text-slate-800 hover:bg-slate-50"
              }`}
            >
              HOME
            </Link>

            {/* Mobile Categories Accordion */}
            {navItems
              .filter((item) => item.href !== "/" && item.href !== "/about" && item.href !== "/testimonials" && item.href !== "/contact")
              .map((item) => {
                const children = item.children || [];
                const isAccordionOpen = mobileAccordion === item.label;
                const hasSubActive = children.some((sub) => pathname === sub.href) || pathname === item.href;

                if (children.length === 0) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`px-3 py-2.5 rounded-lg text-sm font-bold uppercase ${
                        hasSubActive ? "bg-sky-50 text-[#0090d0]" : "text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <div key={item.label} className="border-b border-slate-100 py-1">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className={`flex-1 px-3 py-2 text-sm font-bold uppercase ${
                          hasSubActive ? "text-[#0090d0]" : "text-slate-800"
                        }`}
                      >
                        {item.label}
                      </Link>
                      <button
                        onClick={() => setMobileAccordion(isAccordionOpen ? null : item.label)}
                        className="p-2 text-slate-500 hover:text-[#0090d0]"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            isAccordionOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {isAccordionOpen && (
                      <div className="pl-4 pr-2 pb-2 flex flex-col gap-1 bg-slate-50 rounded-xl my-1 p-2">
                        <Link
                          href={item.href}
                          className="px-3 py-1.5 text-xs font-extrabold text-[#0090d0] uppercase hover:underline"
                        >
                          All {item.label} Models &rarr;
                        </Link>
                        {children.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${
                              pathname === sub.href
                                ? "bg-white text-[#0090d0] font-bold shadow-xs"
                                : "text-slate-700 hover:text-[#0090d0]"
                            }`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

            <Link
              href="/about"
              className={`px-3 py-2.5 rounded-lg text-sm font-bold uppercase ${
                pathname === "/about" ? "bg-sky-50 text-[#0090d0]" : "text-slate-800 hover:bg-slate-50"
              }`}
            >
              ABOUT US
            </Link>

            <Link
              href="/testimonials"
              className={`px-3 py-2.5 rounded-lg text-sm font-bold uppercase ${
                pathname === "/testimonials" ? "bg-sky-50 text-[#0090d0]" : "text-slate-800 hover:bg-slate-50"
              }`}
            >
              TESTIMONIAL
            </Link>

            <Link
              href="/contact"
              className={`px-3 py-2.5 rounded-lg text-sm font-bold uppercase ${
                pathname === "/contact" ? "bg-sky-50 text-[#0090d0]" : "text-slate-800 hover:bg-slate-50"
              }`}
            >
              CONTACT
            </Link>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col gap-2.5">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 border border-emerald-600/30 py-2.5 text-xs font-bold text-emerald-700"
            >
              <MessageSquare className="h-4 w-4" />
              Chat on WhatsApp ({site.phone})
            </a>
            <a
              href={site.phoneHref}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#0090d0] hover:bg-[#0073ab] py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs"
            >
              <Phone className="h-3.5 w-3.5" />
              Call Directly
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
