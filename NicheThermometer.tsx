import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell
} from 'recharts';

// Mock data for initial development
const MOCK_NICHE_DATA = [
  { name: 'Personal Finance', value: 85, growth: 12, color: '#0088FE' },
  { name: 'Fitness & Health', value: 78, growth: 8, color: '#00C49F' },
  { name: 'Digital Marketing', value: 76, growth: 15, color: '#FFBB28' },
  { name: 'Self Improvement', value: 72, growth: 5, color: '#FF8042' },
  { name: 'AI & Technology', value: 68, growth: 22, color: '#8884d8' },
  { name: 'Remote Work', value: 65, growth: 10, color: '#82ca9d' },
  { name: 'Sustainable Living', value: 60, growth: 18, color: '#ffc658' },
  { name: 'Mental Health', value: 58, growth: 14, color: '#8dd1e1' },
];

const MOCK_TREND_DATA = [
  { month: 'Jan', personalFinance: 65, fitness: 55, marketing: 60, selfImprovement: 45, ai: 30 },
  { month: 'Feb', personalFinance: 68, fitness: 59, marketing: 65, selfImprovement: 48, ai: 35 },
  { month: 'Mar', personalFinance: 70, fitness: 63, marketing: 58, selfImprovement: 52, ai: 40 },
  { month: 'Apr', personalFinance: 72, fitness: 61, marketing: 62, selfImprovement: 55, ai: 45 },
  { month: 'May', personalFinance: 75, fitness: 64, marketing: 70, selfImprovement: 59, ai: 52 },
  { month: 'Jun', personalFinance: 80, fitness: 69, marketing: 72, selfImprovement: 62, ai: 58 },
  { month: 'Jul', personalFinance: 85, fitness: 78, marketing: 76, selfImprovement: 72, ai: 68 },
];

const NicheThermometer: React.FC = () => {
  const [nicheData, setNicheData] = useState(MOCK_NICHE_DATA);
  const [trendData, setTrendData] = useState(MOCK_TREND_DATA);
  const [loading, setLoading] = useState(false);
  const [timeframe, setTimeframe] = useState('month');

  // In a production environment, this would fetch real data from APIs
  const fetchData = async () => {
    setLoading(true);
    try {
      // This would be replaced with actual API calls
      // const response = await axios.get('https://api.example.com/market-trends');
      // setNicheData(response.data.niches);
      // setTrendData(response.data.trends);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Using mock data for now
      setNicheData(MOCK_NICHE_DATA);
      setTrendData(MOCK_TREND_DATA);
    } catch (error) {
      console.error('Error fetching market data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
    fetchData();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Niche Thermometer</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => handleTimeframeChange('week')}
            className={`px-3 py-1 rounded ${timeframe === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Week
          </button>
          <button 
            onClick={() => handleTimeframeChange('month')}
            className={`px-3 py-1 rounded ${timeframe === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Month
          </button>
          <button 
            onClick={() => handleTimeframeChange('quarter')}
            className={`px-3 py-1 rounded ${timeframe === 'quarter' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Quarter
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Niches Chart */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Top Performing Niches</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={nicheData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Market Score" barSize={30}>
                  {nicheData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Growth Trends Chart */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Growth Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={trendData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="personalFinance" name="Personal Finance" stroke="#0088FE" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="fitness" name="Fitness & Health" stroke="#00C49F" />
                <Line type="monotone" dataKey="marketing" name="Digital Marketing" stroke="#FFBB28" />
                <Line type="monotone" dataKey="ai" name="AI & Technology" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Market Distribution */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Market Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={nicheData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {nicheData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Niche Insights */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Niche Insights</h3>
            <div className="space-y-4">
              {nicheData.slice(0, 4).map((niche, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{niche.name}</h4>
                    <div className="flex items-center">
                      <span className={`text-sm ${niche.growth > 10 ? 'text-green-600' : 'text-blue-600'}`}>
                        {niche.growth > 0 ? '+' : ''}{niche.growth}% growth
                      </span>
                      {niche.growth > 15 && (
                        <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                          Trending
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-2xl font-bold" style={{ color: niche.color }}>
                    {niche.value}
                  </div>
                </div>
              ))}
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2">
                View all niches →
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Market Intelligence Insights</h3>
        <p className="text-blue-700 mb-2">
          <strong>Top opportunity:</strong> Personal Finance content focused on inflation protection and passive income is showing strong growth (+12%) with high conversion rates.
        </p>
        <p className="text-blue-700">
          <strong>Emerging trend:</strong> AI & Technology content is experiencing the fastest growth (+22%) but from a smaller base. Consider combining this with established niches for maximum impact.
        </p>
      </div>
    </div>
  );
};

export default NicheThermometer;
