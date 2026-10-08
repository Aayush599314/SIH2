import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Lightbulb,
  AlertCircle,
  Target,
  TrendingUp,
  ArrowRight,
  FileText,
  Database as DbIcon,
  Info,
} from 'lucide-react';
import { policyData, researchData, datasetsData } from '@/lib/data';
import EvidenceMatrix from '@/components/EvidenceMatrix';

const stageColors: Record<string, string> = {
  Proposed: 'bg-navy-50 text-navy-600 ring-navy-200',
  Pilot: 'bg-saffron-50 text-saffron-700 ring-saffron-200',
  Evaluated: 'bg-forest-50 text-forest-700 ring-forest-200',
};

export default function Policy() {
  const [expandedId, setExpandedId] = useState<string | null>(policyData[0]?.id || null);

  return (
    <div className="animate-fade-in">
      <div className="bg-forest-800 text-cream-50 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-saffron-500/20 px-3 py-1 text-xs font-medium text-saffron-200 ring-1 ring-saffron-400/30 mb-4">
            <Lightbulb className="w-3.5 h-3.5" /> Key Feature
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl">Policy Innovation</h1>
          <p className="mt-2 text-cream-200 max-w-2xl">
            Evidence-based policy proposals addressing land governance challenges in India.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Prototype notice */}
        <div className="rounded-xl bg-saffron-50 border border-saffron-200 p-4 mb-6 flex items-start gap-3">
          <Info className="w-5 h-5 text-saffron-600 shrink-0" />
          <p className="text-sm text-saffron-800">
            All policy innovations on this page are <strong>prototype / demonstration</strong> concepts.
            They are not actual government policies. They demonstrate how research evidence can
            inform policy design.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Policy list */}
          <div className="lg:col-span-2 space-y-4">
            {policyData.map((p) => {
              const isExpanded = expandedId === p.id;
              return (
                <div
                  key={p.id}
                  className={`card transition-all ${isExpanded ? 'ring-2 ring-forest-300 shadow-lift' : ''}`}
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : p.id)}
                    className="w-full text-left"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`badge ring-1 ${stageColors[p.stage]}`}>{p.stage}</span>
                          <span className="text-xs text-navy-400">{p.targetArea}</span>
                        </div>
                        <h3 className="text-base font-bold text-navy-900 leading-snug">{p.title}</h3>
                      </div>
                      <ArrowRight className={`w-5 h-5 text-forest-600 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="mt-4 space-y-4 animate-fade-in">
                      <div className="rounded-lg bg-red-50 p-4">
                        <h4 className="text-xs font-bold uppercase text-red-600 mb-1 flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4" /> Problem
                        </h4>
                        <p className="text-sm text-navy-700">{p.problem}</p>
                      </div>

                      <div className="rounded-lg bg-forest-50 p-4">
                        <h4 className="text-xs font-bold uppercase text-forest-700 mb-1 flex items-center gap-1.5">
                          <Lightbulb className="w-4 h-4" /> Proposed Solution
                        </h4>
                        <p className="text-sm text-navy-700">{p.solution}</p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="rounded-lg bg-navy-50 p-4">
                          <h4 className="text-xs font-bold uppercase text-navy-600 mb-1 flex items-center gap-1.5">
                            <Target className="w-4 h-4" /> Target Area
                          </h4>
                          <p className="text-sm text-navy-700">{p.targetArea}</p>
                        </div>
                        <div className="rounded-lg bg-saffron-50 p-4">
                          <h4 className="text-xs font-bold uppercase text-saffron-700 mb-1 flex items-center gap-1.5">
                            <TrendingUp className="w-4 h-4" /> Expected Impact
                          </h4>
                          <p className="text-sm text-navy-700">{p.expectedImpact}</p>
                        </div>
                      </div>

                      {/* Related resources */}
                      {(p.relatedResearchIds.length > 0 || p.relatedDatasetIds.length > 0) && (
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-forest-900/10">
                          {p.relatedResearchIds.map((rid) => {
                            const r = researchData.find((x) => x.id === rid);
                            if (!r) return null;
                            return (
                              <Link
                                key={rid}
                                to={`/research/${rid}`}
                                className="badge bg-forest-50 text-forest-700 hover:bg-forest-100 transition-colors"
                              >
                                <FileText className="w-3 h-3" /> {r.title.length > 30 ? r.title.substring(0, 30) + '...' : r.title}
                              </Link>
                            );
                          })}
                          {p.relatedDatasetIds.map((did) => {
                            const d = datasetsData.find((x) => x.id === did);
                            if (!d) return null;
                            return (
                              <Link
                                key={did}
                                to={`/data/${did}`}
                                className="badge bg-saffron-50 text-saffron-700 hover:bg-saffron-100 transition-colors"
                              >
                                <DbIcon className="w-3 h-3" /> {d.title.length > 30 ? d.title.substring(0, 30) + '...' : d.title}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sidebar: Evidence Matrix */}
          <div className="space-y-4">
            <div className="card sticky top-24">
              <h3 className="text-sm font-bold text-navy-900 mb-3">How Evidence Informs Policy</h3>
              <p className="text-xs text-navy-400 mb-4">
                The Evidence Matrix shows how each policy proposal traces back through research and data to the original problem.
              </p>
              <EvidenceMatrix />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
