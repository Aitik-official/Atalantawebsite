import type { ProductColor } from "@/data/site";

export const PRESET_PRODUCT_COLORS: ProductColor[] = [
  { name: "Black", hex: "#1a1a1a" },
  { name: "White", hex: "#f4f4f5" },
  { name: "Ivory", hex: "#f5f0e1" },
  { name: "Beige", hex: "#d4b896" },
  { name: "Brown", hex: "#6b3e26" },
  { name: "Chocolate", hex: "#3d2314" },
  { name: "Grey", hex: "#6b7280" },
  { name: "Red", hex: "#c41e3a" },
  { name: "Blue", hex: "#1e4d8c" },
  { name: "Navy", hex: "#1e3a5f" },
  { name: "Green", hex: "#2d6a4f" },
  { name: "Orange", hex: "#ea580c" },
  { name: "Yellow", hex: "#eab308" },
  { name: "Maroon", hex: "#7f1d1d" },
];

export function normalizeProductColors(
  input?: Array<{ name?: string; hex?: string; image?: string }> | null,
): ProductColor[] {
  if (!Array.isArray(input)) return [];
  const seen = new Set<string>();
  const colors: ProductColor[] = [];

  for (const item of input) {
    const name = (item?.name || "").trim();
    if (!name) continue;

    let hex = (item?.hex || "").trim();
    if (hex && !hex.startsWith("#")) hex = `#${hex}`;
    if (!/^#[0-9a-fA-F]{3,8}$/.test(hex)) hex = "#64748b";

    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    const image = (item?.image || "").trim();
    colors.push({
      name,
      hex: hex.toLowerCase(),
      ...(image ? { image } : {}),
    });
  }

  return colors;
}
