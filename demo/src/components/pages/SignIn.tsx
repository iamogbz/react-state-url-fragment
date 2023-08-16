import * as React from "react";
import { useNavigate } from "react-router-dom";

import { Copy } from "../../constants";
import { namedRoutes } from "../../routes";
import { $ } from "../../utils/createNamedRoutes";
import { resolveTimeout } from "../../utils/resolveTimeout";
import { Link } from "../buttons/Link";
import { TextInput } from "../forms/TextInput";
import { useAuthState } from "../hooks/useAuthState";
import { useSimpleForm } from "../hooks/useForm";
import { usePageState } from "../hooks/usePageState";
import { LoadingIcon } from "../icons/LoadingIcon";
import { AUTH_CONTAINER_STYLE } from "./constants";

export function SignIn(): JSX.Element {
  const accountLink = namedRoutes.account[$];
  const navigate = useNavigate();
  const [, setAuthState] = useAuthState();
  const [pageState, setPageState] = usePageState();

  const { fields, actions, status } = useSimpleForm(
    {
      username: pageState?.username ?? "",
      password: "",
    },
    {
      change: (fieldName, newValue) => {
        if (fieldName !== "username") return;
        setPageState((state) => ({ ...state, [fieldName]: newValue }));
      },
      submit: async (values) => {
        try {
          await resolveTimeout(1000);
          setAuthState({ username: values.username });
          accountLink && navigate(accountLink);
          return { success: true };
        } catch (error) {
          return { success: false, error };
        }
      },
    },
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
    <div id="sign-in" style={AUTH_CONTAINER_STYLE}>
      <h1>{Copy.SIGN_IN}</h1>
      <TextInput control={fields.username} />
      <TextInput control={fields.password} type="password" />
      <Link onClick={onSubmit}>
        {status.isSubmitting ? <LoadingIcon /> : Copy.SIGN_IN}
      </Link>
    </div>
  );
}
