import { useRef } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Star } from 'lucide-react';
import { Profile } from '../types';

interface Props {
  profile: Profile;
  onSwipe: (dir: 'left' | 'right' | 'up') => void;
  isTop: boolean;
  stackIndex: number;
}

export default function SwipeCard({ profile, onSwipe, isTop, stackIndex }: Props) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-22, 22]);
  const likeOpacity = useTransform(x, [30, 110], [0, 1]);
  const nopeOpacity = useTransform(x, [-110, -30], [1, 0]);
  const photoIndex = useRef(0);

  const handleDragEnd = (_: PointerEvent, info: PanInfo) => {
    if (info.offset.x > 110) onSwipe('right');
    else if (info.offset.x < -110) onSwipe('left');
    else if (info.offset.y < -100) onSwipe('up');
  };

  const scale = 1 - stackIndex * 0.04;
  const translateY = stackIndex * 12;

  return (
    <motion.div
      className="absolute inset-x-0 mx-auto rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        scale,
        y: translateY,
        zIndex: 10 - stackIndex,
        width: 'calc(100% - 32px)',
        height: '72vh',
        maxHeight: 560,
        touchAction: 'none',
      }}
      drag={isTop ? true : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      onDragEnd={isTop ? handleDragEnd : undefined}
      whileTap={{ scale: isTop ? 1.02 : scale }}
    >
      {/* Photo */}
      <img
        src={profile.photos[0]}
        alt={profile.name}
        className="w-full h-full object-cover"
        draggable={false}
      />

      {/* LIKE stamp */}
      {isTop && (
        <motion.div
          className="absolute top-10 left-6 border-4 border-green-400 rounded-xl px-3 py-1 rotate-[-15deg]"
          style={{ opacity: likeOpacity }}
        >
          <span className="text-green-400 font-black text-3xl tracking-widest">LIKE</span>
        </motion.div>
      )}

      {/* NOPE stamp */}
      {isTop && (
        <motion.div
          className="absolute top-10 right-6 border-4 border-red-400 rounded-xl px-3 py-1 rotate-[15deg]"
          style={{ opacity: nopeOpacity }}
        >
          <span className="text-red-400 font-black text-3xl tracking-widest">NOPE</span>
        </motion.div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 gradient-card pointer-events-none" />

      {/* Profile info */}
      <div className="absolute bottom-0 inset-x-0 p-5">
        <div className="flex items-end gap-2 mb-1">
          <h2 className="text-2xl font-bold">{profile.name}, {profile.age}</h2>
          {profile.verified !== 'none' && (
            <span className="text-cyan-400 text-sm mb-0.5">✓ Verified</span>
          )}
          {profile.premium !== 'free' && (
            <Star size={16} className="text-gold mb-0.5 fill-gold" />
          )}
        </div>
        <p className="text-dim text-sm mb-2">📍 {profile.city} • {profile.distance ?? '?'} km away</p>
        <p className="text-white/80 text-sm line-clamp-2">{profile.bio}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {profile.interests.slice(0, 3).map((i) => (
            <span key={i} className="bg-white/10 text-white/80 text-xs px-2.5 py-1 rounded-full">{i}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
