import {
  ActionType,
  BoardSize,
  Coords2D,
  CPU_POSITION_Y,
  Game,
  GameActions,
  Inset,
  PaddleSize,
  USR_POSITION_Y,
} from "./constants";

export function didPaddleHitBall(
  ballPosition: Coords2D,
  paddlePosition: Coords2D
) {
  const halfPaddleWidth = PaddleSize.WIDTH / BoardSize.WIDTH / 2;
  const paddleHeight = PaddleSize.HEIGHT / BoardSize.HEIGHT;
  const isInRangeX =
    ballPosition.x >= paddlePosition.x - halfPaddleWidth &&
    ballPosition.x <= paddlePosition.x + halfPaddleWidth;
  const isInRangeY =
    paddlePosition.y > 0.5
      ? ballPosition.y >= paddlePosition.y - paddleHeight &&
        ballPosition.y <= paddlePosition.y
      : ballPosition.y >= paddlePosition.y &&
        ballPosition.y <= paddlePosition.y + paddleHeight;
  return isInRangeX && isInRangeY;
}

export function* gameStateActions(game: Game): Generator<GameActions> {
  if (game.ballPosition.x <= 0) {
    yield { type: ActionType.BALL_HIT, payload: Inset.LEFT };
  }
  if (game.ballPosition.x >= 1) {
    yield { type: ActionType.BALL_HIT, payload: Inset.RIGHT };
  }
  if (
    didPaddleHitBall(game.ballPosition, {
      x: game.usrPosition,
      y: USR_POSITION_Y,
    })
  ) {
    yield { type: ActionType.BALL_HIT, payload: Inset.BOTTOM };
  }
  if (
    didPaddleHitBall(game.ballPosition, {
      x: game.cpuPosition,
      y: CPU_POSITION_Y,
    })
  ) {
    yield { type: ActionType.BALL_HIT, payload: Inset.TOP };
  }
  if (game.ballPosition.y <= 0) {
    yield { type: ActionType.USR_SCORE };
  }
  if (game.ballPosition.y >= 1) {
    yield { type: ActionType.CPU_SCORE };
  }
  yield { type: ActionType.GAME_STEP };
  yield { type: ActionType.BALL_MOVE };
  yield { type: ActionType.CPU_MOVE };
}
