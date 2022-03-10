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
    uploading: false,
    progress: 0,
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
        dispatch({
          type: "SET_UPLOADING",
          payload: true,
        });

        let size = 0;
        files.forEach((e) => (size += e.size));
        await FileManager.putFiles(files, state.path, size, (p) => {
          const progress = (p / size) * 100;
          if (progress >= 100) {
            dispatch({
              type: "SET_UPLOADING",
              payload: false,
            });
            dispatch({
              type: "SET_PROGRESS",
              payload: 0,
            });
          } else {
            dispatch({
              type: "SET_PROGRESS",
              payload: progress > 100 ? 100 : progress,
            });
          }
        });

        setTimeout(() => loadData(), 1000);
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
      <FileUpload onSelect={onUpload}>
        {state.uploading && state.progress}
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
      </FileUpload>
    </DefaultScreen>
  );
};

export default FilesIndex;
