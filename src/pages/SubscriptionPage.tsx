import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check, Star, Zap } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { SubscriptionPlan } from '../types';

const PLANS = [
  {
    id: 'free' as SubscriptionPlan,
    name: 'Free',
    price: '$0',
    color: 'border-border',
    features: ['10 likes per day', 'Basic matching', 'View matches'],
  },
  {
    id: 'gold' as SubscriptionPlan,
    name: 'Gold',
    price: '$2.99',
    period: '/mo',
    color: 'border-gold',
    badge: 'Popular',
    features: ['Unlimited likes', 'See who liked you', '5 Super Likes/day', 'Undo last swipe', 'Priority matching'],
  },
  {
    id: 'platinum' as SubscriptionPlan,
    name: 'Platinum',
    price: '$6.99',
    period: '/mo',
    color: 'border-primary',
    features: ['Everything in Gold', 'Message before matching', 'Profile boost ×2', 'See full match list', 'AI icebreaker suggestions'],
  },
];

const PAYMENT_METHODS = [
  { id: 'mtn', name: 'MTN Mobile Money', flag: '🟡' },
  { id: 'orange', name: 'Orange Money', flag: '🟠' },
  { id: 'paystack', name: 'Card / Paystack', flag: '💳' },
];

export default function SubscriptionPage() {
  const navigate = useNavigate();
  const { user, upgradePlan } = useAuthStore();
  const current = user?.premium ?? 'free';

  const handleUpgrade = (plan: SubscriptionPlan) => {
    if (plan === 'free') return;
    upgradePlan(plan);
    navigate('/profile');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="text-dim">
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-xl font-bold">Choose a Plan</h1>
      </div>

      <div className="px-5 space-y-4 pb-8">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`bg-card rounded-2xl border-2 p-5 ${
              current === plan.id ? 'border-primary' : plan.color
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {plan.id === 'gold' && <Star size={18} className="text-gold fill-gold" />}
                {plan.id === 'platinum' && <Zap size={18} className="text-primary" />}
                <span className="font-bold text-lg">{plan.name}</span>
                {plan.badge && (
                  <span className="bg-gold/20 text-gold text-xs px-2 py-0.5 rounded-full">{plan.badge}</span>
                )}
              </div>
              <div className="text-right">
                <span className="text-2xl font-black">{plan.price}</span>
                {plan.period && <span className="text-dim text-sm">{plan.period}</span>}
              </div>
            </div>

            <ul className="space-y-1.5 mb-4">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                  <Check size={14} className="text-green-400 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            {plan.id !== 'free' && current !== plan.id && (
              <>
                <div className="flex gap-2 mb-3">
                  {PAYMENT_METHODS.map((pm) => (
                    <button
                      key={pm.id}
                      onClick={() => handleUpgrade(plan.id)}
                      className="flex-1 bg-bg border border-border rounded-xl py-2 text-xs text-center hover:border-primary/50 transition-colors"
                    >
                      <span className="block text-lg">{pm.flag}</span>
                      <span className="text-dim text-[10px]">{pm.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => handleUpgrade(plan.id)}
                  className="w-full py-3 rounded-xl gradient-primary text-white font-semibold text-sm"
                >
                  Upgrade to {plan.name}
                </button>
              </>
            )}

            {current === plan.id && (
              <div className="text-center text-primary text-sm font-semibold">Current Plan ✓</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
