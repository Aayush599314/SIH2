import { useState, useMemo } from 'react';
import { Search, Filter, X, FileText, BookOpen, FileCheck, HelpCircle, Download } from 'lucide-react';
import { knowledgeData } from '@/lib/data';
import type { KnowledgeItem } from '@/lib/types';

const typeConfig: Record<KnowledgeItem['type'], { icon: typeof FileText; color: string; bg: string }> = {
  Report: { icon: FileText, color: 'text-forest-700', bg: 'bg-forest-50' },
  'Policy Brief': { icon: BookOpen, color: 'text-saffron-700', bg: 'bg-saffron-50' },
  Guideline: { icon: FileCheck, color: 'text-navy-600', bg: 'bg-navy-50' },
  FAQ: { icon: HelpCircle, color: 'text-forest-600', bg: 'bg-forest-50' },
};

export default function KnowledgeCentre() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const types = useMemo(() => {
    const set = new Set(knowledgeData.map((k) => k.type));
    return ['all', ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    return knowledgeData.filter((k) => {
      const matchSearch =
        !search ||
        k.title.toLowerCase().includes(search.toLowerCase()) ||
        k.summary.toLowerCase().includes(search.toLowerCase());
      const matchType = type === 'all' || k.type === type;
      return matchSearch && matchType;
    });
  }, [search, type]);

  const hasFilters = search || type !== 'all';

  return (
    <div className="animate-fade-in">
      <div className="bg-forest-800 text-cream-50 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-bold sm:text-4xl">Knowledge Centre</h1>
          <p className="mt-2 text-cream-200 max-w-2xl">
            Reports, policy briefs, guidelines, and FAQs on land governance and rural development.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="card mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
              <input
                type="text"
                placeholder="Search knowledge resources..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-navy-400" />
              <select value={type} onChange={(e) => setType(e.target.value)} className="input-field py-2 w-auto">
                {types.map((t) => (
                  <option key={t} value={t}>{t === 'all' ? 'All Types' : t}</option>
                ))}
              </select>
              {hasFilters && (
                <button onClick={() => { setSearch(''); setType('all'); }} className="btn-ghost text-navy-500">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <p className="text-sm text-navy-400 mb-4">{filtered.length} resources found</p>

        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((k) => {
            const config = typeConfig[k.type];
            const Icon = config.icon;
            const isExpanded = expandedId === k.id;
            return (
              <div key={k.id} className="card hover:shadow-card">
                <div className="flex items-start gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${config.bg}`}>
                    <Icon className={`w-5 h-5 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`badge ${config.bg} ${config.color}`}>{k.type}</span>
                    <h3 className="mt-2 text-sm font-bold text-navy-900 leading-snug">{k.title}</h3>
                    <p className="mt-1 text-xs text-navy-400">{k.source} · {k.year}</p>
                    <p className={`mt-2 text-sm text-navy-600 ${isExpanded ? '' : 'line-clamp-2'}`}>{k.summary}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : k.id)}
                        className="text-xs font-medium text-forest-700 hover:text-forest-800"
                      >
                        {isExpanded ? 'Show less' : 'Read more'}
                      </button>
                      <button
                        onClick={() => alert('Demo resource — no actual file available.')}
                        className="text-xs font-medium text-navy-500 hover:text-navy-700 flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" /> Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
