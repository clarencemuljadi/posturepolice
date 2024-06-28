import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/Login",
    element: <div>Hello world!</div>,
  },
  {
    path: "/Register",
    element: <div>Hello world!</div>,
  },
  {
    path: "/Analytics",
    element: <div>Hello world!</div>,
  },
  {
    path: "/Dashboard",
    element: <div>Hello world!</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
