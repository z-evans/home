import archiver = require("archiver");
import fastFolderSizeSync = require("fast-folder-size/sync");
import { createWriteStream, readdirSync, statSync } from "fs";
import { parse } from "path";
import URLs from "../data/URLs";
import { Explorer } from "../types/Files";

class FileManager {
  list(dir: string): Explorer {
    const data = readdirSync(dir);
    const files = data.filter((f) => statSync(dir + "/" + f).isFile()),
      directorys = data.filter((f) => statSync(dir + "/" + f).isDirectory());
    return {
      directories: directorys.map((d) => {
        const stats = statSync(dir + "/" + d);
        return {
          name: d,
          size: fastFolderSizeSync(dir + "/" + d),
          date: stats.mtime,
        };
      }),
      files: files.map((f) => {
        const file = parse(dir + "/" + f);
        const stats = statSync(dir + "/" + f);
        return {
          name: file.name,
          extention: file.ext,
          size: stats.size,
          date: stats.mtime,
        };
      }),
    };
  }
  zip(path: string): Promise<string> {
    const zip = `${URLs.DIR.Temp}/0.zip`;

    return new Promise(async (resolve) => {
      const output = createWriteStream(zip);
      const archive = archiver("zip", {
        zlib: { level: 9 },
      });

      output.on("close", function () {
        resolve(zip);
      });

      archive.pipe(output);

      archive.directory(path, "false");
      await archive.finalize();
    });
  }
}

export default new FileManager();
