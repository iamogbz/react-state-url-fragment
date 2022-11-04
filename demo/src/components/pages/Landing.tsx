import * as React from "react";

import { Copy } from "../../constants";
import { namedRoutes } from "../../routes";
import { $ } from "../../utils/createNamedRoutes";
import { Link } from "../buttons/Link";
import { AUTH_CONTAINER_STYLE } from "./constants";

export function Landing(): JSX.Element {
  const accountLink = namedRoutes["/"].account[$];
  return (
    <div id="landing" style={AUTH_CONTAINER_STYLE}>
      <h1>{Copy.LANDING}</h1>
      {accountLink && <Link to={accountLink}>{Copy.VIEW_PROFILE}</Link>}
    </div>
  );
}
