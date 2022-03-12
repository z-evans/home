import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useRef, useState } from "react";
import styled from "styled-components";
import DataManager from "../../managers/DataManager";
import FileManager from "../../managers/FileManager";
import OnInput from "../../managers/handler/OnInput";
import Colours from "../../style/Colours";
import { DirectoryItem } from "../../types/files";
import ContextMenu from "../ContextMenu";
import Textbox from "../inputs/Textbox";

interface Props {
  data: DirectoryItem;
  type: "Directory" | "File";
  path: string;
  onClick: (path: string) => void;
  onRename: (name: string, rename: string) => void;
}

const ExplorerItem: React.FC<Props> = ({ ...props }) => {
  const contextRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const [renaming, setRenaming] = useState<boolean | undefined>(false);
  const [name, setName] = useState<string | undefined>(undefined);
  const fileName = `${props.data.name}${
    props.type === "File" ? props.data.extention : ""
  }`;

  const onRename = (name: string, rename: string) => {
    if (rename !== name) {
      props.onRename(name, rename);
    }
    setRenaming(false);
  };

  const handleInput = (e: MouseEvent) => {
    document.removeEventListener("click", handleInput);
    if (
      inputContainerRef.current &&
      !inputContainerRef.current.contains(e.target as Node) &&
      renaming
    ) {
      onRename(props.path + "/" + fileName, props.path + "/" + name);
      setRenaming(false);
    } else if (renaming === undefined) {
      setRenaming(true);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleInput);
  }, [renaming]);

  return (
    <ExplorerItemComponent
      {...props}
      contextRef={contextRef}
      inputContainerRef={inputContainerRef}
      renaming={renaming}
      name={name}
      fileName={fileName}
      setName={setName}
      setRenaming={setRenaming}
      onRename={(name, rename) => onRename(name, rename)}
    />
  );
};

interface Component extends Props {
  contextRef: React.RefObject<HTMLDivElement>;
  inputContainerRef: React.RefObject<HTMLDivElement>;
  renaming: boolean | undefined;
  name: string | undefined;
  fileName: string;
  setName: React.Dispatch<React.SetStateAction<string | undefined>>;
  setRenaming: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  onRename: (name: string, rename: string) => void;
}

const ExplorerItemComponent: React.FC<Component> = ({
  contextRef,
  inputContainerRef,
  data,
  type,
  path,
  renaming,
  name,
  fileName,
  onClick,
  setRenaming,
  setName,
  onRename,
}) => {
  return (
    <>
      <ContextMenu
        contextRef={contextRef}
        onDownload={() => FileManager.download(path + "/" + fileName, fileName)}
        onDelete={() => FileManager.delete(path + "/" + fileName)}
        onRename={() => {
          setName(fileName);
          setRenaming(undefined);
        }}
      />
      <StyledExplorerItem
        ref={contextRef}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
        onClick={() => !renaming && onClick(data.name)}
      >
        <div>
          <FontAwesomeIcon
            className="icon"
            icon={type === "Directory" ? faFolder : faFile}
          />
          <div ref={inputContainerRef}>
            {renaming === undefined || renaming ? (
              <Textbox
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                onKeyPress={(e) =>
                  OnInput.enter(e, () =>
                    onRename(path + "/" + fileName, path + "/" + name)
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
              <span className="name">{fileName}</span>
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
