import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Calendar,
  MapPin,
  Database as DbIcon,
  Download,
  FileText,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { datasetsData, researchData } from '@/lib/data';
import { SaveButton } from '@/lib/useSaved';

export default function DatasetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dataset = datasetsData.find((d) => d.id === id);

  if (!dataset) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-navy-900">Dataset not found</h1>
        <Link to="/data" className="btn-primary mt-4">Back to Data Explorer</Link>
      </div>
    );
  }

  const relatedResearch = researchData.filter((r) => dataset.relatedResearchIds.includes(r.id));

  return (
    <div className="animate-fade-in">
      <div className="bg-forest-800 text-cream-50 py-10">
        <div className="mx-auto max-w-4xl px-4">
          <button onClick={() => navigate(-1)} className="text-cream-300 hover:text-cream-50 text-sm flex items-center gap-1 mb-4">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <span className="badge bg-saffron-500/20 text-saffron-200 ring-1 ring-saffron-400/30">{dataset.category}</span>
          <h1 className="mt-3 text-2xl font-bold sm:text-3xl leading-tight">{dataset.title}</h1>
          <p className="mt-2 text-cream-200 text-sm">{dataset.description}</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Variables */}
            <div className="card">
              <h3 className="text-sm font-bold text-navy-900 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-forest-600" /> Variables
              </h3>
              <div className="flex flex-wrap gap-2">
                {dataset.variables.map((v) => (
                  <code key={v} className="rounded-md bg-cream-100 px-2.5 py-1 text-xs font-mono text-navy-700">
                    {v}
                  </code>
                ))}
              </div>
            </div>

            {/* Demo data preview */}
            <div className="card">
              <h3 className="text-sm font-bold text-navy-900 mb-3 flex items-center gap-2">
                <DbIcon className="w-4 h-4 text-forest-600" /> Data Preview (Demo)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-forest-900/10">
                      {dataset.variables.slice(0, 5).map((v) => (
                        <th key={v} className="text-left py-2 px-3 font-semibold text-navy-700">{v}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4].map((row) => (
                      <tr key={row} className="border-b border-forest-900/5">
                        {dataset.variables.slice(0, 5).map((v, i) => (
                          <td key={v} className="py-2 px-3 text-navy-500">
                            {i === 0 ? `${v.substring(0, 3)}_${row}0${row}` :
                             i === 1 ? dataset.geography.split(' ')[0] :
                             i === 2 ? `${(row * 12.5).toFixed(1)}` :
                             i === 3 ? `${2020 + row}` :
                             `${row * 7}%`}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-navy-400 italic">Sample rows shown for demonstration. Full dataset available in demo format.</p>
            </div>

            {/* Download (demo) */}
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-navy-900">Access Dataset</h3>
                  <p className="text-xs text-navy-400 mt-1">{dataset.format} · {dataset.size}</p>
                </div>
                <button className="btn-accent" onClick={() => alert('Demo download — this is a prototype. No actual file is available.')}>
                  <Download className="w-4 h-4" /> Download (Demo)
                </button>
              </div>
            </div>

            {/* Related research */}
            {relatedResearch.length > 0 && (
              <div className="card">
                <h3 className="text-sm font-bold text-navy-900 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-forest-600" /> Related Research
                </h3>
                <div className="space-y-2">
                  {relatedResearch.map((r) => (
                    <Link
                      key={r.id}
                      to={`/research/${r.id}`}
                      className="block rounded-lg border border-forest-900/10 p-3 hover:bg-forest-50 transition-colors"
                    >
                      <p className="text-sm font-medium text-navy-800">{r.title}</p>
                      <p className="text-xs text-navy-400 mt-1">{r.authors[0]} · {r.year}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="card">
              <h3 className="text-sm font-bold text-navy-900 mb-3">Dataset Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Building2 className="w-4 h-4 text-forest-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-navy-400">Source</p>
                    <p className="text-navy-700">{dataset.source}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-forest-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-navy-400">Year</p>
                    <p className="text-navy-700">{dataset.year}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-forest-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-navy-400">Geography</p>
                    <p className="text-navy-700">{dataset.geography}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <DbIcon className="w-4 h-4 text-forest-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-navy-400">Format & Size</p>
                    <p className="text-navy-700">{dataset.format} · {dataset.size}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-forest-900/10">
                <SaveButton resourceId={dataset.id} resourceType="dataset" title={dataset.title} />
              </div>
            </div>

            <div className="rounded-xl bg-saffron-50 border border-saffron-200 p-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-saffron-600 shrink-0" />
                <p className="text-xs text-saffron-800">
                  This is demo data for prototype demonstration. In production, datasets would be
                  sourced directly from government departments with verified provenance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
