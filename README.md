# React State Url Fragment

Sets react state to url fragment

## `useUrlState`

```ts
import { useCallback } from "react";
import { useUrlState } from "react-state-url-fragment";

export function usePageState<T>(defaultState?: T) {
  const getLocationHash = useCallback(() => location.hash.substring(1), []);
  const setLocationHash = useCallback((hash) => (location.hash = hash), []);
  const handleDecodeError = defaultState && (() => defaultState);

  return useUrlState<T>({
    getLocationHash,
    handleDecodeError,
    setLocationHash,
  });
}
```

### Example
<https://github.com/iamogbz/react-state-url-fragment/blob/93b12c825e0ea4975f6b05544a56b7af5826984e/demo/src/components/hooks/usePageState.ts#L1-L22>

### Demo

```sh
$ cd demo/
$ make start

Starting the development server...
```