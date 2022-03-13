import { DirectoryItem } from ".";

export interface ItemState {
  contextRef: React.RefObject<HTMLDivElement>;
  inputContainerRef: React.RefObject<HTMLDivElement>;
  selectRef: React.RefObject<HTMLDivElement>;
  renaming: boolean | undefined;
  name: string | undefined;
  fileName: string;
}

export interface ItemActions {
  type: "SET_RENAMING" | "SET_NAME";
  payload: boolean | string | undefined;
}

export function itemReducer(state: ItemState, action: ItemActions): ItemState {
  switch (action.type) {
    case "SET_RENAMING":
      return { ...state, renaming: action.payload as boolean | undefined };
    case "SET_NAME":
      return { ...state, name: action.payload as string };
  }
}
