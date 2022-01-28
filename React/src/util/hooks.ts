import { useCallback, useEffect, useRef, useState } from "react";

export const useMountEffect = (
  fn: () => void | (() => void | undefined)
): void => useEffect(fn, []);
