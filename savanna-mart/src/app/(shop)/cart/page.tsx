"use client";

import { Trash2, Plus, Minus, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/store/CartContext";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total, selectedBranch } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="bg-slate-50 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 text-6xl">🛒</div>
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Your cart is empty</h1>
        <p className="text-slate-500 mb-10 text-lg max-w-md mx-auto">Looks like you haven&apos;t added anything to your cart yet. Simba Supermarket has the best deals waiting for you!</p>
        <Link href="/shop" className="bg-primary text-slate-900 font-black px-10 py-4 rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 inline-block active:scale-95">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tight">Shopping Cart</h1>
           <p className="text-slate-500 mt-2 font-medium">You have {cart.length} items in your basket</p>
        </div>
        
        {selectedBranch && (
          <div className="flex items-center gap-3 bg-primary/10 border border-primary/20 px-5 py-3 rounded-2xl">
             <MapPin className="h-5 w-5 text-primary" />
             <div>
                <span className="text-[10px] font-black text-primary uppercase tracking-widest block">Selected Branch</span>
                <span className="text-sm font-bold text-slate-900">{selectedBranch}</span>
             </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="group flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="h-32 w-full sm:w-32 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 overflow-hidden shrink-0 relative">
                <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl text-slate-900 group-hover:text-primary transition-colors line-clamp-1">{item.name}</h3>
                    <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        title="Remove Item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Unit Price: {formatCurrency(item.price)}</p>
                </div>
                
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center bg-slate-50 p-1 rounded-xl border border-slate-100">
                    <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm text-slate-600 transition-all active:scale-90"
                    >
                        <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-black text-slate-900">{item.quantity}</span>
                    <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm text-slate-600 transition-all active:scale-90"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Subtotal</span>
                    <span className="text-2xl font-black text-slate-900 tracking-tighter">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <h2 className="text-2xl font-black mb-8 relative z-10">Order Summary</h2>
            
            <div className="space-y-4 mb-8 relative z-10">
              <div className="flex justify-between text-slate-400 font-medium">
                <span>Subtotal</span>
                <span className="text-white font-bold">{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between text-slate-400 font-medium">
                <span>Delivery</span>
                <span className="text-primary font-black uppercase tracking-widest text-xs">Free</span>
              </div>
              <div className="flex justify-between text-slate-400 font-medium pb-6 border-b border-white/10">
                <span>Est. VAT</span>
                <span className="text-white font-bold">RWF 0</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-10 relative z-10">
              <span className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Total Amount</span>
              <span className="text-4xl font-black text-primary tracking-tighter">{formatCurrency(total)}</span>
            </div>

            <Link href="/checkout" className="w-full bg-primary text-slate-900 font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-[0.98] relative z-10">
              PROCEED TO CHECKOUT <ArrowRight className="h-5 w-5" />
            </Link>
            
            <div className="absolute right-[-20%] bottom-[-10%] w-[300px] h-[300px] opacity-[0.05] select-none pointer-events-none grayscale brightness-200">
               <Image src="/logo.png" alt="Branding" fill className="object-contain" />
            </div>
          </div>
          
          <div className="bg-primary/10 border border-primary/20 p-8 rounded-[2rem] flex items-center gap-6">
            <div className="bg-primary text-slate-900 w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0">🎁</div>
            <div>
              <span className="font-black text-slate-900 block uppercase tracking-widest text-xs mb-1">Free Gift Wrapping!</span>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">Add a personalized message to your order at checkout.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
