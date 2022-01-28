import { readdirSync, statSync } from "fs";
import { parse } from "path";
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
          size: stats.size,
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
}

export default new FileManager();
