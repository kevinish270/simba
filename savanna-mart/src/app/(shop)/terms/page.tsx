export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-slate-900 text-white py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">Terms of <span className="text-primary">Service</span></h1>
          <p className="text-xl text-slate-400 max-w-2xl font-medium leading-relaxed">
            Please read these terms carefully before using the Simba Supermarket website.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white p-12 md:p-16 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-black text-slate-900 mb-6">1. Acceptance of Terms</h2>
            <p className="text-slate-600 mb-8">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2 className="text-2xl font-black text-slate-900 mb-6">2. User Responsibilities</h2>
            <p className="text-slate-600 mb-8">
              Users are responsible for maintaining the confidentiality of their account information and password. You agree to provide accurate and complete information during the registration process.
            </p>

            <h2 className="text-2xl font-black text-slate-900 mb-6">3. Ordering & Payment</h2>
            <p className="text-slate-600 mb-8">
              All orders placed through our website are subject to availability and acceptance. Prices are listed in Rwandan Francs (RWF) and include applicable taxes unless stated otherwise. Payments must be made using our approved payment methods.
            </p>

            <h2 className="text-2xl font-black text-slate-900 mb-6">4. Delivery Terms</h2>
            <p className="text-slate-600 mb-8">
              We aim to deliver products within the estimated timeframes. However, delays may occur due to unforeseen circumstances. Risk of loss passes to you upon delivery to the specified address.
            </p>

            <h2 className="text-2xl font-black text-slate-900 mb-6">5. Limitation of Liability</h2>
            <p className="text-slate-600 mb-8">
              Simba Supermarket shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services.
            </p>

            <div className="mt-12 pt-8 border-t text-sm text-slate-400">
              Last Updated: June 12, 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
