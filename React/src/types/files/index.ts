export interface FileActions {
  type: "SET_PATH" | "SET_RECENT" | "SET_EXPLORER";
  payload: string | File[] | Explorer;
}

export interface DropzoneFile extends File {
  path: string;
}

export interface DirectoryItem {
  name: string;
  extention?: string;
  size: number;
  date: Date;
}

export interface Explorer {
  directories: DirectoryItem[];
  files: DirectoryItem[];
}

export interface FileState {
  path: string;
  recentFiles: File[];
  explorer: Explorer;
}

export function fileReducer(state: FileState, action: FileActions): FileState {
  switch (action.type) {
    case "SET_PATH":
      return { ...state, path: action.payload as string };
    case "SET_RECENT":
      return { ...state, recentFiles: action.payload as File[] };
    case "SET_EXPLORER":
      return { ...state, explorer: action.payload as Explorer };
  }
}
