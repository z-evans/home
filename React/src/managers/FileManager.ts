import axios from "axios";
import { defaultAxiosConfig, formAxiosConfig } from "../data/Defaults";
import URLs from "../data/URLs";
import { DropzoneFile, Explorer } from "../types/files";
import DataManager from "./DataManager";

type Progress = (p: number) => void;

class FileManager {
  async getFiles(path: string): Promise<Explorer> {
    return (
      await axios.post<Explorer>(
        URLs.API.GET.Files.Info,
        {
          dir: path,
        },
        defaultAxiosConfig
      )
    ).data;
  }
  async putFiles(
    files: File[],
    dir: string,
    s: number,
    p: Progress
  ): Promise<void> {
    let size = 0;

    files.forEach(async (f) => {
      let uploading = true;
      const file = f as DropzoneFile;
      const formData = new FormData();
      formData.append("files", file);
      formData.append("dir", `${dir}${DataManager.getPath(file.path)}/`);
      await axios.put(URLs.API.PUT.Files, formData, {
        ...formAxiosConfig,
        onUploadProgress: (data) => {
          if (data.loaded == data.total) {
            uploading = false;
            size += data.total;
            p(size);
          } else {
            p(size + data.loaded);
          }
        },
      });
    });
  }
}

export default new FileManager();
