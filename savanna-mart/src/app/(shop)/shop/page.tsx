import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import SearchBar from "@/components/shop/SearchBar";
import { Filter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency, serialize } from "@/lib/utils";
import ProductActions from "@/components/shop/ProductActions";

export const dynamic = "force-dynamic";

export default async function ShopPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string, category?: string, brand?: string, minPrice?: string, maxPrice?: string, sort?: string }>
}) {
  const { q, category, brand, minPrice, maxPrice, sort } = await searchParams;

  // Build the query
  const where: Prisma.ProductWhereInput = {};

  if (q) {
    where.OR = [
      { name: { contains: q } },
      { description: { contains: q } },
      { brand: { contains: q } },
      { sku: { contains: q } },
    ];
  }

  if (category) {
    const selectedCategory = await prisma.category.findUnique({
      where: { slug: category },
      include: { children: true },
    });

    if (selectedCategory) {
      where.categoryId = {
        in: [selectedCategory.id, ...selectedCategory.children.map((child) => child.id)],
      };
    }
  }

  if (brand) {
    where.brand = brand;
  }

  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) (where.price as Prisma.IntFilter).gte = Number(minPrice);
    if (maxPrice) (where.price as Prisma.IntFilter).lte = Number(maxPrice);
  }

  // Sorting
  let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
  if (sort === "price-low") orderBy = { price: "asc" };
  if (sort === "price-high") orderBy = { price: "desc" };

  const products = await prisma.product.findMany({
    where,
    orderBy,
    take: 40,
    include: { category: true }
  }).then(serialize);

  const categories = await prisma.category.findMany({
    where: { parentId: null },
  });

  const brands = await prisma.product.findMany({
    select: { brand: true },
    distinct: ["brand"],
    take: 20,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-8">
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Filter className="h-5 w-5" /> Filters
            </h3>
            
            <div className="space-y-8">
              <div>
                <h4 className="font-bold text-sm mb-4 text-slate-900 uppercase tracking-wider">Categories</h4>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <Link 
                      key={cat.id} 
                      href={`/shop?category=${cat.slug}${q ? `&q=${q}` : ""}`}
                      className={`block text-sm transition-colors ${category === cat.slug ? "text-primary font-bold" : "text-slate-600 hover:text-primary"}`}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm mb-4 text-slate-900 uppercase tracking-wider">Brands</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {brands.map(b => b.brand && (
                    <Link 
                      key={b.brand} 
                      href={`/shop?brand=${b.brand}${q ? `&q=${q}` : ""}${category ? `&category=${category}` : ""}`}
                      className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${brand === b.brand ? "text-primary font-bold" : "text-slate-600"}`}
                    >
                      <div className={`h-4 w-4 border rounded flex items-center justify-center ${brand === b.brand ? "bg-primary border-primary" : "border-slate-300"}`}>
                        {brand === b.brand && <div className="h-2 w-2 bg-white rounded-full"></div>}
                      </div>
                      {b.brand}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm mb-4 text-slate-900 uppercase tracking-wider">Price Range</h4>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Min" className="w-1/2 bg-white border rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-primary" />
                  <span className="text-slate-400">-</span>
                  <input type="number" placeholder="Max" className="w-1/2 bg-white border rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-primary" />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                 <Link href="/shop" className="text-xs text-primary font-bold hover:underline">
                   Reset all filters
                 </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div className="w-full md:max-w-md">
              <SearchBar />
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full md:w-auto transition-all shadow-sm">
                <option value="newest">Sort by: Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              {q ? `Search results for "${q}"` : "All Products"}
            </h2>
            <p className="text-slate-500 mt-1">{products.length} items found</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                <Link href={`/product/${product.slug}`} className="relative">
                  <div className="h-56 bg-slate-50 flex items-center justify-center relative overflow-hidden group-hover:bg-slate-100 transition-colors">
                    <Image 
                      src={product.images} 
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {product.discountPrice && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                        SALE
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{product.brand}</span>
                    <span className="text-[10px] text-slate-400">SKU: {product.sku}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
                    <Link href={`/product/${product.slug}`}>{product.name}</Link>
                  </h3>
                  <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex flex-col">
                      {product.discountPrice ? (
                        <>
                          <span className="text-sm text-slate-400 line-through">{formatCurrency(product.price)}</span>
                          <span className="text-xl font-black text-red-600">{formatCurrency(product.discountPrice)}</span>
                        </>
                      ) : (
                        <span className="text-xl font-black text-slate-900">{formatCurrency(product.price)}</span>
                      )}
                    </div>
                    <ProductActions product={product} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-32 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
               <div className="text-6xl mb-6 opacity-20">🔎</div>
               <p className="text-slate-500 text-lg font-medium">We couldn&apos;t find any products matching your search.</p>
               <Link href="/shop" className="text-primary font-bold mt-4 inline-block hover:underline">
                 View all products
               </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
