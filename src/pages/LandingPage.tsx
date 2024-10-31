import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import Services from "@/components/Services";
import WhatsAppButton from "@/components/WhatsAppButton";
import React, { useEffect } from "react";
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

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <Hero />
        <Services />
        <AboutUs />
      </main>
      <Footer />
      <WhatsAppButton phoneNumber="" message="" />
    </div>
  );
};

export default LandingPage;
