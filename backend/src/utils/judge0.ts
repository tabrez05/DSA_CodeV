import axios from 'axios';
import { config } from '../config';

interface Judge0Submission {
  source_code: string;
  language_id: number;
  stdin?: string;
  expected_output?: string;
}

interface Judge0Response {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  message: string | null;
  status: {
    id: number;
    description: string;
  };
}

const JUDGE0_STATUS = {
  IN_QUEUE: 1,
  PROCESSING: 2,
  ACCEPTED: 3,
  WRONG_ANSWER: 4,
  TIME_LIMIT_EXCEEDED: 5,
  COMPILATION_ERROR: 6,
  RUNTIME_ERROR: 7,
  INTERNAL_ERROR: 8,
};

const POLL_INTERVAL = 1000; // 1 second
const MAX_POLL_ATTEMPTS = 30; // 30 seconds timeout

export class Judge0Error extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: any
  ) {
    super(message);
    this.name = 'Judge0Error';
  }
}

export async function compileCode(
  languageId: number,
  sourceCode: string,
  stdin?: string,
  expectedOutput?: string
): Promise<Judge0Response> {
  try {
    // Submit code for compilation
    const submission: Judge0Submission = {
      source_code: sourceCode,
      language_id: languageId,
      stdin,
      expected_output: expectedOutput,
    };

    const submitResponse = await axios.post(
      `${config.judge0.apiUrl}/submissions`,
      submission,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': config.judge0.apiKey,
          'X-RapidAPI-Host': config.judge0.rapidApiHost,
        },
        params: {
          base64_encoded: false,
          wait: false,
        },
      }
    );

    const submissionToken = submitResponse.data.token;

    // Poll for result
    let attempts = 0;
    while (attempts < MAX_POLL_ATTEMPTS) {
      const resultResponse = await axios.get(
        `${config.judge0.apiUrl}/submissions/${submissionToken}`,
        {
          headers: {
            'X-RapidAPI-Key': config.judge0.apiKey,
            'X-RapidAPI-Host': config.judge0.rapidApiHost,
          },
          params: {
            base64_encoded: false,
          },
        }
      );

      const result = resultResponse.data;

      // Check if processing is complete
      if (
        result.status.id !== JUDGE0_STATUS.IN_QUEUE &&
        result.status.id !== JUDGE0_STATUS.PROCESSING
      ) {
        return result;
      }

      // Wait before polling again
      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));
      attempts++;
    }

    throw new Judge0Error(
      'Timeout waiting for Judge0 response',
      408,
      { submissionToken }
    );
  } catch (error) {
    if (error instanceof Judge0Error) {
      throw error;
    }

    if (axios.isAxiosError(error)) {
      throw new Judge0Error(
        'Judge0 API request failed',
        error.response?.status || 500,
        error.response?.data
      );
    }

    throw new Judge0Error(
      'Unexpected error during code compilation',
      500,
      error
    );
  }
} 