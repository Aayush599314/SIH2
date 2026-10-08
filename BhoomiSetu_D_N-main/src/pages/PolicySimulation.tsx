import { useState, useEffect, useCallback } from 'react';
import {
  Sliders,
  TrendingUp,
  Users,
  DollarSign,
  Wheat,
  AlertTriangle,
  Building2,
  ArrowRight,
  RotateCcw,
  Info,
} from 'lucide-react';

/* ── Slider configuration ──────────────────────────────────── */
interface SliderConfig {
  id: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  icon: typeof Sliders;
  description: string;
}

const sliders: SliderConfig[] = [
  {
    id: 'urbanExpansion',
    label: 'Urban Expansion Rate',
    unit: '%',
    min: 0,
    max: 30,
    step: 1,
    defaultValue: 8,
    icon: Building2,
    description: 'Annual rate of urban boundary expansion into surrounding land',
  },
  {
    id: 'bufferZone',
    label: 'Agricultural Buffer Zone',
    unit: 'km',
    min: 0.5,
    max: 15,
    step: 0.5,
    defaultValue: 5,
    icon: Wheat,
    description: 'Minimum protected distance between urban boundary and prime agricultural land',
  },
  {
    id: 'compensationMultiplier',
    label: 'Compensation Multiplier',
    unit: '×',
    min: 1,
    max: 5,
    step: 0.25,
    defaultValue: 2,
    icon: DollarSign,
    description: 'Multiplier applied to market value for land acquisition compensation',
  },
];

/* ── Simulation engine (pure math, no API) ─────────────────── */
interface SimResults {
  projectedDisplacement: number;
  budgetRequired: number;
  foodSecurityScore: number;
  rehabilitationCost: number;
  landAreaAffected: number;
  environmentalRisk: 'Low' | 'Moderate' | 'High' | 'Critical';
}

function computeResults(
  urbanExpansion: number,
  bufferZone: number,
  compensationMultiplier: number,
): SimResults {
  // Base population density ~400 people/sq km in peri-urban India
  const baseDensity = 400;
  // Urban expansion drives displacement proportionally
  const landAreaAffected = Math.round((urbanExpansion / 100) * 2500 * (15 / Math.max(bufferZone, 0.5)));
  const projectedDisplacement = Math.round(baseDensity * (landAreaAffected / 100) * (urbanExpansion / 5));

  // Budget = area * base cost * compensation multiplier
  const baseCostPerHectareCr = 1.2; // crore per hectare
  const budgetRequired = Math.round(landAreaAffected * baseCostPerHectareCr * compensationMultiplier);

  // Food security inversely related to land loss and directly to buffer
  const foodSecurityScore = Math.max(
    0,
    Math.min(100, Math.round(85 - urbanExpansion * 2.5 + bufferZone * 1.5)),
  );

  // Rehab = displaced people * per capita cost
  const rehabilitationCost = Math.round(projectedDisplacement * 0.008 * compensationMultiplier);

  // Risk classification
  let environmentalRisk: SimResults['environmentalRisk'] = 'Low';
  if (urbanExpansion > 20 || bufferZone < 2) environmentalRisk = 'Critical';
  else if (urbanExpansion > 14 || bufferZone < 4) environmentalRisk = 'High';
  else if (urbanExpansion > 8 || bufferZone < 6) environmentalRisk = 'Moderate';

  return {
    projectedDisplacement,
    budgetRequired,
    foodSecurityScore,
    rehabilitationCost,
    landAreaAffected,
    environmentalRisk,
  };
}

/* ── Component ─────────────────────────────────────────────── */
export default function PolicySimulation() {
  const [values, setValues] = useState({
    urbanExpansion: 8,
    bufferZone: 5,
    compensationMultiplier: 2,
  });
  const [results, setResults] = useState<SimResults>(() =>
    computeResults(8, 5, 2),
  );
  const [animating, setAnimating] = useState(false);

  // Recompute on slider change
  useEffect(() => {
    setAnimating(true);
    const timeout = setTimeout(() => setAnimating(false), 400);
    setResults(
      computeResults(values.urbanExpansion, values.bufferZone, values.compensationMultiplier),
    );
    return () => clearTimeout(timeout);
  }, [values]);

  const handleSlider = useCallback((id: string, value: number) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  }, []);

  const resetDefaults = () => {
    setValues({ urbanExpansion: 8, bufferZone: 5, compensationMultiplier: 2 });
  };

  const riskColor = {
    Low: 'text-forest-600 bg-forest-50',
    Moderate: 'text-saffron-700 bg-saffron-50',
    High: 'text-red-600 bg-red-50',
    Critical: 'text-red-700 bg-red-100',
  };

  // Food-security score colour
  const fsColor =
    results.foodSecurityScore >= 70
      ? 'text-forest-700'
      : results.foodSecurityScore >= 45
        ? 'text-saffron-600'
        : 'text-red-600';

  return (
    <div className="animate-fade-in">
      {/* ── Hero ───────────────────────────────────────────── */}
      <div className="bg-forest-800 text-cream-50 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-saffron-500/20 px-3 py-1 text-xs font-medium text-saffron-200 ring-1 ring-saffron-400/30 mb-4">
            <Sliders className="w-3.5 h-3.5" /> Policy & Research Hub
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl">Policy Simulation Lab</h1>
          <p className="mt-2 text-cream-200 max-w-2xl">
            Explore "What-If" scenarios by adjusting policy levers. See projected impacts on
            displacement, budgets, and food security — powered entirely by a mathematical model.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Info callout */}
        <div className="mb-6 flex items-start gap-3 rounded-xl bg-forest-50 border border-forest-200 p-4">
          <Info className="w-5 h-5 text-forest-600 mt-0.5 shrink-0" />
          <div className="text-sm text-forest-800">
            <span className="font-semibold">Prototype Model:</span> This simulation uses a
            simplified mathematical engine with representative parameters. Production deployment
            would integrate actual geospatial datasets, census data, and econometric models from NITI
            Aayog and the Ministry of Rural Development.
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* ── Left: sliders panel ────────────────────────── */}
          <div className="lg:col-span-2 space-y-4">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-navy-900 font-serif">Policy Levers</h2>
                <button onClick={resetDefaults} className="btn-ghost text-xs">
                  <RotateCcw className="w-3.5 h-3.5" /> Reset
                </button>
              </div>

              <div className="space-y-6">
                {sliders.map((s) => {
                  const Icon = s.icon;
                  const val = values[s.id as keyof typeof values];
                  // Progress percentage for the track fill
                  const pct = ((val - s.min) / (s.max - s.min)) * 100;
                  return (
                    <div key={s.id}>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-forest-50">
                          <Icon className="w-4 h-4 text-forest-700" />
                        </div>
                        <label className="text-sm font-semibold text-navy-800">{s.label}</label>
                      </div>
                      <p className="text-xs text-navy-400 mb-2 ml-9">{s.description}</p>
                      <div className="ml-9">
                        <div className="flex items-center gap-3">
                          <div className="relative flex-1">
                            <input
                              type="range"
                              min={s.min}
                              max={s.max}
                              step={s.step}
                              value={val}
                              onChange={(e) => handleSlider(s.id, parseFloat(e.target.value))}
                              className="w-full h-2 rounded-full appearance-none cursor-pointer"
                              style={{
                                background: `linear-gradient(to right, #2c6144 0%, #2c6144 ${pct}%, #dcd6c4 ${pct}%, #dcd6c4 100%)`,
                              }}
                            />
                          </div>
                          <span className="min-w-[56px] text-right text-sm font-bold text-forest-800 tabular-nums">
                            {val}{s.unit}
                          </span>
                        </div>
                        <div className="flex justify-between text-[10px] text-navy-400 mt-0.5">
                          <span>{s.min}{s.unit}</span>
                          <span>{s.max}{s.unit}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scenario quick-presets */}
            <div className="card">
              <h3 className="text-sm font-bold text-navy-900 mb-3">Quick Scenarios</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setValues({ urbanExpansion: 5, bufferZone: 10, compensationMultiplier: 2.5 })}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-navy-700 hover:bg-forest-50 transition-all border border-forest-900/10"
                >
                  <span className="font-medium text-forest-700">🌿 Conservative Growth</span>
                  <span className="block text-xs text-navy-400 mt-0.5">Low expansion, wide buffers, fair compensation</span>
                </button>
                <button
                  onClick={() => setValues({ urbanExpansion: 18, bufferZone: 2, compensationMultiplier: 1.5 })}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-navy-700 hover:bg-forest-50 transition-all border border-forest-900/10"
                >
                  <span className="font-medium text-saffron-700">🏗️ Aggressive Urbanization</span>
                  <span className="block text-xs text-navy-400 mt-0.5">High expansion, tight buffers, lower compensation</span>
                </button>
                <button
                  onClick={() => setValues({ urbanExpansion: 10, bufferZone: 7, compensationMultiplier: 3.5 })}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-navy-700 hover:bg-forest-50 transition-all border border-forest-900/10"
                >
                  <span className="font-medium text-navy-700">⚖️ Balanced Policy</span>
                  <span className="block text-xs text-navy-400 mt-0.5">Moderate expansion with generous rehabilitation</span>
                </button>
              </div>
            </div>
          </div>

          {/* ── Right: impact results ──────────────────────── */}
          <div className="lg:col-span-3 space-y-4">
            <div className="card">
              <div className="flex items-center gap-2 mb-1">
                <ArrowRight className="w-4 h-4 text-saffron-500" />
                <h2 className="text-lg font-bold text-navy-900 font-serif">Impact Results</h2>
              </div>
              <p className="text-xs text-navy-400 mb-5">Projected outcomes based on current lever settings</p>

              {/* KPI cards */}
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {/* Displacement */}
                <div className={`rounded-xl border border-forest-900/10 p-4 bg-white transition-all duration-300 ${animating ? 'scale-[0.98] opacity-80' : 'scale-100 opacity-100'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-saffron-50">
                      <Users className="w-4 h-4 text-saffron-600" />
                    </div>
                    <span className="text-xs text-navy-400">Projected Displacement</span>
                  </div>
                  <p className="text-2xl font-bold text-navy-900 tabular-nums">
                    {results.projectedDisplacement.toLocaleString()}
                  </p>
                  <p className="text-[11px] text-navy-400 mt-1">families affected</p>
                </div>

                {/* Budget */}
                <div className={`rounded-xl border border-forest-900/10 p-4 bg-white transition-all duration-300 ${animating ? 'scale-[0.98] opacity-80' : 'scale-100 opacity-100'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest-50">
                      <DollarSign className="w-4 h-4 text-forest-700" />
                    </div>
                    <span className="text-xs text-navy-400">Budget Required</span>
                  </div>
                  <p className="text-2xl font-bold text-navy-900 tabular-nums">
                    ₹{results.budgetRequired.toLocaleString()} Cr
                  </p>
                  <p className="text-[11px] text-navy-400 mt-1">total acquisition budget</p>
                </div>

                {/* Food Security */}
                <div className={`rounded-xl border border-forest-900/10 p-4 bg-white transition-all duration-300 ${animating ? 'scale-[0.98] opacity-80' : 'scale-100 opacity-100'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest-50">
                      <Wheat className="w-4 h-4 text-forest-600" />
                    </div>
                    <span className="text-xs text-navy-400">Food Security Score</span>
                  </div>
                  <p className={`text-2xl font-bold tabular-nums ${fsColor}`}>
                    {results.foodSecurityScore}/100
                  </p>
                  <p className="text-[11px] text-navy-400 mt-1">regional index</p>
                </div>

                {/* Land Area */}
                <div className={`rounded-xl border border-forest-900/10 p-4 bg-white transition-all duration-300 ${animating ? 'scale-[0.98] opacity-80' : 'scale-100 opacity-100'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-50">
                      <TrendingUp className="w-4 h-4 text-navy-600" />
                    </div>
                    <span className="text-xs text-navy-400">Land Area Affected</span>
                  </div>
                  <p className="text-2xl font-bold text-navy-900 tabular-nums">
                    {results.landAreaAffected.toLocaleString()} ha
                  </p>
                  <p className="text-[11px] text-navy-400 mt-1">hectares under conversion</p>
                </div>

                {/* Rehabilitation */}
                <div className={`rounded-xl border border-forest-900/10 p-4 bg-white transition-all duration-300 ${animating ? 'scale-[0.98] opacity-80' : 'scale-100 opacity-100'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-saffron-50">
                      <Building2 className="w-4 h-4 text-saffron-700" />
                    </div>
                    <span className="text-xs text-navy-400">Rehabilitation Cost</span>
                  </div>
                  <p className="text-2xl font-bold text-navy-900 tabular-nums">
                    ₹{results.rehabilitationCost.toLocaleString()} Cr
                  </p>
                  <p className="text-[11px] text-navy-400 mt-1">R&R package estimate</p>
                </div>

                {/* Environmental Risk */}
                <div className={`rounded-xl border border-forest-900/10 p-4 bg-white transition-all duration-300 ${animating ? 'scale-[0.98] opacity-80' : 'scale-100 opacity-100'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    </div>
                    <span className="text-xs text-navy-400">Environmental Risk</span>
                  </div>
                  <p className="text-xl font-bold">
                    <span className={`badge ${riskColor[results.environmentalRisk]} text-sm`}>
                      {results.environmentalRisk}
                    </span>
                  </p>
                  <p className="text-[11px] text-navy-400 mt-1">ecological impact level</p>
                </div>
              </div>
            </div>

            {/* ── Sensitivity gauges ─────────────────────────── */}
            <div className="card">
              <h3 className="text-sm font-bold text-navy-900 mb-3">Food Security Gauge</h3>
              <div className="w-full bg-cream-200 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${
                    results.foodSecurityScore >= 70
                      ? 'bg-forest-600'
                      : results.foodSecurityScore >= 45
                        ? 'bg-saffron-500'
                        : 'bg-red-500'
                  }`}
                  style={{ width: `${results.foodSecurityScore}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-navy-400 mt-1">
                <span>Critical (0)</span>
                <span>Adequate (50)</span>
                <span>Optimal (100)</span>
              </div>
            </div>

            {/* Budget breakdown visual */}
            <div className="card">
              <h3 className="text-sm font-bold text-navy-900 mb-3">Budget Breakdown Estimate</h3>
              <div className="space-y-3">
                {[
                  {
                    label: 'Land Acquisition',
                    value: Math.round(results.budgetRequired * 0.55),
                    pct: 55,
                    color: 'bg-forest-600',
                  },
                  {
                    label: 'Rehabilitation & Resettlement',
                    value: results.rehabilitationCost,
                    pct: Math.round((results.rehabilitationCost / Math.max(results.budgetRequired, 1)) * 100),
                    color: 'bg-saffron-500',
                  },
                  {
                    label: 'Administrative & Legal',
                    value: Math.round(results.budgetRequired * 0.12),
                    pct: 12,
                    color: 'bg-navy-400',
                  },
                  {
                    label: 'Environmental Mitigation',
                    value: Math.round(results.budgetRequired * 0.08),
                    pct: 8,
                    color: 'bg-forest-400',
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-navy-600 font-medium">{item.label}</span>
                      <span className="text-navy-400 tabular-nums">₹{item.value.toLocaleString()} Cr</span>
                    </div>
                    <div className="w-full bg-cream-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color} transition-all duration-500 ease-out`}
                        style={{ width: `${Math.min(item.pct, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
