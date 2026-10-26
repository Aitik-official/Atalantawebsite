import { randomUUID } from "crypto";
import {
  formatPrice,
  normalizeSubcategories,
  parsePrice,
  slugify,
  uniqueSlug,
} from "./catalog-helpers";
import type {
  CategoryInput,
  ProductInput,
  ProductItem,
  StoredCategory,
} from "./catalog-types";
import { readFallbackCategories, readFallbackProducts } from "./json-store";
import { ensureMongoSeeded } from "./mongo-seed";
import { describeMongoError, getCollection, stripMongoId } from "./mongodb";
import { normalizeProductColors } from "./product-colors";

type ProductDoc = ProductItem & { createdAt: string };
type CategoryDoc = StoredCategory & { createdAt: string };

async function productsCol() {
  return getCollection<ProductDoc>("products");
}

async function categoriesCol() {
  return getCollection<CategoryDoc>("categories");
}

async function productsColReady() {
  await ensureMongoSeeded();
  return productsCol();
}

async function categoriesColReady() {
  await ensureMongoSeeded();
  return categoriesCol();
}

function displayPrice(value?: string, fallback = 0) {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return fallback ? formatPrice(fallback) : "";
  if (trimmed.includes("₹")) return trimmed;
  return formatPrice(parsePrice(trimmed));
}

function toProduct(doc: ProductDoc): ProductItem {
  const { createdAt: _createdAt, ...product } = stripMongoId(doc);
  return {
    ...(product as ProductItem),
    colors: normalizeProductColors((product as ProductItem).colors),
  };
}

function toCategory(doc: CategoryDoc): StoredCategory {
  const { createdAt: _createdAt, ...category } = stripMongoId(doc);
  return category as StoredCategory;
}

export async function getProducts(): Promise<ProductItem[]> {
  try {
    const col = await productsCol();
    let docs = await col.find({}).sort({ createdAt: -1 }).toArray();
    if (docs.length === 0) {
      await ensureMongoSeeded();
      docs = await col.find({}).sort({ createdAt: -1 }).toArray();
    }
    if (docs.length === 0) return readFallbackProducts();
    return docs.map(toProduct);
  } catch (error) {
    console.error("[catalog] getProducts failed:", describeMongoError(error));
    return readFallbackProducts();
  }
}

export async function getCategories(): Promise<StoredCategory[]> {
  try {
    const col = await categoriesCol();
    let docs = await col.find({}).sort({ createdAt: 1 }).toArray();
    if (docs.length === 0) {
      await ensureMongoSeeded();
      docs = await col.find({}).sort({ createdAt: 1 }).toArray();
    }
    if (docs.length === 0) return readFallbackCategories();
    return docs.map(toCategory);
  } catch (error) {
    console.error("[catalog] getCategories failed:", describeMongoError(error));
    return readFallbackCategories();
  }
}

export async function createProduct(input: ProductInput) {
  const col = await productsColReady();
  const title = input.title.trim();
  if (!title) throw new Error("Product title is required.");
  const category = input.category.trim();
  if (!category) throw new Error("Product category is required.");

  const existing = await col.find({}, { projection: { slug: 1 } }).toArray();
  const slug = uniqueSlug(
    slugify(input.slug || title),
    existing.map((product) => product.slug),
  );
  const priceNumber = input.priceNumber ?? parsePrice(input.price);
  const image = input.image?.trim() ?? "";
  const gallery = (input.gallery || []).map((item) => item.trim()).filter(Boolean);
  if (image && !gallery.includes(image)) gallery.unshift(image);

  const product: ProductDoc = {
    id: randomUUID(),
    slug,
    title,
    category,
    subcategory: (input.subcategory || "").trim(),
    tags: (input.tags || []).map((tag) => tag.trim()).filter(Boolean),
    price: displayPrice(input.price, priceNumber),
    priceNumber,
    mrp: displayPrice(input.mrp),
    image,
    gallery,
    inStock: input.inStock ?? true,
    rating: input.rating?.trim() || "5.0",
    reviewsCount: input.reviewsCount ?? 0,
    warranty: input.warranty?.trim() || "1 Year Manufacturer Warranty",
    material: input.material?.trim() || "",
    description: input.description?.trim() || "",
    specifications: input.specifications || {},
    colors: normalizeProductColors(input.colors),
    createdAt: new Date().toISOString(),
  };

  await col.insertOne(product);
  return toProduct(product);
}

export async function updateProduct(id: string, input: ProductInput) {
  const col = await productsColReady();
  const current = await col.findOne({ $or: [{ id }, { slug: id }] });
  if (!current) return null;

  const title = input.title.trim() || current.title;
  const category = input.category.trim() || current.category;
  const priceNumber = input.priceNumber ?? parsePrice(input.price ?? current.price);
  const image = input.image?.trim() ?? current.image;
  const gallery = (input.gallery || current.gallery || [])
    .map((item) => item.trim())
    .filter(Boolean);
  if (image && !gallery.includes(image)) gallery.unshift(image);

  const next: ProductDoc = {
    ...current,
    title,
    category,
    subcategory: (input.subcategory ?? current.subcategory).trim(),
    tags: (input.tags ?? current.tags).map((tag) => tag.trim()).filter(Boolean),
    price: input.price != null ? displayPrice(input.price, priceNumber) : current.price,
    priceNumber,
    mrp: input.mrp != null ? displayPrice(input.mrp) : current.mrp,
    image,
    gallery,
    inStock: input.inStock ?? current.inStock,
    rating: input.rating?.trim() || current.rating,
    reviewsCount: input.reviewsCount ?? current.reviewsCount,
    warranty: input.warranty?.trim() || current.warranty,
    material: input.material?.trim() ?? current.material,
    description: input.description?.trim() ?? current.description,
    specifications: input.specifications ?? current.specifications,
    colors:
      input.colors != null ? normalizeProductColors(input.colors) : current.colors || [],
  };

  await col.replaceOne({ _id: current._id }, next);
  return toProduct(next);
}

export async function deleteProduct(id: string) {
  const col = await productsColReady();
  const result = await col.deleteOne({ $or: [{ id }, { slug: id }] });
  return result.deletedCount > 0;
}

export async function createCategory(input: CategoryInput) {
  const col = await categoriesColReady();
  const name = input.name.trim();
  if (!name) throw new Error("Category name is required.");

  const existing = await col.find({}, { projection: { slug: 1 } }).toArray();
  const slug = uniqueSlug(
    slugify(input.slug || name),
    existing.map((category) => category.slug),
  );
  const href = input.href?.trim() || `/catalog/${slug}`;
  const category: CategoryDoc = {
    id: randomUUID(),
    name,
    navLabel: (input.navLabel || name).trim().toUpperCase(),
    shortName: (input.shortName || name).trim(),
    slug,
    href,
    categoryKey: (input.categoryKey || name).trim(),
    description: input.description?.trim() || "",
    image: input.image?.trim() || "",
    badge: input.badge?.trim() || "New Collection",
    subcategories: [],
    createdAt: new Date().toISOString(),
  };
  category.subcategories = normalizeSubcategories(category, input.subcategories);

  await col.insertOne(category);
  return toCategory(category);
}

export async function updateCategory(id: string, input: CategoryInput) {
  const col = await categoriesColReady();
  const current = await col.findOne({ $or: [{ id }, { slug: id }] });
  if (!current) return null;

  const name = input.name.trim() || current.name;
  const next: CategoryDoc = {
    ...current,
    name,
    navLabel: (input.navLabel || current.navLabel || name).trim().toUpperCase(),
    shortName: (input.shortName || current.shortName || name).trim(),
    categoryKey: (input.categoryKey || current.categoryKey).trim(),
    description: input.description?.trim() ?? current.description,
    image: input.image?.trim() ?? current.image,
    badge: input.badge?.trim() ?? current.badge,
    href: input.href?.trim() || current.href,
    subcategories: current.subcategories,
  };
  next.subcategories = normalizeSubcategories(next, input.subcategories ?? current.subcategories);

  await col.replaceOne({ _id: current._id }, next);
  return toCategory(next);
}

export async function deleteCategory(id: string) {
  const categories = await categoriesColReady();
  const target = await categories.findOne({ $or: [{ id }, { slug: id }] });
  if (!target) return { ok: false as const, error: "Category not found." };

  const products = await productsCol();
  const used = await products.countDocuments({
    category: { $regex: `^${escapeRegex(target.categoryKey)}$`, $options: "i" },
  });
  if (used > 0) {
    return {
      ok: false as const,
      error: `Move or delete ${used} product${used === 1 ? "" : "s"} in this category first.`,
    };
  }

  await categories.deleteOne({ _id: target._id });
  return { ok: true as const };
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
