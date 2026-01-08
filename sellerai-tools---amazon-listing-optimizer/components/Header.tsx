
import React from 'react';

interface HeaderProps {
  isDark: boolean;
  toggleDark: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDark, toggleDark }) => {
  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-colors ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-amazon-orange rounded flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            SellerAI <span className="text-amazon-orange">Tools</span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            <a href="#" className={`hover:text-amazon-orange transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Dashboard</a>
            <a href="#" className={`hover:text-amazon-orange transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Resources</a>
            <a href="#" className={`hover:text-amazon-orange transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Pricing</a>
          </nav>
          
          <button 
            onClick={toggleDark}
            className={`p-2 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors ${isDark ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'}`}
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
