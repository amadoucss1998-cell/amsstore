import { useNavigate } from 'react-router-dom';
import { Settings, Star, Shield, Camera } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export default function ProfilePage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const strength = [user?.name, user?.bio, user?.city, user?.interests?.length].filter(Boolean).length;

  return (
    <div className="flex flex-col" style={{ minHeight: 'calc(100svh - 80px)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <button onClick={() => navigate('/settings')} className="text-dim">
          <Settings size={22} />
        </button>
      </div>

      {/* Photo */}
      <div className="relative w-28 h-28 mx-auto mb-4">
        <div className="w-full h-full rounded-full bg-card border-2 border-border flex items-center justify-center text-5xl">
          {user?.photos?.[0] ? (
            <img src={user.photos[0]} alt="" className="w-full h-full rounded-full object-cover" />
          ) : (
            <span>{user?.name?.[0] ?? '👤'}</span>
          )}
        </div>
        <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <Camera size={14} className="text-white" />
        </button>
      </div>

      <h2 className="text-center text-xl font-bold">{user?.name || 'Your Name'}</h2>
      <p className="text-center text-dim text-sm mb-6">{user?.city || 'Add your city'}</p>

      {/* Profile strength */}
      <div className="mx-5 bg-card rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Profile Strength</span>
          <span className="text-primary text-sm font-bold">{strength * 25}%</span>
        </div>
        <div className="h-2 rounded-full bg-border overflow-hidden">
          <div className="h-full gradient-primary rounded-full transition-all" style={{ width: `${strength * 25}%` }} />
        </div>
        {strength < 4 && (
          <p className="text-dim text-xs mt-2">Add more details to get more matches!</p>
        )}
      </div>

      {/* Plan badge */}
      {user?.premium === 'free' ? (
        <button
          onClick={() => navigate('/subscription')}
          className="mx-5 bg-card border border-primary/30 rounded-2xl p-4 mb-4 flex items-center gap-3"
        >
          <Star size={20} className="text-gold" />
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold">Upgrade to Gold</p>
            <p className="text-dim text-xs">Unlock unlimited likes & more</p>
          </div>
          <span className="text-primary text-sm font-bold">$2.99</span>
        </button>
      ) : (
        <div className="mx-5 bg-gold/10 border border-gold/30 rounded-2xl p-4 mb-4 flex items-center gap-3">
          <Star size={20} className="text-gold fill-gold" />
          <p className="text-sm font-semibold capitalize">{user?.premium} Member</p>
        </div>
      )}

      {/* Bio + Interests */}
      <div className="mx-5 bg-card rounded-2xl p-4 mb-4">
        <h3 className="text-sm font-semibold mb-2">About Me</h3>
        <p className="text-dim text-sm">{user?.bio || 'No bio yet. Add one to attract more matches!'}</p>
      </div>

      {user?.interests && user.interests.length > 0 && (
        <div className="mx-5 bg-card rounded-2xl p-4 mb-4">
          <h3 className="text-sm font-semibold mb-2">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((i) => (
              <span key={i} className="bg-primary/20 text-primary text-xs px-3 py-1 rounded-full">{i}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
