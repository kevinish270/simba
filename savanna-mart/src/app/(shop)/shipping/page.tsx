import { Truck, MapPin, ShieldCheck, Clock } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-slate-900 text-white py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">Shipping <span className="text-primary">Policy</span></h1>
          <p className="text-xl text-slate-400 max-w-2xl font-medium leading-relaxed">
            Everything you need to know about how we get your groceries from our store to your door.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4">Delivery Areas</h3>
              <p className="text-slate-500 leading-relaxed">
                Currently, we provide delivery services within the Greater Kigali Area. This includes Nyarugenge, Kicukiro, and Gasabo districts.
              </p>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4">Processing Times</h3>
              <p className="text-slate-500 leading-relaxed">
                Orders are processed immediately. Same-day delivery is available for all orders placed before 2:00 PM local time.
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none bg-white p-12 md:p-16 rounded-[3rem] border border-slate-100 shadow-sm">
            <h2 className="text-3xl font-black text-slate-900 mb-8">Shipping Fees</h2>
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 mb-8">
              <p className="text-slate-900 font-bold mb-0 flex items-center gap-2">
                <Truck className="h-5 w-5" /> Standard Delivery Fee: RWF 2,000
              </p>
              <p className="text-slate-700 text-sm mt-2">
                Enjoy <strong>FREE DELIVERY</strong> on all orders with a total value of RWF 50,000 or more!
              </p>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-4">Tracking Your Order</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Once your order is out for delivery, you will receive an SMS notification with the delivery person's contact details. You can also track your order status in real-time through the "My Orders" section of your Simba account.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mb-4">Delivery Safety</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Our delivery personnel follow strict hygiene protocols to ensure your groceries are handled safely. All items are transported in temperature-controlled bags to maintain freshness, especially for perishable items like meat and dairy.
            </p>

            <div className="bg-slate-50 rounded-2xl p-8 flex items-start gap-4">
              <ShieldCheck className="h-6 w-6 text-primary shrink-0 mt-1" />
              <p className="text-sm text-slate-500 mb-0">
                Please ensure someone is available at the delivery address to receive the order. Perishable items cannot be returned once delivered and accepted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
