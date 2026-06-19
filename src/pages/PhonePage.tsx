import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronDown, X } from 'lucide-react';
import { COUNTRIES, DEFAULT_COUNTRY } from '../data/countries';
import { Country } from '../types';

export default function PhonePage() {
  const navigate = useNavigate();
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [phone, setPhone] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const handleSend = () => {
    if (phone.length < 7) return;
    navigate('/otp', { state: { phone: country.dialCode + phone, country } });
  };

  return (
    <div className="flex flex-col min-h-screen px-6 pt-14 pb-10">
      <button onClick={() => navigate(-1)} className="mb-8 text-dim hover:text-white">
        <ChevronLeft size={28} />
      </button>

      <h2 className="text-3xl font-bold mb-2">Your number</h2>
      <p className="text-dim mb-8">We\'ll send a one-time code to verify you.</p>

      {/* Country selector */}
      <button
        onClick={() => setShowPicker(true)}
        className="flex items-center gap-3 w-full bg-card border border-border rounded-2xl px-4 py-4 mb-3"
      >
        <span className="text-2xl">{country.flag}</span>
        <span className="flex-1 text-left font-medium">{country.name}</span>
        <span className="text-dim">{country.dialCode}</span>
        <ChevronDown size={18} className="text-dim" />
      </button>

      {/* Phone input */}
      <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 mb-8">
        <span className="text-white font-medium py-4">{country.dialCode}</span>
        <input
          className="flex-1 bg-transparent text-white py-4 outline-none text-lg placeholder:text-muted"
          placeholder="Phone number"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
        />
      </div>

      <button
        onClick={handleSend}
        disabled={phone.length < 7}
        className="w-full py-4 rounded-2xl gradient-primary text-white font-bold text-lg disabled:opacity-40 active:scale-95 transition-transform"
      >
        Send Code
      </button>

      {/* Country picker modal */}
      <AnimatePresence>
        {showPicker && (
          <motion.div
            className="absolute inset-0 bg-black/60 z-50 flex items-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPicker(false)}
          >
            <motion.div
              className="w-full bg-card rounded-t-3xl p-6 pb-10 max-h-[70vh] overflow-y-auto"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold">Select Country</h3>
                <button onClick={() => setShowPicker(false)}><X size={22} className="text-dim" /></button>
              </div>
              {COUNTRIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => { setCountry(c); setShowPicker(false); }}
                  className="flex items-center gap-4 w-full py-3.5 border-b border-border last:border-0"
                >
                  <span className="text-2xl">{c.flag}</span>
                  <span className="flex-1 text-left">{c.name}</span>
                  <span className="text-dim text-sm">{c.dialCode}</span>
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
