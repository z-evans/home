import * as express from "express";
import * as formidable from "formidable";
import { existsSync, mkdirSync, rename } from "fs";
import URLs from "../data/URLs";
const FileRouter = express.Router();

/* GET home page. */
FileRouter.post("/", async function (req, res, next) {
  let dir = "/"

  const form = formidable({
    multiples: true,
    uploadDir: URLs.DIR.User(0)
  });

  form.on('field', (name, val) => {
    switch (name) {
      case 'dir':
        dir = val;
        break;
    }
  });

  form.on('file', (field, file) => {
    const path = `${URLs.DIR.User(0)}${dir}`;
    if (!existsSync(path)) {
      mkdirSync(path);
    }
    rename(file.path, `${path}${file.name}`, () => { });
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ fields, files });
  });
});

export default FileRouter;
