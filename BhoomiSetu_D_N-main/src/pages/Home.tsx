import { Link } from 'react-router-dom';
import {
  ArrowRight,
  FileText,
  Database,
  Lightbulb,
  Map as MapIcon,
  TrendingUp,
  Sparkles,
  BookOpen,
  Users,
  Building2,
  GraduationCap,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react';
import { platformStats, researchData, policyData, caseStudiesData } from '@/lib/data';
import EvidenceMatrix from '@/components/EvidenceMatrix';
import AIEvidenceAssistant from '@/components/AIEvidenceAssistant';

const valueStakeholders = [
  { icon: Building2, title: 'Government', value: 'Better evidence for policy design and impact assessment' },
  { icon: GraduationCap, title: 'Researchers', value: 'Platform to publish and connect findings to policy' },
  { icon: Users, title: 'Universities', value: 'Access to real-world data for academic programs' },
  { icon: HeartHandshake, title: 'NGOs', value: 'Evidence base for advocacy and field interventions' },
  { icon: Users, title: 'Citizens', value: 'Transparency in land governance and dispute resolution' },
];

const heroSteps = [
  { label: 'Data', icon: Database },
  { label: 'Research', icon: FileText },
  { label: 'Evidence', icon: CheckCircle2 },
  { label: 'Policy', icon: Lightbulb },
  { label: 'Impact', icon: TrendingUp },
];

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-forest-800 via-forest-700 to-forest-600 text-cream-50">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 40%)',
        }} />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-saffron-500/20 px-3 py-1 text-xs font-medium text-saffron-200 ring-1 ring-saffron-400/30 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              National Digital Platform · Prototype / Demonstration
            </div>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              From Evidence to Better Rural Governance
            </h1>
            <p className="mt-6 text-lg text-cream-200 leading-relaxed max-w-2xl">
              BhoomiSetu connects research, data, and evidence to support land governance
              and rural development policy across India — bridging the gap between
              academic findings and actionable policy innovation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/land-insights" className="btn-accent">
                <MapIcon className="w-4 h-4" /> Explore Land Insights
              </Link>
              <Link to="/research" className="btn-secondary bg-white/10 border-white/20 text-cream-50 hover:bg-white/20 hover:border-white/40">
                <FileText className="w-4 h-4" /> Browse Research
              </Link>
            </div>

            {/* Flow chain */}
            <div className="mt-12 flex items-center gap-2 sm:gap-4 flex-wrap">
              {heroSteps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 ring-1 ring-white/15">
                    <step.icon className="w-4 h-4 text-saffron-300" />
                    <span className="text-sm font-medium text-cream-100">{step.label}</span>
                  </div>
                  {i < heroSteps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-cream-300" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: '40px' }}>
          <path d="M0,60 L0,30 Q360,0 720,30 T1440,30 L1440,60 Z" fill="#fbfaf7" />
        </svg>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 -mt-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {platformStats.map((stat) => {
            const Icon = stat.icon === 'FileText' ? FileText : stat.icon === 'Database' ? Database : stat.icon === 'Lightbulb' ? Lightbulb : MapIcon;
            return (
              <div key={stat.label} className="card text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-forest-50">
                  <Icon className="w-6 h-6 text-forest-700" />
                </div>
                <p className="mt-3 text-3xl font-bold text-navy-900">{stat.value}</p>
                <p className="text-sm text-navy-500">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Evidence Matrix preview */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="section-title">The Evidence Matrix</h2>
          <p className="section-subtitle">
            Tracing the full chain from problem identification to measurable impact
          </p>
        </div>
        <EvidenceMatrix />
        <div className="mt-6 text-center">
          <Link to="/research" className="btn-ghost text-forest-700">
            Explore the full evidence chain <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Land Insights preview */}
      <section className="bg-cream-100 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="badge bg-saffron-100 text-saffron-700">Key Feature</span>
              <h2 className="section-title mt-3">Land Insights</h2>
              <p className="section-subtitle">
                Interactive map of India with state and district-level land governance indicators.
                Explore digitization progress, dispute cases, women's land ownership, and tribal land claims.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  '12 states with district-level breakdowns',
                  '6 key land governance indicators',
                  '5-year trend visualisations',
                  'Color-coded digitization intensity map',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-navy-700">
                    <CheckCircle2 className="w-4 h-4 text-forest-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/land-insights" className="btn-primary mt-6">
                <MapIcon className="w-4 h-4" /> Open Land Insights
              </Link>
            </div>
            <div className="rounded-xl border border-forest-900/10 bg-white p-6 shadow-card">
              <div className="space-y-3">
                {[
                  { label: 'Maharashtra', digitized: 89, color: 'bg-forest-600' },
                  { label: 'Karnataka', digitized: 94, color: 'bg-forest-700' },
                  { label: 'Madhya Pradesh', digitized: 76, color: 'bg-forest-500' },
                  { label: 'Rajasthan', digitized: 68, color: 'bg-saffron-500' },
                  { label: 'Jharkhand', digitized: 54, color: 'bg-saffron-400' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-navy-700">{s.label}</span>
                      <span className="text-navy-500">{s.digitized}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-cream-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${s.color} transition-all duration-1000`}
                        style={{ width: `${s.digitized}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured research */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title">Featured Research</h2>
            <p className="section-subtitle">Peer-reviewed studies on land governance in India</p>
          </div>
          <Link to="/research" className="btn-ghost text-forest-700 hidden sm:inline-flex">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {researchData.slice(0, 3).map((r) => (
            <Link key={r.id} to={`/research/${r.id}`} className="card group hover:shadow-lift">
              <span className="badge bg-forest-50 text-forest-700">{r.domain}</span>
              <h3 className="mt-3 text-base font-bold text-navy-900 group-hover:text-forest-700 transition-colors leading-snug">
                {r.title}
              </h3>
              <p className="mt-2 text-sm text-navy-500 line-clamp-3">{r.abstract}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-navy-400">
                <span>{r.authors[0]} et al.</span>
                <span>{r.year}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Policy Innovation preview */}
      <section className="bg-navy-900 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-cream-50 sm:text-3xl">Policy Innovation</h2>
            <p className="mt-2 text-sm text-cream-300 sm:text-base">
              Evidence-based policy proposals — clearly labelled as prototype / demonstration
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {policyData.slice(0, 3).map((p) => (
              <Link
                key={p.id}
                to="/policy"
                className="rounded-xl border border-navy-700 bg-navy-800/50 p-6 hover:bg-navy-800 hover:border-forest-500/30 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`badge ${
                    p.stage === 'Evaluated'
                      ? 'bg-forest-500/20 text-forest-300'
                      : p.stage === 'Pilot'
                      ? 'bg-saffron-500/20 text-saffron-300'
                      : 'bg-navy-600/50 text-cream-300'
                  }`}>
                    {p.stage}
                  </span>
                  <Lightbulb className="w-5 h-5 text-saffron-400" />
                </div>
                <h3 className="text-base font-bold text-cream-50 group-hover:text-saffron-300 transition-colors leading-snug">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-cream-300 line-clamp-2">{p.problem}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant preview */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="section-title">AI Evidence Assistant</h2>
          <p className="section-subtitle">
            Ask questions and get sourced answers connecting research, data, and policy
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <AIEvidenceAssistant />
        </div>
      </section>

      {/* Case studies preview */}
      <section className="bg-cream-100 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="section-title">Case Studies</h2>
              <p className="section-subtitle">Real-world interventions in land governance</p>
            </div>
            <Link to="/case-studies" className="btn-ghost text-forest-700 hidden sm:inline-flex">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {caseStudiesData.map((c) => (
              <Link key={c.id} to="/case-studies" className="card group hover:shadow-lift">
                <span className="badge bg-saffron-50 text-saffron-700">{c.location}</span>
                <h3 className="mt-3 text-base font-bold text-navy-900 group-hover:text-forest-700 transition-colors leading-snug">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-navy-500 line-clamp-2">{c.problem}</p>
                <p className="mt-3 text-xs text-forest-600 font-medium">{c.year}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Business / Ecosystem Value */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="section-title">Ecosystem Value</h2>
          <p className="section-subtitle">
            How BhoomiSetu creates value across the land governance ecosystem
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {valueStakeholders.map((s) => (
            <div key={s.title} className="card text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-forest-50">
                <s.icon className="w-6 h-6 text-forest-700" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-navy-900">{s.title}</h3>
              <p className="mt-1.5 text-xs text-navy-500 leading-relaxed">{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-forest-700 to-forest-600 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <BookOpen className="w-12 h-12 text-saffron-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-cream-50 sm:text-3xl">
            From Evidence to Better Rural Governance
          </h2>
          <p className="mt-4 text-cream-200 max-w-2xl mx-auto">
            Explore the platform, discover research, trace evidence chains, and see how data
            drives policy innovation for land governance in India.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/research" className="btn-accent">
              Start Exploring <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/about" className="btn-secondary bg-white/10 border-white/20 text-cream-50 hover:bg-white/20 hover:border-white/40">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
