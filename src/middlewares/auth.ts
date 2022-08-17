import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { responseFail } from "../modules/utils/response";

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  console.log();
  try {
    if (!req.headers.authorization) return res.send("");

    let tokenDecode = <import("../types/User").default>(
      verify(req.headers.authorization?.replace("Bearer ", ""), JWT_SECRET)
    );

    // issuer 또는 exp 같은 필요없는 데이터는 제거하기 위해서
    let { user_id, user_name, user_email, user_phone } = tokenDecode;

    req.user = { user_id, user_name, user_email, user_phone };

    next();
  } catch (error: any) {
    if (error.name === "TokenExpireError") {
      return responseFail(res, { code: 401, msg: "토큰이 만료되었습니다." });
    }
    return responseFail(res, {
      code: 400,
      msg: "유효하지 않은 토큰입니다.",
    });
  }
};

export { verifyToken };
