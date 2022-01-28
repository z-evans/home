export interface FilesGet {
  dir: string;
}

export interface Item {
  name: string;
  extention?: string;
  size: number;
  date: Date;
}

export interface Explorer {
  directories: Item[];
  files: Item[];
}
