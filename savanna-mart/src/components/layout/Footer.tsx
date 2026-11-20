import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Simba Supermarket</h3>
          <p className="text-sm">
            Your premium destination for modern shopping. The king of deals, built for the world.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
            <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Customer Service</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/shipping" className="hover:text-primary">Shipping Policy</Link></li>
            <li><Link href="/returns" className="hover:text-primary">Returns & Refunds</Link></li>
            <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Newsletter</h4>
          <p className="text-sm mb-4">Subscribe for latest deals and updates.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="bg-slate-800 border-none rounded px-3 py-2 text-sm flex-1 outline-none"
            />
            <button className="bg-primary text-slate-900 px-4 py-2 rounded text-sm font-bold">
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
        &copy; {new Date().getFullYear()} Simba Supermarket. All rights reserved.
      </div>
    </footer>
  );
}
