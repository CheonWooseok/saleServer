import { Request, Response } from "express";
import PaymentModel from "../models/payment.model";
import { responseFail, responseSuccess } from "../modules/utils/response";
import DBError from "../types/dberror";
import Payment from "../types/payment";

// 모든 구매내역을 조회 ( 어드민 계정을 가지고 있는 )
const getAllPaymentHistory = async (req: Request, res: Response) => {
  let histories = await PaymentModel.findAll({});

  responseSuccess(res, histories);
};

// 자기 자신의 구매 내역
const getPaymentHistoryByUser = async (req: Request, res: Response) => {
  let histories = PaymentModel;

  responseSuccess(res, histories);
};

// 주문하기
const purchaseProduct = async (req: Request, res: Response) => {
  let buyer_id = req.user?.user_id;

  let { purchase_price, shipping_address }: Payment = req.body;
  let insertParam: Payment = { buyer_id, purchase_price, shipping_address };

  try {
    await PaymentModel.insert(insertParam);
    responseSuccess(res, "주문 완료 되었습니다.");
  } catch (err: any) {
    let message: DBError = err.message;
    // switch (message) {
    //   case "":
    //     break;

    //   default:
    //     break;
    // }
    responseFail(res, { code: 500, msg: "서버 에러" });
  }
};

export { getAllPaymentHistory, getPaymentHistoryByUser, purchaseProduct };
