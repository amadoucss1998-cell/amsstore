import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, Shield, Zap, Heart } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const features = [
  { icon: Heart, text: 'Real West African profiles' },
  { icon: Shield, text: "Women's Safety Mode built-in" },
  { icon: Zap, text: 'AI icebreakers to start convos' },
  { icon: Flame, text: 'Pay with MTN MoMo or Orange Money' },
];

export default function WelcomePage() {
  const navigate = useNavigate();
  const skipAuth = useAuthStore((s) => s.skipAuth);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-6 py-12 text-center">
      <div />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center">
            <Flame size={30} className="text-white" />
          </div>
          <h1 className="text-5xl font-black text-white">SPARK</h1>
        </div>
        <p className="text-dim text-base mb-10">Dating for Liberia & West Africa 🇱🇷</p>

        <div className="space-y-3 mb-10 text-left">
          {features.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-primary" />
              </div>
              <span className="text-white/80 text-sm">{text}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="w-full space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <button
          onClick={() => navigate('/phone')}
          className="w-full py-4 rounded-2xl gradient-primary text-white font-bold text-lg shadow-lg shadow-primary/30 active:scale-95 transition-transform"
        >
          Get Started
        </button>
        <button
          onClick={() => { skipAuth(); navigate('/discover'); }}
          className="w-full py-3 text-dim text-sm hover:text-white transition-colors"
        >
          Continue as Guest
        </button>
      </motion.div>
    </div>
  );
}
