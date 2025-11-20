
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2, ArrowUp, MoreVertical, Settings, Instagram, Mail, Linkedin, Smartphone, Check, X, MessageCircle } from 'lucide-react';
import { ChatMessage, SocialUpdate, Contact, UserPreferences } from '../types';
import { chatWithAgent, generateReplySuggestions } from '../services/geminiService';

interface AgentChatProps {
  updates: SocialUpdate[];
  contacts: Contact[];
  userPrefs: UserPreferences;
}

const AgentChat: React.FC<AgentChatProps> = ({ updates, contacts, userPrefs }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Chat
  useEffect(() => {
    if (messages.length === 0) {
        const introMsg: ChatMessage = {
        id: 'init',
        role: 'model',
        text: `Yo! Caught ${updates.length} updates for you today. Let's lock in. 🔒`,
        timestamp: new Date()
        };

        // Add latest 2 updates as distinct cards in stream
        const recentUpdates = updates.slice(0, 2).map((u, index) => ({
            id: `update-${u.id}`,
            role: 'model' as const,
            text: "",
            timestamp: new Date(Date.now() + (index * 100)),
            relatedUpdate: u
        }));

        setMessages([introMsg, ...recentUpdates]);
    }
  }, [updates]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Simulate delay then reply
    if (textOverride) {
        setTimeout(() => {
             const confirmMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: "Sent. 🚀",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, confirmMsg]);
            setIsLoading(false);
        }, 800);
        return;
    }

    const responseText = await chatWithAgent(userMsg.text, updates, contacts);
    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  const handleDraftReply = async (update: SocialUpdate) => {
    const contact = contacts.find(c => c.id === update.contactId);
    if (!contact) return;

    setIsLoading(true);
    const suggestions = await generateReplySuggestions(update, contact, userPrefs);
    
    const suggestionMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'model',
        text: `Reply to ${contact.name}:`,
        timestamp: new Date(),
        replySuggestions: suggestions
    };

    setMessages(prev => [...prev, suggestionMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-white relative font-sans">
      
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-white/90 backdrop-blur-md px-5 py-4 z-20 border-b border-zinc-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-400 rounded-[1rem] rotate-3 flex items-center justify-center text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <span className="font-black text-lg">K</span>
            </div>
            <div>
                <h1 className="font-black text-black text-base leading-none tracking-tight">Kinship</h1>
                <div className="flex items-center gap-1 mt-0.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">Online</p>
                </div>
            </div>
        </div>
        <button className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-900">
            <MoreVertical className="w-6 h-6" />
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto px-4 pt-24 pb-4 space-y-6">
        {messages.map((msg) => {
            const isUser = msg.role === 'user';
            
            // 1. Rich Update Card
            if (msg.relatedUpdate) {
                const update = msg.relatedUpdate;
                const contact = contacts.find(c => c.id === update.contactId);
                if (!contact) return null;
                const hasImage = !!update.imageUrl;

                return (
                    <div key={msg.id} className="flex justify-start animate-fade-up">
                        <div className="max-w-[90%] w-full">
                             {/* Card */}
                            <div className="bg-white border-2 border-black rounded-[2rem] overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                                {/* Header */}
                                <div className="px-4 py-3 flex items-center gap-3 bg-zinc-50 border-b-2 border-black">
                                     <img src={contact.avatarUrl} className="w-8 h-8 rounded-full border-2 border-black" alt={contact.name} />
                                     <div>
                                        <p className="text-sm font-bold text-black leading-none">{contact.name}</p>
                                        <p className="text-[10px] font-bold text-zinc-500 uppercase mt-0.5">{update.channel}</p>
                                     </div>
                                </div>

                                {hasImage ? (
                                    <div className="relative aspect-video bg-zinc-100">
                                        <img src={update.imageUrl} className="w-full h-full object-cover" alt="Content" />
                                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                                             <p className="text-white text-xs font-bold line-clamp-1">{update.content}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-5 bg-white">
                                        <p className="text-black font-bold text-lg leading-snug">"{update.content}"</p>
                                    </div>
                                )}

                                {/* Action */}
                                <button 
                                    onClick={() => handleDraftReply(update)}
                                    className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 border-t-2 border-black transition-colors"
                                >
                                    <Sparkles className="w-4 h-4" /> Draft Reply
                                </button>
                            </div>
                        </div>
                    </div>
                );
            }

            // 2. Standard Chat Message
            return (
                <div key={msg.id} className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} animate-fade-up`}>
                    <div className={`flex flex-col max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
                        <div 
                            className={`px-6 py-4 text-[16px] font-medium shadow-sm leading-relaxed
                            ${isUser 
                                ? 'bg-black text-white rounded-[2rem] rounded-tr-sm' 
                                : 'bg-zinc-100 text-black rounded-[2rem] rounded-tl-sm border border-zinc-200'}`
                            }
                        >
                            {msg.text}
                        </div>

                        {/* Suggestion Chips */}
                        {msg.replySuggestions && (
                            <div className="mt-3 flex flex-wrap gap-2 w-full">
                                {msg.replySuggestions.map((suggestion, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => handleSend(suggestion)}
                                        className="px-5 py-3 bg-white border-2 border-black rounded-xl hover:bg-cyan-400 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-sm font-bold text-black text-left"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            );
        })}
        
        {isLoading && (
          <div className="flex justify-start w-full animate-fade-in pl-2">
             <div className="bg-zinc-100 px-5 py-3 rounded-[2rem] rounded-tl-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-black animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-zinc-100 pb-6">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Kinship..."
            className="w-full bg-zinc-50 border-2 border-zinc-100 focus:border-black rounded-full px-6 py-4 pr-14 text-black placeholder-zinc-400 font-bold text-base transition-all outline-none"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 bottom-2 w-12 bg-black disabled:opacity-20 disabled:hover:bg-black text-white rounded-full flex items-center justify-center transition-all active:scale-90"
          >
            <ArrowUp className="w-6 h-6 stroke-[3]" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgentChat;
