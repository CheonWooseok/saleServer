import { Request, Response } from "express";
import ProductModel from "../models/product.models";
import { dbErrorFind } from "../modules/db/dbConnect";
import { responseFail, responseSuccess } from "../modules/utils/response";
import Product from "../types/product";

const getProductAll = async (req: Request, res: Response) => {
  try {
    let products = await ProductModel.findAll();

    return responseSuccess(res, products);
  } catch (err) {
    return responseFail(res, { code: 500, msg: "DB 애러" });
  }
};

const getProductById = async (req: Request, res: Response) => {
  let productId = req.params.productId;

  let product = await ProductModel.findById(parseInt(productId));

  responseSuccess(res, product);
};

const postProduct = async (req: Request, res: Response) => {
  let {
    product_name,
    product_description,
    product_count,
    product_price,
  }: Product = req.body;

  let seller_id = req.user?.user_id;

  let insertParam = {
    seller_id,
    product_name,
    product_description,
    product_count,
    product_price,
  };

  try {
    await ProductModel.insert(insertParam);
    responseSuccess(res);
  } catch (err: any) {
    let code: number = 400;
    let msg = "";

    switch (err.message) {
      case "data_already_exist":
        code = 409;
        msg = "이미 존재하는 상품입니다.";
        break;
      case "data_too_long":
        msg = "글자가 너무 깁니다.";
        break;
      case "none_parameter":
        msg = "필수 값이 비어있습니다.";
        break;
      case "wrong_value":
        msg = "잘못된 값입니다.";
        break;
      default:
        code = 500;
        msg = "기타 에러";
        break;
    }
    responseFail(res, { code, msg });
  }
};

export { getProductAll, getProductById, postProduct };
