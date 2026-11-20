import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function Categories() {
  const categories = await prisma.category.findMany({
    where: { parentId: null },
    take: 12,
  });

  const categoryImages: Record<string, string> = {
    "food-products": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
    "cleaning-sanitary": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
    "fruits-vegetables": "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=800",
    "cosmetics-personal-care": "https://images.unsplash.com/photo-1596462502278-27bfac4023c6?auto=format&fit=crop&q=80&w=800",
    "non-alcoholic-drinks": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800",
    "alcoholic-drinks": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800",
    "kitchenware": "https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?auto=format&fit=crop&q=80&w=800",
    "electronics-appliances": "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&q=80&w=800",
    "baby-products": "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&q=80&w=800",
    "toys": "https://images.unsplash.com/photo-1532330393533-443990a51d10?auto=format&fit=crop&q=80&w=800",
    "pet-care": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800",
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Top Categories</h2>
        <Link href="/categories" className="text-primary font-semibold text-sm hover:underline">View All</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <Link
            href={`/categories/${cat.slug}`}
            key={cat.slug}
            className="bg-white rounded-2xl overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition-all border border-slate-100 hover:border-primary group"
          >
            <div className="w-full h-32 overflow-hidden relative">
                <Image 
                    src={categoryImages[cat.slug] || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800"} 
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>
            <span className="font-bold text-slate-800 text-center text-xs py-4 px-2">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
