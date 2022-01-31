import * as React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import AuthenticationManager from "../managers/AuthenticationManager";
import { useMountEffect } from "../util/hooks";

interface AuthenticationProps {
  children: React.ReactNode;
  redirect: string;
}
interface AuthenticationComponentState {
  requestSent: boolean;
  loaded: boolean;
  authenticated: boolean;
}

const Authentication = ({
  children,
  redirect,
}: AuthenticationProps): JSX.Element => {
  const [state, setState] = useState<AuthenticationComponentState>({
    requestSent: false,
    loaded: false,
    authenticated: false,
  });

  const onLoad = async () =>
    setState({
      requestSent: true,
      loaded: true,
      authenticated: await AuthenticationManager.isAuth(),
    });

  useMountEffect(() => {
    onLoad();
  });

  return state.loaded ? (
    <> {state.authenticated ? children : <Redirect to={redirect} />} </>
  ) : (
    <div />
  );
};

export default Authentication;
