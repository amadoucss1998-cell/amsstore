import { Link } from 'react-router-dom';
import { Clock, BookOpen, Bookmark, CheckCircle } from 'lucide-react';
import { Lesson } from '../data/lessons';
import { useStore } from '../store/useStore';

const DIFF_COLORS = {
  beginner: 'text-emerald-400 bg-emerald-400/10',
  intermediate: 'text-amber-400 bg-amber-400/10',
  advanced: 'text-rose-400 bg-rose-400/10',
};

export default function LessonCard({ lesson }: { lesson: Lesson }) {
  const { completedLessons, bookmarkedLessons, toggleBookmark } = useStore();
  const done = completedLessons.includes(lesson.id);
  const saved = bookmarkedLessons.includes(lesson.id);

  return (
    <div className="relative bg-card border border-border rounded-2xl p-4 hover:border-indigo-500/50 transition-all group glow">
      <button
        onClick={(e) => { e.preventDefault(); toggleBookmark(lesson.id); }}
        className="absolute top-3 right-3 text-muted hover:text-indigo-400 transition-colors"
      >
        <Bookmark size={16} className={saved ? 'fill-indigo-400 text-indigo-400' : ''} />
      </button>

      <Link to={`/lesson/${lesson.id}`} className="block">
        <div className="flex items-start gap-3 pr-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${DIFF_COLORS[lesson.difficulty]}`}>
                {lesson.difficulty}
              </span>
              {done && <CheckCircle size={14} className="text-emerald-400" />}
            </div>
            <h3 className="font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug mb-1">
              {lesson.title}
            </h3>
            <p className="text-dim text-sm leading-relaxed line-clamp-2">{lesson.summary}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-3 text-muted text-xs">
          <span className="flex items-center gap-1"><Clock size={12} />{lesson.readingMinutes} min</span>
          <span className="flex items-center gap-1"><BookOpen size={12} />{lesson.content.length} sections</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-2">
          {lesson.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] text-dim bg-border/40 px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>
      </Link>
    </div>
  );
}
