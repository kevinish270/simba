import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/store/CartContext";
import ChatAssistant from "@/components/ai/ChatAssistant";

export const metadata: Metadata = {
  title: "Simba Supermarket | The King of Deals",
  description: "Shop the best products at Simba Supermarket - Your pride in every purchase.",
};

import NextAuthProvider from "@/components/providers/NextAuthProvider";

import { WishlistProvider } from "@/store/WishlistContext";
import { CompareProvider } from "@/store/CompareContext";
import { LanguageProvider } from "@/store/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <LanguageProvider>
            <WishlistProvider>
              <CompareProvider>
                <CartProvider>
                  <Header />
                  <main className="min-h-screen">
                    {children}
                  </main>
                  <Footer />
                  <ChatAssistant />
                </CartProvider>
              </CompareProvider>
            </WishlistProvider>
          </LanguageProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
