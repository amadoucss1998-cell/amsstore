import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Star, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import PhotoUpload from '../components/PhotoUpload';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuthStore();
  const [editingPhotos, setEditingPhotos] = useState(false);
  const [photos, setPhotos] = useState<string[]>(user?.photos ?? []);

  const strength = [user?.name, user?.bio, user?.city, user?.interests?.length, photos.length].filter(Boolean).length;

  const savePhotos = () => {
    updateProfile({ photos });
    setEditingPhotos(false);
  };

  return (
    <div className="flex flex-col" style={{ minHeight: 'calc(100svh - 80px)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <button onClick={() => navigate('/settings')} className="text-dim">
          <Settings size={22} />
        </button>
      </div>

      {/* Photo grid or avatar */}
      {editingPhotos ? (
        <div className="mx-5 mb-4">
          <PhotoUpload photos={photos} onChange={setPhotos} />
          <div className="flex gap-3 mt-3">
            <button
              onClick={() => { setPhotos(user?.photos ?? []); setEditingPhotos(false); }}
              className="flex-1 py-2.5 rounded-xl border border-border text-dim text-sm"
            >
              Cancel
            </button>
            <button
              onClick={savePhotos}
              className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold"
            >
              Save Photos
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setEditingPhotos(true)}
          className="relative mx-auto mb-4 block"
        >
          {photos[0] ? (
            <div className="relative">
              <img
                src={photos[0]}
                alt=""
                className="w-28 h-28 rounded-full object-cover border-4 border-primary/60"
              />
              {photos.length > 1 && (
                <span className="absolute -bottom-1 -right-1 bg-card border border-border text-xs px-2 py-0.5 rounded-full text-dim">
                  +{photos.length - 1}
                </span>
              )}
              <span className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center border-2 border-bg">
                <Settings size={13} className="text-white" />
              </span>
            </div>
          ) : (
            <div className="w-28 h-28 rounded-full bg-card border-2 border-dashed border-border flex flex-col items-center justify-center gap-1">
              <span className="text-3xl">📷</span>
              <span className="text-dim text-[10px]">Add photo</span>
            </div>
          )}
        </button>
      )}

      <h2 className="text-center text-xl font-bold">{user?.name || 'Your Name'}</h2>
      <p className="text-center text-dim text-sm mb-6">{user?.city || 'Add your city'}</p>

      {/* Profile strength */}
      <div className="mx-5 bg-card rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Profile Strength</span>
          <span className="text-primary text-sm font-bold">{strength * 20}%</span>
        </div>
        <div className="h-2 rounded-full bg-border overflow-hidden">
          <div
            className="h-full gradient-primary rounded-full transition-all"
            style={{ width: `${strength * 20}%` }}
          />
        </div>
        {strength < 5 && (
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
          <ChevronRight size={16} className="text-dim" />
        </button>
      ) : (
        <div className="mx-5 bg-gold/10 border border-gold/30 rounded-2xl p-4 mb-4 flex items-center gap-3">
          <Star size={20} className="text-gold fill-gold" />
          <p className="text-sm font-semibold capitalize">{user?.premium} Member</p>
        </div>
      )}

      {/* Bio */}
      <div className="mx-5 bg-card rounded-2xl p-4 mb-4">
        <h3 className="text-sm font-semibold mb-2">About Me</h3>
        <p className="text-dim text-sm">{user?.bio || 'No bio yet. Add one to attract more matches!'}</p>
      </div>

      {/* Interests */}
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

      {/* Photo grid preview */}
      {photos.length > 1 && !editingPhotos && (
        <div className="mx-5 bg-card rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">My Photos</h3>
            <button onClick={() => setEditingPhotos(true)} className="text-primary text-xs">Edit</button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {photos.map((src, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden">
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
