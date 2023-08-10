import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout";
import About from "./pages/About";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import VanDetails, { loader as vanLoader } from "./pages/Vans/VanDetails";
import Vans, { loader as vansLoader } from "./pages/Vans/Vans";

import "./server";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/vans",
        element: <Vans />,
        loader: vansLoader,
      },
      {
        path: "/vans/:vanId",
        element: <VanDetails />,
        loader: vanLoader,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
