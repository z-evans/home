import Color from "color";
import React from "react";
import styled from "styled-components";
import Colours from "../../style/Colours";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Textbox: React.FC<Props> = ({ ...props }) => {
  return <Component {...props} />;
};

interface CompProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Component: React.FC<CompProps> = ({ label, ...props }) => {
  return (
    <InputContainer>
      {label && <InputLabel>{label}</InputLabel>}
      <StyledInput {...props} />
    </InputContainer>
  );
};

export default Textbox;

const InputContainer = styled("div")`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled("input")`
  background: unset;
  border: unset;
  border-bottom: 2px solid ${Colours.default.darkJungleGreen};
  padding: 0.5em;
  :hover {
    border-color: ${Color(Colours.default.darkJungleGreen).lighten(2).hex()};
  }
  :focus {
    outline: none;
    border-color: ${Color(Colours.default.darkJungleGreen).lighten(2).hex()};
  }
`;

const InputLabel = styled("span")`
  color: ${Colours.default.onyx};
  font-size: 0.8em;
  padding: 0.5em;
`;
