import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import Services from "@/components/Services";
import WhatsAppButton from "@/components/WhatsAppButton";
import React from "react";

const LandingPage = () => {
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
