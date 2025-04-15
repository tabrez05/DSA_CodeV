import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CodeExecutor from '../components/CodeExecutor';

// Lazy load Monaco editor
const MonacoEditor = lazy(() => import('@monaco-editor/react'));

interface Topic {
  id: string;
  name: string;
  description: string;
  video_url: string;
  boilerplate_code: string;
}

interface ExecutionResult {
  stdout: string;
  stderr: string;
  compile_output: string;
}

const TopicDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    fetchTopic();
  }, [id]);

  const fetchTopic = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/api/topics/${id}`);
      setTopic(response.data);
      setCode(response.data.boilerplate_code);
    } catch (err) {
      setError('Failed to load topic. Please try again.');
      console.error('Error fetching topic:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const handleRun = async () => {
    try {
      setIsRunning(true);
      setExecutionResult(null);
      const response = await axios.post('/api/execute', {
        code,
        language: 'cpp',
      });
      setExecutionResult(response.data);
    } catch (err) {
      console.error('Error executing code:', err);
    } finally {
      setIsRunning(false);
    }
  };

  const resetToBoilerplate = () => {
    if (topic) {
      setCode(topic.boilerplate_code);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (editorRef.current) {
      editorRef.current.layout();
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    );
  }

  if (error || !topic) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6 text-center">
        <p className="text-red-500 mb-4">{error || 'Topic not found'}</p>
        <button
          onClick={fetchTopic}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Section - Video Player */}
        <div className="w-full md:w-[65%]">
          <div className="aspect-video w-full">
            <iframe
              src={topic.video_url}
              className="w-full h-full"
              allowFullScreen
              title={topic.name}
            />
          </div>
        </div>

        {/* Right Section - Problem + Editor + Output */}
        <div className="w-full md:w-[35%]">
          {/* Problem Display */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-4">{topic.name}</h1>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: topic.description }}
            />
          </div>

          {/* Code Editor Section */}
          <div className={`mb-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-gray-900 p-4' : ''}`}>
            <div className="flex justify-between items-center mb-2">
              <button
                onClick={resetToBoilerplate}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Reset to Starter Code
              </button>
              <button
                onClick={toggleFullscreen}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              </button>
            </div>
            <MonacoEditor
              height={isFullscreen ? 'calc(100vh - 8rem)' : '300px'}
              language="cpp"
              theme="vs-dark"
              value={code}
              onChange={handleCodeChange}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                readOnly: false,
                wordWrap: 'on',
                automaticLayout: true,
                tabSize: 2,
                renderWhitespace: 'selection',
                scrollbar: {
                  vertical: 'visible',
                  horizontal: 'visible',
                },
              }}
            />
          </div>

          {/* Code Execution */}
          <CodeExecutor
            code={code}
            onExecutionStart={() => {
              // Optional: Add any pre-execution logic
            }}
            onExecutionComplete={(result) => {
              // Optional: Add any post-execution logic
            }}
          />

          {/* Run Button */}
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition disabled:opacity-50"
          >
            {isRunning ? 'Running...' : 'Run Code'}
          </button>

          {/* Output Area */}
          {executionResult && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Output</h3>
              <div className="bg-gray-900 text-green-300 p-3 rounded font-mono h-48 overflow-y-auto">
                {executionResult.stdout && (
                  <div className="whitespace-pre-wrap">{executionResult.stdout}</div>
                )}
                {(executionResult.stderr || executionResult.compile_output) && (
                  <div className="text-red-500 whitespace-pre-wrap">
                    {executionResult.stderr || executionResult.compile_output}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicDetailPage; 