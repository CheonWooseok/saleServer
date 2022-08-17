export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // PORT: number;
      DB_PORT: string;
      JWT_SECRET: string;
      ENV: "test" | "dev" | "prod";
    }
  }
  namespace Express {
    export interface Request {
      user?: import("./User").default;
    }
  }
}
