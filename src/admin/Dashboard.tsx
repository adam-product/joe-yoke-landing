import React, { useState, useEffect, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Eye, Users, Download, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

const supabase = createClient(`https://${projectId}.supabase.co`, publicAnonKey);

export default function Dashboard() {
  const [logs, setLogs] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('Last 30 Days');

  // Fetch real-time data on mount
  useEffect(() => {
    async function fetchAnalytics() {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      // Fetch Page Views
      const { data: viewData, error: viewError } = await supabase
        .from('page_views')
        .select('*')
        .gte('created_at', thirtyDaysAgo.toISOString())
        .order('created_at', { ascending: true });

      if (!viewError && viewData) setLogs(viewData);

      // Fetch Events
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('*')
        .gte('created_at', thirtyDaysAgo.toISOString());

      if (!eventError && eventData) setEvents(eventData);

      setLoading(false);
    }

    fetchAnalytics();
  }, []);

  // Aggregate Data
  const metrics = useMemo(() => {
    const totalVisits = logs.length;
    const uniqueVisitors = new Set(logs.map(log => log.visitor_id)).size;
    
    // Calculate Real Conversion Rate based on 'download_click' events
    const uniqueConverters = new Set(
      events.filter(e => e.event_name === 'download_click').map(e => e.visitor_id)
    ).size;
    
    const conversionRate = uniqueVisitors > 0 
      ? ((uniqueConverters / uniqueVisitors) * 100).toFixed(1) 
      : '0.0';
    
    // Device Breakdown
    const mobileCount = logs.filter(l => l.device_type === 'Mobile').length;
    const desktopCount = logs.filter(l => l.device_type === 'Desktop').length;
    const tabletCount = logs.filter(l => l.device_type === 'Tablet').length;

    // Time-series for Line Chart
    const groupedByDay: Record<string, { visits: number, uniques: Set<string> }> = {};
    
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      groupedByDay[dateStr] = { visits: 0, uniques: new Set() };
    }

    logs.forEach(log => {
      const dateStr = new Date(log.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (groupedByDay[dateStr]) {
        groupedByDay[dateStr].visits += 1;
        groupedByDay[dateStr].uniques.add(log.visitor_id);
      }
    });

    const trendData = Object.keys(groupedByDay).map(date => ({
      name: date,
      'Total Visits': groupedByDay[date].visits,
      'Unique Visitors': groupedByDay[date].uniques.size
    }));

    return {
      totalVisits,
      uniqueVisitors,
      conversionRate,
      trendData,
      deviceData: [
        { name: 'Mobile', value: mobileCount, color: '#C5FF00' },
        { name: 'Desktop', value: desktopCount, color: '#60a5fa' },
        { name: 'Tablet', value: tabletCount, color: '#a78bfa' }
      ]
    };
  }, [logs, events]);

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const calculatePercentage = (value: number) => {
    if (metrics.totalVisits === 0) return 0;
    return Math.round((value / metrics.totalVisits) * 100);
  };

  return (
    <div className="w-full max-w-7xl pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
        <p className="text-gray-400">joeyoke.com • {timeframe}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-1 bg-[#111] p-1 rounded-xl border border-white/10 overflow-x-auto">
          {['Today', 'Last 7 Days', 'Last 30 Days', 'Year-to-Date'].map(tab => (
            <button 
              key={tab}
              onClick={() => setTimeframe(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${timeframe === tab ? 'bg-[#C5FF00] text-black' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard title="TOTAL VISITS" value={formatNumber(metrics.totalVisits)} icon={<Eye className="w-5 h-5" />} trend="+12.4%" positive={true} />
        <StatCard title="UNIQUE VISITORS" value={formatNumber(metrics.uniqueVisitors)} icon={<Users className="w-5 h-5" />} trend="+8.2%" positive={true} />
        <StatCard title="CONVERSION RATE" value={`${metrics.conversionRate}%`} icon={<Download className="w-5 h-5" />} trend="+1.2%" positive={true} />
        <StatCard title="BOUNCE RATE" value="41.3%" icon={<ArrowDownRight className="w-5 h-5" />} trend="-3.7%" positive={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#111] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-white font-bold">Visitor Traffic Trend</h3>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-2 text-white/50"><div className="w-3 h-[2px] bg-[#C5FF00]"></div> Total Visits</span>
              <span className="flex items-center gap-2 text-white/50"><div className="w-3 h-[2px] bg-[#60a5fa]"></div> Unique Visitors</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center text-white/20">Loading Data...</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metrics.trendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C5FF00" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#C5FF00" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorUnique" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={11} tickMargin={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.2)" fontSize={11} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1A1A1A', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ color: '#fff', fontSize: '14px' }}
                  />
                  <Area type="monotone" dataKey="Total Visits" stroke="#C5FF00" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" />
                  <Area type="monotone" dataKey="Unique Visitors" stroke="#60a5fa" strokeWidth={2} fillOpacity={1} fill="url(#colorUnique)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-2xl p-6 flex flex-col">
          <h3 className="text-white font-bold mb-6">Traffic by Device</h3>
          <div className="flex-1 flex items-center justify-center relative min-h-[220px]">
             {loading ? (
                <div className="text-white/20">Loading...</div>
             ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={metrics.deviceData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={4} dataKey="value" stroke="none">
                      {metrics.deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} itemStyle={{ color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
             )}
          </div>
          <div className="flex flex-col gap-3 mt-4">
            {metrics.deviceData.map((device) => (
              <div key={device.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: device.color }}></div>
                  <span className="text-white/60">{device.name}</span>
                </div>
                <span className="text-white font-bold">{calculatePercentage(device.value)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, positive }: { title: string, value: string, icon: React.ReactNode, trend: string, positive: boolean }) {
  return (
    <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold tracking-widest text-white/40 uppercase">{title}</p>
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-[#C5FF00]">
          {icon}
        </div>
      </div>
      <h2 className="text-4xl font-black text-white mb-2 tracking-tighter">{value}</h2>
      <div className={`flex items-center gap-1 text-sm font-semibold ${positive ? 'text-[#C5FF00]' : 'text-red-500'}`}>
        {positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
        {trend} vs previous period
      </div>
    </div>
  );
}