import { createConnection } from "typeorm";
import LogManager from "./managers/LogManager";
import { createServer } from "./config/express";
import URLs from "./data/URLs";
import { existsSync, mkdirSync } from "fs";

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || "8080";

createConnection()
  .then(async (connection) => {
    LogManager.log("Connected to MySQL");

    // Setup temp folder
    if (!existsSync(URLs.DIR.Temp)) {
      mkdirSync(URLs.DIR.Temp);
    }

    // create express app
    const app = await createServer();

    // start express server
    app.listen({ host, port }, () => {
      console.log(`Express server listening on http://${host}:${port}`);
    });
  })
  .catch((error) => console.log(error));
