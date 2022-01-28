export interface UserProps {
  username: string;
  email: string;
  password: string;
}

type FileNames = string | "mp4" | "mp3" | "txt";

export interface FileFilter {
  name: string;
  dir: string;
  filename: FileNames[];
}
