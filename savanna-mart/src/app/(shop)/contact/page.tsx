import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-slate-900 text-white py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">Get in <span className="text-primary">Touch</span></h1>
          <p className="text-xl text-slate-400 max-w-2xl font-medium">
            Have a question or feedback? We&apos;re here to help. Reach out to the Simba team anytime.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl">
            <h2 className="text-3xl font-black text-slate-900 mb-8">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">Full Name</label>
                  <input type="text" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-primary transition-all font-medium" placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">Email Address</label>
                  <input type="email" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-primary transition-all font-medium" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">Subject</label>
                <input type="text" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-primary transition-all font-medium" placeholder="How can we help?" />
              </div>
              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">Message</label>
                <textarea rows={5} className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-primary transition-all font-medium resize-none" placeholder="Your message here..."></textarea>
              </div>
              <button className="w-full bg-primary text-slate-900 font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-95">
                <Send className="h-5 w-5" /> SEND MESSAGE
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-black text-slate-900 mb-2">Email Us</h3>
                <p className="text-slate-500 text-sm">support@simba.rw</p>
                <p className="text-slate-500 text-sm">info@simba.rw</p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Phone className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-black text-slate-900 mb-2">Call Us</h3>
                <p className="text-slate-500 text-sm">+250 788 000 000</p>
                <p className="text-slate-500 text-sm">+250 722 000 000</p>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                <MapPin className="h-6 w-6 text-primary" /> Head Office
              </h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                KN 2 Ave, Kigali, Rwanda<br />
                Simba Supermarket Building<br />
                Central Business District
              </p>
              <div className="space-y-4">
                <h4 className="font-bold flex items-center gap-2 text-primary">
                  <Clock className="h-5 w-5" /> Working Hours
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500">Mon - Sat</p>
                    <p className="font-bold">7:00 AM - 11:00 PM</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Sunday</p>
                    <p className="font-bold">8:00 AM - 10:00 PM</p>
                  </div>
                </div>
              </div>
              <div className="absolute right-[-10%] bottom-[-10%] w-[200px] h-[200px] bg-primary/10 rounded-full blur-[60px]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
