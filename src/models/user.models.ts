"use strict";

import { dbConnection } from "../modules/db/dbConnect";
import { AuthUser } from "../types/User";

const UserModel = {
  findAll: async () => {
    let users = await dbConnection("users");

    return users;
  },
  findById: async (id: string) => {
    let users = await dbConnection("users").where({ user_id: id });

    return <AuthUser>users[0];
  },
};
export default UserModel;
