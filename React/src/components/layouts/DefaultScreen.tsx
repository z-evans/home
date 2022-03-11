import styled from "styled-components";
import Nav from "./Nav";

const DefaultScreen: React.FC = ({ children }) => (
  <PageStyle>
    <Nav />
    <div className="content">{children}</div>
  </PageStyle>
);

export default DefaultScreen;

const PageStyle = styled("div")`
  display: flex;
  flex-direction: column;
  height: 100%;
  > div.content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
`;
