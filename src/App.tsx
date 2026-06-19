import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import Layout from './components/Layout';
import WelcomePage from './pages/WelcomePage';
import PhonePage from './pages/PhonePage';
import OTPPage from './pages/OTPPage';
import ProfileSetupPage from './pages/ProfileSetupPage';
import DiscoverPage from './pages/DiscoverPage';
import MatchCelebrationPage from './pages/MatchCelebrationPage';
import MatchesPage from './pages/MatchesPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import SubscriptionPage from './pages/SubscriptionPage';

function Guard({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  if (!isLoggedIn) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="shell">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/phone" element={<PhonePage />} />
          <Route path="/otp" element={<OTPPage />} />
          <Route path="/setup" element={<ProfileSetupPage />} />
          <Route path="/discover" element={<Guard><Layout><DiscoverPage /></Layout></Guard>} />
          <Route path="/match/:profileId" element={<Guard><MatchCelebrationPage /></Guard>} />
          <Route path="/matches" element={<Guard><Layout><MatchesPage /></Layout></Guard>} />
          <Route path="/chat/:id" element={<Guard><ChatPage /></Guard>} />
          <Route path="/profile" element={<Guard><Layout><ProfilePage /></Layout></Guard>} />
          <Route path="/settings" element={<Guard><SettingsPage /></Guard>} />
          <Route path="/subscription" element={<Guard><SubscriptionPage /></Guard>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
