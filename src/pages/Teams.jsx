import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Users, Plus, RefreshCw } from 'lucide-react';

const Teams = () => {
  const [formData, setFormData] = useState({
    name: '',
    captain: '',
    email: ''
  });
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [message, setMessage] = useState('');

  const fetchTeams = async () => {
    setFetching(true);
    try {
      const response = await api.get('/api/teams');
      setTeams(response.data.content || response.data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
    setFetching(false);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await api.post('/api/teams/register', formData);
      setMessage('Team registered successfully!');
      setFormData({ name: '', captain: '', email: '' });
      fetchTeams();
    } catch (error) {
      setMessage('Error registering team: ' + (error.response?.data?.message || error.message));
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-800">Teams</h1>
          </div>
          <button
            onClick={fetchTeams}
            disabled={fetching}
            className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition"
          >
            <RefreshCw className={`h-5 w-5 ${fetching ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Register New Team</span>
            </h2>

            {message && (
              <div className={`mb-4 p-3 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Enter team name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Captain Name
                </label>
                <input
                  type="text"
                  value={formData.captain}
                  onChange={(e) => setFormData({ ...formData, captain: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Enter captain name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Enter email"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? 'Registering...' : 'Register Team'}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">All Teams</h2>
            
            {teams.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No teams registered yet</p>
            ) : (
              <div className="space-y-3">
                {teams.map((team) => (
                  <div key={team.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <h3 className="font-semibold text-gray-800">{team.name}</h3>
                    <p className="text-sm text-gray-600">Captain: {team.captain}</p>
                    <p className="text-sm text-gray-600">Email: {team.email}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
