import { verify } from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET;

const verifyToken = (token: string) => {
  try {
    let decoded = verify(token, JWT_SECRET);
    return decoded;
  } catch (error: any) {
    if (error.name === "TokenExpireError") {
      return {
        code: 419,
        msg: "토큰이 만료되었습니다.",
      };
    }
    return {
      code: 401,
      msg: "유효하지 않은 토큰입니다.",
    };
  }
};

export { verifyToken };
