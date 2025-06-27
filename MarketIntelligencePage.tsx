import React from 'react';
import { Link } from 'react-router-dom';
import NicheThermometer from '../components/market-intelligence/NicheThermometer';
import KeywordSuggestions from '../components/market-intelligence/KeywordSuggestions';
import TitleGenerator from '../components/market-intelligence/TitleGenerator';
import Header from '../components/layout/Header';

const MarketIntelligencePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Market Intelligence</h1>
          <p className="text-gray-600">
            Discover trending niches, high-performing keywords, and create compelling titles for your PDF products.
          </p>
        </div>
        
        <div className="space-y-8">
          {/* Niche Thermometer Section */}
          <section>
            <NicheThermometer />
          </section>
          
          {/* Keyword Suggestions Section */}
          <section>
            <KeywordSuggestions />
          </section>
          
          {/* Title Generator Section */}
          <section>
            <TitleGenerator />
          </section>
          
          {/* Call to Action */}
          <section className="bg-blue-600 text-white p-8 rounded-lg shadow-lg">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to create your high-converting PDF?</h2>
              <p className="text-lg mb-6">
                Use the insights from our market intelligence tools to create PDFs that sell.
              </p>
              <Link 
                to="/editor" 
                className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-medium text-center hover:bg-gray-100 transition-colors"
              >
                Create PDF Now
              </Link>
            </div>
          </section>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-400">© 2025 PDF Market Intelligence. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MarketIntelligencePage;
