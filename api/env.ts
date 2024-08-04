import dotenv from 'dotenv';
dotenv.config();

export default process.env as {
  NODE_ENV: 'development' | 'production' | 'testing' | 'staging';
  DB_MEMORY: string;
  GEMINI_API_KEY?: string;
  SERVER_HOST: string;
  SERVER_PORT?: string;
  SERVER_EXPOSED_HOST?: string;
};
