"use strict";

import { dbConnection } from "../modules/db/dbConnect";

const UserModel = {
  findAll: async function () {
    let users = await dbConnection("users");

    return users;
  },
  findById: async function (id: string) {
    let users = await dbConnection("users").where({ user_id: id });

    return users[0];
  },
};
export default UserModel;
