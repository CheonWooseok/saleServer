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

type ErrorMessage = import("../../types/dberror").default;

const dbErrorFind = (code: number | string) => {
  let errMsg: ErrorMessage;

  if (typeof code === "string") code = parseInt(code);

  switch (code) {
    case 1048:
      errMsg = "none_parameter"; // 필수 요청 파라미터 X
      break;
    case 1062:
      errMsg = "data_already_exist";
      break;
    case 1406: // 필수 요청 파라미터 에러
      errMsg = "data_too_long";
      break;
    case 1053:
      errMsg = "server_shutdown";
      break;
    case 1480:
    case 1525:
    case 1452:
      errMsg = "wrong_value";
      break;
    default: // 기타 데이터 베이스 오류
      errMsg = "etc_error";
      break;
  }

  return errMsg;
};

export { dbConnection, dbErrorFind };
