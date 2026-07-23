// Realistic data for Joe Yoke — South Asian casual games audience, mobile-first

export const trafficTrend = [
  { date: 'Jul 1',  visits: 1240, unique: 890  },
  { date: 'Jul 2',  visits: 1380, unique: 970  },
  { date: 'Jul 3',  visits: 1190, unique: 840  },
  { date: 'Jul 4',  visits: 1560, unique: 1100 },
  { date: 'Jul 5',  visits: 2100, unique: 1480 },
  { date: 'Jul 6',  visits: 2340, unique: 1620 },
  { date: 'Jul 7',  visits: 1980, unique: 1390 },
  { date: 'Jul 8',  visits: 1750, unique: 1230 },
  { date: 'Jul 9',  visits: 1870, unique: 1310 },
  { date: 'Jul 10', visits: 2580, unique: 1790 },
  { date: 'Jul 11', visits: 3120, unique: 2180 },
  { date: 'Jul 12', visits: 2870, unique: 2010 },
  { date: 'Jul 13', visits: 2640, unique: 1850 },
  { date: 'Jul 14', visits: 2490, unique: 1740 },
  { date: 'Jul 15', visits: 3380, unique: 2360 },
  { date: 'Jul 16', visits: 3750, unique: 2620 },
  { date: 'Jul 17', visits: 3490, unique: 2440 },
  { date: 'Jul 18', visits: 3210, unique: 2250 },
  { date: 'Jul 19', visits: 2980, unique: 2090 },
  { date: 'Jul 20', visits: 3640, unique: 2550 },
  { date: 'Jul 21', visits: 4120, unique: 2880 },
  { date: 'Jul 22', visits: 3890, unique: 2720 },
  { date: 'Jul 23', visits: 4350, unique: 3040 },
]

export const deviceData = [
  { name: 'Mobile',  value: 74, color: '#C5FF00' },
  { name: 'Desktop', value: 20, color: '#60a5fa' },
  { name: 'Tablet',  value: 6,  color: '#a78bfa' },
]

export const topCountries = [
  { country: 'India',          code: 'IN', visits: 18400, flag: '🇮🇳' },
  { country: 'Bangladesh',     code: 'BD', visits: 6200,  flag: '🇧🇩' },
  { country: 'Pakistan',       code: 'PK', visits: 4800,  flag: '🇵🇰' },
  { country: 'United Kingdom', code: 'GB', visits: 3100,  flag: '🇬🇧' },
  { country: 'United States',  code: 'US', visits: 2700,  flag: '🇺🇸' },
  { country: 'Sri Lanka',      code: 'LK', visits: 2200,  flag: '🇱🇰' },
  { country: 'UAE',            code: 'AE', visits: 1840,  flag: '🇦🇪' },
  { country: 'Canada',         code: 'CA', visits: 1120,  flag: '🇨🇦' },
  { country: 'Australia',      code: 'AU', visits:  890,  flag: '🇦🇺' },
  { country: 'Saudi Arabia',   code: 'SA', visits:  740,  flag: '🇸🇦' },
]

export const trafficSources = [
  { source: 'Organic Search', visits: 24800, color: '#C5FF00' },
  { source: 'Direct',         visits: 18300, color: '#60a5fa' },
  { source: 'Social Media',   visits: 12600, color: '#f472b6' },
  { source: 'Referral',       visits:  5900, color: '#a78bfa' },
  { source: 'Email',          visits:  2100, color: '#fb923c' },
]

export const osSplit = [
  { os: 'Android', share: 61, color: '#C5FF00' },
  { os: 'iOS',     share: 27, color: '#60a5fa' },
  { os: 'Windows', share:  8, color: '#a78bfa' },
  { os: 'macOS',   share:  4, color: '#fb923c' },
]

export const eventClicks = [
  { event: 'Download App (Hero)',  clicks: 2140, trend:  14.8 },
  { event: 'Download App (Nav)',   clicks: 1380, trend:   9.2 },
  { event: 'Explore Games',        clicks: 3890, trend:  22.1 },
  { event: 'Community Click',      clicks:  920, trend:  -4.6 },
  { event: 'Theme Toggle → Dark',  clicks:  640, trend:   6.3 },
  { event: 'Theme Toggle → Light', clicks:  420, trend:   2.8 },
]

export const kpis = {
  totalVisits:    { value: 63700, trend:  22.4 },
  uniqueVisitors: { value: 44200, trend:  17.8 },
  conversionRate: { value: 5.5,   trend:   1.2 },
  bounceRate:     { value: 41.3,  trend:  -3.7 },
}
