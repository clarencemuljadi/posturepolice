import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Analytics from "./routes/Analytics.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Dashboard from "./routes/Dashboard.jsx";

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
    element: <Analytics />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard></Dashboard>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
