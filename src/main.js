import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CotizacionPage from "./pages/CotizacionPage";
const isProduction = window.location.hostname !== "localhost";
const router = createBrowserRouter([
    {
        path: "/",
        element: _jsx(LandingPage, {}),
    },
    {
        path: "/cotizacion",
        element: _jsx(CotizacionPage, {}),
    },
], { basename: isProduction ? "/eltemplo" : "/" });
createRoot(document.getElementById("root")).render(_jsx(StrictMode, { children: _jsx(RouterProvider, { router: router }) }));
