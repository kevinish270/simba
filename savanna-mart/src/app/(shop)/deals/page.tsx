import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Zap, Timer } from "lucide-react";
import AddToCartButton from "@/components/shop/AddToCartButton";

export default async function DealsPage() {
  const discountedProducts = await prisma.product.findMany({
    where: {
      discountPrice: { not: null }
    },
    take: 20,
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-slate-900 rounded-[3rem] p-12 mb-16 relative overflow-hidden text-white">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm mb-6">
            <Zap className="h-5 w-5 fill-primary" /> Flash Sales Live
          </div>
          <h1 className="text-6xl font-black mb-6 tracking-tight leading-tight">Lightning Deals! Up to 50% Off</h1>
          <p className="text-xl text-slate-400 mb-8 font-medium">Don&apos;t blink! These deals disappear faster than a hunting lion. Get them before they&apos;re gone.</p>
          <div className="flex items-center gap-4 bg-white/10 w-fit p-4 rounded-3xl border border-white/10 backdrop-blur">
             <Timer className="h-6 w-6 text-primary" />
             <span className="font-black text-2xl tracking-tighter">04 : 12 : 55</span>
          </div>
        </div>
        <div className="absolute right-[-10%] top-[-20%] text-[400px] opacity-10 select-none">⚡</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {discountedProducts.map((product) => (
          <div key={product.id} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
            <Link href={`/product/${product.slug}`} className="relative">
              <div className="h-72 bg-slate-50 flex items-center justify-center text-9xl relative overflow-hidden group-hover:bg-slate-100 transition-colors">
                 {product.images}
                 <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                    -{Math.round((1 - Number(product.discountPrice) / Number(product.price)) * 100)}% OFF
                 </div>
              </div>
            </Link>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{product.brand}</span>
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-4 group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
                <Link href={`/product/${product.slug}`}>{product.name}</Link>
              </h3>
              
              <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                <div className="flex flex-col">
                   <span className="text-xs text-slate-400 line-through font-medium">${Number(product.price).toFixed(2)}</span>
                   <span className="text-2xl font-black text-red-600 tracking-tighter">${Number(product.discountPrice).toFixed(2)}</span>
                </div>
                <AddToCartButton 
                  product={product} 
                  className="bg-primary text-slate-900 p-4 rounded-2xl hover:bg-primary/90 hover:scale-110 active:scale-95 transition-all shadow-xl shadow-primary/20" 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
