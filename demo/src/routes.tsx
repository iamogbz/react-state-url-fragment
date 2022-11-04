import * as React from "react";
import { createBrowserRouter, redirect, RouteObject } from "react-router-dom";

import { Account } from "./components/pages/Account";
import { Base } from "./components/pages/Base";
import { Landing } from "./components/pages/Landing";
import { SignIn } from "./components/pages/SignIn";
import { SignOut } from "./components/pages/SignOut";
import { SignUp } from "./components/pages/SignUp";
import { createNamedRoutes, NamedRoute } from "./utils/createNamedRoutes";

export const namedRoutes: NamedRoute = {};
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Base />,
    children: [
      {
        path: "home",
        element: <Landing />,
        index: true,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "sign",
        children: [
          {
            index: true,
            loader: () => redirect("/account"),
          },
          {
            path: "in",
            element: <SignIn />,
          },
          {
            path: "up",
            element: <SignUp />,
          },
          {
            path: "out",
            element: <SignOut />,
          },
        ],
      },
    ],
  },
];

Object.assign(namedRoutes, createNamedRoutes(routes));

export const router = createBrowserRouter(routes);
