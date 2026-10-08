import { MapPin, AlertCircle, Wrench, CheckCircle2, TrendingUp, BookOpen, Calendar } from 'lucide-react';
import { caseStudiesData } from '@/lib/data';

export default function CaseStudies() {
  return (
    <div className="animate-fade-in">
      <div className="bg-forest-800 text-cream-50 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-bold sm:text-4xl">Case Studies</h1>
          <p className="mt-2 text-cream-200 max-w-2xl">
            Real-world interventions in land governance — documenting problems, interventions,
            evidence, outcomes, and lessons learned.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="space-y-6">
          {caseStudiesData.map((c) => (
            <div key={c.id} className="card overflow-hidden">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="badge bg-saffron-50 text-saffron-700">
                      <MapPin className="w-3 h-3" /> {c.location}
                    </span>
                    <span className="badge bg-navy-50 text-navy-600">
                      <Calendar className="w-3 h-3" /> {c.year}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-navy-900">{c.title}</h2>
                </div>
              </div>

              {/* Sections grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg bg-red-50 p-4">
                  <h3 className="text-xs font-bold uppercase text-red-600 mb-2 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" /> Problem
                  </h3>
                  <p className="text-sm text-navy-700 leading-relaxed">{c.problem}</p>
                </div>

                <div className="rounded-lg bg-navy-50 p-4">
                  <h3 className="text-xs font-bold uppercase text-navy-600 mb-2 flex items-center gap-1.5">
                    <Wrench className="w-4 h-4" /> Intervention
                  </h3>
                  <p className="text-sm text-navy-700 leading-relaxed">{c.intervention}</p>
                </div>

                <div className="rounded-lg bg-forest-50 p-4">
                  <h3 className="text-xs font-bold uppercase text-forest-700 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Evidence
                  </h3>
                  <p className="text-sm text-navy-700 leading-relaxed">{c.evidence}</p>
                </div>

                <div className="rounded-lg bg-saffron-50 p-4">
                  <h3 className="text-xs font-bold uppercase text-saffron-700 mb-2 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" /> Outcome
                  </h3>
                  <p className="text-sm text-navy-700 leading-relaxed">{c.outcome}</p>
                </div>
              </div>

              {/* Lessons */}
              <div className="mt-4 rounded-lg bg-cream-100 p-4 border border-forest-900/5">
                <h3 className="text-xs font-bold uppercase text-forest-800 mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> Lessons Learned
                </h3>
                <p className="text-sm text-navy-700 leading-relaxed">{c.lessons}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
