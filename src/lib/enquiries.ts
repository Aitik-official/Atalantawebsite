import { randomUUID } from "crypto";
import type { Enquiry, EnquiryStatus } from "./catalog-types";
import { ensureMongoSeeded } from "./mongo-seed";
import { getCollection, stripMongoId } from "./mongodb";

type EnquiryDoc = Enquiry;

async function enquiriesCol() {
  await ensureMongoSeeded();
  return getCollection<EnquiryDoc>("enquiries");
}

function toEnquiry(doc: EnquiryDoc): Enquiry {
  return stripMongoId(doc) as Enquiry;
}

export async function getEnquiries() {
  const col = await enquiriesCol();
  const docs = await col.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map(toEnquiry);
}

export async function createEnquiry(
  input: Omit<Enquiry, "id" | "status" | "createdAt"> & { status?: EnquiryStatus },
) {
  const col = await enquiriesCol();
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
  const col = await enquiriesCol();
  const result = await col.findOneAndUpdate(
    { id },
    { $set: { status } },
    { returnDocument: "after" },
  );
  return result ? toEnquiry(result) : null;
}

export async function deleteEnquiry(id: string) {
  const col = await enquiriesCol();
  const result = await col.deleteOne({ id });
  return result.deletedCount > 0;
}
