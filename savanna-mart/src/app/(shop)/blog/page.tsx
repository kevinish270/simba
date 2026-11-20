 import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "5 Tips for Fresh Grocery Shopping in Kigali",
      excerpt: "Discover how to pick the freshest fruits and vegetables and the best times to shop at Simba.",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
      date: "June 10, 2026",
      author: "Simba Team"
    },
    {
      id: 2,
      title: "Supporting Local Farmers: Our Commitment",
      excerpt: "Learn about our partnership with local Rwandan farmers and how it brings quality to your table.",
      image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=800",
      date: "June 05, 2026",
      author: "Diane Uwase"
    },
    {
      id: 3,
      title: "Healthy Recipes for the Rwandan Family",
      excerpt: "Nutritious and delicious recipes using ingredients you can find right here at Simba Supermarket.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
      date: "May 28, 2026",
      author: "Chef Eric"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-slate-900 text-white py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">Simba <span className="text-primary">Blog</span></h1>
          <p className="text-xl text-slate-400 max-w-2xl font-medium">
            Stay updated with the latest news, healthy tips, and exclusive stories from Simba Supermarket.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col group">
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src={post.image} 
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                </div>
                <h2 className="text-xl font-black text-slate-900 mb-4 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-500 mb-8 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <Link 
                  href={`/blog/${post.id}`} 
                  className="mt-auto flex items-center gap-2 text-sm font-black text-primary hover:underline"
                >
                  READ MORE <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <p className="text-slate-400 font-medium mb-8">Want more stories delivered to your inbox?</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input type="email" placeholder="email@example.com" className="flex-1 bg-white border border-slate-200 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-primary transition-all" />
            <button className="bg-slate-900 text-white font-black px-8 py-4 rounded-2xl hover:bg-slate-800 transition-all">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
