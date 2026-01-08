
import React from 'react';

interface PaywallProps {
  isDark: boolean;
  onSelect: (price: number) => void;
}

const Paywall: React.FC<PaywallProps> = ({ isDark, onSelect }) => {
  return (
    <div className={`mt-12 p-8 rounded-2xl border-2 border-dashed ${isDark ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-gray-50'}`}>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Unlock Unlimited Potential</h3>
        <p className={`opacity-70 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          You've used your free trial. Subscribe to unlock unlimited generations, CSV exports, and our advanced SEO Keyword Density tool.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Single Pass */}
        <div className={`p-8 rounded-xl border flex flex-col justify-between transition-transform hover:scale-105 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200 shadow-sm'}`}>
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amazon-orange/10 text-amazon-orange mb-4">One-Time</span>
            <h4 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Single Unlock</h4>
            <div className="flex items-baseline mb-6">
              <span className="text-3xl font-extrabold">$6</span>
              <span className="ml-1 opacity-60">/per generation</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm opacity-80">
              <li className="flex items-center"><svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg> Full Listing Generation</li>
              <li className="flex items-center"><svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg> CSV Data Export</li>
            </ul>
          </div>
          <button 
            onClick={() => onSelect(6)}
            className="w-full py-3 px-4 bg-amazon-orange text-white font-bold rounded-lg hover:bg-orange-600 transition-all min-h-[44px]"
          >
            Pay $6 once via Stripe
          </button>
        </div>

        {/* Monthly Subscription */}
        <div className={`p-8 rounded-xl border-2 border-amazon-orange flex flex-col justify-between transition-transform hover:scale-105 relative ${isDark ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
          <div className="absolute -top-4 right-8 bg-amazon-orange text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">Best Value</div>
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-green-100 text-green-700 mb-4">Unlimited Access</span>
            <h4 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Monthly Pro</h4>
            <div className="flex items-baseline mb-6">
              <span className="text-3xl font-extrabold">$18</span>
              <span className="ml-1 opacity-60">/month</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm opacity-80">
              <li className="flex items-center"><svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg> Unlimited AI Generations</li>
              <li className="flex items-center"><svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg> SEO Density Analyzer</li>
              <li className="flex items-center"><svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg> Auto-Renewal, Cancel Anytime</li>
            </ul>
          </div>
          <button 
            onClick={() => onSelect(18)}
            className="w-full py-3 px-4 bg-amazon-orange text-white font-bold rounded-lg hover:bg-orange-600 transition-all min-h-[44px]"
          >
            Subscribe for $18/mo
          </button>
        </div>
      </div>
      
      <p className="text-center mt-8 text-xs opacity-50 italic">
        Annual discount: Select monthly plan to see annual options at 30% off.
      </p>
    </div>
  );
};

export default Paywall;
