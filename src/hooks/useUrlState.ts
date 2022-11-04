import { Dispatch, SetStateAction, useCallback, useMemo } from "react";

import { JSONValue, urlDecode, urlEncode } from "../utils";

export type UseUrlStateResult<T extends JSONValue> = [
  T | null,
  Dispatch<SetStateAction<T | null>>
];

export function useUrlState<T extends JSONValue>(props: {
  setLocationHash(urlEncodedState: string): void;
  getLocationHash(): string;
  handleDecodeError?(urlEncodedState: string): T;
}): UseUrlStateResult<T> {
  const { getLocationHash, handleDecodeError, setLocationHash } = props;

  const state = useMemo(() => {
    const encodedState = getLocationHash();
    try {
      return urlDecode<T>(encodedState);
    } catch (e) {
      return handleDecodeError?.(encodedState) ?? null;
    }
  }, [getLocationHash, handleDecodeError]);

  const setState: UseUrlStateResult<T | null>[1] = useCallback(
    function setState(nextStateAction) {
      const newState =
        typeof nextStateAction === "function"
          ? nextStateAction(state)
          : nextStateAction;
      const hash = urlEncode(newState);
      setLocationHash(hash);
    },
    [setLocationHash, state]
  );

  return [state, setState];
}
