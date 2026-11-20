import { DollarSign, ShoppingBag, Users, Package } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Revenue", value: "$12,450.00", icon: DollarSign, trend: "+12%", color: "bg-blue-500" },
    { label: "Total Orders", value: "456", icon: ShoppingBag, trend: "+5%", color: "bg-purple-500" },
    { label: "Total Customers", value: "1,200", icon: Users, trend: "+18%", color: "bg-green-500" },
    { label: "Active Products", value: "84", icon: Package, trend: "0%", color: "bg-orange-500" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">Dashboard</h1>
        <div className="flex gap-2">
           <button className="bg-white border px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors">Export Report</button>
           <button className="bg-primary text-slate-900 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors">Add Product</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-xl text-white shadow-lg shadow-${stat.color.split('-')[1]}-200`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>
                 {stat.trend}
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
            <p className="text-2xl font-extrabold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border shadow-sm">
           <h2 className="text-xl font-bold mb-6">Recent Orders</h2>
           <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-500 text-xs">#{1024 + i}</div>
                    <div>
                      <p className="text-sm font-bold">John Doe</p>
                      <p className="text-xs text-slate-500">2 items • $145.00</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">Processing</span>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border shadow-sm">
           <h2 className="text-xl font-bold mb-6">Top Products</h2>
           <div className="space-y-6">
              {[
                { name: "Solar Backpack", sales: 145, price: 129.99, img: "🎒" },
                { name: "Eco Water Bottle", sales: 89, price: 24.50, img: "🧪" },
                { name: "Bamboo Headphones", sales: 56, price: 89.00, img: "🎧" },
              ].map((p) => (
                <div key={p.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl border">{p.img}</div>
                    <div>
                       <p className="text-sm font-bold">{p.name}</p>
                       <p className="text-xs text-slate-500">${p.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                     <p className="text-sm font-bold">{p.sales}</p>
                     <p className="text-xs text-slate-500">Sales</p>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
