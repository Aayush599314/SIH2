import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Building2, Calendar, MapPin, Tag, Database, Lightbulb } from 'lucide-react';
import { researchData, datasetsData, policyData } from '@/lib/data';
import { SaveButton } from '@/lib/useSaved';

export default function ResearchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const research = researchData.find((r) => r.id === id);

  if (!research) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-navy-900">Research not found</h1>
        <Link to="/research" className="btn-primary mt-4">Back to Research Hub</Link>
      </div>
    );
  }

  const relatedDatasets = datasetsData.filter((d) => research.relatedDatasetIds.includes(d.id));
  const relatedPolicies = policyData.filter((p) => research.relatedPolicyIds.includes(p.id));

  return (
    <div className="animate-fade-in">
      <div className="bg-forest-800 text-cream-50 py-10">
        <div className="mx-auto max-w-4xl px-4">
          <button onClick={() => navigate(-1)} className="text-cream-300 hover:text-cream-50 text-sm flex items-center gap-1 mb-4">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <span className="badge bg-saffron-500/20 text-saffron-200 ring-1 ring-saffron-400/30">{research.domain}</span>
          <h1 className="mt-3 text-2xl font-bold sm:text-3xl leading-tight">{research.title}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <h2 className="text-lg font-bold text-navy-900 mb-3">Abstract</h2>
              <p className="text-sm text-navy-600 leading-relaxed">{research.abstract}</p>
            </div>

            {/* Tags */}
            <div className="card">
              <h3 className="text-sm font-bold text-navy-900 mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-forest-600" /> Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {research.tags.map((t) => (
                  <span key={t} className="badge bg-forest-50 text-forest-700">{t}</span>
                ))}
              </div>
            </div>

            {/* Related datasets */}
            {relatedDatasets.length > 0 && (
              <div className="card">
                <h3 className="text-sm font-bold text-navy-900 mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4 text-saffron-600" /> Related Datasets
                </h3>
                <div className="space-y-2">
                  {relatedDatasets.map((d) => (
                    <Link
                      key={d.id}
                      to={`/data/${d.id}`}
                      className="block rounded-lg border border-forest-900/10 p-3 hover:bg-forest-50 transition-colors"
                    >
                      <p className="text-sm font-medium text-navy-800">{d.title}</p>
                      <p className="text-xs text-navy-400 mt-1">{d.source} · {d.year} · {d.geography}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related policies */}
            {relatedPolicies.length > 0 && (
              <div className="card">
                <h3 className="text-sm font-bold text-navy-900 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-saffron-600" /> Related Policy Innovations
                </h3>
                <div className="space-y-2">
                  {relatedPolicies.map((p) => (
                    <Link
                      key={p.id}
                      to="/policy"
                      className="block rounded-lg border border-forest-900/10 p-3 hover:bg-forest-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-navy-800">{p.title}</p>
                        <span className={`badge ${
                          p.stage === 'Evaluated' ? 'bg-forest-50 text-forest-700' :
                          p.stage === 'Pilot' ? 'bg-saffron-50 text-saffron-700' :
                          'bg-navy-50 text-navy-600'
                        }`}>{p.stage}</span>
                      </div>
                      <p className="text-xs text-navy-400 mt-1">{p.targetArea}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="card">
              <h3 className="text-sm font-bold text-navy-900 mb-3">Research Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-forest-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-navy-400">Authors</p>
                    <p className="text-navy-700">{research.authors.join(', ')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Building2 className="w-4 h-4 text-forest-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-navy-400">Institution</p>
                    <p className="text-navy-700">{research.institution}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-forest-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-navy-400">Published</p>
                    <p className="text-navy-700">{research.year}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-forest-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-navy-400">Region</p>
                    <p className="text-navy-700">{research.region}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-forest-900/10">
                <SaveButton resourceId={research.id} resourceType="research" title={research.title} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
