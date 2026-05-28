import { useState } from 'react';
import api from '../api/axios';
import { MessageSquare, Send } from 'lucide-react';

const Kafka = () => {
  const [message, setMessage] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      const result = await api.post('/api/kafka/send', {
        message,
        topic: topic || 'default'
      });
      setResponse('Message sent successfully: ' + JSON.stringify(result.data));
      setMessage('');
      setTopic('');
    } catch (error) {
      setResponse('Error sending message: ' + (error.response?.data?.message || error.message));
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <MessageSquare className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-gray-800">Kafka Message Sender</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <Send className="h-5 w-5" />
            <span>Send Message to Kafka</span>
          </h2>

          {response && (
            <div className={`mb-4 p-3 rounded ${response.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {response}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Topic (optional)
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="Enter Kafka topic (default: default)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="Enter your message"
                rows="4"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">About Kafka Integration</h2>
          <div className="text-gray-600">
            <p className="mb-2">Use this interface to send messages to Kafka topics:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Specify a custom topic or use the default</li>
              <li>Send JSON or plain text messages</li>
              <li>Messages are queued for processing by backend services</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kafka;
