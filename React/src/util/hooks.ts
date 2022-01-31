import { useEffect } from "react";

export const useMountEffect = (
  fn: () => void | (() => void | undefined)
): void => useEffect(fn, []);
