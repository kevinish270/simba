"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/store/CartContext";
import { MapPin, ChevronDown, Check } from "lucide-react";

interface Branch {
  id: string;
  name: string;
}

export default function BranchSelector() {
  const { selectedBranch, setBranch } = useCart();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("/api/branches")
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed to load branches (${res.status})`);
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) setBranches(data);
      })
      .catch(err => console.error("Error fetching branches:", err));
  }, []);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-3 rounded-full text-sm font-bold transition-all min-h-[44px]"
      >
        <MapPin className="h-4 w-4 text-primary" />
        <span className="max-w-[150px] truncate">
          {selectedBranch || "Select Store"}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-[60] animate-in fade-in slide-in-from-top-2">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 py-2">Nearby Branches</div>
          {branches.map((branch) => (
            <button
              key={branch.id}
              onClick={() => {
                setBranch(branch.name);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-3 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${selectedBranch === branch.name ? "bg-primary/10 text-primary" : "hover:bg-slate-50 text-slate-700"}`}
            >
              {branch.name}
              {selectedBranch === branch.name && <Check className="h-4 w-4" />}
            </button>
          ))}
          {branches.length === 0 && (
             <div className="px-3 py-4 text-center text-xs text-slate-400">Loading branches...</div>
          )}
        </div>
      )}
    </div>
  );
}
