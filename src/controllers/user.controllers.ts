import { hash, hashSync } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { responseFail, responseSuccess } from "../modules/utils/response";

// 암호화
const encryptPW = (pw: string) => hashSync(pw, 10);

type authType = { user_id: string; password: string };

// 로그인 (사용자 인증)
const userAuth = (req: Request, res: Response) => {
  let { user_id, password }: any = req.body;
  if (!user_id || !password)
    return responseFail(res, {
      code: 400,
      msg: "아이디 혹은 패스워드를 입력해주세요.",
    });
  const encryptedPW = encryptPW(password);

  responseSuccess(res, encryptedPW);
};

// 회원가입
const userRegister = (req: Request, res: Response, next: NextFunction) => {};

export { userAuth, userRegister };
