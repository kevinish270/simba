import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Filter } from "lucide-react";
import { formatCurrency, serialize } from "@/lib/utils";
import ProductActions from "@/components/shop/ProductActions";

export default async function CategoryPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ brand?: string, minPrice?: string, maxPrice?: string, sort?: string }>
}) {
  const { slug } = await params;
  const { brand, minPrice, maxPrice, sort } = await searchParams;

  const category = await prisma.category.findUnique({
    where: { slug: slug },
    include: {
      children: true,
      parent: {
        include: {
          children: true
        }
      },
    },
  });

  if (!category) {
    notFound();
  }

  // Get all subcategory IDs
  const subCategoryIds = category.children.map(c => c.id);
  const categoryIds = [category.id, ...subCategoryIds];

  // Filtering logic
  const where: Prisma.ProductWhereInput = {
    categoryId: { in: categoryIds },
  };

  if (brand) {
    where.brand = brand;
  }

  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) (where.price as Prisma.IntFilter).gte = Number(minPrice);
    if (maxPrice) (where.price as Prisma.IntFilter).lte = Number(maxPrice);
  }

  // Sorting logic
  let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
  if (sort === "price-low") orderBy = { price: "asc" };
  if (sort === "price-high") orderBy = { price: "desc" };

  const products = await prisma.product.findMany({
    where,
    orderBy,
    take: 40,
    include: { category: true }
  }).then(serialize);

  // Get unique brands for filters
  const allBrands = await prisma.product.findMany({
    where: { categoryId: { in: categoryIds } },
    select: { brand: true },
    distinct: ["brand"],
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 font-bold">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        {category.parent && (
          <>
            <Link href={`/categories/${category.parent.slug}`} className="hover:text-primary transition-colors">
              {category.parent.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
          </>
        )}
        <span className="text-slate-900">{category.name}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-64">
          <div className="mb-8">
            <h2 className="text-xl font-black mb-6 uppercase tracking-widest text-slate-900">Subcategories</h2>
            <div className="space-y-2">
              {category.parent ? (
                // If in a subcategory, show siblings
                category.parent.children?.map(sibling => (
                  <Link
                    key={sibling.id}
                    href={`/categories/${sibling.slug}`}
                    className={`block px-4 py-2.5 rounded-xl text-sm transition-all ${sibling.id === category.id ? "bg-primary text-slate-900 font-black shadow-lg shadow-primary/20" : "hover:bg-slate-100 text-slate-600 font-bold"}`}
                  >
                    {sibling.name}
                  </Link>
                ))
              ) : (
                // If in a main category, show children
                category.children.map(child => (
                  <Link
                    key={child.id}
                    href={`/categories/${child.slug}`}
                    className="block px-4 py-2.5 rounded-xl text-sm hover:bg-slate-100 text-slate-600 font-bold transition-all"
                  >
                    {child.name}
                  </Link>
                ))
              )}
            </div>
          </div>

          <div className="space-y-8 sticky top-24">
            <div>
              <h3 className="text-lg font-black mb-4 flex items-center gap-2 uppercase tracking-widest text-slate-900">
                <Filter className="h-5 w-5 text-primary" /> Filter
              </h3>
              
              <div className="space-y-6">
                {allBrands.length > 0 && (
                  <div>
                    <h4 className="font-bold text-xs mb-3 text-slate-400 uppercase tracking-widest">Brand</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                      {allBrands.map(b => b.brand && (
                        <Link 
                          key={b.brand} 
                          href={`/categories/${slug}?brand=${b.brand}${minPrice ? `&minPrice=${minPrice}` : ""}${maxPrice ? `&maxPrice=${maxPrice}` : ""}${sort ? `&sort=${sort}` : ""}`}
                          className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${brand === b.brand ? "text-primary font-black" : "text-slate-600 font-medium"}`}
                        >
                          <div className={`h-4 w-4 border rounded flex items-center justify-center transition-all ${brand === b.brand ? "bg-primary border-primary shadow-sm" : "border-slate-300"}`}>
                            {brand === b.brand && <div className="h-2 w-2 bg-white rounded-full"></div>}
                          </div>
                          {b.brand}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-bold text-xs mb-3 text-slate-400 uppercase tracking-widest">Price Range</h4>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      placeholder="Min" 
                      className="w-1/2 bg-slate-50 border-none rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary font-bold"
                    />
                    <span className="text-slate-300">-</span>
                    <input 
                      type="number" 
                      placeholder="Max" 
                      className="w-1/2 bg-slate-50 border-none rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary font-bold"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                   <Link 
                    href={`/categories/${slug}`}
                    className="text-[10px] text-primary font-black uppercase tracking-widest hover:underline"
                   >
                     Reset all filters
                   </Link>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">{category.name}</h1>
              <p className="text-slate-500 font-medium mt-1">
                Found {products.length} products
              </p>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <select 
                className="bg-white border-2 border-slate-100 rounded-xl px-4 py-2.5 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full md:w-auto transition-all shadow-sm"
                defaultValue={sort || "newest"}
              >
                <option value="newest">Sort by: Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                <Link href={`/product/${product.slug}`} className="relative">
                  <div className="h-64 bg-slate-50 flex items-center justify-center relative overflow-hidden group-hover:bg-slate-100 transition-colors">
                    <Image 
                      src={product.images} 
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {product.discountPrice && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-full shadow-lg">
                        SALE
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{product.brand}</span>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">SKU: {product.sku?.split('-')[2]}</span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-4 group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
                    <Link href={`/product/${product.slug}`}>{product.name}</Link>
                  </h3>
                  <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex flex-col">
                      {product.discountPrice ? (
                        <>
                          <span className="text-xs text-slate-400 line-through font-medium">{formatCurrency(product.price)}</span>
                          <span className="text-2xl font-black text-red-600 tracking-tighter">{formatCurrency(product.discountPrice)}</span>
                        </>
                      ) : (
                        <span className="text-2xl font-black text-slate-900 tracking-tighter">{formatCurrency(product.price)}</span>
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
               <div className="text-6xl mb-6 opacity-20">🔍</div>
               <p className="text-slate-500 text-xl font-bold">No products match your filters.</p>
               <Link href={`/categories/${slug}`} className="text-primary font-black uppercase tracking-widest text-xs mt-6 inline-block hover:underline">
                 Reset all filters
               </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
