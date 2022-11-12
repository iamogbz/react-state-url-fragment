import React from "react";

const Controls = {
  ESC: "Reset Game",
  "LEFT/RIGHT": "Move Paddle",
  SPACE: "Play/Pause",
};

export function GameHelp() {
  return (
    <table
      id="pong-game-help"
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        justifyContent: "space-between",
        border: "solid 2px black",
        padding: "8px",
        borderRadius: "8px",
      }}
    >
      <tbody>
        {Object.entries(Controls).map(([key, action]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>:</td>
            <td>{action}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
