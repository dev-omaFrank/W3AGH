import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface NewsCardProps {
  article: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    link?: string;
    source: string;
    date: string;
  };
}

const NewsCard = ({ article }: NewsCardProps) => {
  const slugify = (title: string) => {
    return title.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }
  
  return (
    <div className="group relative bg-white border border-gray-100 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 overflow-hidden">
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={article.imageUrl}
          alt={article.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
          unoptimized
        />
      </div>
      <div className="p-6 flex flex-col justify-between h-[calc(100%-12rem)]">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-gray-500 mb-4 line-clamp-3">
            {article.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{article.source}</span>
            <span className="text-xs text-gray-500">{article.date}</span>
          </div>
          <Link
            href={`/news/${article.id}/${slugify(article.title)}`}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-400 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm"
          >
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
