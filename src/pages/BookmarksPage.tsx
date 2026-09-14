import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { LESSONS } from '../data/lessons';
import { useStore } from '../store/useStore';
import LessonCard from '../components/LessonCard';

export default function BookmarksPage() {
  const { bookmarkedLessons } = useStore();
  const lessons = LESSONS.filter((l) => bookmarkedLessons.includes(l.id));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black">Saved Lessons</h1>

      {lessons.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-3"><Bookmark size={48} className="mx-auto text-muted" /></p>
          <h3 className="font-bold text-lg mb-1">Nothing saved yet</h3>
          <p className="text-dim text-sm mb-6">Bookmark lessons to read them later.</p>
          <Link to="/search" className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-indigo-500 transition-colors">
            Browse Lessons
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {lessons.map((l) => <LessonCard key={l.id} lesson={l} />)}
        </div>
      )}
    </div>
  );
}
