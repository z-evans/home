import React, { useReducer } from "react";
import styled from "styled-components";
import Form from "../components/inputs/Form";
import Textbox from "../components/inputs/Textbox";
import Colours from "../style/Colours";
import { LoginActions, loginReducer, SollomonState } from "../types/login";

const RegisterPage = () => {
  const [state, dispatch] = useReducer(loginReducer, {
    email: "",
    password: "",
  });

  return (
    <Component
      state={state}
      dispatch={dispatch}
      onSubmit={() => console.log(state)}
    />
  );
};

interface Props {
  state: SollomonState;
  dispatch: React.Dispatch<LoginActions>;
  onSubmit: () => void;
}

const Component: React.FC<Props> = ({ state, dispatch, onSubmit }) => {
  return (
    <CenterScreenPage>
      <LoginFormContainer>
        <h1>Register</h1>
        <Form onSubmit={onSubmit}>
          <Textbox
            label="Username"
            placeholder="Enter your username"
            value={state.email}
            onChange={(e) =>
              dispatch({ type: "SET_EMAIL", payload: e.currentTarget.value })
            }
          />
          <Textbox
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={state.password}
            onChange={(e) =>
              dispatch({ type: "SET_PASSWORD", payload: e.currentTarget.value })
            }
          />
          <Textbox name="password" type="submit" />
        </Form>
      </LoginFormContainer>
    </CenterScreenPage>
  );
};

export default RegisterPage;

const CenterScreenPage = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const LoginFormContainer = styled("div")`
  background: ${Colours.default.white};
  padding: 2em;
  border-radius: 0.5em;
  h1 {
    margin-top: 0;
  }
  form > div {
    margin: 1em 0;
  }
`;
