import { useState } from "react";

import { useLoop } from "./useLoop";

const MAX = 100;
const STEP = 1;
let __position__ = 0;

export function useCycle() {
  const [counter, setCounter] = useState(0);

  useLoop((elapsedTime) => {
    __position__ = (__position__ + STEP) % MAX;
    setCounter(elapsedTime);
  });

  return [__position__, MAX, counter];
}
