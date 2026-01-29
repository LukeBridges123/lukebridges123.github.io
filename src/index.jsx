import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RSADemo } from "./rsa/rsa-main.jsx";
import  CodePage  from "./routes/code.jsx";
import AboutPage  from "./routes/about.jsx";
import MathPage from "./routes/math.jsx";
import SIPDPage from "./routes/sipd.jsx";
import Root from "./routes/root.jsx";
import ErrorHandler from "./error-handling.jsx";
import "./index.css";

import { createHashRouter, RouterProvider } from "react-router-dom";


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
      {
        path: "sipd",
        element: <SIPDPage />,
      },
    ]
  },
]); 

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <RouterProvider router={router}>
      
    </RouterProvider> 
    
  </StrictMode>
);