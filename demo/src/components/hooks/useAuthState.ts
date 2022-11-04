import { useCallback } from "react";
import { useUrlState, UseUrlStateResult } from "react-state-url-fragment";

type AuthState = {
  username?: string;
};

const AUTH_STORAGE_KEY = "auth-storage-key";

export function useAuthState(
  defaultState?: AuthState
): UseUrlStateResult<AuthState> {
  const getLocationHash = useCallback(function getStorageValue() {
    return window.localStorage.getItem(AUTH_STORAGE_KEY) ?? "";
  }, []);
  const setLocationHash = useCallback(function setStorageValue(hash: string) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, hash);
  }, []);
  const handleDecodeError = defaultState && (() => defaultState);

  return useUrlState<AuthState>({
    getLocationHash,
    handleDecodeError,
    setLocationHash,
  });
}
