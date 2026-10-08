import { useState, useEffect } from 'react';
import {
  AlertCircle,
  FileSearch,
  Database,
  CheckCircle2,
  Lightbulb,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import { evidenceNodes } from '@/lib/data';
import type { EvidenceNode } from '@/lib/types';

const nodeConfig: Record<EvidenceNode['type'], { icon: typeof AlertCircle; color: string; bg: string; ring: string }> = {
  problem: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50', ring: 'ring-red-200' },
  research: { icon: FileSearch, color: 'text-navy-600', bg: 'bg-navy-50', ring: 'ring-navy-200' },
  data: { icon: Database, color: 'text-saffron-600', bg: 'bg-saffron-50', ring: 'ring-saffron-200' },
  evidence: { icon: CheckCircle2, color: 'text-forest-700', bg: 'bg-forest-50', ring: 'ring-forest-200' },
  policy: { icon: Lightbulb, color: 'text-saffron-700', bg: 'bg-saffron-50', ring: 'ring-saffron-200' },
  impact: { icon: TrendingUp, color: 'text-forest-800', bg: 'bg-forest-100', ring: 'ring-forest-300' },
};

export default function EvidenceMatrix() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % evidenceNodes.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  return (
    <div className="w-full">
      {/* Horizontal flow on desktop */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Connecting line */}
          <svg className="absolute top-12 left-0 w-full h-2 pointer-events-none" style={{ zIndex: 0 }}>
            <line
              x1="8%"
              y1="0"
              x2="92%"
              y2="0"
              stroke="#bbd7c3"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
          </svg>

          <div className="flex justify-between items-start relative" style={{ zIndex: 1 }}>
            {evidenceNodes.map((node, i) => {
              const config = nodeConfig[node.type];
              const Icon = config.icon;
              const isActive = i === activeIndex;
              return (
                <div key={node.id} className="flex flex-col items-center w-[15%]">
                  <button
                    onClick={() => {
                      setActiveIndex(i);
                      setAutoPlay(false);
                    }}
                    className={`relative flex h-24 w-24 items-center justify-center rounded-2xl ring-2 transition-all duration-300 ${
                      isActive ? `scale-110 ${config.bg} ${config.ring}` : 'bg-white ring-forest-900/10'
                    }`}
                  >
                    <Icon className={`w-10 h-10 ${isActive ? config.color : 'text-navy-300'}`} />
                    {i < evidenceNodes.length - 1 && (
                      <ArrowRight className="absolute -right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-forest-300" />
                    )}
                  </button>
                  <span className={`mt-3 text-xs font-semibold uppercase tracking-wide ${isActive ? config.color : 'text-navy-400'}`}>
                    {node.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="mt-8 rounded-xl border border-forest-900/10 bg-white p-6 shadow-soft animate-fade-in" key={activeIndex}>
            {(() => {
              const node = evidenceNodes[activeIndex];
              const config = nodeConfig[node.type];
              const Icon = config.icon;
              return (
                <div className="flex gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${config.bg}`}>
                    <Icon className={`w-6 h-6 ${config.color}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold uppercase tracking-wider ${config.color}`}>{node.label}</span>
                      <span className="text-xs text-navy-400">Step {activeIndex + 1} of {evidenceNodes.length}</span>
                    </div>
                    <h3 className="mt-1 text-lg font-bold text-navy-900">{node.title}</h3>
                    <p className="mt-2 text-sm text-navy-600 leading-relaxed">{node.description}</p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Vertical flow on mobile */}
      <div className="lg:hidden space-y-3">
        {evidenceNodes.map((node, i) => {
          const config = nodeConfig[node.type];
          const Icon = config.icon;
          const isActive = i === activeIndex;
          return (
            <div key={node.id}>
              <button
                onClick={() => {
                  setActiveIndex(i);
                  setAutoPlay(false);
                }}
                className={`w-full flex items-start gap-3 rounded-xl p-4 ring-2 transition-all ${
                  isActive ? `${config.bg} ${config.ring}` : 'bg-white ring-forest-900/10'
                }`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${isActive ? config.bg : 'bg-cream-100'}`}>
                  <Icon className={`w-5 h-5 ${isActive ? config.color : 'text-navy-400'}`} />
                </div>
                <div className="text-left">
                  <span className={`text-xs font-bold uppercase ${config.color}`}>{node.label}</span>
                  <p className={`text-sm font-semibold mt-0.5 ${isActive ? 'text-navy-900' : 'text-navy-600'}`}>
                    {node.title}
                  </p>
                  {isActive && <p className="text-xs text-navy-500 mt-1">{node.description}</p>}
                </div>
              </button>
              {i < evidenceNodes.length - 1 && (
                <div className="flex justify-center py-1">
                  <ArrowRight className="w-4 h-4 text-forest-300 rotate-90" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
