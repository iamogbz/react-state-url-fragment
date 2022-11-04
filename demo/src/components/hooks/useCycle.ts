import { useCallback, useEffect } from "react";

import { resolveTimeout } from "../../utils/resolveTimeout";
import { useCounter } from "./useCounter";

const MAX = 100;
const STEP = 1;
const FREQ = 10; // ms
let __position__ = 0;

export function useCycle() {
  const [counter, updateCounter] = useCounter();

  const update = useCallback(() => {
    __position__ = (__position__ + STEP) % MAX;
    updateCounter();
  }, [updateCounter]);

  useEffect(() => void resolveTimeout(FREQ).then(update));

  return [__position__, MAX, counter];
}
