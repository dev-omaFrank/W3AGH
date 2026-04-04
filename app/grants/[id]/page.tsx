import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, DollarSign, Target, Briefcase, ShieldCheck, Clock, Globe } from 'lucide-react';
import grants from '@/app/data/grants.json';

interface GrantDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return grants.map((grant) => ({
    id: grant.id,
  }));
}

export default function GrantDetailPage({ params }: GrantDetailPageProps) {
  const grant = grants.find((g) => g.id === params.id);

  if (!grant) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/grants"
          className="group inline-flex items-center text-sm font-bold text-gray-400 hover:text-primary mb-12 transition-all duration-300"
        >
          <div className="p-2 rounded-full bg-gray-50 group-hover:bg-primary/10 mr-3 transition-colors">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          </div>
          Back to listings
        </Link>

        {/* Header Section */}
        <div className="mb-20">
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-primary/5 text-primary border border-primary/10">
              {grant.category}
            </span>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-gray-100 text-gray-400">
              {grant.ecosystem}
            </span>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-gray-50 text-gray-500">
              {grant.stage}
            </span>
          </div>
          
          <h1 className="text-5xl font-black text-gray-900 sm:text-7xl mb-8 leading-tight max-w-4xl">
            {grant.title}
          </h1>
          
          <div className="flex flex-wrap gap-8 text-gray-500 font-medium">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Updated 2 days ago</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              <span>Global Application</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span>Verified Opportunity</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-16">
            {/* Description */}
            <section className="bg-gray-50/50 rounded-[3rem] p-10 md:p-16 border border-gray-100/50">
              <h2 className="text-3xl font-black text-gray-900 mb-8">Description</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {grant.description}
              </p>
            </section>

            {/* Eligibility */}
            <section className="p-10 md:p-16">
              <h2 className="text-3xl font-black text-gray-900 mb-8">Eligibility</h2>
              <div className="prose prose-lg prose-primary max-w-none">
                <p className="text-xl text-gray-600 leading-relaxed">
                  {grant.eligibility}
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-gray-100 rounded-[3rem] p-10 sticky top-24 shadow-2xl shadow-primary/5">
              <div className="space-y-10">
                <div className="group">
                  <div className="flex items-center text-primary mb-4">
                    <div className="p-2 rounded-xl bg-primary/5 group-hover:bg-primary group-hover:text-white transition-colors mr-3">
                      <DollarSign className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">Funding</span>
                  </div>
                  <p className="text-3xl font-black text-gray-900">{grant.funding}</p>
                </div>

                <div className="group">
                  <div className="flex items-center text-primary mb-4">
                    <div className="p-2 rounded-xl bg-primary/5 group-hover:bg-primary group-hover:text-white transition-colors mr-3">
                      <Target className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">Ecosystem</span>
                  </div>
                  <p className="text-2xl font-black text-gray-900">{grant.ecosystem}</p>
                </div>

                <div className="group">
                  <div className="flex items-center text-primary mb-4">
                    <div className="p-2 rounded-xl bg-primary/5 group-hover:bg-primary group-hover:text-white transition-colors mr-3">
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">Stage</span>
                  </div>
                  <p className="text-2xl font-black text-gray-900">{grant.stage}</p>
                </div>

                <div className="pt-6">
                  <a
                    href={grant.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-full inline-flex items-center justify-center px-8 py-6 border border-transparent text-xl font-bold rounded-2xl text-white bg-primary hover:bg-primary-dark transition-all shadow-2xl shadow-primary/20 hover:shadow-primary/40 active:scale-95 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Apply Now
                      <ExternalLink className="ml-3 h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </a>
                  <p className="mt-6 text-center text-sm font-medium text-gray-400">
                    Redirects to official ecosystem portal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
