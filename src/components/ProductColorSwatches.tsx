"use client";

import { useState } from "react";
import type { ProductColor } from "@/data/site";

export default function ProductColorSwatches({
  colors,
  size = "md",
  selectable = true,
  label = "Available Colours",
  selected,
  onSelect,
}: {
  colors?: ProductColor[];
  size?: "sm" | "md";
  selectable?: boolean;
  label?: string;
  selected?: number;
  onSelect?: (index: number) => void;
}) {
  const list = colors || [];
  const [internal, setInternal] = useState(0);
  const activeIndex = selected ?? internal;

  if (list.length === 0) return null;

  const active = list[Math.min(activeIndex, list.length - 1)];
  const swatch = size === "sm" ? "h-4 w-4" : "h-9 w-9";

  function choose(index: number) {
    if (!selectable) return;
    setInternal(index);
    onSelect?.(index);
  }

  return (
    <div className={size === "sm" ? "" : "mb-6"}>
      {size === "md" ? (
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
          {selectable ? (
            <p className="text-xs font-semibold text-slate-700">{active?.name}</p>
          ) : null}
        </div>
      ) : null}
      <div className="flex flex-wrap items-center gap-2.5">
        {list.map((color, index) => {
          const isActive = selectable && index === activeIndex;
          return (
            <button
              key={`${color.name}-${color.hex}`}
              type="button"
              title={color.name}
              onClick={() => choose(index)}
              className={`relative overflow-hidden rounded-full border border-slate-200 shadow-sm ${swatch} ${
                isActive ? "ring-2 ring-[#0090d0] ring-offset-2" : ""
              }`}
              style={{ backgroundColor: color.hex }}
              aria-label={color.name}
            >
              {color.image ? (
                <img
                  src={color.image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
