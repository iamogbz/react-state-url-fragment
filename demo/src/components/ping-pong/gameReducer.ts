import { clamp } from "lodash";

import {
  ActionType,
  CPU_MOVE_THRESHOLD,
  CPU_POSITION_Y,
  Game,
  GameActions,
  INITIAL_GAME_STATE,
  Inset,
  MOVE_SPEED,
  USR_POSITION_Y,
} from "./constants";
import { didPaddleHitBall } from "./helpers";

type ReducerActionHandler<T extends ActionType> = (
  gameState: Game,
  action: Extract<GameActions, { type: T }>,
) => Game;

const handleGameStep: ReducerActionHandler<ActionType.GAME_STEP> = (
  gameState,
) => gameState;

const handleGamePlayPause: ReducerActionHandler<ActionType.GAME_PLAY_PAUSE> = (
  gameState,
  action,
) => ({
  ...gameState,
  isRunning: action.payload ?? !gameState.isRunning,
});

const handleGameReset: ReducerActionHandler<ActionType.GAME_RESET> = () =>
  INITIAL_GAME_STATE;

const handleBallHit: ReducerActionHandler<ActionType.BALL_HIT> = (
  gameState,
  action,
) =>
  gameState.isRunning
    ? {
        ...gameState,
        ballVelocity: {
          x:
            Math.abs(gameState.ballVelocity.x) *
            (action.payload === Inset.RIGHT
              ? -1
              : action.payload === Inset.LEFT
              ? 1
              : Math.sign(gameState.ballVelocity.x)),
          y:
            Math.abs(gameState.ballVelocity.y) *
            (action.payload === Inset.BOTTOM
              ? -1
              : action.payload === Inset.TOP
              ? 1
              : Math.sign(gameState.ballVelocity.y)),
        },
      }
    : gameState;

const handleBallMove: ReducerActionHandler<ActionType.BALL_MOVE> = (
  gameState,
  action,
) =>
  gameState.isRunning
    ? {
        ...gameState,
        ballPosition: {
          x: clamp(
            action.payload?.x ??
              gameState.ballPosition.x + gameState.ballVelocity.x,
            0,
            1,
          ),
          y: clamp(
            action.payload?.y ??
              gameState.ballPosition.y + gameState.ballVelocity.y,
            0,
            1,
          ),
        },
      }
    : gameState;

const handleCpuMove: ReducerActionHandler<ActionType.CPU_MOVE> = (
  gameState,
) => {
  if (!gameState.isRunning) return gameState;

  const moveVelocity =
    (0.5 - clamp(gameState.ballPosition.y, 0, 0.5)) *
    (MOVE_SPEED * 2.7) *
    (Math.abs(gameState.cpuPosition - gameState.ballPosition.x) >
    CPU_MOVE_THRESHOLD
      ? gameState.ballPosition.x > gameState.cpuPosition
        ? 1
        : -1
      : 0);

  const newCpuPosition = clamp(gameState.cpuPosition + moveVelocity, 0, 1);

  return {
    ...gameState,
    cpuPosition: newCpuPosition,
  };
};

const handleUsrMove: ReducerActionHandler<ActionType.USR_MOVE> = (
  gameState,
  action,
) => {
  const didCpuPaddleHitBall = didPaddleHitBall(gameState.ballPosition, {
    x: gameState.cpuPosition,
    y: CPU_POSITION_Y,
  });
  const didUsrPaddleHitBall = didPaddleHitBall(gameState.ballPosition, {
    x: gameState.usrPosition,
    y: USR_POSITION_Y,
  });

  if (!gameState.isRunning && !(didUsrPaddleHitBall || didCpuPaddleHitBall))
    return gameState;

  const newUsrPosition = clamp(
    gameState.usrPosition +
      MOVE_SPEED * (action.payload === Inset.LEFT ? -1 : 1),
    0,
    1,
  );

  return {
    ...gameState,
    usrPosition: newUsrPosition,
    ballPosition: {
      ...gameState.ballPosition,
      x:
        gameState.ballPosition.x +
        (didUsrPaddleHitBall ? newUsrPosition - gameState.usrPosition : 0),
    },
  };
};

const handleCpuScore: ReducerActionHandler<ActionType.CPU_SCORE> = (
  gameState,
) => ({
  ...gameState,
  goals: [...gameState.goals, { ballPosition: gameState.ballPosition }],
  cpuScore: gameState.cpuScore + 1,
  ballVelocity: {
    ...gameState.ballVelocity,
    y: -INITIAL_GAME_STATE.ballVelocity.y,
  },
  ballPosition: {
    x: gameState.usrPosition,
    y: USR_POSITION_Y,
  },
  isRunning: false,
});

const handleUsrScore: ReducerActionHandler<ActionType.USR_SCORE> = (
  gameState,
) => ({
  ...gameState,
  goals: [...gameState.goals, { ballPosition: gameState.ballPosition }],
  usrScore: gameState.usrScore + 1,
  ballVelocity: {
    ...gameState.ballVelocity,
    y: INITIAL_GAME_STATE.ballVelocity.y,
  },
  ballPosition: {
    x: gameState.cpuPosition,
    y: CPU_POSITION_Y,
  },
  isRunning: false,
});

export function gameReducer(
  gameState: Game | null,
  action: GameActions,
): Game | null {
  if (!gameState) return INITIAL_GAME_STATE;

  switch (action?.type) {
    case ActionType.GAME_STEP:
      return handleGameStep(gameState, action);
    case ActionType.GAME_PLAY_PAUSE:
      return handleGamePlayPause(gameState, action);
    case ActionType.GAME_RESET:
      return handleGameReset(gameState, action);
    case ActionType.BALL_HIT:
      return handleBallHit(gameState, action);
    case ActionType.BALL_MOVE:
      return handleBallMove(gameState, action);
    case ActionType.CPU_MOVE:
      return handleCpuMove(gameState, action);
    case ActionType.USR_MOVE:
      return handleUsrMove(gameState, action);
    case ActionType.CPU_SCORE:
      return handleCpuScore(gameState, action);
    case ActionType.USR_SCORE:
      return handleUsrScore(gameState, action);
    default:
      return gameState;
  }
}
