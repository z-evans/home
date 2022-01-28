export interface FileActions {
  type: "SET_PATH" | "SET_RECENT";
  payload: string | File[];
}

export interface Folder {
  name: string;
  date: Date;
}

export interface File {
  name: string;
  extention: string;
  size: number;
  date: Date;
}

export interface FileState {
  path: string;
  recentFiles: File[];
}

export function fileReducer(state: FileState, action: FileActions): FileState {
  switch (action.type) {
    case "SET_PATH":
      return { ...state, path: action.payload as string };
    case "SET_RECENT":
      return { ...state, recentFiles: action.payload as File[] };
  }
}
