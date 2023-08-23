import * as React from "react";
import { $ } from "react-router-chart";
import { useNavigate } from "react-router-dom";

import { Copy } from "../../constants";
import { namedRoutes } from "../../routes";
import { resolveTimeout } from "../../utils/resolveTimeout";
import { Link } from "../buttons/Link";
import { useAuthState } from "../hooks/useAuthState";
import { useSimpleForm } from "../hooks/useForm";
import { LoadingIcon } from "../icons/LoadingIcon";
import { AUTH_CONTAINER_STYLE } from "./constants";

export function SignOut(): JSX.Element {
  const homeLink = namedRoutes[$];
  const accountLink = namedRoutes.account[$];

  const navigate = useNavigate();
  const [, setAuthState] = useAuthState();

  const doSignOut = React.useCallback(() => {
    setAuthState({});
    homeLink && navigate(homeLink);
    return { success: true };
  }, [homeLink, navigate, setAuthState]);

  const { actions, status } = useSimpleForm(
    {},
    { submit: () => resolveTimeout(1000).then(doSignOut) },
  );

  const onSubmit = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (status.isSubmitting) return;
      actions.submit();
    },
    [status.isSubmitting, actions],
  );

  return (
    <div id="sign-out" style={AUTH_CONTAINER_STYLE}>
      <h1>{Copy.SIGN_OUT_CONFIRM}</h1>
      <div style={{ display: "inline-flex" }}>
        <Link onClick={onSubmit}>
          {status.isSubmitting ? <LoadingIcon /> : Copy.YES}
        </Link>
        {accountLink && (
          <Link to={accountLink}>
            {status.isSubmitting ? <LoadingIcon /> : Copy.NO}
          </Link>
        )}
      </div>
    </div>
  );
}
