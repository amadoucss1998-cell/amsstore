import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { RotateCcw, X, Star, Heart, Zap } from 'lucide-react';
import { useDiscoveryStore } from '../store/useDiscoveryStore';
import SwipeCard from '../components/SwipeCard';

export default function DiscoverPage() {
  const navigate = useNavigate();
  const { profiles, lastMatch, swipe, undoLast, clearMatch } = useDiscoveryStore();
  const [gone, setGone] = useState(false);

  const handleSwipe = (dir: 'left' | 'right' | 'up', profileId: string) => {
    const profile = profiles.find((p) => p.id === profileId)!;
    const type = dir === 'right' ? 'like' : dir === 'up' ? 'super' : 'pass';
    swipe(type, profile);
  };

  if (lastMatch) {
    setTimeout(() => {
      clearMatch();
      navigate(`/match/${lastMatch.id}`, { state: { profile: lastMatch } });
    }, 100);
  }

  const visible = profiles.slice(0, 3);

  return (
    <div className="flex flex-col" style={{ height: 'calc(100svh - 80px)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <h1 className="text-2xl font-black">🔥 SPARK</h1>
        <button onClick={() => navigate('/settings')} className="text-dim text-sm">Settings</button>
      </div>

      {/* Card stack */}
      <div className="relative flex-1 mx-4">
        <AnimatePresence>
          {visible.length > 0 ? (
            visible.map((profile, i) => (
              <SwipeCard
                key={profile.id}
                profile={profile}
                onSwipe={(dir) => handleSwipe(dir, profile.id)}
                isTop={i === 0}
                stackIndex={i}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
              <p className="text-4xl mb-4">👏</p>
              <h3 className="text-xl font-bold mb-2">You've seen everyone!</h3>
              <p className="text-dim text-sm">Check back soon — new profiles join every day.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-4 px-5 pb-6 pt-3">
        <ActionBtn onClick={undoLast} icon={<RotateCcw size={20} className="text-gold" />} small />
        <ActionBtn onClick={() => visible[0] && handleSwipe('left', visible[0].id)} icon={<X size={28} className="text-red-400" />} />
        <ActionBtn onClick={() => visible[0] && handleSwipe('up', visible[0].id)} icon={<Star size={22} className="text-cyan-400" />} small />
        <ActionBtn onClick={() => visible[0] && handleSwipe('right', visible[0].id)} icon={<Heart size={28} className="text-green-400" />} />
        <ActionBtn onClick={() => navigate('/subscription')} icon={<Zap size={20} className="text-primary" />} small />
      </div>
    </div>
  );
}

function ActionBtn({ onClick, icon, small }: { onClick: () => void; icon: React.ReactNode; small?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full bg-card border border-border flex items-center justify-center shadow-lg active:scale-90 transition-transform ${
        small ? 'w-12 h-12' : 'w-16 h-16'
      }`}
    >
      {icon}
    </button>
  );
}
