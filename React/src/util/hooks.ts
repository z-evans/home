import { useCallback, useEffect, useRef, useState } from "react";

export const useMountEffect = (
  fn: () => void | (() => void | undefined)
): void => useEffect(fn, []);

export const useSetState = <State = any>(
  initialState: State | (() => State),
) => {
  const [state, setState] = useState<State>(initialState);

  const getState = async (): Promise<State> => {
    let state: unknown;

    await setState((currentState: State) => {
      state = currentState;

      return currentState;
    });

    return state as State;
  };

  return [state, setState, getState] as [
    State,
    typeof setState,
    typeof getState
  ];
};