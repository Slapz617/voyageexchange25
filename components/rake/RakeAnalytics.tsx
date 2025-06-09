'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RakeAnalyticsProps {
  totalRake: number;
  dailyRake: number;
}

export function RakeAnalytics({ totalRake, dailyRake }: RakeAnalyticsProps) {
  const data = [
    { day: 'Mon', chess: 12.4, poker: 23.1, trading: 45.6, total: 81.1 },
    { day: 'Tue', chess: 15.2, poker: 28.9, trading: 52.3, total: 96.4 },
    { day: 'Wed', chess: 18.7, poker: 31.5, trading: 48.9, total: 99.1 },
    { day: 'Thu', chess: 16.3, poker: 35.2, trading: 58.1, total: 109.6 },
    { day: 'Fri', chess: 22.1, poker: 42.8, trading: 67.4, total: 132.3 },
    { day: 'Sat', chess: 28.5, poker: 51.2, trading: 72.8, total: 152.5 },
    { day: 'Sun', chess: 25.9, poker: 48.6, trading: 69.2, total: 143.7 }
  ];

  return (
    <div className="trading-card rounded-xl p-6">
      <h3 className="text-xl font-bold mb-6">Rake Analytics</h3>
      
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="day" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="chess" 
              stroke="#3B82F6" 
              strokeWidth={2}
              name="Chess"
            />
            <Line 
              type="monotone" 
              dataKey="poker" 
              stroke="#10B981" 
              strokeWidth={2}
              name="Poker"
            />
            <Line 
              type="monotone" 
              dataKey="trading" 
              stroke="#F59E0B" 
              strokeWidth={2}
              name="Trading"
            />
            <Line 
              type="monotone" 
              dataKey="total" 
              stroke="#EF4444" 
              strokeWidth={3}
              name="Total"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-400">
            {((dailyRake / totalRake) * 100).toFixed(1)}%
          </div>
          <div className="text-gray-400 text-sm">Daily Growth Rate</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-400">
            {(totalRake / 30).toFixed(2)} SOL
          </div>
          <div className="text-gray-400 text-sm">Avg Daily Rake</div>
        </div>
      </div>
    </div>
  );
}