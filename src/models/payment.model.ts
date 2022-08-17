import { dbConnection, dbErrorFind } from "../modules/db/dbConnect";
import Payment from "../types/payment";

const PaymentModel = {
  findAll: async (param: object) => {
    let histories = <Payment[]>await dbConnection("order").where(param);
    return histories;
  },
  findById: async (id: number) => {
    let histories = <Payment[]>(
      await dbConnection("order").where({ order_id: id })
    );
    return histories;
  },
  insert: async (param: Payment) => {
    try {
      await dbConnection("order").insert(param);
    } catch (err: any) {
      throw new Error(dbErrorFind(err.errno));
    }
  },
};

export default PaymentModel;
