declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    PROJECT_MODE: 'development' | 'production';
  }
}
