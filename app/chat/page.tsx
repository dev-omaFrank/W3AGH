'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Plus, MessageSquare, Settings, Search, Trash2 } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

interface ChatSession {
    id: string;
    title: string;
    lastMessage: string;
}

const ChatPage: React.FC = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: "Hello! I'm your Web3 Grant Assistant. How can I help you today? I can assist with grant applications, project matching, or technical questions about blockchain development.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [sessions, setSessions] = useState<ChatSession[]>([
        // { id: '1', title: 'DeFi Project Advice', lastMessage: 'How do I apply for...' },
        // { id: '2', title: 'Solana Grant Requirements', lastMessage: 'What are the stages...' },
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleNewChat = () => {
        setMessages([{
            role: 'assistant',
            content: "Hello! I'm your Web3 Grant Assistant...",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        setInput('');
        setIsLoading(false);
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        setInput('');
        setMessages((prev) => [...prev, { role: 'user', content: userMessage, timestamp }]);
        setIsLoading(true);

        // --- LLM INTEGRATION POINT ---
        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: userMessage
                }),
            });

            if (!response.ok) { throw new Error("Failed to fetch response") }

            const result = await response.json();
            setMessages((prev) => [...prev, {
                role: 'assistant',
                content: result.reply,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);

        } catch (error) {
            setMessages((prev) => [...prev, {
                role: 'assistant',
                content: "I'm sorry, I encountered an error. Please try again.",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-[calc(100vh-64px)] bg-white overflow-hidden">
            {/* Sidebar - Hidden on mobile */}
            <aside className="hidden md:flex flex-col w-80 border-r border-gray-100 bg-gray-50/30">
                <div className="p-6">
                    <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95" onClick={handleNewChat}>
                        <Plus className="w-5 h-5" />
                        New Chat
                    </button>
                </div>

                <div className="px-6 mb-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search chats..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/10"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-3 space-y-1">
                    <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Recent Chats</p>
                    {sessions.map((session) => (
                        <button
                            key={session.id}
                            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all group text-left"
                        >
                            <div className="p-2 rounded-lg bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <MessageSquare className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900 truncate">{session.title}</p>
                                <p className="text-xs text-gray-500 truncate">{session.lastMessage}</p>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="p-6 border-t border-gray-100">
                    <button className="flex items-center gap-3 text-gray-500 hover:text-primary transition-colors text-sm font-medium">
                        <Settings className="w-5 h-5" />
                        Settings
                    </button>
                </div>
            </aside>

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col relative bg-white">
                {/* Chat Header */}
                <header className="h-16 border-b border-gray-100 flex items-center justify-between px-6 bg-white/80 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <Bot className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-gray-900">Web3 Grant Assistant</h2>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Always Active</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    <div className="max-w-3xl mx-auto space-y-8">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                            >
                                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-gray-900 text-white' : 'bg-primary text-white'
                                    }`}>
                                    {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                                </div>
                                <div className={`flex flex-col max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                    <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                        ? 'bg-primary text-white rounded-tr-none'
                                        : 'bg-gray-50 text-gray-700 border border-gray-100 rounded-tl-none'
                                        }`}>
                                        {msg.content}
                                    </div>
                                    <span className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        {msg.timestamp}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-sm">
                                    <Bot className="w-5 h-5" />
                                </div>
                                <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm">
                                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-6 bg-white border-t border-gray-100">
                    <div className="max-w-3xl mx-auto relative">
                        <textarea
                            rows={1}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder="Ask anything about Web3 grants..."
                            className="w-full pl-6 pr-16 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none shadow-inner"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all disabled:opacity-50 disabled:hover:bg-primary shadow-lg shadow-primary/20 active:scale-95"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="mt-3 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        AI can make mistakes. Verify important information.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default ChatPage;
