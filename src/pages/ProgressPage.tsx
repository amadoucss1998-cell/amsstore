import { Link } from 'react-router-dom';
import { CheckCircle, Circle, TrendingUp } from 'lucide-react';
import { LESSONS, CATEGORIES } from '../data/lessons';
import { useStore } from '../store/useStore';

export default function ProgressPage() {
  const { completedLessons } = useStore();
  const total = LESSONS.length;
  const done = completedLessons.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-black">My Progress</h1>

      {/* Overall */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 font-bold">
            <TrendingUp size={20} className="text-indigo-400" />
            Overall
          </div>
          <span className="text-2xl font-black text-indigo-400">{pct}%</span>
        </div>
        <div className="h-3 bg-border rounded-full overflow-hidden mb-2">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-dim text-sm">{done} of {total} lessons completed</p>
      </div>

      {/* By category */}
      <div className="space-y-4">
        {CATEGORIES.map((cat) => {
          const catLessons = LESSONS.filter((l) => l.categoryId === cat.id);
          const catDone = catLessons.filter((l) => completedLessons.includes(l.id)).length;
          const catPct = catLessons.length > 0 ? Math.round((catDone / catLessons.length) * 100) : 0;

          return (
            <div key={cat.id} className="bg-card border border-border rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <Link to={`/category/${cat.id}`} className="flex items-center gap-2 font-semibold hover:text-indigo-300 transition-colors">
                  <span>{cat.icon}</span>{cat.name}
                </Link>
                <span className="text-dim text-sm">{catDone}/{catLessons.length}</span>
              </div>
              <div className="h-1.5 bg-border rounded-full overflow-hidden mb-3">
                <div className={`h-full bg-gradient-to-r ${cat.color} rounded-full transition-all`} style={{ width: `${catPct}%` }} />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {catLessons.map((l) => (
                  <Link key={l.id} to={`/lesson/${l.id}`} className="group relative">
                    {completedLessons.includes(l.id)
                      ? <CheckCircle size={18} className="text-emerald-400" />
                      : <Circle size={18} className="text-border group-hover:text-dim transition-colors" />
                    }
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-navy border border-border rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
                      {l.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {done === 0 && (
        <div className="text-center py-8">
          <p className="text-dim text-sm mb-4">You haven't completed any lessons yet.</p>
          <Link to="/" className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-indigo-500 transition-colors">
            Start Learning
          </Link>
        </div>
      )}
    </div>
  );
}
