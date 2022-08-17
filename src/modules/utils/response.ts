import { Request, Response } from "express";

type errType = {
  code: number;
  msg: string;
};

const responseSuccess = (res: Response, data?: any) => {
  res.status(200).json({ success: true, data });
};

const responseFail = (res: Response, err: errType) => {
  res.status(err.code).json({ success: false, message: err.msg });
};

const response = (req: Request, res: Response) => {
  res.send("hello");
};

export default response;
export { responseFail, responseSuccess };
