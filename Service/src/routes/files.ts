import archiver = require("archiver");
import * as express from "express";
import * as formidable from "formidable";
import {
  createWriteStream,
  existsSync,
  mkdirSync,
  rename,
  renameSync,
  statSync,
  unlinkSync,
} from "fs";
import URLs from "../data/URLs";
import FileManager from "../managers/FileManager";
import LogManager from "../managers/LogManager";
import { FilesGet, RenameProps } from "../types/Files";
const FileRouter = express.Router();

/* GET home page. */
FileRouter.put("/", async function (req, res, next) {
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
    res.json({ fields, files });
  });
});

FileRouter.post("/", async function (req, res, next) {
  const data = req.body as FilesGet;
  const path = `${URLs.DIR.User(0)}${data.dir}`;
  if (!existsSync(path)) {
    mkdirSync(path);
  }
  res.json(FileManager.list(path));
});

FileRouter.get("/:dir", async function (req, res, next) {
  const dir = req.params.dir;
  const path = `${URLs.DIR.User(0)}/${dir}`;
  if (statSync(path).isFile()) {
    res.download(path);
  } else {
    res.download(await FileManager.zip(path));
  }
});

FileRouter.delete("/:dir", async function (req, res, next) {
  const dir = req.params.dir;
  const path = `${URLs.DIR.User(0)}/${dir}`;
  try {
    unlinkSync(path);
  } catch (e) {
    res.status(500).send(e);
  }
});

FileRouter.post("/rename", async function (req, res, next) {
  const props = req.body as RenameProps;
  const path = `${URLs.DIR.User(0)}/${props.name}`;
  const renamed = `${URLs.DIR.User(0)}/${props.rename}`;
  try {
    renameSync(path, renamed);
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

export default FileRouter;
