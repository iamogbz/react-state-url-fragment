import React from "react";
import {
  Link as ReactRouterDomLink,
  LinkProps as ReactRouterDomLinkProps,
} from "react-router-dom";

import { BUTTON_BASE_STYLE } from "./constants";

type LinkProps = React.PropsWithChildren<
  Omit<ReactRouterDomLinkProps, "to"> &
    Partial<Pick<ReactRouterDomLinkProps, "to">>
>;

export function Link(props: LinkProps) {
  return (
    <ReactRouterDomLink
      to={props.to ?? "#"}
      style={BUTTON_BASE_STYLE}
      {...props}
    />
  );
}
