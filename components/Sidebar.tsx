import React from 'react';
import { LayoutGrid, Sparkles, Users, Settings, Bell } from 'lucide-react';

interface SidebarProps {
  activeView: 'feed' | 'chat' | 'settings';
  onChangeView: (view: 'feed' | 'chat' | 'settings') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onChangeView }) => {
  const navItems = [
    { id: 'feed', icon: LayoutGrid, label: 'Daily Digest' },
    { id: 'chat', icon: Sparkles, label: 'Agent Chat' },
    { id: 'people', icon: Users, label: 'My Circle' },
    { id: 'settings', icon: Settings, label: 'Preferences' },
  ];

  return (
    <div className="w-20 lg:w-64 bg-white border-r border-stone-100 flex flex-col h-screen sticky top-0 z-20">
      <div className="p-6 lg:p-8 flex items-center justify-center lg:justify-start">
        <div className="w-8 h-8 bg-stone-900 rounded-lg flex items-center justify-center text-white font-serif font-bold text-lg shadow-md">
          K
        </div>
        <span className="ml-3 font-serif font-bold text-xl text-stone-900 hidden lg:block">Kinship</span>
      </div>

      <nav className="flex-1 px-3 space-y-1 mt-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => item.id === 'people' ? null : onChangeView(item.id as any)}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeView === item.id 
                ? 'bg-stone-100 text-stone-900 font-semibold' 
                : 'text-stone-400 hover:bg-stone-50 hover:text-stone-600 font-medium'
            }`}
          >
            <item.icon 
                className={`w-5 h-5 transition-colors ${
                    activeView === item.id ? 'stroke-[2px] text-stone-900' : 'stroke-[2px]'
                }`} 
            />
            <span className="ml-3 text-sm hidden lg:block">{item.label}</span>
            
            {item.id === 'feed' && (
                <span className="hidden lg:flex ml-auto w-1.5 h-1.5 bg-amber-400 rounded-full shadow-sm"></span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 hidden lg:block">
        <div className="bg-[#FAF9F6] rounded-2xl p-5 border border-stone-100 relative overflow-hidden group cursor-pointer hover:border-amber-200 transition-colors">
            <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 bg-white rounded-md shadow-sm text-stone-400">
                    <Bell className="w-3.5 h-3.5" />
                </div>
                <span className="text-[9px] font-bold tracking-wider uppercase text-amber-600 bg-amber-50 px-2 py-1 rounded-md">Beta</span>
            </div>
            <p className="text-xs font-serif font-medium text-stone-800 leading-relaxed">Your digest refreshes in 4 hours.</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;