# React State Url Fragment

[![NPM badge](https://img.shields.io/npm/v/react-state-url-fragment)](https://www.npmjs.com/package/react-state-url-fragment)
[![Dependabot badge](https://badgen.net/github/dependabot/iamogbz/react-state-url-fragment/?icon=dependabot)](https://app.dependabot.com)
[![Dependencies](https://img.shields.io/librariesio/github/iamogbz/react-state-url-fragment)](https://libraries.io/github/iamogbz/react-state-url-fragment)
[![Build Status](https://github.com/iamogbz/react-state-url-fragment/workflows/Build/badge.svg)](https://github.com/iamogbz/react-state-url-fragment/actions)
[![Coverage Status](https://coveralls.io/repos/github/iamogbz/react-state-url-fragment/badge.svg?branch=refs/heads/main)](https://coveralls.io/github/iamogbz/react-state-url-fragment)

Sets react state to url fragment

## `useUrlState`

```ts
import { useCallback } from "react";
import { useUrlState } from "react-state-url-fragment";

export function usePageState<T>(defaultState?: T) {
  const getEncodedState = useCallback(() => location.hash.substring(1), []);
  const onEncodedState = useCallback((hash) => (location.hash = hash), []);
  const handleDecodeError = defaultState && (() => defaultState);

  return useUrlState<T>({
    getEncodedState,
    handleDecodeError,
    onEncodedState,
  });
}
```

### Example

* [Multiple encoded states concurrenly](https://github.com/iamogbz/react-state-url-fragment/blob/HEAD/demo/src/components/pages/Account.tsx#L11-L24)
* [Combine with other state management](https://github.com/iamogbz/react-state-url-fragment/blob/HEAD/demo/src/components/ping-pong/PingPong.tsx#L25-L29)

### [Demo][homepage]

```sh
$ cd demo/
$ make start

Starting the development server...
```

Check it out [here][homepage]

<!-- links -->
[homepage]: https://ogbizi.com/react-state-url-fragment
