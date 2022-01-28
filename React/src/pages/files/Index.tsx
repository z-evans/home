import React, { useReducer } from "react";
import DefaultScreen from "../../components/layouts/DefaultScreen";
import { FileActions, fileReducer, FileState } from "../../types/files";

const FilesIndex = () => {
  const [state, dispatch] = useReducer(fileReducer, {
    path: "/home",
    recentFiles: [],
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
        {
          // Directory
        }
      </div>
    </DefaultScreen>
  );
};

export default FilesIndex;
