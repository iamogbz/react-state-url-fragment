import { useCallback } from "react";
import { useUrlState, UseUrlStateResult } from "react-state-url-fragment";

type PageState = {
  username?: string;
};

export function usePageState(
  defaultState?: PageState
): UseUrlStateResult<PageState> {
  const getLocationHash = useCallback(() => location.hash.substring(1), []);
  const setLocationHash = useCallback((hash: string) => {
    location.hash = hash;
  }, []);
  const handleDecodeError = defaultState && (() => defaultState);

  return useUrlState<PageState>({
    getLocationHash,
    handleDecodeError,
    setLocationHash,
  });
}
