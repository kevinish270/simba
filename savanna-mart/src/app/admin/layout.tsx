import Link from "next/link";
import { LayoutDashboard, Package, Users, ShoppingBag, BarChart3, Settings } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Products", icon: Package, href: "/admin/products" },
    { name: "Orders", icon: ShoppingBag, href: "/admin/orders" },
    { name: "Customers", icon: Users, href: "/admin/customers" },
    { name: "Analytics", icon: BarChart3, href: "/admin/analytics" },
    { name: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed inset-y-0">
        <div className="p-6">
           <Link href="/" className="text-xl font-bold text-white">
              Simba<span className="text-primary">Admin</span>
           </Link>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
           <div className="flex items-center gap-3 px-4 py-2">
              <div className="h-8 w-8 bg-primary rounded-full" />
              <div className="text-xs">
                 <p className="font-bold text-white">Admin User</p>
                 <p className="opacity-50">admin@simbaonlineshopping.com</p>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
