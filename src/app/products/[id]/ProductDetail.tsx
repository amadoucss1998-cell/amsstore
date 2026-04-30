"use client";

import { Product } from "@/lib/products";
import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "@/store/cart";
import ProductCard from "@/components/ProductCard";
import { Star, Truck, RefreshCw, Shield, Check, ShoppingBag } from "lucide-react";

interface Props {
  product: Product;
  related: Product[];
}

export default function ProductDetail({ product, related }: Props) {
  const { addItem } = useCartStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addItem(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-16">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {product.discount > 0 && (
              <span className="absolute top-4 left-4 bg-rose-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                -{product.discount}%
              </span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-colors ${
                    selectedImage === i
                      ? "border-rose-500"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-5">
          <div>
            <p className="text-sm text-rose-500 font-semibold capitalize mb-1">
              {product.category} / {product.subcategory}
            </p>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-200 fill-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating} ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-rose-500">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-lg text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.discount > 0 && (
              <span className="text-sm bg-rose-100 text-rose-600 font-bold px-2 py-0.5 rounded-full">
                Save {product.discount}%
              </span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Color */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Color: <span className="font-normal">{selectedColor}</span>
            </p>
            <div className="flex gap-2 flex-wrap">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1.5 text-sm rounded-lg border-2 transition-colors ${
                    selectedColor === color
                      ? "border-rose-500 bg-rose-50 text-rose-600 font-semibold"
                      : "border-gray-200 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Size: <span className="font-normal">{selectedSize}</span>
            </p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[2.5rem] px-3 py-1.5 text-sm rounded-lg border-2 transition-colors ${
                    selectedSize === size
                      ? "border-rose-500 bg-rose-50 text-rose-600 font-semibold"
                      : "border-gray-200 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Quantity
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-xl hover:border-rose-400 font-bold"
              >
                −
              </button>
              <span className="text-lg font-semibold w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-xl hover:border-rose-400 font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all ${
              added
                ? "bg-green-500 text-white"
                : "bg-rose-500 hover:bg-rose-600 text-white"
            }`}
          >
            {added ? (
              <>
                <Check className="w-5 h-5" /> Added to Cart!
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5" /> Add to Cart
              </>
            )}
          </button>

          {/* Trust icons */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { icon: <Truck className="w-4 h-4" />, text: "Free Shipping" },
              { icon: <RefreshCw className="w-4 h-4" />, text: "30-Day Returns" },
              { icon: <Shield className="w-4 h-4" />, text: "Secure Payment" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex flex-col items-center gap-1 text-center p-3 bg-gray-50 rounded-xl"
              >
                <span className="text-rose-500">{item.icon}</span>
                <span className="text-xs text-gray-600 font-medium">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
