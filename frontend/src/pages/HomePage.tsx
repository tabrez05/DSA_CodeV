import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/axios';

interface Topic {
  id: string;
  name: string;
  description: string;
  coverImage?: string;
}

const HomePage = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/api/topics');
      setTopics(response.data.data);
    } catch (err) {
      setError('Failed to load topics. Please try again.');
      console.error('Error fetching topics:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTopicClick = (topicId: string) => {
    navigate(`/topic/${topicId}`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-4 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchTopics}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <div
            key={topic.id}
            onClick={() => handleTopicClick(topic.id)}
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition cursor-pointer"
            aria-label={`View ${topic.name} topic`}
          >
            {topic.coverImage ? (
              <img
                src={topic.coverImage}
                alt={topic.name}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-t-lg mb-4 flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
            <h2 className="text-xl font-semibold mb-2">{topic.name}</h2>
            <p className="text-gray-600 line-clamp-3">{topic.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage; 