import grants from '@/app/data/grants.json';
import GrantCard from '@/components/GrantCard';
import { Search, Filter } from 'lucide-react';

export default function GrantsPage() {
  return (
    <div className="bg-white min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-primary/5 text-primary mb-6 border border-primary/10">
            Opportunities
          </div>
          <h1 className="text-4xl font-black text-gray-900 sm:text-6xl mb-6 leading-tight">
            Available Grants & <br />
            <span className="text-primary">Accelerators</span>
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            Browse opportunities from leading Web3 ecosystems and find the perfect funding for your project.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row gap-6 mb-16 items-center justify-between">
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            {['All', 'DeFi', 'Gaming', 'Infrastructure', 'General'].map((category) => (
              <button
                key={category}
                className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 active:scale-95 ${
                  category === 'All'
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search grants, ecosystems..."
              className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Grants Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {grants.map((grant) => (
            <GrantCard key={grant.id} grant={grant} />
          ))}
        </div>

        {/* Empty State (if no grants) */}
        {grants.length === 0 && (
          <div className="text-center py-32 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
            <div className="inline-flex p-6 rounded-full bg-white shadow-sm mb-6">
              <Filter className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No grants found</h3>
            <p className="text-gray-500 text-lg">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
