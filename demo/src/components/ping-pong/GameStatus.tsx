import React from "react";

import { Copy } from "../../constants";
import { Game } from "./constants";

interface GameStatusProps {
  game: Game | null;
}

export function GameStatus({ game }: GameStatusProps) {
  if (!game) return null;
  return (
    <div id="ping-pong-game-status">
      <div id="game-running" style={{ margin: "8px" }}>
        {game.isRunning ? Copy.GAME_RUNNING : Copy.GAME_PAUSED}
      </div>
      <div style={{ display: "inline-flex", justifyContent: "space-between" }}>
        {["cpu", "usr"].map((key) => (
          <span id={`${key}-score`} key={key} style={{ margin: "8px" }}>
            {`${key.toLocaleUpperCase()}: ${game[`${key}Score` as keyof Game]}`}
          </span>
        ))}
      </div>
    </div>
  );
}
