import { readFile } from "fs/promises";
import path from "path";
import { products as bundledProducts } from "@/data/site";
import { seedCategories } from "./catalog-helpers";
import type { Enquiry, ProductItem, StoredCategory } from "./catalog-types";
import { getCollection } from "./mongodb";

type ProductDoc = ProductItem & { createdAt: string };
type CategoryDoc = StoredCategory & { createdAt: string };
type EnquiryDoc = Enquiry;

let seedPromise: Promise<void> | null = null;

async function readJsonFile<T>(relativePath: string, fallback: T): Promise<T> {
  try {
    const raw = await readFile(path.join(process.cwd(), relativePath), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function seedIfEmpty() {
  const products = await getCollection<ProductDoc>("products");
  const categories = await getCollection<CategoryDoc>("categories");
  const enquiries = await getCollection<EnquiryDoc>("enquiries");

  await Promise.all([
    products.createIndex({ id: 1 }, { unique: true }),
    products.createIndex({ slug: 1 }, { unique: true }),
    categories.createIndex({ id: 1 }, { unique: true }),
    categories.createIndex({ slug: 1 }, { unique: true }),
    enquiries.createIndex({ id: 1 }, { unique: true }),
    enquiries.createIndex({ createdAt: -1 }),
  ]);

  const [productCount, categoryCount, enquiryCount] = await Promise.all([
    products.countDocuments(),
    categories.countDocuments(),
    enquiries.countDocuments(),
  ]);

  if (productCount === 0) {
    const list = await readJsonFile<ProductItem[]>("data/products.json", bundledProducts);
    if (list.length > 0) {
      await products.insertMany(
        list.map((product, index) => ({
          ...product,
          createdAt: new Date(Date.now() - index * 1000).toISOString(),
        })),
      );
    }
  }

  if (categoryCount === 0) {
    const list = await readJsonFile<StoredCategory[]>("data/categories.json", seedCategories());
    if (list.length > 0) {
      await categories.insertMany(
        list.map((category, index) => ({
          ...category,
          createdAt: new Date(Date.now() - index * 1000).toISOString(),
        })),
      );
    }
  }

  if (enquiryCount === 0) {
    const list = await readJsonFile<Enquiry[]>("data/enquiries.json", []);
    if (list.length > 0) {
      await enquiries.insertMany(list);
    }
  }
}

export async function ensureMongoSeeded() {
  if (!seedPromise) {
    seedPromise = seedIfEmpty().catch((error) => {
      seedPromise = null;
      throw error;
    });
  }
  await seedPromise;
}
