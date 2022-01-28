import styled from "styled-components";

const CenterScreen: React.FC = ({ children }) => (
  <CenterScreenPage>{children}</CenterScreenPage>
);

export default CenterScreen;

const CenterScreenPage = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
