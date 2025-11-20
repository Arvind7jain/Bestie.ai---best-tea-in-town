import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CHART_DATA } from '../constants';

const SocialStats: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
            <h3 className="text-lg font-bold text-zinc-900">Activity</h3>
            <p className="text-xs text-zinc-400 font-medium">Weekly interactions</p>
        </div>
        <div className="text-2xl font-bold text-black tracking-tight">84</div>
      </div>
      
      <div className="flex-1 min-h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={CHART_DATA}>
            <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fill: '#a1a1aa', fontWeight: 500}}
                dy={10}
            />
            <Tooltip 
                cursor={{fill: '#f4f4f5', radius: 4}}
                contentStyle={{
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    backgroundColor: 'black',
                    color: 'white',
                    padding: '8px 12px'
                }}
                itemStyle={{color: 'white', fontSize: '12px', fontWeight: 600}}
                labelStyle={{display: 'none'}}
            />
            <Bar dataKey="interactions" radius={[6, 6, 6, 6]} barSize={24}>
              {CHART_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.interactions > 20 ? '#000000' : '#e4e4e7'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SocialStats;