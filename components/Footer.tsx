const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-bold text-primary">GrantHub</span>
            <p className="mt-4 text-gray-500 text-sm">
              The premier platform for discovering Web3 grants and accelerator opportunities.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-primary">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-primary">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-primary">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-primary">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 flex justify-between items-center">
          <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} GrantHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
