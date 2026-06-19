import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Shield, Bell, LogOut, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuthStore();
  const [safetyMode, setSafetyMode] = useState(user?.safetyMode ?? false);
  const [notifs, setNotifs] = useState(true);

  const toggleSafety = (val: boolean) => {
    setSafetyMode(val);
    updateProfile({ safetyMode: val });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center gap-3 px-5 pt-12 pb-4 border-b border-border">
        <button onClick={() => navigate(-1)} className="text-dim">
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

      <div className="px-5 py-6 space-y-3">
        {/* Women's Safety Mode */}
        <div className="bg-card rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-1">
            <Shield size={20} className="text-pink-400" />
            <div className="flex-1">
              <p className="font-semibold text-sm">Women's Safety Mode</p>
              <p className="text-dim text-xs mt-0.5">Only women verified with ID can message you</p>
            </div>
            <Toggle value={safetyMode} onChange={toggleSafety} />
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <Bell size={20} className="text-primary" />
            <div className="flex-1">
              <p className="font-semibold text-sm">Push Notifications</p>
              <p className="text-dim text-xs mt-0.5">New matches and messages</p>
            </div>
            <Toggle value={notifs} onChange={setNotifs} />
          </div>
        </div>

        {/* Subscription */}
        <button
          onClick={() => navigate('/subscription')}
          className="bg-card rounded-2xl p-4 w-full flex items-center gap-3"
        >
          <span className="text-gold">⭐</span>
          <p className="flex-1 text-left font-semibold text-sm">Subscription</p>
          <ChevronRight size={18} className="text-dim" />
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-card rounded-2xl p-4 w-full flex items-center gap-3 text-red-400"
        >
          <LogOut size={20} />
          <p className="font-semibold text-sm">Log Out</p>
        </button>
      </div>

      <p className="text-center text-dim text-xs mt-auto pb-8">SPARK v1.0 — Made for West Africa ❤️</p>
    </div>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`w-12 h-6 rounded-full transition-colors relative ${
        value ? 'bg-primary' : 'bg-border'
      }`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
          value ? 'translate-x-6' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}
