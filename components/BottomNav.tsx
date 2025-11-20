
import React from 'react';
import { MessageCircle, Layers, Users } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'chat' | 'digest' | 'circles';
  onTabChange: (tab: 'chat' | 'digest' | 'circles') => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'chat', icon: MessageCircle, label: 'Chat' },
    { id: 'digest', icon: Layers, label: 'Digest' },
    { id: 'circles', icon: Users, label: 'Circles' },
  ];

  return (
    <div className="bg-white border-t border-zinc-100 px-8 py-4 flex justify-between items-center z-30 relative pb-8 md:pb-4">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as any)}
            className={`relative flex items-center justify-center w-16 h-16 transition-all duration-300 ${isActive ? '-translate-y-4' : ''}`}
          >
            <div className={`
                absolute inset-0 rounded-2xl transition-all duration-300
                ${isActive ? 'bg-black shadow-[4px_4px_0px_0px_rgba(34,211,238,1)] rotate-3' : 'bg-transparent'}
            `}></div>
            
            <div className="relative z-10 flex flex-col items-center gap-1">
                <tab.icon 
                    className={`w-7 h-7 transition-colors ${isActive ? 'text-cyan-400 fill-current' : 'text-zinc-300'}`} 
                    strokeWidth={2.5}
                />
                {isActive && (
                    <span className="text-[10px] font-black text-white tracking-wider uppercase">{tab.label}</span>
                )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;