import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Truck, MapPin, MessageCircle, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const ventajas = [
    {
        icon: _jsx(Truck, { className: "h-8 w-8 text-primary" }),
        title: "Envíos a todo el país",
        description: "Llegamos a cada rincón de Argentina con nuestros productos de calidad.",
    },
    {
        icon: _jsx(MapPin, { className: "h-8 w-8 text-primary" }),
        title: "Envío gratuito en CABA y alrededores",
        description: "En pedidos a partir de 20 cajas, el envío es totalmente gratis.",
    },
    {
        icon: _jsx(MessageCircle, { className: "h-8 w-8 text-primary" }),
        title: "Atención personalizada por WhatsApp",
        description: "Estamos a tu disposición para resolver dudas y tomar pedidos de forma rápida y eficiente.",
    },
    {
        icon: _jsx(Package, { className: "h-8 w-8 text-primary" }),
        title: "Pedidos mayoristas y minoristas",
        description: "Adaptamos nuestros servicios a tus necesidades, ya sea para grandes volúmenes o compras individuales.",
    },
];
export default function Services() {
    return (_jsx("section", { id: "servicios", className: "py-16 bg-gray-50", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsx("h2", { className: "text-3xl font-bold text-center mb-12", children: "Ventajas de trabajar con nosotros" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: ventajas.map((ventaja, index) => (_jsxs(Card, { className: "bg-white", children: [_jsxs(CardHeader, { className: "flex flex-col items-center", children: [ventaja.icon, _jsx(CardTitle, { className: "mt-4 text-xl font-semibold text-center", children: ventaja.title })] }), _jsx(CardContent, { children: _jsx("p", { className: "text-center text-gray-600", children: ventaja.description }) })] }, index))) })] }) }));
}
