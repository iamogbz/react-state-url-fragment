import React, { useCallback, useEffect, useReducer, useRef } from "react";

import { useLoop } from "../hooks/useLoop";
import { usePageState } from "../hooks/usePageState";
import { useThrottle } from "../hooks/useThrottle";
import { AUTH_CONTAINER_STYLE } from "../pages/constants";
import { Board } from "./Board";
import {
  CPU_POSITION_Y,
  Game,
  GameActions,
  INITIAL_GAME_STATE,
  USR_POSITION_Y,
} from "./constants";
import { Ball, Paddle } from "./GameElements";
import { GameHelp } from "./GameHelp";
import { gameReducer } from "./gameReducer";
import { GameStatus } from "./GameStatus";
import { gameStateActions } from "./helpers";
import { useGameInteractiveActions } from "./useGameInteractiveActions";

const UPDATE_PAGE_GAME_STATE_INTERVAL = 5 * 1000; // 5s

export function PingPong() {
  const [pageGameState, setPageGameState] = usePageState(INITIAL_GAME_STATE);
  const [gameState, singleDispatch] = useReducer(gameReducer, pageGameState);
  const game = useRef<Game | null>(null);
  game.current = gameState;

  const bulkDispatch = useCallback(
    (...actions: GameActions[]) => actions.forEach(singleDispatch),
    [singleDispatch]
  );

  const updatePageGameState = useThrottle(() => {
    setPageGameState(game.current);
  }, UPDATE_PAGE_GAME_STATE_INTERVAL);
  useEffect(() => updatePageGameState());

  const [pushGameActions, popGameActions] = useGameInteractiveActions(document);

  const step = useCallback(
    function gameStep() {
      if (!game.current) return;
      // push game state actions before interative actions are handled
      pushGameActions(...gameStateActions(game.current));
      bulkDispatch(...popGameActions());
    },
    [bulkDispatch, popGameActions, pushGameActions]
  );

  useLoop(step);

  return (
    <div id="ping-pong" style={AUTH_CONTAINER_STYLE}>
      <Board id="pong-board">
        <Paddle
          id="cpu-paddle"
          position={{
            y: CPU_POSITION_Y,
            x: game.current?.cpuPosition ?? INITIAL_GAME_STATE.cpuPosition,
          }}
        />
        <Paddle
          id="usr-paddle"
          position={{
            y: USR_POSITION_Y,
            x: game.current?.usrPosition ?? INITIAL_GAME_STATE.usrPosition,
          }}
        />
        <Ball
          id="pong-ball"
          position={
            game.current?.ballPosition ?? INITIAL_GAME_STATE.ballPosition
          }
        />
        {game.current?.goals.map((g, i, s) => (
          <Ball
            key={`goal-ball-${i}`}
            position={g.ballPosition}
            style={{ opacity: 0.3 + (0.3 * i) / s.length }}
          />
        ))}
      </Board>
      <GameStatus game={game.current} />
      <GameHelp />
    </div>
  );
}
