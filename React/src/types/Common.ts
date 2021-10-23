import { useReducer } from "react";

export interface Games {
  id: number;
  universeId: string;
  gameId: string;
  creatorId: string;
  totalUpVotes: string;
  details: Details;
}

export interface Details {
  id: number;
  name: string;
  description: string | undefined;
  genre: string;
  visits: string;
  playing: string;
  img: string | undefined;
}

export interface ThumbnailData {
  requestId: string;
  errorCode: number;
  errorMessage: string;
  targetId: number;
  state: string;
  imageUrl: string;
}

export interface Thumbnails {
  data: ThumbnailData[];
}

export interface NavigationProps {
  offset: number;
  recordLimit: number;
  recordCount: number;
}

interface NavigationAction {
  type:
  | "SET_RECORDLIMIT"
  | "SET_RECORDCOUNT"
  | "SET_OFFSET";
  payload:
  | boolean
  | number
  | undefined;
}

export function navReducer(
  state: NavigationProps,
  action: NavigationAction
): NavigationProps {
  switch (action.type) {
    case "SET_RECORDLIMIT":
      return { ...state, recordLimit: action.payload as number };
    case "SET_RECORDCOUNT":
      return { ...state, recordCount: action.payload as number };
    case "SET_OFFSET":
      return { ...state, offset: action.payload as number };
  }
}