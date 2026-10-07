"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
} from "lucide-react";
import { site } from "@/data/site";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "Plastic Furniture",
    quantity: "50",
    organization: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Atlanta Furniture, I would like to request an official quotation.\nName: ${formData.name || "Customer"}\nOrganization: ${formData.organization || "N/A"}\nPhone: ${formData.phone || "N/A"}\nCategory: ${formData.category}\nEstimated Quantity: ${formData.quantity}\nDetails: ${formData.message || "Please contact me."}`
  );

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900">
      {/* Header */}
      <section className="relative py-20 lg:py-24 bg-[#faf8f5] text-stone-900 border-b border-stone-200 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-[#b8860b]/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#8c6506] mb-4">
              <Mail className="h-3.5 w-3.5" />
              Direct Factory Assistance
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 mb-6">
              Contact Atlanta & <span className="gold-gradient-text">Request Quotation</span>
            </h1>
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
              Connect directly with our manufacturing unit in Mumbai for volume pricing, custom color requests, institutional tender inquiries, and physical product demonstrations.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Form + Contact Cards */}
      <section className="py-16 lg:py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Info & Direct Channels (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#b8860b] block mb-2">
                Factory & Head Office
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-4">
                We're Here to Assist Your Project
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                Our sales engineers and technical teams respond promptly to all commercial and institutional inquiries.
              </p>
            </div>

            {/* Direct Channel Cards */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                <div className="h-12 w-12 rounded-xl bg-amber-50 text-[#b8860b] flex items-center justify-center shrink-0 border border-[#b8860b]/20">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                    Direct Phone Support
                  </h4>
                  <a
                    href={site.phoneHref}
                    className="text-base font-bold text-stone-900 hover:text-[#b8860b] block"
                  >
                    {site.phone}
                  </a>
                  <a
                    href="tel:+918898114400"
                    className="text-sm text-stone-600 hover:text-[#b8860b] block mt-0.5"
                  >
                    {site.secondaryPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                    WhatsApp Factory Desk
                  </h4>
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-emerald-700 hover:underline block"
                  >
                    Chat on WhatsApp &rarr;
                  </a>
                  <span className="text-xs text-stone-500 block mt-0.5 font-medium">
                    Instant catalog & quotation responses
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                <div className="h-12 w-12 rounded-xl bg-amber-50 text-[#b8860b] flex items-center justify-center shrink-0 border border-[#b8860b]/20">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                    Official Email Inquiries
                  </h4>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-sm sm:text-base font-bold text-stone-900 hover:text-[#b8860b] block truncate"
                  >
                    {site.email}
                  </a>
                  <a
                    href={`mailto:${site.secondaryEmail}`}
                    className="text-xs text-stone-600 hover:text-[#b8860b] block mt-0.5"
                  >
                    {site.secondaryEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                <div className="h-12 w-12 rounded-xl bg-amber-50 text-[#b8860b] flex items-center justify-center shrink-0 border border-[#b8860b]/20">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                    Factory & Works Address
                  </h4>
                  <p className="text-sm font-medium text-stone-800 leading-relaxed">
                    {site.address.full}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                <div className="h-12 w-12 rounded-xl bg-amber-50 text-[#b8860b] flex items-center justify-center shrink-0 border border-[#b8860b]/20">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                    Operating Hours
                  </h4>
                  <p className="text-sm font-medium text-stone-800">
                    {site.hours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Quotation Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-lg">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-stone-900 mb-1">
                  Request Official Quotation / RFQ
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm">
                  Fill out your specifications below and receive a detailed quotation within 2 hours.
                </p>
              </div>

              {submitted ? (
                <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-8 text-center animate-fadeIn">
                  <div className="h-14 w-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-bold text-emerald-900 mb-2">
                    Quotation Request Received!
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-700 mb-6 max-w-md mx-auto">
                    Thank you, {formData.name}. Our commercial estimating division has received your inquiry for {formData.category} ({formData.quantity} units) and is reviewing it now.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`https://wa.me/919930349455?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-xs font-bold uppercase text-white hover:bg-emerald-500 transition shadow-sm"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Speed Up via WhatsApp
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-semibold text-stone-600 hover:text-stone-900 underline"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:border-[#b8860b] focus:outline-none shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Organization / School / Company *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="e.g. Global High School"
                        className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:border-[#b8860b] focus:outline-none shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Phone Number / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98200 12345"
                        className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:border-[#b8860b] focus:outline-none shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. ramesh@school.edu.in"
                        className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:border-[#b8860b] focus:outline-none shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Furniture Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 focus:border-[#b8860b] focus:outline-none cursor-pointer shadow-sm font-medium"
                      >
                        <option value="Plastic Furniture">Plastic Furniture (Chairs, Stools, Tables)</option>
                        <option value="Office Furniture">Office Furniture (Director & Executive Chairs)</option>
                        <option value="Institutional Furniture">Institutional (Student Benches & Desks)</option>
                        <option value="Waste Management">Waste Management (100L, 120L, 240L Dustbins)</option>
                        <option value="Complete Facility Turnkey">Complete Facility Turnkey Package</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Estimated Quantity (Units)
                      </label>
                      <input
                        type="text"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        placeholder="e.g. 50 Benches or 100 Chairs"
                        className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:border-[#b8860b] focus:outline-none shadow-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Specific Requirements, Dimensions, or Custom Colors
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mention preferred models (e.g., Student Bench III, Crystal Chair, 240L Dustbin), delivery location, or tender deadline..."
                      className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:border-[#b8860b] focus:outline-none shadow-sm"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-[#b8860b] hover:bg-[#8c6506] py-4 px-6 text-sm font-bold uppercase tracking-wider text-white shadow-md transition"
                    >
                      <Send className="h-4 w-4" />
                      <span>Submit Quotation Request</span>
                    </button>

                    <a
                      href={`https://wa.me/919930349455?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-2xl border border-emerald-600/30 bg-emerald-50 py-4 px-6 text-sm font-bold text-emerald-800 hover:bg-emerald-100 transition shadow-sm"
                    >
                      <MessageSquare className="h-4 w-4 text-emerald-600" />
                      <span>Send on WhatsApp</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
