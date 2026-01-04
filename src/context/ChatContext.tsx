import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { ChatMessage } from '../services/geminiService';

interface ChatContextType {
    messages: ChatMessage[];
    addMessage: (message: ChatMessage) => void;
    clearMessages: () => void;
    isTyping: boolean;
    setIsTyping: (typing: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const STORAGE_KEY = 'estateflow_chat_history';

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    // Load chat history from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                // Convert timestamp strings back to Date objects
                const messagesWithDates = parsed.map((msg: any) => ({
                    ...msg,
                    timestamp: new Date(msg.timestamp)
                }));
                setMessages(messagesWithDates);
            }
        } catch (error) {
            console.error('Failed to load chat history:', error);
        }
    }, []);

    // Save chat history to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        } catch (error) {
            console.error('Failed to save chat history:', error);
        }
    }, [messages]);

    const addMessage = (message: ChatMessage) => {
        setMessages(prev => [...prev, message]);
    };

    const clearMessages = () => {
        setMessages([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    const value: ChatContextType = {
        messages,
        addMessage,
        clearMessages,
        isTyping,
        setIsTyping
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = (): ChatContextType => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};
