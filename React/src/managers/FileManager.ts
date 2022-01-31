import axios from "axios";
import { defaultAxiosConfig, formAxiosConfig } from "../data/Defaults";
import URLs from "../data/URLs";
import { DropzoneFile, Explorer } from "../types/files";
import DataManager from "./DataManager";

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
  async putFiles(files: File[], dir: string): Promise<void> {
    files.forEach(async (f) => {
      const file = f as DropzoneFile;
      const formData = new FormData();
      formData.append("files", file);
      formData.append("dir", `${dir}${DataManager.getPath(file.path)}/`);
      await axios.put(URLs.API.PUT.Files, formData, formAxiosConfig);
    });
  }
}

export default new FileManager();
