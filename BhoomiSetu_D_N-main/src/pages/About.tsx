import { Globe, Target, Database, FileText, Lightbulb, TrendingUp, CheckCircle2, Info } from 'lucide-react';
import EvidenceMatrix from '@/components/EvidenceMatrix';

const objectives = [
  'Connect fragmented land governance research into a unified, searchable platform',
  'Bridge the gap between academic evidence and policy formulation',
  'Enable data-driven decision-making for rural development programmes',
  'Increase transparency in land records, disputes, and ownership patterns',
  'Support researchers with accessible datasets and collaboration pathways',
  'Empower citizens with information about their land rights',
];

const flowSteps = [
  { icon: Database, label: 'Data', desc: 'Government datasets on land use, ownership, disputes, and climate' },
  { icon: FileText, label: 'Research', desc: 'Peer-reviewed studies analysing land governance challenges' },
  { icon: CheckCircle2, label: 'Evidence', desc: 'Validated findings that connect data and research to real outcomes' },
  { icon: Lightbulb, label: 'Policy', desc: 'Evidence-based policy proposals with clear implementation pathways' },
  { icon: TrendingUp, label: 'Impact', desc: 'Measurable improvements in land governance and rural livelihoods' },
];

export default function About() {
  return (
    <div className="animate-fade-in">
      <div className="bg-forest-800 text-cream-50 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-bold sm:text-4xl">About BhoomiSetu</h1>
          <p className="mt-2 text-cream-200 max-w-2xl">
            A national digital platform for research, policy innovation, and evidence-based land governance.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-12">
        {/* Mission */}
        <section className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-700 text-cream-50">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-navy-900">भूमि सेतु</h2>
                <p className="text-xs text-navy-400">BhoomiSetu — Bridge to Land</p>
              </div>
            </div>
            <p className="text-sm text-navy-600 leading-relaxed">
              BhoomiSetu is a prototype national digital platform that connects research, data, and evidence
              to support better land governance and rural development policy in India. The platform addresses
              the fragmentation of land governance knowledge — where research findings, government datasets,
              and policy discussions exist in silos, preventing evidence from reaching decision-makers.
            </p>
            <p className="mt-4 text-sm text-navy-600 leading-relaxed">
              By unifying these elements in a single, accessible platform, BhoomiSetu enables policymakers,
              researchers, and citizens to trace the full chain from data through research to evidence and
              policy impact — making land governance more transparent, accountable, and effective.
            </p>
          </div>
          <div className="card">
            <h3 className="text-sm font-bold text-navy-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-forest-700" /> Platform Objectives
            </h3>
            <ul className="space-y-3">
              {objectives.map((obj) => (
                <li key={obj} className="flex items-start gap-2 text-sm text-navy-700">
                  <CheckCircle2 className="w-4 h-4 text-forest-600 mt-0.5 shrink-0" />
                  {obj}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Flow */}
        <section>
          <div className="text-center mb-8">
            <h2 className="section-title">The Evidence-to-Impact Chain</h2>
            <p className="section-subtitle">How BhoomiSetu transforms knowledge into action</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {flowSteps.map((step, i) => (
              <div key={step.label} className="card text-center relative">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-forest-50">
                  <step.icon className="w-6 h-6 text-forest-700" />
                </div>
                <span className="absolute top-2 right-3 text-xs font-bold text-forest-200">0{i + 1}</span>
                <h3 className="mt-3 text-sm font-bold text-navy-900">{step.label}</h3>
                <p className="mt-1 text-xs text-navy-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Evidence Matrix */}
        <section>
          <div className="text-center mb-8">
            <h2 className="section-title">Evidence Matrix in Action</h2>
            <p className="section-subtitle">A concrete example of how the chain works</p>
          </div>
          <EvidenceMatrix />
        </section>

        {/* Roles */}
        <section>
          <h2 className="section-title text-center">User Roles</h2>
          <p className="section-subtitle text-center">Three simple roles with clear purpose</p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              { title: 'Citizen', desc: 'Access land governance information, explore case studies, and learn about land rights through the Knowledge Centre.' },
              { title: 'Researcher', desc: 'Browse and save research papers, access datasets, and submit research findings to the platform.' },
              { title: 'Admin', desc: 'Manage platform content, review submitted research, and maintain data quality across the platform.' },
            ].map((role) => (
              <div key={role.title} className="card text-center">
                <h3 className="text-base font-bold text-forest-800">{role.title}</h3>
                <p className="mt-2 text-sm text-navy-500">{role.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Prototype notice */}
        <section className="rounded-xl bg-saffron-50 border border-saffron-200 p-6 flex items-start gap-3">
          <Info className="w-6 h-6 text-saffron-600 shrink-0" />
          <div>
            <h3 className="text-sm font-bold text-saffron-800">Prototype / Demonstration Notice</h3>
            <p className="mt-1 text-sm text-saffron-700">
              BhoomiSetu is a hackathon prototype. All data, research, policy proposals, and AI responses are
              demo content created for demonstration purposes. This is not an official government platform,
              and the policy innovations shown are not actual government policies.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
