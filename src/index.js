import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RSADemo } from "./rsa/rsa-main";
import  CodePage  from "./routes/code.js";
import AboutPage  from "./routes/about.js";
import MathPage from "./routes/math.js";
import Root from "./routes/root";
import ErrorHandler from "./error-handling";
import "./index.css";

import { createHashRouter, createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorHandler />,
    children: [
      {
        path: "rsa",
        element: <RSADemo />,
      },
      {
        path: "/",
        element: <AboutPage />,
      },
      {
        path: "code",
        element: <CodePage />,
      },
      {
        path: "math",
        element: <MathPage />,
      },
    ]
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);