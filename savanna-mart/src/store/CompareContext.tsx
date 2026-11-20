"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export interface CompareItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  description: string;
  stock: number;
  slug: string;
}

interface CompareContextType {
  compareList: CompareItem[];
  addToCompare: (item: CompareItem) => void;
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareList, setCompareList] = useState<CompareItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedCompare = localStorage.getItem("savanna-compare");
    if (savedCompare) {
      try {
        setCompareList(JSON.parse(savedCompare));
      } catch (e) {
        console.error("Failed to parse compare list from localStorage", e);
      }
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("savanna-compare", JSON.stringify(compareList));
    }
  }, [compareList, isMounted]);

  const addToCompare = (item: CompareItem) => {
    setCompareList((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      if (prev.length >= 4) {
        alert("You can only compare up to 4 products at a time.");
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFromCompare = (id: string) => {
    setCompareList((prev) => prev.filter((i) => i.id !== id));
  };

  const isInCompare = (id: string) => {
    return !!compareList.find((i) => i.id === id);
  };

  const clearCompare = () => setCompareList([]);

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, isInCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) throw new Error("useCompare must be used within a CompareProvider");
  return context;
}
