import Link from 'next/link';
import { ArrowRight, Wallet, Layout, Code } from 'lucide-react';

interface GrantCardProps {
  grant: {
    id: string;
    title: string;
    description: string;
    category: string;
    ecosystem: string;
    stage: string;
    funding: string;
  };
}

const GrantCard = ({ grant }: GrantCardProps) => {
  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'defi': return <Wallet className="w-5 h-5" />;
      case 'gaming': return <Layout className="w-5 h-5" />;
      case 'infrastructure': return <Code className="w-5 h-5" />;
      default: return <Layout className="w-5 h-5" />;
    }
  };

  return (
    <div className="group relative bg-white border border-gray-100 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
      
      <div className="relative flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className="p-2.5 bg-primary/5 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
            {getIcon(grant.category)}
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary-light text-primary-darker">
              {grant.category}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-gray-100 text-gray-400">
              {grant.ecosystem}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
          {grant.title}
        </h3>
        
        <p className="text-sm text-gray-500 mb-6 line-clamp-2 leading-relaxed">
          {grant.description}
        </p>

        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Funding</span>
            <span className="text-sm font-bold text-gray-900">{grant.funding}</span>
          </div>
          
          <Link
            href={`/grants/${grant.id}`}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-400 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm"
          >
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GrantCard;
