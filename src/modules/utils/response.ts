import { Response } from "express";

type errType = {
  code: number;
  msg: string;
};

const responseSuccess = (res: Response, data: any = "hello") => {
  res.status(200).json({ success: true, data });
};

const responseFail = (res: Response, err: errType) => {
  res.status(err.code).json({ success: false, message: err.msg });
};

export { responseFail, responseSuccess };
