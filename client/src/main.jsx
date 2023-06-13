import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./style/reset.css";
import "./style/App.css";


import Root from "./routes/Root";
import Home from "./routes/Home";
import Login, { action as loginAction } from "./routes/Login";
import Register, { action as registerAction, } from "./routes/Register";
import Plant from "./routes/Plant";
import Kaart, {loader as storiesLoader,} from "./routes/Kaart";
import OverOns from "./routes/OverOns";
import Profiel, {loader as personalStoriesLoader} from "./routes/Profiel";
import ProfielLogin, {action as profielLoginAction} from "./routes/ProfielLogin";
import ProfielEditSory, {loader as personalStoriesLoaderES, action as editStoryAction,}from "./routes/ProfielEditStory";
import ProfielEditGegevens,{loader as personalStoriesLoaderEG, action as editPersonalData,} from "./routes/ProfielEditGegevens";
import Bevestig from "./routes/Bevestig";
import BevestigVerhaal, {action as bevestigVerhaalAction,} from "./routes/BevestigVerhaal";
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
            loader: storiesLoader,
          },
          {
            path: "overons",
            element: <OverOns />,
          },
          {
            path: "profiel",
            element: <Profiel />,
            loader: personalStoriesLoader,
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
            action: profielLoginAction,
          },
          {
            path: "profielstory/:id",
            element: <ProfielEditSory />,
            action: editStoryAction,
            loader: personalStoriesLoaderES,
          },
          {
            path: "profielgegevens",
            element: <ProfielEditGegevens />,
            action: editPersonalData,
            loader: personalStoriesLoaderEG,
          },
          {
            path: "bevestig",
            element: <Bevestig />,
          },
          {
            path: "bevestigverhaal",
            element: <BevestigVerhaal />,
            action: bevestigVerhaalAction,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Wrapper
      apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      version="beta"
      libraries={["marker"]}
    >
      <RouterProvider router={router} />
    </Wrapper>
  </React.StrictMode>
);
