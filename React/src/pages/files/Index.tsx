import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useReducer } from "react";
import styled from "styled-components";
import FileDirectory from "../../components/files/FileDirectory";
import DefaultScreen from "../../components/layouts/DefaultScreen";
import FileManager from "../../managers/FileManager";
import { FileActions, fileReducer, FileState } from "../../types/files";
import { useMountEffect } from "../../util/hooks";

const FilesIndex = () => {
  const [state, dispatch] = useReducer(fileReducer, {
    path: [],
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

  const delayedLoad = () => {
    setTimeout(() => loadData(), 1000);
  };

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
        await FileManager.putFiles(files, state.path, (p) => {
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
        delayedLoad();
      }}
      onRename={(name, rename) => {
        FileManager.rename(name, rename);
        delayedLoad();
      }}
    />
  );
};

interface Props {
  state: FileState;
  dispatch: React.Dispatch<FileActions>;
  onUpload: (files: File[]) => void;
  onRename: (name: string, rename: string) => void;
}

const Component: React.FC<Props> = ({
  state,
  dispatch,
  onUpload,
  onRename,
}) => {
  return (
    <DefaultScreen>
      <DirectoryBar>
        <a>
          <FontAwesomeIcon
            onClick={() =>
              dispatch({
                type: "SET_PATH",
                payload: [],
              })
            }
            icon={faHome}
          />
        </a>
        {state.path.map((e, i) => (
          <a
            className="path"
            onClick={() =>
              dispatch({
                type: "SET_PATH",
                payload: state.path.slice(0, i + 1),
              })
            }
          >
            {e}
          </a>
        ))}
      </DirectoryBar>
      <div>
        {
          // Recent Files
        }
      </div>
      <FileDirectory
        state={state}
        dispatch={dispatch}
        onRename={onRename}
        onUpload={onUpload}
      />
    </DefaultScreen>
  );
};

export default FilesIndex;

const DirectoryBar = styled("div")`
  padding: 0.5em;
  a {
    cursor: pointer;
  }
  a.path {
    margin-left: 1em;
  }
`;
