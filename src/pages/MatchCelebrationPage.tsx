import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { Profile } from '../types';
import { useAuthStore } from '../store/useAuthStore';
import { MOCK_MATCHES } from '../data/mockProfiles';

export default function MatchCelebrationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const profile: Profile | undefined = location.state?.profile;
  const user = useAuthStore((s) => s.user);

  if (!profile) { navigate('/discover'); return null; }

  const match = MOCK_MATCHES.find((m) => m.profile.id === profile.id);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center" style={{ background: 'linear-gradient(135deg, #0D0D1A 0%, #1C0D2E 100%)' }}>
      <button onClick={() => navigate('/discover')} className="absolute top-14 right-5 text-dim">
        <X size={26} />
      </button>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
      >
        <div className="text-6xl mb-6">❤️</div>
      </motion.div>

      <motion.h1
        className="text-4xl font-black mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        It's a Match!
      </motion.h1>
      <p className="text-dim mb-10">You and {profile.name} both liked each other.</p>

      <div className="flex gap-6 mb-10">
        {[user?.photos?.[0] ?? null, profile.photos[0]].map((photo, i) => (
          <motion.div
            key={i}
            className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary"
            initial={{ x: i === 0 ? -60 : 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring' }}
          >
            {photo ? (
              <img src={photo} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-card flex items-center justify-center text-4xl">
                {i === 0 ? '😊' : profile.name[0]}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="w-full space-y-3">
        <button
          onClick={() => navigate(match ? `/chat/${match.id}` : '/matches')}
          className="w-full py-4 rounded-2xl gradient-primary text-white font-bold text-lg flex items-center justify-center gap-2"
        >
          <MessageCircle size={20} />
          Send a Message
        </button>
        <button
          onClick={() => navigate('/discover')}
          className="w-full py-3 text-dim text-sm"
        >
          Keep Swiping
        </button>
      </div>
    </div>
  );
}
