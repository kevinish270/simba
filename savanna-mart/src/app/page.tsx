import Hero from "@/components/shop/Hero";
import Categories from "@/components/shop/Categories";
import ProductSection from "@/components/shop/ProductSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-16">
        <Categories />
        
        <ProductSection 
          title="Featured Products" 
          filter={{ featured: true }} 
          take={4} 
        />

        <ProductSection 
          title="New Arrivals" 
          orderBy={{ createdAt: "desc" }} 
          take={4} 
        />

        <ProductSection 
          title="Best Sellers" 
          orderBy={{ stock: "asc" }} // Mocking best sellers with low stock
          take={4} 
        />

        <ProductSection 
          title="Fresh From The Farm" 
          filter={{ category: { parent: { slug: "fruits-vegetables" } } }}
          take={4}
          link="/categories/fruits-vegetables"
        />  

        <ProductSection 
          title="Grocery Essentials" 
          filter={{ category: { parent: { slug: "food-products" } } }}
          take={8}
          link="/categories/food-products"
        />
      </div>
    </div>
  );
}
