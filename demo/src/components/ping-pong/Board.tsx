import React from "react";

import { BALL_SIZE, BoardSize } from "./constants";

export function Board(
  p: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >,
) {
  return (
    <div
      {...p}
      style={{
        ...p.style,
        border: "outset 6px rgb(33,33,33)",
        borderRadius: "12px",
        position: "relative",
        width: `${BoardSize.WIDTH + BALL_SIZE * 2}px`,
        height: `${BoardSize.HEIGHT + BALL_SIZE * 2}px`,
      }}
    />
  );
}
