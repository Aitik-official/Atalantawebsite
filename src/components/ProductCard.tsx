"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, MessageSquare, Star, ArrowRight } from "lucide-react";
import { ProductItem } from "@/data/site";

interface ProductCardProps {
  product: ProductItem;
  onQuickView: (product: ProductItem) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState(product.image);

  const whatsappMessage = encodeURIComponent(
    `Hello Atlanta Furniture, I am interested in "${product.title}" (${product.category} - ${product.price}). Please share specifications and best quotation.`
  );

  return (
    <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-stone-200/90 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Top Image Container - Full Fit & No Cutting */}
      <div className="relative h-48 sm:h-52 w-full bg-white p-3 flex items-center justify-center overflow-hidden border-b border-stone-100">
        <img
          src={imgSrc}
          alt={product.title}
          className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
          onError={() => {
            setImgSrc("https://atlantaworld.in/admin/products/17164641970.png");
          }}
          loading="lazy"
        />

        {/* Badge Tags */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5 z-10">
          <span className="rounded-md bg-white/95 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-[#8c6506] uppercase tracking-wider border border-[#b8860b]/30 shadow-sm">
            {product.subcategory}
          </span>
          {product.tags && product.tags[0] && (
            <span className="rounded-md bg-[#b8860b] px-2 py-0.5 text-[9px] font-extrabold text-white uppercase tracking-wider shadow-sm">
              {product.tags[0]}
            </span>
          )}
        </div>

        {/* Quick View Floating Action */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-full bg-white p-2 text-stone-700 shadow-md hover:bg-[#b8860b] hover:text-white z-10 border border-stone-200"
          title="Quick View"
          aria-label="Quick View"
        >
          <Eye className="h-4 w-4" />
        </button>
      </div>

      {/* Product Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1.5 font-medium">
          <span className="font-bold uppercase tracking-wider text-[#b8860b]">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-amber-500 font-bold">
            <Star className="h-3 w-3 fill-current" />
            <span>{product.rating}</span>
          </div>
        </div>

        <Link
          href={`/products/${product.slug}`}
          className="text-base font-bold text-stone-900 hover:text-[#b8860b] transition line-clamp-1 mb-1.5"
        >
          {product.title}
        </Link>

        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3 font-normal">
          {product.description}
        </p>

        {/* Price & Stock Section */}
        <div className="mt-auto pt-3 border-t border-stone-100 flex items-baseline justify-between mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg sm:text-xl font-extrabold text-[#b8860b]">
              {product.price}
            </span>
            {product.mrp && (
              <span className="text-xs text-stone-400 line-through">
                {product.mrp}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            In Stock
          </span>
        </div>

        {/* Bottom Actions */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={`https://wa.me/919930349455?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-600/30 bg-emerald-50 py-2 px-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>WhatsApp</span>
          </a>

          <Link
            href={`/products/${product.slug}`}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-stone-900 hover:bg-[#b8860b] text-white py-2 px-2 text-xs font-bold transition shadow-sm"
          >
            <span>Details</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
