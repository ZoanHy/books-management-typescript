import React from "react";
import { createRoot } from "react-dom/client";
import AppLayout from "@/App";
import "@/styles/global.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "antd";

import HomePage from "@/pages/client/home";
import BookPage from "@/pages/client/book";
import AboutPage from "@/pages/client/about";
import LoginPage from "@/pages/client/auth/login";
import RegisterPage from "@/pages/client/auth/register";
import { AppProvider } from "@/components/context/app.context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/book",
        element: <BookPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* App: antd  */}
    <App>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </App>
  </React.StrictMode>
);
