import React, { useState } from 'react';

interface KeywordData {
  keyword: string;
  searchVolume: number;
  competition: string;
  trend: 'up' | 'down' | 'stable';
  cpc: number;
}

// Mock data for initial development
const MOCK_KEYWORD_DATA: KeywordData[] = [
  { keyword: 'passive income strategies', searchVolume: 12500, competition: 'high', trend: 'up', cpc: 3.45 },
  { keyword: 'best personal finance books', searchVolume: 8700, competition: 'medium', trend: 'up', cpc: 2.10 },
  { keyword: 'how to create digital products', searchVolume: 6300, competition: 'high', trend: 'up', cpc: 4.20 },
  { keyword: 'weight loss meal plans', searchVolume: 22000, competition: 'high', trend: 'stable', cpc: 2.85 },
  { keyword: 'home workout routines', searchVolume: 18500, competition: 'medium', trend: 'up', cpc: 1.95 },
  { keyword: 'social media marketing guide', searchVolume: 9800, competition: 'high', trend: 'up', cpc: 5.30 },
  { keyword: 'mindfulness techniques', searchVolume: 7200, competition: 'low', trend: 'up', cpc: 1.25 },
  { keyword: 'ai tools for business', searchVolume: 5400, competition: 'medium', trend: 'up', cpc: 3.75 },
  { keyword: 'sustainable living tips', searchVolume: 4800, competition: 'low', trend: 'up', cpc: 1.15 },
  { keyword: 'remote work productivity', searchVolume: 8900, competition: 'medium', trend: 'stable', cpc: 2.40 },
];

const KeywordSuggestions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [niche, setNiche] = useState('all');
  const [keywordData, setKeywordData] = useState<KeywordData[]>(MOCK_KEYWORD_DATA);
  const [filteredKeywords, setFilteredKeywords] = useState<KeywordData[]>(MOCK_KEYWORD_DATA);
  const [loading, setLoading] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  // In a production environment, this would fetch real data from APIs
  const fetchData = async () => {
    setLoading(true);
    try {
      // This would be replaced with actual API calls
      // const response = await axios.get(`https://api.example.com/keywords?niche=${niche}`);
      // setKeywordData(response.data);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Using mock data for now
      setKeywordData(MOCK_KEYWORD_DATA);
    } catch (error) {
      console.error('Error fetching keyword data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter keywords based on search term
  const filterKeywords = () => {
    if (searchTerm.trim() === '') {
      setFilteredKeywords(keywordData);
    } else {
      const filtered = keywordData.filter(item => 
        item.keyword.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredKeywords(filtered);
    }
  };

  // Handle niche change
  const handleNicheChange = (newNiche: string) => {
    setNiche(newNiche);
    fetchData();
  };

  // Handle search term change
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    filterKeywords();
  };

  const handleKeywordSelect = (keyword: string) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
    } else {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': 
        return <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>;
      case 'down': 
        return <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>;
      case 'stable': 
        return <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" /></svg>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Keyword Suggestions</h2>
        <div className="flex space-x-2">
          <select 
            value={niche}
            onChange={(e) => handleNicheChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Niches</option>
            <option value="finance">Personal Finance</option>
            <option value="fitness">Fitness & Health</option>
            <option value="marketing">Digital Marketing</option>
            <option value="self-improvement">Self Improvement</option>
            <option value="technology">AI & Technology</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for keywords..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Select</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keyword</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Search Volume</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Competition</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPC ($)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredKeywords.map((item, index) => (
                  <tr key={index} className={selectedKeywords.includes(item.keyword) ? 'bg-blue-50' : ''}>
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedKeywords.includes(item.keyword)}
                        onChange={() => handleKeywordSelect(item.keyword)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="py-3 px-4 font-medium">{item.keyword}</td>
                    <td className="py-3 px-4">{item.searchVolume.toLocaleString()}</td>
                    <td className={`py-3 px-4 ${getCompetitionColor(item.competition)}`}>
                      {item.competition.charAt(0).toUpperCase() + item.competition.slice(1)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        {getTrendIcon(item.trend)}
                      </div>
                    </td>
                    <td className="py-3 px-4">${item.cpc.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedKeywords.length > 0 && (
            <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Selected Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {selectedKeywords.map((keyword, index) => (
                  <div key={index} className="bg-white px-3 py-1 rounded-full border border-blue-300 flex items-center">
                    <span>{keyword}</span>
                    <button 
                      onClick={() => handleKeywordSelect(keyword)}
                      className="ml-2 text-blue-500 hover:text-blue-700"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Use Selected Keywords
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Keyword Intelligence Insights</h3>
        <p className="text-blue-700 mb-2">
          <strong>Pro tip:</strong> Combine high-volume keywords with lower competition alternatives for better conversion rates.
        </p>
        <p className="text-blue-700">
          <strong>Trending topics:</strong> "Passive income" and "AI tools" keywords are showing strong upward trends with increasing search volumes.
        </p>
      </div>
    </div>
  );
};

export default KeywordSuggestions;
