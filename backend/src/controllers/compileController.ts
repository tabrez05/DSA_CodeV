import { Request, Response, NextFunction } from 'express';
import { compileCode, Judge0Error } from '../utils/judge0';
import { AppError } from '../middleware/errorHandler';

interface CompileRequest {
  language_id: number;
  source_code: string;
  stdin?: string;
}

const SUPPORTED_LANGUAGES = {
  PYTHON: 71,    // Python 3.8.1
  CPP: 54,       // C++ (GCC 9.2.0)
  JAVA: 62,      // Java (OpenJDK 13.0.1)
  JAVASCRIPT: 63, // JavaScript (Node.js 12.14.0)
};

export async function compile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { language_id, source_code, stdin } = req.body as CompileRequest;

    // Input validation
    if (!language_id || !source_code) {
      return next(new AppError(400, 'Missing required fields: language_id and source_code are required'));
    }

    if (!Object.values(SUPPORTED_LANGUAGES).includes(language_id)) {
      return next(new AppError(400, 'Unsupported programming language'));
    }

    if (source_code.trim().length === 0) {
      return next(new AppError(400, 'Source code cannot be empty'));
    }

    const result = await compileCode(language_id, source_code, stdin);

    res.json({
      status: 'success',
      data: {
        stdout: result.stdout,
        stderr: result.stderr,
        compile_output: result.compile_output,
        status: result.status,
      },
    });
  } catch (error) {
    if (error instanceof Judge0Error) {
      return res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
        details: error.details,
      });
    }

    next(error);
  }
} 