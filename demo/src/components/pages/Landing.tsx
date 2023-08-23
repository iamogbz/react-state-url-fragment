import * as React from "react";
import { $ } from "react-router-chart";

import { Copy } from "../../constants";
import { namedRoutes } from "../../routes";
import { Link } from "../buttons/Link";
import { PingPong } from "../ping-pong/PingPong";
import { AUTH_CONTAINER_STYLE } from "./constants";

export function Landing(): JSX.Element {
  const accountLink = namedRoutes.account[$];
  return (
    <div id="landing" style={AUTH_CONTAINER_STYLE}>
      <h1>{document.title}</h1>
      {accountLink && <Link to={accountLink}>{Copy.VIEW_PROFILE}</Link>}
      <hr />
      <PingPong />
    </div>
  );
}
