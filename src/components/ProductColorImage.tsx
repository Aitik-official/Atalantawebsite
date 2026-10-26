"use client";

import { useMemo, useState } from "react";
import type { ProductColor } from "@/data/site";
import ProductColorSwatches from "@/components/ProductColorSwatches";

export default function ProductColorImage({
  title,
  image,
  gallery = [],
  subcategory,
  colors = [],
}: {
  title: string;
  image: string;
  gallery?: string[];
  subcategory: string;
  colors?: ProductColor[];
}) {
  const [selected, setSelected] = useState(0);
  const [manualImage, setManualImage] = useState<string | null>(null);
  const active = colors[selected];
  const current = manualImage || active?.image || image;

  const thumbs = useMemo(() => {
    const items = [image, ...gallery, ...colors.map((color) => color.image || "")]
      .map((item) => item.trim())
      .filter(Boolean);
    return Array.from(new Set(items));
  }, [image, gallery, colors]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm">
        <img
          src={current}
          alt={active ? `${title} - ${active.name}` : title}
          className="max-h-full max-w-full object-contain"
        />
        <span className="absolute left-4 top-4 rounded-full bg-[#0090d0] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
          {subcategory}
        </span>
        {active ? (
          <span className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-3 py-1 text-xs font-bold text-slate-800 shadow-sm">
            <span
              className="h-3.5 w-3.5 rounded-full border border-slate-200"
              style={{ backgroundColor: active.hex }}
            />
            {active.name}
          </span>
        ) : null}
      </div>

      <ProductColorSwatches
        colors={colors}
        selected={selected}
        onSelect={(index) => {
          setManualImage(null);
          setSelected(index);
        }}
      />

      {thumbs.length > 1 ? (
        <div className="grid grid-cols-4 gap-3">
          {thumbs.map((img) => {
            const colorIndex = colors.findIndex((color) => color.image === img);
            const isActive = current === img;
            return (
              <button
                key={img}
                type="button"
                onClick={() => {
                  if (colorIndex >= 0) {
                    setManualImage(null);
                    setSelected(colorIndex);
                    return;
                  }
                  setManualImage(img);
                }}
                className={`flex aspect-square items-center justify-center overflow-hidden rounded-xl border bg-white p-2 shadow-sm ${
                  isActive ? "border-[#0090d0]" : "border-slate-200"
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-contain" />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
