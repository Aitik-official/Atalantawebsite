import atlantaProducts from "./atlanta-furniture.json";

export interface ProductItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  subcategory: string;
  tags: string[];
  price: string;
  priceNumber: number;
  mrp: string;
  image: string;
  gallery: string[];
  inStock: boolean;
  rating: string;
  reviewsCount: number;
  warranty: string;
  material: string;
  description: string;
  specifications: Record<string, string>;
}

export const products: ProductItem[] = atlantaProducts as unknown as ProductItem[];

export const site = {
  name: "Atlanta Furniture",
  shortName: "Atlanta",
  brandName: "Atlanta World & Furniture",
  tagline: "Premium Polymer, Office & Institutional Furniture",
  description:
    "Atlanta Furniture is a premier manufacturer of high-grade plastic molded seating, ergonomic office chairs, institutional student desks & benches, and heavy-duty waste management solutions.",
  email: "info@atlantafurniture.com",
  secondaryEmail: "atlantaworld2014@gmail.com",
  phone: "+91 9930349455",
  secondaryPhone: "+91 8898114400",
  phoneHref: "tel:+919930349455",
  whatsapp: "https://wa.me/919930349455?text=Hello%20Atlanta%20Furniture,%20I%20am%20interested%20in%20your%20furniture%20catalog.",
  founded: "2014",
  hours: "Mon – Sat: 9:30 AM – 7:30 PM\nSun: Closed",
  hoursShort: "Mon – Sat · 9:30 AM – 7:30 PM",
  address: {
    line1: "Atlanta World, Industrial Hub",
    line2: "Near Western Express Highway",
    line3: "Mumbai, Maharashtra 400068, India",
    full: "Atlanta World / Atlanta Furniture, Mumbai, Maharashtra 400068, India",
    maps: "https://maps.google.com/?q=Atlanta+Furniture+Mumbai",
  },
  social: {
    facebook: "https://facebook.com/atlantafurniture",
    instagram: "https://instagram.com/atlantafurniture",
    youtube: "https://youtube.com/@atlantafurniture",
    linkedin: "https://linkedin.com/company/atlanta-furniture",
  },
  logo: "/logo/atlanta-logo.png",
  heroImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=2000&q=80",
} as const;

export interface NavSubcategory {
  name: string;
  slug: string;
  filterKey: string;
  href: string;
  count: number;
  desc: string;
}

export interface NavCategory {
  name: string;
  shortName: string;
  slug: string;
  href: string;
  categoryKey: string;
  subcategories: NavSubcategory[];
}

export interface NavChildItem {
  label: string;
  href: string;
  slug: string;
}

export interface NavItem {
  label: string;
  href: string;
  slug?: string;
  categoryKey?: string;
  children?: NavChildItem[];
}

export const navCategories: NavCategory[] = [
  {
    name: "PLASTIC FURNITURE",
    shortName: "Plastic Furniture",
    slug: "plastic-furniture",
    href: "/plastic-furniture",
    categoryKey: "Plastic Furniture",
    subcategories: [
      { name: "PLASTIC CHAIRS", slug: "plastic-chairs", filterKey: "Plastic Chairs", href: "/plastic-furniture/plastic-chairs", count: 14, desc: "High-grade molded armless & arm-rest virgin polypropylene chairs." },
      { name: "DINING TABLES", slug: "dining-tables", filterKey: "Dining Tables", href: "/plastic-furniture/dining-tables", count: 4, desc: "Heavy-duty 4-seater & 6-seater banquet and cafeteria polymer tables." },
      { name: "STOOLS", slug: "stools", filterKey: "Stools", href: "/plastic-furniture/stools", count: 3, desc: "Rhino step stools, Deo round stools, and Duke utility stools." },
      { name: "PARTY HALLS", slug: "party-halls", filterKey: "Party Halls", href: "/plastic-furniture/party-halls", count: 3, desc: "Stackable banquet seating, lawn and event venue polymer series." },
    ],
  },
  {
    name: "OFFICE FURNITURE",
    shortName: "Office Furniture",
    slug: "office-furniture",
    href: "/office-furniture",
    categoryKey: "Office Furniture",
    subcategories: [
      { name: "WARD ROBES", slug: "wardrobes", filterKey: "Wardrobes", href: "/office-furniture/wardrobes", count: 3, desc: "Executive CRCA steel lockers, almirahs, and file storage cupboards." },
      { name: "DIRECTOR CHAIR", slug: "director-chair", filterKey: "Director Chairs", href: "/office-furniture/director-chair", count: 4, desc: "Luxury high-back ergonomic leatherette & mesh director thrones." },
      { name: "EXECUTIVE CHAIRS", slug: "executive-chairs", filterKey: "Executive Chairs", href: "/office-furniture/executive-chairs", count: 3, desc: "Synchro-tilt mid-back breathable mesh ergonomic task chairs." },
      { name: "VISITOR CHAIRS", slug: "visitor-chairs", filterKey: "Visitor Chairs", href: "/office-furniture/visitor-chairs", count: 3, desc: "Heavy-gauge cantilever and 4-leg guest conference chairs." },
      { name: "STUDENT DEST", slug: "student-desk", filterKey: "Student Desks", href: "/office-furniture/student-desk", count: 1, desc: "Ergonomic study desks with integrated book baskets." },
    ],
  },
  {
    name: "OFFICE & INSTITUTIONAL",
    shortName: "Office & Institutional",
    slug: "office-institutional",
    href: "/office-institutional",
    categoryKey: "Institutional Furniture",
    subcategories: [
      { name: "STUDENT BENCHES", slug: "student-benches", filterKey: "Student Benches", href: "/office-institutional/student-benches", count: 3, desc: "Heavy-duty dual-seater CRCA powder-coated school classroom benches." },
      { name: "COMPUTER TABLE", slug: "computer-table", filterKey: "Computer Tables", href: "/office-institutional/computer-table", count: 3, desc: "IT lab workstations with keyboard trays and CPU storage compartments." },
      { name: "STUDENT DESK", slug: "student-desk", filterKey: "Student Desks", href: "/office-institutional/student-desk", count: 5, desc: "Single and dual student desks with durable post-formed tops." },
      { name: "OFFICE DESK", slug: "office-desk", filterKey: "Office Desks", href: "/office-institutional/office-desk", count: 6, desc: "Italia, Glare, Impression, and Swiss corporate executive desks." },
      { name: "VISITOR CHAIR", slug: "visitor-chair", filterKey: "Institutional Visitor Chairs", href: "/office-institutional/visitor-chair", count: 11, desc: "Conference and airport-style multi-seater waiting area tandem chairs." },
      { name: "STORAGE", slug: "storage", filterKey: "Lockers & Storage Units", href: "/office-institutional/storage", count: 6, desc: "Personal lockers (12/15/18 doors), library and pigeon-hole cupboards." },
      { name: "HOSTEL BEDS", slug: "hostel-beds", filterKey: "Hostel Beds", href: "/office-institutional/hostel-beds", count: 4, desc: "Heavy steel single and bunk dual-deck hostel beds with safety rails." },
    ],
  },
  {
    name: "WASTE MANGEMENT",
    shortName: "Waste Management",
    slug: "waste-management",
    href: "/waste-management",
    categoryKey: "Waste Management",
    subcategories: [
      { name: "DUSTBIN", slug: "dustbin", filterKey: "Commercial Dustbins", href: "/waste-management/dustbin", count: 4, desc: "UV-stabilized HDPE heavy-duty mobile waste bins (80L, 100L, 120L, 240L)." },
    ],
  },
];

export const navItems: NavItem[] = [
  { label: "HOME", href: "/" },
  {
    label: "PLASTIC FURNITURE",
    href: "/plastic-furniture",
    slug: "plastic-furniture",
    categoryKey: "Plastic Furniture",
    children: [
      { label: "PLASTIC CHAIRS", href: "/plastic-furniture/plastic-chairs", slug: "plastic-chairs" },
      { label: "DINING TABLES", href: "/plastic-furniture/dining-tables", slug: "dining-tables" },
      { label: "STOOLS", href: "/plastic-furniture/stools", slug: "stools" },
      { label: "PARTY HALLS", href: "/plastic-furniture/party-halls", slug: "party-halls" },
    ],
  },
  {
    label: "OFFICE FURNITURE",
    href: "/office-furniture",
    slug: "office-furniture",
    categoryKey: "Office Furniture",
    children: [
      { label: "WARD ROBES", href: "/office-furniture/wardrobes", slug: "wardrobes" },
      { label: "DIRECTOR CHAIR", href: "/office-furniture/director-chair", slug: "director-chair" },
      { label: "EXECUTIVE CHAIRS", href: "/office-furniture/executive-chairs", slug: "executive-chairs" },
      { label: "VISITOR CHAIRS", href: "/office-furniture/visitor-chairs", slug: "visitor-chairs" },
      { label: "STUDENT DEST", href: "/office-furniture/student-desk", slug: "student-desk" },
    ],
  },
  {
    label: "OFFICE & INSTITUTIONAL",
    href: "/office-institutional",
    slug: "office-institutional",
    categoryKey: "Institutional Furniture",
    children: [
      { label: "STUDENT BENCHES", href: "/office-institutional/student-benches", slug: "student-benches" },
      { label: "COMPUTER TABLE", href: "/office-institutional/computer-table", slug: "computer-table" },
      { label: "STUDENT DESK", href: "/office-institutional/student-desk", slug: "student-desk" },
      { label: "OFFICE DESK", href: "/office-institutional/office-desk", slug: "office-desk" },
      { label: "VISITOR CHAIR", href: "/office-institutional/visitor-chair", slug: "visitor-chair" },
      { label: "STORAGE", href: "/office-institutional/storage", slug: "storage" },
      { label: "HOSTEL BEDS", href: "/office-institutional/hostel-beds", slug: "hostel-beds" },
    ],
  },
  {
    label: "WASTE MANGEMENT",
    href: "/waste-management",
    slug: "waste-management",
    categoryKey: "Waste Management",
    children: [
      { label: "DUSTBIN", href: "/waste-management/dustbin", slug: "dustbin" },
    ],
  },
  { label: "ABOUT US", href: "/about" },
  { label: "TESTIMONIAL", href: "/testimonials" },
  { label: "CONTACT", href: "/contact" },
];

export const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Plastic Furniture", href: "/plastic-furniture" },
  { label: "Plastic Chairs & Stools", href: "/plastic-furniture/plastic-chairs" },
  { label: "Office Furniture", href: "/office-furniture" },
  { label: "Director & Executive Chairs", href: "/office-furniture/director-chair" },
  { label: "Office & Institutional", href: "/office-institutional" },
  { label: "Student Desks & Benches", href: "/office-institutional/student-benches" },
  { label: "Commercial Dustbins", href: "/waste-management/dustbin" },
  { label: "About Us", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const hero = {
  eyebrow: "ARCHITECTURAL PRECISION & ERGONOMIC COMFORT",
  titleLine1: "ENGINEERED FOR",
  titleLine2: "LIFELONG STRENGTH",
  description:
    "Discover Atlanta Furniture’s certified range of 100% virgin polymer seating, executive workstations, classroom dual-desks, and heavy-duty industrial bins built for high-performance durability.",
  primaryCta: "Explore Product Catalog",
  primaryHref: "/products",
  secondaryCta: "Request Bulk Quote",
  secondaryHref: "/contact",
  images: [
    {
      src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=2000&q=80",
      alt: "Atlanta Premium Ergonomic Seating",
      eyebrow: "PREMIUM POLYMER & SEATING",
      titleLine1: "PLASTIC & EXECUTIVE",
      titleLine2: "LUXURY FURNITURE",
    },
    {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80",
      alt: "Atlanta Office & Corporate Workstations",
      eyebrow: "CORPORATE EXCELLENCE",
      titleLine1: "MODERN WORKSPACE",
      titleLine2: "& DIRECTOR CHAIRS",
    },
    {
      src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=2000&q=80",
      alt: "Atlanta Institutional Benches and Desks",
      eyebrow: "INSTITUTIONAL FURNISHING",
      titleLine1: "STUDENT BENCHES",
      titleLine2: "& CAMPUS DESKS",
    },
  ],
  processTabs: ["PLASTIC FURNITURE", "OFFICE SERIES", "INSTITUTIONAL", "WASTE MANAGEMENT"],
} as const;

export const categoriesData = [
  {
    id: "plastic",
    name: "Plastic Furniture",
    slug: "Plastic Furniture",
    count: "17+ Models",
    description: "Molded from 100% virgin polypropylene. Weather-proof, stackable, and ergonomic chairs & tables.",
    image: "https://atlantaworld.in/admin/products/17164641970.png",
    accent: "from-sky-600/20 to-blue-900/40",
    badge: "100% Virgin Polymer",
    popularItems: ["CRYSTAL", "ARIZONA", "BANDHAN 01", "ROYAL 02", "CORAL BABY CHAIR"],
  },
  {
    id: "office",
    name: "Office Furniture",
    slug: "Office Furniture",
    count: "10+ Models",
    description: "High-back director chairs, synchro-tilt executive mesh chairs, and heavy-duty visitor seating.",
    image: "https://atlantaworld.in/admin/products/17161205220.jpg",
    accent: "from-blue-600/20 to-slate-900/40",
    badge: "Ergonomic Lumbar Support",
    popularItems: ["7001 High Back", "7002 Mid Back", "7003 Executive", "7004 Visitor"],
  },
  {
    id: "institutional",
    name: "Institutional Furniture",
    slug: "Institutional Furniture",
    count: "38+ Models",
    description: "Heavy-gauge CRCA powder-coated dual student benches, computer tables, hostel beds, and lockers.",
    image: "https://atlantaworld.in/admin/products/17188714390.jpg",
    accent: "from-emerald-600/20 to-stone-900/40",
    badge: "Schools & IT Labs",
    popularItems: ["Student Bench I, II, III", "Computer Lab Table", "Double Deck Hostel Bed", "Classroom Desk"],
  },
  {
    id: "waste",
    name: "Waste Management",
    slug: "Waste Management",
    count: "4+ Capacities",
    description: "UV-stabilized HDPE heavy duty mobile waste bins with rubber wheels (100L, 120L, 240L).",
    image: "https://atlantaworld.in/admin/products/17172400200.jpg",
    accent: "from-teal-600/20 to-zinc-900/40",
    badge: "Commercial Grade HDPE",
    popularItems: ["240L Mobile Bin", "120L Waste Bin", "100L Bin", "Pedal Operated Bin"],
  },
];

export const stats = [
  { value: "69+", label: "Certified Product Models" },
  { value: "50,000+", label: "Units Installed Across India" },
  { value: "10+", label: "Years of Polymer & Steel Mastery" },
  { value: "100%", label: "Virgin Grade Raw Materials" },
] as const;

export const brandPillars = [
  {
    title: "100% Virgin Polymer",
    description: "Zero recycled impurities for maximum tensile strength, vibrant luster, and crack resistance.",
    icon: "ShieldCheck",
  },
  {
    title: "Heavy Gauge CRCA Steel",
    description: "Robotically welded steel frames coated with 7-tank anti-rust epoxy powder coat.",
    icon: "Hammer",
  },
  {
    title: "Ergonomically Certified",
    description: "Designed following orthopedic contour guidelines to reduce fatigue during prolonged work & study.",
    icon: "Sparkles",
  },
  {
    title: "Pan-India Institutional Supply",
    description: "Direct factory pricing, rapid production volume, and on-site assembly assistance nationwide.",
    icon: "Truck",
  },
] as const;

export const testimonials = [
  {
    quote:
      "Atlanta Furniture supplied over 400 dual student benches and 60 computer lab tables for our high school campus. The structural finish and durability after 3 years of daily usage are exceptional.",
    author: "Dr. Rajesh Sharma",
    role: "Trustee & Director",
    company: "St. Xavier's Educational Trust, Mumbai",
    rating: 5,
  },
  {
    quote:
      "We outfitted our entire 3-story corporate office with Atlanta Director and Executive mesh chairs. Their ergonomic support has significantly improved team comfort and reduced back complaints.",
    author: "Priya Varma",
    role: "Head of Facilities & Infrastructure",
    company: "Apex Global Technologies",
    rating: 5,
  },
  {
    quote:
      "The heavy-duty 240L and 120L Atlanta wheeled dustbins are indestructible. They handle extreme weather and heavy daily waste collection in our residential township effortlessly.",
    author: "Sunil Gokhale",
    role: "Estate Manager",
    company: "Palms Greenfield Residency",
    rating: 5,
  },
  {
    quote:
      "We placed bulk orders for Atlanta Crystal and Arizona polymer chairs for our banquet banquet chain. Brilliant shine, lightweight yet able to handle 180kg without a wobble. Highly recommended!",
    author: "Anand Mehra",
    role: "Managing Partner",
    company: "Royal Heritage Banquets & Hospitality",
    rating: 5,
  },
];

export function getCategoryBySlug(slug: string) {
  const normalized = slug.toLowerCase().replace(/_/g, "-");
  return navCategories.find(
    (c) =>
      c.slug === normalized ||
      c.categoryKey.toLowerCase().replace(/ /g, "-") === normalized ||
      (normalized === "institutional-furniture" && c.slug === "office-institutional") ||
      (normalized === "waste-mangement" && c.slug === "waste-management")
  );
}

export function getSubcategoryBySlug(categorySlug: string, subSlug: string) {
  const cat = getCategoryBySlug(categorySlug);
  if (!cat) return null;
  const normalizedSub = subSlug.toLowerCase().replace(/_/g, "-");
  return (
    cat.subcategories.find(
      (s) =>
        s.slug === normalizedSub ||
        s.name.toLowerCase().replace(/ /g, "-") === normalizedSub ||
        (normalizedSub === "student-dest" && s.slug === "student-desk") ||
        (normalizedSub === "dning-tables" && s.slug === "dining-tables") ||
        (normalizedSub === "ward-robes" && s.slug === "wardrobes") ||
        (normalizedSub === "ward-robesg" && s.slug === "wardrobes")
    ) || null
  );
}

export function getProductsForCategory(categorySlug: string, subcategorySlug?: string): ProductItem[] {
  const cat = getCategoryBySlug(categorySlug);
  if (!cat) return [];

  // 1. Strict Category Isolation
  const list = products.filter((p) => {
    if (cat.slug === "plastic-furniture") return p.category === "Plastic Furniture";
    if (cat.slug === "office-furniture") return p.category === "Office Furniture";
    if (cat.slug === "office-institutional") return p.category === "Institutional Furniture";
    if (cat.slug === "waste-management") return p.category === "Waste Management";
    return p.category.toLowerCase() === cat.categoryKey.toLowerCase();
  });

  if (!subcategorySlug || subcategorySlug === "all") {
    return list;
  }

  const sub = getSubcategoryBySlug(categorySlug, subcategorySlug);
  const targetSub = (sub?.filterKey || subcategorySlug).toLowerCase().trim();

  // 2. Strict 1:1 Subcategory Match
  return list.filter((p) => p.subcategory.toLowerCase().trim() === targetSub);
}
