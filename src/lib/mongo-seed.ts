import { readFallbackCategories, readFallbackEnquiries, readFallbackProducts } from "./json-store";
import { getCollection, isMongoConfigured } from "./mongodb";

let seedPromise: Promise<void> | null = null;

export async function ensureMongoSeeded() {
  if (!isMongoConfigured()) return;
  if (!seedPromise) {
    seedPromise = seedIfEmpty().catch((error) => {
      seedPromise = null;
      throw error;
    });
  }
  await seedPromise;
}

async function seedIfEmpty() {
  const products = await getCollection("products");
  const categories = await getCollection("categories");
  const enquiries = await getCollection("enquiries");

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
    const seed = await readFallbackProducts();
    if (seed.length) {
      await products.insertMany(
        seed.map((item) => ({
          ...item,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })),
      );
    }
  }

  if (categoryCount === 0) {
    const seed = await readFallbackCategories();
    if (seed.length) await categories.insertMany(seed);
  }

  if (enquiryCount === 0) {
    const seed = await readFallbackEnquiries();
    if (seed.length) await enquiries.insertMany(seed);
  }
}
