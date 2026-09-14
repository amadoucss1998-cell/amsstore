import { Link } from 'react-router-dom';
import { CATEGORIES, LESSONS } from '../data/lessons';
import { useStore } from '../store/useStore';
import LessonCard from '../components/LessonCard';
import { TrendingUp } from 'lucide-react';

export default function HomePage() {
  const { completedLessons } = useStore();
  const totalLessons = LESSONS.length;
  const pct = Math.round((completedLessons.length / totalLessons) * 100);

  const featured = LESSONS.filter((l) => l.difficulty === 'beginner').slice(0, 3);

  return (
    <div className="space-y-10">
      {/* Hero */}
      <div className="gradient-hero rounded-3xl p-6 sm:p-10 text-center">
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
          Life Skills for the Real World
        </h1>
        <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto mb-6">
          Everything they didn't teach you in school — finance, health, cooking, legal rights, relationships, career & more.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/search" className="bg-white text-indigo-700 font-bold px-5 py-2.5 rounded-xl hover:bg-white/90 transition-colors">
            Browse All Lessons
          </Link>
          <Link to="/progress" className="bg-white/20 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/30 transition-colors">
            My Progress
          </Link>
        </div>
      </div>

      {/* Progress bar */}
      {completedLessons.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <TrendingUp size={16} className="text-indigo-400" />
              Your Progress
            </div>
            <span className="text-indigo-400 font-bold">{completedLessons.length}/{totalLessons} lessons</span>
          </div>
          <div className="h-2 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      {/* Categories */}
      <section>
        <h2 className="text-xl font-bold mb-4">Topics</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="bg-card border border-border rounded-2xl p-4 hover:border-indigo-500/50 transition-all group text-center"
            >
              <div className={`text-3xl mb-2`}>{cat.icon}</div>
              <div className="font-bold text-sm group-hover:text-indigo-300 transition-colors">{cat.name}</div>
              <div className="text-muted text-xs mt-0.5">{cat.lessonCount} lessons</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section>
        <h2 className="text-xl font-bold mb-4">Start Here</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {featured.map((l) => <LessonCard key={l.id} lesson={l} />)}
        </div>
      </section>
    </div>
  );
}
