import { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from 'recharts';
import { Map as MapIcon, Search, Users, FileText, Scale, Layers, TrendingUp, MapPin } from 'lucide-react';
import IndiaMap from '@/components/IndiaMap';
import { stateData } from '@/lib/data';

export default function LandInsights() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const currentState = useMemo(
    () => stateData.find((s) => s.name === selectedState),
    [selectedState],
  );

  const filteredStates = useMemo(() => {
    if (!search) return stateData;
    return stateData.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.districts.some((d) => d.toLowerCase().includes(search.toLowerCase())),
    );
  }, [search]);

  const indicators = [
    { key: 'landlessHouseholds', label: 'Landless Households', value: currentState ? `${currentState.indicators.landlessHouseholds}%` : '—', icon: Users, color: 'text-saffron-600', bg: 'bg-saffron-50' },
    { key: 'landRecordDigitized', label: 'Records Digitized', value: currentState ? `${currentState.indicators.landRecordDigitized}%` : '—', icon: FileText, color: 'text-forest-700', bg: 'bg-forest-50' },
    { key: 'disputeCases', label: 'Dispute Cases', value: currentState ? currentState.indicators.disputeCases.toLocaleString() : '—', icon: Scale, color: 'text-red-600', bg: 'bg-red-50' },
    { key: 'avgLandholding', label: 'Avg. Landholding (ha)', value: currentState ? `${currentState.indicators.avgLandholding}` : '—', icon: Layers, color: 'text-navy-600', bg: 'bg-navy-50' },
    { key: 'womenLandOwnership', label: "Women's Ownership", value: currentState ? `${currentState.indicators.womenLandOwnership}%` : '—', icon: Users, color: 'text-forest-600', bg: 'bg-forest-50' },
    { key: 'tribalLandClaims', label: 'Tribal Land Claims', value: currentState ? currentState.indicators.tribalLandClaims.toLocaleString() : '—', icon: TrendingUp, color: 'text-saffron-700', bg: 'bg-saffron-50' },
  ];

  const radialData = currentState
    ? [{ name: 'Digitization', value: currentState.indicators.landRecordDigitized, fill: '#2c6144' }]
    : [];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-forest-800 text-cream-50 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-saffron-500/20 px-3 py-1 text-xs font-medium text-saffron-200 ring-1 ring-saffron-400/30 mb-4">
            <MapIcon className="w-3.5 h-3.5" /> Key Feature · Interactive Map
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl">Land Insights</h1>
          <p className="mt-2 text-cream-200 max-w-2xl">
            Explore state and district-level land governance indicators across India.
            Click on a state to view detailed statistics, trends, and comparisons.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Search */}
        <div className="mb-6 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
          <input
            type="text"
            placeholder="Search states or districts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Map */}
          <div className="lg:col-span-3">
            <div className="card">
              <h2 className="text-lg font-bold text-navy-900 mb-1">India Land Governance Map</h2>
              <p className="text-xs text-navy-400 mb-4">Click a state to view indicators · Color intensity = digitization level</p>
              <IndiaMap
                selectedState={selectedState}
                onSelectState={(name) => {
                  setSelectedState(name);
                  setSelectedDistrict(null);
                }}
              />
            </div>
          </div>

          {/* State list + details */}
          <div className="lg:col-span-2 space-y-4">
            {/* State selector list */}
            <div className="card max-h-[300px] overflow-y-auto">
              <h3 className="text-sm font-bold text-navy-900 mb-3">States ({filteredStates.length})</h3>
              <div className="space-y-1">
                {filteredStates.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedState(s.name);
                      setSelectedDistrict(null);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedState === s.name
                        ? 'bg-forest-700 text-cream-50 font-medium'
                        : 'text-navy-700 hover:bg-forest-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{s.name}</span>
                      <span className={`text-xs ${selectedState === s.name ? 'text-cream-200' : 'text-navy-400'}`}>
                        {s.indicators.landRecordDigitized}%
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* District selector */}
            {currentState && (
              <div className="card animate-fade-in">
                <h3 className="text-sm font-bold text-navy-900 mb-1">Districts in {currentState.name}</h3>
                <p className="text-xs text-navy-400 mb-3">Select a district for location overview</p>
                <div className="flex flex-wrap gap-1.5">
                  {currentState.districts.map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDistrict(d)}
                      className={`badge cursor-pointer transition-all ${
                        selectedDistrict === d
                          ? 'bg-forest-700 text-cream-50'
                          : 'bg-cream-100 text-navy-600 hover:bg-forest-50'
                      }`}
                    >
                      <MapPin className="w-3 h-3" /> {d}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Indicators + Charts */}
        {currentState ? (
          <div className="mt-8 space-y-6 animate-fade-in">
            {/* Location overview */}
            {selectedDistrict && (
              <div className="rounded-xl bg-gradient-to-r from-forest-50 to-cream-100 border border-forest-900/10 p-5">
                <div className="flex items-center gap-2 text-forest-800">
                  <MapPin className="w-5 h-5" />
                  <h3 className="text-lg font-bold">{selectedDistrict}, {currentState.name}</h3>
                </div>
                <p className="mt-2 text-sm text-navy-600">
                  District-level overview for {selectedDistrict}. Data shown below represents state-level
                  aggregates as this is a prototype demonstration. In production, district-level data would
                  be sourced from state revenue departments and the DILRMP programme.
                </p>
              </div>
            )}

            {/* Indicator cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {indicators.map((ind) => {
                const Icon = ind.icon;
                return (
                  <div key={ind.key} className="card p-4 text-center">
                    <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-lg ${ind.bg}`}>
                      <Icon className={`w-5 h-5 ${ind.color}`} />
                    </div>
                    <p className="mt-2 text-lg font-bold text-navy-900">{ind.value}</p>
                    <p className="text-xs text-navy-400 mt-0.5">{ind.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Trend chart */}
              <div className="card">
                <h3 className="text-sm font-bold text-navy-900 mb-1">Digitization & Dispute Trends (2020-2024)</h3>
                <p className="text-xs text-navy-400 mb-4">5-year progress for {currentState.name}</p>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={currentState.trend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e8edf2" />
                    <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#5a72a0' }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 12, fill: '#5a72a0' }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: '#5a72a0' }} />
                    <Tooltip
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e8edf2', fontSize: '12px' }}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="digitized"
                      stroke="#2c6144"
                      strokeWidth={2.5}
                      name="% Digitized"
                      dot={{ r: 4, fill: '#2c6144' }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="disputes"
                      stroke="#e8891a"
                      strokeWidth={2.5}
                      name="Dispute Cases"
                      dot={{ r: 4, fill: '#e8891a' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Radial digitization */}
              <div className="card">
                <h3 className="text-sm font-bold text-navy-900 mb-1">Digitization Score</h3>
                <p className="text-xs text-navy-400 mb-4">{currentState.name} — land records digitized</p>
                <ResponsiveContainer width="100%" height={280}>
                  <RadialBarChart
                    data={radialData}
                    innerRadius="60%"
                    outerRadius="90%"
                    startAngle={90}
                    endAngle={-270}
                  >
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                    <RadialBar background dataKey="value" cornerRadius={10} />
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-navy-900 font-bold"
                      style={{ fontSize: '28px' }}
                    >
                      {currentState.indicators.landRecordDigitized}%
                    </text>
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Comparison bar chart */}
            <div className="card">
              <h3 className="text-sm font-bold text-navy-900 mb-1">State Comparison — Key Indicators</h3>
              <p className="text-xs text-navy-400 mb-4">{currentState.name} vs national sample</p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={stateData.map((s) => ({
                    name: s.name,
                    digitized: s.indicators.landRecordDigitized,
                    highlighted: s.name === currentState.name,
                  }))}
                  layout="vertical"
                  margin={{ left: 80 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8edf2" />
                  <XAxis type="number" tick={{ fontSize: 12, fill: '#5a72a0' }} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 11, fill: '#5a72a0' }}
                    width={80}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e8edf2', fontSize: '12px' }}
                  />
                  <Bar dataKey="digitized" radius={[0, 4, 4, 0]}>
                    {stateData.map((s) => (
                      <Cell
                        key={s.id}
                        fill={s.name === currentState.name ? '#2c6144' : '#8fba9e'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="mt-8 card text-center py-16">
            <MapIcon className="w-12 h-12 text-forest-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-navy-700">Select a State to Begin</h3>
            <p className="text-sm text-navy-400 mt-1">
              Click on the map or choose from the state list to view detailed indicators and charts
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
