export const MOVE_SPEED = 0.005;
export const CPU_MOVE_THRESHOLD = MOVE_SPEED * 5;
export const CPU_POSITION_Y = 0.02;
export const USR_POSITION_Y = 1 - CPU_POSITION_Y;
export const BALL_SIZE = 3;
export const BoardSize = { WIDTH: 180, HEIGHT: 240 } as const;
export const PaddleSize = { WIDTH: 36, HEIGHT: BALL_SIZE * 2 } as const;

export interface Coords2D {
  x: number;
  y: number;
}

export interface Game {
  ballPosition: Coords2D;
  ballVelocity: Coords2D;
  cpuPosition: number;
  cpuScore: number;
  goals: { ballPosition: Coords2D }[];
  isRunning: boolean;
  usrPosition: number;
  usrScore: number;
}

export const INITIAL_GAME_STATE: Game = {
  ballPosition: { x: 0.5, y: USR_POSITION_Y },
  ballVelocity: { x: 0.007, y: 0.003 },
  cpuPosition: 0.5,
  cpuScore: 0,
  goals: [],
  isRunning: false,
  usrPosition: 0.5,
  usrScore: 0,
};

export enum ActionType {
  BALL_MOVE = "BALL_MOVE",
  BALL_HIT = "BALL_HIT",
  CPU_MOVE = "CPU_MOVE",
  USR_MOVE = "USR_MOVE",
  GAME_STEP = "GAME_STEP",
  GAME_PLAY_PAUSE = "GAME_PLAY_PAUSE",
  GAME_RESET = "GAME_RESET",
  CPU_SCORE = "CPU_SCORE",
  USR_SCORE = "USR_SCORE",
}

export enum Inset {
  TOP = "TOP",
  RIGHT = "RIGHT",
  BOTTOM = "BOTTOM",
  LEFT = "LEFT",
}

export type GameActions =
  | {
      type: ActionType.USR_SCORE;
    }
  | {
      type: ActionType.CPU_SCORE;
    }
  | {
      type: ActionType.GAME_RESET;
    }
  | {
      type: ActionType.CPU_MOVE;
      payload?: Inset.LEFT | Inset.RIGHT;
    }
  | {
      type: ActionType.USR_MOVE;
      payload: Inset.LEFT | Inset.RIGHT;
    }
  | {
      type: ActionType.BALL_HIT;
      payload: Inset;
    }
  | {
      type: ActionType.BALL_MOVE;
      payload?: Coords2D;
    }
  | {
      type: ActionType.GAME_STEP;
    }
  | {
      type: ActionType.GAME_PLAY_PAUSE;
      payload?: boolean;
    };

export enum GameKey {
  ARROW_LEFT = "ArrowLeft",
  ARROW_RIGHT = "ArrowRight",
  ESCAPE = "Escape",
  SPACE = "Space",
}
