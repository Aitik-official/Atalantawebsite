import { randomUUID } from "crypto";
import type { Enquiry, EnquiryStatus } from "./catalog-types";
import { readFallbackEnquiries } from "./json-store";
import { ensureMongoSeeded } from "./mongo-seed";
import { describeMongoError, getCollection, stripMongoId } from "./mongodb";

type EnquiryDoc = Enquiry;

async function enquiriesCol() {
  return getCollection<EnquiryDoc>("enquiries");
}

async function enquiriesColReady() {
  await ensureMongoSeeded();
  return enquiriesCol();
}

function toEnquiry(doc: EnquiryDoc): Enquiry {
  return stripMongoId(doc) as Enquiry;
}

export async function getEnquiries() {
  try {
    const col = await enquiriesCol();
    let docs = await col.find({}).sort({ createdAt: -1 }).toArray();
    if (docs.length === 0) {
      await ensureMongoSeeded();
      docs = await col.find({}).sort({ createdAt: -1 }).toArray();
    }
    if (docs.length === 0) return readFallbackEnquiries();
    return docs.map(toEnquiry);
  } catch (error) {
    console.error("[enquiries] getEnquiries failed:", describeMongoError(error));
    return readFallbackEnquiries();
  }
}

export async function createEnquiry(
  input: Omit<Enquiry, "id" | "status" | "createdAt"> & { status?: EnquiryStatus },
) {
  const col = await enquiriesColReady();
  const enquiry: EnquiryDoc = {
    id: randomUUID(),
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    category: input.category.trim() || "General Inquiry",
    quantity: input.quantity.trim() || "N/A",
    organization: input.organization.trim() || "N/A",
    message: input.message.trim(),
    productTitle: input.productTitle?.trim() || undefined,
    status: input.status || "new",
    createdAt: new Date().toISOString(),
  };
  await col.insertOne(enquiry);
  return toEnquiry(enquiry);
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus) {
  const col = await enquiriesColReady();
  const result = await col.findOneAndUpdate(
    { id },
    { $set: { status } },
    { returnDocument: "after" },
  );
  return result ? toEnquiry(result) : null;
}

export async function deleteEnquiry(id: string) {
  const col = await enquiriesColReady();
  const result = await col.deleteOne({ id });
  return result.deletedCount > 0;
}
