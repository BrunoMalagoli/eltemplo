import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CotizacionPage from "./pages/CotizacionPage";

const isProduction = window.location.hostname !== "localhost";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/cotizacion",
      element: <CotizacionPage />,
    },
  ],
  { basename: isProduction ? "/eltemplo" : "/" }
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
