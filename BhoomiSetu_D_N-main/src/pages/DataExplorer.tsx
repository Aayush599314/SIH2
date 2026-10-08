import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Database as DbIcon, X, MapPin, Calendar, Building2 } from 'lucide-react';
import { datasetsData } from '@/lib/data';

export default function DataExplorer() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [format, setFormat] = useState('all');

  const categories = useMemo(() => {
    const set = new Set(datasetsData.map((d) => d.category));
    return ['all', ...Array.from(set)];
  }, []);

  const formats = useMemo(() => {
    const set = new Set(datasetsData.flatMap((d) => d.format.split('/').map((f) => f.trim())));
    return ['all', ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    return datasetsData.filter((d) => {
      const matchSearch =
        !search ||
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.description.toLowerCase().includes(search.toLowerCase()) ||
        d.variables.some((v) => v.toLowerCase().includes(search.toLowerCase()));
      const matchCategory = category === 'all' || d.category === category;
      const matchFormat = format === 'all' || d.format.includes(format);
      return matchSearch && matchCategory && matchFormat;
    });
  }, [search, category, format]);

  const hasFilters = search || category !== 'all' || format !== 'all';

  const clearFilters = () => {
    setSearch('');
    setCategory('all');
    setFormat('all');
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-forest-800 text-cream-50 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-bold sm:text-4xl">Data & Evidence</h1>
          <p className="mt-2 text-cream-200 max-w-2xl">
            Explore government datasets on land use, ownership, disputes, and climate vulnerability
            across India. All data is demo content for prototype demonstration.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="card mb-6">
          <div className="flex flex-col gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
              <input
                type="text"
                placeholder="Search datasets, variables..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-navy-400" />
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-field py-2 w-auto">
                  {categories.map((c) => (
                    <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>
                  ))}
                </select>
              </div>
              <select value={format} onChange={(e) => setFormat(e.target.value)} className="input-field py-2 w-auto">
                {formats.map((f) => (
                  <option key={f} value={f}>{f === 'all' ? 'All Formats' : f}</option>
                ))}
              </select>
              {hasFilters && (
                <button onClick={clearFilters} className="btn-ghost text-navy-500">
                  <X className="w-4 h-4" /> Clear
                </button>
              )}
            </div>
          </div>
        </div>

        <p className="text-sm text-navy-400 mb-4">{filtered.length} {filtered.length === 1 ? 'dataset' : 'datasets'} found</p>

        {filtered.length === 0 ? (
          <div className="card text-center py-16">
            <DbIcon className="w-12 h-12 text-forest-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-navy-700">No datasets found</h3>
            <p className="text-sm text-navy-400 mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map((d) => (
              <Link key={d.id} to={`/data/${d.id}`} className="card group hover:shadow-lift">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="badge bg-saffron-50 text-saffron-700">{d.category}</span>
                  <span className="text-xs text-navy-400">{d.size}</span>
                </div>
                <h3 className="text-base font-bold text-navy-900 group-hover:text-forest-700 transition-colors leading-snug">
                  {d.title}
                </h3>
                <p className="mt-2 text-sm text-navy-500 line-clamp-2">{d.description}</p>
                <div className="mt-3 space-y-1 text-xs text-navy-400">
                  <p className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> {d.source}</p>
                  <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {d.geography}</p>
                  <p className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {d.year} · {d.format}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
