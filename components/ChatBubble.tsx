'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface ChatBubbleProps {
    grantContext: {
        title: string;
        description: string;
        category: string;
        ecosystem: string;
        funding: string;
    };
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ grantContext }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: `Hi! I'm your Grant Assistant. Ask me anything about the ${grantContext.title}!` }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim()) return;
        const userMessage = input;

        setMessages(prev => [
            ...prev,
            { role: 'user', content: userMessage }
        ]);

        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch("/api/grant-info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...grantContext,
                    message: input
                }),
            });

            const result = await response.json();

            setMessages(prev => [
            ...prev,
            { role: 'assistant', content: result.reply }
        ]);


        } catch (err) {
            setMessages(prev => [
                ...prev,
                { role: 'assistant', content: "Error occurred" }
            ]);
            console.error(err);
        }finally{
            setIsLoading(false);
        }
    }


    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-80 sm:w-96 h-[500px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                    {/* Header */}
                    <div className="bg-primary p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <Bot className="text-white w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm">Grant Assistant</h3>
                                <p className="text-white/70 text-[10px] uppercase tracking-widest font-bold">Online</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/80 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                                    ? 'bg-primary text-white rounded-tr-none shadow-md shadow-primary/10'
                                    : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none shadow-sm'
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm">
                                    <Loader2 className="w-4 h-4 text-primary animate-spin" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-100">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend(e)}
                                placeholder="Ask a question..."
                                className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="absolute right-2 p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors disabled:opacity-50"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-90 ${isOpen ? 'bg-gray-900 text-white rotate-90' : 'bg-primary text-white hover:bg-primary-dark hover:-translate-y-1'
                    }`}
            >
                {isOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
            </button>
        </div>
    );
};

export default ChatBubble;
