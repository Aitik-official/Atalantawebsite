import { MongoClient, type Collection, type Db, type Document } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "atlanta";

type MongoCache = {
  client: MongoClient | null;
  promise: Promise<MongoClient> | null;
};

const globalForMongo = globalThis as typeof globalThis & {
  __atlantaMongo?: MongoCache;
};

const cache: MongoCache = globalForMongo.__atlantaMongo ?? { client: null, promise: null };
globalForMongo.__atlantaMongo = cache;

export function getMongoUri() {
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add it to .env.local");
  }
  return uri;
}

export async function getMongoClient() {
  if (cache.client) return cache.client;
  if (!cache.promise) {
    const client = new MongoClient(getMongoUri());
    cache.promise = client.connect().then((connected) => {
      cache.client = connected;
      return connected;
    });
  }
  return cache.promise;
}

export async function getDb(): Promise<Db> {
  const client = await getMongoClient();
  return client.db(dbName);
}

export async function getCollection<T extends Document>(name: string): Promise<Collection<T>> {
  const db = await getDb();
  return db.collection<T>(name);
}

export function stripMongoId<T extends Document>(doc: T): Omit<T, "_id"> {
  const { _id: _ignored, ...rest } = doc;
  return rest;
}
