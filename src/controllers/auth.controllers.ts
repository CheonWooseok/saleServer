import { compareSync, hashSync } from "bcrypt";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import UserModel from "../models/user.models";
import { dbConnection, dbErrorFind } from "../modules/db/dbConnect";
import { responseFail, responseSuccess } from "../modules/utils/response";
import dotenv from "dotenv";
import config from "../config/config";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// 암호화
const encryptPW = (pw: string) => hashSync(pw, 10);

// 암호를 대조
const compareCrypt = (pw: string, encryptedPW: string) =>
  compareSync(pw, encryptedPW);

// 로그인 (사용자 인증)
const userAuth = async (req: Request, res: Response) => {
  let { user_id, password } = req.body;
  if (!user_id || !password)
    // 아이디 또는 패스워드가 입력되지 않음x
    return responseFail(res, {
      code: 400,
      msg: "아이디 혹은 패스워드를 입력해주세요.",
    });

  const userInfo = await UserModel.findById(user_id);

  if (typeof userInfo === "undefined")
    // 해당 아이디를 가진 사용자가 존재하지 않음
    return responseFail(res, {
      code: 401,
      msg: "존재하지 않은 사용자 입니다.",
    });

  let isCompare = compareCrypt(password, userInfo.password); // 요청받은 암호와 등록된 암호를 대조

  // 암호가 일치 하다면
  if (isCompare) {
    let { user_name, user_phone, user_email, group } = userInfo;

    // 토큰 발급
    const token = sign(
      { user_id, user_name, user_phone, user_email, group },
      JWT_SECRET,
      { expiresIn: config.jwt.expiresIn, issuer: "" }
    );

    responseSuccess(res, { token });
  } else responseFail(res, { code: 401, msg: "패스워드가 올바르지 않습니다." });
};

// 회원가입
const userRegister = async (req: Request, res: Response) => {
  let { user_id, password, user_name } = req.body;

  const encryptedPW = encryptPW(password);

  try {
    await dbConnection("users").insert({
      user_id,
      password: encryptedPW,
      user_name,
    });
  } catch (error: any) {
    let resMsg = "";

    switch (dbErrorFind(error.errno)) {
      case "data_already_exist":
        resMsg = "이미 존재하는 사용자 입니다.";
        break;
      case "none_parameter":
        resMsg = "필수 값을 모두 입력하세요.";
        break;
      case "data_too_long":
        resMsg = "값이 너무 큽니다.";
        break;
      case "wrong_value":
        resMsg = "잘못된 값입니다.";
      default:
        resMsg = "서버 에러입니다";
        break;
    }

    return responseFail(res, { code: 500, msg: resMsg });
  }

  responseSuccess(res);
};

export { userAuth, userRegister };
