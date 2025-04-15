import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

interface CodeExecutorProps {
  code: string;
  language?: string;
  onExecutionStart?: () => void;
  onExecutionComplete?: (result: ExecutionResult) => void;
}

interface ExecutionResult {
  stdout: string;
  stderr: string;
  compile_output?: string;
  status?: {
    id: number;
    description: string;
  };
}

const CodeExecutor: React.FC<CodeExecutorProps> = ({
  code,
  language = 'cpp',
  onExecutionStart,
  onExecutionComplete,
}) => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const outputRef = useRef<HTMLDivElement>(null);

  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1000; // 1 second

  useEffect(() => {
    if (result && outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [result]);

  const executeCode = async (retry = false) => {
    try {
      setIsExecuting(true);
      setError(null);
      onExecutionStart?.();

      const response = await axios.post('/api/compile', {
        language_id: 54, // C++
        source_code: code,
        stdin: '', // Add input handling if needed
      });

      const executionResult = response.data;
      setResult(executionResult);
      onExecutionComplete?.(executionResult);
      setRetryCount(0);
    } catch (err) {
      console.error('Code execution error:', err);
      setError('Failed to execute code. Please try again.');
      
      if (retry && retryCount < MAX_RETRIES) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          executeCode(true);
        }, RETRY_DELAY);
      }
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Run Button with Loading State */}
      <button
        onClick={() => executeCode(true)}
        disabled={isExecuting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition disabled:opacity-50 flex items-center justify-center space-x-2"
      >
        {isExecuting ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Running...</span>
          </>
        ) : (
          'Run Code'
        )}
      </button>

      {/* Output Display */}
      {(result || error) && (
        <div ref={outputRef} className="rounded-lg overflow-hidden">
          {/* Output Tabs */}
          <div className="bg-gray-800 text-white px-4 py-2 flex space-x-4">
            <button
              className={`px-2 py-1 rounded ${
                !error ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              Output
            </button>
            {error && (
              <button
                className={`px-2 py-1 rounded ${
                  error ? 'bg-red-600' : 'hover:bg-gray-700'
                }`}
              >
                Error
              </button>
            )}
          </div>

          {/* Output Content */}
          <div className="bg-gray-900 p-4">
            {error ? (
              <div className="text-red-400 font-mono whitespace-pre-wrap">
                {error}
                {retryCount > 0 && (
                  <div className="mt-2 text-yellow-400">
                    Retrying... Attempt {retryCount} of {MAX_RETRIES}
                  </div>
                )}
              </div>
            ) : (
              <div className="font-mono">
                {result?.stdout && (
                  <div className="text-green-300 whitespace-pre-wrap">
                    {result.stdout}
                  </div>
                )}
                {(result?.stderr || result?.compile_output) && (
                  <div className="text-red-400 whitespace-pre-wrap mt-2">
                    {result.stderr || result.compile_output}
                  </div>
                )}
                {result?.status && result.status.id !== 3 && (
                  <div className="text-yellow-400 mt-2">
                    Status: {result.status.description}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeExecutor; 