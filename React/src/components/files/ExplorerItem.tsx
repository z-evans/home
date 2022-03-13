import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useReducer } from "react";
import { useRef } from "react";
import styled from "styled-components";
import DataManager from "../../managers/DataManager";
import FileManager from "../../managers/FileManager";
import OnInput from "../../managers/handler/OnInput";
import Colours from "../../style/Colours";
import { DirectoryItem } from "../../types/files";
import {
  ItemActions,
  itemReducer,
  ItemState,
} from "../../types/files/ExplorerItem";
import { useMountEffect } from "../../util/hooks";
import ContextMenu from "../ContextMenu";
import Textbox from "../inputs/Textbox";

interface Props {
  data: DirectoryItem;
  type: "Directory" | "File";
  path: string;
  selected: boolean;
  onClick: (path: string) => void;
  onRename: (name: string, rename: string) => void;
  onSelect: (e: string) => void;
}

const ExplorerItem: React.FC<Props> = ({ ...props }) => {
  const [state, dispatch] = useReducer(itemReducer, {
    contextRef: useRef<HTMLDivElement>(null),
    inputContainerRef: useRef<HTMLDivElement>(null),
    selectRef: useRef<HTMLDivElement>(null),
    renaming: false,
    name: undefined,
    fileName: `${props.data.name}${
      props.type === "File" ? props.data.extention : ""
    }`,
  });

  const onRename = (name: string, rename: string) => {
    if (rename !== name) {
      props.onRename(name, rename);
    }
    dispatch({ type: "SET_RENAMING", payload: false });
  };

  const handleInput = (e: MouseEvent) => {
    document.removeEventListener("click", handleInput);
    if (
      state.inputContainerRef.current &&
      !state.inputContainerRef.current.contains(e.target as Node) &&
      state.renaming
    ) {
      onRename(
        props.path + "/" + state.fileName,
        props.path + "/" + state.name
      );
      dispatch({ type: "SET_RENAMING", payload: false });
    } else if (state.renaming === undefined) {
      dispatch({ type: "SET_RENAMING", payload: true });
    }
  };

  const handleSelect = (e: MouseEvent) => {
    if (
      state.contextRef.current?.contains(e.target as Node) &&
      !state.selectRef.current?.contains(e.target as Node) &&
      !state.renaming
    ) {
      props.onClick(props.data.name);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleInput);
  }, [state.renaming]);

  useMountEffect(() => {
    document.addEventListener("click", handleSelect);
  });

  return (
    <ExplorerItemComponent
      {...props}
      state={state}
      dispatch={dispatch}
      onRename={(name, rename) => onRename(name, rename)}
    />
  );
};

interface Component extends Props {
  state: ItemState;
  dispatch: React.Dispatch<ItemActions>;
  onRename: (name: string, rename: string) => void;
}

const ExplorerItemComponent: React.FC<Component> = ({
  state,
  data,
  type,
  path,
  selected,
  dispatch,
  onClick,
  onRename,
  onSelect,
}) => {
  return (
    <>
      <ContextMenu
        contextRef={state.contextRef}
        onDownload={() =>
          FileManager.download(path + "/" + state.fileName, state.fileName)
        }
        onDelete={() => FileManager.delete(path + "/" + state.fileName)}
        onRename={() => {
          dispatch({ type: "SET_NAME", payload: state.fileName });
          dispatch({ type: "SET_RENAMING", payload: undefined });
        }}
      />
      <StyledExplorerItem
        ref={state.contextRef}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        <div>
          <div ref={state.selectRef}>
            <input
              type={"checkbox"}
              onChange={() => onSelect(state.fileName)}
              checked={selected}
            />
          </div>
          <FontAwesomeIcon
            className="icon"
            icon={type === "Directory" ? faFolder : faFile}
          />
          <div ref={state.inputContainerRef}>
            {state.renaming === undefined || state.renaming ? (
              <Textbox
                value={state.name}
                onChange={(e) =>
                  dispatch({ type: "SET_NAME", payload: e.currentTarget.value })
                }
                onKeyPress={(e) =>
                  OnInput.enter(e, () =>
                    onRename(
                      path + "/" + state.fileName,
                      path + "/" + state.name
                    )
                  )
                }
                autoFocus
                onFocus={(e) =>
                  e.currentTarget.setSelectionRange(
                    0,
                    e.currentTarget.value.lastIndexOf(".")
                  )
                }
              />
            ) : (
              <span className="name">{state.fileName}</span>
            )}
          </div>
        </div>
        <div>
          <span className="size">{DataManager.formatBytes(data.size, 1)}</span>
          <span className="date">{data.date}</span>
        </div>
      </StyledExplorerItem>
    </>
  );
};

export default ExplorerItem;

const StyledExplorerItem = styled("div")`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${Colours.default.ming};
  div {
    display: flex;
    align-items: center;
  }
  .icon {
    font-size: 1.2em;
    margin: 0.5em;
  }
  span {
  }
`;
