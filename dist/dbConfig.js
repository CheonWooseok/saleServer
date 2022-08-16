"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const knex_1 = __importDefault(require("knex"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_HOST || "3306";
const DB_USER = process.env.DB_HOST;
const DB_PSWD = process.env.DB_HOST;
const DB_NAME = process.env.DB_HOST;
console.log(DB_HOST);
const dbConnection = (0, knex_1.default)({
    client: "mysql",
    connection: {
        timezone: "UTC",
        host: DB_HOST,
        // port: DB_PORT, // 서버 포트번호
        user: DB_USER,
        password: DB_PSWD,
        database: DB_NAME,
        insecureAuth: true,
        pool: {
            // 커넥션 풀 설정
            min: 0,
            max: 10, // 커넥션 최대 개수
        },
    },
});
exports.dbConnection = dbConnection;
