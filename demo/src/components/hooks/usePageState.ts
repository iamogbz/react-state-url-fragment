import { useCallback } from "react";
import { useUrlState, UseUrlStateResult } from "react-state-url-fragment";

type PageState = {
  username?: string;
};

export function usePageState<T = PageState>(
  defaultState?: T
): UseUrlStateResult<T> {
  const getLocationHash = useCallback(() => location.hash.substring(1), []);
  const setLocationHash = useCallback((hash: string) => {
    location.hash = hash;
  }, []);
  const handleDecodeError = defaultState && (() => defaultState);

  return useUrlState<T>({
    getLocationHash,
    handleDecodeError,
    setLocationHash,
  });
}
