import { useCallback, useState } from "react";

export function useCounter() {
  const [value, setValue] = useState(0);
  const update = useCallback((delta = 1) => setValue((c) => c + delta), []);
  return [value, update] as const;
}
