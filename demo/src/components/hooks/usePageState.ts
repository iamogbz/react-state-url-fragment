import { useCallback } from "react";
import { useUrlState, UseUrlStateResult } from "react-state-url-fragment";

type PageState = {
  username?: string;
};

export function usePageState<T = PageState>(
  defaultState?: T,
): UseUrlStateResult<T> {
  const getEncodedState = useCallback(() => location.hash.substring(1), []);
  const onEncodedState = useCallback((hash: string) => {
    location.hash = hash;
  }, []);
  const handleDecodeError = defaultState && (() => defaultState);

  return useUrlState<T>({
    getEncodedState,
    handleDecodeError,
    onEncodedState,
  });
}
