import { Dispatch, SetStateAction, useCallback, useMemo, useRef } from "react";

import { urlDecode, urlEncode } from "../utils";

export type UseUrlStateResult<T> = [
  T | null,
  Dispatch<SetStateAction<T | null>>,
];

export function useUrlState<T>(props: {
  setLocationHash(urlEncodedState: string): void;
  getLocationHash(): string;
  handleDecodeError?(urlEncodedState: string): T;
}): UseUrlStateResult<T> {
  const { getLocationHash, handleDecodeError, setLocationHash } = props;

  const state = useRef<T | null>(null);
  state.current = useMemo(() => {
    const encodedState = getLocationHash();
    try {
      return urlDecode<T>(encodedState);
    } catch (e) {
      return handleDecodeError?.(encodedState) ?? null;
    }
  }, [getLocationHash, handleDecodeError]);

  const setState: UseUrlStateResult<T>[1] = useCallback(
    function setState(nextStateAction) {
      const newState =
        typeof nextStateAction === "function"
          ? (nextStateAction as CallableFunction)(state.current)
          : nextStateAction;
      const hash = urlEncode(newState);
      setLocationHash(hash);
    },
    [setLocationHash],
  );

  return [state.current, setState];
}
