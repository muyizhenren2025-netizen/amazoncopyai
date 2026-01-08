// src/App.tsx
import { useState, useEffect } from "react";
import { generateAmazonContent } from "./services/geminiService";

const App = () => {
  // 1. 生成唯一用户ID（存在本地存储）
  const [userId] = useState(() => {
    let id = localStorage.getItem("amazoncopyai_userid");
    if (!id) {
      id = Math.random().toString(36).substring(2, 15) + Date.now().toString(16);
      localStorage.setItem("amazoncopyai_userid", id);
    }
    return id;
  });

  // 2. 付费状态+免费次数
  const [isPaid, setIsPaid] = useState(false);
  const [freeUses, setFreeUses] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // 原有状态（产品名/卖点/类目/生成结果）保留

  // 3. 页面加载时查询付费状态
  useEffect(() => {
    const checkPaidStatus = async () => {
      // 后续替换为你的check-paid Worker域名
      const CHECK_PAID_WORKER = "https://check-paid.your-cloudflare-username.workers.dev";
      try {
        const response = await fetch(`${CHECK_PAID_WORKER}?userId=${userId}`);
        const data = await response.json();
        if (data.isPaid) {
          setIsPaid(true);
          setFreeUses(999); // 解锁无限次数
        }
      } catch (err) {
        console.error("查询付费状态失败:", err);
      }
    };
    checkPaidStatus();
  }, [userId]);

  // 4. 重构生成按钮点击函数
  const handleGenerate = async () => {
    // 输入校验
    if (!productName.trim()) {
      setError("Product Name is required!");
      return;
    }
    if (freeUses <= 0 && !isPaid) {
      setError("No free uses left, please upgrade to paid!");
      return;
    }
    setError("");
    setLoading(true);

    try {
      // 调用Worker生成内容
      const data = await generateAmazonContent(productName, sellingPoints, category);
      const rawResult = data.candidates[0].content.parts[0].text;
      // 解析结果（保留你原有解析逻辑）
      // setResults(解析后的titles/bullets/keywords)
      // 扣减免费次数
      if (!isPaid) setFreeUses(freeUses - 1);
    } catch (err) {
      setError("Failed to generate results, please try again!");
    } finally {
      setLoading(false);
    }
  };

  // 5. 付费按钮点击函数
  const handleUpgrade = () => {
    // 后续替换为你的Stripe支付链接
    const payUrl = `https://buy.stripe.com/你的支付链接?client_reference_id=${userId}`;
    window.open(payUrl, "_blank");
  };

  // 原有渲染逻辑保留，仅修改：
  // - 生成按钮禁用条件：loading || (freeUses <=0 && !isPaid)
  // - 付费按钮显示条件：!isPaid
  // - 导出按钮显示条件：isPaid

  return (
    // 你的原有JSX结构，适配上述状态
  );
};

export default App;
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import GeneratorForm from './components/GeneratorForm';
import ResultsDisplay from './components/ResultsDisplay';
import Paywall from './components/Paywall';
import { ProductInput, GeneratedContent, PaywallStatus } from './types';
import { generateListingData } from './services/geminiService';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<GeneratedContent | null>(null);
  const [paywall, setPaywall] = useState<PaywallStatus>({
    isPremium: false,
    trialUsed: false
  });

  // Load preferences
  useEffect(() => {
    const savedStatus = localStorage.getItem('paywall_status');
    if (savedStatus) {
      setPaywall(JSON.parse(savedStatus));
    }
    const darkPref = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(darkPref);
  }, []);

  useEffect(() => {
    localStorage.setItem('paywall_status', JSON.stringify(paywall));
  }, [paywall]);

  const handleGenerate = async (input: ProductInput) => {
    // Check trial limit
    if (!paywall.isPremium && paywall.trialUsed) {
      alert("You've reached your free trial limit. Please upgrade to continue.");
      return;
    }

    setIsLoading(true);
    try {
      const data = await generateListingData(input);
      setResults(data);
      
      // Consume trial
      if (!paywall.isPremium) {
        setPaywall(prev => ({ ...prev, trialUsed: true }));
      }
    } catch (error) {
      console.error("Generation failed", error);
      alert("Something went wrong with the AI generation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = (price: number) => {
    // Simulate Stripe Payment process
    const proceed = window.confirm(`Proceed to pay $${price} via secure Stripe checkout?`);
    if (proceed) {
      setPaywall({ isPremium: true, trialUsed: true });
      alert("Thank you! You now have full access.");
    }
  };

  const exportCSV = useCallback(() => {
    if (!results) return;
    
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Type,Content\n";
    results.titles.forEach(t => csvContent += `Title,"${t.replace(/"/g, '""')}"\n`);
    results.bulletPoints[0].fabeSet.forEach(b => csvContent += `BulletPoint,"${b.combined.replace(/"/g, '""')}"\n`);
    csvContent += `SearchTerms,"${results.searchTerms.join(' ').replace(/"/g, '""')}"\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "amazon_listing_optimizer.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [results]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors ${isDark ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Header isDark={isDark} toggleDark={() => setIsDark(!isDark)} />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Amazon Listing SEO <span className="text-amazon-orange">Made Simple</span>
          </h2>
          <p className="text-lg opacity-60 max-w-2xl mx-auto">
            Generate conversion-optimized titles, FABE bullets, and backend search terms that satisfy both Amazon's algorithm and customer desires.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
              </div>
              <span className="text-sm font-medium">Amazon A10 Optimized</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
              </div>
              <span className="text-sm font-medium">Compliance Checked</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12">
          <GeneratorForm 
            onSubmit={handleGenerate} 
            isLoading={isLoading} 
            isDark={isDark} 
          />

          {results && (
            <ResultsDisplay 
              content={results} 
              isDark={isDark} 
              isPremium={paywall.isPremium} 
              onExport={exportCSV}
            />
          )}

          {!paywall.isPremium && paywall.trialUsed && (
            <Paywall isDark={isDark} onSelect={handlePayment} />
          )}
        </div>
      </main>

      <Footer isDark={isDark} />
    </div>
  );
};

export default App;
