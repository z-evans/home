import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import DataManager from "../../managers/DataManager";
import Colours from "../../style/Colours";
import { DirectoryItem } from "../../types/files";

interface Props {
  data: DirectoryItem;
  type: "Directory" | "File";
}

const ExplorerItem: React.FC<Props> = ({ data, type }) => (
  <StyledExplorerItem>
    <div>
      <FontAwesomeIcon
        className="icon"
        icon={type == "Directory" ? faFolder : faFile}
      />
      <span className="name">{data.name}</span>
    </div>
    <div>
      <span className="size">{DataManager.formatBytes(data.size, 1)}</span>
      <span className="date">{data.date}</span>
    </div>
  </StyledExplorerItem>
);

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
