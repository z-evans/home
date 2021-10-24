import * as express from "express";
import * as formidable from "formidable";
import {
  existsSync,
  mkdirSync,
  readdir,
  readdirSync,
  rename,
  statSync,
} from "fs";
import URLs from "../data/URLs";
import LogManager from "../managers/LogManager";
import { FileFilter } from "../types/Filters";
const FileRouter = express.Router();

FileRouter.post("/", async function (req, res, next) {
  let dir = "/";

  const form = formidable({
    multiples: true,
    uploadDir: URLs.DIR.User(0),
  });

  form.on("field", (name, val) => {
    switch (name) {
      case "dir":
        dir = val;
        break;
    }
  });

  form.on("file", (field, file) => {
    const path = `${URLs.DIR.User(0)}${dir}`;
    if (!existsSync(path)) {
      mkdirSync(path);
    }
    rename(file.path, `${path}${file.name}`, () => {});
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    res.send({ fields, files });
  });
});

FileRouter.get("/", async function (req, res, next) {
  const query = req.body as FileFilter;
  const path = `${URLs.DIR.User(0)}${query.dir}`;
  let files: string[] = [],
    folders: string[] = [];

  readdirSync(path).forEach((e) => {
    statSync(`${path}${e}`).isFile() ? files.push(e) : folders.push(e);
  });

  res.send({ files: files, folders: folders });
});

export default FileRouter;
