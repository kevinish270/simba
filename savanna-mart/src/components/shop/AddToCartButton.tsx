"use client";
import { ShoppingCart } from "lucide-react";
import { useCart, CartItem } from "@/store/CartContext";
import { useState } from "react";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number | string | { toNumber(): number };
    discountPrice?: number | string | { toNumber(): number } | null;
    images: string;
  };
  showText?: boolean;
  className?: string;
} 

export default function AddToCartButton({ product, showText = false, className = "" }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
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

  return (
    <button
      onClick={handleAdd}
      className={`transition-all active:scale-95 ${added ? "bg-green-500 text-white" : ""} ${className}`}
    >
      {added ? (
        <span className="flex items-center gap-2">
           {showText ? "ADDED!" : "✓"}
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          {showText && "ADD TO CART"}
        </span>
      )}
    </button>
  );
}
