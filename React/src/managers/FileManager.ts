import axios from "axios";
import { defaultAxiosConfig } from "../data/Defaults";
import URLs from "../data/URLs";
import { Explorer } from "../types/files";

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
}

export default new FileManager();
