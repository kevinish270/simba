"use client";
import Link from "next/link";
import { ShoppingCart, Heart, Menu, Sun, Moon, BarChart2, X } from "lucide-react";
import { useCart } from "@/store/CartContext";
import { useWishlist } from "@/store/WishlistContext";
import { useCompare } from "@/store/CompareContext";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import SearchBar from "@/components/shop/SearchBar";
import BranchSelector from "@/components/shop/BranchSelector";
import MiniCart from "@/components/shop/MiniCart";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useTranslation } from "@/store/LanguageContext";

export default function Header() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { compareList } = useCompare();
  const { data: session } = useSession();
  const { t } = useTranslation();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;
  const compareCount = compareList.length;
  const [isDark, setIsDark] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const navLinks = [
    { href: "/shop", label: t('common.shop') || 'Shop' },
    { href: "/categories", label: t('common.categories') },
    { href: "/deals", label: t('common.deals'), className: "text-red-500" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-20 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative h-10 w-10 md:h-12 md:w-12 transition-transform group-hover:scale-110">
              <Image
                src="/logo.png"
                alt="Simba Supermarket Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl md:text-2xl font-black text-primary hidden sm:block tracking-tighter">
              Simba<span className="text-secondary">Supermarket</span>
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`hover:text-primary transition-colors ${link.className || ""}`}>
                {link.label}
              </Link>
            ))}
            <BranchSelector />
          </nav>
        </div>

        <div className="flex-1 max-w-sm mx-8 hidden xl:block">
          <SearchBar />
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          
          <button 
            onClick={() => setIsDark(!isDark)} 
            className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          <Link href="/compare" aria-label="Compare products">
            <div className="relative p-2.5 hover:bg-slate-100 rounded-2xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
              <BarChart2 className="h-6 w-6 text-slate-700" />
              {compareCount > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-slate-900 text-[10px] font-black px-1.5 py-0.5 rounded-full ring-2 ring-white">
                  {compareCount}
                </span>
              )}
            </div>
          </Link>

          <Link href="/wishlist" aria-label="Wishlist">
            <div className="relative p-2.5 hover:bg-slate-100 rounded-2xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
              <Heart className="h-6 w-6 text-slate-700 hover:text-secondary transition-colors" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-secondary text-white text-[10px] font-black px-1.5 py-0.5 rounded-full ring-2 ring-white">
                  {wishlistCount}
                </span>
              )}
            </div>
          </Link>

          <div 
            className="relative"
            onMouseEnter={() => setIsCartOpen(true)}
            onMouseLeave={() => setIsCartOpen(false)}
          >
            <Link href="/cart" aria-label="Shopping cart">
              <div className="relative p-2.5 hover:bg-slate-100 rounded-2xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-slate-700 hover:text-primary transition-colors" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 bg-primary text-slate-900 text-[10px] font-black px-1.5 py-0.5 rounded-full ring-2 ring-white">
                    {itemCount}
                  </span>
                )}
              </div>
            </Link>

            {isCartOpen && (
              <div className="absolute top-full right-0 mt-0 pt-2 z-[70] animate-in fade-in slide-in-from-top-2 hidden lg:block">
                <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden ring-1 ring-slate-900/5">
                  <MiniCart onClose={() => setIsCartOpen(false)} />
                </div>
              </div>
            )}
          </div>
          
          {session ? (
            <div className="flex items-center gap-2 md:gap-4 pl-2 md:pl-4 border-l">
              <div className="flex flex-col text-right hidden lg:flex">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('auth.welcomeBack').split('!')[0]}</span>
                <span className="text-sm font-bold truncate max-w-[100px]">{session.user?.name || "Member"}</span>
              </div>
              <button 
                onClick={() => signOut()} 
                className="text-[10px] bg-slate-900 text-white hover:bg-slate-800 px-3 md:px-4 py-2 rounded-xl font-black transition-all min-h-[44px]"
              >
                {t('common.logout').toUpperCase()}
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="bg-primary text-slate-900 px-4 md:px-6 py-2.5 rounded-2xl font-black text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hidden md:block min-h-[44px] flex items-center justify-center"
            >
              {t('common.login').toUpperCase()}
            </Link>
          )}

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2.5 hover:bg-slate-100 rounded-2xl min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 space-y-6">
              <div className="block xl:hidden">
                <SearchBar />
              </div>
              
              <nav className="flex flex-col gap-4 text-lg font-bold">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className={`hover:text-primary transition-colors py-2 ${link.className || ""}`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="py-2">
                   <BranchSelector />
                </div>
              </nav>

              <div className="pt-6 border-t flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-500">Language</span>
                  <LanguageSwitcher />
                </div>
                {!session && (
                  <Link 
                    href="/login" 
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-primary text-slate-900 w-full py-4 rounded-2xl font-black text-center shadow-lg shadow-primary/20"
                  >
                    {t('common.login').toUpperCase()}
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
