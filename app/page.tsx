import Link from 'next/link';
import { ArrowRight, CheckCircle, Search, Zap, Shield, Globe, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-white py-24 lg:py-40 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-primary/5 text-primary mb-8 border border-primary/10 animate-fade-in">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-3 animate-pulse"></span>
              15+ Active Grants Updated Weekly
            </div>
            
            <h1 className="text-5xl font-black tracking-tight text-gray-900 sm:text-7xl mb-8 leading-[1.1]">
              Discover Web3 Grants <br />
              <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">That Fit Your Project</span>
            </h1>
            
            <p className="text-xl text-gray-500 mb-12 leading-relaxed max-w-2xl mx-auto">
              AI-powered matching for accelerators, grants, and funding opportunities across the entire Web3 ecosystem.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href="/grants"
                className="group relative inline-flex items-center justify-center px-10 py-5 border border-transparent text-lg font-bold rounded-2xl text-white bg-primary hover:bg-primary-dark transition-all shadow-2xl shadow-primary/20 hover:shadow-primary/40 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Browse Grants
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </Link>
              
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center px-10 py-5 border border-gray-100 text-lg font-bold rounded-2xl text-gray-900 bg-white hover:bg-gray-50 transition-all shadow-sm hover:shadow-md active:scale-95"
              >
                How It Works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signal Stats */}
      <section className="bg-white py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-8 rounded-3xl bg-gray-50/50 border border-gray-100/50 transition-all hover:bg-white hover:shadow-xl hover:shadow-primary/5 group">
              <div className="inline-flex p-3 rounded-2xl bg-primary/5 text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-2">15+</div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Active Grants</div>
            </div>
            <div className="p-8 rounded-3xl bg-gray-50/50 border border-gray-100/50 transition-all hover:bg-white hover:shadow-xl hover:shadow-primary/5 group">
              <div className="inline-flex p-3 rounded-2xl bg-primary/5 text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Globe className="w-6 h-6" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-2">10+</div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Web3 Ecosystems</div>
            </div>
            <div className="p-8 rounded-3xl bg-gray-50/50 border border-gray-100/50 transition-all hover:bg-white hover:shadow-xl hover:shadow-primary/5 group">
              <div className="inline-flex p-3 rounded-2xl bg-primary/5 text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Shield className="w-6 h-6" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-2">Weekly</div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Updated Opportunities</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-black text-gray-900 sm:text-5xl mb-6">How It Works</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Three simple steps to secure your next funding round.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-y-1/2"></div>
            
            <div className="relative flex flex-col items-center text-center group">
              <div className="h-24 w-24 bg-white border-2 border-primary/10 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-primary/5 group-hover:border-primary group-hover:scale-110 transition-all duration-500 relative z-10">
                <Search className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Browse Opportunities</h3>
              <p className="text-gray-500 leading-relaxed">Explore our curated list of grants and accelerators from top Web3 ecosystems.</p>
            </div>
            
            <div className="relative flex flex-col items-center text-center group">
              <div className="h-24 w-24 bg-white border-2 border-primary/10 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-primary/5 group-hover:border-primary group-hover:scale-110 transition-all duration-500 relative z-10">
                <Zap className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Tell Us About Your Project</h3>
              <p className="text-gray-500 leading-relaxed">Provide details about your project stage, category, and technical requirements.</p>
            </div>
            
            <div className="relative flex flex-col items-center text-center group">
              <div className="h-24 w-24 bg-white border-2 border-primary/10 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-primary/5 group-hover:border-primary group-hover:scale-110 transition-all duration-500 relative z-10">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Get AI-Matched</h3>
              <p className="text-gray-500 leading-relaxed">Receive personalized recommendations for the grants you're most likely to win.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-primary rounded-[3rem] p-12 md:p-24 overflow-hidden text-center shadow-2xl shadow-primary/30">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">Ready to scale your <br />Web3 project?</h2>
              <p className="text-xl text-white/80 mb-12 max-w-xl mx-auto">Join hundreds of builders who have found their funding through GrantHub.</p>
              <Link
                href="/grants"
                className="inline-flex items-center justify-center px-12 py-6 border border-transparent text-xl font-bold rounded-2xl text-primary bg-white hover:bg-gray-50 transition-all shadow-2xl active:scale-95"
              >
                Browse All Grants
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
