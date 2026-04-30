import Link from "next/link";
import Image from "next/image";
import {
  products,
  getTrendingProducts,
  getNewArrivals,
  categories,
} from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Truck, RefreshCw, Shield, Tag } from "lucide-react";

export default function HomePage() {
  const trending = getTrendingProducts().slice(0, 4);
  const newArrivals = getNewArrivals().slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-rose-50 to-pink-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 z-10 relative">
            <span className="inline-block bg-rose-100 text-rose-600 text-sm font-semibold px-3 py-1 rounded-full">
              🔥 Up to 50% OFF
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Fashion That
              <span className="text-rose-500"> Speaks</span>
              <br />
              For You
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              Discover thousands of trendy styles at prices that make you look
              twice. Free shipping on every order.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products?category=women"
                className="inline-flex items-center gap-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Women&apos;s Collection
              </Link>
            </div>
          </div>
          <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
              alt="Fashion hero"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: <Truck className="w-6 h-6 text-rose-500" />,
              title: "Free Shipping",
              sub: "On all orders",
            },
            {
              icon: <RefreshCw className="w-6 h-6 text-rose-500" />,
              title: "Easy Returns",
              sub: "30-day return policy",
            },
            {
              icon: <Shield className="w-6 h-6 text-rose-500" />,
              title: "Secure Payment",
              sub: "100% protected",
            },
            {
              icon: <Tag className="w-6 h-6 text-rose-500" />,
              title: "Best Prices",
              sub: "Price match guarantee",
            },
          ].map((badge) => (
            <div
              key={badge.title}
              className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4"
            >
              {badge.icon}
              <div>
                <p className="text-sm font-bold text-gray-900">{badge.title}</p>
                <p className="text-xs text-gray-500">{badge.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
          Shop by Category
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.id}`}
              className="group flex flex-col items-center gap-2 p-4 bg-gray-50 hover:bg-rose-50 rounded-2xl transition-colors border border-transparent hover:border-rose-200"
            >
              <span className="text-3xl">{cat.emoji}</span>
              <span className="text-xs font-semibold text-gray-700 group-hover:text-rose-600">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900">
            🔥 Trending Now
          </h2>
          <Link
            href="/products?trending=true"
            className="text-sm text-rose-500 font-semibold hover:underline flex items-center gap-1"
          >
            See all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {trending.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-gray-900 to-gray-700 text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-rose-400 font-semibold text-sm mb-2">
              Limited Time Offer
            </p>
            <h3 className="text-3xl md:text-4xl font-extrabold mb-3">
              Extra 15% OFF
              <br />
              Your First Order
            </h3>
            <p className="text-gray-400">
              Use code{" "}
              <span className="text-white font-bold bg-gray-700 px-2 py-1 rounded">
                WELCOME15
              </span>{" "}
              at checkout
            </p>
          </div>
          <Link
            href="/products"
            className="flex-shrink-0 bg-rose-500 hover:bg-rose-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors flex items-center gap-2"
          >
            Claim Discount <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900">
            ✨ New Arrivals
          </h2>
          <Link
            href="/products?new=true"
            className="text-sm text-rose-500 font-semibold hover:underline flex items-center gap-1"
          >
            See all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* All Products preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900">
            All Products
          </h2>
          <Link
            href="/products"
            className="text-sm text-rose-500 font-semibold hover:underline flex items-center gap-1"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
