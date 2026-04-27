"use client";

import { useEffect, useState } from 'react';
import NewsCard from '@/components/NewsCard';

interface NewsArticle {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
    source: string;
    date: string;
}

export default function NewsPage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch("/api/news");
                const data = await res.json();

                console.log(data.data || [])

                setArticles(data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchNews();
    }, [])

    return (
        <div className="bg-white min-h-screen py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="max-w-3xl mb-16">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-primary/5 text-primary mb-6 border border-primary/10">
                        Latest Updates
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 sm:text-6xl mb-6 leading-tight">
                        Web3 News & <br />
                        <span className="text-primary">Insights</span>
                    </h1>
                    <p className="text-xl text-gray-500 leading-relaxed">
                        Stay up-to-date with the latest developments, breakthroughs, and analyses in the Web3 ecosystem.
                    </p>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {articles.map((article: any) => (
                        <NewsCard key={article.id} article={article} />
                    ))}
                </div>

                {/* Empty State (if no articles) */}
                {articles.length === 0 && (
                    <div className="text-center py-32 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                        <div className="inline-flex p-6 rounded-full bg-white shadow-sm mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18.75c0 .621-.504 1.125-1.125 1.125H12a9 9 0 11-9-9h9.75c1.017 0 1.85.903 1.85 2.025v.381m-4.5 4.5v-4.5m4.5 4.5v-4.5" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No news articles found</h3>
                        <p className="text-gray-500 text-lg">Check back later for the latest Web3 updates.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
