import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, Search, Bookmark, TrendingUp, BookOpen } from 'lucide-react';

export default function Layout() {
  const navigate = useNavigate();
  const tabs = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/search', icon: Search, label: 'Search' },
    { to: '/bookmarks', icon: Bookmark, label: 'Saved' },
    { to: '/progress', icon: TrendingUp, label: 'Progress' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-navy/90 backdrop-blur border-b border-border px-4 sm:px-6 py-3 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
            <BookOpen size={16} className="text-white" />
          </div>
          <span className="font-black text-xl tracking-tight">LifeOS</span>
        </button>
        <nav className="hidden sm:flex items-center gap-1">
          {tabs.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-indigo-600 text-white' : 'text-dim hover:text-white hover:bg-card'
                }`
              }
            >
              <Icon size={15} />{label}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6">
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 bg-navy/95 backdrop-blur border-t border-border flex z-40">
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-0.5 py-3 text-[10px] font-medium transition-colors ${
                isActive ? 'text-indigo-400' : 'text-muted'
              }`
            }
          >
            <Icon size={20} />{label}
          </NavLink>
        ))}
      </nav>
      <div className="sm:hidden h-16" />
    </div>
  );
}
