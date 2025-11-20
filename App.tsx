
import React, { useState } from 'react';
import AgentChat from './components/AgentChat';
import Feed from './components/Feed';
import Circles from './components/Circles';
import BottomNav from './components/BottomNav';
import Onboarding from './components/Onboarding';
import { INITIAL_UPDATES, MOCK_CONTACTS } from './constants';
import { UserPreferences, Contact } from './types';

function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'digest' | 'circles'>('chat');
  const [userPrefs, setUserPrefs] = useState<UserPreferences>({
    tone: 'casual',
    emojiUsage: 'minimal',
    forbiddenWords: []
  });
  const [myContacts, setMyContacts] = useState<Contact[]>(MOCK_CONTACTS);

  // Filter updates based on selected contacts
  const myUpdates = INITIAL_UPDATES.filter(u => myContacts.find(c => c.id === u.contactId));

  const handleOnboardingComplete = (prefs: UserPreferences, selectedContactIds: string[]) => {
    setUserPrefs(prefs);
    // Filter contacts based on selection
    if (selectedContactIds.length > 0) {
        setMyContacts(MOCK_CONTACTS.filter(c => selectedContactIds.includes(c.id)));
    }
    setIsOnboarded(true);
  };

  if (!isOnboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="flex min-h-screen bg-cyan-50 items-center justify-center p-0 md:p-6 lg:p-8 font-sans">
        <main className="w-full md:max-w-[400px] h-[100dvh] md:h-[850px] relative flex flex-col bg-white md:rounded-[2.5rem] shadow-2xl shadow-black/5 border-0 md:border border-white overflow-hidden">
            
            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative bg-white">
                {activeTab === 'chat' && (
                    <div className="absolute inset-0 animate-fade-in z-10">
                        <AgentChat 
                            updates={myUpdates} 
                            contacts={myContacts} 
                            userPrefs={userPrefs}
                        />
                    </div>
                )}
                
                {activeTab === 'digest' && (
                    <div className="absolute inset-0 animate-fade-in z-10 bg-black">
                         <Feed 
                            updates={myUpdates} 
                            contacts={myContacts} 
                            userPrefs={userPrefs}
                        />
                    </div>
                )}
                
                {activeTab === 'circles' && (
                    <div className="absolute inset-0 animate-fade-in z-10">
                         <Circles contacts={myContacts} />
                    </div>
                )}
            </div>

            {/* Bottom Navigation */}
            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

        </main>
        
        {/* Decorative Elements (Desktop only) - Brain Rot Vibes */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden hidden md:block">
             {/* Random geometric floaties */}
            <div className="absolute top-[10%] left-[20%] w-32 h-32 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute top-[10%] left-[20%] w-32 h-32 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute bottom-[20%] right-[20%] w-72 h-72 bg-rose-400 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
            <div className="absolute top-[40%] right-[30%] w-40 h-40 bg-violet-400 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        </div>
    </div>
  );
}

export default App;