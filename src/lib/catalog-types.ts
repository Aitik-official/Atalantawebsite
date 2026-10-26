import type { ProductColor, ProductItem } from "@/data/site";

export type { ProductColor, ProductItem };

export type StoredSubcategory = {
  id: string;
  name: string;
  slug: string;
  filterKey: string;
  desc: string;
  href: string;
};

export type StoredCategory = {
  id: string;
  name: string;
  navLabel: string;
  shortName: string;
  slug: string;
  href: string;
  categoryKey: string;
  description: string;
  image: string;
  badge: string;
  subcategories: StoredSubcategory[];
};

export type EnquiryStatus = "new" | "read" | "closed";

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  quantity: string;
  organization: string;
  message: string;
  productTitle?: string;
  status: EnquiryStatus;
  createdAt: string;
};

export type ProductInput = {
  title: string;
  category: string;
  subcategory?: string;
  slug?: string;
  tags?: string[];
  price?: string;
  priceNumber?: number;
  mrp?: string;
  image?: string;
  gallery?: string[];
  inStock?: boolean;
  rating?: string;
  reviewsCount?: number;
  warranty?: string;
  material?: string;
  description?: string;
  specifications?: Record<string, string>;
  colors?: ProductColor[];
};

export type CategoryInput = {
  name: string;
  shortName?: string;
  navLabel?: string;
  slug?: string;
  href?: string;
  categoryKey?: string;
  description?: string;
  image?: string;
  badge?: string;
  subcategories?: Array<{
    id?: string;
    name: string;
    slug?: string;
    filterKey?: string;
    desc?: string;
    href?: string;
  }>;
};
