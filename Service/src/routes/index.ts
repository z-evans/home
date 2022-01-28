import * as express from "express";
import FileRouter from "./files";
import UserRouter from "./users";
const IndexRouter = express.Router();

/* GET home page. */
IndexRouter.get("/", function (req, res, next) {
  res.send(req.body);
});

IndexRouter.use(`/user`, UserRouter);
IndexRouter.use("/files", FileRouter);

export default IndexRouter;
