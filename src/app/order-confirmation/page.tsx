import Link from "next/link";
import { CheckCircle, Package, Truck, Mail } from "lucide-react";

export default function OrderConfirmationPage() {
  const orderId = `AMS${Date.now().toString().slice(-8)}`;

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center space-y-8">
      <div className="flex justify-center">
        <CheckCircle className="w-20 h-20 text-green-500" />
      </div>

      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-gray-500">
          Thank you for your purchase. We&apos;ll send you a confirmation email shortly.
        </p>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 text-left space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Order ID</span>
          <span className="font-bold text-gray-900">#{orderId}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Estimated Delivery</span>
          <span className="font-bold text-gray-900">7–15 business days</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Status</span>
          <span className="font-bold text-green-600">Processing</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          {
            icon: <Mail className="w-6 h-6 text-rose-500" />,
            title: "Email Confirmation",
            sub: "Sent to your inbox",
          },
          {
            icon: <Package className="w-6 h-6 text-rose-500" />,
            title: "Order Processing",
            sub: "1–2 business days",
          },
          {
            icon: <Truck className="w-6 h-6 text-rose-500" />,
            title: "Shipping",
            sub: "7–15 business days",
          },
        ].map((step) => (
          <div
            key={step.title}
            className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center gap-2 text-center"
          >
            {step.icon}
            <p className="text-xs font-bold text-gray-900">{step.title}</p>
            <p className="text-xs text-gray-500">{step.sub}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-4 justify-center flex-wrap">
        <Link
          href="/products"
          className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          href="/"
          className="border-2 border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:border-gray-400 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
