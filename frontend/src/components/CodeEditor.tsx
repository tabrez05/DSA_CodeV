import { useState } from 'react';

const CodeEditor = () => {
  const [code, setCode] = useState('');

  return (
    <div className="w-full">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-64 p-4 font-mono text-sm bg-gray-900 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write your code here..."
      />
      <div className="mt-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => {
            // TODO: Implement code submission
            console.log('Code submitted:', code);
          }}
        >
          Run Code
        </button>
      </div>
    </div>
  );
};

export default CodeEditor; 