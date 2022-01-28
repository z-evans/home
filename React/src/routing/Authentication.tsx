import * as React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";

interface AuthenticationProps {
  request: () => Promise<boolean>;
  children: React.ReactNode;
  redirect: string;
}
interface AuthenticationComponentState {
  requestSent: boolean;
  loaded: boolean;
  authenticated: boolean;
}

const Authentication = ({
  request,
  children,
  redirect,
}: AuthenticationProps): JSX.Element => {
  const [state, setState] = useState<AuthenticationComponentState>({
    requestSent: false,
    loaded: false,
    authenticated: false,
  });

  if (!state.requestSent) {
    request().then((result) => {
      setState({
        requestSent: true,
        loaded: true,
        authenticated: result,
      });
    });
  }

  return state.loaded ? (
    <> {state.authenticated ? children : <Redirect to={redirect} />} </>
  ) : (
    <div />
  );
};

export default Authentication;
