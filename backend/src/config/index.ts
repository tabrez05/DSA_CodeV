import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables from .env file
dotenv.config();

// Define environment variable schema
const envSchema = z.object({
  // Server Configuration
  PORT: z.string().transform(Number),
  NODE_ENV: z.enum(['development', 'production', 'test']),

  // Database Configuration
  DATABASE_URL: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string().transform(Number),
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),

  // Judge0 API Configuration
  JUDGE0_API_URL: z.string(),
  JUDGE0_API_KEY: z.string(),
  JUDGE0_RAPIDAPI_HOST: z.string(),

  // CORS Configuration
  CORS_ORIGIN: z.string(),
});

// Validate environment variables
const env = envSchema.parse(process.env);

// Export configuration object
export const config = {
  server: {
    port: env.PORT,
    nodeEnv: env.NODE_ENV,
  },
  database: {
    url: env.DATABASE_URL,
    host: env.DB_HOST,
    port: env.DB_PORT,
    name: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
  },
  judge0: {
    apiUrl: env.JUDGE0_API_URL,
    apiKey: env.JUDGE0_API_KEY,
    rapidApiHost: env.JUDGE0_RAPIDAPI_HOST,
  },
  cors: {
    origin: env.CORS_ORIGIN,
  },
} as const; 