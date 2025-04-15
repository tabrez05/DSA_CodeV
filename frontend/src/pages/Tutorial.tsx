import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import axios from 'axios';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  starterCode: string;
}

const Tutorial = () => {
  const { id } = useParams();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const response = await axios.get(`/api/tutorials/${id}`);
        setTutorial(response.data);
        setCode(response.data.starterCode);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tutorial');
        setLoading(false);
      }
    };

    fetchTutorial();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`/api/submissions`, {
        code,
        tutorialId: id,
      });
      console.log('Submission result:', response.data);
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !tutorial) {
    return (
      <div className="text-center text-red-500 py-8">
        {error || 'Tutorial not found'}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Video and Description */}
        <div className="space-y-6">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={tutorial.videoUrl}
              title={tutorial.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{tutorial.title}</h1>
            <div className="prose max-w-none">
              <p>{tutorial.description}</p>
            </div>
          </div>
        </div>

        {/* Right Column - Code Editor */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="h-[600px]">
            <Editor
              height="100%"
              defaultLanguage="cpp"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                automaticLayout: true,
              }}
            />
          </div>
          <div className="p-4 border-t">
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Submit Solution
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial; 