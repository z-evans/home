import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useReducer } from "react";
import { fileURLToPath } from "url";
import ExplorerItem from "../../components/files/ExplorerItem";
import FileUpload from "../../components/inputs/FileUpload";
import DefaultScreen from "../../components/layouts/DefaultScreen";
import FileManager from "../../managers/FileManager";
import {
  DropzoneFile,
  FileActions,
  fileReducer,
  FileState,
} from "../../types/files";
import { useMountEffect } from "../../util/hooks";

const FilesIndex = () => {
  const [state, dispatch] = useReducer(fileReducer, {
    path: "/",
    recentFiles: [],
    explorer: {
      directories: [],
      files: [],
    },
  });

  const loadData = async () =>
    dispatch({
      type: "SET_EXPLORER",
      payload: await FileManager.getFiles(state.path),
    });

  console.log(state);

  useMountEffect(() => {
    loadData();
  });

  useEffect(() => {
    loadData();
  }, [state.path]);

  return (
    <Component
      state={state}
      dispatch={dispatch}
      onUpload={async (files) => {
        console.log(files);
        await FileManager.putFiles(files, state.path);
        // need to wait for loadData();
      }}
    />
  );
};

interface Props {
  state: FileState;
  dispatch: React.Dispatch<FileActions>;
  onUpload: (files: File[]) => void;
}

const Component: React.FC<Props> = ({ state, dispatch, onUpload }) => {
  return (
    <DefaultScreen>
      <div>{state.path}</div>
      <div>
        {
          // Recent Files
        }
      </div>
      <div>
        {state.explorer.directories.map((d) => (
          <ExplorerItem
            data={d}
            type="Directory"
            onClick={(e) =>
              dispatch({
                type: "SET_PATH",
                payload: state.path + "/" + e,
              })
            }
          />
        ))}
        {state.explorer.files.map((d) => (
          <ExplorerItem
            data={d}
            type="File"
            onClick={() => {
              //
            }}
          />
        ))}
      </div>
      <FileUpload onSelect={onUpload} />
    </DefaultScreen>
  );
};

export default FilesIndex;
