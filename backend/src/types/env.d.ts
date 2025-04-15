declare namespace NodeJS {
  interface ProcessEnv {
    // Server Configuration
    PORT: string;
    NODE_ENV: 'development' | 'production' | 'test';

    // Database Configuration
    DATABASE_URL: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;

    // Judge0 API Configuration
    JUDGE0_API_URL: string;
    JUDGE0_API_KEY: string;
    JUDGE0_RAPIDAPI_HOST: string;

    // CORS Configuration
    CORS_ORIGIN: string;
  }
} 