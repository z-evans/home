import axios from "axios";
import {
  blobAxiosConfig,
  defaultAxiosConfig,
  formAxiosConfig,
} from "../data/Defaults";
import URLs from "../data/URLs";
import { DropzoneFile, Explorer } from "../types/files";
import DataManager from "./DataManager";

type Progress = (p: number) => void;

class FileManager {
  mergePath(path: string[]) {
    return "/" + path.join("/");
  }

  async getFiles(p: string[]): Promise<Explorer> {
    const path = this.mergePath(p);
    return (
      await axios.post<Explorer>(
        URLs.API.POST.Files.Info,
        {
          dir: path,
        },
        defaultAxiosConfig
      )
    ).data;
  }
  async putFiles(files: File[], d: string[], p: Progress): Promise<void> {
    const dir = this.mergePath(d);
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
          if (data.loaded === data.total) {
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
  async download(dir: string, name: string) {
    const blob = (
      await axios.get<Blob>(URLs.API.GET.Files + dir, blobAxiosConfig)
    ).data;
    var blobURL = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobURL;
    link.setAttribute("download", name);
    link.click();
  }
}

export default new FileManager();
