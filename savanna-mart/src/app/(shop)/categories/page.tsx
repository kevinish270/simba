import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AllCategoriesPage() {
  const categories = await prisma.category.findMany({
    where: { parentId: null },
    include: { children: true },
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-12">All Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white p-8 rounded-3xl border shadow-sm hover:shadow-md transition-all">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center justify-between">
              {cat.name}
              <Link href={`/categories/${cat.slug}`} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-bold hover:bg-primary hover:text-white transition-all">
                View All
              </Link>
            </h2>
            <div className="space-y-3">
              {cat.children.map((child) => (
                <Link
                  key={child.id}
                  href={`/categories/${child.slug}`}
                  className="flex items-center justify-between group text-slate-600 hover:text-primary transition-colors py-2 border-b border-slate-50 last:border-0"
                >
                  <span className="text-sm font-medium">{child.name}</span>
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
