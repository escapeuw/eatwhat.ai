import React, { createContext, useContext, useState, ReactNode } from 'react';

type AppState = 'landing' | 'mood' | 'result';
type Suggestion = {
    name: string;
    description: string;
}
type SuggestionResponse = {
    reason: string;
    suggestions: Suggestion[];
};

interface AppContextProps {
    currentView: AppState;
    setCurrentView: (view: AppState) => void;
    mood: string;
    setMood: (mood: string) => void;
    suggestionResponse: SuggestionResponse | null;
    setSuggestionResponse: (s: SuggestionResponse | null) => void;
    uuid: string;
    setUuid: (id: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Check if user prefers dark mode by default

    const [currentView, setCurrentView] = useState<AppState>('landing');
    const [mood, setMood] = useState('');
    const [suggestionResponse, setSuggestionResponse] = useState<SuggestionResponse | null>(null);
    const [uuid, setUuid] = useState("");



    return (
        <AppContext.Provider
            value={{
                currentView,
                setCurrentView,
                mood,
                setMood,
                suggestionResponse,
                setSuggestionResponse,
                uuid,
                setUuid,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
