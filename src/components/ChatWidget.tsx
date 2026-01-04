import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Trash2, Sparkles } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { GeminiService, type ChatMessage } from '../services/geminiService';
import { MOCK_PROPERTIES } from '../api/mockData';
import type { Property } from '../api/mockData';

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const { messages, addMessage, clearMessages, isTyping, setIsTyping } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const geminiService = useRef(new GeminiService(MOCK_PROPERTIES));

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    // Welcome message on first open
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const welcomeMessage: ChatMessage = {
                id: 'welcome',
                role: 'assistant',
                content: "👋 Hi! I'm your AI property assistant. I can help you find properties, answer questions, and provide recommendations. Try asking me something like 'Show me 3-bedroom apartments' or 'What's available in Dubai Marina?'",
                timestamp: new Date()
            };
            addMessage(welcomeMessage);
        }
    }, [isOpen]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        // Add user message
        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: new Date()
        };
        addMessage(userMessage);
        setInputValue('');
        setIsTyping(true);

        // Get AI response
        try {
            const aiMessage = await geminiService.current.sendMessage(inputValue, messages);
            addMessage(aiMessage);
        } catch (error) {
            console.error('Chat error:', error); // Check browser console!
            console.error('Error details:', error instanceof Error ? error.message : 'Unknown error'); // See exact error
            addMessage({
                id: Date.now().toString(),
                role: 'assistant',
                content: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`, // Show error to user
                timestamp: new Date()
            });
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const formatTime = (date: Date) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <>
            {/* Floating Chat Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group"
                    aria-label="Open chat"
                >
                    <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                        AI
                    </span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-slate-700 animate-fade-in-up">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-full">
                                <Sparkles size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">AI Assistant</h3>
                                <p className="text-xs text-white/80">Powered by Gemini</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {messages.length > 1 && (
                                <button
                                    onClick={clearMessages}
                                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                                    title="Clear chat"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-950">
                        {messages.map((message) => (
                            <div key={message.id}>
                                {/* Message Bubble */}
                                <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${message.role === 'user'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700'
                                        }`}>
                                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                        <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                                            }`}>
                                            {formatTime(message.timestamp)}
                                        </p>
                                    </div>
                                </div>

                                {/* Property Cards */}
                                {message.properties && message.properties.length > 0 && (
                                    <div className="mt-3 space-y-2">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                            {message.properties.length} {message.properties.length === 1 ? 'property' : 'properties'} found:
                                        </p>
                                        {message.properties.map((property) => (
                                            <PropertyMiniCard key={property.id} property={property} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-slate-800 rounded-2xl px-4 py-3 border border-gray-200 dark:border-slate-700">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask me anything..."
                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                                disabled={isTyping}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!inputValue.trim() || isTyping}
                                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

// Mini Property Card Component
const PropertyMiniCard: React.FC<{ property: Property }> = ({ property }) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-gray-200 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex gap-3">
                <img
                    src={property.imageUrl}
                    alt={property.title}
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=200"; }}
                />
                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white truncate">{property.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{property.location}</p>
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-1">
                        AED {property.price.toLocaleString()}
                    </p>
                    <div className="flex gap-3 text-xs text-gray-600 dark:text-gray-400 mt-1">
                        <span>{property.bedrooms} Beds</span>
                        <span>{property.bathrooms} Baths</span>
                        <span>{property.sqft} sqft</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatWidget;
