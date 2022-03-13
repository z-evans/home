import { useState } from "react";
import { FileActions, FileState } from "../../types/files";
import FileUpload from "../inputs/FileUpload";
import ExplorerItem from "./ExplorerItem";

interface Props {
  state: FileState;
  dispatch: React.Dispatch<FileActions>;
  onUpload: (files: File[]) => void;
  onRename: (name: string, rename: string) => void;
}

const FileDirectory: React.FC<Props> = ({ ...props }) => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <FileDirectoryComponent
      {...props}
      selected={selected}
      onSelect={(e) => {
        if (selected.includes(e)) {
          setSelected(selected.filter((s) => s !== e));
        } else {
          setSelected([...selected, e]);
        }
      }}
    />
  );
};

interface Component extends Props {
  selected: string[];
  onSelect: (e: string) => void;
}

const FileDirectoryComponent: React.FC<Component> = ({
  state,
  selected,
  dispatch,
  onUpload,
  onRename,
  onSelect,
}) => {
  const path = state.path.join("/");

  return (
    <FileUpload onSelect={onUpload}>
      {state.uploading && state.progress}
      {state.explorer.directories.map((d) => (
        <ExplorerItem
          data={d}
          path={path}
          type="Directory"
          onClick={(e) =>
            dispatch({
              type: "SET_PATH",
              payload: [...state.path, e],
            })
          }
          onRename={onRename}
          onSelect={onSelect}
          selected={selected.includes(d.name)}
        />
      ))}
      {state.explorer.files.map((d) => (
        <ExplorerItem
          data={d}
          path={path}
          type="File"
          onClick={() => {
            //
          }}
          onRename={onRename}
          onSelect={onSelect}
          selected={selected.includes(`${d.name}${d.extention}`)}
        />
      ))}
    </FileUpload>
  );
};

export default FileDirectory;
