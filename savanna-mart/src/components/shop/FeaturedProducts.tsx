import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency, serialize } from "@/lib/utils";
import ProductActions from "./ProductActions";

export default async function FeaturedProducts() {
  const products = await prisma.product.findMany({
    where: { featured: true },
    take: 8,
    orderBy: { createdAt: "desc" },
    include: { category: true }
  }).then(serialize);

  if (products.length === 0) return null;

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Featured for You</h2>
        <Link href="/shop" className="text-primary font-black text-sm hover:underline flex items-center gap-1">
          View All <span className="text-lg">→</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <div className="absolute top-4 left-4 bg-primary text-slate-900 text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                  FEATURED
                </div>
              </div>
            </Link>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{product.brand}</span>
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
    </section>
  );
}
