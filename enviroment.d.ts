export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DB_PORT: string;
      ENV: "test" | "dev" | "prod";
    }
  }
}
