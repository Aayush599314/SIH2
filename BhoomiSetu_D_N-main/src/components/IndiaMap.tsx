import { useState } from 'react';
import { stateData } from '@/lib/data';
import type { StateData } from '@/lib/types';

interface IndiaMapProps {
  selectedState: string | null;
  onSelectState: (stateName: string) => void;
}

// Simplified India state map with hoverable regions
export default function IndiaMap({ selectedState, onSelectState }: IndiaMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  // Simplified SVG paths representing India states (approximate shapes)
  const statePaths: { id: string; name: string; d: string }[] = [
    { id: 's1', name: 'Maharashtra', d: 'M220,260 L290,255 L320,270 L340,300 L335,340 L310,360 L280,365 L250,350 L225,320 L210,290 Z' },
    { id: 's2', name: 'Madhya Pradesh', d: 'M260,200 L330,195 L360,210 L365,245 L340,260 L290,255 L220,260 L215,230 L240,210 Z' },
    { id: 's3', name: 'Karnataka', d: 'M240,360 L280,365 L310,360 L315,400 L295,430 L260,425 L235,400 L230,380 Z' },
    { id: 's4', name: 'Rajasthan', d: 'M180,140 L260,135 L270,200 L260,210 L215,230 L185,220 L165,190 L170,160 Z' },
    { id: 's5', name: 'Uttar Pradesh', d: 'M300,120 L390,115 L400,160 L380,195 L330,195 L260,200 L270,170 L285,140 Z' },
    { id: 's6', name: 'Telangana', d: 'M310,360 L340,300 L370,310 L380,350 L370,380 L340,385 L315,400 Z' },
    { id: 's7', name: 'Jharkhand', d: 'M390,195 L440,190 L450,225 L430,250 L395,245 L380,220 Z' },
    { id: 's8', name: 'Odisha', d: 'M395,245 L450,225 L480,250 L475,300 L440,320 L400,310 L380,280 L390,260 Z' },
    { id: 's9', name: 'Chhattisgarh', d: 'M340,260 L395,245 L400,310 L380,350 L370,310 L365,270 Z' },
    { id: 's10', name: 'West Bengal', d: 'M450,170 L490,165 L505,220 L490,260 L460,250 L450,225 L448,200 Z' },
    { id: 's11', name: 'Tamil Nadu', d: 'M260,430 L295,430 L310,460 L300,490 L270,490 L255,470 L250,445 Z' },
    { id: 's12', name: 'Bihar', d: 'M390,115 L450,110 L455,160 L440,175 L400,160 L390,140 Z' },
  ];

  const getColor = (state: StateData) => {
    if (selectedState === state.name) return '#2c6144';
    if (hovered === state.name) return '#5e9774';
    const intensity = state.indicators.landRecordDigitized / 100;
    const r = Math.round(220 - intensity * 180);
    const g = Math.round(230 - intensity * 60);
    const b = Math.round(220 - intensity * 170);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const hoveredState = stateData.find((s) => s.name === hovered);

  return (
    <div className="relative">
      <svg viewBox="120 90 410 430" className="w-full h-auto" style={{ maxHeight: '600px' }}>
        {/* Background subtle grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e8edf2" strokeWidth="0.5" />
          </pattern>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
          </filter>
        </defs>
        <rect x="120" y="90" width="410" height="430" fill="url(#grid)" />

        {/* India outline (simplified) */}
        <path
          d="M160,130 L180,110 L260,100 L300,100 L390,95 L450,100 L490,130 L505,180 L500,230 L490,280 L475,310 L480,350 L460,390 L430,430 L400,460 L350,480 L300,495 L270,490 L250,470 L240,440 L220,410 L210,370 L200,330 L190,290 L175,250 L165,200 Z"
          fill="none"
          stroke="#1d3f2e"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          opacity="0.3"
        />

        {/* States */}
        {statePaths.map((sp) => {
          const sd = stateData.find((s) => s.id === sp.id);
          if (!sd) return null;
          const isSelected = selectedState === sp.name;
          return (
            <path
              key={sp.id}
              d={sp.d}
              fill={getColor(sd)}
              stroke={isSelected ? '#0c1d16' : '#2c6144'}
              strokeWidth={isSelected ? 2.5 : 1}
              className="state-path"
              filter="url(#shadow)"
              onMouseEnter={() => setHovered(sp.name)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelectState(sp.name)}
            >
              <title>{`${sp.name} — ${sd.indicators.landRecordDigitized}% digitized`}</title>
            </path>
          );
        })}

        {/* State labels for selected/hovered */}
        {statePaths.map((sp) => {
          if (selectedState !== sp.name && hovered !== sp.name) return null;
          const match = sp.d.match(/M(\d+),(\d+)/);
          if (!match) return null;
          const cx = parseInt(match[1]) + 30;
          const cy = parseInt(match[2]) + 25;
          return (
            <text
              key={`label-${sp.id}`}
              x={cx}
              y={cy}
              textAnchor="middle"
              className="pointer-events-none"
              fontSize="11"
              fontWeight="600"
              fill="#1d3f2e"
            >
              {sp.name}
            </text>
          );
        })}
      </svg>

      {/* Hover tooltip */}
      {hoveredState && selectedState !== hoveredState.name && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lift border border-forest-900/10 p-3 text-xs animate-scale-in max-w-[200px] pointer-events-none">
          <p className="font-semibold text-navy-900">{hoveredState.name}</p>
          <p className="text-navy-500 mt-1">Digitized: {hoveredState.indicators.landRecordDigitized}%</p>
          <p className="text-navy-500">Disputes: {hoveredState.indicators.disputeCases.toLocaleString()}</p>
        </div>
      )}

      {/* Legend */}
      <div className="mt-3 flex items-center gap-4 text-xs text-navy-500">
        <span>Digitization Level:</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-3 rounded" style={{ background: 'rgb(220,230,220)' }} />
          <span>Low</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-3 rounded" style={{ background: 'rgb(130,200,150)' }} />
          <span>Medium</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-3 rounded" style={{ background: '#2c6144' }} />
          <span>High</span>
        </div>
      </div>
    </div>
  );
}
