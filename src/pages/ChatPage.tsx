import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Send, Sparkles } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';

const ICEBREAKERS = [
  'What do you love most about your city? 🏙️',
  'Best jollof rice you\'ve ever had? 🍚',
  'Afrobeats or Highlife? 🎵',
  'Dream West African road trip? 🚗',
];

export default function ChatPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { matches, messages, typing, sendMessage } = useChatStore();
  const match = matches.find((m) => m.id === id);
  const msgs = messages[id ?? ''] ?? [];
  const [text, setText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs.length, typing]);

  if (!match) { navigate('/matches'); return null; }

  const send = () => {
    if (!text.trim() || !id) return;
    sendMessage(id, text.trim());
    setText('');
  };

  return (
    <div className="flex flex-col" style={{ height: '100svh' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-12 pb-3 border-b border-border bg-bg">
        <button onClick={() => navigate('/matches')} className="text-dim">
          <ChevronLeft size={28} />
        </button>
        <img src={match.profile.photos[0]} alt="" className="w-10 h-10 rounded-full object-cover" />
        <div>
          <p className="font-semibold">{match.profile.name}</p>
          <p className="text-dim text-xs">{match.profile.lastActive}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {msgs.length === 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-3">
              <Sparkles size={14} className="text-primary" />
              <span className="text-dim text-xs">AI Icebreakers</span>
            </div>
            <div className="flex flex-col gap-2">
              {ICEBREAKERS.map((ice) => (
                <button
                  key={ice}
                  onClick={() => { sendMessage(id!, ice); }}
                  className="text-left text-sm bg-card border border-border rounded-2xl px-4 py-2.5 text-white/80 hover:border-primary/50 transition-colors"
                >
                  {ice}
                </button>
              ))}
            </div>
          </div>
        )}

        {msgs.map((msg) => {
          const isMine = msg.senderId === 'me';
          return (
            <div key={msg.id} className={`flex ${ isMine ? 'justify-end' : 'justify-start' }`}>
              <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                isMine
                  ? 'gradient-primary text-white rounded-br-sm'
                  : 'bg-card text-white rounded-bl-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          );
        })}

        {typing === id && (
          <div className="flex justify-start">
            <div className="bg-card rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full bg-dim animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-3 px-4 py-3 border-t border-border bg-bg safe-bottom">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder={`Message ${match.profile.name}...`}
          className="flex-1 bg-card border border-border rounded-2xl px-4 py-3 text-white text-sm outline-none focus:border-primary"
        />
        <button
          onClick={send}
          disabled={!text.trim()}
          className="w-11 h-11 rounded-full gradient-primary flex items-center justify-center disabled:opacity-40 active:scale-90 transition-transform"
        >
          <Send size={18} className="text-white" />
        </button>
      </div>
    </div>
  );
}
