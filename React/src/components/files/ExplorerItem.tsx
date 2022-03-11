import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import styled from "styled-components";
import DataManager from "../../managers/DataManager";
import FileManager from "../../managers/FileManager";
import Colours from "../../style/Colours";
import { DirectoryItem } from "../../types/files";
import ContextMenu from "../ContextMenu";

interface Props {
  data: DirectoryItem;
  type: "Directory" | "File";
  path: string;
  onClick: (path: string) => void;
}

const ExplorerItem: React.FC<Props> = ({ ...props }) => {
  const contextRef = useRef<HTMLDivElement>(null);

  return <ExplorerItemComponent contextRef={contextRef} {...props} />;
};

interface Component extends Props {
  contextRef: React.RefObject<HTMLDivElement>;
}

const ExplorerItemComponent: React.FC<Component> = ({
  contextRef,
  data,
  type,
  path,
  onClick,
}) => {
  const fileName = `${data.name}${type === "File" ? data.extention : ""}`;
  return (
    <>
      <ContextMenu
        contextRef={contextRef}
        onDownload={() => FileManager.download(path + "/" + fileName, fileName)}
      />
      <StyledExplorerItem
        ref={contextRef}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
        onClick={() => onClick(data.name)}
      >
        <div>
          <FontAwesomeIcon
            className="icon"
            icon={type === "Directory" ? faFolder : faFile}
          />
          <span className="name">{fileName}</span>
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
