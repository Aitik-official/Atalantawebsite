"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ShieldCheck, MessageSquare, ArrowRight, Star } from "lucide-react";
import { ProductItem, site } from "@/data/site";

interface QuickViewProps {
  product: ProductItem | null;
  onClose: () => void;
}

export default function ProductQuickViewModal({ product, onClose }: QuickViewProps) {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(10);

  if (!product) return null;

  const currentImg = selectedImage || product.image;
  const whatsappMessage = encodeURIComponent(
    `Hello Atlanta Furniture, I would like to inquire about "${product.title}" (${product.category} - ${product.subcategory}). Quantity: ${quantity} units.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 text-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: Product Images */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-square w-full rounded-2xl bg-slate-50 border border-slate-200 p-4 flex items-center justify-center overflow-hidden">
              <img
                src={currentImg}
                alt={product.title}
                className="max-h-full max-w-full object-contain transition duration-300 hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://atlantaworld.in/admin/products/17164641970.png";
                }}
              />
              <span className="absolute left-3 top-3 rounded-full bg-[#0090d0] px-3 py-1 text-[11px] font-bold text-white uppercase tracking-wider shadow-sm">
                {product.subcategory}
              </span>
            </div>

            {/* Thumbnails if gallery exists */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`h-16 w-16 shrink-0 rounded-lg border bg-slate-50 p-1 transition overflow-hidden ${
                      currentImg === img ? "border-[#0090d0]" : "border-slate-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="h-full w-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Order Actions */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0090d0]">
                {product.category}
              </span>
              <span className="text-slate-300">·</span>
              <div className="flex items-center text-amber-500 text-xs gap-1">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-slate-500 font-normal">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              {product.title}
            </h2>

            {/* Pricing Box */}
            <div className="flex items-baseline gap-3 my-3 p-3.5 rounded-xl bg-sky-50/60 border border-[#0090d0]/20">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0090d0]">
                {product.price}
              </span>
              {product.mrp && (
                <span className="text-sm text-slate-400 line-through">
                  MRP: {product.mrp}
                </span>
              )}
              <span className="ml-auto text-xs text-emerald-800 font-bold bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
                In Stock & Ready
              </span>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Specifications Quick View */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 mb-5 space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-500 font-medium">Material</span>
                <span className="font-bold text-slate-800 text-right">{product.material}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-500 font-medium">Warranty</span>
                <span className="font-bold text-emerald-700">{product.warranty}</span>
              </div>
              <div className="flex justify-between pb-0.5">
                <span className="text-slate-500 font-medium">Manufactured By</span>
                <span className="font-bold text-slate-800">{site.name} (Made in India)</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 mb-5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Quantity (Units):
              </label>
              <div className="flex items-center rounded-lg border border-slate-300 bg-white px-2 shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 5))}
                  className="px-2 py-1 text-slate-600 hover:text-black font-bold"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-14 bg-transparent text-center text-sm font-bold text-slate-900 focus:outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 5)}
                  className="px-2 py-1 text-slate-600 hover:text-black font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/919930349455?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 py-3 px-4 text-sm font-bold text-white shadow-md transition"
              >
                <MessageSquare className="h-4 w-4" />
                Inquire on WhatsApp
              </a>

              <Link
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#e31e24] hover:bg-[#c5161b] py-3 px-5 text-sm font-bold text-white transition shadow-md"
              >
                Full Details <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
