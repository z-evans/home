export interface FilesGet {
  dir: string;
}

export interface ExplorerItem {
  name: string;
  extention?: string;
  size: number;
  date: Date;
}

export interface Explorer {
  directories: ExplorerItem[];
  files: ExplorerItem[];
}

export interface RenameProps {
  name: string;
  rename: string;
}
