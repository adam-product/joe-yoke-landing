import { useState, useRef, useEffect } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar,
} from 'recharts'
import { TrendingUp, TrendingDown, Users, Eye, Download, Zap, Monitor, Smartphone, Tablet, Calendar, X, RotateCcw } from 'lucide-react'
import { trafficTrend, deviceData, topCountries, trafficSources, osSplit, eventClicks, kpis } from './mockData'

type DatePreset = 'Today' | 'Last 7 Days' | 'Last 30 Days' | 'Year-to-Date' | 'Custom'
type DeviceFilter = 'All' | 'Mobile' | 'Desktop' | 'Tablet'

function fmt(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K'
  return n.toString()
}

function KpiCard({ label, value, trend, icon: Icon, suffix = '' }: {
  label: string; value: number; trend: number; icon: React.ElementType; suffix?: string
}) {
  const up = trend >= 0
  return (
    <div className="bg-[#111111] border border-white/8 rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-white/40 tracking-widest uppercase">{label}</span>
        <div className="w-8 h-8 rounded-xl bg-[#C5FF00]/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-[#C5FF00]" />
        </div>
      </div>
      <div>
        <div className="text-3xl font-black text-white tracking-tight">{fmt(value)}{suffix}</div>
        <div className={`flex items-center gap-1 mt-1.5 text-xs font-semibold ${up ? 'text-emerald-400' : 'text-red-400'}`}>
          {up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          {up ? '+' : ''}{trend}% vs previous period
        </div>
      </div>
    </div>
  )
}

const TT_STYLE = { backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, color: '#fff', fontSize: 12 }

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string; color: string }[]; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div style={TT_STYLE} className="px-3 py-2.5 shadow-xl">
      <p className="text-white/50 text-xs mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }} className="font-semibold">{p.name}: {fmt(p.value)}</p>
      ))}
    </div>
  )
}

// ─── Custom date range picker popup ─────────────────────────────────────────

function CustomDatePicker({ onApply, onClose }: { onApply: (from: string, to: string) => void; onClose: () => void }) {
  const today = new Date().toISOString().split('T')[0]
  const [from, setFrom] = useState('2025-07-01')
  const [to, setTo] = useState(today)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose() }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div ref={ref} className="bg-[#111111] border border-white/12 rounded-2xl p-6 w-80 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#C5FF00]" />
            <span className="text-sm font-bold text-white">Custom Date Range</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/8 text-white/40"><X className="w-4 h-4" /></button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-white/40 tracking-widest uppercase mb-1.5 block">From</label>
            <input
              type="date"
              value={from}
              max={to}
              onChange={e => setFrom(e.target.value)}
              className="w-full bg-white/5 border border-white/12 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5FF00]/50 [color-scheme:dark]"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-white/40 tracking-widest uppercase mb-1.5 block">To</label>
            <input
              type="date"
              value={to}
              min={from}
              max={today}
              onChange={e => setTo(e.target.value)}
              className="w-full bg-white/5 border border-white/12 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5FF00]/50 [color-scheme:dark]"
            />
          </div>
        </div>

        {/* Quick shortcuts */}
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { label: 'This week', from: new Date(Date.now() - 6*86400000).toISOString().split('T')[0], to: today },
            { label: 'This month', from: `${today.slice(0,7)}-01`, to: today },
            { label: 'Last month', from: new Date(new Date().getFullYear(), new Date().getMonth()-1, 1).toISOString().split('T')[0], to: new Date(new Date().getFullYear(), new Date().getMonth(), 0).toISOString().split('T')[0] },
          ].map(s => (
            <button key={s.label} onClick={() => { setFrom(s.from); setTo(s.to) }}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white/50 hover:text-white transition-all border border-white/8">
              {s.label}
            </button>
          ))}
        </div>

        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/50 text-sm font-semibold hover:bg-white/5 transition-colors">Cancel</button>
          <button
            onClick={() => { onApply(from, to); onClose() }}
            className="flex-1 py-2.5 rounded-xl bg-[#C5FF00] text-[#0A0A0A] text-sm font-bold hover:bg-[#d4ff33] transition-colors"
          >
            Apply Range
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [datePreset, setDatePreset] = useState<DatePreset>('Last 30 Days')
  const [device, setDevice] = useState<DeviceFilter>('All')
  const [showCustomPicker, setShowCustomPicker] = useState(false)
  const [customRange, setCustomRange] = useState<{ from: string; to: string } | null>(null)

  const datePresets: DatePreset[] = ['Today', 'Last 7 Days', 'Last 30 Days', 'Year-to-Date', 'Custom']
  const deviceFilters: { label: DeviceFilter; icon: React.ElementType }[] = [
    { label: 'All', icon: Zap },
    { label: 'Mobile', icon: Smartphone },
    { label: 'Desktop', icon: Monitor },
    { label: 'Tablet', icon: Tablet },
  ]

  const handlePreset = (p: DatePreset) => {
    setDatePreset(p)
    if (p === 'Custom') setShowCustomPicker(true)
  }

  const handleCustomApply = (from: string, to: string) => {
    setCustomRange({ from, to })
  }

  // Filter trend data by preset
  const trendData = (() => {
    if (datePreset === 'Today') return trafficTrend.slice(-1)
    if (datePreset === 'Last 7 Days') return trafficTrend.slice(-7)
    if (datePreset === 'Custom' && customRange) {
      // Filter by date range (using index as proxy since our dates are Jul)
      const fromIdx = trafficTrend.findIndex(d => d.date >= customRange.from.slice(5).replace('-', ' ').replace(/^0/, ''))
      const toIdx = trafficTrend.findLastIndex(d => d.date <= customRange.to.slice(5).replace('-', ' ').replace(/^0/, ''))
      if (fromIdx >= 0 && toIdx >= fromIdx) return trafficTrend.slice(fromIdx, toIdx + 1)
    }
    return trafficTrend
  })()

  // Apply device multiplier to KPIs
  const deviceMultiplier = device === 'Mobile' ? 0.74 : device === 'Desktop' ? 0.20 : device === 'Tablet' ? 0.06 : 1
  const scaledKpis = {
    totalVisits:    { value: Math.round(kpis.totalVisits.value * deviceMultiplier),    trend: kpis.totalVisits.trend },
    uniqueVisitors: { value: Math.round(kpis.uniqueVisitors.value * deviceMultiplier), trend: kpis.uniqueVisitors.trend },
    conversionRate: { value: kpis.conversionRate.value, trend: kpis.conversionRate.trend },
    bounceRate:     { value: kpis.bounceRate.value,     trend: kpis.bounceRate.trend },
  }

  const maxSource = Math.max(...trafficSources.map(s => s.visits))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Analytics Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">
          joeyoke.com · {datePreset === 'Custom' && customRange
            ? `${customRange.from} → ${customRange.to}`
            : datePreset}
        </p>
      </div>

      {/* ── Global Controls ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-[#111111] border border-white/8 rounded-xl p-1 flex-wrap">
            {datePresets.map(p => (
              <button
                key={p}
                onClick={() => handlePreset(p)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  datePreset === p ? 'bg-[#C5FF00] text-[#0A0A0A]' : 'text-white/40 hover:text-white'
                }`}
              >
                {p === 'Custom' && <Calendar className="w-3 h-3" />}
                {p}
                {p === 'Custom' && datePreset === 'Custom' && customRange && (
                  <span className="ml-1 text-[10px] opacity-70">{customRange.from.slice(5)} → {customRange.to.slice(5)}</span>
                )}
              </button>
            ))}
          </div>
          {/* Reset button — only shown when not on the default */}
          {(datePreset !== 'Last 30 Days' || device !== 'All') && (
            <button
              onClick={() => { setDatePreset('Last 30 Days'); setDevice('All'); setCustomRange(null) }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white/50 hover:text-white transition-all"
              title="Reset filters"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          )}
        </div>
        <div className="flex items-center gap-1 bg-[#111111] border border-white/8 rounded-xl p-1">
          {deviceFilters.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setDevice(label)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                device === label ? 'bg-[#C5FF00] text-[#0A0A0A]' : 'text-white/40 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />{label}
            </button>
          ))}
        </div>
      </div>

      {/* ── KPIs ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard label="Total Visits"     value={scaledKpis.totalVisits.value}    trend={scaledKpis.totalVisits.trend}    icon={Eye} />
        <KpiCard label="Unique Visitors"  value={scaledKpis.uniqueVisitors.value} trend={scaledKpis.uniqueVisitors.trend} icon={Users} />
        <KpiCard label="Conversion Rate"  value={scaledKpis.conversionRate.value} trend={scaledKpis.conversionRate.trend} icon={Download} suffix="%" />
        <KpiCard label="Bounce Rate"      value={scaledKpis.bounceRate.value}     trend={scaledKpis.bounceRate.trend}     icon={TrendingDown} suffix="%" />
      </div>

      {/* ── Traffic Trend + Device ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 bg-[#111111] border border-white/8 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold text-white">Visitor Traffic Trend</h2>
            <div className="flex items-center gap-4 text-xs text-white/40">
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#C5FF00] inline-block rounded" />Total Visits</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#60a5fa] inline-block rounded" />Unique Visitors</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={trendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gV" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C5FF00" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#C5FF00" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gU" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={fmt} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="visits" name="Total Visits"    stroke="#C5FF00" strokeWidth={2} fill="url(#gV)" dot={false} />
              <Area type="monotone" dataKey="unique"  name="Unique Visitors" stroke="#60a5fa" strokeWidth={2} fill="url(#gU)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#111111] border border-white/8 rounded-2xl p-5">
          <h2 className="text-sm font-bold text-white mb-5">Traffic by Device</h2>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={deviceData} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={3} dataKey="value" stroke="none">
                {deviceData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip formatter={v => `${v}%`} contentStyle={TT_STYLE} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 mt-4">
            {deviceData.map(d => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-white/60">{d.name}</span>
                </div>
                <span className="font-bold text-white">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Countries + Sources + OS ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="bg-[#111111] border border-white/8 rounded-2xl p-5">
          <h2 className="text-sm font-bold text-white mb-4">Top Countries</h2>
          <div className="flex flex-col gap-3">
            {topCountries.map((c, i) => {
              const pct = (c.visits / topCountries[0].visits) * 100
              return (
                <div key={c.code} className="flex items-center gap-3">
                  <span className="text-white/30 text-xs font-mono w-4 shrink-0">{i + 1}</span>
                  <span className="text-lg">{c.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-white/70 truncate">{c.country}</span>
                      <span className="text-xs font-bold text-white ml-2 shrink-0">{fmt(c.visits)}</span>
                    </div>
                    <div className="h-1 bg-white/8 rounded-full overflow-hidden">
                      <div className="h-full bg-[#C5FF00] rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-[#111111] border border-white/8 rounded-2xl p-5">
          <h2 className="text-sm font-bold text-white mb-4">Traffic Sources</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={trafficSources} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={fmt} />
              <YAxis type="category" dataKey="source" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} width={95} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="visits" name="Visits" radius={[0, 6, 6, 0]}>
                {trafficSources.map((s, i) => <Cell key={i} fill={s.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 flex flex-col gap-1.5">
            {trafficSources.map(s => (
              <div key={s.source} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span className="text-white/50">{s.source}</span>
                </div>
                <span className="text-white/70 font-semibold">{Math.round((s.visits / maxSource) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#111111] border border-white/8 rounded-2xl p-5">
          <h2 className="text-sm font-bold text-white mb-4">Top Operating Systems</h2>
          <div className="flex flex-col gap-4">
            {osSplit.map(o => (
              <div key={o.os}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold text-white/70">{o.os}</span>
                  <span className="text-sm font-black text-white">{o.share}%</span>
                </div>
                <div className="h-2.5 bg-white/8 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${o.share}%`, background: o.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-[#C5FF00]/8 border border-[#C5FF00]/20 rounded-xl">
            <p className="text-xs font-bold text-[#C5FF00] mb-1">Android + iOS</p>
            <p className="text-2xl font-black text-white">88%</p>
            <p className="text-xs text-white/40 mt-0.5">Mobile OS dominance — prioritise app install flow for South Asian users</p>
          </div>
        </div>
      </div>

      {/* ── Events ── */}
      <div className="bg-[#111111] border border-white/8 rounded-2xl p-5">
        <h2 className="text-sm font-bold text-white mb-5">Engagement & Event Tracking</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {eventClicks.map(ev => {
            const up = ev.trend >= 0
            return (
              <div key={ev.event} className="bg-white/3 border border-white/6 rounded-xl p-4 flex flex-col gap-2">
                <p className="text-xs text-white/50 font-medium">{ev.event}</p>
                <p className="text-2xl font-black text-white">{fmt(ev.clicks)}</p>
                <p className={`text-xs font-semibold flex items-center gap-1 ${up ? 'text-emerald-400' : 'text-red-400'}`}>
                  {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {up ? '+' : ''}{ev.trend}%
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Custom picker modal */}
      {showCustomPicker && (
        <CustomDatePicker
          onApply={handleCustomApply}
          onClose={() => setShowCustomPicker(false)}
        />
      )}
    </div>
  )
}
