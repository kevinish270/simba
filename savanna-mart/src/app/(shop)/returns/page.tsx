import { RotateCcw, ShieldCheck, HelpCircle } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-slate-900 text-white py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">Returns & <span className="text-primary">Refunds</span></h1>
          <p className="text-xl text-slate-400 max-w-2xl font-medium leading-relaxed">
            Your satisfaction is our pride. If something isn't right, we're here to make it better.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-12 md:p-16 rounded-[3rem] border border-slate-100 shadow-sm mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-4">
              <RotateCcw className="h-8 w-8 text-primary" /> Return Conditions
            </h2>
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <p>
                We accept returns for most items within <strong>24 hours</strong> of delivery for perishable goods and <strong>7 days</strong> for non-perishable household items.
              </p>
              <ul className="list-disc pl-6 space-y-4">
                <li>Items must be in their original packaging with tags and seals intact.</li>
                <li>Perishable items (meat, vegetables, dairy) must be checked at the time of delivery. Returns for these items are only accepted if the quality is compromised at the time of arrival.</li>
                <li>Proof of purchase (digital or physical receipt) is required for all returns.</li>
                <li>Personal care and hygiene products cannot be returned once the seal is broken.</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 mb-4">Refund Process</h3>
              <p className="text-slate-500 leading-relaxed text-sm mb-4">
                Once your return is approved, we will initiate a refund. Refunds are typically processed through the original payment method.
              </p>
              <ul className="text-sm text-slate-500 space-y-2">
                <li>• Mobile Money: 1-2 business days</li>
                <li>• Card Payments: 5-7 business days</li>
                <li>• Store Credit: Immediate</li>
              </ul>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 mb-4">Exchanges</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                If you received the wrong item or a damaged product, we will replace it free of charge. Contact us immediately to schedule a priority exchange delivery.
              </p>
            </div>
          </div>

          <div className="bg-primary rounded-[3rem] p-12 text-center">
            <h3 className="text-2xl font-black text-slate-900 mb-4">Need help with a return?</h3>
            <p className="text-slate-900/70 mb-8 font-medium">Our customer support team is available from 8:00 AM to 8:00 PM to assist you.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <div className="bg-white/50 backdrop-blur px-8 py-4 rounded-2xl font-bold text-slate-900">
                Email: returns@simba.rw
              </div>
              <div className="bg-white/50 backdrop-blur px-8 py-4 rounded-2xl font-bold text-slate-900">
                Call: +250 788 123 456
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
