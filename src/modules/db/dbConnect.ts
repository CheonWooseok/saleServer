import Knex from "knex";
import dotenv from "dotenv";
dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_PORT: string = process.env.DB_PORT || "3306";
const DB_USER = process.env.DB_USER;
const DB_PSWD = process.env.DB_PSWD;
const DB_NAME = process.env.DB_NAME;

const dbConnection = Knex({
  client: "mysql",
  connection: {
    host: DB_HOST, // 서버 주소
    // port: DB_PORT, // 서버 포트번호
    user: DB_USER, // 유저 ID
    password: DB_PSWD, // 유저 패스워드
    database: DB_NAME, // database 명
    pool: {
      // 커넥션 풀 설정
      min: 0, // 커넥션 최소 개수
      max: 10, // 커넥션 최대 개수
    },
  },
});

export { dbConnection };
