import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, FileText, X } from 'lucide-react';
import { researchData } from '@/lib/data';

export default function Research() {
  const [search, setSearch] = useState('');
  const [domain, setDomain] = useState('all');
  const [year, setYear] = useState('all');

  const domains = useMemo(() => {
    const set = new Set(researchData.map((r) => r.domain));
    return ['all', ...Array.from(set)];
  }, []);

  const years = useMemo(() => {
    const set = new Set(researchData.map((r) => r.year));
    return ['all', ...Array.from(set).sort((a, b) => b - a)];
  }, []);

  const filtered = useMemo(() => {
    return researchData.filter((r) => {
      const matchSearch =
        !search ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.abstract.toLowerCase().includes(search.toLowerCase()) ||
        r.authors.some((a) => a.toLowerCase().includes(search.toLowerCase())) ||
        r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchDomain = domain === 'all' || r.domain === domain;
      const matchYear = year === 'all' || r.year === parseInt(year);
      return matchSearch && matchDomain && matchYear;
    });
  }, [search, domain, year]);

  const hasFilters = search || domain !== 'all' || year !== 'all';

  const clearFilters = () => {
    setSearch('');
    setDomain('all');
    setYear('all');
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-forest-800 text-cream-50 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-bold sm:text-4xl">Research Hub</h1>
          <p className="mt-2 text-cream-200 max-w-2xl">
            Peer-reviewed research on land governance, rural development, and policy innovation in India.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Search + filters */}
        <div className="card mb-6">
          <div className="flex flex-col gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
              <input
                type="text"
                placeholder="Search by title, author, keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-navy-400" />
                <select value={domain} onChange={(e) => setDomain(e.target.value)} className="input-field py-2 w-auto">
                  {domains.map((d) => (
                    <option key={d} value={d}>{d === 'all' ? 'All Domains' : d}</option>
                  ))}
                </select>
              </div>
              <select value={year} onChange={(e) => setYear(e.target.value)} className="input-field py-2 w-auto">
                {years.map((y) => (
                  <option key={y} value={y}>{y === 'all' ? 'All Years' : y}</option>
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

        {/* Results */}
        <p className="text-sm text-navy-400 mb-4">{filtered.length} research {filtered.length === 1 ? 'paper' : 'papers'} found</p>

        {filtered.length === 0 ? (
          <div className="card text-center py-16">
            <FileText className="w-12 h-12 text-forest-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-navy-700">No research found</h3>
            <p className="text-sm text-navy-400 mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map((r) => (
              <Link key={r.id} to={`/research/${r.id}`} className="card group hover:shadow-lift">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="badge bg-forest-50 text-forest-700">{r.domain}</span>
                  <span className="text-xs text-navy-400">{r.year}</span>
                </div>
                <h3 className="text-base font-bold text-navy-900 group-hover:text-forest-700 transition-colors leading-snug">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm text-navy-500 line-clamp-3">{r.abstract}</p>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-navy-600 font-medium">{r.authors.join(', ')}</span>
                </div>
                <p className="mt-1 text-xs text-navy-400">{r.institution}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {r.tags.slice(0, 3).map((t) => (
                    <span key={t} className="badge bg-cream-100 text-navy-500 text-[10px]">{t}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
