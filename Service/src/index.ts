import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import LogManager from "./managers/LogManager";
import IndexRouter from "./routes";
import session = require("express-session");

createConnection()
  .then(async (connection) => {
    LogManager.log("Connected to MySQL");

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

    // start express server
    app.listen(8080, () => {
      console.log(`Example app listening at http://localhost:${8080}`);
    });
  })
  .catch((error) => console.log(error));
