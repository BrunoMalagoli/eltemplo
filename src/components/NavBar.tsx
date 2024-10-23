import { Button } from "@/components/ui/button";

const Navbar = () => (
  <nav className="bg-white shadow-md">
    <div className="container h-20 mx-auto px-6 py-3 flex justify-between items-center">
      <a href="/" className="font-bold text-xl">
        Logo
      </a>
      <div className="hidden md:flex space-x-8">
        <a href="#marcas" className=" p-4 hover:text-primaryRed">
          Servicios
        </a>
        <a href="#sobre-nosotros" className="p-4 hover:text-primaryRed">
          Sobre Nosotros
        </a>
        <a
          href="/cotizar"
          className="bg-softRed border-2 rounded-full p-4 hover:text-white"
        >
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
