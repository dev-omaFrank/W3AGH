import Link from 'next/link';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm rotate-45"></div>
            </div>
            <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
              Grant<span className="text-primary">Hub</span>
            </Link>
          </div>
          
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              Home
            </Link>

            <Link
              href="/grants"
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              Browse 
            </Link>

            <Link
              href="/saved"
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              Saved 
            </Link>

            <Link
              href="/match"
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              Match 
            </Link>

            <Link
              href="/audit"
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              Audit Your Smart Contract 
            </Link>

            <Link
              href="/news"
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              News Updates 
            </Link>

            <Link
              href="/grants"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-dark transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Get Started
            </Link>
          </div>

          <div className="sm:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
