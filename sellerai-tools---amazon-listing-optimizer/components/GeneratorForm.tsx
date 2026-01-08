
import React, { useState } from 'react';
import { AMAZON_TOP_CATEGORIES } from '../constants';
import { ProductInput } from '../types';

interface GeneratorFormProps {
  onSubmit: (input: ProductInput) => void;
  isLoading: boolean;
  isDark: boolean;
}

const GeneratorForm: React.FC<GeneratorFormProps> = ({ onSubmit, isLoading, isDark }) => {
  const [formData, setFormData] = useState<ProductInput>({
    name: '',
    brand: '',
    sellingPoints: ['', '', ''],
    category: AMAZON_TOP_CATEGORIES[0]
  });

  const [searchCategory, setSearchCategory] = useState('');

  const filteredCategories = AMAZON_TOP_CATEGORIES.filter(cat => 
    cat.toLowerCase().includes(searchCategory.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return alert('Product Name is required');
    onSubmit(formData);
  };

  const updateSellingPoint = (index: number, val: string) => {
    const updated = [...formData.sellingPoints];
    updated[index] = val;
    setFormData({ ...formData, sellingPoints: updated });
  };

  const inputClass = `w-full px-4 py-3 rounded border focus:ring-2 focus:ring-amazon-orange focus:border-transparent outline-none transition-all ${
    isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
  }`;

  return (
    <div className={`p-6 md:p-8 rounded-xl shadow-lg ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Create Your Amazon Listing</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2 uppercase tracking-wide opacity-70">Product Name *</label>
            <input 
              type="text" 
              placeholder="e.g. Ergonomic Office Chair with Lumbar Support"
              className={inputClass}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 uppercase tracking-wide opacity-70">Brand Name (Optional)</label>
            <input 
              type="text" 
              placeholder="e.g. ComfortMaster"
              className={inputClass}
              value={formData.brand}
              onChange={(e) => setFormData({...formData, brand: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 uppercase tracking-wide opacity-70">Target Category</label>
          <div className="relative">
            <input 
              type="text"
              placeholder="Search category..."
              className={`${inputClass} mb-2`}
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
            />
            <select 
              className={inputClass}
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              {filteredCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 uppercase tracking-wide opacity-70">Key Selling Points (Top 3)</label>
          <div className="space-y-3">
            {formData.sellingPoints.map((sp, idx) => (
              <input 
                key={idx}
                type="text" 
                placeholder={`Feature ${idx + 1}`}
                className={inputClass}
                value={sp}
                onChange={(e) => updateSellingPoint(idx, e.target.value)}
              />
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className={`w-full bg-amazon-orange text-white font-bold py-4 rounded-lg shadow-md hover:bg-orange-600 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 min-h-[56px]`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Generating with Gemini Pro...</span>
            </>
          ) : (
            <span>Generate Optimized Listing</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default GeneratorForm;
