import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatCurrency, serialize } from "@/lib/utils";
import ProductActions from "./ProductActions";
import { Prisma } from "@prisma/client";
import Image from "next/image";

interface ProductSectionProps {
  title: string;
  filter?: Prisma.ProductWhereInput;
  take?: number;
  orderBy?: Prisma.ProductOrderByWithRelationInput;
  link?: string;
}

export default async function ProductSection({ 
  title, 
  filter = {}, 
  take = 4, 
  orderBy = { createdAt: "desc" },
  link = "/shop"
}: ProductSectionProps) {
  const products = await prisma.product.findMany({
    where: filter,
    take: take,
    orderBy: orderBy,
    include: { category: true }
  }).then(serialize);


  if (products.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">{title}</h2>
        <Link href={link} className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
          View All <span className="text-lg">→</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {products.map((product) => (
          <div key={product.id} className="group bg-white rounded-[2rem] md:rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
            <Link href={`/product/${product.slug}`} className="relative">
              <div className="h-48 sm:h-64 md:h-72 bg-slate-50 flex items-center justify-center relative overflow-hidden group-hover:bg-slate-100 transition-colors">
                 <Image 
                    src={product.images} 
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                 />
                 {product.discountPrice && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                        SALE
                    </div>
                 )}
              </div>
            </Link>
            <div className="p-4 md:p-6 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{product.brand || "Simba Premium"}</span>
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-4 group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
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
