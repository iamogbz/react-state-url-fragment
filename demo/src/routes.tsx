import * as React from "react";
import { $, Chart, NamedRoute } from "react-router-chart";
import { createBrowserRouter, redirect, RouteObject } from "react-router-dom";

import { Account } from "./components/pages/Account";
import { Base } from "./components/pages/Base";
import { Landing } from "./components/pages/Landing";
import { SignIn } from "./components/pages/SignIn";
import { SignOut } from "./components/pages/SignOut";
import { SignUp } from "./components/pages/SignUp";

export const ROOT_PATH = "/";
export const BASE_NAME = "react-state-url-fragment";

const homePath = ROOT_PATH + BASE_NAME;
export const namedRoutes: NamedRoute = {};
export const routes: RouteObject[] = [
  {
    path: homePath,
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
            loader: () => redirect(namedRoutes.account[$] ?? homePath),
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

Object.assign(namedRoutes, Chart.describe(...routes)[ROOT_PATH][BASE_NAME]);

export const router = createBrowserRouter(routes);
