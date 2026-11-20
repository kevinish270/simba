"use client";
import { ShoppingCart, Heart, BarChart2, Check } from "lucide-react";
import { useCart, CartItem } from "@/store/CartContext";
import { useWishlist, WishlistItem } from "@/store/WishlistContext";
import { useCompare, CompareItem } from "@/store/CompareContext";
import { useState } from "react";

interface ProductActionsProps {
  product: {
    id: string;
    name: string;
    price: number | string | { toNumber(): number };
    discountPrice?: number | string | { toNumber(): number } | null;
    images: string;
    slug: string;
    brand?: string | null;
    description?: string | null;
    stock?: number | null;
    category?: {
      name: string;
    } | null;
  };
  showText?: boolean;
}

export default function ProductActions({ product, showText = false }: ProductActionsProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    const item: CartItem = {
      id: product.id,
      name: product.name,
      price: product.discountPrice ? Number(product.discountPrice) : Number(product.price),
      quantity: 1,
      image: product.images,
    };
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      const item: WishlistItem = {
        id: product.id,
        name: product.name,
        price: product.discountPrice ? Number(product.discountPrice) : Number(product.price),
        image: product.images,
        slug: product.slug,
      };
      addToWishlist(item);
    }
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInCompare(product.id)) {
      removeFromCompare(product.id);
    } else {
      const item: CompareItem = {
        id: product.id,
        name: product.name,
        price: product.discountPrice ? Number(product.discountPrice) : Number(product.price),
        image: product.images,
        category: product.category?.name || "Uncategorized",
        brand: product.brand || "Simba Choice",
        description: product.description || "",
        stock: product.stock || 0,
        slug: product.slug,
      };
      addToCompare(item);
    }
  };

  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);

  if (showText) {
     return (
        <div className="flex gap-4">
            <button
                onClick={handleAddToCart}
                className={`flex-1 bg-primary text-slate-900 font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 active:scale-[0.98] ${added ? "bg-green-500 text-white shadow-green-500/20" : ""}`}
            >
                {added ? <><Check className="h-6 w-6" /> ADDED</> : <><ShoppingCart className="h-6 w-6" /> ADD TO CART</>}
            </button>
            <button 
                onClick={handleToggleWishlist}
                className={`p-5 border-2 rounded-2xl transition-all active:scale-95 ${inWishlist ? "border-secondary bg-secondary/10" : "border-slate-100 hover:bg-slate-50"}`}
            >
                <Heart className={`h-6 w-6 ${inWishlist ? "fill-secondary text-secondary" : "text-slate-300"}`} />
            </button>
            <button 
                onClick={handleToggleCompare}
                className={`p-5 border-2 rounded-2xl transition-all active:scale-95 ${inCompare ? "border-primary bg-primary/10" : "border-slate-100 hover:bg-slate-50"}`}
            >
                <BarChart2 className={`h-6 w-6 ${inCompare ? "text-primary" : "text-slate-300"}`} />
            </button>
        </div>
     );
  }

  return (
    <div className="flex items-center gap-3">
      <button 
        onClick={handleToggleCompare}
        className={`p-3 rounded-xl border transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${inCompare ? "bg-primary border-primary text-slate-900" : "bg-white border-slate-100 text-slate-400 hover:text-primary"}`}
        aria-label="Add to compare"
      >
        <BarChart2 className="h-5 w-5" />
      </button>
      <button 
        onClick={handleToggleWishlist}
        className={`p-3 rounded-xl border transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${inWishlist ? "bg-secondary border-secondary text-white" : "bg-white border-slate-100 text-slate-400 hover:text-secondary"}`}
        aria-label="Add to wishlist"
      >
        <Heart className={`h-5 w-5 ${inWishlist ? "fill-white" : ""}`} />
      </button>
      <button
        onClick={handleAddToCart}
        className={`bg-primary text-slate-900 p-3 rounded-xl hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20 min-h-[44px] min-w-[44px] flex items-center justify-center ${added ? "bg-green-500 text-white" : ""}`}
        aria-label="Add to cart"
      >
        {added ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
      </button>
    </div>
  );
}
