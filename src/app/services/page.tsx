import type { Metadata } from "next";
import { Suspense } from "react";
import ProductCatalog from "@/components/ProductCatalog";

export const metadata: Metadata = {
  title: "Products & Collections | Atlanta Furniture",
  description: "Browse 69+ certified models of Atlanta plastic chairs, office executive seating, student desks, and commercial dustbins.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Suspense fallback={<div className="py-20 text-center text-stone-400">Loading catalog...</div>}>
        <ProductCatalog showFilters={true} />
      </Suspense>
    </div>
  );
}
