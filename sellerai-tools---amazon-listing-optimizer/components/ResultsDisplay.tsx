
import React from 'react';
import { GeneratedContent } from '../types';
import { BANNED_TITLE_CHARS, MAX_TITLE_LENGTH, MAX_SEARCH_TERM_BYTES } from '../constants';

interface ResultsDisplayProps {
  content: GeneratedContent;
  isDark: boolean;
  isPremium: boolean;
  onExport: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ content, isDark, isPremium, onExport }) => {
  
  const checkTitleCompliance = (title: string) => {
    const hasBannedChars = BANNED_TITLE_CHARS.test(title);
    const isTooLong = title.length > MAX_TITLE_LENGTH;
    return { hasBannedChars, isTooLong, valid: !hasBannedChars && !isTooLong };
  };

  const calculateKeywordDensity = (text: string, keywords: string[]) => {
    if (!text || keywords.length === 0) return 0;
    const words = text.toLowerCase().match(/\b(\w+)\b/g) || [];
    const totalWords = words.length;
    let keywordCount = 0;
    
    keywords.forEach(k => {
      const regex = new RegExp(`\\b${k.toLowerCase()}\\b`, 'g');
      keywordCount += (text.toLowerCase().match(regex) || []).length;
    });

    return ((keywordCount / totalWords) * 100).toFixed(1);
  };

  const cardClass = `p-6 rounded-xl border mb-6 ${isDark ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 shadow-sm text-gray-800'}`;

  return (
    <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Generated Listing Elements</h2>
        {isPremium && (
          <button 
            onClick={onExport}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded font-bold hover:bg-green-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span>Export CSV</span>
          </button>
        )}
      </div>

      {/* Titles Section */}
      <div>
        <h3 className={`text-lg font-bold mb-4 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <span className="w-1.5 h-6 bg-amazon-orange mr-3 rounded-full"></span>
          Title Variations (Formula Optimized)
        </h3>
        <div className="space-y-4">
          {content.titles.map((title, i) => {
            const compliance = checkTitleCompliance(title);
            return (
              <div key={i} className={cardClass}>
                <div className="flex justify-between items-start gap-4">
                  <p className="text-lg font-medium flex-1">{title}</p>
                  <button className="text-amazon-orange hover:bg-orange-50 p-2 rounded">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 items-center text-xs">
                  <span className={`px-2 py-1 rounded-full font-bold ${compliance.valid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {compliance.valid ? '✓ Compliant' : '⚠ Non-Compliant'}
                  </span>
                  <span className={`px-2 py-1 rounded-full font-mono ${title.length > MAX_TITLE_LENGTH ? 'text-red-600 font-bold' : 'opacity-60'}`}>
                    {title.length} / {MAX_TITLE_LENGTH} characters
                  </span>
                  {compliance.hasBannedChars && (
                    <span className="text-red-500 font-bold">Contains special characters (!, $, /)</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bullet Points Section */}
      <div>
        <h3 className={`text-lg font-bold mb-4 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <span className="w-1.5 h-6 bg-amazon-orange mr-3 rounded-full"></span>
          Bullet Points (FABE Model)
        </h3>
        <div className="space-y-6">
          {content.bulletPoints.map((set, setIdx) => (
            <div key={setIdx} className={cardClass}>
              <h4 className="text-xs font-black uppercase tracking-widest opacity-40 mb-4">Variation Set {setIdx + 1}</h4>
              <ul className="space-y-4">
                {set.fabeSet.map((bp, bpIdx) => (
                  <li key={bpIdx} className="border-l-2 border-amazon-orange/30 pl-4 py-1">
                    <p className="text-sm italic opacity-60 mb-1">[{bp.feature}] - [{bp.advantage}] - [{bp.benefit}] - [{bp.evidence}]</p>
                    <p className="font-medium text-base leading-relaxed">{bp.combined}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Search Terms & Density Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className={`text-lg font-bold mb-4 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <span className="w-1.5 h-6 bg-amazon-orange mr-3 rounded-full"></span>
            Optimized Search Terms
          </h3>
          <div className={cardClass}>
            <div className="flex flex-wrap gap-2 mb-4">
              {content.searchTerms.map((term, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium">
                  {term}
                </span>
              ))}
            </div>
            <div className="text-xs opacity-60 mt-4 pt-4 border-t">
              <p>Total Byte Size: ~{new Blob(content.searchTerms).size} bytes (Limit: {MAX_SEARCH_TERM_BYTES})</p>
              <p>Lowercase: Yes | No prohibited terms: Yes</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className={`text-lg font-bold mb-4 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <span className="w-1.5 h-6 bg-amazon-orange mr-3 rounded-full"></span>
            Premium SEO Analysis
          </h3>
          <div className={cardClass}>
            {isPremium ? (
              <div>
                <div className="mb-6">
                  <label className="text-sm font-bold opacity-60 block mb-2">Keyword Density Suggestion</label>
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl font-black text-amazon-orange">
                      {calculateKeywordDensity(content.bulletPoints[0].fabeSet.map(b => b.combined).join(' '), content.searchTerms)}%
                    </div>
                    <div className="text-sm">
                      <p className="font-bold text-green-600">Optimal (2.0% - 4.0%)</p>
                      <p className="opacity-60">Amazon emphasizes natural relevance. Avoid over-stuffing.</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-xs">
                  Pro-tip: Distribute your search terms across titles and backend search fields for maximum indexing.
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <svg className="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                <p className="text-sm font-bold opacity-70">Keyword Density Tool Locked</p>
                <p className="text-xs opacity-50 mt-1">Available for Premium users only</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
