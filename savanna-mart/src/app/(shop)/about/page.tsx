import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">The King of <span className="text-primary">Freshness</span></h1>
          <p className="text-xl text-slate-400 max-w-2xl font-medium leading-relaxed">
            Since our inception, Simba Supermarket has been at the forefront of Rwanda&apos;s retail revolution, bringing quality, variety, and affordability to every household.
          </p>
        </div>
        <div className="absolute right-[-10%] top-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-30"></div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-6">Our Story</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Founded with a vision to provide a superior shopping experience, Simba Supermarket started as a local family business in the heart of Kigali. Over the years, we have grown into one of Rwanda&apos;s most trusted retail chains, known for our commitment to quality and customer satisfaction.
            </p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              We take pride in sourcing the freshest produce from local farmers, supporting our community while ensuring that our customers always get the best. From daily essentials to premium imports, Simba is your one-stop shop for everything you need.
            </p>
          </div>
          <div className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200" 
              alt="Simba Supermarket Interior"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { title: "Quality First", desc: "We never compromise on the quality of our products, ensuring only the best reaches your table." },
            { title: "Community Focused", desc: "Supporting local farmers and businesses is at the heart of everything we do." },
            { title: "Customer Obsessed", desc: "Your satisfaction is our top priority. We're here to make your shopping easy and enjoyable." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl font-black text-primary">{i + 1}</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary rounded-[3rem] p-12 md:p-24 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight">Visit Us Today</h2>
          <p className="text-slate-900/70 text-lg mb-12 max-w-2xl mx-auto font-medium">
            Experience the finest shopping in Rwanda. With multiple branches across Kigali, we are always close to you.
          </p>
          <button className="bg-slate-900 text-white font-black px-12 py-5 rounded-2xl hover:scale-105 transition-transform shadow-2xl">
            FIND A STORE
          </button>
        </div>
      </div>
    </div>
  );
}
