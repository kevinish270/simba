"use client";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/store/LanguageContext";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (query.length > 2) {
      // Mock suggestions
      const allSuggestions = [
        "Fresh Milk", "White Bread", "Basmati Rice", "Cooking Oil", 
        "Ariel Detergent", "Baby Formula", "Digestive Biscuits",
        "Red Bull", "Heineken", "Tomato Paste", "Toilet Paper",
        "Pampers Diapers", "Corn Flakes", "Natural Honey"
      ];
      setSuggestions(allSuggestions.filter(s => s.toLowerCase().includes(query.toLowerCase())));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) router.push(`/shop?q=${query}`);
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('common.search')}
            className="w-full bg-white pl-10 pr-4 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all min-h-[44px]"
          />
        </div>
      </form>
      
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border p-2 z-50 animate-in fade-in slide-in-from-top-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => {
                setQuery(s);
                router.push(`/shop?q=${s}`);
              }}
              className="w-full text-left px-4 py-3 hover:bg-slate-50 rounded-lg text-sm transition-colors min-h-[44px]"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
