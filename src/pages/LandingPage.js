import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import Services from "@/components/Services";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const LandingPage = () => {
    const { hash } = useLocation(); // Obtener el anclaje desde la URL
    useEffect(() => {
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [hash]); // Se ejecuta cada vez que cambia el anclaje
    return (_jsxs("div", { className: "min-h-screen flex flex-col", children: [_jsx(NavBar, {}), _jsxs("main", { className: "flex-grow", children: [_jsx(Hero, {}), _jsx(Services, {}), _jsx(AboutUs, {})] }), _jsx(Footer, {}), _jsx(WhatsAppButton, { phoneNumber: "", message: "" })] }));
};
export default LandingPage;
