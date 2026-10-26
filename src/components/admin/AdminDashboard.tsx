"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Filter,
  Inbox,
  Layers,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Palette,
  Pencil,
  Plus,
  Search,
  Trash2,
  Upload,
  X,
  Eye,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  Building2,
  RefreshCw,
} from "lucide-react";
import type {
  Enquiry,
  EnquiryStatus,
  ProductColor,
  ProductItem,
  StoredCategory,
} from "@/lib/catalog-types";
import { PRESET_PRODUCT_COLORS } from "@/lib/product-colors";

type Tab = "overview" | "products" | "categories" | "enquiries";

type ProductFormState = {
  title: string;
  category: string;
  subcategory: string;
  price: string;
  mrp: string;
  image: string;
  description: string;
  material: string;
  warranty: string;
  inStock: boolean;
  tags: string;
  specifications: Array<{ key: string; value: string }>;
  colors: ProductColor[];
};

type CategoryFormState = {
  name: string;
  description: string;
  image: string;
  badge: string;
  subcategories: Array<{ name: string; desc: string }>;
};

const emptyProductForm = (): ProductFormState => ({
  title: "",
  category: "",
  subcategory: "",
  price: "",
  mrp: "",
  image: "",
  description: "",
  material: "",
  warranty: "1 Year Manufacturer Warranty",
  inStock: true,
  tags: "",
  specifications: [{ key: "", value: "" }],
  colors: [],
});

const emptyCategoryForm = (): CategoryFormState => ({
  name: "",
  description: "",
  image: "",
  badge: "New Collection",
  subcategories: [{ name: "", desc: "" }],
});

const navItems = [
  ["overview", "Overview", LayoutDashboard],
  ["products", "Products", Package],
  ["categories", "Categories", Layers],
  ["enquiries", "Enquiries", Inbox],
] as const;

export default function AdminDashboard() {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginBusy, setLoginBusy] = useState(false);

  const [tab, setTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productCategory, setProductCategory] = useState("all");
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState<"all" | EnquiryStatus>("all");
  const [enquiryCategory, setEnquiryCategory] = useState("all");
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [categories, setCategories] = useState<StoredCategory[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const [productModal, setProductModal] = useState<"create" | "edit" | null>(null);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [productForm, setProductForm] = useState<ProductFormState>(emptyProductForm);
  const [savingProduct, setSavingProduct] = useState(false);

  const [categoryModal, setCategoryModal] = useState<"create" | "edit" | null>(null);
  const [editingCategory, setEditingCategory] = useState<StoredCategory | null>(null);
  const [categoryForm, setCategoryForm] = useState<CategoryFormState>(emptyCategoryForm);
  const [savingCategory, setSavingCategory] = useState(false);

  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [catalogRes, enquiryRes] = await Promise.all([
        fetch("/api/catalog"),
        fetch("/api/admin/enquiries"),
      ]);
      const catalog = await catalogRes.json();
      const enquiryData = await enquiryRes.json();
      if (catalog?.ok) {
        setProducts(catalog.products || []);
        setCategories(catalog.categories || []);
      }
      if (enquiryData?.ok) {
        setEnquiries(enquiryData.enquiries || []);
      } else if (enquiryRes.status === 401) {
        setAuthed(false);
      }
    } catch {
      setError("Could not load admin data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch("/api/admin/session")
      .then((response) => response.json())
      .then((data) => {
        setAuthed(Boolean(data?.ok));
        if (data?.ok) void loadAll();
      })
      .catch(() => setAuthed(false))
      .finally(() => setChecking(false));
  }, [loadAll]);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 3500);
    return () => clearTimeout(timer);
  }, [notice]);

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setLoginBusy(true);
    setLoginError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (!response.ok || !data?.ok) {
        setLoginError(data?.error || "Incorrect password.");
        return;
      }
      setAuthed(true);
      setPassword("");
      await loadAll();
    } catch {
      setLoginError("Could not sign in. Try again.");
    } finally {
      setLoginBusy(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setProducts([]);
    setCategories([]);
    setEnquiries([]);
  }

  const newEnquiries = enquiries.filter((item) => item.status === "new").length;
  const selectedCategorySubs =
    categories.find((category) => category.categoryKey === productForm.category)?.subcategories ||
    [];

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        productCategory === "all" ||
        product.category.toLowerCase() === productCategory.toLowerCase();
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        product.title.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.subcategory.toLowerCase().includes(q)
      );
    });
  }, [products, query, productCategory]);

  const productGroups = useMemo(() => {
    const groups = categories.map((category) => ({
      key: category.categoryKey,
      name: category.name,
      items: filteredProducts.filter(
        (product) => product.category.toLowerCase() === category.categoryKey.toLowerCase(),
      ),
    }));
    const known = new Set(categories.map((category) => category.categoryKey.toLowerCase()));
    const uncategorized = filteredProducts.filter(
      (product) => !known.has(product.category.toLowerCase()),
    );
    if (uncategorized.length > 0) {
      groups.push({ key: "uncategorized", name: "Uncategorized", items: uncategorized });
    }
    return groups.filter((group) => group.items.length > 0);
  }, [categories, filteredProducts]);

  const enquiryCategories = useMemo(() => {
    const names = new Set<string>();
    categories.forEach((category) => names.add(category.categoryKey));
    enquiries.forEach((enquiry) => {
      if (enquiry.category) names.add(enquiry.category);
    });
    return Array.from(names);
  }, [categories, enquiries]);

  const filteredEnquiries = useMemo(() => {
    const q = query.trim().toLowerCase();
    return enquiries.filter((item) => {
      const matchesStatus = enquiryStatusFilter === "all" || item.status === enquiryStatusFilter;
      const matchesCategory =
        enquiryCategory === "all" ||
        item.category.toLowerCase() === enquiryCategory.toLowerCase();
      if (!matchesStatus || !matchesCategory) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q) ||
        item.organization.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.message.toLowerCase().includes(q)
      );
    });
  }, [enquiries, query, enquiryStatusFilter, enquiryCategory]);

  const enquiryGroups = useMemo(() => {
    const order: EnquiryStatus[] = ["new", "read", "closed"];
    return order
      .map((status) => ({
        status,
        label: status === "new" ? "New" : status === "read" ? "Read" : "Closed",
        items: filteredEnquiries.filter((item) => item.status === status),
      }))
      .filter((group) => group.items.length > 0);
  }, [filteredEnquiries]);

  function openCreateProduct() {
    setEditingProduct(null);
    setProductForm({
      ...emptyProductForm(),
      category: categories[0]?.categoryKey || "",
    });
    setProductModal("create");
  }

  function openEditProduct(product: ProductItem) {
    setEditingProduct(product);
    setProductForm({
      title: product.title,
      category: product.category,
      subcategory: product.subcategory,
      price: String(product.priceNumber || product.price.replace(/[^\d.]/g, "")),
      mrp: product.mrp,
      image: product.image,
      description: product.description,
      material: product.material,
      warranty: product.warranty,
      inStock: product.inStock,
      tags: (product.tags || []).join(", "),
      specifications: Object.entries(product.specifications || {}).map(([key, value]) => ({
        key,
        value,
      })),
      colors: product.colors || [],
    });
    setProductModal("edit");
  }

  async function saveProduct(event: React.FormEvent) {
    event.preventDefault();
    setSavingProduct(true);
    setError("");
    const payload = {
      title: productForm.title,
      category: productForm.category,
      subcategory: productForm.subcategory,
      price: productForm.price,
      mrp: productForm.mrp,
      image: productForm.image,
      description: productForm.description,
      material: productForm.material,
      warranty: productForm.warranty,
      inStock: productForm.inStock,
      tags: productForm.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      specifications: Object.fromEntries(
        productForm.specifications
          .filter((row) => row.key.trim())
          .map((row) => [row.key.trim(), row.value.trim()]),
      ),
      colors: productForm.colors,
    };
    try {
      const response = await fetch(
        editingProduct ? `/api/admin/products/${encodeURIComponent(editingProduct.id)}` : "/api/admin/products",
        {
          method: editingProduct ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await response.json();
      if (!response.ok || !data?.ok) {
        setError(data?.error || "Could not save product.");
        return;
      }
      setProductModal(null);
      setNotice(editingProduct ? "Product updated." : "Product added to the catalog.");
      await loadAll();
    } catch {
      setError("Could not save product.");
    } finally {
      setSavingProduct(false);
    }
  }

  async function removeProduct(product: ProductItem) {
    if (!confirm(`Delete “${product.title}” from the catalog?`)) return;
    const response = await fetch(`/api/admin/products/${encodeURIComponent(product.id)}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!response.ok || !data?.ok) {
      setError(data?.error || "Could not delete product.");
      return;
    }
    setNotice("Product deleted.");
    await loadAll();
  }

  function openCreateCategory() {
    setEditingCategory(null);
    setCategoryForm(emptyCategoryForm());
    setCategoryModal("create");
  }

  function openEditCategory(category: StoredCategory) {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      description: category.description,
      image: category.image,
      badge: category.badge,
      subcategories:
        category.subcategories.length > 0
          ? category.subcategories.map((sub) => ({ name: sub.name, desc: sub.desc }))
          : [{ name: "", desc: "" }],
    });
    setCategoryModal("edit");
  }

  async function saveCategory(event: React.FormEvent) {
    event.preventDefault();
    setSavingCategory(true);
    setError("");
    const payload = {
      name: categoryForm.name,
      description: categoryForm.description,
      image: categoryForm.image,
      badge: categoryForm.badge,
      subcategories: categoryForm.subcategories.filter((sub) => sub.name.trim()),
    };
    try {
      const response = await fetch(
        editingCategory
          ? `/api/admin/categories/${encodeURIComponent(editingCategory.id)}`
          : "/api/admin/categories",
        {
          method: editingCategory ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await response.json();
      if (!response.ok || !data?.ok) {
        setError(data?.error || "Could not save category.");
        return;
      }
      setCategoryModal(null);
      setNotice(editingCategory ? "Category updated." : "Category added.");
      await loadAll();
    } catch {
      setError("Could not save category.");
    } finally {
      setSavingCategory(false);
    }
  }

  async function removeCategory(category: StoredCategory) {
    if (!confirm(`Delete the “${category.name}” category?`)) return;
    const response = await fetch(`/api/admin/categories/${encodeURIComponent(category.id)}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!response.ok || !data?.ok) {
      setError(data?.error || "Could not delete category.");
      return;
    }
    setNotice("Category deleted.");
    await loadAll();
  }

  async function setEnquiryStatus(enquiry: Enquiry, status: EnquiryStatus) {
    const response = await fetch(`/api/admin/enquiries/${encodeURIComponent(enquiry.id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    if (!response.ok || !data?.ok) {
      setError(data?.error || "Could not update enquiry.");
      return;
    }
    setEnquiries((current) =>
      current.map((item) => (item.id === enquiry.id ? data.enquiry : item)),
    );
    setSelectedEnquiry((current) => (current?.id === enquiry.id ? data.enquiry : current));
  }

  async function removeEnquiry(enquiry: Enquiry) {
    if (!confirm(`Delete enquiry from ${enquiry.name}?`)) return;
    const response = await fetch(`/api/admin/enquiries/${encodeURIComponent(enquiry.id)}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!response.ok || !data?.ok) {
      setError(data?.error || "Could not delete enquiry.");
      return;
    }
    setSelectedEnquiry(null);
    setNotice("Enquiry deleted.");
    await loadAll();
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Loading admin panel...
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl"
        >
          <div className="mb-6 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0090d0]">
              Atlanta Furniture
            </p>
            <h1 className="mt-2 text-2xl font-extrabold text-slate-900">Admin Panel</h1>
            <p className="mt-2 text-sm text-slate-500">
              Sign in to manage products, categories, and customer enquiries.
            </p>
          </div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="mb-4 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-[#0090d0] focus:outline-none"
            placeholder="Enter admin password"
          />
          {loginError ? <p className="mb-4 text-sm text-red-600">{loginError}</p> : null}
          <button
            type="submit"
            disabled={loginBusy}
            className="w-full rounded-xl bg-[#0090d0] py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-[#0073ab] disabled:opacity-60"
          >
            {loginBusy ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    );
  }

  const activeNav = navItems.find(([id]) => id === tab);

  return (
    <div className="flex min-h-screen">
      {sidebarOpen ? (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-900 text-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-white/10 px-5 py-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0090d0]">
            Atlanta Furniture
          </p>
          <h1 className="mt-1 text-lg font-extrabold">Admin Panel</h1>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navItems.map(([id, label, Icon]) => (
            <button
              key={id}
              onClick={() => {
                setTab(id);
                setQuery("");
                setProductCategory("all");
                setEnquiryStatusFilter("all");
                setEnquiryCategory("all");
                setSidebarOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold ${
                tab === id
                  ? "bg-[#0090d0] text-white shadow-sm"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1 text-left">{label}</span>
              {id === "enquiries" && newEnquiries > 0 ? (
                <span className="rounded-full bg-[#e31e24] px-1.5 py-0.5 text-[10px] leading-none text-white">
                  {newEnquiries}
                </span>
              ) : null}
            </button>
          ))}
        </nav>

        <div className="space-y-2 border-t border-white/10 p-3">
          <Link
            href="/"
            className="flex items-center justify-center rounded-xl border border-white/15 px-3 py-2 text-xs font-bold text-slate-200 hover:bg-white/10"
          >
            View site
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-white/10 px-3 py-2 text-xs font-bold text-white hover:bg-white/15"
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-50 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0090d0]">
                Backend Panel
              </p>
              <h2 className="text-lg font-extrabold text-slate-900">
                {activeNav?.[1] ?? "Overview"}
              </h2>
            </div>
          </div>
          <button
            onClick={() => void loadAll()}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6">
        {notice ? (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
            {notice}
          </div>
        ) : null}
        {error ? (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        ) : null}

        {tab === "overview" ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Products" value={products.length} icon={Package} />
            <StatCard label="Categories" value={categories.length} icon={Layers} />
            <StatCard label="New enquiries" value={newEnquiries} icon={Inbox} accent />
            <StatCard label="Total enquiries" value={enquiries.length} icon={Mail} />
          </div>
        ) : null}

        {tab === "products" ? (
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <SearchField value={query} onChange={setQuery} placeholder="Search products..." />
              <button
                onClick={openCreateProduct}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0090d0] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0073ab]"
              >
                <Plus className="h-4 w-4" />
                Add product
              </button>
            </div>
            <div className="mb-4 space-y-2">
              <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <Filter className="h-3.5 w-3.5" />
                Filter by category
              </p>
              <FilterPills
                value={productCategory}
                onChange={setProductCategory}
                items={[
                  { id: "all", label: "All", count: products.length },
                  ...categories.map((category) => ({
                    id: category.categoryKey,
                    label: category.name,
                    count: products.filter(
                      (product) =>
                        product.category.toLowerCase() === category.categoryKey.toLowerCase(),
                    ).length,
                  })),
                ]}
              />
              <p className="text-xs font-semibold text-slate-500">
                Showing {filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="py-3 pr-3">Product</th>
                    <th className="py-3 pr-3">Category</th>
                    <th className="py-3 pr-3">Price</th>
                    <th className="py-3 pr-3">Stock</th>
                    <th className="py-3 text-right">Actions</th>
                  </tr>
                </thead>
                {productGroups.map((group) => (
                  <tbody key={group.key}>
                    {productCategory === "all" && productGroups.length > 1 ? (
                      <tr className="bg-slate-50">
                        <td
                          colSpan={5}
                          className="py-2.5 pr-3 text-xs font-extrabold uppercase tracking-wider text-slate-600"
                        >
                          {group.name}
                          <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500">
                            {group.items.length}
                          </span>
                        </td>
                      </tr>
                    ) : null}
                    {group.items.map((product) => (
                      <tr key={product.id} className="border-b border-slate-100">
                        <td className="py-3 pr-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image || "/logo/atlanta-logo.png"}
                              alt=""
                              className="h-12 w-12 rounded-lg border border-slate-200 bg-slate-50 object-contain"
                            />
                            <div>
                            <div className="font-bold text-slate-900">{product.title}</div>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <span>{product.subcategory}</span>
                              {(product.colors || []).length > 0 ? (
                                <span className="flex items-center gap-1">
                                  {(product.colors || []).slice(0, 6).map((color) => (
                                    <span
                                      key={`${color.name}-${color.hex}`}
                                      title={color.name}
                                      className="h-3 w-3 rounded-full border border-slate-200"
                                      style={{ backgroundColor: color.hex }}
                                    />
                                  ))}
                                </span>
                              ) : null}
                            </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 pr-3 text-slate-600">{product.category}</td>
                        <td className="py-3 pr-3 font-semibold">{product.price}</td>
                        <td className="py-3 pr-3">
                          <span
                            className={`rounded-full px-2 py-1 text-[11px] font-bold ${
                              product.inStock
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {product.inStock ? "In stock" : "Out of stock"}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => openEditProduct(product)}
                            className="mr-2 inline-flex rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => void removeProduct(product)}
                            className="inline-flex rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
              {filteredProducts.length === 0 ? (
                <p className="py-10 text-center text-sm text-slate-500">No products found.</p>
              ) : null}
            </div>
          </section>
        ) : null}

        {tab === "categories" ? (
          <section>
            <div className="mb-4 flex justify-end">
              <button
                onClick={openCreateCategory}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0090d0] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0073ab]"
              >
                <Plus className="h-4 w-4" />
                Add category
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {categories.map((category) => {
                const count = products.filter(
                  (product) => product.category === category.categoryKey,
                ).length;
                return (
                  <article
                    key={category.id}
                    className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-extrabold text-slate-900">{category.name}</h3>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#0090d0]">
                          {count} products · {category.subcategories.length} subcategories
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditCategory(category)}
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => void removeCategory(category)}
                          className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    {category.image ? (
                      <img
                        src={category.image}
                        alt=""
                        className="mb-3 h-28 w-full rounded-2xl object-contain bg-slate-50 border border-slate-100"
                      />
                    ) : null}
                    <p className="mb-3 text-sm text-slate-600">
                      {category.description || "No description yet."}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {category.subcategories.map((sub) => (
                        <span
                          key={sub.id}
                          className="rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-semibold text-sky-800"
                        >
                          {sub.name}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}

        {tab === "enquiries" ? (
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 space-y-3">
              <SearchField value={query} onChange={setQuery} placeholder="Search enquiries..." />
              <div className="space-y-2">
                <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <Filter className="h-3.5 w-3.5" />
                  Separate by status
                </p>
                <FilterPills
                  value={enquiryStatusFilter}
                  onChange={(value) => setEnquiryStatusFilter(value as "all" | EnquiryStatus)}
                  items={[
                    { id: "all", label: "All", count: enquiries.length },
                    {
                      id: "new",
                      label: "New",
                      count: enquiries.filter((item) => item.status === "new").length,
                    },
                    {
                      id: "read",
                      label: "Read",
                      count: enquiries.filter((item) => item.status === "read").length,
                    },
                    {
                      id: "closed",
                      label: "Closed",
                      count: enquiries.filter((item) => item.status === "closed").length,
                    },
                  ]}
                />
              </div>
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Filter by category
                </p>
                <FilterPills
                  value={enquiryCategory}
                  onChange={setEnquiryCategory}
                  items={[
                    { id: "all", label: "All categories", count: enquiries.length },
                    ...enquiryCategories.map((category) => ({
                      id: category,
                      label:
                        categories.find(
                          (item) => item.categoryKey.toLowerCase() === category.toLowerCase(),
                        )?.name || category,
                      count: enquiries.filter(
                        (item) => item.category.toLowerCase() === category.toLowerCase(),
                      ).length,
                    })),
                  ]}
                />
              </div>
              <p className="text-xs font-semibold text-slate-500">
                Showing {filteredEnquiries.length} enquir{filteredEnquiries.length === 1 ? "y" : "ies"}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="py-3 pr-3">Customer</th>
                    <th className="py-3 pr-3">Category</th>
                    <th className="py-3 pr-3">Qty</th>
                    <th className="py-3 pr-3">Received</th>
                    <th className="py-3 pr-3">Status</th>
                    <th className="py-3 text-right">View</th>
                  </tr>
                </thead>
                {enquiryGroups.map((group) => (
                  <tbody key={group.status}>
                    {enquiryStatusFilter === "all" ? (
                      <tr className="bg-slate-50">
                        <td
                          colSpan={6}
                          className="py-2.5 pr-3 text-xs font-extrabold uppercase tracking-wider text-slate-600"
                        >
                          {group.label}
                          <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500">
                            {group.items.length}
                          </span>
                        </td>
                      </tr>
                    ) : null}
                    {group.items.map((enquiry) => (
                      <tr
                        key={enquiry.id}
                        className={`border-b border-slate-100 ${
                          enquiry.status === "new" ? "bg-sky-50/60" : ""
                        }`}
                      >
                        <td className="py-3 pr-3">
                          <div className="font-bold text-slate-900">{enquiry.name}</div>
                          <div className="text-xs text-slate-500">{enquiry.organization}</div>
                        </td>
                        <td className="py-3 pr-3">{enquiry.category}</td>
                        <td className="py-3 pr-3">{enquiry.quantity}</td>
                        <td className="py-3 pr-3 text-slate-500">
                          {new Date(enquiry.createdAt).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </td>
                        <td className="py-3 pr-3">
                          <StatusBadge status={enquiry.status} />
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => {
                              setSelectedEnquiry(enquiry);
                              if (enquiry.status === "new") void setEnquiryStatus(enquiry, "read");
                            }}
                            className="inline-flex rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
              {filteredEnquiries.length === 0 ? (
                <p className="py-10 text-center text-sm text-slate-500">
                  No enquiries yet. New contact form requests will appear here.
                </p>
              ) : null}
            </div>
          </section>
        ) : null}
        </main>
      </div>

      {productModal ? (
        <Modal
          title={productModal === "edit" ? "Edit product" : "Add product"}
          onClose={() => setProductModal(null)}
        >
          <form onSubmit={saveProduct} className="space-y-3">
            <Field
              label="Product title"
              value={productForm.title}
              onChange={(value) => setProductForm((form) => ({ ...form, title: value }))}
              required
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Category
                </span>
                <select
                  required
                  value={productForm.category}
                  onChange={(event) =>
                    setProductForm((form) => ({
                      ...form,
                      category: event.target.value,
                      subcategory: "",
                    }))
                  }
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.categoryKey}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Subcategory
                </span>
                {selectedCategorySubs.length > 0 ? (
                  <select
                    value={productForm.subcategory}
                    onChange={(event) =>
                      setProductForm((form) => ({ ...form, subcategory: event.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
                  >
                    <option value="">Select subcategory</option>
                    {selectedCategorySubs.map((sub) => (
                      <option key={sub.id} value={sub.filterKey}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    value={productForm.subcategory}
                    onChange={(event) =>
                      setProductForm((form) => ({ ...form, subcategory: event.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
                    placeholder="e.g. Plastic Chairs"
                  />
                )}
              </label>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field
                label="Price (₹)"
                value={productForm.price}
                onChange={(value) => setProductForm((form) => ({ ...form, price: value }))}
              />
              <Field
                label="MRP (₹)"
                value={productForm.mrp}
                onChange={(value) => setProductForm((form) => ({ ...form, mrp: value }))}
              />
            </div>
            <ImageField
              label="Product image"
              value={productForm.image}
              onChange={(value) => setProductForm((form) => ({ ...form, image: value }))}
            />
            <Field
              label="Material"
              value={productForm.material}
              onChange={(value) => setProductForm((form) => ({ ...form, material: value }))}
            />
            <Field
              label="Warranty"
              value={productForm.warranty}
              onChange={(value) => setProductForm((form) => ({ ...form, warranty: value }))}
            />
            <ProductColorFields
              colors={productForm.colors}
              onChange={(colors) => setProductForm((form) => ({ ...form, colors }))}
            />
            <Field
              label="Tags (comma separated)"
              value={productForm.tags}
              onChange={(value) => setProductForm((form) => ({ ...form, tags: value }))}
            />
            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">
                Description
              </span>
              <textarea
                rows={4}
                value={productForm.description}
                onChange={(event) =>
                  setProductForm((form) => ({ ...form, description: event.target.value }))
                }
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
              />
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                checked={productForm.inStock}
                onChange={(event) =>
                  setProductForm((form) => ({ ...form, inStock: event.target.checked }))
                }
              />
              In stock
            </label>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Specifications
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setProductForm((form) => ({
                      ...form,
                      specifications: [...form.specifications, { key: "", value: "" }],
                    }))
                  }
                  className="text-xs font-bold text-[#0090d0]"
                >
                  Add row
                </button>
              </div>
              <div className="space-y-2">
                {productForm.specifications.map((row, index) => (
                  <div key={index} className="grid grid-cols-2 gap-2">
                    <input
                      value={row.key}
                      onChange={(event) =>
                        setProductForm((form) => {
                          const next = [...form.specifications];
                          next[index] = { ...next[index], key: event.target.value };
                          return { ...form, specifications: next };
                        })
                      }
                      placeholder="Label"
                      className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
                    />
                    <input
                      value={row.value}
                      onChange={(event) =>
                        setProductForm((form) => {
                          const next = [...form.specifications];
                          next[index] = { ...next[index], value: event.target.value };
                          return { ...form, specifications: next };
                        })
                      }
                      placeholder="Value"
                      className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={savingProduct}
              className="w-full rounded-xl bg-[#0090d0] py-3 text-sm font-bold uppercase tracking-wider text-white disabled:opacity-60"
            >
              {savingProduct ? "Saving..." : "Save product"}
            </button>
          </form>
        </Modal>
      ) : null}

      {categoryModal ? (
        <Modal
          title={categoryModal === "edit" ? "Edit category" : "Add category"}
          onClose={() => setCategoryModal(null)}
        >
          <form onSubmit={saveCategory} className="space-y-3">
            <Field
              label="Category name"
              value={categoryForm.name}
              onChange={(value) => setCategoryForm((form) => ({ ...form, name: value }))}
              required
            />
            <Field
              label="Badge"
              value={categoryForm.badge}
              onChange={(value) => setCategoryForm((form) => ({ ...form, badge: value }))}
            />
            <ImageField
              label="Category image"
              value={categoryForm.image}
              onChange={(value) => setCategoryForm((form) => ({ ...form, image: value }))}
            />
            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">
                Description
              </span>
              <textarea
                rows={3}
                value={categoryForm.description}
                onChange={(event) =>
                  setCategoryForm((form) => ({ ...form, description: event.target.value }))
                }
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
              />
            </label>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Subcategories
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setCategoryForm((form) => ({
                      ...form,
                      subcategories: [...form.subcategories, { name: "", desc: "" }],
                    }))
                  }
                  className="text-xs font-bold text-[#0090d0]"
                >
                  Add subcategory
                </button>
              </div>
              <div className="space-y-2">
                {categoryForm.subcategories.map((sub, index) => (
                  <div key={index} className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <input
                      value={sub.name}
                      onChange={(event) =>
                        setCategoryForm((form) => {
                          const next = [...form.subcategories];
                          next[index] = { ...next[index], name: event.target.value };
                          return { ...form, subcategories: next };
                        })
                      }
                      placeholder="Subcategory name"
                      className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
                    />
                    <input
                      value={sub.desc}
                      onChange={(event) =>
                        setCategoryForm((form) => {
                          const next = [...form.subcategories];
                          next[index] = { ...next[index], desc: event.target.value };
                          return { ...form, subcategories: next };
                        })
                      }
                      placeholder="Short description"
                      className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={savingCategory}
              className="w-full rounded-xl bg-[#0090d0] py-3 text-sm font-bold uppercase tracking-wider text-white disabled:opacity-60"
            >
              {savingCategory ? "Saving..." : "Save category"}
            </button>
          </form>
        </Modal>
      ) : null}

      {selectedEnquiry ? (
        <Modal title="Enquiry details" onClose={() => setSelectedEnquiry(null)}>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <StatusBadge status={selectedEnquiry.status} />
              <span className="text-xs text-slate-500">
                {new Date(selectedEnquiry.createdAt).toLocaleString("en-IN")}
              </span>
            </div>
            <p className="text-lg font-extrabold text-slate-900">{selectedEnquiry.name}</p>
            <p className="flex items-center gap-2 text-slate-600">
              <Building2 className="h-4 w-4" />
              {selectedEnquiry.organization}
            </p>
            <p className="flex items-center gap-2 text-slate-600">
              <Mail className="h-4 w-4" />
              <a className="hover:text-[#0090d0]" href={`mailto:${selectedEnquiry.email}`}>
                {selectedEnquiry.email}
              </a>
            </p>
            <p className="flex items-center gap-2 text-slate-600">
              <Phone className="h-4 w-4" />
              <a className="hover:text-[#0090d0]" href={`tel:${selectedEnquiry.phone}`}>
                {selectedEnquiry.phone}
              </a>
            </p>
            <p>
              <span className="font-bold">Category:</span> {selectedEnquiry.category}
            </p>
            <p>
              <span className="font-bold">Quantity:</span> {selectedEnquiry.quantity}
            </p>
            {selectedEnquiry.productTitle ? (
              <p>
                <span className="font-bold">Product:</span> {selectedEnquiry.productTitle}
              </p>
            ) : null}
            <div className="rounded-2xl bg-slate-50 p-4 text-slate-700">
              {selectedEnquiry.message || "No additional details provided."}
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => void setEnquiryStatus(selectedEnquiry, "read")}
                className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold"
              >
                Mark read
              </button>
              <button
                onClick={() => void setEnquiryStatus(selectedEnquiry, "closed")}
                className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white"
              >
                Mark closed
              </button>
              <button
                onClick={() => void removeEnquiry(selectedEnquiry)}
                className="ml-auto rounded-xl border border-red-200 px-3 py-2 text-xs font-bold text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  accent = false,
}: {
  label: string;
  value: number;
  icon: typeof Package;
  accent?: boolean;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div
        className={`mb-3 inline-flex rounded-xl p-2 ${
          accent ? "bg-red-50 text-[#e31e24]" : "bg-sky-50 text-[#0090d0]"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-3xl font-extrabold text-slate-900">{value}</div>
      <div className="text-sm font-medium text-slate-500">{label}</div>
    </div>
  );
}

function ProductColorFields({
  colors,
  onChange,
}: {
  colors: ProductColor[];
  onChange: (colors: ProductColor[]) => void;
}) {
  const [customName, setCustomName] = useState("");
  const [customHex, setCustomHex] = useState("#0090d0");

  function togglePreset(preset: ProductColor) {
    const exists = colors.some(
      (color) => color.name.toLowerCase() === preset.name.toLowerCase(),
    );
    onChange(
      exists
        ? colors.filter((color) => color.name.toLowerCase() !== preset.name.toLowerCase())
        : [...colors, { ...preset }],
    );
  }

  function addCustom() {
    const name = customName.trim();
    if (!name) return;
    const existing = colors.find((color) => color.name.toLowerCase() === name.toLowerCase());
    const next = { name, hex: customHex, image: existing?.image };
    const without = colors.filter((color) => color.name.toLowerCase() !== name.toLowerCase());
    onChange([...without, next]);
    setCustomName("");
  }

  function updateColor(name: string, patch: Partial<ProductColor>) {
    onChange(
      colors.map((color) =>
        color.name.toLowerCase() === name.toLowerCase() ? { ...color, ...patch } : color,
      ),
    );
  }

  return (
    <div>
      <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
        <Palette className="h-3.5 w-3.5" />
        Available colours
      </p>
      <div className="mb-3 flex flex-wrap gap-2">
        {PRESET_PRODUCT_COLORS.map((preset) => {
          const selected = colors.some(
            (color) => color.name.toLowerCase() === preset.name.toLowerCase(),
          );
          return (
            <button
              key={preset.name}
              type="button"
              onClick={() => togglePreset(preset)}
              className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-xs font-bold ${
                selected
                  ? "border-[#0090d0] bg-sky-50 text-slate-900"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span
                className="h-4 w-4 rounded-full border border-slate-200"
                style={{ backgroundColor: preset.hex }}
              />
              {preset.name}
            </button>
          );
        })}
      </div>
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          type="color"
          value={customHex}
          onChange={(event) => setCustomHex(event.target.value)}
          className="h-10 w-14 cursor-pointer rounded-lg border border-slate-300 bg-white p-1"
          aria-label="Custom colour"
        />
        <input
          value={customName}
          onChange={(event) => setCustomName(event.target.value)}
          placeholder="Custom colour name"
          className="flex-1 rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
        />
        <button
          type="button"
          onClick={addCustom}
          className="rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
        >
          Add colour
        </button>
      </div>
      {colors.length > 0 ? (
        <div className="space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Colour photos — shown when that colour is selected
          </p>
          {colors.map((color) => (
            <div
              key={`${color.name}-${color.hex}`}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-3"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-800">
                  <span
                    className="h-4 w-4 rounded-full border border-slate-200"
                    style={{ backgroundColor: color.hex }}
                  />
                  {color.name}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    onChange(
                      colors.filter((item) => item.name.toLowerCase() !== color.name.toLowerCase()),
                    )
                  }
                  className="text-slate-400 hover:text-red-600"
                  aria-label={`Remove ${color.name}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <ColorImageUpload
                value={color.image || ""}
                onChange={(image) => updateColor(color.name, { image })}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-slate-500">Select colours this product is available in, then add a photo for each.</p>
      )}
    </div>
  );
}

function ColorImageUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function onFile(file?: File) {
    if (!file) return;
    setUploading(true);
    setUploadError("");
    const form = new FormData();
    form.append("image", file);
    try {
      const response = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await response.json();
      if (!response.ok || !data?.ok) {
        setUploadError(data?.error || "Upload failed.");
        return;
      }
      onChange(data.image);
    } catch {
      setUploadError("Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      {value ? (
        <img
          src={value}
          alt=""
          className="h-16 w-16 rounded-xl border border-slate-200 bg-white object-contain"
        />
      ) : (
        <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white text-[10px] font-bold text-slate-400">
          No photo
        </div>
      )}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Colour image URL"
        className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm"
      />
      <label className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50">
        <Upload className="h-3.5 w-3.5" />
        {uploading ? "Uploading..." : "Upload"}
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(event) => void onFile(event.target.files?.[0])}
        />
      </label>
      {uploadError ? <p className="text-xs text-red-600">{uploadError}</p> : null}
    </div>
  );
}

function FilterPills({
  items,
  value,
  onChange,
}: {
  items: Array<{ id: string; label: string; count?: number }>;
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onChange(item.id)}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
            value === item.id
              ? "bg-[#0090d0] text-white"
              : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          }`}
        >
          {item.label}
          {typeof item.count === "number" ? (
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] leading-none ${
                value === item.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
              }`}
            >
              {item.count}
            </span>
          ) : null}
        </button>
      ))}
    </div>
  );
}

function SearchField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative w-full sm:max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 py-2.5 pl-9 pr-3 text-sm"
      />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">
        {label}
      </span>
      <input
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
      />
    </label>
  );
}

function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function onFile(file?: File) {
    if (!file) return;
    setUploading(true);
    setUploadError("");
    const form = new FormData();
    form.append("image", file);
    try {
      const response = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await response.json();
      if (!response.ok || !data?.ok) {
        setUploadError(data?.error || "Upload failed.");
        return;
      }
      onChange(data.image);
    } catch {
      setUploadError("Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <Field label={`${label} URL`} value={value} onChange={onChange} />
      <label className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50">
        <Upload className="h-3.5 w-3.5" />
        {uploading ? "Uploading..." : "Upload image"}
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(event) => void onFile(event.target.files?.[0])}
        />
      </label>
      {uploadError ? <p className="mt-1 text-xs text-red-600">{uploadError}</p> : null}
      {value ? (
        <img src={value} alt="" className="mt-3 h-28 w-28 rounded-xl border border-slate-200 object-contain bg-slate-50" />
      ) : null}
    </div>
  );
}

function StatusBadge({ status }: { status: EnquiryStatus }) {
  const styles = {
    new: "bg-sky-50 text-[#0090d0]",
    read: "bg-amber-50 text-amber-700",
    closed: "bg-emerald-50 text-emerald-700",
  };
  const icons = {
    new: Clock,
    read: Eye,
    closed: CheckCircle2,
  };
  const Icon = icons[status];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${styles[status]}`}>
      <Icon className="h-3 w-3" />
      {status}
    </span>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm">
      <div className="my-8 w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900">{title}</h2>
          <button onClick={onClose} className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200">
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
