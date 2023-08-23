import { useCallback } from "react";
import { useUrlState, UseUrlStateResult } from "react-state-url-fragment";

type AuthState = {
  username?: string;
};

const AUTH_STORAGE_KEY = "auth-storage-key";

export function useAuthState(
  defaultState?: AuthState,
): UseUrlStateResult<AuthState> {
  const getEncodedState = useCallback(function getStorageValue() {
    return window.localStorage.getItem(AUTH_STORAGE_KEY) ?? "";
  }, []);
  const onEncodedState = useCallback(function setStorageValue(hash: string) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, hash);
  }, []);
  const handleDecodeError = defaultState && (() => defaultState);

  return useUrlState<AuthState>({
    getEncodedState,
    handleDecodeError,
    onEncodedState,
  });
}
