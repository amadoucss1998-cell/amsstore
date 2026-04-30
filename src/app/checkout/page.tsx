"use client";

import { useCartStore } from "@/store/cart";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Shield, Truck } from "lucide-react";

type Step = "info" | "shipping" | "payment";

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
  coupon: string;
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const [step, setStep] = useState<Step>("info");
  const [form, setForm] = useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    phone: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    coupon: "",
  });
  const [couponApplied, setCouponApplied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const discount = couponApplied ? totalPrice() * 0.15 : 0;
  const finalTotal = totalPrice() - discount;

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center space-y-4">
        <p className="text-2xl font-bold text-gray-900">Your cart is empty</p>
        <button
          onClick={() => router.push("/products")}
          className="bg-rose-500 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Shop Now
        </button>
      </div>
    );
  }

  function update(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function applyCoupon() {
    if (form.coupon.toUpperCase() === "WELCOME15") {
      setCouponApplied(true);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step === "info") {
      setStep("shipping");
      return;
    }
    if (step === "shipping") {
      setStep("payment");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    clearCart();
    router.push("/order-confirmation");
  }

  const steps: { id: Step; label: string }[] = [
    { id: "info", label: "Contact" },
    { id: "shipping", label: "Shipping" },
    { id: "payment", label: "Payment" },
  ];
  const stepIndex = steps.findIndex((s) => s.id === step);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-8">Checkout</h1>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                i <= stepIndex
                  ? "bg-rose-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`text-sm font-medium ${
                i <= stepIndex ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 w-8 ${
                  i < stepIndex ? "bg-rose-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          {step === "info" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-gray-900">
                Contact Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="First Name"
                  value={form.firstName}
                  onChange={(v) => update("firstName", v)}
                  required
                />
                <Field
                  label="Last Name"
                  value={form.lastName}
                  onChange={(v) => update("lastName", v)}
                  required
                />
              </div>
              <Field
                label="Email Address"
                type="email"
                value={form.email}
                onChange={(v) => update("email", v)}
                required
              />
              <Field
                label="Phone Number"
                type="tel"
                value={form.phone}
                onChange={(v) => update("phone", v)}
                required
              />
            </div>
          )}

          {step === "shipping" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-gray-900">
                Shipping Address
              </h2>
              <Field
                label="Street Address"
                value={form.address}
                onChange={(v) => update("address", v)}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="City"
                  value={form.city}
                  onChange={(v) => update("city", v)}
                  required
                />
                <Field
                  label="State / Province"
                  value={form.state}
                  onChange={(v) => update("state", v)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="ZIP / Postal Code"
                  value={form.zip}
                  onChange={(v) => update("zip", v)}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    value={form.country}
                    onChange={(e) => update("country", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-rose-400"
                    required
                  >
                    {[
                      "United States",
                      "Canada",
                      "United Kingdom",
                      "Australia",
                      "Germany",
                      "France",
                    ].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-blue-50 text-blue-700 rounded-xl p-3 text-sm">
                <Truck className="w-4 h-4 flex-shrink-0" />
                Free standard shipping (7-15 business days) on your order
              </div>
            </div>
          )}

          {step === "payment" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-gray-900">
                Payment Details
              </h2>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <Shield className="w-4 h-4 text-green-500" />
                Your payment info is encrypted and secure
              </div>
              <Field
                label="Name on Card"
                value={form.cardName}
                onChange={(v) => update("cardName", v)}
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={form.cardNumber}
                  onChange={(e) =>
                    update(
                      "cardNumber",
                      e.target.value
                        .replace(/\D/g, "")
                        .replace(/(.{4})/g, "$1 ")
                        .trim()
                        .slice(0, 19)
                    )
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-rose-400"
                  required
                  maxLength={19}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry (MM/YY)
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={form.expiry}
                    onChange={(e) =>
                      update(
                        "expiry",
                        e.target.value
                          .replace(/\D/g, "")
                          .replace(/^(\d{2})(\d)/, "$1/$2")
                          .slice(0, 5)
                      )
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-rose-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    value={form.cvv}
                    onChange={(e) =>
                      update("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-rose-400"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            {stepIndex > 0 && (
              <button
                type="button"
                onClick={() => setStep(steps[stepIndex - 1].id)}
                className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:border-gray-400 transition-colors"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-70"
            >
              {submitting
                ? "Processing..."
                : step === "payment"
                ? `Place Order — $${finalTotal.toFixed(2)}`
                : "Continue"}
            </button>
          </div>
        </form>

        {/* Order summary */}
        <aside className="space-y-4">
          <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
            <h2 className="text-base font-bold text-gray-900">Order Summary</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex gap-3"
                >
                  <div className="relative w-14 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.selectedSize} · {item.selectedColor}
                    </p>
                    <p className="text-sm font-bold text-gray-900 mt-0.5">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon */}
            <div className="pt-3 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code"
                  value={form.coupon}
                  onChange={(e) => update("coupon", e.target.value)}
                  className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-rose-400"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  className="bg-gray-900 text-white text-sm px-4 py-2 rounded-xl font-medium hover:bg-gray-700 transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponApplied && (
                <p className="text-sm text-green-600 font-medium mt-2">
                  WELCOME15 applied — 15% off!
                </p>
              )}
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-3 border-t text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${totalPrice().toFixed(2)}</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Discount (15%)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <div className="flex justify-between font-bold text-base text-gray-900 pt-2 border-t">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-rose-400"
      />
    </div>
  );
}
