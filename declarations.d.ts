declare const MONOREPO_ROOT: string;

declare namespace GoogleSearchEngine {
  export interface Source {
    pageTitle: string;
    href: string;
  }

  export interface Content {
    title: string;
    description: string;
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'testing' | 'staging';
    DB_MEMORY: string;
    GEMINI_API_KEY?: string;
  }
}
