import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { LESSONS, CATEGORIES } from '../data/lessons';
import LessonCard from '../components/LessonCard';
import { Link } from 'react-router-dom';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [filterDiff, setFilterDiff] = useState('');

  const results = useMemo(() => {
    return LESSONS.filter((l) => {
      const q = query.toLowerCase();
      const matchesText = !q || l.title.toLowerCase().includes(q) || l.summary.toLowerCase().includes(q) || l.tags.some((t) => t.includes(q));
      const matchesCat = !filterCat || l.categoryId === filterCat;
      const matchesDiff = !filterDiff || l.difficulty === filterDiff;
      return matchesText && matchesCat && matchesDiff;
    });
  }, [query, filterCat, filterDiff]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black">Browse Lessons</h1>

      {/* Search input */}
      <div className="relative">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search finance, sleep, contracts..."
          className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-muted outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="bg-card border border-border rounded-xl px-3 py-2 text-sm text-dim outline-none focus:border-indigo-500"
        >
          <option value="">All Topics</option>
          {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
        </select>
        <select
          value={filterDiff}
          onChange={(e) => setFilterDiff(e.target.value)}
          className="bg-card border border-border rounded-xl px-3 py-2 text-sm text-dim outline-none focus:border-indigo-500"
        >
          <option value="">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        {(query || filterCat || filterDiff) && (
          <button onClick={() => { setQuery(''); setFilterCat(''); setFilterDiff(''); }} className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors px-2">
            Clear
          </button>
        )}
      </div>

      <p className="text-dim text-sm">{results.length} lesson{results.length !== 1 ? 's' : ''} found</p>

      <div className="grid sm:grid-cols-2 gap-4">
        {results.map((l) => <LessonCard key={l.id} lesson={l} />)}
      </div>

      {results.length === 0 && (
        <div className="text-center py-16 text-dim">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-semibold">No lessons match your search.</p>
          <p className="text-sm mt-1">Try different keywords or clear filters.</p>
        </div>
      )}
    </div>
  );
}
