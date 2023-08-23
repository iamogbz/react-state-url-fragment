import { Dispatch, SetStateAction, useCallback, useMemo, useRef } from "react";

import { urlDecode, urlEncode } from "../utils";

export type UseUrlStateResult<T> = [
  T | null,
  Dispatch<SetStateAction<T | null>>,
];

export function useUrlState<T>(props: {
  onEncodedState(urlEncodedState: string): void;
  getEncodedState(): string;
  handleDecodeError?(urlEncodedState: string): T;
}): UseUrlStateResult<T> {
  const { getEncodedState, handleDecodeError, onEncodedState } = props;

  const state = useRef<T | null>(null);
  state.current = useMemo(() => {
    const encodedState = getEncodedState();
    try {
      return urlDecode<T>(encodedState);
    } catch (e) {
      return handleDecodeError?.(encodedState) ?? null;
    }
  }, [getEncodedState, handleDecodeError]);

  const setState: UseUrlStateResult<T>[1] = useCallback(
    function setState(nextStateAction) {
      const newState =
        typeof nextStateAction === "function"
          ? (nextStateAction as CallableFunction)(state.current)
          : nextStateAction;
      const hash = urlEncode(newState);
      onEncodedState(hash);
    },
    [onEncodedState],
  );

  return [state.current, setState];
}
