import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function WhatsAppButton({ phoneNumber, message = "Hola, me gustaría hacer una consulta", }) {
    const handleClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };
    return (_jsxs(Button, { onClick: handleClick, className: "fixed bottom-4 right-4 z-50 rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-green-500 hover:bg-green-600", size: "icon", children: [_jsx(MessageCircle, { className: "h-8 w-8 text-white" }), _jsx("span", { className: "sr-only", children: "Contactar por WhatsApp" })] }));
}
