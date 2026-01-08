
import React from 'react';

const Footer: React.FC<{isDark: boolean}> = ({ isDark }) => {
  return (
    <footer className={`mt-20 border-t py-12 transition-colors ${isDark ? 'bg-gray-900 border-gray-800 text-gray-400' : 'bg-gray-100 border-gray-200 text-gray-600'}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>SellerAI Tools</h3>
            <p className="max-w-md mb-6 leading-relaxed">
              Empowering Amazon US Marketplace sellers with compliant, high-converting product listings powered by advanced Gemini AI models.
            </p>
            <div className="flex flex-wrap gap-4 items-center opacity-80">
              <span className="text-xs px-2 py-1 border rounded font-semibold uppercase tracking-wider">Powered by Gemini AI</span>
              <span className="text-xs px-2 py-1 border rounded font-semibold uppercase tracking-wider">Secure Payments by Stripe</span>
            </div>
          </div>
          
          <div>
            <h4 className={`font-bold mb-4 uppercase text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-amazon-orange">Privacy Policy (GDPR/FTC)</a></li>
              <li><a href="#" className="hover:text-amazon-orange">Refund Policy</a></li>
              <li><a href="#" className="hover:text-amazon-orange">Terms of Use</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className={`font-bold mb-4 uppercase text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:support@selleraitools.com" className="hover:text-amazon-orange">Contact Email</a></li>
              <li><a href="#" className="hover:text-amazon-orange">Help Center</a></li>
              <li><a href="#" className="hover:text-amazon-orange">Listing Audit</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8 text-center text-xs">
          <p className="mb-2 italic"> Disclaimer: This tool does not guarantee Amazon listing approval. Use as a professional reference.</p>
          <p>© {new Date().getFullYear()} SellerAI Tools. All rights reserved.</p>
        </div>
      </div>
      
      {/* Simulation for Google Analytics */}
      <div className="hidden">
        Google Analytics (UA-SELLERAI-12345)
      </div>
    </footer>
  );
};

export default Footer;
