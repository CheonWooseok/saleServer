import express, { Request, Response, NextFunction } from "express";
import { dbConnection } from "./modules/db/dbConnect";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { responseSuccess } from "./modules/utils/response";
import UserModel from "./models/user";
import indexRoute from "./routes/index";

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT;

app.use("/welcome", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome!");
});

app.get("/get", async (req: Request, res: Response) => {
  let users = await UserModel.findAll();

  responseSuccess(res, users);
});

app.use("/", indexRoute);

app.listen(PORT, () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: ${PORT}🛡️
  ################################################
`);
});
