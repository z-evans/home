import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import { useMountEffect } from "../util/hooks";

interface Props {
  contextRef: React.RefObject<HTMLDivElement>;
}

const ContextMenu: React.FC<Props> = ({ contextRef, ...props }) => {
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  const handleContext = (e: MouseEvent) => {
    if (contextRef.current && contextRef.current.contains(e.target as Node)) {
      e.preventDefault();
      setAnchorPoint({ x: e.pageX, y: e.pageY });
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useMountEffect(() => {
    document.addEventListener("click", (e) => setShow(false));
    document.addEventListener("contextmenu", handleContext);
  });

  return <ContextMenuComponent anchorPoint={anchorPoint} show={show} />;
};

interface Component {
  anchorPoint: {
    x: number;
    y: number;
  };
  show: boolean;
}

const ContextMenuComponent: React.FC<Component> = ({ anchorPoint, show }) => (
  <>
    {show && (
      <StyledContextMenu
        style={{
          top: anchorPoint.y,
          left: anchorPoint.x,
        }}
      >
        <li>Share...</li>
        <li>Download</li>
        <li>Delete</li>
        <hr className="divider" />
        <li>Refresh</li>
      </StyledContextMenu>
    )}
  </>
);

export default ContextMenu;

const StyledContextMenu = styled("ul")`
  font-size: 14px;
  background-color: #fff;
  border-radius: 2px;
  padding: 5px 0 5px 0;
  width: 150px;
  height: auto;
  margin: 0;
  position: absolute;
  list-style: none;
  box-shadow: 0 0 20px 0 #ccc;
  > li {
    padding: 0.5em 1em;
    color: #000;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  > li:hover {
    background-color: #f2f2f2;
    border-left: 4px solid #ccc;
  }
`;
