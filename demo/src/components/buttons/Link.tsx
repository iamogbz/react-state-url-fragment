import React from "react";
import {
  Link as ReactRouterDomLink,
  LinkProps as ReactRouterDomLinkProps,
} from "react-router-dom";

import { BUTTON_BASE_STYLE } from "./constants";

type LinkProps = React.PropsWithChildren<ReactRouterDomLinkProps>;

export function Link(props: LinkProps) {
  return <ReactRouterDomLink style={BUTTON_BASE_STYLE} {...props} />;
}
