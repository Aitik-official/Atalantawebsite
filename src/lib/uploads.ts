import { Binary, type Document } from "mongodb";
import { randomUUID } from "crypto";
import { getCollection, isMongoConfigured } from "./mongodb";

export type UploadDoc = Document & {
  id: string;
  contentType: string;
  data: Binary;
  createdAt: string;
};

async function uploadsCol() {
  return getCollection<UploadDoc>("uploads");
}

export async function saveUpload(file: File) {
  if (!isMongoConfigured()) {
    throw new Error("MONGODB_URI is not set. Add it on the host so image uploads can be saved.");
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const id = randomUUID();
  const doc: UploadDoc = {
    id,
    contentType: file.type || "application/octet-stream",
    data: new Binary(bytes),
    createdAt: new Date().toISOString(),
  };

  const col = await uploadsCol();
  await col.createIndex({ id: 1 }, { unique: true }).catch(() => undefined);
  await col.insertOne(doc);
  return { id, url: `/api/uploads/${id}` };
}

export async function getUpload(id: string) {
  if (!isMongoConfigured()) return null;
  const col = await uploadsCol();
  return col.findOne({ id });
}

export function uploadBytes(doc: UploadDoc) {
  const raw = doc.data.buffer;
  return raw instanceof Uint8Array ? Uint8Array.from(raw) : Uint8Array.from(Buffer.from(raw));
}
