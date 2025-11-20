
import React, { useState, useEffect } from 'react';
import { X, Sparkles, ArrowRight, Check, MessageCircle, Heart, Instagram, Mail, Smartphone, Linkedin, Calendar, Filter, ChevronRight } from 'lucide-react';
import { SocialUpdate, Contact, UserPreferences } from '../types';
import { generateReplySuggestions } from '../services/geminiService';

interface FeedProps {
  updates: SocialUpdate[];
  contacts: Contact[];
  userPrefs: UserPreferences;
}

const Feed: React.FC<FeedProps> = ({ updates, contacts, userPrefs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReplying, setIsReplying] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const currentUpdate = updates[currentIndex];
  const contact = currentUpdate ? contacts.find(c => c.id === currentUpdate.contactId) : null;

  // Reset when updates change
  useEffect(() => {
    setCurrentIndex(0);
  }, [updates.length]);

  const handleSkip = () => {
    setDirection('left');
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setDirection(null);
    }, 200);
  };

  const handleStartReply = async () => {
    setIsReplying(true);
    setLoadingSuggestions(true);
    if (contact && currentUpdate) {
      const replies = await generateReplySuggestions(currentUpdate, contact, userPrefs);
      setSuggestions(replies);
    }
    setLoadingSuggestions(false);
  };

  const handleSendReply = () => {
    setDirection('right');
    setTimeout(() => {
      setIsReplying(false);
      setSuggestions([]);
      setCurrentIndex(prev => prev + 1);
      setDirection(null);
    }, 200);
  };

  const getChannelIcon = (channel: string) => {
    switch(channel) {
        case 'Instagram': return <Instagram className="w-3 h-3" />;
        case 'Email': return <Mail className="w-3 h-3" />;
        case 'LinkedIn': return <Linkedin className="w-3 h-3" />;
        default: return <Smartphone className="w-3 h-3" />;
    }
  };

  if (!currentUpdate || !contact) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 animate-fade-in bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        
        <div className="w-24 h-24 bg-cyan-400 rounded-full flex items-center justify-center mb-6 animate-scale-in shadow-[0_0_30px_rgba(34,211,238,0.5)]">
          <Check className="w-12 h-12 text-black stroke-[4]" />
        </div>
        <h2 className="text-4xl font-black mb-2 tracking-tight">All Caught Up!</h2>
        <p className="text-zinc-400 font-medium text-lg">Go touch some grass 🌱</p>
      </div>
    );
  }

  const isVisual = !!currentUpdate.imageUrl && currentUpdate.content.length < 120;

  return (
    <div className="w-full h-full flex flex-col relative bg-black">
        
        {/* Story Progress Bars */}
        <div className="absolute top-0 left-0 right-0 z-40 flex gap-1 p-2">
            {updates.map((_, idx) => (
                <div key={idx} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                    <div 
                        className={`h-full bg-white transition-all duration-300 ${
                            idx < currentIndex ? 'w-full' : idx === currentIndex ? 'w-1/2' : 'w-0'
                        }`} 
                    />
                </div>
            ))}
        </div>

        {/* Main Card Container */}
        <div className="flex-1 relative overflow-hidden">
                
                {/* Card */}
                <div 
                    className={`
                        absolute inset-0 bg-zinc-900 overflow-hidden transform transition-all duration-300 ease-out
                        ${direction === 'left' ? '-translate-x-full opacity-50 rotate-[-10deg]' : ''}
                        ${direction === 'right' ? 'translate-x-full opacity-50 rotate-[10deg]' : ''}
                    `}
                >
                    {/* Header */}
                    <div className="absolute top-6 left-0 right-0 px-5 z-20 flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md p-2 pr-4 rounded-full border border-white/10">
                            <img src={contact.avatarUrl} alt={contact.name} className="w-8 h-8 rounded-full border border-white/50" />
                            <div>
                                <h3 className="font-bold text-white text-sm leading-none">{contact.name}</h3>
                                <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-wide mt-0.5">{currentUpdate.channel}</p>
                            </div>
                        </div>
                        <div className="bg-cyan-400 text-black text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider">
                            {currentUpdate.type}
                        </div>
                    </div>

                    {/* Content */}
                    {isVisual ? (
                        // Visual Mode
                        <div className="absolute inset-0">
                            <img src={currentUpdate.imageUrl} alt="Update" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />
                            
                            <div className="absolute bottom-24 left-0 right-0 p-6">
                                <p className="text-3xl md:text-4xl font-black text-white leading-[0.95] tracking-tight drop-shadow-lg">
                                    "{currentUpdate.content}"
                                </p>
                                <p className="text-xs font-bold text-white/60 mt-4 uppercase tracking-widest">2 hours ago</p>
                            </div>
                        </div>
                    ) : (
                        // Text Mode
                        <div className="absolute inset-0 bg-rose-400 flex flex-col items-center justify-center p-8 text-center relative">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-20 mix-blend-overlay"></div>
                            
                            <MessageCircle className="w-16 h-16 text-black mb-6 opacity-80" />

                            <h2 className="text-3xl md:text-4xl font-black text-black leading-tight mb-8 max-w-xs mx-auto">
                                "{currentUpdate.content}"
                            </h2>

                            {currentUpdate.imageUrl && (
                                <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-3">
                                    <img src={currentUpdate.imageUrl} className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Reply Overlay */}
                    {isReplying && (
                        <div className="absolute inset-0 z-30 bg-black/90 backdrop-blur-xl flex flex-col animate-in slide-in-from-bottom-10 duration-200 p-6">
                            <div className="flex items-center justify-between mt-8 mb-8">
                                <span className="font-black text-2xl text-white tracking-tight">Draft Reply</span>
                                <button onClick={() => setIsReplying(false)} className="p-2 bg-zinc-800 rounded-full text-white">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 space-y-4 overflow-y-auto">
                                {loadingSuggestions ? (
                                    <div className="flex flex-col items-center justify-center h-40 gap-4">
                                        <Sparkles className="w-10 h-10 text-cyan-400 animate-spin" />
                                        <p className="text-zinc-400 font-bold">Cooking...</p>
                                    </div>
                                ) : (
                                    suggestions.map((suggestion, idx) => (
                                        <button
                                            key={idx}
                                            onClick={handleSendReply}
                                            className="w-full text-left p-6 rounded-[1.5rem] bg-zinc-900 border border-zinc-800 hover:bg-cyan-400 hover:text-black hover:border-cyan-400 transition-all group"
                                        >
                                            <p className="text-lg font-bold leading-snug group-hover:text-black text-zinc-200">"{suggestion}"</p>
                                            <div className="mt-2 flex items-center text-xs font-black uppercase tracking-widest opacity-50 group-hover:opacity-100 group-hover:text-black">
                                                Send It <ArrowRight className="w-3 h-3 ml-2" />
                                            </div>
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>
        </div>

        {/* Controls Dock */}
        {!isReplying && (
            <div className="absolute bottom-6 left-0 right-0 px-6 flex gap-4 z-30">
                <button 
                    onClick={handleSkip}
                    className="flex-1 bg-zinc-900/80 backdrop-blur-md border border-white/10 text-white h-16 rounded-2xl font-black text-lg active:scale-95 transition-transform flex items-center justify-center gap-2 hover:bg-zinc-800"
                >
                    <X className="w-6 h-6" /> Skip
                </button>
                <button 
                    onClick={handleStartReply}
                    className="flex-[2] bg-cyan-400 text-black h-16 rounded-2xl font-black text-lg shadow-[0_0_20px_rgba(34,211,238,0.4)] active:scale-95 transition-transform flex items-center justify-center gap-2 hover:bg-cyan-300"
                >
                    <Sparkles className="w-6 h-6" /> Reply
                </button>
            </div>
        )}
    </div>
  );
};

export default Feed;