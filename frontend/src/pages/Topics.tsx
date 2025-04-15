import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Topic {
  id: string;
  title: string;
  description: string;
}

const Topics = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('/api/topics');
        setTopics(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch topics');
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Learn how to code...</h1>
      <div className="space-y-4">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            to={`/tutorial/${topic.id}`}
            className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4"
          >
            <h2 className="text-xl text-gray-800">{topic.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topics; 