
import React from 'react';
import { Contact, Circle, Channel } from '../types';
import { Instagram, Mail, Linkedin, Smartphone, MoreHorizontal, Plus, ChevronRight } from 'lucide-react';

interface CirclesProps {
  contacts: Contact[];
}

const Circles: React.FC<CirclesProps> = ({ contacts }) => {
  // Group contacts by circle
  const groupedContacts = contacts.reduce((acc, contact) => {
    if (!acc[contact.circle]) {
      acc[contact.circle] = [];
    }
    acc[contact.circle].push(contact);
    return acc;
  }, {} as Record<Circle, Contact[]>);

  const getChannelIcon = (channel: Channel) => {
    switch(channel) {
        case Channel.INSTAGRAM: return <Instagram className="w-3 h-3" />;
        case Channel.EMAIL: return <Mail className="w-3 h-3" />;
        case Channel.LINKEDIN: return <Linkedin className="w-3 h-3" />;
        default: return <Smartphone className="w-3 h-3" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative font-sans">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 bg-white/90 backdrop-blur-md p-5 z-20 border-b border-zinc-100 flex items-center justify-between">
            <h1 className="font-black text-black text-xl tracking-tight">My Circle</h1>
            <button className="p-2 bg-black text-white rounded-full hover:scale-105 transition-transform shadow-md">
                <Plus className="w-5 h-5 stroke-[3]" />
            </button>
        </div>

        <div className="flex-1 overflow-y-auto pt-20 pb-6 px-5 space-y-8 scrollbar-hide">
            {(Object.entries(groupedContacts) as [string, Contact[]][]).map(([circleName, circleContacts]) => (
                <div key={circleName} className="animate-fade-up">
                    <div className="flex items-center justify-between mb-4 pl-2">
                        <h2 className="text-sm font-black text-zinc-400 uppercase tracking-widest">{circleName}</h2>
                        <span className="bg-cyan-400 text-black text-[10px] font-black px-2 py-0.5 rounded-md border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            {circleContacts.length}
                        </span>
                    </div>
                    
                    <div className="space-y-3">
                        {circleContacts.map(contact => (
                            <div key={contact.id} className="flex items-center p-4 rounded-[1.5rem] bg-white border-2 border-zinc-100 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all group cursor-pointer">
                                <div className="relative">
                                    <img src={contact.avatarUrl} alt={contact.name} className="w-14 h-14 rounded-full object-cover border-2 border-black" />
                                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 border-2 border-white rounded-full" />
                                </div>
                                
                                <div className="ml-4 flex-1">
                                    <h3 className="font-black text-black text-lg">{contact.name}</h3>
                                    <div className="flex gap-2 mt-1">
                                        {contact.channels.map(channel => (
                                            <div key={channel} className="bg-zinc-100 p-1 rounded-md text-zinc-400 group-hover:text-black group-hover:bg-cyan-400 transition-colors">
                                                {getChannelIcon(channel)}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Circles;