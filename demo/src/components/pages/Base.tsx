import * as React from "react";
import { Outlet } from "react-router-dom";

export function Base(): JSX.Element {
  return (
    <>
      <div id="base"></div>
      <Outlet />
    </>
  );
}
