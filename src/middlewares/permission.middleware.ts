import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.models";
import { responseFail } from "../modules/utils/response";

const storeCheck = async (req: Request, res: Response, next: NextFunction) => {
  let userId = req.user?.user_id;
  if (!userId) return responseFail(res, { code: 401, msg: "권한이 없습니다." });

  let userInfo = await UserModel.findById(userId);

  if (!userInfo || userInfo.group === 0)
    return responseFail(res, { code: 401, msg: "권한이 없습니다." });

  next();
};

const adminCheck = async (req: Request, res: Response, next: NextFunction) => {
  let userId = req.user?.user_id;
  if (!userId) return responseFail(res, { code: 401, msg: "권한이 없습니다." });

  let userInfo = await UserModel.findById(userId);

  if (!userInfo || userInfo.group != 99)
    return responseFail(res, { code: 401, msg: "권한이 없습니다." });

  next();
};

export { storeCheck, adminCheck };
