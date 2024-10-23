import { Button } from "@/components/ui/button";

const Navbar = () => (
  <nav className="bg-white shadow-md">
    <div className="container mx-auto px-6 py-3 flex justify-between items-center">
      <a href="/" className="font-bold text-xl">
        Logo
      </a>
      <div className="hidden md:flex space-x-8">
        <a href="#marcas" className="hover:text-gray-700">
          Marcas
        </a>
        <a href="#sobre-nosotros" className="hover:text-gray-700">
          Sobre Nosotros
        </a>
        <a href="/cotizar" className="text-primary hover:text-primary-dark">
          Arma tu pedido
        </a>
      </div>
      <Button variant="outline" className="md:hidden">
        Menú
      </Button>
    </div>
  </nav>
);

export default Navbar;
