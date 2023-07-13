import React from "react";

import { Copy } from "../../constants";
import { Game } from "./constants";

interface GameStatusProps {
  game: Game | null;
  togglePlayPause: () => void;
}

export function GameStatus({ game, togglePlayPause }: GameStatusProps) {
  if (!game) return null;
  return (
    <div id="ping-pong-game-status" onClick={togglePlayPause}>
      <div
        id="game-running"
        style={{ margin: "8px", userSelect: "none", cursor: "pointer" }}
      >
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
