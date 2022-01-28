import {
  faFile,
  faHome,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Colours from "../../style/Colours";

const Nav: React.FC = () => (
  <StyledNav>
    <ul>
      <li>
        <FontAwesomeIcon icon={faHome} />
      </li>
      <li>
        <FontAwesomeIcon icon={faFile} />
      </li>
      <li>
        <FontAwesomeIcon icon={faStickyNote} />
      </li>
    </ul>
  </StyledNav>
);

export default Nav;

const StyledNav = styled("div")`
  background: ${Colours.default.ming};
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    padding: 1em;
  }
`;
