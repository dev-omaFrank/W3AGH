"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, User, Share2, Bookmark, Clock } from 'lucide-react';

interface NewsArticle {
    id: number;
    title: string;
    description: string;
    content: string;
    imageUrl: string;
    source: string;
    author: string;
    date: string;
    readTime: string;
}



export default function NewsArticlePage({ params }: { params: { id: string; slug: string } }) {
    //   const article = await getArticleById(params.id);

    //   if (!article) {
    //     notFound();
    //   }

    const [article, setArticle] = useState<NewsArticle | null>(null);
    const [loading, setLoading] = useState(true);
    const { id, slug } = params;

    useEffect(() => {
        const fetchNewsArticle = async () => {
            try {
                const res = await fetch(`/api/news/${id}/${slug}`);
                const data = await res.json();

                console.log(data.data || [])

                setArticle(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if(id) fetchNewsArticle();

        if(!id && !slug) return console.log('Missing id and slug');
    }, [id, slug]);

    if (loading) return <div className="text-center py-32 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
        <div className="inline-flex p-6 rounded-full bg-white shadow-sm mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18.75c0 .621-.504 1.125-1.125 1.125H12a9 9 0 11-9-9h9.75c1.017 0 1.85.903 1.85 2.025v.381m-4.5 4.5v-4.5m4.5 4.5v-4.5" />
            </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Loading your news article</h3>
    </div>;

    if (!article) return <div className="text-center py-32 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
        <div className="inline-flex p-6 rounded-full bg-white shadow-sm mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18.75c0 .621-.504 1.125-1.125 1.125H12a9 9 0 11-9-9h9.75c1.017 0 1.85.903 1.85 2.025v.381m-4.5 4.5v-4.5m4.5 4.5v-4.5" />
            </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Couldn't find that article</h3>
        <p className="text-gray-500 text-lg">Go back to the news feed to read another.</p>
    </div>;

    return (
        <div className="bg-white min-h-screen py-12 sm:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Link */}
                <Link
                    href="/news"
                    className="group inline-flex items-center text-sm font-bold text-gray-400 hover:text-primary mb-12 transition-all duration-300"
                >
                    <div className="p-2 rounded-full bg-gray-50 group-hover:bg-primary/10 mr-3 transition-colors">
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    </div>
                    Back to news
                </Link>

                {/* Article Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-primary/5 text-primary border border-primary/10">
                            {article.source}
                        </span>
                        <div className="flex items-center text-gray-400 text-sm gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{article.readTime}</span>
                        </div>
                    </div>

                    <h1 className="text-4xl font-black text-gray-900 sm:text-6xl mb-8 leading-tight">
                        {article.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-primary">
                                <User className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">{article.author}</p>
                                <p className="text-xs text-gray-500">{article.date}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="p-2 rounded-full border border-gray-100 text-gray-400 hover:text-primary hover:border-primary transition-all">
                                <Share2 className="w-5 h-5" />
                            </button>
                            <button className="p-2 rounded-full border border-gray-100 text-gray-400 hover:text-primary hover:border-primary transition-all">
                                <Bookmark className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                <div className="relative w-full h-[400px] rounded-[2rem] overflow-hidden mb-12 shadow-2xl shadow-primary/5">
                    <Image
                        src={article.imageUrl}
                        alt={article.title}
                        layout="fill"
                        objectFit="cover"
                        priority
                        unoptimized
                    />
                </div>

                {/* Article Content */}
                <article className="prose prose-lg prose-primary max-w-none">
                    <div
                        className="text-xl text-gray-600 leading-relaxed space-y-6"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </article>

                {/* Footer / CTA */}
                <footer className="mt-20 pt-12 border-t border-gray-100">
                    <div className="bg-gray-50 rounded-[2rem] p-8 md:p-12 text-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay Informed on Web3</h3>
                        <p className="text-gray-500 mb-8 max-w-xl mx-auto">
                            Get the latest news, grant opportunities, and security audits delivered straight to your project.
                        </p>
                        <Link
                            href="/grants"
                            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-2xl text-white bg-primary hover:bg-primary-dark transition-all shadow-lg"
                        >
                            Explore Grants
                        </Link>
                    </div>
                </footer>
            </div>
        </div>
    );
}
