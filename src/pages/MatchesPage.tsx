import { useNavigate } from 'react-router-dom';
import { useChatStore } from '../store/useChatStore';

export default function MatchesPage() {
  const navigate = useNavigate();
  const matches = useChatStore((s) => s.matches);

  return (
    <div className="flex flex-col" style={{ minHeight: 'calc(100svh - 80px)' }}>
      <div className="px-5 pt-12 pb-4">
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-dim text-sm">{matches.length} matches</p>
      </div>

      {matches.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-center px-8">
          <p className="text-5xl mb-4">💌</p>
          <h3 className="text-xl font-bold mb-2">No matches yet</h3>
          <p className="text-dim text-sm">Keep swiping to find your match!</p>
          <button onClick={() => navigate('/discover')} className="mt-6 px-6 py-3 rounded-2xl gradient-primary text-white font-semibold">
            Start Swiping
          </button>
        </div>
      ) : (
        <div className="flex flex-col">
          {matches.map((match) => (
            <button
              key={match.id}
              onClick={() => navigate(`/chat/${match.id}`)}
              className="flex items-center gap-4 px-5 py-4 border-b border-border active:bg-card/50 transition-colors text-left"
            >
              <div className="relative">
                <img
                  src={match.profile.photos[0]}
                  alt={match.profile.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                {match.unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full border-2 border-bg" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{match.profile.name}</span>
                  <span className="text-dim text-xs">{match.lastMessageAt}</span>
                </div>
                <p className={`text-sm truncate mt-0.5 ${
                  match.unreadCount ? 'text-white font-medium' : 'text-dim'
                }`}>
                  {match.lastMessage ?? 'Say hello!'}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
