import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  FileText,
  AlertTriangle,
  CheckCircle,
  Activity,
  Globe,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  BookOpen,
} from 'lucide-react';

/* ── Static mock data ──────────────────────────────────────── */
const kpiCards = [
  {
    title: 'Active Research Papers',
    value: '2,847',
    change: '+12.4%',
    trend: 'up' as const,
    icon: FileText,
    color: 'text-forest-700',
    bg: 'bg-forest-50',
    description: 'peer-reviewed studies indexed',
  },
  {
    title: 'Policies Analyzed',
    value: '438',
    change: '+8.2%',
    trend: 'up' as const,
    icon: CheckCircle,
    color: 'text-saffron-600',
    bg: 'bg-saffron-50',
    description: 'central & state land policies',
  },
  {
    title: 'High-Risk Zones',
    value: '67',
    change: '-3.1%',
    trend: 'down' as const,
    icon: AlertTriangle,
    color: 'text-red-600',
    bg: 'bg-red-50',
    description: 'districts flagged for conflict',
  },
  {
    title: 'States Onboarded',
    value: '24',
    change: '+4 new',
    trend: 'up' as const,
    icon: Globe,
    color: 'text-navy-600',
    bg: 'bg-navy-50',
    description: 'integrated with platform',
  },
];

const policyAdoptionData = [
  { year: '2020', Central: 12, State: 28 },
  { year: '2021', Central: 18, State: 35 },
  { year: '2022', Central: 24, State: 52 },
  { year: '2023', Central: 31, State: 68 },
  { year: '2024', Central: 38, State: 89 },
  { year: '2025', Central: 45, State: 112 },
  { year: '2026', Central: 52, State: 134 },
];

const researchByDomainData = [
  { domain: 'Land Rights', papers: 520, fill: '#2c6144' },
  { domain: 'Agriculture', papers: 435, fill: '#3d7a56' },
  { domain: 'Urban Planning', papers: 380, fill: '#5e9774' },
  { domain: 'Tribal Affairs', papers: 310, fill: '#e8891a' },
  { domain: 'Revenue & Tax', papers: 290, fill: '#425c8a' },
  { domain: 'Demographics', papers: 265, fill: '#8fba9e' },
  { domain: 'Environmental', papers: 210, fill: '#f2a72f' },
];

const complianceByState = [
  { name: 'Maharashtra', value: 92 },
  { name: 'Karnataka', value: 87 },
  { name: 'Tamil Nadu', value: 84 },
  { name: 'Rajasthan', value: 76 },
  { name: 'Odisha', value: 71 },
  { name: 'Bihar', value: 58 },
];

const pieData = [
  { name: 'Completed', value: 312, color: '#2c6144' },
  { name: 'In Progress', value: 87, color: '#e8891a' },
  { name: 'Under Review', value: 39, color: '#5a72a0' },
];

const recentActivities = [
  {
    text: 'New land acquisition policy draft uploaded for Madhya Pradesh',
    time: '2 hours ago',
    type: 'policy',
  },
  {
    text: 'Research paper on women land ownership in Kerala published',
    time: '5 hours ago',
    type: 'research',
  },
  {
    text: 'High-risk zone alert resolved for Visakhapatnam district',
    time: '1 day ago',
    type: 'alert',
  },
  {
    text: 'Policy simulation model updated with 2026 Census estimates',
    time: '2 days ago',
    type: 'update',
  },
  {
    text: 'Bihar state government onboarded to the platform',
    time: '3 days ago',
    type: 'milestone',
  },
];

/* ── Component ─────────────────────────────────────────────── */
export default function GovernanceInsights() {
  return (
    <div className="animate-fade-in">
      {/* ── Hero ──────────────────────────────────────────── */}
      <div className="bg-forest-800 text-cream-50 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-saffron-500/20 px-3 py-1 text-xs font-medium text-saffron-200 ring-1 ring-saffron-400/30 mb-4">
            <BarChart3 className="w-3.5 h-3.5" /> Policy & Research Hub
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl">Governance Insights Dashboard</h1>
          <p className="mt-2 text-cream-200 max-w-2xl">
            Evidence-based analytics on land governance performance, research activity, and policy
            adoption metrics across India.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* ── KPI cards ───────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpiCards.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.title} className="card hover:shadow-lift group">
                <div className="flex items-start justify-between">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${kpi.bg} transition-transform group-hover:scale-105`}>
                    <Icon className={`w-5 h-5 ${kpi.color}`} />
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold ${
                      kpi.trend === 'up' ? 'text-forest-600' : 'text-red-500'
                    }`}
                  >
                    {kpi.trend === 'up' ? (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    )}
                    {kpi.change}
                  </span>
                </div>
                <p className="mt-4 text-2xl font-bold text-navy-900 tabular-nums">{kpi.value}</p>
                <p className="text-sm font-semibold text-navy-700 mt-0.5">{kpi.title}</p>
                <p className="text-xs text-navy-400 mt-0.5">{kpi.description}</p>
              </div>
            );
          })}
        </div>

        {/* ── Charts Row 1 ────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Policy Adoption over Time */}
          <div className="card">
            <h3 className="text-sm font-bold text-navy-900 mb-1">Policy Adoption Over Time</h3>
            <p className="text-xs text-navy-400 mb-4">
              Central and State-level policies formalized per year
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={policyAdoptionData}>
                <defs>
                  <linearGradient id="gradCentral" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2c6144" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2c6144" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradState" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e8891a" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#e8891a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8edf2" />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#5a72a0' }} />
                <YAxis tick={{ fontSize: 12, fill: '#5a72a0' }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e8edf2',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="Central"
                  stroke="#2c6144"
                  strokeWidth={2.5}
                  fill="url(#gradCentral)"
                  dot={{ r: 4, fill: '#2c6144' }}
                />
                <Area
                  type="monotone"
                  dataKey="State"
                  stroke="#e8891a"
                  strokeWidth={2.5}
                  fill="url(#gradState)"
                  dot={{ r: 4, fill: '#e8891a' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Research by Domain */}
          <div className="card">
            <h3 className="text-sm font-bold text-navy-900 mb-1">Research by Domain</h3>
            <p className="text-xs text-navy-400 mb-4">
              Papers published across land governance research areas
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={researchByDomainData} layout="vertical" margin={{ left: 80 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8edf2" />
                <XAxis type="number" tick={{ fontSize: 12, fill: '#5a72a0' }} />
                <YAxis
                  type="category"
                  dataKey="domain"
                  tick={{ fontSize: 11, fill: '#5a72a0' }}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e8edf2',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="papers" radius={[0, 4, 4, 0]}>
                  {researchByDomainData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Charts Row 2 ────────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* State compliance scores */}
          <div className="card lg:col-span-1">
            <h3 className="text-sm font-bold text-navy-900 mb-1">Policy Compliance Scores</h3>
            <p className="text-xs text-navy-400 mb-4">Top states by LARR Act adherence</p>
            <div className="space-y-3">
              {complianceByState.map((state) => (
                <div key={state.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-navy-700">{state.name}</span>
                    <span className="text-navy-400 tabular-nums font-semibold">{state.value}%</span>
                  </div>
                  <div className="w-full bg-cream-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ease-out ${
                        state.value >= 80
                          ? 'bg-forest-600'
                          : state.value >= 65
                            ? 'bg-saffron-500'
                            : 'bg-red-500'
                      }`}
                      style={{ width: `${state.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pie chart */}
          <div className="card lg:col-span-1">
            <h3 className="text-sm font-bold text-navy-900 mb-1">Policy Analysis Status</h3>
            <p className="text-xs text-navy-400 mb-4">Current pipeline of policy evaluations</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e8edf2',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              {pieData.map((d) => (
                <div key={d.name} className="flex items-center gap-1.5 text-xs text-navy-600">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  {d.name} ({d.value})
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity feed */}
          <div className="card lg:col-span-1">
            <h3 className="text-sm font-bold text-navy-900 mb-1">Recent Activity</h3>
            <p className="text-xs text-navy-400 mb-4">Latest platform events</p>
            <div className="space-y-3">
              {recentActivities.map((act, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                      act.type === 'policy'
                        ? 'bg-forest-50'
                        : act.type === 'research'
                          ? 'bg-saffron-50'
                          : act.type === 'alert'
                            ? 'bg-red-50'
                            : 'bg-navy-50'
                    }`}
                  >
                    {act.type === 'policy' ? (
                      <FileText className="w-3.5 h-3.5 text-forest-600" />
                    ) : act.type === 'research' ? (
                      <BookOpen className="w-3.5 h-3.5 text-saffron-600" />
                    ) : act.type === 'alert' ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                    ) : (
                      <Activity className="w-3.5 h-3.5 text-navy-500" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-navy-700 leading-snug">{act.text}</p>
                    <p className="text-[10px] text-navy-400 mt-0.5">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Summary banner ──────────────────────────────── */}
        <div className="rounded-xl bg-gradient-to-r from-forest-800 to-navy-800 p-6 text-cream-50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold font-serif">Platform Overview</h3>
              <p className="text-sm text-cream-200 mt-1 max-w-xl">
                BhoomiSetu's Governance Insights Dashboard aggregates data from 24 states,
                2,847 research papers, and 438 policy documents to provide evidence-based land
                governance intelligence for policymakers and researchers.
              </p>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-saffron-300 tabular-nums">99.2%</p>
                <p className="text-xs text-cream-300">Uptime</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-saffron-300 tabular-nums">1.2M</p>
                <p className="text-xs text-cream-300">Data Points</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-saffron-300 tabular-nums">156</p>
                <p className="text-xs text-cream-300">Contributors</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
