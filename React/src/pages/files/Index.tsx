import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useReducer } from "react";
import ExplorerItem from "../../components/files/ExplorerItem";
import DefaultScreen from "../../components/layouts/DefaultScreen";
import FileManager from "../../managers/FileManager";
import { FileActions, fileReducer, FileState } from "../../types/files";
import { useMountEffect } from "../../util/hooks";

const FilesIndex = () => {
  const [state, dispatch] = useReducer(fileReducer, {
    path: "/home",
    recentFiles: [],
    explorer: {
      directories: [],
      files: [],
    },
  });

  const loadData = async () =>
    dispatch({
      type: "SET_EXPLORER",
      payload: await FileManager.getFiles("/"),
    });

  console.log(state);

  useMountEffect(() => {
    loadData();
  });

  return <Component state={state} dispatch={dispatch} />;
};

interface Props {
  state: FileState;
  dispatch: React.Dispatch<FileActions>;
}

const Component: React.FC<Props> = ({ state, dispatch }) => {
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
          <ExplorerItem data={d} type="Directory" />
        ))}
        {state.explorer.files.map((d) => (
          <ExplorerItem data={d} type="File" />
        ))}
      </div>
    </DefaultScreen>
  );
};

export default FilesIndex;
