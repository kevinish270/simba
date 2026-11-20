import { prisma } from "@/lib/prisma";
import { Star, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";
import ProductActions from "@/components/shop/ProductActions";
import { formatCurrency, serialize } from "@/lib/utils";

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug: slug },
    include: { category: { include: { parent: true } } }
  }).then(serialize);

  if (!product) {
    notFound();
  }

  const specs = [
    { label: "Brand", value: product.brand || "Simba Premium" },
    { label: "SKU", value: product.sku || "N/A" },
    { label: "Category", value: product.category.name },
    { label: "Subcategory", value: product.category.parent?.name || "Main" },
    { label: "Stock Status", value: product.stock > 0 ? "In Stock" : "Out of Stock" },
    { label: "Stock Quantity", value: product.stock.toString() }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-slate-50 rounded-[2.5rem] flex items-center justify-center border border-slate-100 shadow-inner relative overflow-hidden group">
            <Image 
              src={product.images} 
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {product.discountPrice && (
              <div className="absolute top-8 left-8 bg-red-600 text-white text-sm font-black px-4 py-1.5 rounded-full shadow-xl">
                SAVE { formatCurrency(Number(product.price) - Number(product.discountPrice)) }
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-4 bg-primary/10 w-fit px-3 py-1 rounded-full">
            {product.category.parent?.name ? `${product.category.parent.name} / ` : ""}{product.category.name}
          </span>
          <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-1 text-primary">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`h-4 w-4 ${s <= 4 ? "fill-primary" : "text-slate-200"}`} />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-400">124 REVIEWS</span>
            <div className="h-1 w-1 bg-slate-300 rounded-full"></div>
            <span className="text-xs font-bold text-slate-400">321 SOLD</span>
          </div>

          <div className="flex items-baseline gap-4 mb-8">
            {product.discountPrice ? (
              <>
                <div className="text-4xl font-black text-red-600 tracking-tighter">{formatCurrency(product.discountPrice)}</div>
                <div className="text-xl font-bold text-slate-300 line-through tracking-tighter">{formatCurrency(product.price)}</div>
              </>
            ) : (
              <div className="text-4xl font-black text-slate-900 tracking-tighter">{formatCurrency(product.price)}</div>
            )}
          </div>
          
          <p className="text-slate-500 mb-10 leading-relaxed max-w-xl text-lg">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-10 bg-slate-50 p-8 rounded-3xl border border-slate-100">
            {specs.map((spec) => (
              <div key={spec.label} className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{spec.label}</span>
                <span className="text-sm font-bold text-slate-900">{spec.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto">
            <ProductActions product={product} showText />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 pt-8 border-t">
            <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
              <Truck className="h-5 w-5 text-accent" /> Free Shipping
            </div>
            <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
              <RotateCcw className="h-5 w-5 text-accent" /> 30-Day Returns
            </div>
            <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
              <ShieldCheck className="h-5 w-5 text-accent" /> Secure Payment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
