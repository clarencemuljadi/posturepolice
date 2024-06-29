import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Analytics from "./routes/Analytics.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Dashboard from "./routes/Dashboard.jsx";
import Register from "./routes/Register.jsx";
import Login from "./routes/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/Dashboard" />,
  },
  {
    path: "/Login",
    element: <Login></Login>,
  },
  {
    path: "/Register",
    element: <Register></Register>,
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
