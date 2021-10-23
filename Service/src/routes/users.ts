import * as express from "express";
import UserManager from "../managers/UserManager";
import { UserProps } from "../types/Filters";
const UserRouter = express.Router();

/* GET home page. */
UserRouter.post("/", async function (req, res, next) {
  const data = req.body as UserProps;
  try {
    req.session.user = await UserManager.create(data);
    res.send();
  } catch (e) {
    res.status(400).send(e);
  }
});

UserRouter.get("/", async function (req, res, next) {
  res.send(req.session.user);
});
2;

UserRouter.get("/login", async function (req, res, next) {
  const data = req.body as UserProps;
  const user = await UserManager.get(data);
  req.session.user = user;
  res.send();
});

UserRouter.delete("/", async function (req, res, next) {
  // Delete user
  res.send();
});

export default UserRouter;