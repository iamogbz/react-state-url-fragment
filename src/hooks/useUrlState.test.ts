import { renderHook } from "@testing-library/react";

import { urlStateDecoded, urlStateEncoded } from "../utils/json.mocks";
import { useUrlState } from "./useUrlState";

describe("useUrlState", () => {
  const emptyUrlStateDecoded = {};
  const emptyUrlStateEncoded = "e30%3D";
  const setLocationHash = jest.fn();
  const fallbackEmptyUrlState = jest.fn(() => emptyUrlStateDecoded);
  const urlStateEncodedInvalid = "#!!invalid@!";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each`
    case                                             | encodedState              | expectedState           | handleDecodeError
    ${"url state is valid"}                          | ${urlStateEncoded}        | ${urlStateDecoded}      | ${undefined}
    ${"url state is invalid"}                        | ${urlStateEncodedInvalid} | ${null}                 | ${undefined}
    ${"url state is invalid and has no fallback"}    | ${urlStateEncodedInvalid} | ${null}                 | ${undefined}
    ${"url state is invalid and has valid fallback"} | ${urlStateEncodedInvalid} | ${emptyUrlStateDecoded} | ${fallbackEmptyUrlState}
  `(
    "returns expected state when $case",
    ({ encodedState, expectedState, handleDecodeError }) => {
      expect(fallbackEmptyUrlState).not.toHaveBeenCalled();

      const { result } = renderHook(() =>
        useUrlState({
          getLocationHash: () => encodedState,
          handleDecodeError,
          setLocationHash,
        })
      );

      const [resultState] = result.current;
      expect(resultState).toEqual(expectedState);

      if (handleDecodeError) {
        expect(fallbackEmptyUrlState).toHaveBeenCalledTimes(1);
      }
    }
  );

  it.each`
    case                        | nextStateAction
    ${"next state is value"}    | ${emptyUrlStateDecoded}
    ${"next state is function"} | ${jest.fn(() => emptyUrlStateDecoded)}
  `("sets location hash to encoded state value", ({ nextStateAction }) => {
    const { result } = renderHook(() =>
      useUrlState({ getLocationHash: () => urlStateEncoded, setLocationHash })
    );
    const [, setState] = result.current;

    expect(setLocationHash).not.toHaveBeenCalled();
    setState(nextStateAction);
    if (typeof nextStateAction === "function") {
      expect(nextStateAction).toHaveBeenCalledTimes(1);
      expect(nextStateAction).toHaveBeenLastCalledWith(urlStateDecoded);
    }
    expect(setLocationHash).toHaveBeenCalledTimes(1);
    expect(setLocationHash).toHaveBeenLastCalledWith(emptyUrlStateEncoded);
  });
});
