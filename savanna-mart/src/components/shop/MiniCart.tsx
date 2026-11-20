"use client";
import { useCart } from "@/store/CartContext";
import { Trash2, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

export default function MiniCart({ onClose }: { onClose?: () => void }) {
  const { cart, total, removeFromCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🛒</div>
        <p className="text-slate-500 font-bold text-sm">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="w-80 flex flex-col max-h-[500px]">
      <div className="flex items-center justify-between p-4 border-b border-slate-100">
        <span className="font-black text-xs uppercase tracking-widest text-slate-400">Items ({cart.length})</span>
        {onClose && (
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg transition-all">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {cart.map((item) => (
          <div key={item.id} className="flex gap-4 group">
            <div className="h-16 w-16 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0 relative">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-900 truncate mb-1">{item.name}</h4>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">{item.quantity} x {formatCurrency(item.price)}</span>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100 rounded-b-3xl">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Total</span>
          <span className="text-lg font-black text-slate-900">{formatCurrency(total)}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Link 
            href="/cart" 
            onClick={onClose}
            className="text-center py-3 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-700 hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
          >
            VIEW CART
          </Link>
          <Link 
            href="/checkout" 
            onClick={onClose}
            className="text-center py-3 bg-primary rounded-xl text-xs font-black text-slate-900 hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/10"
          >
            CHECKOUT
          </Link>
        </div>
      </div>
    </div>
  );
}
