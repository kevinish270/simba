import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Mock data for the sample posts
  const posts: Record<string, any> = {
    "1": {
      title: "5 Tips for Fresh Grocery Shopping in Kigali",
      content: "Shopping for groceries can be a delightful experience if you know what to look for. At Simba Supermarket, we ensure that our shelves are stocked with the freshest produce every morning. Here are five tips to help you get the best out of your next visit...",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200",
      date: "June 10, 2026",
      author: "Simba Team"
    },
    "2": {
      title: "Supporting Local Farmers: Our Commitment",
      content: "At Simba, we believe in the power of community. That's why we've partnered with over 200 local farmers across Rwanda to bring their harvest directly to our customers. This partnership not only ensures freshness but also supports the local economy...",
      image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=1200",
      date: "June 05, 2026",
      author: "Diane Uwase"
    },
    "3": {
      title: "Healthy Recipes for the Rwandan Family",
      content: "Eating healthy doesn't have to be complicated. With the right ingredients from Simba, you can prepare delicious meals that your whole family will love. Today, we're sharing a simple yet nutritious recipe for a modern Rwandan stew...",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200",
      date: "May 28, 2026",
      author: "Chef Eric"
    }
  };

  const post = posts[id];

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <Link href="/blog" className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:underline">
          <ArrowLeft className="h-4 w-4" /> BACK TO BLOG
        </Link>
        
        <article className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6 text-sm font-bold text-slate-400 uppercase tracking-widest">
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {post.date}</span>
            <span className="flex items-center gap-1"><User className="h-4 w-4" /> {post.author}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-10 leading-tight">
            {post.title}
          </h1>
          
          <div className="relative h-[300px] md:h-[500px] rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
            <Image src={post.image} alt={post.title} fill className="object-cover" />
          </div>
          
          <div className="prose prose-xl prose-slate max-w-none leading-relaxed text-slate-600">
            <p className="text-xl font-medium text-slate-900 mb-8">{post.content}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
