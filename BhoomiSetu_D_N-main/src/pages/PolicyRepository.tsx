import { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  FileText,
  Upload,
  X,
  Calendar,
  User,
  Tag,
  BookOpen,
  ExternalLink,
  Eye,
} from 'lucide-react';

/* ── Mock data ─────────────────────────────────────────────── */
const categories = [
  'All',
  'Demographics',
  'Agriculture',
  'Urban Planning',
  'Tribal Affairs',
  'Revenue & Taxation',
  'Environmental Policy',
] as const;

type Category = (typeof categories)[number];

interface Paper {
  id: number;
  title: string;
  author: string;
  institution: string;
  date: string;
  abstract: string;
  tags: string[];
  category: Category;
  citations: number;
  downloads: number;
}

const mockPapers: Paper[] = [
  {
    id: 1,
    title: 'Impact of Urban Sprawl on Agricultural Landholdings in Peri-Urban India',
    author: 'Dr. Ananya Sharma',
    institution: 'Indian Institute of Science, Bengaluru',
    date: '2026-06-15',
    abstract:
      'This study examines the accelerating conversion of prime agricultural land in peri-urban corridors of tier-2 cities. Using satellite imagery and revenue records from 12 districts across Karnataka, Maharashtra, and Tamil Nadu, we quantify the loss of 34,000 hectares of productive farmland between 2020-2025 and model its cascading effects on food security, farmer displacement, and groundwater recharge.',
    tags: ['Urban Sprawl', 'Agriculture', 'Satellite Analysis', 'Peri-Urban'],
    category: 'Urban Planning',
    citations: 47,
    downloads: 1230,
  },
  {
    id: 2,
    title: 'Demographic Shifts and Land Redistribution Patterns in Eastern India',
    author: 'Prof. Rajiv Mehta',
    institution: 'Jawaharlal Nehru University, New Delhi',
    date: '2026-03-22',
    abstract:
      'Analysing Census 2021 micro-data alongside land records from Bihar, Jharkhand, and Odisha, this paper identifies a structural mismatch between demographic growth corridors and land availability. We propose a predictive framework for anticipating land demand that can inform proactive acquisition and rehabilitation policy design at the block level.',
    tags: ['Demographics', 'Redistribution', 'Census Data', 'Eastern India'],
    category: 'Demographics',
    citations: 32,
    downloads: 890,
  },
  {
    id: 3,
    title: 'Forest Rights Act Implementation: A Decade of Tribal Land Governance',
    author: 'Dr. Meera Devi',
    institution: 'Tata Institute of Social Sciences, Mumbai',
    date: '2025-11-08',
    abstract:
      'A comprehensive policy review of the Forest Rights Act (2006) implementation across Chhattisgarh, Madhya Pradesh, and Jharkhand from 2014-2024. We document 1.2 million individual and community claims, analyze rejection rates by district, and identify institutional bottlenecks in joint verification processes that delay title conferral by an average of 3.7 years.',
    tags: ['Forest Rights', 'Tribal Governance', 'FRA', 'Policy Review'],
    category: 'Tribal Affairs',
    citations: 89,
    downloads: 2450,
  },
  {
    id: 4,
    title: 'Machine Learning Models for Predicting Land Value Appreciation in Smart Cities',
    author: 'Dr. Vikram Patel',
    institution: 'IIT Bombay',
    date: '2026-08-01',
    abstract:
      'We develop an ensemble ML model combining XGBoost and spatial regression to predict land price trajectories in India\'s 100 Smart City Mission towns. Trained on stamp duty data, FSI changes, and infrastructure project timelines, the model achieves 91% accuracy for 2-year price forecasting, offering a tool for equitable compensation benchmarking in future acquisitions.',
    tags: ['Machine Learning', 'Smart Cities', 'Land Valuation', 'AI'],
    category: 'Revenue & Taxation',
    citations: 56,
    downloads: 1780,
  },
  {
    id: 5,
    title: 'Climate-Resilient Agriculture Zones: Redefining Buffer Policies for 2030',
    author: 'Dr. Sunita Krishnan',
    institution: 'National Institute of Rural Development, Hyderabad',
    date: '2026-01-10',
    abstract:
      'This policy paper proposes a revised agricultural buffer zone framework integrating climate vulnerability indices, soil health data, and crop suitability maps. Using GIS-based multi-criteria analysis across 50 drought-prone districts, we recommend minimum buffer distances that balance developmental needs with long-term food security and ecological sustainability targets.',
    tags: ['Climate Resilience', 'Buffer Zones', 'GIS', 'Agriculture Policy'],
    category: 'Agriculture',
    citations: 38,
    downloads: 1120,
  },
  {
    id: 6,
    title: 'Environmental Impact Assessment Gaps in Land Acquisition for Industrial Corridors',
    author: 'Prof. Arun Deshmukh',
    institution: 'Centre for Science and Environment, New Delhi',
    date: '2025-09-20',
    abstract:
      'Examining 45 industrial corridor projects notified under LARR Act (2013), this study identifies systemic gaps in Environmental Impact Assessment processes. We find that 68% of projects lacked cumulative impact studies, 40% had incomplete Social Impact Assessments, and recommend a unified digital EIA portal integrated with real-time satellite monitoring for ongoing compliance.',
    tags: ['EIA', 'Industrial Corridors', 'LARR Act', 'Environmental Compliance'],
    category: 'Environmental Policy',
    citations: 72,
    downloads: 2100,
  },
];

/* ── Component ─────────────────────────────────────────────── */
export default function PolicyRepository() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() => {
    return mockPapers.filter((p) => {
      const matchCategory = activeCategory === 'All' || p.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.abstract.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });
  }, [search, activeCategory]);

  return (
    <div className="animate-fade-in">
      {/* ── Hero banner ─────────────────────────────────────── */}
      <div className="bg-forest-800 text-cream-50 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-saffron-500/20 px-3 py-1 text-xs font-medium text-saffron-200 ring-1 ring-saffron-400/30 mb-4">
            <BookOpen className="w-3.5 h-3.5" /> Policy & Research Hub
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl">Research & Policy Repository</h1>
          <p className="mt-2 text-cream-200 max-w-2xl">
            Browse peer-reviewed research, policy documents, and evidence briefs on land
            governance, rural development, and sustainable planning across India.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* ── Search + filters bar ────────────────────────── */}
        <div className="card mb-6">
          <div className="flex flex-col gap-4">
            {/* Search row */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                <input
                  type="text"
                  placeholder="Search by title, author, keyword…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
              <button onClick={() => setModalOpen(true)} className="btn-primary whitespace-nowrap">
                <Upload className="w-4 h-4" /> Upload Research
              </button>
            </div>

            {/* Category chips */}
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="w-4 h-4 text-navy-400 mr-1" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`badge cursor-pointer transition-all ${
                    activeCategory === cat
                      ? 'bg-forest-700 text-cream-50 ring-1 ring-forest-600'
                      : 'bg-cream-100 text-navy-600 hover:bg-forest-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Result count + view toggle ──────────────────── */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-navy-400">
            {filtered.length} {filtered.length === 1 ? 'paper' : 'papers'} found
          </p>
          <div className="flex gap-1 rounded-lg border border-forest-900/10 p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                viewMode === 'grid' ? 'bg-forest-700 text-cream-50' : 'text-navy-500 hover:bg-forest-50'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                viewMode === 'list' ? 'bg-forest-700 text-cream-50' : 'text-navy-500 hover:bg-forest-50'
              }`}
            >
              List
            </button>
          </div>
        </div>

        {/* ── Papers grid / list ──────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="card text-center py-16">
            <FileText className="w-12 h-12 text-forest-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-navy-700">No papers found</h3>
            <p className="text-sm text-navy-400 mt-1">Try adjusting your search or filters</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((p) => (
              <div key={p.id} className="card group hover:shadow-lift flex flex-col">
                {/* Top meta */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="badge bg-forest-50 text-forest-700">{p.category}</span>
                  <span className="text-xs text-navy-400 whitespace-nowrap">
                    <Calendar className="w-3 h-3 inline -mt-0.5 mr-1" />
                    {new Date(p.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-navy-900 group-hover:text-forest-700 transition-colors leading-snug">
                  {p.title}
                </h3>

                {/* Author */}
                <div className="flex items-center gap-1.5 mt-2 text-xs text-navy-600 font-medium">
                  <User className="w-3 h-3 text-navy-400" />
                  {p.author}
                </div>
                <p className="text-[11px] text-navy-400 mt-0.5">{p.institution}</p>

                {/* Abstract */}
                <p className="mt-3 text-sm text-navy-500 line-clamp-3 flex-1">{p.abstract}</p>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={t} className="badge bg-cream-100 text-navy-500 text-[10px]">
                      <Tag className="w-2.5 h-2.5" /> {t}
                    </span>
                  ))}
                </div>

                {/* Bottom stats */}
                <div className="mt-4 pt-3 border-t border-forest-900/10 flex items-center justify-between text-xs text-navy-400">
                  <span>{p.citations} citations · {p.downloads.toLocaleString()} downloads</span>
                  <button className="btn-ghost py-1 px-2 text-xs">
                    <ExternalLink className="w-3 h-3" /> View
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((p) => (
              <div key={p.id} className="card group hover:shadow-lift">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="badge bg-forest-50 text-forest-700">{p.category}</span>
                      <span className="text-xs text-navy-400">
                        {new Date(p.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-navy-900 group-hover:text-forest-700 transition-colors leading-snug">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-xs text-navy-600 font-medium">
                      {p.author} — {p.institution}
                    </p>
                    <p className="mt-2 text-sm text-navy-500 line-clamp-2">{p.abstract}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {p.tags.map((t) => (
                        <span key={t} className="badge bg-cream-100 text-navy-500 text-[10px]">
                          <Tag className="w-2.5 h-2.5" /> {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex md:flex-col items-center md:items-end gap-3 md:gap-2 text-xs text-navy-400 shrink-0">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {p.downloads.toLocaleString()}</span>
                    <span>{p.citations} citations</span>
                    <button className="btn-ghost py-1 px-2 text-xs">
                      <ExternalLink className="w-3 h-3" /> View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Upload Modal ─────────────────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-lift border border-forest-900/10 w-full max-w-lg mx-4 animate-scale-in">
            <div className="flex items-center justify-between px-6 py-4 border-b border-forest-900/10">
              <h2 className="text-lg font-bold text-navy-900 font-serif">Upload Research Paper</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-forest-50 text-navy-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">Paper Title</label>
                <input type="text" placeholder="Enter title…" className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Author(s)</label>
                  <input type="text" placeholder="e.g., Dr. Sharma" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Category</label>
                  <select className="input-field">
                    {categories.filter((c) => c !== 'All').map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">Abstract</label>
                <textarea rows={3} placeholder="Brief summary…" className="input-field resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">Upload PDF</label>
                <div className="rounded-lg border-2 border-dashed border-forest-900/15 bg-cream-50 px-6 py-8 text-center cursor-pointer hover:border-forest-600/40 transition-colors">
                  <Upload className="w-8 h-8 text-forest-400 mx-auto mb-2" />
                  <p className="text-sm text-navy-500">
                    Drag & drop your file here, or{' '}
                    <span className="font-medium text-forest-700">browse</span>
                  </p>
                  <p className="text-xs text-navy-400 mt-1">PDF, DOC up to 25 MB</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-forest-900/10 bg-cream-50/60 rounded-b-2xl">
              <button onClick={() => setModalOpen(false)} className="btn-secondary">
                Cancel
              </button>
              <button
                onClick={() => {
                  setModalOpen(false);
                  alert('This is a prototype — upload functionality is not connected.');
                }}
                className="btn-primary"
              >
                <Upload className="w-4 h-4" /> Submit Paper
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
