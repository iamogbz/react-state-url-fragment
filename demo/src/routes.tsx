import * as React from "react";
import { createBrowserRouter, redirect, RouteObject } from "react-router-dom";

import { Account } from "./components/pages/Account";
import { Base } from "./components/pages/Base";
import { Landing } from "./components/pages/Landing";
import { SignIn } from "./components/pages/SignIn";
import { SignOut } from "./components/pages/SignOut";
import { SignUp } from "./components/pages/SignUp";
import { $, createNamedRoutes, NamedRoute } from "./utils/createNamedRoutes";

export const ROOT_PATH = "/";
export const BASE_PATH = "react-state-url-fragment";

const home = ROOT_PATH + BASE_PATH;
export const namedRoutes: NamedRoute = {};
export const routes: RouteObject[] = [
  {
    path: home,
    element: <Base />,
    children: [
      {
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
            loader: () => redirect(namedRoutes.account[$] ?? home),
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

Object.assign(namedRoutes, createNamedRoutes(routes)[ROOT_PATH][BASE_PATH]);

export const router = createBrowserRouter(routes);
