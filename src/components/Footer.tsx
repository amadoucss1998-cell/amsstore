import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <span className="text-2xl font-extrabold text-white">
            AMS<span className="text-rose-500">store</span>
          </span>
          <p className="mt-3 text-sm text-gray-500 max-w-xs">
            Trendy fashion at unbeatable prices. New arrivals every week.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            Shop
          </h3>
          <ul className="space-y-2 text-sm">
            {["Women", "Men", "Kids", "Shoes", "Accessories", "Home"].map(
              (item) => (
                <li key={item}>
                  <Link
                    href={`/products?category=${item.toLowerCase()}`}
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            Help
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              "Shipping Info",
              "Returns & Exchanges",
              "Size Guide",
              "Track Order",
              "Contact Us",
            ].map((item) => (
              <li key={item}>
                <Link href="/faq" className="hover:text-white transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            About
          </h3>
          <ul className="space-y-2 text-sm">
            {["About Us", "Careers", "Press", "Privacy Policy", "Terms"].map(
              (item) => (
                <li key={item}>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} AMSstore. All rights reserved.</p>
          <p>Fast & Free Shipping · Easy Returns · Secure Checkout</p>
        </div>
      </div>
    </footer>
  );
}
