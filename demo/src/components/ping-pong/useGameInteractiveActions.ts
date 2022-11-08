import { useCallback, useEffect, useRef, useState } from "react";

import { ActionType, GameActions, GameKey, Inset } from "./constants";

export function useGameInteractiveActions(
  gameElem?: DocumentAndElementEventHandlers
) {
  const actions = useRef<GameActions[]>([]);

  const popActions = useCallback(function popActions() {
    return actions.current.splice(0, actions.current.length);
  }, []);

  const pushActions = useCallback(function pushActions(...args: GameActions[]) {
    actions.current.push(...args);
  }, []);

  const escKeyStatus = useKeyStatus(GameKey.ESCAPE, gameElem);
  const spaceKeyStatus = useKeyStatus(GameKey.SPACE, gameElem);
  const leftKeyStatus = useKeyStatus(GameKey.ARROW_LEFT, gameElem);
  const rightKeyStatus = useKeyStatus(GameKey.ARROW_RIGHT, gameElem);

  useEffect(() => {
    if (rightKeyStatus.down) {
      pushActions(
        {
          type: ActionType.USR_MOVE,
          payload: Inset.RIGHT,
        },
        { type: ActionType.CPU_MOVE }
      );
    } else if (leftKeyStatus.down) {
      pushActions(
        {
          type: ActionType.USR_MOVE,
          payload: Inset.LEFT,
        },
        { type: ActionType.CPU_MOVE }
      );
    } else if (spaceKeyStatus.down) {
      spaceKeyStatus.reset();
      pushActions({
        type: ActionType.GAME_PLAY_PAUSE,
      });
    } else if (escKeyStatus.down) {
      pushActions({ type: ActionType.GAME_RESET });
    }
  });

  return [pushActions, popActions] as const;
}

const INITIAL_STATUS = {
  down: 0,
  length: 0,
};
function useKeyStatus(
  gameKey: GameKey,
  gameElem?: DocumentAndElementEventHandlers
) {
  const [status, setStatus] = useState(INITIAL_STATUS);

  const handleKeyDown = useCallback(
    function handleKeyDown(this: HTMLElement, e: Event) {
      if ((e as HTMLElementEventMap["keydown"]).code === gameKey) {
        e.preventDefault();
        setStatus((status) => {
          const now = performance.now();
          const down = status.down || now;
          return { ...status, down, length: now - down };
        });
      }
    },
    [gameKey]
  );

  const handleKeyUp = useCallback(
    function handleKeyUp(this: HTMLElement, e: Event) {
      if ((e as HTMLElementEventMap["keyup"]).code === gameKey) {
        e.preventDefault();
        setStatus((status) => ({ ...status, down: 0 }));
      }
    },
    [gameKey]
  );

  const reset = useCallback(() => setStatus(INITIAL_STATUS), []);

  useEffect(() => {
    if (!gameElem) return;
    gameElem.addEventListener("keydown", handleKeyDown);
    gameElem.addEventListener("keyup", handleKeyUp);
    return () => {
      gameElem.removeEventListener("keydown", handleKeyDown);
      gameElem.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameElem, handleKeyDown, handleKeyUp]);

  return { ...status, reset };
}
