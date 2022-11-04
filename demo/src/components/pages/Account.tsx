import * as React from "react";

import { Copy } from "../../constants";
import { namedRoutes } from "../../routes";
import { $ } from "../../utils/createNamedRoutes";
import { Link } from "../buttons/Link";
import { useAuthState } from "../hooks/useAuthState";
import { usePageState } from "../hooks/usePageState";
import { AUTH_CONTAINER_STYLE } from "./constants";

export function Account() {
  const [authState] = useAuthState();
  const [pageState] = usePageState();

  const welcomeMessage = authState?.username
    ? Copy.HELLO(authState.username)
    : pageState?.username
    ? Copy.WELCOME_BACK(pageState.username)
    : Copy.WELCOME;

  const homeLink = namedRoutes["/"][$];
  const signInLink = namedRoutes["/"].sign.in[$];
  const signUpLink = namedRoutes["/"].sign.up[$];
  const signOutLink = namedRoutes["/"].sign.out[$];

  return (
    <div id="sign" style={AUTH_CONTAINER_STYLE}>
      <h1>{welcomeMessage}</h1>
      {authState?.username ? (
        signOutLink && <Link to={signOutLink}>{Copy.SIGN_OUT}</Link>
      ) : (
        <>
          {signInLink && <Link to={signInLink}>{Copy.SIGN_IN}</Link>}
          {signUpLink && <Link to={signUpLink}>{Copy.SIGN_UP}</Link>}
        </>
      )}
      {homeLink && <Link to={homeLink}>{Copy.VIEW_LANDING}</Link>}
    </div>
  );
}
