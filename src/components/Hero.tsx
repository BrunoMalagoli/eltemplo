import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  PackageSearch,
} from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "/img/hero-background-1.jpg",
    "/img/hero-background-2.jpg",
    "/img/hero-background-3.jpg",
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-screen">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            EL TEMPLO BEBIDAS
          </h1>
          <p className="text-xl md:text-2xl mb-12">
            Tienda Mayorista y Minorista
          </p>
          <div className="w-full h-20dvh flex flex-wrap md: mt-8 items-center justify-center gap-3">
            <Button
              className="bg-softRed hover:bg-primaryRed"
              asChild
              size="lg"
            >
              <Link to={"/cotizacion"}>
                <PackageSearch className="mr-2 h-4 w-4" /> Reserva tu pedido
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="" className="text-black">
                <Download color="black" className="mr-2 h-4 w-4 " />
                Descargar lista de precios
              </a>
            </Button>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>
    </div>
  );
};

export default Hero;
