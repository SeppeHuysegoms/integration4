import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import Root from "./routes/Root";
import Home from "./routes/Home";
import Login, { action as loginAction } from "./routes/Login";
import Register, { action as registerAction } from "./routes/Register";
import Plant from "./routes/Plant";
import Kaart from "./routes/Kaart";
import OverOns from "./routes/OverOns";
import Profiel from "./routes/Profiel";
import ProfielLogin from "./routes/ProfielLogin";
import ProfielEditSory from "./routes/ProfielEditStory";
import ProdielEditGegevens from "./routes/ProfielEditGegevens";
import Bevestig from "./routes/Bevestig";
import BevestigVerhaal from "./routes/BevestigVerhaal";
import Stadsgids from "./routes/Stadsgids";
import SelecteerLocatie from "./routes/SelecteerLocatie";
import Locatie from "./routes/Locatie";
import SchrijfVerhaal from "./routes/SchrijfVerhaal";
import Error from "./components/Error";
import { Wrapper } from "@googlemaps/react-wrapper";

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
          {
            path: "selecteerlocatie",
            element: <SelecteerLocatie />,
          },
          {
            path: "locatie",
            element: <Locatie />,
          },
          {
            path: "schrijfverhaal",
            element: <SchrijfVerhaal />,
          },
          {
            path: "profiellogin",
            element: <ProfielLogin />,
          },
          {
            path: "profielstory",
            element: <ProfielEditSory />,
          },
          {
            path: "profielgegevens",
            element: <ProdielEditGegevens />,
          },
          {
            path: "bevestig",
            element: <Bevestig />,
          },
          {
            path: "bevestigverhaal",
            element: <BevestigVerhaal />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Wrapper
      apiKey="AIzaSyB3c4tYr1B4VsVxsp7boVD0SPXoE6SnRHQ"
      version="beta"
      libraries={["marker"]}
    >
      <RouterProvider router={router} />
    </Wrapper>
  </React.StrictMode>
);
