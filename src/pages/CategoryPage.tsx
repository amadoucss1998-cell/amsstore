import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { CATEGORIES, LESSONS } from '../data/lessons';
import LessonCard from '../components/LessonCard';

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const cat = CATEGORIES.find((c) => c.id === id);
  const lessons = LESSONS.filter((l) => l.categoryId === id);

  if (!cat) return <div className="text-dim">Category not found.</div>;

  return (
    <div className="space-y-6">
      <Link to="/" className="inline-flex items-center gap-1.5 text-dim hover:text-white text-sm transition-colors">
        <ArrowLeft size={16} /> Back
      </Link>

      <div className={`bg-gradient-to-r ${cat.color} rounded-3xl p-6 sm:p-8`}>
        <div className="text-5xl mb-3">{cat.icon}</div>
        <h1 className="text-3xl font-black mb-1">{cat.name}</h1>
        <p className="text-white/80">{cat.description}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {lessons.map((l) => <LessonCard key={l.id} lesson={l} />)}
      </div>
    </div>
  );
}
