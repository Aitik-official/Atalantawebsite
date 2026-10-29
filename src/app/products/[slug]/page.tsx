import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, getRelatedProducts } from "@/data/product-details";
import { products, site, whatsappHref } from "@/data/site";
import ProductColorImage from "@/components/ProductColorImage";
import {
  Star,
  ShieldCheck,
  Truck,
  MessageSquare,
  Phone,
  ArrowLeft,
  ArrowRight,
  Award,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.title} | ${product.category} | Atlanta Furniture`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = await getRelatedProducts(product.id, product.category, 4);
  const colourNames = (product.colors || []).map((color) => color.name).join(", ");
  const whatsappUrl = whatsappHref(
    `Hello Atlanta Furniture, I am interested in purchasing "${product.title}" (${product.category} - ${product.price})${colourNames ? `. Colour: ${colourNames}` : ""}. Please send commercial catalog and bulk quotation.`,
  );

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 pb-20">
      {/* Breadcrumb Bar */}
      <div className="border-b border-stone-200 bg-white py-3.5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <Link href="/" className="hover:text-[#0090d0]">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[#0090d0]">
              Products
            </Link>
            <span>/</span>
            <Link
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className="hover:text-[#0090d0]"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-bold truncate max-w-[150px] sm:max-w-none">
              {product.title}
            </span>
          </div>

          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-1 text-[#0090d0] font-bold hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Catalog
          </Link>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Product Images Column (5 Cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <ProductColorImage
              title={product.title}
              image={product.image}
              gallery={product.gallery}
              subcategory={product.subcategory}
              colors={product.colors}
            />

            {/* Quality assurance badges under image */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs text-slate-600">
              <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <ShieldCheck className="h-5 w-5 text-[#0090d0] mx-auto mb-1" />
                <span className="font-bold block text-slate-900">100% Virgin</span>
                <span>Polymer Purity</span>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <Award className="h-5 w-5 text-[#0090d0] mx-auto mb-1" />
                <span className="font-bold block text-slate-900">{product.warranty}</span>
                <span>Manufacturer Cover</span>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <Truck className="h-5 w-5 text-[#0090d0] mx-auto mb-1" />
                <span className="font-bold block text-slate-900">Pan-India</span>
                <span>Fast Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right: Details & Order Box (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0090d0]">
                {product.category} · {product.subcategory}
              </span>
              <span className="text-slate-300">·</span>
              <div className="flex items-center text-amber-500 text-xs gap-1 font-bold">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span>{product.rating}</span>
                <span className="text-slate-500 font-normal">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              {product.title}
            </h1>

            {/* Price Box */}
            <div className="flex items-baseline gap-4 p-4 rounded-2xl bg-sky-50/70 border border-[#0090d0]/20 shadow-sm mb-6">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#0090d0]">
                {product.price}
              </span>
              {product.mrp && (
                <span className="text-base text-slate-400 line-through">
                  MRP: {product.mrp}
                </span>
              )}
              <span className="ml-auto rounded-full bg-emerald-100 border border-emerald-300 px-3 py-1 text-xs font-bold text-emerald-800">
                Direct Factory Rate
              </span>
            </div>

            <div className="prose prose-slate text-slate-600 text-sm leading-relaxed mb-6">
              <p>{product.description}</p>
            </div>

            {/* Key Specification Table */}
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm mb-8">
              <div className="bg-slate-100/90 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200">
                Technical Specifications & Standards
              </div>
              <div className="p-5 divide-y divide-slate-100 text-xs sm:text-sm">
                {(product.colors || []).length > 0 ? (
                  <div className="py-2.5 flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span className="font-semibold text-slate-500">Available Colours</span>
                    <span className="font-bold text-slate-900 sm:text-right max-w-sm">
                      {(product.colors || []).map((color) => color.name).join(", ")}
                    </span>
                  </div>
                ) : null}
                {Object.entries(product.specifications).map(([k, v]) => (
                  <div key={k} className="py-2.5 flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span className="font-semibold text-slate-500">{k}</span>
                    <span className="font-bold text-slate-900 sm:text-right max-w-sm">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 mb-8">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 py-4 px-6 text-sm sm:text-base font-bold text-white shadow-md transition"
              >
                <MessageSquare className="h-5 w-5" />
                <span>Instant WhatsApp Inquiry</span>
              </a>

              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 rounded-2xl bg-[#0090d0] hover:bg-[#007cb3] py-4 px-8 text-sm sm:text-base font-bold text-white shadow-md transition"
              >
                <span>Request Quotation</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Contact numbers */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between text-xs text-slate-600 shadow-sm">
              <div className="flex items-center gap-2 font-medium">
                <Phone className="h-4 w-4 text-[#0090d0]" />
                <span>Need technical assistance? Call factory sales:</span>
              </div>
              <a href={site.phoneHref} className="font-bold text-[#0090d0] hover:underline">
                {site.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Related Products Carousel */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0090d0]">
                  Related Recommendations
                </span>
                <h3 className="text-2xl font-bold text-slate-900">
                  More in {product.category}
                </h3>
              </div>
              <Link
                href={`/products?category=${encodeURIComponent(product.category)}`}
                className="text-xs sm:text-sm font-bold text-[#0090d0] hover:underline flex items-center gap-1"
              >
                View Category &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((rel) => (
                <div
                  key={rel.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-col hover:shadow-lg transition"
                >
                  <div className="aspect-square bg-[#faf8f5] rounded-xl p-3 flex items-center justify-center mb-3">
                    <img src={rel.image} alt={rel.title} className="h-full w-full object-contain" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 line-clamp-1 mb-1">
                    {rel.title}
                  </h4>
                  <span className="text-xs font-bold text-[#0090d0] mb-3">{rel.price}</span>
                  <Link
                    href={`/products/${rel.slug}`}
                    className="mt-auto block text-center rounded-xl bg-slate-100 hover:bg-[#0090d0] hover:text-white py-2 text-xs font-bold transition"
                  >
                    View Model
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
