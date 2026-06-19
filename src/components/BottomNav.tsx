import { NavLink } from 'react-router-dom';
import { Flame, MessageCircle, User } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';

export default function BottomNav() {
  const matches = useChatStore((s) => s.matches);
  const unread = matches.reduce((acc, m) => acc + m.unreadCount, 0);

  const tabs = [
    { to: '/discover', icon: Flame, label: 'Discover' },
    { to: '/matches',  icon: MessageCircle, label: 'Messages', badge: unread },
    { to: '/profile',  icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card border-t border-border safe-bottom z-50">
      <div className="flex">
        {tabs.map(({ to, icon: Icon, label, badge }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${
                isActive ? 'text-primary' : 'text-muted'
              }`
            }
          >
            <div className="relative">
              <Icon size={22} />
              {badge ? (
                <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {badge}
                </span>
              ) : null}
            </div>
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
