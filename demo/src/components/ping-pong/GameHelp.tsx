import React from "react";

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
        <tr>
          <td>SPACE</td>
          <td>:</td>
          <td>Play/Pause</td>
        </tr>
        <tr>
          <td>ESC</td>
          <td>:</td>
          <td>Reset Game</td>
        </tr>
      </tbody>
    </table>
  );
}
