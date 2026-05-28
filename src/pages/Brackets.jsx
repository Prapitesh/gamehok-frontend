import { useState } from 'react';
import api from '../api/axios';
import { GitBranch, Plus } from 'lucide-react';

const Brackets = () => {
  const [formData, setFormData] = useState({
    tournamentId: '',
    teamIds: []
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await api.post('/api/brackets/generate', formData);
      setMessage('Bracket generated successfully!');
      setFormData({ tournamentId: '', teamIds: [] });
    } catch (error) {
      setMessage('Error generating bracket: ' + (error.response?.data?.message || error.message));
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <GitBranch className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-gray-800">Tournament Brackets</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Generate Bracket</span>
          </h2>

          {message && (
            <div className={`mb-4 p-3 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tournament ID
              </label>
              <input
                type="text"
                value={formData.tournamentId}
                onChange={(e) => setFormData({ ...formData, tournamentId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="Enter tournament ID"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team IDs (comma-separated)
              </label>
              <textarea
                value={formData.teamIds.join(',')}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  teamIds: e.target.value.split(',').map(id => id.trim()).filter(id => id) 
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="Enter team IDs separated by commas"
                rows="3"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Generate Bracket'}
            </button>
          </form>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Bracket Information</h2>
          <div className="text-gray-600">
            <p className="mb-2">Generate tournament brackets by providing:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Tournament ID</li>
              <li>List of participating team IDs</li>
            </ul>
            <p className="mt-4 text-sm">The system will automatically create matchups based on the number of teams.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brackets;
