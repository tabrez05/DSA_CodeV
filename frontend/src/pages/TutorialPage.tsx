import { useParams } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import { MOCK_TOPICS } from './Topics';

const TutorialPage = () => {
  const { id } = useParams<{ id: string }>();
  const topic = MOCK_TOPICS.find(t => t.id === id);

  if (!topic) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Topic Not Found</h2>
          <p className="text-gray-600">The tutorial you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)]"> {/* Subtract navbar height */}
      {/* Left Column - Code Editor (35% width) */}
      <div className="w-[35%] bg-white shadow-md overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Practice</h2>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Problem Statement</h3>
            <p className="text-gray-700">{topic.description}</p>
          </div>
          <CodeEditor />
        </div>
      </div>

      {/* Right Column - Video and Info (65% width) */}
      <div className="w-[65%] overflow-y-auto">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{topic.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm ${
                topic.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                topic.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {topic.difficulty}
              </span>
              <span className="text-sm text-gray-500">
                Max Score: {topic.maxScore}
              </span>
              <span className="text-sm text-gray-500">
                Success Rate: {topic.successRate}%
              </span>
            </div>
            <p className="text-gray-700">{topic.description}</p>
          </div>

          {topic.videoUrl && (
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={`https://www.youtube.com/embed/${topic.videoUrl.includes('watch?v=') ? topic.videoUrl.split('watch?v=')[1] : topic.videoUrl}`}
                  className="w-full h-full"
                  allowFullScreen
                  title={topic.name}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorialPage; 