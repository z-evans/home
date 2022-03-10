import { Application } from "express";
import * as express from "express";
import session = require("express-session");
import errorHandler from "../controller/ErrorHandler";
import IndexRouter from "../routes";

const createServer = (): Application => {
  // create express app
  const app = express();

  // setup express app here
  app.use(express.json());
  app.use(
    session({
      secret: "test",
      cookie: { secure: false },
    })
  );
  app.use(`/api`, IndexRouter);

  // Error handling
  app.use(errorHandler);

  return app;
};

export { createServer };
