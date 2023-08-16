import { useCallback, useEffect, useRef, useState } from "react";

import { ActionType, GameActions, GameKey, Inset } from "./constants";

export function useGameInteractiveActions(gameElem?: HTMLElement) {
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
  const mouseCursorStatus = useMouseStatus(gameElem);

  useEffect(() => {
    if (
      rightKeyStatus.down ||
      (mouseCursorStatus.direction > 0 && mouseCursorStatus.down)
    ) {
      pushActions(
        {
          type: ActionType.USR_MOVE,
          payload: Inset.RIGHT,
        },
        { type: ActionType.CPU_MOVE },
      );
    } else if (
      leftKeyStatus.down ||
      (mouseCursorStatus.direction < 0 && mouseCursorStatus.down)
    ) {
      pushActions(
        {
          type: ActionType.USR_MOVE,
          payload: Inset.LEFT,
        },
        { type: ActionType.CPU_MOVE },
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

const INITIAL_KEY_STATUS = {
  down: 0,
  length: 0,
};

function useKeyStatus(
  gameKey: GameKey,
  gameElem?: DocumentAndElementEventHandlers,
) {
  const [status, setStatus] = useState(INITIAL_KEY_STATUS);

  const reset = useCallback(() => setStatus(INITIAL_KEY_STATUS), []);

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
    [gameKey],
  );

  const handleKeyUp = useCallback(
    function handleKeyUp(this: HTMLElement, e: Event) {
      if ((e as HTMLElementEventMap["keyup"]).code === gameKey) {
        e.preventDefault();
        setStatus((status) => ({ ...status, down: 0 }));
      }
    },
    [gameKey],
  );

  useEventListeners(gameElem, [
    ["keyup", handleKeyUp],
    ["keydown", handleKeyDown],
  ]);

  return { ...status, reset };
}

const INITIAL_MOUSE_STATUS = {
  x: 0,
  y: 0,
  relative: { x: 0, y: 0 },
  direction: 0,
  down: false,
};

function useMouseStatus(gameElem?: HTMLElement) {
  const [status, setStatus] = useState(INITIAL_MOUSE_STATUS);
  const gameStageBounds =
    (gameElem ?? document.body).getClientRects().item(0) ?? new DOMRect();

  const handleMove = useCallback(
    function handleMove(clientX: number, clientY: number) {
      const relative = {
        x: clientX - gameStageBounds.x,
        y: clientY - gameStageBounds.y,
      };
      setStatus((status) => ({
        ...status,
        direction: relative.x - gameStageBounds.width / 2,
        relative,
        x: clientX,
        y: clientY,
      }));
    },
    [gameStageBounds.width, gameStageBounds.x, gameStageBounds.y],
  );

  const handleMouseMove = useCallback(
    function handleMouseMove(this: HTMLElement, e: Event) {
      const { clientX, clientY } = e as HTMLElementEventMap["mousemove"];
      handleMove(clientX, clientY);
    },
    [handleMove],
  );

  const handleTouchMove = useCallback(
    function handleTouchMove(this: HTMLElement, e: Event) {
      const { clientX, clientY } = (e as HTMLElementEventMap["touchmove"])
        .touches[0];
      handleMove(clientX, clientY);
    },
    [handleMove],
  );

  const handleMouseDown = useCallback(function handleMouseDown() {
    setStatus((status) => ({ ...status, direction: 0, down: true }));
  }, []);
  const handleMouseUp = useCallback(function handleMouseUp() {
    setStatus((status) => ({ ...status, direction: 0, down: false }));
  }, []);

  useEventListeners(gameElem, [
    ["mousemove", handleMouseMove],
    ["mousedown", handleMouseDown],
    ["mouseup", handleMouseUp],
    ["touchmove", handleTouchMove],
    ["touchstart", handleMouseDown],
    ["touchend", handleMouseUp],
    ["touchcancel", handleMouseUp],
  ]);

  return status;
}

function useEventListeners(
  elem?: DocumentAndElementEventHandlers,
  eventHandlers: [
    keyof HTMLElementEventMap,
    Parameters<DocumentAndElementEventHandlers["addEventListener"]>[1],
  ][] = [],
) {
  useEffect(() => {
    if (!elem) return;
    eventHandlers.forEach(([eventName, handler]) =>
      elem.addEventListener(eventName, handler),
    );
    return () => {
      eventHandlers.forEach(([eventName, handler]) =>
        elem.removeEventListener(eventName, handler),
      );
    };
  });
}
