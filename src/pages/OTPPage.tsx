import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const DEMO_CODE = '123456';

export default function OTPPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((s) => s.login);
  const phone: string = location.state?.phone ?? '';

  const [digits, setDigits] = useState<string[]>(Array(6).fill(''));
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => { inputs.current[0]?.focus(); }, []);

  const handleChange = (val: string, idx: number) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[idx] = val;
    setDigits(next);
    if (val && idx < 5) inputs.current[idx + 1]?.focus();
    if (next.join('').length === 6) verify(next.join(''));
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  const verify = (code: string) => {
    if (code === DEMO_CODE) {
      setLoading(true);
      setTimeout(() => {
        login(phone);
        navigate('/setup');
      }, 800);
    } else {
      setShake(true);
      setDigits(Array(6).fill(''));
      inputs.current[0]?.focus();
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className="flex flex-col min-h-screen px-6 pt-14 pb-10">
      <button onClick={() => navigate(-1)} className="mb-8 text-dim hover:text-white">
        <ChevronLeft size={28} />
      </button>

      <h2 className="text-3xl font-bold mb-2">Verify your number</h2>
      <p className="text-dim mb-1">Code sent to <span className="text-white">{phone}</span></p>
      <p className="text-primary text-sm mb-10">Demo: use <strong>123456</strong></p>

      <motion.div
        className="flex gap-3 justify-center mb-10"
        animate={shake ? { x: [-8, 8, -8, 8, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => { inputs.current[i] = el; }}
            type="tel"
            maxLength={1}
            value={d}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className="w-12 h-14 rounded-xl bg-card border-2 border-border text-center text-2xl font-bold outline-none focus:border-primary transition-colors"
          />
        ))}
      </motion.div>

      {loading && (
        <div className="flex justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      )}
    </div>
  );
}
