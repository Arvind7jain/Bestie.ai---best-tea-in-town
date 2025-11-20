
import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Smartphone, Mail, Linkedin, Instagram, Check, Search, Plus, UserPlus } from 'lucide-react';
import { UserPreferences } from '../types';
import { MOCK_CONTACTS } from '../constants';

interface OnboardingProps {
  onComplete: (prefs: UserPreferences, selectedContactIds: string[]) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [tone, setTone] = useState<'casual' | 'formal' | 'excited'>('casual');
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChannelToggle = (channel: string) => {
    if (selectedChannels.includes(channel)) {
      setSelectedChannels(prev => prev.filter(c => c !== channel));
    } else {
      setSelectedChannels(prev => [...prev, channel]);
    }
  };

  const handleContactToggle = (id: string) => {
    if (selectedContactIds.includes(id)) {
      setSelectedContactIds(prev => prev.filter(c => c !== id));
    } else {
      setSelectedContactIds(prev => [...prev, id]);
    }
  };

  const handleFinish = () => {
    onComplete({
      tone,
      emojiUsage: 'minimal',
      forbiddenWords: []
    }, selectedContactIds);
  };

  const filteredContacts = MOCK_CONTACTS.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-0 md:p-6">
      <div className="max-w-md w-full h-[100dvh] md:h-auto md:bg-white md:rounded-[2.5rem] md:shadow-2xl md:shadow-zinc-200/50 md:p-8 relative flex flex-col overflow-hidden">
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-zinc-100 z-50">
            <div 
                className="h-full bg-black transition-all duration-500 ease-out" 
                style={{ width: `${(step / 4) * 100}%` }}
            />
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-4 pt-12 pb-24">
            
            {/* Step 1: Intro */}
            {step === 1 && (
                <div className="h-full flex flex-col items-center justify-center text-center animate-fade-up space-y-8">
                    <div className="w-24 h-24 bg-black text-white rounded-[2rem] rotate-6 flex items-center justify-center text-5xl font-black shadow-[8px_8px_0px_0px_rgba(34,211,238,1)]">
                        K
                    </div>
                    <div>
                        <h1 className="text-5xl font-black tracking-tighter text-black mb-4 leading-[0.9]">
                            Stay<br/>Connected.
                        </h1>
                        <p className="text-lg text-zinc-500 font-medium leading-relaxed max-w-[260px] mx-auto">
                            Your AI bestie that keeps your social life 100% devoid of effort.
                        </p>
                    </div>
                    <button 
                        onClick={() => setStep(2)}
                        className="w-full bg-cyan-400 text-black border-2 border-black text-xl font-black py-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-[4px] active:shadow-none"
                    >
                        Let's Go
                    </button>
                </div>
            )}

            {/* Step 2: Channels */}
            {step === 2 && (
                <div className="space-y-8 animate-fade-in">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black text-black tracking-tight">Where's the tea? ☕️</h2>
                        <p className="text-zinc-500 font-medium">Connect sources for us to scour.</p>
                    </div>
                
                    <div className="grid grid-cols-1 gap-4">
                        {[
                            { id: 'whatsapp', icon: Smartphone, label: 'WhatsApp', color: 'bg-[#25D366]' },
                            { id: 'email', icon: Mail, label: 'Gmail / Outlook', color: 'bg-[#EA4335]' },
                            { id: 'social', icon: Instagram, label: 'Instagram', color: 'bg-[#E1306C]' }
                        ].map((item) => (
                            <button 
                                key={item.id}
                                onClick={() => handleChannelToggle(item.id)}
                                className={`relative p-5 rounded-3xl border-2 transition-all duration-200 flex items-center gap-4 group ${
                                    selectedChannels.includes(item.id) 
                                    ? 'border-black bg-zinc-50' 
                                    : 'border-zinc-100 bg-white hover:border-zinc-300'
                                }`}
                            >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm ${item.color}`}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="font-bold text-black text-lg">{item.label}</div>
                                </div>
                                
                                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                                    selectedChannels.includes(item.id) ? 'bg-black border-black' : 'border-zinc-200'
                                }`}>
                                    {selectedChannels.includes(item.id) && <Check className="w-5 h-5 text-white stroke-[3]" />}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Step 3: Priority People (New) */}
            {step === 3 && (
                <div className="space-y-6 animate-fade-in pb-20">
                     <div className="space-y-2">
                        <h2 className="text-3xl font-black text-black tracking-tight">Pick your Main Characters</h2>
                        <p className="text-zinc-500 font-medium">Who do you actually care about?</p>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                        <input 
                            type="text" 
                            placeholder="Search name..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-100 border-none rounded-2xl py-4 pl-12 pr-4 font-bold text-zinc-900 placeholder-zinc-400 focus:ring-2 focus:ring-black transition-all outline-none"
                        />
                    </div>

                    {/* List */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between px-2">
                            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">All Contacts</span>
                            <span className="text-xs font-bold text-black bg-cyan-400 px-2 py-1 rounded-md">
                                {selectedContactIds.length} Selected
                            </span>
                        </div>
                        
                        {filteredContacts.map(contact => (
                             <button 
                                key={contact.id}
                                onClick={() => handleContactToggle(contact.id)}
                                className="w-full flex items-center p-3 rounded-2xl hover:bg-zinc-50 transition-colors group"
                            >
                                <img src={contact.avatarUrl} className="w-12 h-12 rounded-full object-cover border-2 border-zinc-100" />
                                <div className="ml-4 flex-1 text-left">
                                    <h3 className="font-bold text-zinc-900">{contact.name}</h3>
                                    <p className="text-xs text-zinc-400 font-medium">{contact.circle}</p>
                                </div>
                                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                                    selectedContactIds.includes(contact.id) 
                                    ? 'bg-black border-black' 
                                    : 'border-zinc-200 group-hover:border-zinc-300'
                                }`}>
                                     {selectedContactIds.includes(contact.id) && <Check className="w-4 h-4 text-white stroke-[3]" />}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Step 4: Vibe */}
            {step === 4 && (
                <div className="space-y-8 animate-fade-in">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black text-black tracking-tight">Vibe Check ✨</h2>
                        <p className="text-zinc-500 font-medium">How should I sound?</p>
                    </div>
                
                    <div className="space-y-3">
                        {[
                            { id: 'casual', label: 'Chill / Bestie', icon: '✌️' },
                            { id: 'excited', label: 'Hype Man', icon: '🔥' },
                            { id: 'formal', label: 'Professional', icon: '👔' }
                        ].map((t) => (
                            <button 
                                key={t.id}
                                onClick={() => setTone(t.id as any)}
                                className={`w-full p-6 flex items-center text-left rounded-[1.5rem] border-2 transition-all duration-200 ${
                                    tone === t.id 
                                    ? 'border-black bg-cyan-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
                                    : 'border-zinc-100 bg-white hover:border-zinc-300'
                                }`}
                            >
                                <span className="text-2xl mr-4">{t.icon}</span>
                                <span className="font-black text-lg text-black">{t.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

        </div>

        {/* Footer Nav */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent pt-12">
            {step > 1 && (
                <div className="flex gap-4">
                     {step > 1 && (
                        <button 
                            onClick={() => setStep(s => s - 1)}
                            className="px-6 py-4 rounded-2xl font-bold text-zinc-500 bg-zinc-100 hover:bg-zinc-200 transition-colors"
                        >
                            Back
                        </button>
                     )}
                    
                    {step < 4 ? (
                        <button 
                            onClick={() => setStep(s => s + 1)}
                            className="flex-1 bg-black text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
                        >
                            Next <ArrowRight className="w-5 h-5" />
                        </button>
                    ) : (
                        <button 
                            onClick={handleFinish}
                            className="flex-1 bg-black text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
                        >
                            Start Yapping <CheckCircle2 className="w-5 h-5" />
                        </button>
                    )}
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default Onboarding;
