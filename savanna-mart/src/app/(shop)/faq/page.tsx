import { HelpCircle, ChevronRight } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    {
      category: "Orders",
      questions: [
        { q: "How do I place an order?", a: "You can place an order by browsing our shop, adding items to your cart, and proceeding to checkout. You'll need to create an account or log in to complete the purchase." },
        { q: "Can I modify my order after placing it?", a: "Once an order is placed, it's processed quickly. Please contact our support team within 30 minutes if you need to make changes." }
      ]
    },
    {
      category: "Delivery",
      questions: [
        { q: "How long does delivery take?", a: "We offer same-day delivery for orders placed before 2:00 PM. Standard delivery typically takes 24 hours within Kigali." },
        { q: "What are the delivery charges?", a: "Standard delivery is RWF 2,000. However, we offer FREE delivery for all orders over RWF 50,000!" }
      ]
    },
    {
      category: "Payments",
      questions: [
        { q: "What payment methods do you accept?", a: "We accept Mobile Money (MTN & Airtel), Credit/Debit Cards, and Cash on Delivery for select locations." },
        { q: "Is my payment information secure?", a: "Yes, we use industry-standard encryption and secure payment gateways (like Stripe) to protect your information." }
      ]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-primary py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">How can we <span className="bg-white px-4 rounded-2xl">help?</span></h1>
          <p className="text-xl text-slate-800/70 max-w-2xl mx-auto font-medium">
            Search our frequently asked questions to find the answers you need.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {faqs.map((group, i) => (
            <div key={i}>
              <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3 uppercase tracking-widest text-sm">
                <span className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xs">{i + 1}</span>
                {group.category}
              </h2>
              <div className="space-y-4">
                {group.questions.map((faq, j) => (
                  <div key={j} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-start gap-3">
                      <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-1" />
                      {faq.q}
                    </h3>
                    <p className="text-slate-500 leading-relaxed pl-8">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-slate-900 text-white p-12 rounded-[3rem] text-center">
            <h3 className="text-2xl font-black mb-4">Still have questions?</h3>
            <p className="text-slate-400 mb-8">If you couldn't find the answer you're looking for, please contact our support team.</p>
            <button className="bg-primary text-slate-900 font-black px-10 py-4 rounded-2xl hover:scale-105 transition-transform">
              CONTACT SUPPORT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
