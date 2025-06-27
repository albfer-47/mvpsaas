import React, { useState } from 'react';

interface TitleSuggestion {
  title: string;
  score: number;
  type: 'how-to' | 'listicle' | 'guide' | 'case-study' | 'tutorial';
  emotionalAppeal: 'curiosity' | 'urgency' | 'value' | 'fear' | 'aspiration';
}

// Mock data for initial development
const MOCK_TITLE_SUGGESTIONS: TitleSuggestion[] = [
  { 
    title: "7 Passive Income Strategies That Actually Work in 2025",
    score: 92,
    type: 'listicle',
    emotionalAppeal: 'value'
  },
  { 
    title: "The Ultimate Guide to Building Wealth Through Digital Products",
    score: 89,
    type: 'guide',
    emotionalAppeal: 'aspiration'
  },
  { 
    title: "How to Create a 6-Figure Income Stream with PDF Products",
    score: 87,
    type: 'how-to',
    emotionalAppeal: 'aspiration'
  },
  { 
    title: "10 AI Tools That Will Transform Your Online Business in 30 Days",
    score: 85,
    type: 'listicle',
    emotionalAppeal: 'curiosity'
  },
  { 
    title: "Why Most Digital Products Fail (And How to Make Yours Succeed)",
    score: 84,
    type: 'case-study',
    emotionalAppeal: 'fear'
  },
  { 
    title: "The Step-by-Step Blueprint for Creating High-Converting Info Products",
    score: 83,
    type: 'tutorial',
    emotionalAppeal: 'value'
  },
  { 
    title: "5 Proven Templates for Creating PDFs That Sell While You Sleep",
    score: 82,
    type: 'listicle',
    emotionalAppeal: 'value'
  },
  { 
    title: "Last Chance: How to Capitalize on These Emerging Market Trends",
    score: 80,
    type: 'how-to',
    emotionalAppeal: 'urgency'
  },
];

const TitleGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [titleType, setTitleType] = useState('all');
  const [emotionalAppeal, setEmotionalAppeal] = useState('all');
  const [titleSuggestions, setTitleSuggestions] = useState<TitleSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);

  const generateTitles = async () => {
    if (!topic.trim()) {
      return;
    }

    setLoading(true);
    try {
      // This would be replaced with actual API calls in production
      // const response = await axios.post('https://api.example.com/generate-titles', {
      //   topic,
      //   keywords: keywords.split(',').map(k => k.trim()),
      //   titleType: titleType !== 'all' ? titleType : undefined,
      //   emotionalAppeal: emotionalAppeal !== 'all' ? emotionalAppeal : undefined
      // });
      // setTitleSuggestions(response.data);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Filter mock data based on user inputs
      let filtered = [...MOCK_TITLE_SUGGESTIONS];
      
      // Simple filtering logic for demo purposes
      if (titleType !== 'all') {
        filtered = filtered.filter(item => item.type === titleType);
      }
      
      if (emotionalAppeal !== 'all') {
        filtered = filtered.filter(item => item.emotionalAppeal === emotionalAppeal);
      }
      
      // Sort by score
      filtered.sort((a, b) => b.score - a.score);
      
      setTitleSuggestions(filtered);
    } catch (error) {
      console.error('Error generating titles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleSelect = (title: string) => {
    setSelectedTitle(title);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'how-to': return 'How-To';
      case 'listicle': return 'List';
      case 'guide': return 'Guide';
      case 'case-study': return 'Case Study';
      case 'tutorial': return 'Tutorial';
      default: return type;
    }
  };

  const getEmotionalAppealLabel = (appeal: string) => {
    switch (appeal) {
      case 'curiosity': return 'Curiosity';
      case 'urgency': return 'Urgency';
      case 'value': return 'Value';
      case 'fear': return 'Fear';
      case 'aspiration': return 'Aspiration';
      default: return appeal;
    }
  };

  const getEmotionalAppealColor = (appeal: string) => {
    switch (appeal) {
      case 'curiosity': return 'bg-purple-100 text-purple-800';
      case 'urgency': return 'bg-red-100 text-red-800';
      case 'value': return 'bg-green-100 text-green-800';
      case 'fear': return 'bg-orange-100 text-orange-800';
      case 'aspiration': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Title Generator</h2>
        <p className="text-gray-600 mb-4">
          Create high-converting titles for your PDF products based on market data and proven formulas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
            Main Topic
          </label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Passive Income, Weight Loss, Digital Marketing"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-1">
            Keywords (optional)
          </label>
          <input
            id="keywords"
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g., ebook, digital products, online business"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="titleType" className="block text-sm font-medium text-gray-700 mb-1">
            Title Type
          </label>
          <select
            id="titleType"
            value={titleType}
            onChange={(e) => setTitleType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="how-to">How-To</option>
            <option value="listicle">List</option>
            <option value="guide">Guide</option>
            <option value="case-study">Case Study</option>
            <option value="tutorial">Tutorial</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="emotionalAppeal" className="block text-sm font-medium text-gray-700 mb-1">
            Emotional Appeal
          </label>
          <select
            id="emotionalAppeal"
            value={emotionalAppeal}
            onChange={(e) => setEmotionalAppeal(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Appeals</option>
            <option value="curiosity">Curiosity</option>
            <option value="urgency">Urgency</option>
            <option value="value">Value</option>
            <option value="fear">Fear</option>
            <option value="aspiration">Aspiration</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={generateTitles}
          disabled={!topic.trim() || loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Titles'}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {titleSuggestions.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Title Suggestions</h3>
              <div className="space-y-4">
                {titleSuggestions.map((suggestion, index) => (
                  <div 
                    key={index} 
                    className={`p-4 border rounded-lg transition-all ${
                      selectedTitle === suggestion.title ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleTitleSelect(suggestion.title)}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-medium">{suggestion.title}</h4>
                      <span className={`text-xl font-bold ${getScoreColor(suggestion.score)}`}>
                        {suggestion.score}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                        {getTypeLabel(suggestion.type)}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getEmotionalAppealColor(suggestion.emotionalAppeal)}`}>
                        {getEmotionalAppealLabel(suggestion.emotionalAppeal)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTitle && (
            <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Selected Title</h3>
              <p className="text-xl font-medium text-blue-900">{selectedTitle}</p>
              <div className="mt-4 flex justify-end">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Use This Title
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Title Optimization Tips</h3>
        <ul className="list-disc pl-5 text-blue-700 space-y-1">
          <li>Include numbers in your titles to increase click-through rates (e.g., "7 Ways to...")</li>
          <li>Use power words that evoke emotion (e.g., "ultimate," "essential," "proven")</li>
          <li>Keep titles under 60 characters for optimal display in search results</li>
          <li>Address a specific pain point or desire in your target audience</li>
        </ul>
      </div>
    </div>
  );
};

export default TitleGenerator;
