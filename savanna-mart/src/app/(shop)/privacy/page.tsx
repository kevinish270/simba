export default function PrivacyPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-slate-900 text-white py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">Privacy <span className="text-primary">Policy</span></h1>
          <p className="text-xl text-slate-400 max-w-2xl font-medium leading-relaxed">
            Your privacy is important to us. Learn how we collect, use, and protect your data.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white p-12 md:p-16 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-black text-slate-900 mb-6">1. Information Collection</h2>
            <p className="text-slate-600 mb-8">
              We collect information you provide directly to us when you create an account, place an order, or contact our customer support. This includes your name, email, phone number, and delivery address.
            </p>

            <h2 className="text-2xl font-black text-slate-900 mb-6">2. Use of Information</h2>
            <p className="text-slate-600 mb-8">
              We use the collected data to process your orders, improve our services, and communicate with you about promotions and updates. We do not sell your personal information to third parties.
            </p>

            <h2 className="text-2xl font-black text-slate-900 mb-6">3. Cookie Usage</h2>
            <p className="text-slate-600 mb-8">
              Our website uses cookies to enhance your browsing experience, remember your preferences, and analyze site traffic. You can manage your cookie settings through your browser.
            </p>

            <h2 className="text-2xl font-black text-slate-900 mb-6">4. Data Security</h2>
            <p className="text-slate-600 mb-8">
              We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or alteration.
            </p>

            <h2 className="text-2xl font-black text-slate-900 mb-6">5. Your Rights</h2>
            <p className="text-slate-600 mb-8">
              You have the right to access, correct, or delete your personal data stored on our platform. Contact us if you wish to exercise these rights.
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
