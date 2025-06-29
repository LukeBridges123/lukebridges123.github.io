import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RSADemo } from "./rsa/rsa-main.jsx";
import {CompilerPage} from "./compiler/compiler-main.jsx"
import  CodePage  from "./routes/code.jsx";
import AboutPage  from "./routes/about.jsx";
import MathPage from "./routes/math.jsx";
import Root from "./routes/root.jsx";
import ErrorHandler from "./error-handling.jsx";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
        path: "compiler",
        element: <CompilerPage />,
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
    <RouterProvider router={router}>
      
    </RouterProvider> 
    
  </StrictMode>
);