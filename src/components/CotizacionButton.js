import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";
export default function CotizacionButton() {
    const scrollToCotizacion = () => {
        const cotizacionElement = document.getElementById("cotizacionPG");
        if (cotizacionElement) {
            cotizacionElement.scrollIntoView({ behavior: "smooth" });
        }
    };
    return (_jsxs(Button, { onClick: scrollToCotizacion, className: "fixed bottom-4 right-4 hidden md:flex p-6", size: "icon", variant: "destructive", color: "#F71735", children: [_jsx(ShoppingBasket, {}), _jsx("span", { className: "sr-only", children: "Ir a cotizaci\u00F3n" })] }));
}
