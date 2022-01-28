import styled from "styled-components";
import Nav from "./Nav";

const DefaultScreen: React.FC = ({ children }) => (
  <PageStyle>
    <Nav />
    <div>{children}</div>
  </PageStyle>
);

export default DefaultScreen;

const PageStyle = styled("div")`
  display: flex;
  flex-direction: column;
`;
