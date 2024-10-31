import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download, PackageSearch, } from "lucide-react";
import { Link } from "react-router-dom";
const basePath = import.meta.env.MODE === "development" ? "" : "/eltemplo/";
const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        `${basePath}/hero-background-1.jpg`,
        `${basePath}/hero-background-2.jpg`,
        `${basePath}/hero-background-3.jpg`,
    ];
    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    return (_jsxs("div", { className: "relative h-screen", children: [slides.map((slide, index) => (_jsx("div", { className: `absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`, children: _jsx("img", { src: slide, alt: `Slide ${index + 1}`, className: "w-full h-full object-cover" }) }, index))), _jsx("div", { className: "absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center text-white", children: [_jsx("h1", { className: "text-4xl md:text-6xl font-bold mb-4", children: "EL TEMPLO BEBIDAS" }), _jsx("p", { className: "text-xl md:text-2xl mb-12", children: "Tienda Mayorista y Minorista" }), _jsxs("div", { className: "w-full h-20dvh flex flex-wrap md: mt-8 items-center justify-center gap-3", children: [_jsx(Button, { className: "bg-softRed hover:bg-primaryRed", asChild: true, size: "lg", children: _jsxs(Link, { to: "/cotizacion", children: [_jsx(PackageSearch, { className: "mr-2 h-4 w-4" }), " Cotiza tu pedido"] }) }), _jsx(Button, { asChild: true, variant: "outline", size: "lg", children: _jsxs("a", { href: "", className: "text-black", children: [_jsx(Download, { color: "black", className: "mr-2 h-4 w-4 " }), "Descargar lista de precios"] }) })] })] }) }), _jsx(Button, { variant: "ghost", size: "icon", className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-white", onClick: prevSlide, children: _jsx(ChevronLeft, { className: "h-8 w-8" }) }), _jsx(Button, { variant: "ghost", size: "icon", className: "absolute right-4 top-1/2 transform -translate-y-1/2 text-white", onClick: nextSlide, children: _jsx(ChevronRight, { className: "h-8 w-8" }) })] }));
};
export default Hero;
