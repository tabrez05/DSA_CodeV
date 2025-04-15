import { useState } from 'react';
import Editor from '@monaco-editor/react';

interface ProblemViewProps {
  problem: {
    id: string;
    title: string;
    description: string;
    videoUrl?: string;
    starterCode: string;
  };
}

const ProblemView = ({ problem }: ProblemViewProps) => {
  const [code, setCode] = useState(problem.starterCode);

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-64px)]">
      {/* Problem Description and Video Section */}
      <div className="lg:w-1/2 p-4 bg-white rounded-lg shadow overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{problem.title}</h2>
        <div className="prose max-w-none mb-6">
          <p>{problem.description}</p>
        </div>
        {problem.videoUrl && (
          <div className="aspect-w-16 aspect-h-9 mb-6">
            <iframe
              src={problem.videoUrl}
              title="Problem explanation video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded"
            />
          </div>
        )}
      </div>

      {/* Code Editor Section */}
      <div className="lg:w-1/2 h-full bg-white rounded-lg shadow">
        <Editor
          height="100%"
          defaultLanguage="javascript"
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
        <div className="p-4 border-t">
          <button
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            onClick={() => {
              // Add submission logic here
              console.log('Submitting code:', code);
            }}
          >
            Submit Solution
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemView; 