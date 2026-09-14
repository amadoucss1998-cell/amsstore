import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, Bookmark } from 'lucide-react';
import { LESSONS, CATEGORIES } from '../data/lessons';
import { useStore } from '../store/useStore';

const DIFF_COLORS: Record<string, string> = {
  beginner: 'text-emerald-400 bg-emerald-400/10',
  intermediate: 'text-amber-400 bg-amber-400/10',
  advanced: 'text-rose-400 bg-rose-400/10',
};

export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const lesson = LESSONS.find((l) => l.id === id);
  const { completedLessons, bookmarkedLessons, markComplete, toggleBookmark } = useStore();

  if (!lesson) return <div className="text-dim">Lesson not found.</div>;

  const cat = CATEGORIES.find((c) => c.id === lesson.categoryId);
  const done = completedLessons.includes(lesson.id);
  const saved = bookmarkedLessons.includes(lesson.id);

  const related = LESSONS.filter((l) => l.categoryId === lesson.categoryId && l.id !== lesson.id).slice(0, 3);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Back */}
      <Link to={`/category/${lesson.categoryId}`} className="inline-flex items-center gap-1.5 text-dim hover:text-white text-sm transition-colors">
        <ArrowLeft size={16} /> {cat?.name}
      </Link>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${DIFF_COLORS[lesson.difficulty]}`}>
            {lesson.difficulty}
          </span>
          <span className="flex items-center gap-1 text-dim text-xs"><Clock size={12} /> {lesson.readingMinutes} min read</span>
          {cat && <span className="text-dim text-xs">{cat.icon} {cat.name}</span>}
        </div>
        <h1 className="text-3xl sm:text-4xl font-black leading-tight mb-3">{lesson.title}</h1>
        <p className="text-dim text-lg leading-relaxed">{lesson.summary}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => markComplete(lesson.id)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            done
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-indigo-600 text-white hover:bg-indigo-500'
          }`}
        >
          <CheckCircle size={16} />{done ? 'Completed!' : 'Mark Complete'}
        </button>
        <button
          onClick={() => toggleBookmark(lesson.id)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all border ${
            saved ? 'border-indigo-500/50 text-indigo-400 bg-indigo-500/10' : 'border-border text-dim hover:text-white hover:border-border'
          }`}
        >
          <Bookmark size={16} className={saved ? 'fill-indigo-400' : ''} />{saved ? 'Saved' : 'Save'}
        </button>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {lesson.content.map((section, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-3 text-indigo-300">{section.heading}</h2>
            <p className="text-dim leading-relaxed">{section.body}</p>
            {section.tips && (
              <ul className="mt-4 space-y-2">
                {section.tips.map((tip, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0 text-xs font-bold">{j + 1}</span>
                    <span className="text-white/80">{tip}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {lesson.tags.map((tag) => (
          <span key={tag} className="text-xs text-dim bg-border/40 px-3 py-1 rounded-full">{tag}</span>
        ))}
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <h3 className="font-bold text-lg mb-3">More in {cat?.name}</h3>
          <div className="space-y-3">
            {related.map((l) => (
              <Link key={l.id} to={`/lesson/${l.id}`} className="block bg-card border border-border rounded-xl px-4 py-3 hover:border-indigo-500/50 transition-colors">
                <div className="font-semibold text-sm">{l.title}</div>
                <div className="text-dim text-xs mt-0.5">{l.readingMinutes} min · {l.difficulty}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
