import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { MongoClient } from "mongodb";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

async function loadEnv() {
  const raw = await readFile(path.join(root, ".env.local"), "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index < 0) continue;
    process.env[trimmed.slice(0, index)] = trimmed.slice(index + 1);
  }
}

async function readJson(relativePath, fallback) {
  try {
    return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
  } catch {
    return fallback;
  }
}

await loadEnv();
const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI is missing from .env.local");
}

const client = new MongoClient(uri);
await client.connect();
const db = client.db(process.env.MONGODB_DB || "atlanta");

const products = await readJson("data/products.json", []);
const categories = await readJson("data/categories.json", []);
const enquiries = await readJson("data/enquiries.json", []);

const productsCol = db.collection("products");
const categoriesCol = db.collection("categories");
const enquiriesCol = db.collection("enquiries");

await Promise.all([
  productsCol.deleteMany({}),
  categoriesCol.deleteMany({}),
  enquiriesCol.deleteMany({}),
]);

if (products.length) {
  await productsCol.insertMany(
    products.map((product, index) => ({
      ...product,
      createdAt: new Date(Date.now() - index * 1000).toISOString(),
    })),
  );
}

if (categories.length) {
  await categoriesCol.insertMany(
    categories.map((category, index) => ({
      ...category,
      createdAt: new Date(Date.now() - (categories.length - index) * 1000).toISOString(),
    })),
  );
}

if (enquiries.length) {
  await enquiriesCol.insertMany(enquiries);
}

await Promise.all([
  productsCol.createIndex({ id: 1 }, { unique: true }),
  productsCol.createIndex({ slug: 1 }, { unique: true }),
  categoriesCol.createIndex({ id: 1 }, { unique: true }),
  categoriesCol.createIndex({ slug: 1 }, { unique: true }),
  enquiriesCol.createIndex({ id: 1 }, { unique: true }),
  enquiriesCol.createIndex({ createdAt: -1 }),
]);

const counts = {
  products: await productsCol.countDocuments(),
  categories: await categoriesCol.countDocuments(),
  enquiries: await enquiriesCol.countDocuments(),
};

console.log("Seeded Atlanta database:", counts);
await client.close();
