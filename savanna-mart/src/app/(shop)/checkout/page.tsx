"use client";

import { useCart } from "@/store/CartContext";
import { CreditCard, Truck, ShieldCheck, ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { formatCurrency } from "@/lib/utils";

export default function CheckoutPage() {
  const { cart, total, selectedBranch } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBranch) {
       alert("Please select a Simba Supermarket branch in the header before proceeding.");
       return;
    }
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      alert(`Order placed successfully at ${selectedBranch}! Thank you for shopping at Simba Supermarket.`);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/cart" className="flex items-center gap-2 text-sm font-black text-slate-500 hover:text-primary mb-12 transition-colors">
        <ArrowLeft className="h-4 w-4" /> BACK TO CART
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {selectedBranch && (
            <section className="bg-primary/5 border-2 border-primary/20 p-8 rounded-[2.5rem] flex items-center gap-6">
              <div className="bg-primary text-slate-900 w-16 h-16 rounded-3xl flex items-center justify-center text-3xl shrink-0">
                <MapPin className="h-8 w-8" />
              </div>
              <div>
                <span className="text-xs font-black text-primary uppercase tracking-[0.2em] block mb-1">Delivering From</span>
                <h2 className="text-2xl font-black text-slate-900">{selectedBranch}</h2>
              </div>
            </section>
          )}

          {!selectedBranch && (
            <div className="bg-red-50 border-2 border-red-100 p-6 rounded-3xl flex items-center gap-4 text-red-600">
               <div className="bg-red-600 text-white p-2 rounded-full">⚠️</div>
               <p className="font-bold text-sm text-red-600/80">Please select a branch in the top menu before placing your order.</p>
            </div>
          )}

          <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
              <Truck className="h-7 w-7 text-primary" /> Delivery Information
            </h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="First Name" className="bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary font-medium" required />
              <input type="text" placeholder="Last Name" className="bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary font-medium" required />
              <input type="email" placeholder="Email Address" className="md:col-span-2 bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary font-medium" required />
              <input type="text" placeholder="Delivery Address" className="md:col-span-2 bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary font-medium" required />
              <input type="text" placeholder="City / District" className="bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary font-medium" required />
              <input type="text" placeholder="Phone Number" className="bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary font-medium" required />
            </form>
          </section>

          <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
              <CreditCard className="h-7 w-7 text-primary" /> Payment Method
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-primary bg-primary/5 p-6 rounded-3xl flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm text-2xl">💳</div>
                  <div>
                    <span className="font-black block text-sm">Credit / Debit Card</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Visa / Mastercard</span>
                  </div>
                </div>
              </div>
              <div className="border border-slate-100 p-6 rounded-3xl flex items-center gap-4 opacity-50 cursor-not-allowed grayscale">
                <div className="bg-slate-100 p-3 rounded-xl text-2xl">📱</div>
                <div>
                   <span className="font-black block text-sm">Mobile Money</span>
                   <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Momo / Airtel</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <h2 className="text-2xl font-black mb-8 relative z-10">Order Summary</h2>
            <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar relative z-10">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden relative">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                     </div>
                     <div>
                        <span className="text-sm font-bold block line-clamp-1">{item.name}</span>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Qty: {item.quantity}</span>
                     </div>
                  </div>
                  <span className="font-black text-sm whitespace-nowrap">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-8 space-y-4 mb-10 relative z-10">
               <div className="flex justify-between text-sm font-medium text-slate-400">
                  <span>Subtotal</span>
                  <span>{formatCurrency(total)}</span>
               </div>
               <div className="flex justify-between text-sm font-medium text-slate-400">
                  <span>Delivery Fee</span>
                  <span className="text-primary font-black uppercase text-xs">Free</span>
               </div>
               <div className="flex justify-between items-end pt-4 border-t border-white/5">
                  <span className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Total Pay</span>
                  <span className="text-4xl font-black text-primary tracking-tighter">{formatCurrency(total)}</span>
               </div>
            </div>
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing || !selectedBranch}
              className={`w-full bg-primary text-slate-900 font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-95 relative z-10 ${isProcessing || !selectedBranch ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isProcessing ? "PROCESSING..." : "CONFIRM ORDER"}
            </button>
            <div className="flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.3em] opacity-30 mt-8 relative z-10 font-black">
               <ShieldCheck className="h-3 w-3" /> Secure Transaction
            </div>
            <div className="absolute right-[-20%] top-[-10%] text-[300px] opacity-[0.02] select-none pointer-events-none font-black">LION</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
