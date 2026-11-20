"use client";
import { useCompare, CompareItem } from "@/store/CompareContext";
import { useCart, CartItem } from "@/store/CartContext";
import { Trash2, BarChart2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();

  const handleAddToCart = (product: CompareItem) => {
    const item: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    };
    addToCart(item);
  };

  if (compareList.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="bg-primary/10 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8">
          <BarChart2 className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">No products to compare</h1>
        <p className="text-slate-500 mb-10 text-lg max-w-md mx-auto">
          Add up to 4 products to your comparison list and see them side-by-side.
        </p>
        <Link href="/shop" className="bg-primary text-slate-900 font-black px-10 py-4 rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 inline-block active:scale-95">
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tight">Product Comparison</h1>
           <p className="text-slate-500 mt-2 font-medium">Comparing {compareList.length} products</p>
        </div>
        <button 
          onClick={clearCompare}
          className="text-xs font-black text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition-all border border-red-100"
        >
          CLEAR LIST
        </button>
      </div>

      <div className="overflow-x-auto pb-12">
        <div className="min-w-[800px]">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="w-1/5 p-6 bg-slate-50 border border-slate-100 rounded-tl-3xl text-left font-black text-slate-400 uppercase tracking-widest text-[10px]">Specifications</th>
                {compareList.map((product) => (
                  <th key={product.id} className="w-1/5 p-6 bg-white border border-slate-100 relative group">
                    <button 
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="h-48 rounded-2xl bg-slate-50 mb-4 overflow-hidden border border-slate-100 relative">
                      <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                  </th>
                ))}
                {/* Filler cells if less than 4 */}
                {[...Array(4 - compareList.length)].map((_, i) => (
                  <th key={`filler-${i}`} className="w-1/5 p-6 bg-slate-50/50 border border-slate-100 text-slate-300 text-xs font-medium italic">
                    Add product
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr>
                <td className="p-6 border border-slate-100 font-bold text-slate-500 text-sm">Price</td>
                {compareList.map(p => (
                  <td key={p.id} className="p-6 border border-slate-100 font-black text-slate-900">{formatCurrency(p.price)}</td>
                ))}
                {[...Array(4 - compareList.length)].map((_, i) => <td key={i} className="p-6 border border-slate-100"></td>)}
              </tr>
              <tr>
                <td className="p-6 border border-slate-100 font-bold text-slate-500 text-sm">Brand</td>
                {compareList.map(p => (
                  <td key={p.id} className="p-6 border border-slate-100 text-sm font-medium text-slate-700">{p.brand}</td>
                ))}
                {[...Array(4 - compareList.length)].map((_, i) => <td key={i} className="p-6 border border-slate-100"></td>)}
              </tr>
              <tr>
                <td className="p-6 border border-slate-100 font-bold text-slate-500 text-sm">Category</td>
                {compareList.map(p => (
                  <td key={p.id} className="p-6 border border-slate-100 text-sm font-medium text-slate-700">{p.category}</td>
                ))}
                {[...Array(4 - compareList.length)].map((_, i) => <td key={i} className="p-6 border border-slate-100"></td>)}
              </tr>
              <tr>
                <td className="p-6 border border-slate-100 font-bold text-slate-500 text-sm">Availability</td>
                {compareList.map(p => (
                  <td key={p.id} className="p-6 border border-slate-100">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${p.stock > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                        {p.stock > 0 ? `In Stock (${p.stock})` : "Out of Stock"}
                    </span>
                  </td>
                ))}
                {[...Array(4 - compareList.length)].map((_, i) => <td key={i} className="p-6 border border-slate-100"></td>)}
              </tr>
              <tr>
                <td className="p-6 border border-slate-100 font-bold text-slate-500 text-sm">Description</td>
                {compareList.map(p => (
                  <td key={p.id} className="p-6 border border-slate-100 text-xs text-slate-500 leading-relaxed max-w-[200px]">{p.description}</td>
                ))}
                {[...Array(4 - compareList.length)].map((_, i) => <td key={i} className="p-6 border border-slate-100"></td>)}
              </tr>
              <tr>
                <td className="p-6 border border-slate-100 bg-slate-50/50"></td>
                {compareList.map(p => (
                  <td key={p.id} className="p-6 border border-slate-100 text-center">
                    <button 
                        onClick={() => handleAddToCart(p)}
                        className="bg-primary text-slate-900 font-black px-6 py-3 rounded-xl text-xs hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
                    >
                      ADD TO CART
                    </button>
                  </td>
                ))}
                {[...Array(4 - compareList.length)].map((_, i) => <td key={i} className="p-6 border border-slate-100"></td>)}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
