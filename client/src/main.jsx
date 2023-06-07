import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import Root from "./routes/Root";
import Home from "./routes/Home";
import Login, { action as loginAction } from "./routes/Login";
import Register, { action as registerAction} from "./routes/Register";
import Plant from "./routes/Plant";
import Kaart from "./routes/Kaart"
import OverOns from "./routes/OverOns"
import Profiel from "./routes/Profiel"
import Stadsgids from "./routes/Stadsgids"
import Error from "./components/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "login",
            element: <Login />,
            action: loginAction,
          },
          {
            path: "register",
            element: <Register />,
            action: registerAction,
          },
          {
            path: "plant",
            element: <Plant />,
          },
          {
            path: "kaart",
            element: <Kaart />,
          },
          {
            path: "overons",
            element: <OverOns />,
          },
          {
            path: "profiel",
            element: <Profiel />,
          },
          {
            path: "stadsgids",
            element: <Stadsgids />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
