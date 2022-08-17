import { dbConnection, dbErrorFind } from "../modules/db/dbConnect";
import Product, { ProductId } from "../types/product";

const ProductModel = {
  findAll: async () => {
    let products = <Product[]>await dbConnection("product");

    return products;
  },
  findById: async (id: ProductId) => {
    let products = <Product[]>(
      await dbConnection("product").where({ product_id: id })
    );

    return products[0];
  },
  insert: async (param: Product) => {
    if (
      !param.product_name ||
      !param.seller_id ||
      !param.product_price ||
      !param.product_count
    )
      throw new Error(dbErrorFind(1048)); // 필수 값이 없음
    try {
      await dbConnection("product");
      return;
    } catch (error: any) {
      throw new Error(dbErrorFind(error.errno));
    }
  },
  update: async (setParam: any, productId: ProductId) => {},
};

export default ProductModel;
