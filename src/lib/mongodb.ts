import { MongoClient, type Collection, type Document } from "mongodb";

const uri = process.env.MONGODB_URI?.trim() ?? "";
const dbName = process.env.MONGODB_DB?.trim() || "atlanta";

type MongoCache = {
  client: MongoClient | null;
  promise: Promise<MongoClient> | null;
};

const globalForMongo = globalThis as typeof globalThis & { __atlantaMongo?: MongoCache };

const cache: MongoCache = globalForMongo.__atlantaMongo ?? { client: null, promise: null };
globalForMongo.__atlantaMongo = cache;

export function isMongoConfigured() {
  return Boolean(uri);
}

export function getMongoUri() {
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add it in the hosting environment variables.");
  }
  return uri;
}

export function getMongoDbName() {
  return dbName;
}

export async function getMongoClient() {
  if (cache.client) return cache.client;
  getMongoUri();
  if (!cache.promise) {
    const client = new MongoClient(uri, {
      maxPoolSize: 5,
      minPoolSize: 0,
      maxIdleTimeMS: 15000,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      socketTimeoutMS: 15000,
    });
    cache.promise = client.connect().then(
      (connected) => {
        cache.client = connected;
        return connected;
      },
      (error: unknown) => {
        cache.promise = null;
        cache.client = null;
        throw error;
      },
    );
  }
  return cache.promise;
}

export async function getMongoDb() {
  const client = await getMongoClient();
  return client.db(dbName);
}

export async function getCollection<T extends Document>(name: string): Promise<Collection<T>> {
  const db = await getMongoDb();
  return db.collection<T>(name);
}

export function stripMongoId<T extends Document>(doc: T) {
  const { _id: _ignored, ...rest } = doc as T & { _id?: unknown };
  return rest as Omit<T, "_id">;
}

export function describeMongoError(error: unknown) {
  const message = error instanceof Error ? error.message : "MongoDB request failed.";
  if (!isMongoConfigured()) {
    return "MONGODB_URI is not set on the server. Add it in the hosting environment variables.";
  }
  if (
    /whitelist|not authorized|IP|timed out|Server selection|ENOTFOUND|ECONNREFUSED|MongoNetwork|authentication failed/i.test(
      message,
    )
  ) {
    return "Could not connect to MongoDB. In Atlas Network Access allow 0.0.0.0/0, then set MONGODB_URI on the host.";
  }
  return message;
}
