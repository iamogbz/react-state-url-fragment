import React from "react";

import { BALL_SIZE, BoardSize, Coords2D, PaddleSize } from "./constants";

type GameElementProps = { position: Coords2D };

export function Paddle({
  position,
  ...divProps
}: GameElementProps &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >) {
  return (
    <div
      {...divProps}
      style={{
        top: `${position.y * BoardSize.HEIGHT}px`,
        left: `${
          position.x * BoardSize.WIDTH + (BALL_SIZE - PaddleSize.WIDTH) / 2
        }px`,
        borderRadius: `${PaddleSize.HEIGHT / 2}px`,
        position: "absolute",
        background: "rgb(99,45,22)",
        width: `${PaddleSize.WIDTH}px`,
        height: `${PaddleSize.HEIGHT}px`,
      }}
    />
  );
}

export function Ball({
  position,
  ...divProps
}: GameElementProps &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >) {
  return (
    <div
      {...divProps}
      style={{
        ...divProps.style,
        top: `${position.y * BoardSize.HEIGHT}px`,
        left: `${position.x * BoardSize.WIDTH}px`,
        position: "absolute",
        border: `solid ${BALL_SIZE}px red`,
        borderRadius: `${BALL_SIZE}px`,
        width: 0,
        height: 0,
      }}
    />
  );
}
