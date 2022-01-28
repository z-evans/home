export interface LoginActions {
  type: "SET_EMAIL" | "SET_PASSWORD";
  payload: string;
}

export interface SollomonState {
  email: string;
  password: string;
}

export function loginReducer(
  state: SollomonState,
  action: LoginActions
): SollomonState {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload as string };
    case "SET_PASSWORD":
      return { ...state, password: action.payload as string };
  }
}
