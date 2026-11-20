"use client";
import { useWishlist, WishlistItem } from "@/store/WishlistContext";
import { useCart, CartItem } from "@/store/CartContext";
import { Trash2, ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product: WishlistItem) => {
    const item: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    };
    addToCart(item);
  };

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="bg-secondary/10 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8">
          <Heart className="h-16 w-16 text-secondary" />
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Your Wishlist is Empty</h1>
        <p className="text-slate-500 mb-10 text-lg max-w-md mx-auto">
          Save items you&apos;re interested in and they&apos;ll show up here so you can easily find them later.
        </p>
        <Link href="/shop" className="bg-primary text-slate-900 font-black px-10 py-4 rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 inline-block active:scale-95">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-black text-slate-900 mb-12 tracking-tight">Your Wishlist</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {wishlist.map((item) => (
          <div key={item.id} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
            <Link href={`/product/${item.slug}`} className="relative">
              <div className="h-64 bg-slate-50 flex items-center justify-center relative overflow-hidden group-hover:bg-slate-100 transition-colors">
                <Image 
                  src={item.image} 
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    removeFromWishlist(item.id);
                  }}
                  className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur rounded-2xl shadow-sm text-secondary hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </Link>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-bold text-lg text-slate-900 mb-4 group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
                <Link href={`/product/${item.slug}`}>{item.name}</Link>
              </h3>
              
              <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                <span className="text-xl font-black text-slate-900 tracking-tighter">{formatCurrency(item.price)}</span>
                <button 
                  onClick={() => handleAddToCart(item)}
                  className="bg-primary text-slate-900 p-3 rounded-xl hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
                >
                  <ShoppingCart className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
